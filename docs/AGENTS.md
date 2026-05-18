# AGENTS.md — Subagent Prompt Templates

This document is the **source of truth** for every subagent prompt the
manager dispatches. The manager copy-pastes the template for the relevant
role, fills the `{placeholders}`, and sends it to a fresh subagent with no
prior context.

Every template enforces the same contract:

- **WHEN** — the trigger that causes the manager to dispatch this role.
- **INPUTS** — placeholders the manager fills in.
- **OUTPUTS** — files the subagent must write.
- **MUST** — hard requirements; verifier will reject otherwise.
- **MUST NOT** — forbidden actions; failure is grounds for retry with
  `human-review-needed` on second offense.
- **REPLY FORMAT** — the exact final line the subagent must emit. The
  manager parses this and nothing else from the subagent reply.
- **PROMPT TEMPLATE** — fenced block with `{placeholders}`. Always include:
  re-read `CLAUDE.md`, re-read the relevant `docs/*.md`, then do the work.

Universal rules that apply to **every** role:

- ASCII only. No emojis. No Unicode dashes; use `-` and `--`.
- Re-read `CLAUDE.md` first, then any role-specific docs.
- TypeScript strict; no `any`, no `// @ts-ignore`.
- No `console.log` in committed code; use `console.error` only on fatal
  paths.
- Files <= 250 lines, functions <= 40 lines, <= 3 parameters per function.
- Never invent Warframe numbers. WFCD JSON is canonical.
- Never scrape Fandom HTML. One short, cited WebFetch per page maximum.
- All HTTP goes through `scripts/fetch.ts` (token-bucket, cache).
- Research / verify / qa roles MUST NOT `git commit`. Only `commit-batch`
  commits.

The role list below is exhaustive. If a manager needs a role not listed
here, file a `kind:chore` issue rather than improvising a prompt.

---

## Index

1. research-warframe
2. research-weapon
3. research-mod
4. research-resource
5. research-arcane
6. research-relic
7. research-quest
8. research-faction
9. research-syndicate
10. research-mission
11. research-build
12. research-guide-farming
13. research-guide-strategy
14. research-guide-path
15. verify-content
16. verify-verifier
17. qa-sample
18. commit-batch
19. data-import
20. feature-research
21. feature-implement
22. scaffold (Phase 0 only, documented for completeness)

---

## 1. research-warframe

**WHEN** — manager pulls the next slug from `## queue.warframes` in
`STATE.md` during Phase 4 warframe wave.

**INPUTS**

- `{slug}` — lowercase-hyphen slug, e.g. `ash`.
- `{name}` — canonical display name, e.g. `Ash`.
- `{target_path}` — absolute path, e.g.
  `/home/user/WarFrameWebsite/src/content/warframes/ash.mdx`.
- `{retry}` — integer; 0 on first attempt.

**OUTPUTS**

- `{target_path}` — MDX file with frontmatter per `docs/SCHEMAS.md` and
  body sections per `docs/STYLE.md`.

**MUST**

- Read `/home/user/WarFrameWebsite/data/wfcd/Warframes.json` and use the
  entry whose name matches `{name}` (case-insensitive) for **every**
  numeric field: `masteryRank`, `health`, `shield`, `armor`, `energy`,
  `sprintSpeed`, and per-ability stats.
- WebFetch `https://warframe.fandom.com/wiki/{Name}` exactly **once** for
  narrative context (lore, acquisition flavor, playstyle notes). Cite the
  URL in `sources` with the current ISO `accessedAt` timestamp.
- Use `src/lib/wfcd.ts` typed accessors when possible (Phase 4 onward; if
  the lib does not yet exist, read the JSON file directly with `fs`).
- Body must contain these sections, in order: `## Overview`, `## Stats`,
  `## Abilities` (one `### {Ability Name}` per ability with energy cost,
  key, and a 2-3 sentence description), `## Acquisition`,
  `## Playstyle`, `## Builds` (link out to
  `/builds/warframes/{slug}/...`), `## Lore`, `## Sources`.
- Body MUST be **>= 800 words** of human-readable prose (frontmatter and
  code-fenced stat blocks do not count).
- Provide >= 2 entries in `sources[]`: WFCD reference URL
  (`https://github.com/WFCD/warframe-items`) and the Fandom Wiki page.

**MUST NOT**

- Run `git commit`, `git add`, or `git push`.
- Invent any numeric value. If WFCD lacks a field, omit it; do not guess.
- Scrape full HTML from Fandom. One WebFetch, summarize in your own
  words, cite the URL.
- Use `console.log` in any helper script you write.
- Include emojis or non-ASCII characters.
- **Do NOT modify STATE.md.** State updates are handled by the
  `commit-batch` role to avoid concurrent-write races. Your responsibility
  ends with writing the MDX file and replying with the slug + path.

**REPLY FORMAT** — final line, exact:

```
{slug} :: {target_path}
```

**PROMPT TEMPLATE**

```
You are research-warframe. Re-read these files first, in order:

  1. /home/user/WarFrameWebsite/CLAUDE.md (full)
  2. /home/user/WarFrameWebsite/docs/SCHEMAS.md (warframe section)
  3. /home/user/WarFrameWebsite/docs/STYLE.md (voice, word counts,
     citations)
  4. /home/user/WarFrameWebsite/docs/DATA.md (WFCD + Fandom rules)

Inputs:
  slug         = {slug}
  name         = {name}
  target_path  = {target_path}
  retry        = {retry}

Task:

  1. Open /home/user/WarFrameWebsite/data/wfcd/Warframes.json. Find the
     entry whose name matches "{name}". Extract masteryRank, health,
     shield, armor, energy, sprintSpeed, and abilities[].
  2. WebFetch https://warframe.fandom.com/wiki/{name} exactly once for
     narrative material. Summarize; do not copy.
  3. Write {target_path} with frontmatter matching the warframe Zod
     schema in docs/SCHEMAS.md and body matching docs/STYLE.md.
  4. Body >= 800 words across the required sections.
  5. Do NOT modify STATE.md. Do NOT git commit. Do NOT write any other
     files.

Output your final line in EXACTLY this format:

  {slug} :: {target_path}
```

---

## 2. research-weapon

**WHEN** — Phase 4 weapon wave; one slug per dispatch.

**INPUTS**

- `{slug}` — e.g. `braton-prime`.
- `{name}` — e.g. `Braton Prime`.
- `{type}` — one of `primary | secondary | melee | arch-gun | arch-melee`.
- `{target_path}` — e.g.
  `/home/user/WarFrameWebsite/src/content/weapons/braton-prime.mdx`.
- `{retry}` — integer.

**OUTPUTS**

- `{target_path}` MDX file.

**MUST**

- Pull numeric stats from `/data/wfcd/Weapons.json` (or the WFCD file
  matching `{type}` — see `docs/DATA.md`).
