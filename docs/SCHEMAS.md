# SCHEMAS

Canonical Zod schemas for every content collection on the Warframe site.

This file is the human-readable mirror of `src/content/config.ts`. The Zod
schemas in code are the source of truth for validation; this document is the
source of truth for *intent*. If you change one you must change the other.

Every collection lives at `src/content/<collection>/<slug>.mdx` (except builds
which live at `src/content/builds/<entity-slug>/<build-slug>.mdx`, and guides
which live at `src/content/guides/<kind>/<slug>.mdx`).

## Shared conventions

These rules apply to every collection.

- `slug` — lowercase, hyphen-separated, ASCII only. Regex
  `^[a-z0-9]+(?:-[a-z0-9]+)*$`. Max 80 characters. Slugs are load-bearing —
  they appear in URLs and in cross-collection references (`forEntity`,
  `target`, `modSlug`, etc.). Never rename a slug without also rewriting every
  reference; prefer adding an alias in `aliases[]` (warframes/weapons) or a
  redirect (Phase 5+).
- `name` — display name as it appears in-game, with original casing and
  spacing. Latin letters only; transliterate diacritics.
- `sources[]` — minimum two entries. Each entry is
  `{ url, accessedAt, title?, publisher?, note? }`. `url` must be a valid URL.
  `accessedAt` must be an ISO-8601-like string (`YYYY-MM-DD` or full ISO
  timestamp). At least one source must come from WFCD `warframe-items` or the
  official Warframe wiki; the other(s) can be community sources (Overframe,
  ProfTaonas spreadsheets, DE-published patch notes, etc.). For lore-only
  fields a cited wiki quote is acceptable.
- `updatedAt` — ISO-8601-like date string. Record the date the content was
  last verified against authoritative sources, not the file `mtime`.
- All numeric stats are taken from WFCD `warframe-items` JSON when WFCD has a
  value; never invent a stat. If WFCD disagrees with the wiki, prefer WFCD and
  note the discrepancy in `sources[].note`.
- Optional fields should be omitted entirely if unknown, not set to `null` or
  `""`. Zod treats `undefined` as "not provided" and falls back to the
  default; an empty string is a validation error in most fields.
- Frontmatter must be valid YAML. No tabs. Strings with colons or hashes need
  quoting.

## Shared sub-schemas

These reusable shapes appear in multiple collections. They are defined once in
`src/content/schemas/shared.ts` and imported by individual collection
schemas.

### `sourceSchema`

```yaml
- url: "https://warframe.fandom.com/wiki/Mag"
  accessedAt: "2026-05-18"
  title: "Mag — WARFRAME Wiki"
  publisher: "Fandom"
  note: "Numeric stats cross-checked against WFCD 1.756.0."
```

| Field         | Type   | Required | Notes                                    |
|---------------|--------|----------|------------------------------------------|
| `url`         | URL    | yes      | Must be `https://` or `http://`.         |
| `accessedAt`  | date   | yes      | ISO-8601; YYYY-MM-DD is sufficient.      |
| `title`       | string | no       | Human-readable title for footnotes.      |
| `publisher`   | string | no       | Site name (e.g., "Fandom", "WFCD").      |
| `note`        | string | no       | Free-form, e.g. discrepancy explanation. |

### `statsRecordSchema`

`Record<string, number>` — an open-ended map of stat name to numeric value.
Used for elemental damage, ability stats, faction modifiers, etc. Keys are
lowercase ASCII identifiers (`heat`, `cold`, `power_strength_at_max`).

### `perRankStatSchema`

```yaml
- rank: 0
  stats: { damage: 15 }
- rank: 1
  stats: { damage: 30 }
```

Used by mods and arcanes for tabulating the stat at each rank.

### `dropSchema`

```yaml
- source: "Hydroid (boss, Earth — Oro)"
  chance: 38.72
  rotation: "A"
  rarity: "uncommon"
  note: "Per WFCD drop tables 2026-04-15."
```

Used by mods, arcanes, and other items that drop from missions or enemies.
`chance` is a percentage (0-100). `rotation` is free-form (`A`, `B`, `C`, or a
phrase like "endless rotation C").

### `acquisitionSchema`

```yaml
acquisition:
  source: "Market or quest reward"
  blueprintLocations:
    - "Market (35,000 credits)"
    - "Awakening quest reward"
  cost:
    credits: 25000
    platinum: 175
  buildTimeHours: 72
  note: "Prime variant requires relic farming; see /relics."
```

### `primeVariantSchema`

```yaml
prime:
  available: true
  vaulted: false
  releasedAt: "2017-12-12"
  vaultedAt: "2024-07-17"
```

Tracks the existence and vault status of a prime variant. Omit `vaultedAt` if
the prime is currently unvaulted.

## warframes

Location: `src/content/warframes/<slug>.mdx`.

### Required

