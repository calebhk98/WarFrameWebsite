# DATA.md — Data sources, clients, and rules

Every subagent that touches numbers reads this file. The rules below
are enforced by `scripts/verify-content.ts` and by the tier-2 verifier.

---

## 1. Canonical data sources

| Source                    | What it provides                       | Access pattern         |
|---------------------------|----------------------------------------|------------------------|
| WFCD `warframe-items`     | All static item data (frames, weapons, mods, arcanes, relics, resources, mission nodes). | Build-time only via `src/lib/wfcd.ts`. |
| warframestat.us           | World state (alerts, invasions, sortie, fissures, Baro, daily events). | Runtime cached via `src/lib/worldstate.ts`. |
| warframe.market           | Player-driven plat prices for mods, prime parts, rivens. | Runtime cached via `src/lib/market.ts`. |
| warframe.fandom.com       | Narrative, lore, flavor, edge-case stats not in WFCD. | One short cited WebFetch per page. |

There are no other data sources. If a subagent needs another, it must
file a `kind:chore` issue rather than improvise.

---

## 2. WFCD JSON

**Location.** `/data/wfcd/<Type>.json`. One file per item type:

- `Warframes.json`
- `Weapons.json` (and the type-split mirrors `Primary.json`,
  `Secondary.json`, `Melee.json`, `Archwing.json` if the importer
  produces them)
- `Mods.json`
- `Arcanes.json`
- `Relics.json` (drop tables + refinement values)
- `Resources.json`
- `SolNodes.json` (mission node metadata)
- `Enemies.json`

**Source.** `WFCD/warframe-items` on npm. Version is pinned in
`/package.json` under `dependencies`. Treat the pinned version as
canonical; do not update it ad-hoc — the `data-import` subagent owns
the bump.

**Canonical schema.** Reference
`https://github.com/WFCD/warframe-items/blob/master/schemas/` for
field definitions. If a field is not in the schema, treat it as not
existing for verification purposes.

**Access pattern.** Use `src/lib/wfcd.ts` typed accessors:

```ts
import { getWarframe, getWeapon, getMod } from "@/lib/wfcd";

const ash = getWarframe("Ash");
// ash.health, ash.shield, ash.armor, ash.abilities[0].name, ...
```

**Never** read the JSON via `fs.readFile` in MDX/page code; the typed
accessors guarantee the schema and centralise caching. The one
exception is the import script itself, which generates the JSON.

**Build-time only.** WFCD data does **not** change at runtime. The
site is SSG; every reference is resolved at `astro build` time. If a
component appears to need WFCD data at runtime, it is a bug — file a
`kind:bug` issue.

---

## 3. APIs

### 3.1 warframestat.us (world state)

- **Base URL.** `https://api.warframestat.us/pc/en/`
- **Rate limit.** 3 requests per second, shared across the whole
  process via `scripts/fetch.ts`.
- **Endpoints used.**
  - `/alerts`, `/invasions`, `/sortie`, `/fissures`, `/voidTrader`,
    `/dailyDeals`, `/news`, `/cetusCycle`, `/vallisCycle`,
    `/cambionCycle`, `/zarimanCycle`.
- **Client.** `src/lib/worldstate.ts`. Always returns typed objects;
  never raw `unknown`.
- **Cache TTL.** 5 minutes, stored under `/data/cache/worldstate/`
  (gitignored).

### 3.2 warframe.market (prices)

- **Base URL.** `https://api.warframe.market/v1/`
- **Rate limit.** 3 requests per second, shared via `scripts/fetch.ts`.
- **Endpoints used.**
  - `/items` (catalogue)
  - `/items/{url_name}/orders` (live orders)
  - `/items/{url_name}/statistics` (90-day price history)
- **Headers.** Always send `language: en`, `platform: pc`,
  `accept: application/json`.
- **Client.** `src/lib/market.ts`.
- **Cache TTL.** 10 minutes for orders, 1 hour for statistics, under
  `/data/cache/market/` (gitignored).

### 3.3 Shared fetch infrastructure

All outbound HTTP MUST go through `scripts/fetch.ts`:

```ts
import { fetch } from "@/scripts/fetch";

const res = await fetch(url, { source: "worldstate" });
```

`scripts/fetch.ts` provides:

- a global token-bucket (3 req/s default; configurable per source);
- on-disk cache keyed by URL + headers;
- exponential-backoff retry on 429/5xx;
- a `--no-network` flag for hermetic test runs.

A subagent that calls `globalThis.fetch` directly will fail the
verifier's "no raw fetch" lint check.

---

## 4. Cache TTLs (summary)

| Cache                  | TTL          | Path                              |
|------------------------|--------------|-----------------------------------|
| WFCD JSON              | build-time   | `/data/wfcd/` (committed)         |
| World state            | 5 minutes    | `/data/cache/worldstate/`         |
| Market orders          | 10 minutes   | `/data/cache/market/orders/`      |
| Market statistics      | 1 hour       | `/data/cache/market/stats/`       |
| WebFetch (Fandom etc.) | 24 hours     | `/data/cache/web/`                |

Everything under `/data/cache/` is gitignored. The build pipeline must
work with an empty cache.

---

## 5. Fandom Wiki rules

**Allowed.**

- Up to one WebFetch per content file, through `scripts/fetch.ts`.
- Short quotes, <= 50 words, attributed inline.
- Specific stat lookups when WFCD does not have the field (rare).
- Link-out via `<a href="https://warframe.fandom.com/...">` in MDX.

**Forbidden.**

- Scraping full pages and rewording them.
- Copying paragraphs verbatim.
- Using the Fandom HTML to seed a local mirror.
- Calling Fandom without going through `scripts/fetch.ts`.

**Citation format.** Every Fandom reference goes into the file's
frontmatter `sources[]` array:

```yaml
sources:
  - url: https://warframe.fandom.com/wiki/Ash
    accessedAt: 2026-05-18T12:00:00Z
```

The verifier checks `sources[]` length and that each URL is reachable
from cache (no live network required during verification).

**CC-BY-SA.** Fandom content is licensed CC-BY-SA. The site footer
includes the attribution string; do not strip it.

---

## 6. Adding a new data source

If a new external source is genuinely required:

1. File a `kind:chore` issue describing the source, the data, and the
   intended use.
2. Wait for manager approval (the manager opens the issue label as
   `state:queued`).
3. Implement a typed client under `src/lib/<source>.ts` (TDD: red
   commit then green).
4. Add a fixture under `tests/fixtures/<source>/` and a Vitest
   contract test that runs against the fixture (no live network in
   CI).
5. Register the source with `scripts/fetch.ts` (rate-limit and cache
   TTL).
6. Document the source in this file (new row in the table at top,
   new section under "APIs").
7. Update `docs/AGENTS.md` if any role's prompt needs to mention it.

Anything that touches network without these steps will be rejected by
the verifier.

---

## 7. Data integrity rules (verifier-enforced)

1. **No invented numbers.** Every numeric value in MDX frontmatter or
   body MUST match WFCD when WFCD has the field. The verifier diffs
   numeric fields against `/data/wfcd/*.json`.
2. **Minimum sources.** `sources[]` length >= 2 for content roles,
   >= 1 for builds, >= 3 for guides. See `docs/SCHEMAS.md`.
3. **No TODO/FIXME/lorem-ipsum.** Verifier greps the body.
4. **Word-count floors.** See `docs/STYLE.md`.
5. **Internal-link resolution.** Every `/warframes/...`, `/weapons/...`,
   `/mods/...` link in body MUST resolve to an existing slug.
6. **No raw fetch.** Lint rule: any `globalThis.fetch(` outside
   `scripts/fetch.ts` fails CI.

---

## 8. FAQ

**Why not use the Fandom API?** It exists, but its content licence is
the same as the website (CC-BY-SA) and the structured data we need
(stats) is canonical in WFCD. Using WFCD + cited link-outs is cleaner.

**Why pin `warframe-items`?** Patch-day stat drift would cause the
verifier to fail every page. Bumping the pin is a deliberate action
that triggers a full re-verify pass.

**Where does `riven dispositions` data come from?** It is in
`Weapons.json` under the `disposition` field. Do not invent
disposition values.

**Can content use warframe.market live prices in a page body?** No.
Use the `/worldstate` page (Phase 5) or a dedicated price-aware
component. Static MDX must not include live prices.

**Can a guide reference an alert that may have ended by build time?**
No. Reference enduring mechanics, not current events.