- Capture damage breakdown (Impact/Puncture/Slash + elemental),
  critChance, critMultiplier, status, fireRate, magazineSize, reload,
  masteryRank, disposition.
- One WebFetch to `https://warframe.fandom.com/wiki/{Name}` for build
  notes and flavor.
- Body >= **500 words** across `## Overview`, `## Stats`, `## Damage`,
  `## Acquisition`, `## Builds`, `## Sources`.
- `sources[]` length >= 2.

**MUST NOT**

- `git commit`. Scrape Fandom HTML. Invent stats. Emit emojis.
  `console.log` in any helper. **Do NOT modify STATE.md.** State updates
  are handled by the `commit-batch` role to avoid concurrent-write races.
  Your responsibility ends with writing the MDX file and replying with the
  slug + path.

**REPLY FORMAT**

```
{slug} :: {target_path}
```

**PROMPT TEMPLATE**

```
You are research-weapon. Re-read in order:

  1. /home/user/WarFrameWebsite/CLAUDE.md
  2. /home/user/WarFrameWebsite/docs/SCHEMAS.md (weapon section)
  3. /home/user/WarFrameWebsite/docs/STYLE.md
  4. /home/user/WarFrameWebsite/docs/DATA.md

Inputs:
  slug         = {slug}
  name         = {name}
  type         = {type}
  target_path  = {target_path}
  retry        = {retry}

Task:

  1. Read /home/user/WarFrameWebsite/data/wfcd/Weapons.json (or the
     type-specific WFCD file documented in docs/DATA.md). Locate the
     entry by name.
  2. WebFetch https://warframe.fandom.com/wiki/{name} once.
  3. Write {target_path} per the weapon Zod schema. Body >= 500 words.
  4. Do NOT modify STATE.md. Do NOT git commit. Do NOT touch other files.

Reply final line exactly:

  {slug} :: {target_path}
```

---

## 3. research-mod

**WHEN** — Phase 4 reference-heavy wave; one slug per dispatch.

**INPUTS**

- `{slug}` — e.g. `serration`.
- `{name}` — e.g. `Serration`.
- `{target_path}` — e.g.
  `/home/user/WarFrameWebsite/src/content/mods/serration.mdx`.
- `{retry}` — integer.

**OUTPUTS**

- `{target_path}` MDX file.

**MUST**

- Pull canonical data from `/data/wfcd/Mods.json`: polarity, rarity,
  drain (base + max), compatibility, levelStats[] (rank table).
- Render the rank table as an MDX table or `<StatTable />` component.
  Required template (one row per rank):

  ```
  | Rank | Drain | Effect |
  |------|-------|--------|
  | 0    | X     | +Y%    |
  | ...  | ...   | ...    |
  | Max  | X     | +Z%    |
  ```

- Body >= **300 words** across `## Overview`, `## Stat Table`,
  `## Acquisition`, `## Usage`, `## Sources`.
- One WebFetch to `https://warframe.fandom.com/wiki/{Name}` for
  acquisition flavor and meta context.
- `sources[]` length >= 2.

**MUST NOT**

- `git commit`. Scrape full HTML. Invent drop chances or per-rank
  values. Emit emojis. `console.log`. **Do NOT modify STATE.md.** State
  updates are handled by the `commit-batch` role to avoid concurrent-write
  races. Your responsibility ends with writing the MDX file and replying
  with the slug + path.

**REPLY FORMAT**

```
{slug} :: {target_path}
```

**PROMPT TEMPLATE**

```
You are research-mod. Re-read:

  1. /home/user/WarFrameWebsite/CLAUDE.md
  2. /home/user/WarFrameWebsite/docs/SCHEMAS.md (mod section)
  3. /home/user/WarFrameWebsite/docs/STYLE.md
  4. /home/user/WarFrameWebsite/docs/DATA.md

Inputs:
  slug         = {slug}
  name         = {name}
  target_path  = {target_path}
  retry        = {retry}

Task:

  1. Read /home/user/WarFrameWebsite/data/wfcd/Mods.json. Locate the
     mod entry by name. Extract polarity, rarity, baseDrain, fusionLimit
     (max rank), and levelStats[] for the rank table.
  2. WebFetch https://warframe.fandom.com/wiki/{name} once.
  3. Write {target_path}. Body >= 300 words. Include the rank table.
  4. Do NOT modify STATE.md. No git operations. No other files.

Reply final line:

  {slug} :: {target_path}
```

---

## 4. research-resource

**WHEN** — Phase 4 reference-heavy wave.

**INPUTS**

- `{slug}` — e.g. `neurodes`.
- `{name}` — e.g. `Neurodes`.
- `{target_path}` — e.g.
  `/home/user/WarFrameWebsite/src/content/resources/neurodes.mdx`.
- `{retry}` — integer.

**OUTPUTS**

- `{target_path}` MDX file.

**MUST**

- Read `/data/wfcd/Resources.json` for canonical name, rarity, and
  description.
- Read `/data/wfcd/DropSources.json` (or the file documented in
  `docs/DATA.md`) for at least the top 5 drop locations by drop chance.
- Render a drop-sources table with planet, mission, enemy/container,
  rotation, and chance.
- Body >= **300 words** across `## Overview`, `## Where to Farm`,
  `## Best Locations`, `## Trading & Alternatives`, `## Sources`.
- One WebFetch to `https://warframe.fandom.com/wiki/{Name}`.
- `sources[]` length >= 2.

**MUST NOT**

- `git commit`. Invent drop chances. Emit emojis. `console.log`. **Do NOT
  modify STATE.md.** State updates are handled by the `commit-batch` role
  to avoid concurrent-write races. Your responsibility ends with writing
  the MDX file and replying with the slug + path.

**REPLY FORMAT**

```
{slug} :: {target_path}
```

**PROMPT TEMPLATE**

```
You are research-resource. Re-read:

  1. /home/user/WarFrameWebsite/CLAUDE.md
  2. /home/user/WarFrameWebsite/docs/SCHEMAS.md (resource section)
  3. /home/user/WarFrameWebsite/docs/STYLE.md
  4. /home/user/WarFrameWebsite/docs/DATA.md

Inputs:
  slug         = {slug}
  name         = {name}
  target_path  = {target_path}
  retry        = {retry}

Task:

  1. Read /home/user/WarFrameWebsite/data/wfcd/Resources.json. Locate by
     name.
  2. Read the drop-sources file documented in docs/DATA.md. Extract the
     top 5 drop locations.
  3. WebFetch https://warframe.fandom.com/wiki/{name} once.
  4. Write {target_path}. Body >= 300 words. Include the drop table.
  5. Do NOT modify STATE.md. No git ops, no other files.

Reply final line:

  {slug} :: {target_path}
```

---

## 5. research-arcane

**WHEN** — Phase 4 reference-heavy wave.

**INPUTS**

