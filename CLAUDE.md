# CLAUDE.md — Warframe Fan Site

This file is the entry point for every Claude instance that touches this repo.
Managers read the BOOTSTRAP section first. Code subagents read the
ENGINEERING GUARDRAILS section. Research subagents read CONTENT RULES.

---

## MANAGER BOOTSTRAP

You are the manager for this project. **You never code. You never read Warframe
content files. You delegate to subagents.** Your job is to move slugs between
queue / done / verified / failed buckets in `STATE.md`, dispatch waves of
subagents, and confirm filesystem state.

### Bootstrap step — run this at the start of every turn

Especially after a fresh start or context summarization, run in this order:

1. Read this `CLAUDE.md` fully.
2. Read `docs/ORCHESTRATION.md` fully.
3. Get queue counts:
   ```
   grep -c '^- ' STATE.md            # total queued items across all sections
   # per-section counts:
   for s in queue done verified failed; do
     for c in warframes weapons mods quests factions syndicates relics arcanes \
              missions resources builds guides; do
       n=$(awk "/^## ${s}\\.${c}\$/{flag=1;next} /^## /{flag=0} flag" STATE.md \
           | grep -c '^- ')
       echo "${s}.${c}=${n}"
     done
   done
   ```
4. Query GitHub for the active phase:
   ```
   gh issue list --label phase:active --json number,title,labels
   ```
5. Only **then** dispatch the next wave of subagents.

### Phase resolution rules

- If `STATE.md` `## phase` reads `0:scaffold-complete`, you are at **Phase 1**
  (docs). Dispatch the Phase 1 wave.
- If no GitHub issue has the `phase:active` label, find the lowest-numbered
  open phase issue and label it `phase:active`.
- If `STATE.md` does not exist, you are at Phase 0 — the scaffold subagent
  has not run yet.
- One — and only one — phase issue may carry `phase:active` at any time.

### Branch & commit strategy

- Single long-lived branch: `claude/warframe-website-setup-gvaG9`.
- All Phase 0–8 work lands on this branch.
- **Subagents write files. Subagents never commit.**
- After each wave you dispatch exactly **one** `commit-batch` subagent that
  runs `git pull --rebase`, `git add <known paths>`, makes a single
  Conventional Commit, and `git push`.
- This serialises git operations and prevents non-fast-forward races.
- One draft tracking PR opened in Phase 0, undrafted in Phase 7.

### Subagent reply contracts (rigid; bounds your context)

| Role          | Reply line(s)                                                                |
| ------------- | ---------------------------------------------------------------------------- |
| Enumeration   | `count=<N> path=<file>`                                                      |
| Research      | `<slug> :: <target_path>` (one line); subagent appended slug to STATE.md     |
| Verifier      | `PASS` or `FAIL: <n> errors @ <report_path>`                                 |
| Tier-2 verify | `PASS` or `FAIL: <reason> @ <report_path>`                                   |
| QA            | `score=<1-5> slug=<slug> report=<path>`                                      |
| Commit-batch  | `committed=<N> sha=<short> pushed=<bool>`                                    |
| Scaffold      | `done paths=<comma-separated>`                                               |

You confirm via `ls` (file exists?) and `grep` (state updated?). You do not
open the file content.

### Concurrency caps

| Role                       | Max parallel |
| -------------------------- | ------------ |
| Enumeration (`Explore`)    | 10           |
| Research (`general-purpose`) | 8          |
| Verifier                   | 12           |
| Tier-2 verifier            | 4            |
| QA sampler                 | 4            |
| `commit-batch`             | **1** (always) |
| Hard global cap            | 20           |

Shared token-bucket lives in `scripts/fetch.ts`: ≤ 3 WebFetch req/s globally.
All subagents that hit the network route through it — enforced by lint/grep,
not honor code.

### Failure recovery

- Verifier `FAIL` → manager opens auto-issue (`kind:bug`, label
  `state:failed`, body cites the report path) and requeues the slug in
  `STATE.md` with a `retry:N` annotation:
  `- mag-prime retry:1`
- After **2** failed retries → label `human-review-needed` and move on.
- Bounds wasted compute; surfaces stuck slugs to the human.

### What "phase done" means

Each phase issue has a checklist. A phase is done iff:
1. Checklist ticked.
2. CI green (typecheck + build + Vitest + schema).
3. For content phases: `done.<c>` count == enumeration count and
   `verified.<c>` count == enumeration count.
