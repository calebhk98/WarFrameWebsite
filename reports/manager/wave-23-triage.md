# Wave 23 Triage — Verifier Findings

Date: 2026-05-22
Manager session: rate-limited on agent dispatch at session-cap; this file
captures the diagnostic state for the next manager pass.

## Raw verifier counts

| Collection  | Total | Pass | Fail | Notes |
| ----------- | ----: | ---: | ---: | ----- |
| warframes   | 110   | 107  | 3    | H2 order: gara-prime, gauss, limbo-prime (real) |
| weapons     | 608   | 575  | 33   | 31 word-floor (real) + 2 duplicate H2 (real) |
| mods        | -     | -    | 30   | needs slug-level breakdown |
| arcanes     | 179   | 177  | 2    | **FALSE POSITIVE** — em-dash in source-title (Wiki page name), not entity title |
| resources   | 221   | 221  | 0    | PASS |
| missions    | -     | -    | 7    | real, mixed categories |
| relics      | 5     | 0    | 5    | **PARTIAL FALSE POSITIVE** — verifier's expected H2 list disagrees with STYLE.md / file reality; some H2 names ("Drop Tables" vs "Drop Locations") are real STYLE.md drift |
| factions    | ~35   | ~3   | 32   | **MOSTLY FALSE POSITIVE** — verifier expected lowercase H2s without trailing `Sources`; real H2 order in files is correct per SCHEMAS.md |
| syndicates  | ~18   | ~7   | 11   | **MOSTLY FALSE POSITIVE** — same verifier-rule mismatch as factions |
| quests      | -     | -    | 0    | PASS |
| builds      | 47    | 47   | 0    | PASS |
| guides      | 26    | 26   | 0    | PASS |

## Root cause analysis

Three of the apparent "fail" piles are verifier-script bugs, not content bugs:

1. **Trailing `Sources` H2** — SCHEMAS.md requires every entity page to end
   with a `## Sources` heading. Several verifier scripts were written with an
   "expected" H2 list that omits Sources, so any file that complies with
   SCHEMAS.md fails. Fix: update verifier expected-lists OR update STYLE.md
   to make Sources a meta-section rendered outside the H2 sequence.

2. **Case-sensitive H2 match** — STYLE.md uses Title Case for examples
   (`## Overview`, `## Notes`). Verifiers compare against lowercase strings
   (`overview`, `notes`). Fix: case-insensitive comparison in verifier.

3. **ASCII rule scope** — CLAUDE.md mandates ASCII slugs and entity names.
   The arcanes verifier extended this to source-title strings, but Wiki
   page names legitimately contain em-dashes (the canonical Wiki page IS
   `Arcane_Detoxifier_—_WARFRAME_Wiki`). Replacing those em-dashes would
   misquote the source. Fix: scope ASCII rule to slugs + entity name +
   prose, exclude source.title.

## Real fix scope (after triage)

| Collection  | Real fail count | Effort | Type |
| ----------- | --------------: | ------ | ---- |
| warframes   | 3               | low    | H2 reorder (manual edit) |
| weapons     | 33              | medium | 31 prose expansion + 2 H2 dedupe |
| mods        | 30              | medium | needs slug breakdown first |
| missions    | 7               | low    | mixed surgical fixes |
| relics      | ~2              | low    | rename `Drop Locations` -> `Drop Tables` per STYLE.md |
| factions    | 0-3             | trivial | verifier rule fix; spot-check 3 outliers |
| syndicates  | 0-3             | trivial | same as factions |
| arcanes     | 0               | none   | false positive |

Net real content fixes: **~75 files**, not 123.

## Verifier rule fixes (one-shot)

Before launching wave-23 content fixes, a verifier-script update wave should
land first. Files to fix:

- the relics verifier expected-H2 list (in whichever subagent prompt or
  helper script holds it)
- the factions verifier expected-H2 list
- the syndicates verifier expected-H2 list
- the arcanes ASCII-scope check

These verifier corrections will reduce wave-23 from a 9-agent fix wave to
a 4-agent wave (warframes H2, weapons word-floor, mods, missions).

## Next manager pass

1. Land the verifier-rule corrections (1 dev pass).
2. Re-run verifiers for relics, factions, syndicates, arcanes — expect
   PASS for arcanes and most of factions/syndicates.
3. Dispatch wave-23 content-fix agents only for warframes (3), weapons
   (33), mods (30 — TBD breakdown), missions (7), relics (~2).
4. Commit-batch + push, confirm GitHub CI green.
5. Run UX audit (was deferred this session).
6. Determine ship-readiness.