- `{slug}` — e.g. `arcane-energize`.
- `{name}` — e.g. `Arcane Energize`.
- `{target_path}` — e.g.
  `/home/user/WarFrameWebsite/src/content/arcanes/arcane-energize.mdx`.
- `{retry}` — integer.

**OUTPUTS**

- `{target_path}` MDX file.

**MUST**

- Pull rank/effect data from `/data/wfcd/Arcanes.json`.
- Body >= **300 words** across `## Overview`, `## Effects per Rank`,
  `## Acquisition`, `## Best On`, `## Sources`.
- Render a per-rank effect table.
- One WebFetch to `https://warframe.fandom.com/wiki/{Name}`.
- `sources[]` length >= 2.

**MUST NOT**

- `git commit`. Invent trigger chances or rank values. Emit emojis.
  **Do NOT modify STATE.md.** State updates are handled by the
  `commit-batch` role to avoid concurrent-write races. Your responsibility
  ends with writing the MDX file and replying with the slug + path.

**REPLY FORMAT**

```
{slug} :: {target_path}
```

**PROMPT TEMPLATE**

```
You are research-arcane. Re-read:

  1. /home/user/WarFrameWebsite/CLAUDE.md
  2. /home/user/WarFrameWebsite/docs/SCHEMAS.md (arcane section)
  3. /home/user/WarFrameWebsite/docs/STYLE.md
  4. /home/user/WarFrameWebsite/docs/DATA.md

Inputs:
  slug         = {slug}
  name         = {name}
  target_path  = {target_path}
  retry        = {retry}

Task:

  1. Read /home/user/WarFrameWebsite/data/wfcd/Arcanes.json. Locate by
     name. Extract levelStats[] (per-rank effects).
  2. WebFetch https://warframe.fandom.com/wiki/{name} once.
  3. Write {target_path}. Body >= 300 words. Include the rank table.
  4. Do NOT modify STATE.md. No git ops.

Reply final line:

  {slug} :: {target_path}
```

---

## 6. research-relic

**WHEN** — Phase 4 reference-heavy wave.

**INPUTS**

- `{slug}` — e.g. `lith-a1`.
- `{name}` — e.g. `Lith A1`.
- `{target_path}` — e.g.
  `/home/user/WarFrameWebsite/src/content/relics/lith-a1.mdx`.
- `{retry}` — integer.

**OUTPUTS**

- `{target_path}` MDX file.

**MUST**

- Pull drop list and refinement values from `/data/wfcd/Relics.json` (or
  `/data/wfcd/Fissures.json` if relic drop tables live there per
  `docs/DATA.md`).
- Render two tables:
  1. **Drops** — column per refinement tier (Intact, Exceptional,
     Flawless, Radiant); row per reward with drop chance.
  2. **Where to Farm** — top fissure missions for the relic's era.
- Body covers `## Overview`, `## Drops`, `## Refinement Costs`,
  `## Where to Farm`, `## Sources`.
- One WebFetch to `https://warframe.fandom.com/wiki/{Name}`.
- `sources[]` length >= 2.
- Body word count: no strict floor beyond schema rules; aim for >= 200
  words of prose around the tables (verifier will enforce schema).

**MUST NOT**

- `git commit`. Invent drop chances. Emit emojis. `console.log`. **Do NOT
  modify STATE.md.** State updates are handled by the `commit-batch` role
  to avoid concurrent-write races. Your responsibility ends with writing
  the MDX file and replying with the slug + path.

**REPLY FORMAT**

```
{slug} :: {target_path}
```

**PROMPT TEMPLATE**

```
You are research-relic. Re-read:

  1. /home/user/WarFrameWebsite/CLAUDE.md
  2. /home/user/WarFrameWebsite/docs/SCHEMAS.md (relic section)
  3. /home/user/WarFrameWebsite/docs/STYLE.md
  4. /home/user/WarFrameWebsite/docs/DATA.md

Inputs:
  slug         = {slug}
  name         = {name}
  target_path  = {target_path}
  retry        = {retry}

Task:

  1. Read the relic drop file documented in docs/DATA.md. Pull drops
     and refinement values.
  2. WebFetch https://warframe.fandom.com/wiki/{name} once.
  3. Write {target_path} with the Drops table and Refinement Costs
     table. Include "Where to Farm".
  4. Do NOT modify STATE.md. No git ops.

Reply final line:

  {slug} :: {target_path}
```

---

## 7. research-quest

**WHEN** — Phase 4 quests wave.

**INPUTS**

- `{slug}` — e.g. `the-second-dream`.
- `{name}` — e.g. `The Second Dream`.
- `{target_path}` — e.g.
  `/home/user/WarFrameWebsite/src/content/quests/the-second-dream.mdx`.
- `{retry}` — integer.

**OUTPUTS**

- `{target_path}` MDX file.

**MUST**

- Body sections: `## Overview` (spoiler-free), `## Prerequisites`,
  `## Stages` (numbered, brief; **avoid story spoilers in summaries**),
  `## Rewards`, `## Tips`, `## Sources`.
- Frontmatter `prerequisites[]` with required quest slugs (link
  resolution checked by verifier).
- One WebFetch to `https://warframe.fandom.com/wiki/{Name}`. Quote
  <= 50 words; rest must be paraphrase.
- `sources[]` length >= 2.
- Add a `spoilerLevel` field (`none | mild | major`) and gate any
  major-spoiler stage descriptions behind `<Callout type="spoiler">`.

**MUST NOT**

- `git commit`. Reveal major plot twists in `## Overview` (overview is
  always spoiler-free). Scrape Fandom HTML. Emit emojis. **Do NOT modify
  STATE.md.** State updates are handled by the `commit-batch` role to
  avoid concurrent-write races. Your responsibility ends with writing the
  MDX file and replying with the slug + path.

**REPLY FORMAT**

```
{slug} :: {target_path}
```

**PROMPT TEMPLATE**

```
You are research-quest. Re-read:

  1. /home/user/WarFrameWebsite/CLAUDE.md
  2. /home/user/WarFrameWebsite/docs/SCHEMAS.md (quest section)
  3. /home/user/WarFrameWebsite/docs/STYLE.md (spoiler rules)
  4. /home/user/WarFrameWebsite/docs/DATA.md

Inputs:
  slug         = {slug}
  name         = {name}
  target_path  = {target_path}
  retry        = {retry}

Task:

  1. WebFetch https://warframe.fandom.com/wiki/{name} once for stage
     order and rewards.
  2. Write {target_path}. Overview MUST be spoiler-free; major-spoiler
     stage details go inside <Callout type="spoiler"> blocks.
  3. Do NOT modify STATE.md. No git ops.

Reply final line:

  {slug} :: {target_path}
```

---

## 8. research-faction

**WHEN** — Phase 4 factions wave.

**INPUTS**

- `{slug}` — e.g. `grineer`.
- `{name}` — e.g. `Grineer`.
- `{target_path}` — e.g.
  `/home/user/WarFrameWebsite/src/content/factions/grineer.mdx`.