| Field         | Type                    | Notes                                                        |
|---------------|-------------------------|--------------------------------------------------------------|
| `slug`        | slug                    | URL identifier, e.g. `mag`, `mirage-prime` (handled in page). |
| `name`        | string                  | Display name, e.g. `Mag`.                                    |
| `aliases`     | string[]                | Empty array if none. Used for search and redirects.          |
| `masteryRank` | int 0-30                | Required MR to use.                                          |
| `health`      | number >= 0             | Base health at rank 0.                                       |
| `shield`      | number >= 0             | Base shield at rank 0.                                       |
| `armor`       | number >= 0             | Base armor value.                                            |
| `energy`      | number >= 0             | Base energy at rank 0.                                       |
| `sprintSpeed` | number > 0              | Sprint multiplier; baseline 1.0.                             |
| `passive`     | `{name, description}`   | The frame's innate passive.                                  |
| `abilities`   | `abilitySchema[]` (1-5) | Usually 4 active abilities; some frames have variants.       |
| `acquisition` | acquisitionSchema       | How to obtain the blueprint.                                 |
| `prime`       | primeVariantSchema      | Use `{available: false}` if no prime exists yet.             |
| `sources`     | sourceSchema[] (min 2)  | At least one WFCD or official source.                        |
| `updatedAt`   | ISO date                | Date of last verification.                                   |

#### `abilitySchema`

| Field        | Type                                   | Notes                                                      |
|--------------|----------------------------------------|------------------------------------------------------------|
| `name`       | string                                 | In-game ability name.                                      |
| `key`        | `"1" | "2" | "3" | "4" | "passive"`    | Hotkey label.                                              |
| `energyCost` | number >= 0                            | Base energy cost; 0 for passive or toggled-after-cast.     |
| `description`| string                                 | 2-3 sentence summary; full description goes in MDX body.   |
| `stats`      | `Record<string, number>`               | Numeric stats keyed by name (`damage`, `range`, etc.).     |

### Optional

The frame schema has no optional top-level fields besides the optional sub-
fields inside `acquisition.cost`, `acquisition.buildTimeHours`,
`prime.vaulted`, `prime.releasedAt`, `prime.vaultedAt`.

### Example frontmatter

```yaml
---
slug: mag
name: Mag
aliases: ["Mag Prime"]
masteryRank: 0
health: 100
shield: 225
armor: 65
energy: 175
sprintSpeed: 1.1
passive:
  name: Magnetic Pull
  description: >-
    Bullet jumping creates a magnetic field that pulls nearby pickups toward Mag.
abilities:
  - name: Pull
    key: "1"
    energyCost: 25
    description: >-
      Magnetically pulls enemies toward Mag, knocking them down and granting
      energy orbs on hit.
    stats: { damage: 250, range: 25 }
  - name: Magnetize
    key: "2"
    energyCost: 50
    description: >-
      Traps an enemy in a magnetic bubble that amplifies all incoming damage
      and redirects bullets to nearby targets.
    stats: { duration: 8, range: 8 }
  - name: Polarize
    key: "3"
    energyCost: 75
    description: >-
      Strips a percentage of armor and shields from nearby enemies and grants
      overshields to allies.
    stats: { strip_pct: 0.4, range: 18 }
  - name: Crush
    key: "4"
    energyCost: 100
    description: >-
      Suspends and crushes all enemies in range with magnetic force.
    stats: { damage: 800, range: 18 }
acquisition:
  source: Sergeant assassination (Phobos — Iliad)
  blueprintLocations:
    - "Sergeant assassination on Phobos — Iliad"
  buildTimeHours: 72
prime:
  available: true
  vaulted: false
  releasedAt: "2017-12-12"
sources:
  - url: "https://github.com/WFCD/warframe-items"
    accessedAt: "2026-05-18"
    title: "WFCD warframe-items"
    publisher: "WFCD"
  - url: "https://warframe.fandom.com/wiki/Mag"
    accessedAt: "2026-05-18"
    title: "Mag — WARFRAME Wiki"
    publisher: "Fandom"
updatedAt: "2026-05-18"
---
```

### Notes