4. Zero open issues with `state:failed` for that phase.
5. Latest commit on branch is from the phase's final `commit-batch`.

---

## Mission

Build a comprehensive Warframe fan site with full coverage of every public
in-game entity (warframes, weapons, mods, resources, missions, factions,
syndicates, quests, relics, arcanes) plus deep build / farming / strategy
content. Data sources, in priority order:

1. **WFCD `warframe-items` JSON** (`/data/wfcd/*.json`) — canonical for all
   numeric stats.
2. **warframestat.us** — live world state (sortie, fissures, invasions).
3. **warframe.market** — plat prices, item availability.
4. **warframe.fandom.com** — link out only. Cited quotes ≤ 2 sentences;
   never scrape.

> **EXCEPTION for `masteryRank`:** WFCD `masteryReq`/`masteryRank` fields
> are unreliable upstream (issue #23) — they report 0 for all warframes
> regardless of in-game requirements. Source `masteryRank` from the Fandom
> Wiki when WFCD reports 0 for a frame that requires non-zero mastery in-game.
> WFCD remains canonical for all other numeric stats. See `docs/DATA.md`
> for the full exception rule and field-name mapping.

Static site, no runtime DB. Filesystem is the DB.

## Stack

- **Framework:** Astro 4 + MDX
- **Language:** TypeScript (strict)
- **Styling:** Tailwind
- **Search:** Pagefind (post-build static index)
- **Validation:** Zod (content collection schemas)
- **Testing:** Vitest
- **Package manager:** pnpm
- **Runtime:** Node 20

## Slug rules

- Lowercase only.
- Words separated by single hyphens.
- ASCII only — strip diacritics (`hildryn`, not `hildrýn` — fictional example).
- No trailing punctuation, no leading numbers if avoidable.
- Examples: `mag-prime`, `kuva-bramma`, `the-second-dream`, `void-traces`.

A slug, once chosen, is immutable — it is the URL, the filename stem, and the
key in every enumeration and report. Renaming requires a redirect.

## Commit convention

Conventional Commits, with these scopes:

| Type / scope            | Use for                                              |
| ----------------------- | ---------------------------------------------------- |
| `content(<collection>)` | New / updated MDX content                            |
| `verify(<collection>)`  | Verifier output, verifier code changes               |
| `data:`                 | WFCD imports, world-state cache, market snapshots    |
| `feat:`                 | New code feature (lib, component, page, script)      |
| `fix:`                  | Bug fix                                              |
| `refactor:`             | Behaviour-preserving code change                     |
| `test:`                 | Test-only commit (TDD red commits)                   |
| `chore(phase-N):`       | Phase boundary commits, label moves, housekeeping    |
| `docs:`                 | Documentation changes                                |

Example: `content(warframes): add mag-prime`, `chore(phase-1): close docs phase`.

---

## ENGINEERING GUARDRAILS

Every code subagent must follow these. CI enforces the mechanical ones; the
rest are reviewed by verifier subagents.

### TypeScript

- `strict: true` everywhere. No project-level escape hatches.
- **No `any`.** If a third-party type is missing, write a local `.d.ts`.
- **No `@ts-ignore` / `@ts-expect-error`** without an accompanying GitHub
  issue link in the comment, e.g.
  `// @ts-expect-error see #142 — upstream typing bug`.

### File and function size

- Files ≤ **250 lines**. Warn at 200.
- Functions ≤ **40 lines**.
- Functions ≤ **3 parameters**. If you need more, take a single param object.
- One default export per module max; prefer named exports.

### Never-nesting

- Early returns over nested `if`.
- Extract helpers before reaching for a second level of nesting.
- **Max 2 levels of indentation inside a function body.**
- Guard clauses are encouraged.

### SOLID, applied

- One responsibility per module. If you find yourself naming a file
  `utils.ts`, split it.
- Prefer dependency injection (pass the client / fetcher / logger) over
  hard-imported singletons where it aids testability.
- Pure functions for everything that can be pure; side effects at the edges.

### Hygiene

- No dead code. No commented-out code blocks — delete; git remembers.
- No `console.log` in committed code. Use a `logger` module if needed.
- No TODO comments without an issue link.

### Data and content

- **Never invent numbers.** WFCD is canonical for every numeric stat. If
  WFCD lacks the field, mark the value `"unknown"` in frontmatter and
  explain in narrative.
- Cite sources for narrative claims (mechanics, lore, history).
- **Never scrape Fandom HTML.** Short cited quotes + link-out only.

### Network

- All `WebFetch` / `fetch` calls must go through `scripts/fetch.ts`
  (shared token-bucket + on-disk cache at `/data/cache`).
- Importing `node:fetch` or calling `fetch(...)` directly in a script is a
  lint failure (a CI grep step blocks the merge).
- Fixtures, not network, in tests (see `docs/TDD.md`).

### Local CI gate

A Husky `pre-push` hook runs on every `git push` and mirrors the GitHub
Actions `build` + `validate-html` + `bundle-size` jobs in order, fail-fast:

```
pnpm typecheck
pnpm build
pnpm test
pnpm html:check
pnpm bundle:check
```

(Lighthouse and Playwright e2e are intentionally excluded: lighthouse is
cloud-flaky with `continue-on-error` in CI; e2e requires the Playwright
grid.)

**Rules for subagents and commit-batch:**

- The hook runs automatically on every `git push`. **Do not suppress it.**
- `commit-batch` subagents MUST NOT pass `--no-verify` to `git push` without
  an explicit instruction from the human operator. Bypassing the gate defeats
  its purpose and is treated as a policy violation.
- "Local `pnpm test` passing" is **not** sufficient to declare CI green.
  After each push, the manager MUST verify that GitHub check-runs for the
  `build` job are green (use `gh run list --branch <branch>` or the GitHub
  MCP `pull_request_read` tool). Local green + remote green = CI green.
- To run all gate checks ad-hoc without going through git, use:
  ```
  pnpm verify
  ```
- Emergency escape valve: `git push --no-verify`. Reserved for cases where
  the check can only pass on GitHub's runners (e.g. a platform-specific
  binary). Must be documented in the commit message when used.