- `{retry}` — integer.

**OUTPUTS**

- `{target_path}` MDX file.

**MUST**

- Sections: `## Overview`, `## Units` (table: name, role, level range),
  `## Damage Weaknesses` (per-armor/flesh/shield breakdown referencing
  WFCD damage tables), `## Locations` (planets, mission types),
  `## Sources`.
- One WebFetch to `https://warframe.fandom.com/wiki/{Name}`.
- `sources[]` length >= 2.

**MUST NOT**

- `git commit`. Invent unit stats. Emit emojis. `console.log`. **Do NOT
  modify STATE.md.** State updates are handled by the `commit-batch` role
  to avoid concurrent-write races. Your responsibility ends with writing
  the MDX file and replying with the slug + path.

**REPLY FORMAT**

```
{slug} :: {target_path}
```

**PROMPT TEMPLATE**

```
You are research-faction. Re-read:

  1. /home/user/WarFrameWebsite/CLAUDE.md
  2. /home/user/WarFrameWebsite/docs/SCHEMAS.md (faction section)
  3. /home/user/WarFrameWebsite/docs/STYLE.md
  4. /home/user/WarFrameWebsite/docs/DATA.md

Inputs:
  slug         = {slug}
  name         = {name}
  target_path  = {target_path}
  retry        = {retry}

Task:

  1. WebFetch https://warframe.fandom.com/wiki/{name} once.
  2. Cross-reference unit names against WFCD enemy data if available.
  3. Write {target_path} with the Units, Weaknesses, and Locations
     sections.
  4. Do NOT modify STATE.md. No git ops.

Reply final line:

  {slug} :: {target_path}
```

---

## 9. research-syndicate

**WHEN** — Phase 4 syndicates wave.

**INPUTS**

- `{slug}` — e.g. `steel-meridian`.
- `{name}` — e.g. `Steel Meridian`.
- `{target_path}` — e.g.
  `/home/user/WarFrameWebsite/src/content/syndicates/steel-meridian.mdx`.
- `{retry}` — integer.

**OUTPUTS**

- `{target_path}` MDX file.

**MUST**

- Sections: `## Overview`, `## Standing Ranks` (table: rank, standing
  required, sigil), `## Offerings` (mods, weapons, cosmetics, with
  standing cost), `## Allies and Enemies`, `## Sources`.
- One WebFetch to `https://warframe.fandom.com/wiki/{Name}`.
- `sources[]` length >= 2.

**MUST NOT**

- `git commit`. Invent standing values. Emit emojis. `console.log`.
  **Do NOT modify STATE.md.** State updates are handled by the
  `commit-batch` role to avoid concurrent-write races. Your responsibility
  ends with writing the MDX file and replying with the slug + path.

**REPLY FORMAT**

```
{slug} :: {target_path}
```

**PROMPT TEMPLATE**

```
You are research-syndicate. Re-read:

  1. /home/user/WarFrameWebsite/CLAUDE.md
  2. /home/user/WarFrameWebsite/docs/SCHEMAS.md (syndicate section)
  3. /home/user/WarFrameWebsite/docs/STYLE.md
  4. /home/user/WarFrameWebsite/docs/DATA.md

Inputs:
  slug         = {slug}
  name         = {name}
  target_path  = {target_path}
  retry        = {retry}

Task:

  1. WebFetch https://warframe.fandom.com/wiki/{name} once.
  2. Build Standing Ranks and Offerings tables.
  3. Write {target_path}.
  4. Do NOT modify STATE.md. No git ops.

Reply final line:

  {slug} :: {target_path}
```

---

## 10. research-mission

**WHEN** — Phase 4 missions wave.

**INPUTS**

- `{slug}` — e.g. `hydron-sedna`.
- `{name}` — e.g. `Hydron (Sedna)`.
- `{target_path}` — e.g.
  `/home/user/WarFrameWebsite/src/content/missions/hydron-sedna.mdx`.
- `{retry}` — integer.

**OUTPUTS**

- `{target_path}` MDX file.

**MUST**

- Frontmatter: `type` (Defense, Survival, etc.), `faction`, `planet`,
  `levelRange { min, max }`, `tileset`, `rewards[]`.
- Pull canonical mission data from `/data/wfcd/SolNodes.json` (or the
  file documented in `docs/DATA.md`).
- Sections: `## Overview`, `## Mission Type Notes`, `## Level Range`,
  `## Rewards`, `## Why Play This Node`, `## Sources`.
- One WebFetch to `https://warframe.fandom.com/wiki/{Name}` if a
  dedicated page exists.
- `sources[]` length >= 2.

**MUST NOT**

- `git commit`. Invent enemy levels or rotations. Emit emojis. **Do NOT
  modify STATE.md.** State updates are handled by the `commit-batch` role
  to avoid concurrent-write races. Your responsibility ends with writing
  the MDX file and replying with the slug + path.

**REPLY FORMAT**

```
{slug} :: {target_path}
```

**PROMPT TEMPLATE**

```
You are research-mission. Re-read:

  1. /home/user/WarFrameWebsite/CLAUDE.md
  2. /home/user/WarFrameWebsite/docs/SCHEMAS.md (mission section)
  3. /home/user/WarFrameWebsite/docs/STYLE.md
  4. /home/user/WarFrameWebsite/docs/DATA.md

Inputs:
  slug         = {slug}
  name         = {name}
  target_path  = {target_path}
  retry        = {retry}

Task:

  1. Read /home/user/WarFrameWebsite/data/wfcd/SolNodes.json for
     mission metadata.
  2. WebFetch the Fandom page for the node or tileset once.
  3. Write {target_path}.
  4. Do NOT modify STATE.md. No git ops.

Reply final line:

  {slug} :: {target_path}
```

---

## 11. research-build

**WHEN** — Phase 4 builds wave. Item page must already exist and be
verified (manager checks `## verified.<entity_type>` before dispatch).

**INPUTS**

- `{entity_slug}` — e.g. `saryn-prime` (the warframe or weapon).
- `{entity_type}` — `warframes | weapons`.
- `{build_slug}` — e.g. `spore-spam`.
- `{purpose}` — short tag, e.g. `Steel Path / endless`.
- `{target_path}` — e.g.
  `/home/user/WarFrameWebsite/src/content/builds/warframes/saryn-prime/spore-spam.mdx`.
- `{retry}` — integer.

**OUTPUTS**

- `{target_path}` MDX file.

**MUST**

- Reference the item page for base stats (do NOT restate numbers; link
  to `/{entity_type}/{entity_slug}`).
- Sections: `## Overview`, `## Mod Layout` (8 mods with polarity and
  rank), `## Arcanes`, `## Aura / Exilus`, `## Playstyle`,
  `## Strengths and Weaknesses`, `## Variations`, `## Sources`.
