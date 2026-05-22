# Orchestration — Manager Playbook

## Purpose

This document is the manager's operational reference. The manager reads it on
**every bootstrap** (fresh start or post-summarization) along with
`CLAUDE.md`. Where `CLAUDE.md` covers project-wide rules, this file covers
the loop the manager executes turn after turn: how to read state, how to
dispatch subagents, when to advance a phase, and how to recover from
failures.

The manager never opens an `.mdx`, `.ts`, or `.astro` file. The manager
moves slugs between buckets in `STATE.md` and queries GitHub issues.

---

## Manager Loop (pseudocode)

```
on every turn:
  if first turn OR anything looks unfamiliar:
    read CLAUDE.md
    read docs/ORCHESTRATION.md
    grep STATE.md sections (counts only)
    gh issue list --label phase:active --json number,title

  pick highest-priority section with non-empty queue
  wave_size = min(8, queue_len)  for research
  wave_size = min(12, queue_len) for verify
  dispatch wave in parallel (templated prompts from docs/AGENTS.md)
  collect one-line replies

  for each reply:
    ls <reported_path>                    # file actually exists?
    grep STATE.md for slug in done/failed # state actually updated?
    if both green: continue
    else: treat as FAIL, requeue

  if wave produced new files:
    dispatch 1 commit-batch subagent
    confirm: committed=<N> sha=<short> pushed=true

  on FAIL:
    gh issue create --label "kind:bug,state:failed"
    requeue slug in STATE.md with `retry:N` annotation
    if retry > 2: label `human-review-needed`, drop

  if phase acceptance met:
    tick phase issue checklist
    close phase issue
    label next phase issue `phase:active`

  if Phase 8 done condition met:
    write final summary
    stop
```

The loop is intentionally simple. Anything more interesting (e.g. picking
which collection to fan out next) is a static priority order defined in the
phase section, not a dynamic decision.

---

## STATE.md Schema

`STATE.md` is the manager's source of truth. Read sections individually with
`awk` / `grep`; never read whole file into context.

### Section format

```
## <section-name>
- <item>
- <item> retry:1
```

Blank line between sections. One item per line. Empty section is allowed
(just the header).

### Sections

| Section name              | Purpose                                       | Line format                              |
| ------------------------- | --------------------------------------------- | ---------------------------------------- |
| `## phase`                | Current phase (single line, not a list)       | `N:label` (e.g. `1:docs`)                |
| `## queue.phases`         | Ordered list of phase IDs not yet started     | `- N:label`                              |
| `## queue.<collection>`   | Slugs waiting to be researched                | `- <slug>` or `- <slug> retry:N`         |
| `## done.<collection>`    | Slugs whose file has been written             | `- <slug> :: <target-path>`              |
| `## verified.<collection>`| Slugs whose verifier returned `PASS`          | `- <slug>`                               |
| `## failed.<collection>`  | Slugs whose verifier returned `FAIL`          | `- <slug> :: <report-path>`              |

### Collections covered

`warframes`, `weapons`, `mods`, `quests`, `factions`, `syndicates`,
`relics`, `arcanes`, `missions`, `resources`, `builds`, `guides`.

### Read patterns (cheap)

```
# count slugs in a section
awk '/^## queue.warframes$/{flag=1;next} /^## /{flag=0} flag' STATE.md \
  | grep -c '^- '

# is a slug already done?
awk '/^## done.warframes$/{flag=1;next} /^## /{flag=0} flag' STATE.md \
  | grep -F '- mag-prime '

# current phase
awk '/^## phase$/{flag=1;next} /^## /{flag=0} flag' STATE.md | head -1
```

### Write patterns (append-only where possible)

- Add to a section: read section, append line, write back. Subagents do
  this themselves (their prompt names the section).
- Move slug queue → done: subagent appends to `done.<c>`, manager removes
  the entry from `queue.<c>` after confirming `ls`.

---

## Phase Advancement Rules

A phase is **done** iff all of:

1. Phase issue's checklist is fully ticked.
2. CI is green on the latest commit (typecheck + build + Vitest + schema).
3. For content phases: `done.<c>` count == enumeration count and
   `verified.<c>` count == enumeration count for every collection in
   the phase's scope.
4. Zero open issues with `state:failed` for that phase.
5. The latest commit on the branch is from the phase's final
   `commit-batch`.

When all five hold:

- Tick the phase issue checklist.
- Close the phase issue.
- Remove `phase:active` from it.
- Find the next phase issue in `queue.phases`, label it `phase:active`.
- Update `## phase` in `STATE.md` to the new phase id.
- Append a phase-boundary commit via `commit-batch`:
  `chore(phase-N): close <label> phase`.

### Phase-specific acceptance summary

| Phase                | Acceptance                                                      |
| -------------------- | --------------------------------------------------------------- |
| 0 — Foundation       | `pnpm build` exits 0 on empty content; CI green                 |
| 1 — Docs             | All Phase 1 files exist; `astro check` passes                   |
| 2 — Data             | `make import` succeeds; `pnpm test` green                       |
| 3 — Enumeration      | All 10 enumeration JSONs exist, non-empty; tracking issues open |
| 4 — Content          | All collections: done == verified == enumeration count          |
| 5 — Pages            | `astro build` produces pages ≈ sum(enumeration counts) + N      |
| 6 — Polish & deploy  | Dev serves; search returns results; `docs/DEPLOY.md` validated  |
| 7 — Closeout         | Zero `state:failed` / `state:qa-flagged`; PR undrafted          |
| 8 — Improvement loop | One full feature-research → implement loop with no P0 left      |

---

## Subagent Dispatch

Prompts live in `docs/AGENTS.md`. This section lists **when** to spawn
which role, not the prompt text.

| Role                | When                                                       | Concurrency |
| ------------------- | ---------------------------------------------------------- | ----------- |
| `scaffold`          | Phase 0 only                                               | 1           |
| `docs`              | Phase 1, three parallel docs subagents (A/B/C)             | 3           |
| `data-import`       | Phase 2, two subagents                                     | 2           |
| `enumerate`         | Phase 3, one per collection                                | 10          |
| `research-<c>`      | Phase 4, every wave until `queue.<c>` empty                | 8           |
| `verify-content`    | After each research wave                                   | 12          |
| `verify-verifier`   | Samples 10% of verifier reports per collection             | 4           |
| `qa-sample`         | Phase 7, samples 5% of each collection                     | 4           |
| `feature-research`  | Phase 8 entry                                              | 1           |
| `feature-implement` | Phase 8 loop                                               | 4           |
| `commit-batch`      | After every wave that wrote files                          | **1 always**|

---

## Wave Sizes and Concurrency Caps

| Role                       | Max parallel | Notes                                  |
| -------------------------- | ------------ | -------------------------------------- |
| Enumeration (`Explore`)    | 10           | One per collection                     |
| Research (`general-purpose`) | 8          | Per wave, per collection               |
| Verifier                   | 12           |                                        |
| Tier-2 verifier            | 4            | Samples ~10% of verifier reports       |
| QA sampler                 | 4            |                                        |
| `commit-batch`             | **1**        | Always; serialises git                 |
| **Hard global cap**        | **20**       | Across all roles in a single wave      |

The shared token-bucket in `scripts/fetch.ts` is the global
WebFetch ≤ 3 req/s rate-limiter. Subagents must route through it.

---

## Failure Recovery

### Verifier FAIL

1. Manager opens issue: `gh issue create --label "kind:bug,state:failed" \
   --title "<slug> failed verification" --body "Report: <report-path>"`.
2. Manager appends to `STATE.md` under `failed.<c>`:
   `- <slug> :: <report-path>`.
3. Manager requeues with `retry:N`:
   `- <slug> retry:1` in `queue.<c>`.
4. The retry prompt embeds the failure reasons (verifier output cites
   specific line numbers/fields). Subagent reads the report and edits the
   file.

### Retry budget

