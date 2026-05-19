# Warframe Codex

An unofficial, data-driven fan reference site for Warframe, covering all
public in-game entities: warframes, weapons, mods, quests, factions,
syndicates, arcanes, missions, resources, and relics. Stats are sourced from
the WFCD `warframe-items` dataset; the site is fully static (Astro 4 + MDX)
with Pagefind full-text search. See `docs/` for detailed documentation.

## Quick start

```
pnpm install
pnpm dev        # development server at http://localhost:4321/warframewebsite/
```

## Build and preview

```
pnpm build      # production build + Pagefind index written to dist/
pnpm preview    # serve dist/ locally
pnpm test       # run Vitest suite
```

## Documentation

| Topic        | File                       |
| ------------ | -------------------------- |
| Local dev    | `docs/LOCAL_DEV.md`        |
| Deploy / CI  | `docs/DEPLOY.md`           |
| Content schemas | `docs/SCHEMAS.md`       |
| Data sources | `docs/DATA.md`             |
| Agent roles  | `docs/AGENTS.md`           |

## MVP scope

Phase 4 content covers all 110 warframes, 43 quests, 35 factions, and 18
syndicates with full MDX detail pages. Weapons (598), mods, arcanes, missions,
resources, and relics render as enumeration-driven list pages backed by WFCD
JSON. See `STATE.md` for queue and verification status.

---

Unofficial fan site. Game content (C) Digital Extremes. Warframe and all
related names are trademarks of Digital Extremes. Not affiliated with or
endorsed by Digital Extremes.