- Body >= **400 words** of prose around the tables.
- Every mod referenced MUST exist at `/mods/<mod-slug>`; verifier
  resolves links.
- `sources[]` length >= 1 (build guides are opinion-led; one citation
  to community discussion or a video guide is enough).

**MUST NOT**

- `git commit`. Restate base item stats (link out). Emit emojis.
  `console.log`. **Do NOT modify STATE.md.** State updates are handled by
  the `commit-batch` role to avoid concurrent-write races. Your
  responsibility ends with writing the MDX file and replying with the slug
  + path.

**REPLY FORMAT**

```
{entity_slug}/{build_slug} :: {target_path}
```

**PROMPT TEMPLATE**

```
You are research-build. Re-read:

  1. /home/user/WarFrameWebsite/CLAUDE.md
  2. /home/user/WarFrameWebsite/docs/SCHEMAS.md (build section)
  3. /home/user/WarFrameWebsite/docs/STYLE.md
  4. /home/user/WarFrameWebsite/docs/DATA.md

Inputs:
  entity_slug  = {entity_slug}
  entity_type  = {entity_type}
  build_slug   = {build_slug}
  purpose      = {purpose}
  target_path  = {target_path}
  retry        = {retry}

Task:

  1. Verify /home/user/WarFrameWebsite/src/content/{entity_type}/{entity_slug}.mdx
     exists. If not, abort with reply "FAIL: missing item page".
  2. Optionally WebFetch a build reference page once (overframe.gg
     /warframe/{entity_slug} or the Fandom build subpage).
  3. Write {target_path}. Body >= 400 words. Mod table required.
  4. Do NOT modify STATE.md. No git ops.

Reply final line:

  {entity_slug}/{build_slug} :: {target_path}
```

---

## 12. research-guide-farming

**WHEN** — Phase 4 farming guides wave. Item or resource pages it
references must already be verified.

**INPUTS**

- `{slug}` — e.g. `farm-kuva`.
- `{target}` — what is being farmed, e.g. `Kuva`.
- `{target_path}` — e.g.
  `/home/user/WarFrameWebsite/src/content/guides/farming/farm-kuva.mdx`.
- `{retry}` — integer.

**OUTPUTS**

- `{target_path}` MDX file.

**MUST**

- Body >= **1200 words**.
- Sections: `## Overview`, `## Prerequisites` (gear, MR, quests
  required), `## Best Methods` (ranked, with expected yield/hour),
  `## Step-by-Step`, `## Alternatives`, `## Pitfalls`, `## Sources`.
- Cite >= 3 sources (data file, Fandom page, one community discussion).
- All linked item/mission/resource slugs must resolve.

**MUST NOT**

- `git commit`. Invent drop rates. Emit emojis. `console.log`. **Do NOT
  modify STATE.md.** State updates are handled by the `commit-batch` role
  to avoid concurrent-write races. Your responsibility ends with writing
  the MDX file and replying with the slug + path.

**REPLY FORMAT**

```
farming/{slug} :: {target_path}
```

**PROMPT TEMPLATE**

```
You are research-guide-farming. Re-read:

  1. /home/user/WarFrameWebsite/CLAUDE.md
  2. /home/user/WarFrameWebsite/docs/SCHEMAS.md (guide section)
  3. /home/user/WarFrameWebsite/docs/STYLE.md (word counts)
  4. /home/user/WarFrameWebsite/docs/DATA.md

Inputs:
  slug         = {slug}
  target       = {target}
  target_path  = {target_path}
  retry        = {retry}

Task:

  1. Identify the canonical data sources for "{target}" (WFCD drop
     file, mission file, etc.).
  2. WebFetch up to two reference pages (Fandom + one community link)
     through scripts/fetch.ts. Cite both.
  3. Write {target_path}. Body >= 1200 words.
  4. Do NOT modify STATE.md. No git ops.

Reply final line:

  farming/{slug} :: {target_path}
```

---

## 13. research-guide-strategy

**WHEN** — Phase 4 strategy guides wave. Runs late (cross-links many
items).

**INPUTS**

- `{slug}` — e.g. `steel-path-survival-tier-list`.
- `{topic}` — e.g. `Steel Path survival warframe tier list`.
- `{target_path}` — e.g.
  `/home/user/WarFrameWebsite/src/content/guides/strategy/steel-path-survival-tier-list.mdx`.
- `{retry}` — integer.

**OUTPUTS**

- `{target_path}` MDX file.

**MUST**

- Body >= **1200 words**.
- Sections vary by topic but MUST include `## Overview`,
  `## Methodology` (how rankings/recommendations are derived),
  `## Tier List or Recommendations`, `## Caveats`, `## Sources`.
- Cite >= 3 sources.
- All cross-links must resolve.

**MUST NOT**

- `git commit`. Present opinion as fact. Hide tier-list criteria.
  Emit emojis. `console.log`. **Do NOT modify STATE.md.** State updates
  are handled by the `commit-batch` role to avoid concurrent-write races.
  Your responsibility ends with writing the MDX file and replying with the
  slug + path.

**REPLY FORMAT**

```
strategy/{slug} :: {target_path}
```

**PROMPT TEMPLATE**

```
You are research-guide-strategy. Re-read:

  1. /home/user/WarFrameWebsite/CLAUDE.md
  2. /home/user/WarFrameWebsite/docs/SCHEMAS.md (guide section)
  3. /home/user/WarFrameWebsite/docs/STYLE.md
  4. /home/user/WarFrameWebsite/docs/DATA.md

Inputs:
  slug         = {slug}
  topic        = {topic}
  target_path  = {target_path}
  retry        = {retry}

Task:

  1. Up to two WebFetches (community + Fandom) through scripts/fetch.ts.
  2. Write {target_path}. Body >= 1200 words. Disclose methodology.
  3. Do NOT modify STATE.md. No git ops.

Reply final line:

  strategy/{slug} :: {target_path}
```

---

## 14. research-guide-path

**WHEN** — Phase 4 paths wave; runs last (depends on most other
content).

**INPUTS**

- `{slug}` — e.g. `new-player-path`.
- `{audience}` — e.g. `new player (MR 0-5)`.
- `{target_path}` — e.g.
  `/home/user/WarFrameWebsite/src/content/guides/paths/new-player-path.mdx`.
- `{retry}` — integer.

**OUTPUTS**

- `{target_path}` MDX file.

**MUST**

- Body >= **1200 words**.
- Sections: `## Overview`, `## Audience`, `## Milestones` (numbered,
  each linking out to the relevant item/quest/guide), `## Common
  Pitfalls`, `## What's Next`, `## Sources`.
- Cite >= 3 sources.
- Link out heavily; this page is a hub.

**MUST NOT**

- `git commit`. Restate detailed stats (link out). Emit emojis. **Do NOT
  modify STATE.md.** State updates are handled by the `commit-batch` role
  to avoid concurrent-write races. Your responsibility ends with writing
  the MDX file and replying with the slug + path.