- Up to **2** retries per slug.
- On the third failure, label the issue `human-review-needed`, leave in
  `failed.<c>`, move on.

### Git push failure

Only `commit-batch` pushes. If a push fails non-fast-forward:

1. `commit-batch` runs `git pull --rebase`, retries.
2. If conflict, opens a `kind:bug` issue, leaves the working tree clean,
   does not retry.
3. Manager sees `pushed=false` and pauses dispatch until manual
   intervention.

### Contingency: per-phase worktree branches

If concurrent-commit pain persists despite batching, the fallback documented
in the plan is to give each phase its own worktree-branch and merge serially
at phase end. Implement only if commit-batch fails repeatedly. Default is
single-branch.

---

## Commit-Batch Protocol

After every wave that wrote files, the manager dispatches **exactly one**
`commit-batch` subagent.

### Inputs to the subagent

- List of absolute paths to stage (from the wave's reply lines).
- Suggested commit message (manager builds it from wave context).

### Subagent steps

1. `git status --porcelain` — confirm there are unstaged files at the
   expected paths.
2. `git pull --rebase origin claude/warframe-website-setup-gvaG9`.
3. `git add <listed paths only>`. Never `git add -A`.
4. `git commit -m "<conventional message>"`.
5. `git push`.
6. Reply: `committed=<N> sha=<short> pushed=true`.

### Commit message format

Conventional Commits with project scopes (see `CLAUDE.md → Commit convention`).
Examples:

- `content(warframes): batch wave 3 (8 slugs)`
- `verify(weapons): wave 2 reports`
- `data: import wfcd warframe-items v3.2`
- `chore(phase-1): close docs phase`
- `feat(lib/wfcd): add typed warframe accessor`

One commit per wave. Never amend a pushed commit.

---

## GitHub Issue Conventions

The manager uses GitHub Issues as a secondary state store. STATE.md is for
slugs; Issues are for tracking, phases, bugs, and features.

### Labels

| Label                      | Meaning                                          |
| -------------------------- | ------------------------------------------------ |
| `phase:0` … `phase:8`      | Which phase the issue belongs to                 |
| `phase:active`             | The single in-flight phase (exactly one at a time) |
| `collection:warframes` …   | One per content collection                       |
| `state:queued`             | Not yet picked up                                |
| `state:in-progress`        | A subagent is working on it                      |
| `state:done`               | File written, awaiting verify                    |
| `state:failed`             | Verifier returned FAIL                           |
| `state:qa-flagged`         | QA score < 3                                     |
| `human-review-needed`      | Exceeded retry budget                            |
| `kind:bug`                 | Verifier FAIL, broken build                      |
| `kind:feature`             | Phase 8 feature ideas                            |
| `kind:chore`               | Phase boundaries, housekeeping                   |

### Issue types

- **Phase issues** — one per phase (0–8). Body is the checklist; the
  active one carries `phase:active`.
- **Collection tracking issues** — one per collection, opened in Phase 3.
  Body is a checkbox list of slugs, ticked as `verified.<c>` grows.
- **Bug issues** — auto-filed on verifier FAIL. Body cites report path
  and the specific failure reasons.
- **Feature issues** — produced by `feature-research` in Phase 8 and by
  any subagent that hits a missing capability.

### Manager queries (counts only, never bodies)

```
gh issue list --label phase:active --json number,title
gh issue list --label state:failed --json number,title | jq length
gh issue list --label "kind:feature,state:queued" --json number,title
```

The manager never reads issue bodies in full — only counts and titles.
Subagents read bodies when they need to.

---

## When in doubt

| Question                                       | Doc                       |
| ---------------------------------------------- | ------------------------- |
| What's my exact subagent prompt?               | `docs/AGENTS.md`          |
| What fields does an MDX file need?             | `docs/SCHEMAS.md`         |
| What's the voice / word-count?                 | `docs/STYLE.md`           |
| Where does numeric data come from?             | `docs/DATA.md`            |
| Do I need a failing test first?                | `docs/TDD.md`             |
| Project-wide rules and guardrails?             | `CLAUDE.md`               |