- `abilities` order matches in-game key order (`1, 2, 3, 4`). A frame with a
  `passive` ability key (e.g., Lavos's elemental cycling) should add a fifth
  entry keyed `"passive"` only if the passive is mechanical enough to warrant
  its own card. Otherwise put it in the top-level `passive` field.
- `prime.available: false` for non-prime-eligible frames (Excalibur Umbra, etc.).
- Aliases are searchable strings, not slugs. Use them for "Mag Prime", common
  misspellings, or community nicknames.

## weapons

Location: `src/content/weapons/<slug>.mdx`.

### Required

| Field                | Type                                                                  | Notes                                                          |
|----------------------|-----------------------------------------------------------------------|----------------------------------------------------------------|
| `slug`               | slug                                                                  | URL identifier.                                                |
| `name`               | string                                                                | Display name.                                                  |
| `type`               | `"primary" | "secondary" | "melee" | "arch-gun" | "arch-melee"`        | High-level slot.                                               |
| `category`           | string                                                                | Granular category, e.g. `Rifle`, `Shotgun`, `Bow`, `Polearm`.  |
| `masteryRank`        | int 0-30                                                              | Required MR.                                                   |
| `damage`             | damageSchema                                                          | Per-shot damage breakdown.                                     |
| `criticalChance`     | number >= 0                                                           | Decimal (0.25 = 25%).                                          |
| `criticalMultiplier` | number >= 0                                                           | Multiplier on crit (e.g., 2.0).                                |
| `statusChance`       | number >= 0                                                           | Decimal (0.10 = 10%).                                          |
| `acquisition`        | acquisitionSchema                                                     | How to obtain.                                                 |
| `sources`            | sourceSchema[] (min 2)                                                | Authoritative + community.                                     |
| `updatedAt`          | ISO date                                                              | Last verification date.                                        |

#### `damageSchema`

| Field       | Type                       | Notes                                                  |
|-------------|----------------------------|--------------------------------------------------------|
| `impact`    | number >= 0                | Physical damage; default 0.                            |
| `puncture`  | number >= 0                | Physical damage; default 0.                            |
| `slash`     | number >= 0                | Physical damage; default 0.                            |
| `elemental` | `Record<string, number>`   | Keys: `heat`, `cold`, `electric`, `toxin`, etc.        |

### Optional

| Field         | Type                  | Notes                                                  |
|---------------|-----------------------|--------------------------------------------------------|
| `fireRate`    | number >= 0           | Rounds/second. Required for guns; omit on most melees. |
| `magazine`    | int >= 0              | Magazine capacity. Omit for melees.                    |
| `reload`      | number >= 0           | Reload time in seconds. Omit for melees.               |
| `accuracy`    | number >= 0           | WFCD accuracy value. Omit if WFCD has none.            |
| `range`       | number >= 0           | Melee range (meters), or beam/projectile range.        |
| `attackSpeed` | number >= 0           | Melee attack speed. Omit for guns.                     |
| `prime`       | primeVariantSchema    | Omit if no prime exists.                               |

### Example frontmatter

```yaml
---
slug: braton
name: Braton
type: primary
category: Rifle
masteryRank: 0
damage:
  impact: 8.4
  puncture: 7.2
  slash: 8.4
  elemental: {}
criticalChance: 0.16
criticalMultiplier: 2.0
statusChance: 0.16
fireRate: 8.75
magazine: 60
reload: 2.0
accuracy: 18.2
acquisition:
  source: Market
  blueprintLocations:
    - "Market (25,000 credits)"
  cost: { credits: 25000 }
sources:
  - url: "https://github.com/WFCD/warframe-items"
    accessedAt: "2026-05-18"
    publisher: "WFCD"
  - url: "https://warframe.fandom.com/wiki/Braton"
    accessedAt: "2026-05-18"
    publisher: "Fandom"
updatedAt: "2026-05-18"
---
```

### Notes

- Crit chance / status chance are recorded as decimal fractions, not
  percentages. The display layer multiplies by 100.
- Use `category` for the canonical archetype the wiki uses (`Rifle`, `Shotgun`,
  `Sniper Rifle`, `Bow`, `Launcher`, `Sword and Shield`, `Polearm`, ...).
- For multishot weapons, `damage` represents per-pellet damage; multishot is a
  modifier elsewhere.

## mods

Location: `src/content/mods/<slug>.mdx`.

### Required

| Field          | Type                                  | Notes                                                              |
|----------------|---------------------------------------|--------------------------------------------------------------------|
| `slug`         | slug                                  | URL identifier.                                                    |
| `name`         | string                                | Display name.                                                      |
| `polarity`     | polarity enum                         | See list below.                                                    |
| `drain`        | int                                   | Base drain. Negative for aura-style mods that add capacity.        |
| `maxRank`      | int >= 0                              | Highest rank; usually 3, 5, or 10.                                 |
| `rarity`       | rarity enum                           | `common | uncommon | rare | legendary | peculiar | riven`.         |
| `type`         | mod-type enum                         | Slot the mod fits into (see list).                                 |
| `effect`       | string                                | Effect template, e.g. `"+[damage]% Damage"`.                       |
| `perRankStats` | perRankStatSchema[]                   | Numeric values at each rank.                                       |
| `drops`        | dropSchema[]                          | Where the mod drops; empty array if non-droppable.                 |
| `sources`      | sourceSchema[] (min 2)                | Authoritative + community.                                         |
| `updatedAt`    | ISO date                              | Last verification date.                                            |

Polarity values: `madurai | naramon | vazarin | zenurik | unairu | penjaga | umbra | exilus | none`.
Mod-type values: `warframe | primary | secondary | melee | shotgun | rifle | pistol | companion | sentinel | archwing | arch-gun | arch-melee | aura | stance | exilus | augment | parazon | railjack | necramech | other`.
Rarity values: `common | uncommon | rare | legendary | peculiar | riven`.

### Optional

None at the top level. `perRankStats` may be empty for cosmetic / peculiar
mods that have no numeric effect.

### Example frontmatter

```yaml
---
slug: serration
name: Serration
polarity: madurai
drain: 4
maxRank: 10
rarity: common
type: rifle
effect: "+[damage]% Damage"
perRankStats:
  - rank: 0
    stats: { damage: 15 }
  - rank: 1
    stats: { damage: 30 }
  - rank: 10
    stats: { damage: 165 }
drops:
  - source: "Enemy drops (universal)"
    chance: 0.5
    note: "Common drop from Grineer, Corpus, and Infested units."
sources:
  - url: "https://github.com/WFCD/warframe-items"
    accessedAt: "2026-05-18"
    publisher: "WFCD"
  - url: "https://warframe.fandom.com/wiki/Serration"
    accessedAt: "2026-05-18"
    publisher: "Fandom"
updatedAt: "2026-05-18"
---
```

### Notes

- `effect` is a human-readable template. `[stat]` placeholders correspond to
  keys in `perRankStats[].stats`. Renderers can substitute the rank-N value.
- For mods with two stats (e.g., riven dispositions, Galvanized mods), list
  both keys in every rank's `stats` object.

## quests

Location: `src/content/quests/<slug>.mdx`.

### Required

| Field           | Type                         | Notes                                                              |
|-----------------|------------------------------|--------------------------------------------------------------------|
| `slug`          | slug                         | URL identifier.                                                    |
| `name`          | string                       | Display name, e.g. `The War Within`.                               |
| `prerequisites` | string[]                     | Slugs or descriptive names of required prior quests / actions.     |
| `rewards`       | string[]                     | Items, frames, or unlocks granted on completion.                   |
| `stages`        | questStageSchema[] (min 1)   | Ordered list of quest objectives.                                  |
| `lore`          | string                       | Short paragraph (<= 280 chars) summarising the lore — full body in MDX. |
| `sources`       | sourceSchema[] (min 2)       | Authoritative + community.                                         |
| `updatedAt`     | ISO date                     | Last verification date.                                            |

#### `questStageSchema`

| Field       | Type   | Required | Notes                                  |
|-------------|--------|----------|----------------------------------------|
| `name`      | string | yes      | Stage / chapter name.                  |
| `objective` | string | yes      | One-sentence objective.                |
| `location`  | string | no       | Star chart node or relay, if specific. |

### Optional

None at the top level.

### Example frontmatter

```yaml
---
slug: the-war-within
name: The War Within
prerequisites:
  - "the-second-dream"
  - "Mastery Rank 5"
rewards:
  - "Operator Transference upgrade"
  - "Riven mod system unlock"
stages:
  - name: "Junctions of the Void"
    objective: "Reach the Kuva Fortress on the star chart."
  - name: "The Queens"
    objective: "Confront the Grineer Queens in their throne room."
    location: "Kuva Fortress"
lore: >-
  The Tenno's connection to the Void deepens; the Queens reveal the Kuva Guardians.
sources:
  - url: "https://warframe.fandom.com/wiki/The_War_Within"
    accessedAt: "2026-05-18"
    publisher: "Fandom"
  - url: "https://www.warframe.com/news/the-war-within"
    accessedAt: "2026-05-18"
    publisher: "Digital Extremes"
updatedAt: "2026-05-18"
---
```

### Notes

- Spoiler-heavy stages should still be summarised in frontmatter; full spoilers
  go in the MDX body behind a `<Callout type="warn">Spoilers ahead.</Callout>`.
- Stage `location` is optional because some stages span multiple nodes.

## factions

Location: `src/content/factions/<slug>.mdx`.

### Required

| Field        | Type                       | Notes                                                            |
|--------------|----------------------------|------------------------------------------------------------------|
| `slug`       | slug                       | URL identifier.                                                  |
| `name`       | string                     | `Grineer`, `Corpus`, `Infested`, `Sentient`, `Orokin`, etc.      |
| `units`      | string[]                   | Notable units in the faction.                                    |
| `weakness`   | statsRecordSchema          | Damage type to multiplier, e.g. `{ corrosive: 1.75 }`.           |
| `resistance` | statsRecordSchema          | Damage type to multiplier, e.g. `{ slash: 0.5 }`.                |
| `locations`  | string[]                   | Planets / regions where the faction dominates.                   |
| `sources`    | sourceSchema[] (min 2)     | Authoritative + community.                                       |
| `updatedAt`  | ISO date                   | Last verification date.                                          |

### Optional

None.

### Example frontmatter

```yaml
---
slug: grineer
name: Grineer
units:
  - "Grineer Lancer"
  - "Bombard"
  - "Heavy Gunner"
  - "Kuva Lich"
weakness:
  corrosive: 1.75
  slash: 1.25
resistance:
  toxin: 0.5
  impact: 0.85
locations:
  - "Earth"
  - "Mars"
  - "Saturn"
  - "Sedna"
  - "Kuva Fortress"
sources:
  - url: "https://warframe.fandom.com/wiki/Grineer"
    accessedAt: "2026-05-18"
    publisher: "Fandom"
  - url: "https://github.com/WFCD/warframe-items"
    accessedAt: "2026-05-18"
    publisher: "WFCD"
updatedAt: "2026-05-18"
---
```

### Notes

- `weakness` / `resistance` keys are lowercase damage-type names. Use 1.0 as
  the neutral baseline; > 1.0 = more damage taken, < 1.0 = less. This matches
  the WFCD modifier convention.
- For sub-factions (Kuva Grineer, Corrupted, Tusk Grineer) create a separate
  slug rather than nesting under the parent.

## syndicates

Location: `src/content/syndicates/<slug>.mdx`.

### Required

| Field       | Type                                       | Notes                                                                |
|-------------|--------------------------------------------|----------------------------------------------------------------------|
| `slug`      | slug                                       | URL identifier.                                                      |
| `name`      | string                                     | Display name, e.g. `Steel Meridian`, `Ostron`.                       |
| `type`      | `"open-world" | "standing" | "other"`      | Standing = classic six syndicates; open-world = Ostron, Solaris, etc. |
| `rewards`   | syndicateTierSchema[]                      | One entry per rank tier.                                             |
| `sources`   | sourceSchema[] (min 2)                     | Authoritative + community.                                           |
| `updatedAt` | ISO date                                   | Last verification date.                                              |

#### `syndicateTierSchema`

| Field       | Type     | Notes                                                  |
|-------------|----------|--------------------------------------------------------|
| `tier`      | string   | Display name of the rank, e.g. `Neutral`, `Trusted`.   |
| `offerings` | string[] | Items / blueprints unlocked at the tier.               |

### Optional

| Field      | Type     | Notes                                                          |
|------------|----------|----------------------------------------------------------------|
| `faction`  | string   | Allied faction, e.g. `Grineer-aligned` for Steel Meridian.     |
| `dailyCap` | int >= 0 | Daily standing cap, if applicable.                             |

### Example frontmatter

```yaml
---
slug: steel-meridian
name: Steel Meridian
type: standing
faction: "Grineer dissidents"
rewards:
  - tier: "Neutral"
    offerings: []
  - tier: "Trusted"
    offerings: ["Sigil — Steel Meridian", "Vaykor Marelok blueprint"]
  - tier: "General"
    offerings: ["Vaykor Hek blueprint", "Augment: Hysterical Assault"]
dailyCap: 25000
sources:
  - url: "https://warframe.fandom.com/wiki/Steel_Meridian"
    accessedAt: "2026-05-18"
    publisher: "Fandom"
  - url: "https://github.com/WFCD/warframe-items"
    accessedAt: "2026-05-18"
    publisher: "WFCD"
updatedAt: "2026-05-18"
---
```

### Notes

- Use `type: "standing"` for the six classic Tenno-aligned syndicates and for
  Conclave/Cephalon Simaris/Nightwave. Use `type: "open-world"` for Ostron,
  Solaris United, Entrati, Necraloid, Holdfasts, Vox Solaris, Quills.
  `type: "other"` is for one-offs.

## relics

Location: `src/content/relics/<slug>.mdx`.

### Required

| Field        | Type                                                 | Notes                                                       |
|--------------|------------------------------------------------------|-------------------------------------------------------------|
| `slug`       | slug                                                 | URL identifier (e.g. `lith-a1`).                            |
| `name`       | string                                               | Display name (`Lith A1`).                                   |
| `era`        | `"lith" | "meso" | "neo" | "axi" | "requiem"`        | Relic era.                                                  |
| `drops`      | relicDropSchema[]                                    | Drop table (typically intact tier).                         |
| `refinement` | refinementSchema                                     | Drop tables per refinement level.                           |
| `sources`    | sourceSchema[] (min 2)                               | Authoritative + community.                                  |
| `updatedAt`  | ISO date                                             | Last verification date.                                     |

#### `relicDropSchema`

| Field    | Type                                | Notes                              |
|----------|-------------------------------------|------------------------------------|
| `item`   | string                              | Item name (`Mag Prime Chassis`).   |
| `rarity` | `"common" | "uncommon" | "rare"`    | Drop tier.                         |

#### `refinementSchema`

`{ intact: relicDropSchema[], exceptional: relicDropSchema[], flawless: relicDropSchema[], radiant: relicDropSchema[] }`.

### Optional

None.

### Example frontmatter

```yaml
---
slug: lith-a1
name: Lith A1
era: lith
drops:
  - { item: "Forma Blueprint", rarity: "common" }
  - { item: "Braton Prime Stock", rarity: "uncommon" }
  - { item: "Mag Prime Chassis", rarity: "rare" }
refinement:
  intact:
    - { item: "Forma Blueprint", rarity: "common" }
    - { item: "Braton Prime Stock", rarity: "uncommon" }
    - { item: "Mag Prime Chassis", rarity: "rare" }
  exceptional: []
  flawless: []
  radiant:
    - { item: "Mag Prime Chassis", rarity: "rare" }
sources:
  - url: "https://github.com/WFCD/warframe-items"
    accessedAt: "2026-05-18"
    publisher: "WFCD"
  - url: "https://warframe.fandom.com/wiki/Void_Relic"
    accessedAt: "2026-05-18"
    publisher: "Fandom"
updatedAt: "2026-05-18"
---
```

### Notes

- `drops` is the convenience field summarising the most useful refinement
  tier (usually intact). `refinement` holds the full breakdown. Renderers
  prefer `refinement.intact` if `drops` is empty.
- Use `era: "requiem"` for Kuva Lich requiem relics.

## arcanes

Location: `src/content/arcanes/<slug>.mdx`.

### Required

| Field          | Type                                                                       | Notes                                                             |
|----------------|----------------------------------------------------------------------------|-------------------------------------------------------------------|
| `slug`         | slug                                                                       | URL identifier.                                                   |
| `name`         | string                                                                     | Display name.                                                     |
| `type`         | `"operator" | "warframe" | "weapon" | "companion" | "kitgun" | "zaw" | "other"` | Equipment slot.                                                  |
| `maxRank`      | int >= 0                                                                   | Highest rank; usually 5.                                          |
| `effect`       | string                                                                     | Effect template with `[stat]` placeholders.                       |
| `perRankStats` | perRankStatSchema[]                                                        | Numeric values per rank.                                          |
| `drops`        | dropSchema[]                                                               | Source nodes / activities.                                        |
| `sources`      | sourceSchema[] (min 2)                                                     | Authoritative + community.                                        |
| `updatedAt`    | ISO date                                                                   | Last verification date.                                           |

### Optional

None at the top level.

### Example frontmatter

```yaml
---
slug: arcane-energize
name: Arcane Energize
type: warframe
maxRank: 5
effect: "On Energy Pickup: [chance]% chance to replenish [energy] energy to nearby allies."
perRankStats:
  - rank: 0
    stats: { chance: 10, energy: 50, cooldown: 15 }
  - rank: 5
    stats: { chance: 60, energy: 150, cooldown: 15 }
drops:
  - source: "Eidolon Hydrolyst capture"
    chance: 8.0
    note: "Per DE drop tables 2026-04."
  - source: "Scarlet Spear ground rotation B"
    chance: 3.0
sources:
  - url: "https://github.com/WFCD/warframe-items"
    accessedAt: "2026-05-18"
    publisher: "WFCD"
  - url: "https://warframe.fandom.com/wiki/Arcane_Energize"
    accessedAt: "2026-05-18"
    publisher: "Fandom"
updatedAt: "2026-05-18"
---
```

### Notes

- Arcanes with internal cooldowns should put the cooldown in `perRankStats`
  even if it does not scale; downstream tooling assumes the per-rank table is
  authoritative.

## missions

Location: `src/content/missions/<slug>.mdx`.

### Required

| Field        | Type                          | Notes                                                                |
|--------------|-------------------------------|----------------------------------------------------------------------|
| `slug`       | slug                          | URL identifier.                                                      |
| `name`       | string                        | Node name (`Hieracon`, `Orokin Derelict Survival`).                  |
| `type`       | string                        | Mission type (`Survival`, `Disruption`, `Exterminate`).              |
| `faction`    | string                        | Primary enemy faction.                                               |
| `location`   | string                        | Planet / region.                                                     |
| `levelRange` | `{ min: int, max: int }`      | Enemy level at start; `max` may equal `min` for finite missions.     |
| `rewards`    | string[]                      | Notable drops or rotation rewards.                                   |
| `sources`    | sourceSchema[] (min 2)        | Authoritative + community.                                           |
| `updatedAt`  | ISO date                      | Last verification date.                                              |

### Optional

| Field   | Type   | Notes                                       |
|---------|--------|---------------------------------------------|
| `notes` | string | Free-form context (e.g., "Best Neo farm."). |

### Example frontmatter

```yaml
---
slug: hieracon
name: Hieracon
type: Excavation
faction: Corpus
location: Pluto
levelRange: { min: 32, max: 38 }
rewards:
  - "Neo / Axi relics (rotation B/C)"
  - "Endo (rotation A)"
notes: >-
  Popular Axi relic farm in the early-mid star chart.
sources:
  - url: "https://warframe.fandom.com/wiki/Hieracon"
    accessedAt: "2026-05-18"
    publisher: "Fandom"
  - url: "https://github.com/WFCD/warframe-items"
    accessedAt: "2026-05-18"
    publisher: "WFCD"
updatedAt: "2026-05-18"
---
```

### Notes

- For endless missions, `levelRange.max` is the starting cap; the body text
  should explain scaling per rotation.
- Steel Path variants share the same slug but adjust `levelRange` and
  `rewards` in their own body sections; do not create separate files.

## resources

Location: `src/content/resources/<slug>.mdx`.

### Required

| Field         | Type                                                                                                          | Notes                                                                |
|---------------|---------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------|
| `slug`        | slug                                                                                                          | URL identifier.                                                      |
| `name`        | string                                                                                                        | Display name.                                                        |
| `type`        | `"common" | "uncommon" | "rare" | "component" | "fish" | "gem" | "plant" | "pigment" | "currency" | "other"`   | Resource category.                                                   |
| `planets`     | string[]                                                                                                      | Planets / regions where the resource drops.                          |
| `dropSources` | string[]                                                                                                      | Specific drop sources (`Excavator caches on Earth`).                 |
| `usedFor`     | string[]                                                                                                      | Notable build / craft recipes that consume the resource.             |
| `sources`     | sourceSchema[] (min 2)                                                                                        | Authoritative + community.                                           |
| `updatedAt`   | ISO date                                                                                                      | Last verification date.                                              |

### Optional

None.

### Example frontmatter

```yaml
---
slug: tellurium
name: Tellurium
type: rare
planets:
  - "Sedna"
  - "Uranus (Archwing missions)"
dropSources:
  - "Sedna enemy drops"
  - "Archwing missions (any)"
  - "Sharkwing missions on Uranus"
usedFor:
  - "Imperator Vandal blueprint"
  - "Several Archwing weapon blueprints"
sources:
  - url: "https://warframe.fandom.com/wiki/Tellurium"
    accessedAt: "2026-05-18"
    publisher: "Fandom"
  - url: "https://github.com/WFCD/warframe-items"
    accessedAt: "2026-05-18"
    publisher: "WFCD"
updatedAt: "2026-05-18"
---
```

### Notes

- `type` distinguishes universal rarity tiers (`common/uncommon/rare`) from
  category-style buckets (`component`, `fish`, `gem`, `plant`, `pigment`,
  `currency`). Pick whichever is more informative; the game itself overloads
  these terms, so prefer the most specific.

## builds

Location: `src/content/builds/<entity-slug>/<build-slug>.mdx`.

### Required

| Field        | Type                                       | Notes                                                                  |
|--------------|--------------------------------------------|------------------------------------------------------------------------|
| `slug`       | slug                                       | Build slug, unique within the entity directory.                        |
| `name`       | string                                     | Display name (`Steel Path Survival Mag`).                              |
| `forEntity`  | slug                                       | Slug of the warframe or weapon this build targets.                     |
| `entityType` | `"warframe" | "weapon"`                    | Type of the target entity.                                             |
| `purpose`    | string                                     | Short identifier (`steel-path-survival`, `eidolon-hunt`).              |
| `mods`       | buildModSlotSchema[] (min 1)               | Mod loadout.                                                           |
| `playstyle`  | string                                     | One-paragraph summary of how to pilot the build.                       |
| `strengths`  | string[]                                   | Selling points.                                                        |
| `weaknesses` | string[]                                   | Honest downsides.                                                      |
| `sources`    | sourceSchema[] (min 2)                     | Authoritative + community.                                             |
| `updatedAt`  | ISO date                                   | Last verification date.                                                |

#### `buildModSlotSchema`

| Field     | Type    | Notes                                                                 |
|-----------|---------|-----------------------------------------------------------------------|
| `slot`    | string  | Slot identifier (`aura`, `exilus`, `slot-1`...`slot-8`, `stance`).    |
| `modSlug` | slug    | Slug of the mod (must match an entry in the `mods` collection).       |
| `rank`    | int >=0 | Mod rank.                                                             |

#### `buildArcaneSlotSchema`

| Field  | Type    | Notes                                                                |
|--------|---------|----------------------------------------------------------------------|
| `slot` | string  | `arcane-1`, `arcane-2`, or `operator-1`/`operator-2` for operators.  |
| `slug` | slug    | Arcane slug (must match an entry in the `arcanes` collection).       |
| `rank` | int >=0 | Arcane rank.                                                         |

### Optional

| Field       | Type                          | Notes                                                          |
|-------------|-------------------------------|----------------------------------------------------------------|
| `arcanes`   | buildArcaneSlotSchema[]       | Omit for builds without arcanes (most weapon builds).          |
| `focus`     | string                        | Focus school recommendation (e.g., `Zenurik`).                 |
| `helminth`  | string                        | Slug of subsumed ability, e.g., `roar`. Omit if no subsume.    |

### Example frontmatter

```yaml
---
slug: steel-path-survival
name: Mag — Steel Path Survival
forEntity: mag
entityType: warframe
purpose: steel-path-survival
mods:
  - { slot: aura, modSlug: corrosive-projection, rank: 5 }
  - { slot: exilus, modSlug: power-drift, rank: 5 }
  - { slot: slot-1, modSlug: umbral-intensify, rank: 10 }
  - { slot: slot-2, modSlug: umbral-vitality, rank: 10 }
  - { slot: slot-3, modSlug: stretch, rank: 5 }
  - { slot: slot-4, modSlug: streamline, rank: 5 }
  - { slot: slot-5, modSlug: primed-flow, rank: 10 }
  - { slot: slot-6, modSlug: augur-message, rank: 5 }
  - { slot: slot-7, modSlug: fleeting-expertise, rank: 4 }
  - { slot: slot-8, modSlug: blind-rage, rank: 9 }
arcanes:
  - { slot: arcane-1, slug: arcane-energize, rank: 5 }
  - { slot: arcane-2, slug: arcane-blessing, rank: 5 }
focus: Zenurik
helminth: roar
playstyle: >-
  Strip armor with Polarize on cooldown, then magnetize priority targets.
  Pop Pillage when shields drop to top off energy and overshields.
strengths:
  - "Strong armor and shield strip"
  - "Self-sustaining energy via Energize"
weaknesses:
  - "Range-limited without Stretch + Augur Reach combo"
  - "Vulnerable to nullifiers without operator dash"
sources:
  - url: "https://overframe.gg/build/abc"
    accessedAt: "2026-05-18"
    publisher: "Overframe"
  - url: "https://warframe.fandom.com/wiki/Mag"
    accessedAt: "2026-05-18"
    publisher: "Fandom"
updatedAt: "2026-05-18"
---
```

### Notes

- `slot` strings are convention, not enforced — but research subagents should
  use `aura`, `exilus`, `stance`, `slot-1`..`slot-8` consistently.
- Every `modSlug` and arcane `slug` must resolve to a real file in the
  respective collection at build time; the verifier checks this.

## guides

Location: `src/content/guides/<kind>/<slug>.mdx` where `<kind>` is one of
`farming`, `strategy`, `path`.

`guides` uses a discriminated union on the `kind` field. Choose the variant
that matches the content type — schemas differ.

### Variant 1: `kind: "farming"`

#### Required

| Field                 | Type                              | Notes                                                       |
|-----------------------|-----------------------------------|-------------------------------------------------------------|
| `slug`                | slug                              | URL identifier.                                             |
| `name`                | string                            | Display name (`Farming Neurodes`).                          |
| `kind`                | literal `"farming"`               | Discriminator.                                              |
| `target`              | string                            | Entity slug or generic resource name being farmed.          |
| `recommendedMissions` | `{ node, why }[]`                 | Mission nodes + one-line justification each.                |
| `recommendedFrames`   | string[]                          | Warframe slugs that excel at this farm.                     |
| `tips`                | string[]                          | Bullet points of tactical advice.                           |
| `sources`             | sourceSchema[] (min 2)            | Authoritative + community.                                  |
| `updatedAt`           | ISO date                          | Last verification date.                                     |

#### Optional

| Field          | Type     | Notes                                       |
|----------------|----------|---------------------------------------------|
| `modsToBring`  | string[] | Mod slugs that meaningfully improve farming. |

### Variant 2: `kind: "strategy"`

#### Required

| Field            | Type                       | Notes                                                                          |
|------------------|----------------------------|--------------------------------------------------------------------------------|
| `slug`           | slug                       | URL identifier.                                                                |
| `name`           | string                     | Display name (`Eidolon Hunting`).                                              |
| `kind`           | literal `"strategy"`       | Discriminator.                                                                 |
| `topic`          | string                     | Topic slug (`eidolon-hunting`, `steel-path`, `endgame-progression`).           |
| `prerequisites`  | string[]                   | What the player must have done first (e.g. "completed The War Within").        |
| `steps`          | string[] (min 1)           | Step-by-step playbook.                                                         |
| `commonMistakes` | string[]                   | Pitfalls to avoid.                                                             |
| `sources`        | sourceSchema[] (min 2)     | Authoritative + community.                                                     |
| `updatedAt`      | ISO date                   | Last verification date.                                                        |

#### Optional

None at the top level.

### Variant 3: `kind: "path"`

#### Required

| Field        | Type                                                   | Notes                                                              |
|--------------|--------------------------------------------------------|--------------------------------------------------------------------|
| `slug`       | slug                                                   | URL identifier.                                                    |
| `name`       | string                                                 | Display name (`New Player Path: First 100 Hours`).                 |
| `kind`       | literal `"path"`                                       | Discriminator.                                                     |
| `audience`   | `"new-player" | "intermediate" | "endgame"`            | Audience tier.                                                     |
| `milestones` | pathMilestoneSchema[] (min 1)                          | Ordered list of progression milestones.                            |
| `sources`    | sourceSchema[] (min 2)                                 | Authoritative + community.                                         |
| `updatedAt`  | ISO date                                               | Last verification date.                                            |

#### `pathMilestoneSchema`

| Field                 | Type     | Notes                                              |
|-----------------------|----------|----------------------------------------------------|
| `order`               | int >=0  | Sort key; smaller comes first.                     |
| `title`               | string   | Milestone title.                                   |
| `description`         | string   | One paragraph describing the goal.                 |
| `recommendedActions`  | string[] | Bullet list of concrete actions to take.           |

### Example frontmatter — farming

```yaml
---
slug: farming-neurodes
name: Farming Neurodes
kind: farming
target: neurodes
recommendedMissions:
  - { node: "Orokin Derelict Survival", why: "Highest neurode drop density per minute." }
  - { node: "Lua Disruption (Apollo)", why: "Reliable secondary source with extra rewards." }
recommendedFrames:
  - hydroid
  - khora
  - nekros
modsToBring:
  - pilfering-swarm
  - despoil
tips:
  - "Bring a resource booster for double yield during weekend events."
  - "Hydroid + Khora pairing stacks pilfering effects multiplicatively."
sources:
  - url: "https://warframe.fandom.com/wiki/Neurodes"
    accessedAt: "2026-05-18"
    publisher: "Fandom"
  - url: "https://github.com/WFCD/warframe-items"
    accessedAt: "2026-05-18"
    publisher: "WFCD"
updatedAt: "2026-05-18"
---
```

### Example frontmatter — strategy

```yaml
---
slug: eidolon-hunting
name: Eidolon Hunting
kind: strategy
topic: eidolon-hunting
prerequisites:
  - "Completed Saya's Vigil"
  - "Owns a fully-built amp (at minimum 2-1-2)"
  - "Has access to a Tridolon-capable damage frame"
steps:
  - "Stock 20+ Madurai Void Strike charges before nightfall."
  - "Bring three squadmates: trinity, volt, harrow or chroma."
  - "Sequence: Teralyst → Gantulyst → Hydrolyst, with lure pre-charges."
commonMistakes:
  - "Forgetting to charge lures (no relic drops)."
  - "Using a low-tier amp; synovias take too long to break."
sources:
  - url: "https://warframe.fandom.com/wiki/Eidolon"
    accessedAt: "2026-05-18"
    publisher: "Fandom"
  - url: "https://github.com/WFCD/warframe-items"
    accessedAt: "2026-05-18"
    publisher: "WFCD"
updatedAt: "2026-05-18"
---
```

### Example frontmatter — path

```yaml
---
slug: new-player-first-100-hours
name: "New Player Path: First 100 Hours"
kind: path
audience: new-player
milestones:
  - order: 0
    title: "Finish the Awakening and Vor's Prize"
    description: >-
      Complete the starter quest, pick a starter frame, and unlock the
      navigation segment.
    recommendedActions:
      - "Run the Awakening tutorial."
      - "Vor's Prize unlocks the star chart."
  - order: 1
    title: "Mastery Rank 5"
    description: >-
      Level a variety of frames and weapons to MR5 so you can equip every
      common mod and try the syndicates.
    recommendedActions:
      - "Cycle weapons after each rank 30."
      - "Bond with a Kavat or Kubrow once credits allow."
sources:
  - url: "https://warframe.fandom.com/wiki/New_Player_Guide"
    accessedAt: "2026-05-18"
    publisher: "Fandom"
  - url: "https://github.com/WFCD/warframe-items"
    accessedAt: "2026-05-18"
    publisher: "WFCD"
updatedAt: "2026-05-18"
---
```

### Notes

- The discriminator field `kind` is required and must be a string literal —
  YAML quoted strings are safest (`kind: "farming"`).
- File location must match `kind`: `farming` → `guides/farming/<slug>.mdx`,
  `strategy` → `guides/strategy/<slug>.mdx`, `path` → `guides/path/<slug>.mdx`.
- Cross-link liberally to warframes, weapons, and mods using internal links
  (see `docs/STYLE.md`).