**REPLY FORMAT**

```
paths/{slug} :: {target_path}
```

**PROMPT TEMPLATE**

```
You are research-guide-path. Re-read:

  1. /home/user/WarFrameWebsite/CLAUDE.md
  2. /home/user/WarFrameWebsite/docs/SCHEMAS.md (guide section)
  3. /home/user/WarFrameWebsite/docs/STYLE.md
  4. /home/user/WarFrameWebsite/docs/DATA.md

Inputs:
  slug         = {slug}
  audience     = {audience}
  target_path  = {target_path}
  retry        = {retry}

Task:

  1. Up to two WebFetches.
  2. Write {target_path}. Body >= 1200 words. Heavy cross-linking.
  3. Do NOT modify STATE.md. No git ops.

Reply final line:

  paths/{slug} :: {target_path}
```

---

## 15. verify-content

**WHEN** — manager dispatches after a research wave writes files. One
verifier per slug; 12 in parallel max.

**INPUTS**

- `{collection}` — e.g. `warframes`.
- `{slug}` — e.g. `ash`.

**OUTPUTS**

- `/home/user/WarFrameWebsite/reports/verify/{collection}/{slug}.json`
  with shape:

  ```
  {
    "pass": boolean,
    "errors": string[],
    "warnings": string[],
    "checked_at": "ISO-8601",
    "citations": [
      { "field": "health", "wfcd_path": "Warframes.json#/Ash/health",
        "value": 100, "file_line": 14 },
      { "field": "name",   "wiki_url":   "https://warframe.fandom.com/...",
        "value": "Ash",    "wiki_fact":  "page title matches" }
    ]
  }
  ```

- An appended `- {slug}` line under `## verified.{collection}` on PASS,
  or `## failed.{collection}` on FAIL, inside `STATE.md`.

**MUST**

- Run `node scripts/verify-content.ts {collection} {slug}` (or `tsx
  scripts/verify-content.ts ...` depending on the runner documented in
  the Makefile). Capture stdout.
- Verify Zod frontmatter validation, WFCD numeric cross-reference,
  internal link resolution, body word-count floor, `sources[]` length,
  no `TODO|FIXME|lorem`.
- **Independently** WebFetch the cited Fandom URL once and confirm
  the entity name plus 1-2 specific facts (e.g. mastery rank, drop
  source). Record the line number / field value in `citations[]` to
  prevent rubber-stamping. Tier-2 verifier checks this.
- Write the report JSON regardless of pass/fail.
- Append the slug to the correct STATE.md bucket.

**MUST NOT**

- `git commit`. Edit the content MDX file. Rewrite the source content.
  Skip the independent WebFetch. Cite "checked" without a specific
  field/value/line. Emit emojis. `console.log`.

**REPLY FORMAT**

PASS:

```
PASS
```

FAIL:

```
FAIL: <n> errors @ /home/user/WarFrameWebsite/reports/verify/{collection}/{slug}.json
```

**PROMPT TEMPLATE**

```
You are verify-content. Re-read:

  1. /home/user/WarFrameWebsite/CLAUDE.md
  2. /home/user/WarFrameWebsite/docs/SCHEMAS.md ({collection} section)
  3. /home/user/WarFrameWebsite/docs/STYLE.md (word floors)
  4. /home/user/WarFrameWebsite/docs/DATA.md

Inputs:
  collection = {collection}
  slug       = {slug}

Task:

  1. Run: tsx /home/user/WarFrameWebsite/scripts/verify-content.ts
     {collection} {slug}
  2. Independently WebFetch the Fandom URL cited in the file's
     sources[]. Confirm the entity name matches and at least 1 stat
     matches WFCD.
  3. Build the citations[] array with concrete file_line numbers and
     WFCD paths.
  4. Write the report JSON to
     /home/user/WarFrameWebsite/reports/verify/{collection}/{slug}.json.
  5. Append "- {slug}" under "## verified.{collection}" on pass, or
     "## failed.{collection}" on fail, in STATE.md.
  6. Do NOT edit the content file. Do NOT git commit.

Reply final line, PASS:

  PASS

Or on FAIL:

  FAIL: <n> errors @ /home/user/WarFrameWebsite/reports/verify/{collection}/{slug}.json
```

---

## 16. verify-verifier (tier-2)

**WHEN** — manager dispatches every batch-end, sampling 10 percent of
verifier reports per collection.

**INPUTS**

- `{collection}` — e.g. `warframes`.
- `{sample_size}` — integer N; e.g. 10.

**OUTPUTS**

- `/home/user/WarFrameWebsite/reports/verify/_meta-{collection}-{batch_id}.json`
  with shape:

  ```
  {
    "checked": N,
    "flagged": M,
    "flagged_reports": ["path1", "path2"],
    "reasons": { "path1": "no specific file_line cited", ... },
    "checked_at": "ISO-8601"
  }
  ```

- `batch_id` is the manager-supplied timestamp/short SHA from the
  prompt; if missing, generate `YYYYMMDD-HHMMSS`.

**MUST**

- Pick up to `{sample_size}` random reports from
  `/reports/verify/{collection}/`.
- For each, confirm `citations[]` contains specific values: a
  `file_line` integer for at least one citation OR a `wfcd_path`
  pointing to a specific JSON pointer.
- Open the corresponding MDX file at the cited `file_line` and confirm
  the value matches.
- Flag any report that lacks specific citations or fails the
  spot-check.

**MUST NOT**

- `git commit`. Edit MDX or verifier reports. Emit emojis.
  `console.log`.

**REPLY FORMAT**

PASS:

```
META_PASS: N reports checked, M flagged
```

FAIL (M > N/2):

```
META_FAIL: N reports checked, M flagged
```

**PROMPT TEMPLATE**

```
You are verify-verifier. Re-read:

  1. /home/user/WarFrameWebsite/CLAUDE.md
  2. /home/user/WarFrameWebsite/docs/ORCHESTRATION.md (verification
     section)

Inputs:
  collection  = {collection}
  sample_size = {sample_size}

Task:

  1. ls /home/user/WarFrameWebsite/reports/verify/{collection}/ and
     randomly sample up to {sample_size} reports.
  2. For each, open the JSON. Confirm citations[] has at least one
     concrete file_line OR a specific wfcd_path (not just a URL).
  3. Open the cited MDX file at the file_line; confirm the value
     appears there.
  4. Flag any report failing these checks.
  5. Write /home/user/WarFrameWebsite/reports/verify/_meta-{collection}-{batch_id}.json.

Reply final line:

  META_PASS: N reports checked, M flagged

Or:

  META_FAIL: N reports checked, M flagged
```

---

## 17. qa-sample

**WHEN** — manager dispatches once per collection at phase end (5
percent sample).

**INPUTS**

- `{collection}` — e.g. `warframes`.
- `{n}` — integer; e.g. 20.

