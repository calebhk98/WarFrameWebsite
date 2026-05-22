# State Audit Report — Warframe Fan Site
**Audited:** 2026-05-21  
**Auditor role:** Read-only state auditor  
**Branch:** `claude/warframe-website-setup-gvaG9`  
**PR #1:** Open, NOT draft (undrafted per Phase 7 requirement) — ready for review

---

## Section 1: Phase Status

### Current Phase
- `STATE.md ## phase` reads: `7:closeout-qa`
- All phase issues #2–#10 (phases 0–8) are **CLOSED** on GitHub.
- Phase 5 issue (#5, phase-3) still carries the `phase:active` label — **stale label, cleanup needed.**
- `STATE.md ## queue.phases` still lists all phases 2–8 as queued — **never cleaned up after completion.**

### Phase Done Criteria vs Reality

| Phase | Issue | GH State | CI Green? | Acceptance | Notes |
|-------|-------|----------|-----------|------------|-------|
| 0 — Scaffold | #2 | Closed | Yes | Met | |
| 1 — Docs | #3 | Closed | Yes | Met | All doc files exist |
| 2 — Data | #4 | Closed | Yes | Met | 27 WFCD JSON files, 41 tests |
| 3 — Enumeration | #5 | Closed | Yes | Met | 10 enumeration JSONs exist |
| 4 — Content | #6 | Closed | Partial | **NOT MET** | done.weapons, done.mods, done.arcanes, done.missions, done.resources, done.builds, done.guides all empty in STATE.md; files exist on disk but STATE.md accounting was never reconciled |
| 5 — Pages | #7 | Closed | Yes | Met | 1,692 static pages built |
| 6 — Polish/Deploy | #8 | Closed | Yes | Met | Pagefind built, DEPLOY.md exists |
| 7 — Closeout | #9 | Closed | Yes | Met | PR undrafted, zero `state:failed` open issues |
| 8 — Improvement | #10 | Closed | Yes | **Partial** | features.json has 5 items marked "queued" but those pages actually exist; features.json never updated to reflect shipped status |

### Critical State Inconsistencies
1. **STATE.md phase not advanced**: Reads `7:closeout-qa` but phases 7 and 8 are both closed. Should read `8:done` or equivalent.
2. **STATE.md queue.phases not cleaned**: Lists phases 2–8 as still queued.
3. **STATE.md done.* sections not updated for 6 collections**: weapons (589 files), mods (229), arcanes (179), missions (39), resources (221), builds (47), guides (26) all have files on disk but STATE.md `done.*` sections show zero entries.
4. **features.json status mismatch**: F-012 through F-016 marked "queued" but all pages exist at `src/pages/frame-graph.astro`, `progression.astro`, `fashion.astro`, `dojo-planner.astro`, `drop-sim.astro`.
5. **Stale `phase:active` label**: Issue #5 (phase-3) still carries `phase:active` on GitHub.

---

## Section 2: Open Issues Table

**Open issues on GitHub: 0** — All 27 issues are CLOSED.

No `state:failed`, `human-review-needed`, or `kind:bug` issues are open.

Note: Several closed issues had `state:queued` labels but were never updated to `state:done`. This is cosmetic — the issues are closed.

---

## Section 3: Content Inventory

### File counts vs enumeration targets

| Collection | Files on Disk | Enumeration Target | STATE.md done | STATE.md verified | Floor (words) | Files Below Floor |
|------------|--------------|-------------------|---------------|------------------|---------------|-------------------|
| warframes  | 110          | 110               | 110           | 110              | 800           | 0                 |
| weapons    | 589          | 598               | **0 (bug)**   | 0                | 500           | **251 (43%)**     |
| mods       | 229          | 199 featured      | **0 (bug)**   | 0                | 300           | 0                 |
| quests     | 43           | 43                | 43            | 1                | 500           | 0                 |
| factions   | 35           | 35                | 35            | 23               | 500           | 0                 |
| syndicates | 18           | 18                | 18            | 0                | 400           | 0                 |
| relics     | 5            | 5 (era pages)     | 0             | 0                | 300           | 0                 |
| arcanes    | 179          | 156               | **0 (bug)**   | 0                | 300           | 0                 |
| missions   | 39           | ~21 planet pages  | **0 (bug)**   | 0                | 400 (STYLE) / 500 (CLAUDE) | 0 |
| resources  | 221          | 224               | **0 (bug)**   | 0                | 300           | **54 (24%)**      |
| builds     | 47           | deferred/phase-4  | 0             | 0                | 400           | 0                 |
| guides     | 26           | deferred/phase-4  | 0             | 0                | 1200          | 0                 |

Extra collections found (not in ORCHESTRATION scope but present on disk):
- `src/content/amps/`: 10 files
- `src/content/companions/`: 24 files
- `src/content/necramechs/`: 2 files
- `src/content/archwings/`, `conclave/`, `dojo/`, `focus-schools/`, `liches/`, `open-worlds/`, `railjack/`, `rivens/` (all present)

### Verification gap
- Only `warframes` (110/110) and `factions` (23/35 partial) have verified.* entries in STATE.md.
- All other collections have zero verified entries — no verifier wave has been run for weapons, mods, arcanes, missions, resources, builds, guides, or syndicates.
- Quests: only `whispers-in-the-walls` verified (1/43).

---

## Section 4: Code-Quality Gaps

### TypeScript hygiene
- `any` types in `.ts/.tsx/.astro` files: **0** (clean)
- `@ts-ignore` / `@ts-expect-error`: **0** (clean)
- `console.log` in src/: **0** (clean)
- TODO comments without issue links: **0** (clean)

### File-size budget violations (>250 lines)
Files exceeding the 250-line hard limit per CLAUDE.md:

| File | Lines |
|------|-------|
| `src/data/helminth-index.ts` | 1,408 |
| `src/pages/frame-graph.astro` | 433 |
| `src/pages/drop-sim.astro` | 415 |
| `src/pages/modular-builder.astro` | 392 |
| `src/pages/dojo-planner.astro` | 388 |
| `src/pages/helminth-planner.astro` | 355 |
| `src/data/modular-parts.ts` | 680 |
| `src/data/progression-tracks.ts` | 431 |
| `src/data/frame-relationships.ts` | 311 |
| `src/data/star-chart.ts` | 260 |
| `src/data/dojo-rooms.ts` | 488 |
| `src/data/fashion-showcase.ts` | 239 |
| `src/lib/wfcd.ts` | 258 |
| `src/lib/market.ts` | 219 |
| `src/lib/worldstate.ts` | 225 |
| `src/pages/star-chart.astro` | 297 |
| `src/pages/compare.astro` | 253 |
| `src/pages/compare-warframes.astro` | 238 |
| `src/pages/damage-types.astro` | 264 |
| `src/pages/build-calculator.astro` | 242 |
| `src/pages/riven-planner.astro` | 213 |
| `src/pages/beginner.astro` | 201 |
| `src/pages/fashion.astro` | 264 |
| `src/components/Header.astro` | 207 |

**Count: 24 files exceed 250 lines. 6 files exceed 200 lines (warn zone).**  
`helminth-index.ts` at 1,408 lines is the most severe violation (5.6x the limit).

### TDD compliance
- TDD red commits found: 5 proper `test(lib/...)` red commits visible in git log for fetch, worldstate, wfcd, market, enumerations.
- Feature wave commits (`feat(wave-N):`) are bulk commits without paired test commits — consistent with Phase 4/5 content batching, which TDD.md explicitly exempts for content MDX.
- `feat(drop-sim):`, `feat(progression):` commits are not preceded by `test:` commits on those paths — **TDD violation for interactive page code**.

### Docs inconsistency
- **CLAUDE.md vs STYLE.md mission word floor conflict**: CLAUDE.md groups `quest / faction / syndicate / mission` at 500 words. STYLE.md lists `missions` separately at 400 words and `syndicates` at 400 words. The verifier has no single authoritative source.
- STYLE.md explicitly says it mirrors CLAUDE.md but the missions/syndicates values differ.

### Widget wiring
- `worldstate.astro`: fully wired — imports and calls `getSorties()`, `getFissures()`, etc. via `src/lib/worldstate.ts`. Real data.
- `market.astro`: fully wired — calls `getItemLowestSellPrice()` from `src/lib/market.ts`. Real data.
- `star-chart.astro`: wired to `src/data/star-chart.ts` static data — functional but uses static data file, not WFCD runtime data.
- All worldstate widget components (`WorldstateSortie`, `WorldstateFissures`, etc.) exist and are imported.

### Pagefind
- `dist/pagefind/` exists and is populated with index files. Search is built and functional.

### WFCD data
- `data/wfcd/` has **27 JSON files** — comprehensive. All major types present (Warframes, Weapons split by type, Mods, Arcanes, Relics, Resources, Missions, etc.).

### Data cache
- `data/cache/warframestat/` and `data/cache/wiki/` exist — cache directories present.

---

## Section 5: Feature Gaps (Ship-to-Customer)

### CRITICALLY MISSING (customer would call it broken)

1. **251 of 589 weapon pages (43%) are below the 500-word floor** — these pages would fail the verifier. A player visiting a weapon page would find thin stubs instead of full documentation. Examples: `kronen-prime` (233 words), `efv-5-jupiter` (248 words), `aksomati-prime` (241 words), `dehtat` (243 words), `dual-ether` (248 words).

2. **54 of 221 resource pages (24%) are below the 300-word floor** — same problem for resources.

3. **STATE.md is entirely out of sync with the filesystem for 7 collections** — done.weapons, done.mods, done.arcanes, done.missions, done.resources, done.builds, done.guides are empty while hundreds of files exist. The manager's source of truth is broken. Any future wave dispatch based on STATE.md would re-research already-done items.

4. **Verification was never run on weapons, mods, arcanes, resources, missions, builds, or guides** — zero verified.* entries for these collections. There is no confirmation these files pass the Zod schema or the verifier rules.

5. **Phase 4 acceptance criteria not met**: CLAUDE.md requires `done.<c>` == enumeration count AND `verified.<c>` == enumeration count for content phases to be "done." Neither condition holds for 7 of 12 collections.

### MISSING FOR FULL FEATURE COMPLETENESS

6. **features.json out of date**: F-012 through F-016 marked "queued" but corresponding pages already exist (`frame-graph.astro`, `progression.astro`, `fashion.astro`, `dojo-planner.astro`, `drop-sim.astro`). These were shipped as part of wave commits but features.json was never updated to `"status": "shipped"`.

7. **Builds and guides not tracked in STATE.md** — 47 build files and 26 guide files exist but have no `done.*` or `verified.*` STATE.md entries.

8. **9 weapons from the enumeration (598 - 589 = 9) missing files** — may be legitimate (PR claims "dupe/non-real entries") but no documentation of which 9 are excluded.

---

## Section 6: Polish Gaps

1. **File size budget**: 24 source files exceed the 250-line hard limit. `helminth-index.ts` at 1,408 lines violates the guardrail by 5.6x. This is a code quality issue but not a user-visible runtime bug.

2. **docs inconsistency**: missions/syndicates word floor conflicts between CLAUDE.md (500) and STYLE.md (400/400). The verifier's authoritative value is unclear.

3. **Stale GitHub state**: Issue #5 still labeled `phase:active`. PR body claims builds=47 and guides=26 but STATE.md shows 0 for both — the PR body was written with correct filesystem counts but STATE.md wasn't reconciled before the PR was undrafted.

4. **STATE.md queue.phases not cleaned**: Lists phases 2–8 as still queued even though all are closed.

5. **Phase boundary not reached in STATE.md**: STATE.md reads `7:closeout-qa` but should read `8:done` now that both phases 7 and 8 are closed.

6. **TDD gap for interactive pages**: `drop-sim.astro` and `progression.astro` feat commits have no preceding red test commits. These are non-trivial interactive pages with logic (Monte Carlo engine, MR ranking/filtering) that TDD.md explicitly requires test coverage for.

7. **Extra collections (amps, companions, necramechs, etc.)** not enumerated in STATE.md or referenced in ORCHESTRATION.md. These appear to be extra scope additions from Phase 5/6/8 waves that were never formally incorporated into the project state.

---

## Section 7: Prioritized Wave Plan

The manager should dispatch these waves next, in this order:

### Wave 1 — STATE.md Reconciliation (1 commit-batch subagent)
**Priority: CRITICAL — blocking all future management**  
Dispatch a single reconciliation subagent to:
- Update `## phase` to `8:done` 
- Clear `## queue.phases` (all phases complete)
- Populate `done.weapons` with all 589 weapon slugs from disk
- Populate `done.mods` with all 229 mod slugs from disk
- Populate `done.arcanes` with all 179 arcane slugs from disk
- Populate `done.missions` with all 39 mission slugs from disk
- Populate `done.resources` with all 221 resource slugs from disk
- Populate `done.builds` with all 47 build slugs from disk
- Populate `done.guides` with all 26 guide slugs from disk
- Update `features.json` F-012 through F-016 to `"status": "shipped"`
- Remove stale `phase:active` label from GitHub issue #5

### Wave 2 — Word-Count Remediation (up to 8 parallel research subagents)
**Priority: HIGH — 43% of weapons and 24% of resources are below floor**  
Dispatch research subagents to expand content for:
- The 251 weapon files below 500 words (fan out in batches of 8)
- The 54 resource files below 300 words (fan out in batches of 8)
- After each batch: 1 commit-batch subagent

### Wave 3 — Verification Pass (up to 12 parallel verifier subagents)
**Priority: HIGH — no collection except warframes and partial factions has been verified**  
After word-count remediation, dispatch verifier subagents against:
- weapons (run batches of 12 slugs per verifier)
- mods (229 files)
- arcanes (179 files)
- missions (39 files)
- resources (221 files after remediation)
- builds (47 files)
- guides (26 files)
- quests (remaining 42 unverified)
- syndicates (18 files)
- relics (5 era pages)

For any FAIL: open `kind:bug, state:failed` issue, requeue with `retry:1` annotation.

### Optional Wave 4 — File-Size Refactoring (code subagents)
**Priority: LOW — tech debt, not user-visible**  
Split the oversized files, starting with the worst offenders:
- `src/data/helminth-index.ts` (1,408 lines) → split into per-category modules
- `src/pages/frame-graph.astro` (433 lines) → extract data and render logic
- `src/pages/drop-sim.astro` (415 lines) → extract Monte Carlo engine to `src/lib/drop-sim.ts`
Each refactor should be preceded by a failing test (`test:` commit) per TDD.md.

---

## Appendix: Test File Count
- Unit/integration test files: 6 (`tests/lib/*.test.ts`, `tests/smoke.test.ts`)
- E2E test files: 5 (`tests/e2e/*.spec.ts`)
- Total test files: 11
