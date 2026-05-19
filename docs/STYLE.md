# STYLE

Writing voice, formatting conventions, and component palette for every MDX
page on the Warframe site. Read this before drafting any content. The
verifier checks the rules in this document; rule violations are FAIL.

## Voice

- **Informative and neutral.** Treat the reader as a competent adult who came
  here to learn, not to be entertained. No hype, no marketing copy, no fan
  worship.
- **No "fellow Tenno" fluff.** Do not address the reader with in-universe
  honorifics. Do not pretend you, the writer, are also a player ("As fellow
  Tenno..."). The site is a reference, not a roleplay forum.
- **Second-person sparingly.** "You" is fine for direct instructions ("Bring a
  Trinity for energy support") but avoid stacking it across every sentence.
  Prefer the imperative when giving directions ("Bring a Trinity") over the
  pronoun.
- **No first person.** No "I think", no "we recommend". The site speaks with
  one neutral voice. If a claim needs hedging, attribute it to a source
  ("Community consensus on r/Warframe favors...").
- **No emojis. Anywhere.** Frontmatter, prose, headings, tables. None.
- **ASCII only.** Curly quotes, em-dashes, and ellipses are rendered by the
  Markdown engine; type plain ASCII (`"`, `--`, `...`).
- **No slang or memes.** "Kuvaling", "spin to win", "MR fodder" are fine
  inside quoted player commentary but should not appear as the site's own
  voice.

## Tense

- **Present tense for facts.** "Mag has 100 health at rank 0." "The Braton
  fires 8.75 rounds per second." Game mechanics are timeless from the
  reader's perspective.
- **Past tense for lore.** "The Orokin engineered the Warframes during the
  Old War." Past tense is reserved for in-universe historical events.
- **Past tense for vaulting status.** "Mag Prime was vaulted in July 2024."
  When the prime is currently in the vault.
- **No future tense for upcoming content** unless explicitly framing it as a
  developer announcement with a citation. The site documents what exists, not
  what might.

## Headings

- **H1 is reserved for the page title.** The page layout auto-renders the H1
  from the `name` frontmatter field. Do not write `# Mag` in the MDX body.
- **Body content starts at H2.** Sub-sections use H3. Avoid H4 and deeper —
  if you find yourself at H4, refactor into bullet lists or a table.
- **Sentence case.** "Recommended builds", not "Recommended Builds". Proper
  nouns retain their casing ("Steel Path", "Eidolon Hunt").
- **No trailing punctuation in headings.** No colons, no periods.

## Stats

- **Stats live in tables or `<StatBlock>` components, never in prose.**
  "Mag has 100 health, 225 shield, 65 armor, and 175 energy" is forbidden.
  Use a `<StatBlock>` or a table.
- **Numbers are exact, not rounded.** If WFCD says `criticalChance: 0.16`,
  the page shows 16%, not "around 15%".
- **Show the unit.** Health is unitless; armor is unitless; sprint speed is
  a multiplier; fire rate is rounds per second; reload is seconds. Tables
  should include a unit column where applicable.

## Abilities

- **Use the `<AbilityCard>` component for every active ability.** The card
  takes:
  - `name` — ability name as a string.
  - `key` — `"1" | "2" | "3" | "4" | "passive"`.
  - `energyCost` — number.
  - `description` — short string, 2-3 sentences, plain text.
- **The 2-3 sentence card description summarises mechanics.** Longer
  discussion of synergies and edge cases belongs in the prose that follows
  the card, not inside it.
- **Order matches the in-game key order**: 1, 2, 3, 4, then passive (passive
  may also be summarised in the page-level "Passive" section instead).

## MDX component palette

The complete set of approved components (defined in `src/components/` during
Phase 5):

- `<StatBlock>` — render frontmatter stats as a styled card. Accepts a
  collection-aware prop (`type="warframe"`, `type="weapon"`) or an explicit
  `stats` object.
- `<AbilityCard>` — render one ability. Props: `name`, `key`, `energyCost`,
  `description`, optional `stats` object for in-card stat rows.
- `<DropTable>` — render relic / arcane / mod drop tables. Accepts a
  `drops` array prop or auto-pulls from frontmatter.
- `<BuildCard>` — render a build summary linking to the full build page.
  Props: `slug`, `name`, `purpose`, optional `summary`.
- `<Callout type="tip|warn|info">` — styled aside. Use sparingly; default to
  prose unless the information is genuinely tangential or important enough
  to flag.

No other custom components are permitted. If a page needs a new component,
file a `kind:feature` issue (see `CLAUDE.md`).

## Citations

Every numeric stat in body prose or in `<StatBlock>` must be backed by either:

- **(a)** WFCD `warframe-items` JSON, with the pinned version visible somewhere
  in `sources[]` (the `note` field is a good place — e.g.,
  `"Cross-checked against WFCD 1.756.0"`); or
- **(b)** a wiki / community citation in `sources[]` whose URL covers the
  stat.

When making narrative claims about lore, mechanics, or community consensus,
add a `sources[]` entry pointing to the document that supports the claim.
Inline footnote markers in prose are not used — citations live in
frontmatter and the page footer.

If WFCD and the wiki disagree, prefer WFCD and note the discrepancy in the
WFCD source's `note` field. Never invent a number, even to round a stat for
"clarity".

## Links

- **Internal links use absolute paths.**
  `[Mag](/warframes/mag)`. Never use relative paths (`../warframes/mag`) —
  Astro's `getCollection` baseline is the project root.
- **External links use full URLs.**
  `[Wiki](https://warframe.fandom.com/wiki/Mag)`.
- **Always link out to the Fandom wiki on first mention of any entity that
  has its own wiki page.** First mention of Mag in a Trinity page links to
  `/warframes/mag` (internal); first mention of Cetus in a Plains page links
  to the wiki because Cetus does not have its own page in this collection
  set.
- **Do not link the same entity twice in the same page.** First mention only.
- **No bare URLs in prose.** Use Markdown link syntax. If a URL is the
  literal text being shown (e.g., a quoted command), use a code span.

## Word-count floors

These mirror the values in `CLAUDE.md` and are enforced by the verifier.
Floors are minimum body-text words (frontmatter, code blocks, and tables do
not count).

| Collection            | Minimum words |
|-----------------------|---------------|
| warframes             | 800           |
| weapons               | 500           |
| builds                | 400           |
| guides (any kind)     | 1200          |
| mods                  | 300           |
| resources             | 300           |
| arcanes               | 300           |
| quests                | 500           |
| factions              | 500           |
| syndicates            | 400           |
| relics                | 300           |
| missions              | 400           |

Falling below the floor is a FAIL; padding with filler is also a FAIL caught
by Tier-2 QA. Add real information.

## Section order

The verifier checks H2 order against these templates. Extra H2s after the
required ones are permitted; missing H2s or out-of-order H2s are FAIL.

### warframe pages

1. Overview
2. Abilities
3. Passive
4. Stats
5. Acquisition
6. Playstyle
7. Builds (also accepted: "Recommended builds" or "Recommended Builds" -- all three are equivalent; verifier accepts any variant case-insensitively)
8. Lore
9. Sources (required body section; separate from the frontmatter `sources[]` array)

### weapon pages

1. Overview
2. Stats
3. Acquisition
4. Variants
5. Recommended builds
6. Notes

### mod pages

1. Overview
2. Stats per rank
3. Acquisition
4. Builds that use it
5. Notes

### build pages

1. Overview
2. Loadout
3. Playstyle
4. Strengths and weaknesses
5. Alternatives
6. Notes

### guide pages (farming / strategy / path)

1. Overview
2. Prerequisites
3. Steps
4. Tips
5. Common mistakes
6. Further reading

### quest pages

1. Overview
2. Prerequisites
3. Stages
4. Rewards
5. Lore

### faction pages

1. Overview
2. Units
3. Damage profile (weakness / resistance)
4. Locations
5. Notes

### syndicate pages

1. Overview
2. Standing rewards
3. Daily cap and grind notes
4. Recommended order to rank
5. Notes

### relic pages

1. Overview
2. Drop tables
3. Refinement choices
4. Where to farm
5. Notes

### arcane pages

1. Overview
2. Effect
3. Stats per rank
4. Acquisition
5. Builds that use it
6. Notes

### mission pages

1. Overview
2. Mission details
3. Rewards
4. Recommended loadout
5. Notes

### resource pages

1. Overview
2. Where it drops
3. Used for
4. Tips
5. Notes

## Tables

- Use Markdown tables, not HTML. The Markdown engine renders them with
  Tailwind utility classes.
- Header row mandatory. Use sentence case in headers.
- Numeric columns right-aligned (`| --- | ---: |`); text columns left-aligned.
- One stat per row, not one frame per column. Vertical tables read better on
  mobile.

## Code and inline values

- Item names, ability names, mod names: plain prose, no formatting.
- Slugs (the URL identifiers): backticks (`` `mag` ``, `` `corrosive-projection` ``)
  to distinguish from display names.
- Field names from frontmatter: backticks (`` `criticalChance` ``).
- File paths: backticks (`` `src/content/warframes/mag.mdx` ``).
- Commands: code blocks (triple-backtick).

## Lists

- Use bullet lists for unordered items, numbered lists for sequences (quest
  stages, build steps, path milestones).
- Lead each bullet with a noun or a verb in the imperative; do not start with
  "The" / "A" if avoidable.
- One sentence per bullet; if you need two, the bullet probably wants to be a
  paragraph or its own H3 subsection.

## Numbers and units

- Health, shield, armor, energy: integers.
- Critical chance, status chance: decimals in frontmatter; rendered as
  percentages (`0.16` -> `16%`).
- Times in seconds: one decimal place (`2.0`, `2.5`).
- Distances in meters: integers when WFCD reports integers, one decimal
  otherwise.
- Percentages in prose: append `%` with no space (`16%`, not `16 %`).

## Frontmatter etiquette

- Always quote strings containing colons, hashes, or starting with
  punctuation. `name: "Mag: Special Edition"` not `name: Mag: Special
  Edition`.
- YAML supports both `key: { sub: 1 }` flow style and indented block style.
  Prefer flow style for short objects (single-line stats), block style for
  longer ones.
- `updatedAt` is the date the content was verified against authoritative
  sources, not the file's modification date. Update it whenever you touch
  the body or stats.

## Spoiler handling

- Lore-heavy fields (`quests.lore`, the "Lore" H2 on warframe pages) may
  contain spoilers from quests completed in the page's prerequisites.
- For spoilers about future quests, wrap the relevant paragraph in
  `<Callout type="warn">Spoilers for *Quest Name* follow.</Callout>` and
  start a new paragraph after.

## Don'ts (quick reference)

- Do not write `# Page Title` — the layout handles H1.
- Do not write stats in prose.
- Do not address the reader as "Tenno", "fellow Tenno", "Operator", or any
  in-universe name.
- Do not use first person.
- Do not include emojis.
- Do not invent stats.
- Do not link the same entity more than once on the same page.
- Do not use relative paths in internal links.
- Do not pad to hit the word-count floor.
- Do not nest deeper than H3.
- Do not use non-ASCII punctuation directly — let the renderer typeset.

## Reference

- Schemas: `docs/SCHEMAS.md` and `src/content/config.ts`.
- Project rules and bootstrap: `CLAUDE.md`.
- Agent prompts: `docs/AGENTS.md`.
- Data sources: `docs/DATA.md`.