**OUTPUTS**

- `/home/user/WarFrameWebsite/reports/qa/{batch_id}.json` with shape:

  ```
  {
    "collection": "warframes",
    "n": 20,
    "samples": [
      { "slug": "ash", "depth": 4, "accuracy": 5,
        "notes": "..." }
    ],
    "avg_depth": 4.2,
    "avg_accuracy": 4.7,
    "flagged": ["slug-x"],
    "checked_at": "ISO-8601"
  }
  ```

**MUST**

- Randomly sample N files from `src/content/{collection}/`.
- For each, open the MDX, the corresponding WFCD entry, and WebFetch
  the cited Fandom URL.
- Grade `depth` (1-5: how thorough vs the schema floors) and
  `accuracy` (1-5: do the stats match WFCD and the wiki).
- Any score < 3 -> append slug to `flagged[]`. Manager will open a
  `state:qa-flagged` issue.

**MUST NOT**

- `git commit`. Edit MDX. Emit emojis. `console.log`.

**REPLY FORMAT**

```
QA: avg_depth=X.X avg_accuracy=Y.Y flagged=N
```

**PROMPT TEMPLATE**

```
You are qa-sample. Re-read:

  1. /home/user/WarFrameWebsite/CLAUDE.md
  2. /home/user/WarFrameWebsite/docs/STYLE.md (word floors)
  3. /home/user/WarFrameWebsite/docs/DATA.md

Inputs:
  collection = {collection}
  n          = {n}

Task:

  1. ls /home/user/WarFrameWebsite/src/content/{collection}/ and pick
     {n} random files.
  2. For each, grade depth (1-5) and accuracy (1-5). Open WFCD and
     WebFetch the cited Fandom URL.
  3. Write /home/user/WarFrameWebsite/reports/qa/{batch_id}.json.

Reply final line:

  QA: avg_depth=X.X avg_accuracy=Y.Y flagged=N
```

---

## 18. commit-batch

**WHEN** — after every research/verify wave finishes, OR at a phase
boundary. Exactly one commit-batch subagent at a time.

**INPUTS**

- `{paths_glob}` — git-add pathspec, e.g.
  `src/content/warframes/ STATE.md`.
- `{message}` — conventional commit message,
  e.g. `content(warframes): batch 3 (8 frames)`.

**OUTPUTS**

- A single commit pushed to `claude/warframe-website-setup-gvaG9`.

**MUST**

- `cd /home/user/WarFrameWebsite`.
- `git pull --rebase origin claude/warframe-website-setup-gvaG9` first.
- `git add {paths_glob}` only the specified paths.
- `git commit -m "{message}"` exactly once.
- `git push -u origin claude/warframe-website-setup-gvaG9` with retry
  backoff 2s, 4s, 8s, 16s on network errors.
- Capture short SHA via `git rev-parse --short HEAD` after commit.
- After committing content files, append one line per completed slug to
  STATE.md `## done.<collection>` in the format `- <slug> :: <relative-path>`.
  Do this in a SEPARATE commit on top of the content commit, message
  `chore(state): record done <collection> +<N>`.

**MUST NOT**

- `git add -A` or `git add .` (avoid pulling untracked files).
- Amend, force-push, or rebase interactively.
- Skip hooks (no `--no-verify`).
- Commit `.env`, secrets, `node_modules/`, or `data/cache/`.
- Emit emojis. `console.log`.

**REPLY FORMAT**

```
committed=<N> sha=<short> pushed=true
```

or on push failure after retries:

```
committed=<N> sha=<short> pushed=false
```

**PROMPT TEMPLATE**

```
You are commit-batch. Re-read:

  1. /home/user/WarFrameWebsite/CLAUDE.md (commit convention)
  2. /home/user/WarFrameWebsite/docs/ORCHESTRATION.md (git protocol)

Inputs:
  paths_glob = {paths_glob}
  message    = {message}

Task (exact sequence):

  1. cd /home/user/WarFrameWebsite
  2. git pull --rebase origin claude/warframe-website-setup-gvaG9
  3. git add {paths_glob}
  4. git diff --cached --stat (capture for reply)
  5. git commit -m "{message}"
  6. SHA=$(git rev-parse --short HEAD)
  7. For attempt in 1..5 with backoff 2s,4s,8s,16s: git push -u origin
     claude/warframe-website-setup-gvaG9. Break on success.

Reply final line:

  committed=<N> sha=$SHA pushed=true

or:

  committed=<N> sha=$SHA pushed=false
```

---

## 19. data-import

**WHEN** — Phase 2 once; thereafter when manager bumps the
`warframe-items` pinned version.

**INPUTS** — none.

**OUTPUTS**

- One JSON file per item type under
  `/home/user/WarFrameWebsite/data/wfcd/` (Warframes.json,
  Weapons.json, Mods.json, Arcanes.json, Relics.json, Resources.json,
  SolNodes.json, ...).
- Updated `package.json` if the pinned version changed.
- Possibly regenerated TypeScript types in
  `/home/user/WarFrameWebsite/src/lib/wfcd-types.ts`.

**MUST**

- Use the WFCD `warframe-items` npm package (pinned).
- Run via `tsx /home/user/WarFrameWebsite/scripts/import-wfcd.ts`.
- Validate each output file is non-empty valid JSON.
- Print `imported=<N files> wfcd_version=<x.y.z>` at the end.

**MUST NOT**

- `git commit`. Scrape Fandom HTML. Emit emojis. `console.log` (use
  `console.error` only for failures).

**REPLY FORMAT**

```
imported=<N> wfcd_version=<x.y.z>
```

**PROMPT TEMPLATE**

```
You are data-import. Re-read:

  1. /home/user/WarFrameWebsite/CLAUDE.md
  2. /home/user/WarFrameWebsite/docs/DATA.md

Task:

  1. cd /home/user/WarFrameWebsite
  2. tsx scripts/import-wfcd.ts
  3. Verify the script wrote >= 1 file per expected item type into
     data/wfcd/. List them with ls.
  4. Capture the wfcd version from package.json or the script output.

Reply final line:

  imported=<N> wfcd_version=<x.y.z>
```

---

## 20. feature-research

**WHEN** — Phase 8 start; recurs at the start of every Phase 8 loop.

**INPUTS** — none.

**OUTPUTS**

- `/home/user/WarFrameWebsite/data/features.json` — array of feature
  objects with shape:

  ```
  {
    "title": "Worldstate alerts page",
    "description": "Real-time alert list from warframestat.us.",
    "priority": "P0" | "P1" | "P2",
    "sources": [{ "url": "...", "accessedAt": "..." }],
    "affected_areas": ["pages/worldstate", "src/lib/worldstate.ts"]
  }
  ```

**MUST**

- WebFetch a small, fixed set of pages through `scripts/fetch.ts`
  (e.g. r/Warframe top-week, overframe.gg user feedback threads,
  warframe.market suggestions).