---

## CONTENT RULES

Every research subagent must follow these.

### Stats are sourced, never invented

- Numeric stats come from `/data/wfcd/*.json` only. Use `src/lib/wfcd.ts`
  typed accessors — never `JSON.parse` the WFCD dump directly.
- If WFCD does not have the field, frontmatter value is `"unknown"` and the
  narrative explains why.
- If you find a stat in Wiki/Fandom that contradicts WFCD, WFCD wins; note
  the discrepancy in a `notes` field, do not "fix" it.
- **EXCEPTION for `masteryRank`:** WFCD `masteryReq`/`masteryRank` fields are
  unreliable upstream (issue #23). Source from Fandom Wiki when WFCD reports
  0 for a frame that requires non-zero mastery in-game. WFCD remains canonical
  for all other numeric stats. See `docs/DATA.md` for the full rule.

### Word-count floors (frontmatter must meet or exceed)

| Collection                  | Min words |
| --------------------------- | --------- |
| warframe                    | 800       |
| weapon                      | 500       |
| build                       | 400       |
| guide (farming / strategy)  | 1200      |
| mod                         | 300       |
| resource                    | 300       |
| arcane                      | 300       |
| relic                       | 300       |
| quest / faction / syndicate / mission | 500 |

Below the floor → verifier fails the file.

### Sources

- **≥ 2 sources** in frontmatter, each shaped `{ url, accessedAt }` where
  `accessedAt` is ISO-8601 UTC.
- At least one source must be a primary reference (WFCD JSON path counts as
  primary; warframestat.us, warframe.market also count). Fandom alone is not
  enough.
- Every narrative claim of mechanics or numbers should be traceable to a
  source listed in frontmatter.

### Link out, do not copy

- Each entity page links out to `https://warframe.fandom.com/wiki/<Name>`
  using a stable `LinkOutFandom` component. Use the canonical Wiki capitalised
  name (`Mag_Prime`), not the slug.
- Quotes from Fandom: ≤ 2 sentences, cited inline with the URL.

---

## WHEN IN DOUBT

| Question                                       | Doc                          |
| ---------------------------------------------- | ---------------------------- |
| What fields does my MDX need?                  | `docs/SCHEMAS.md`            |
| What's my exact prompt / reply format?         | `docs/AGENTS.md`             |
| How should the prose read?                     | `docs/STYLE.md`              |
| Where do stats live? Which API endpoint?       | `docs/DATA.md`               |
| Do I need a failing test first?                | `docs/TDD.md`                |
| How does the manager loop work?                | `docs/ORCHESTRATION.md`      |
| How do I run the site locally?                 | `docs/LOCAL_DEV.md`          |
| How do I deploy the finished site?             | `docs/DEPLOY.md` (Phase 6)   |

If the answer is not in any of these, file a `kind:feature` issue with
context — do not guess.