- Tag each feature P0 (critical missing), P1 (high-value), P2 (nice to
  have).
- Cite at least 1 source per feature.

**MUST NOT**

- `git commit`. Scrape Fandom HTML. Invent demand. Emit emojis.
  `console.log`.

**REPLY FORMAT**

```
features=<N> p0=<n> p1=<n> p2=<n>
```

**PROMPT TEMPLATE**

```
You are feature-research. Re-read:

  1. /home/user/WarFrameWebsite/CLAUDE.md
  2. /home/user/WarFrameWebsite/docs/DATA.md (WebFetch rules)

Task:

  1. WebFetch the curated source list (r/Warframe top-week,
     overframe.gg recent feedback, warframe.market suggestions) via
     scripts/fetch.ts. Cap total fetches at 5.
  2. Synthesize a prioritized feature list. Each entry: title,
     description, priority, sources[], affected_areas[].
  3. Write /home/user/WarFrameWebsite/data/features.json.

Reply final line:

  features=<N> p0=<n> p1=<n> p2=<n>
```

---

## 21. feature-implement

**WHEN** — Phase 8 implementation step; one issue at a time, TDD
enforced.

**INPUTS**

- `{issue_number}` — e.g. `42`.
- `{feature_spec}` — short text or path to a spec file produced by
  feature-research.

**OUTPUTS**

- At least 2 commits on `claude/warframe-website-setup-gvaG9`:
  1. `test: add failing test for issue #{issue_number}` (red).
  2. `feat: implement issue #{issue_number}` (green).
- Optional commit 3: `refactor: ...`.

**MUST**

- Follow `docs/TDD.md` strictly: red commit first, then green.
- Keep files <= 250 lines, functions <= 40 lines.
- TypeScript strict; no `any`, no `// @ts-ignore`.
- All HTTP through `scripts/fetch.ts`.
- Close the issue from the final commit message
  (`Closes #{issue_number}`).

**MUST NOT**

- Combine red and green into one commit.
- Skip hooks. Force-push. Amend.
- Scrape Fandom HTML. Emit emojis. `console.log` in committed code.

**REPLY FORMAT**

```
implemented=<issue_number> commits=<n>
```

**PROMPT TEMPLATE**

```
You are feature-implement. Re-read:

  1. /home/user/WarFrameWebsite/CLAUDE.md (engineering guardrails)
  2. /home/user/WarFrameWebsite/docs/TDD.md
  3. /home/user/WarFrameWebsite/docs/SCHEMAS.md (if touching content)
  4. /home/user/WarFrameWebsite/docs/DATA.md (if touching lib/)

Inputs:
  issue_number = {issue_number}
  feature_spec = {feature_spec}

Task (exact sequence):

  1. cd /home/user/WarFrameWebsite
  2. git pull --rebase origin claude/warframe-website-setup-gvaG9
  3. Write failing test(s). Confirm `pnpm test` fails on those tests.
  4. git add <test paths>; git commit -m "test: failing test for
     issue #{issue_number}"
  5. Implement. Confirm `pnpm test` and `pnpm typecheck` pass.
  6. git add <impl paths>; git commit -m "feat: implement issue
     #{issue_number}

     Closes #{issue_number}"
  7. git push -u origin claude/warframe-website-setup-gvaG9 with the
     same retry-backoff protocol as commit-batch.

Reply final line:

  implemented={issue_number} commits=<n>
```

---

## 22. scaffold (Phase 0, documented for completeness)

**WHEN** — once, at project start. Not re-dispatched unless the
scaffold is corrupted.

**INPUTS** — none.

**OUTPUTS**

- Astro+MDX+TS+Tailwind project skeleton.
- `package.json`, `pnpm-lock.yaml`, `astro.config.mjs`,
  `tailwind.config.ts`, `tsconfig.json`, `vitest.config.ts`.
- Empty content collections under `/src/content/`.
- `.github/workflows/ci.yml`.
- `CLAUDE.md` and `STATE.md` stubs.
- A draft tracking PR opened on `claude/warframe-website-setup-gvaG9`.

**MUST**

- Confirm `pnpm build` exits 0 on the empty content set.
- Push and open a **draft** PR.
- Use `corepack` to pin pnpm; do not require global pnpm install.

**MUST NOT**

- Commit `node_modules/`. Skip CI setup. Emit emojis. `console.log`.

**REPLY FORMAT**

```
scaffold=ok pr=<pr_number>
```

**PROMPT TEMPLATE**

```
You are scaffold. This role runs once, at Phase 0. Re-read:

  1. /root/.claude/plans/bright-roaming-pretzel.md (full plan)

Task:

  1. cd /home/user/WarFrameWebsite
  2. corepack enable && corepack prepare pnpm@latest --activate
  3. pnpm create astro@latest . -- --template minimal --typescript
     strict --tailwind --git false --install false
  4. pnpm add @astrojs/mdx @astrojs/tailwind zod pagefind
  5. pnpm add -D vitest tsx @types/node
  6. Configure astro.config.mjs (mdx + tailwind), tsconfig.json
     (strict, "moduleResolution": "bundler"), tailwind.config.ts.
  7. Create empty /src/content/ subdirs + config.ts stub.
  8. Write .github/workflows/ci.yml (typecheck + build + test).
  9. Write CLAUDE.md and STATE.md stubs.
  10. git add ., commit, push, open draft PR via gh pr create
      --draft.

Reply final line:

  scaffold=ok pr=<pr_number>
```

---

## Manager reply-parsing reference

The manager extracts exactly these regexes from subagent final lines:

```
research:    ^(?<slug>[a-z0-9/-]+) :: (?<path>/[^ ]+)$
verify pass: ^PASS$
verify fail: ^FAIL: (?<n>\d+) errors @ (?<path>/[^ ]+)$
meta pass:   ^META_PASS: (?<n>\d+) reports checked, (?<m>\d+) flagged$
meta fail:   ^META_FAIL: (?<n>\d+) reports checked, (?<m>\d+) flagged$
qa:          ^QA: avg_depth=(?<d>\d\.\d) avg_accuracy=(?<a>\d\.\d) flagged=(?<f>\d+)$
commit:      ^committed=(?<n>\d+) sha=(?<sha>[a-f0-9]+) pushed=(?<p>true|false)$
data-import: ^imported=(?<n>\d+) wfcd_version=(?<v>[0-9.]+)$
feature:     ^features=(?<n>\d+) p0=(?<p0>\d+) p1=(?<p1>\d+) p2=(?<p2>\d+)$
feat-impl:   ^implemented=(?<i>\d+) commits=(?<c>\d+)$
scaffold:    ^scaffold=ok pr=(?<pr>\d+)$
```

Any subagent reply that does not match its regex on the final line is
treated as a hard failure; manager opens a `kind:bug` issue with the
raw reply attached and requeues the slug with `retry+=1`.
