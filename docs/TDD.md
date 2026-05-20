# TDD Protocol

Test-Driven Development is mandatory for every logic-bearing code change in
this repo. This file is the authoritative protocol; code subagent prompts
in `docs/AGENTS.md` reference it.

---

## Scope

### TDD applies to

- Everything under `src/lib/` (typed accessors, API clients, business logic).
- Everything under `scripts/` (importers, verifiers, batch tools).
- Astro components under `src/components/` **that contain non-trivial
  logic** — filtering, sorting, parsing, derived state.
- Any utility function that takes inputs and returns outputs.

### TDD does NOT apply to

- Pure content MDX files under `src/content/` — they use the
  "stub-then-fill" equivalent described below.
- Purely presentational Astro components with no logic (just layout +
  props passthrough).
- Configuration files (`astro.config.mjs`, `tailwind.config.ts`, etc.).
- One-off generated artefacts (enumeration JSONs).

If unsure: write the test. The cost of an extra test is small; the cost
of an untested module is paid every time someone touches it.

---

## Red-Green-Refactor

Every logic-bearing change is at least two commits, optionally three. The
sequence below is enforced by convention; CI scans for the pattern.

### Commit 1 — Red

Write the failing test first.

- File: `tests/<area>/<thing>.test.ts` (or `.spec.ts`).
- The test must fail for the right reason — either the function does not
  exist yet, or it returns the wrong value. A test that fails because of
  a syntax error in the test itself does not count.
- Commit message:
  - `test(<area>): add failing test for <behavior>`
  - Example: `test(lib/wfcd): add failing test for getWarframe(slug)`.
- CI will run red on this commit. **That is intentional and expected.**
  The red commit shows up in history as proof the test was written first.

### Commit 2 — Green

Write the **minimum** code that makes the test pass.

- No speculative generality. No extra branches "while you're in there."
- If you find yourself wanting to add functionality, write another red
  test first.
- Commit message:
  - `feat(<area>): implement <behavior>` for new code.
  - `fix(<area>): <bug>` if you are fixing a bug exposed by the test.
- CI must be green on this commit.

### Commit 3 — Refactor (optional)

Clean up without changing observable behaviour. Tests stay green.

- Extract helpers, rename, deduplicate.
- Tighten types, remove dead branches.
- Commit message: `refactor(<area>): <what>`.
  - Example: `refactor(lib/wfcd): extract slug normaliser`.

### What this looks like in git log

```
abc123  refactor(lib/wfcd): extract slug normaliser
def456  feat(lib/wfcd): implement getWarframe(slug)
789aaa  test(lib/wfcd): add failing test for getWarframe(slug)
```

Three commits, one feature, history tells the story.

---

## Pair Detection in CI

CI scans recent commits for the TDD pattern: a `test:` commit followed by
a `feat:` / `fix:` / `refactor:` commit on the same touched path.

### Rule (initial — soft)

If a `feat:` or `fix:` commit touches a path under `src/lib/`,
`scripts/`, or `src/components/` with no preceding `test:` commit on the
same path within the last 10 commits, CI emits a **warning**, not a
failure. False positives are likely while the rule is new (mass refactors,
config changes that span paths). Revisit after the first content phase.

### Future hardening

Once the warning rate is stable and low, flip to failure. Track the false
positive rate in a Phase 8 issue before doing so.

### Bypass

There is no bypass. If a change legitimately does not need a test (rare —
e.g. a comment-only edit promoted to its own commit by accident), squash
into the adjacent commit before pushing.

---

## MDX Equivalent (content workflow)

Content MDX files do not get unit tests. The equivalent rigor:

### Step 1 — Stub

Create the file with intentionally-invalid Zod frontmatter — leave **one
required field missing**. Example: omit `sources`.

- Commit message: `content(<collection>): stub <slug>`.
- Running `astro check` or `make verify` against the stub must **fail**
  with a Zod error pointing at the missing field. This is the "red"
  equivalent.

### Step 2 — Complete

Fill in every required field, hit the word-count floor, supply ≥ 2
sources, write the narrative.

- Commit message: `content(<collection>): complete <slug>`.
- Verifier must return `PASS`. This is the "green" equivalent.

### Note

This workflow is **not strictly enforced** for content fan-out in Phase 4
— the volume makes per-slug commits prohibitive, and the batching
protocol writes many slugs per commit. Research subagents are encouraged
to follow the spirit (write skeleton frontmatter first, then narrative)
inside a single subagent run. See `docs/AGENTS.md` for the actual content
workflow.

---

## Fixtures Over Network

### Rule

Tests must not hit live APIs in CI. Every test that exercises a network
client uses a recorded fixture.

### Where fixtures live

- `tests/fixtures/wfcd/<filename>.json` — WFCD JSON dump samples.
- `tests/fixtures/warframestat/<endpoint>.json` — world-state responses.
- `tests/fixtures/market/<endpoint>.json` — warframe.market responses.
- `tests/fixtures/fandom/<slug>.html` — only if a parser test needs it
  (rare; we link out, not scrape).

### Recording a new fixture

1. Run the real client once locally against the live API.
2. Save the response under `tests/fixtures/<source>/`.
3. Redact anything user-specific (auth tokens, timestamps that would
   destabilise diffs).
4. Commit the fixture alongside the test.

### Injection pattern

Network clients take a `fetcher` parameter (dependency injection). Tests
pass a fixture-backed fetcher; production passes the real one from
`scripts/fetch.ts`.

```
// production
const wf = new WfcdClient(realFetcher);

// test
const wf = new WfcdClient(fixtureFetcher('wfcd/warframes.json'));
```

This is one of the reasons the engineering guardrails in `CLAUDE.md`
require dependency injection over hard-imported singletons.

---

## Vitest Conventions

- Test files live next to source under `tests/` mirroring the `src/`
  layout. `src/lib/wfcd.ts` → `tests/lib/wfcd.test.ts`.
- One `describe` block per public function or class.
- Use `it.each` for table-driven cases; one `it` per behaviour otherwise.
- Snapshot tests are allowed for component output (Phase 5) but never for
  business logic — make the assertion explicit.
- `vi.useFakeTimers()` for anything that touches `Date.now()`.

### Running

```
pnpm test                   # all
pnpm test wfcd              # filter by name
pnpm test --coverage        # local coverage report (not required in CI)
```

---

## Worked Example

Adding a `getWarframeBySlug` accessor to `src/lib/wfcd.ts`:

### 1. Red

```
// tests/lib/wfcd.test.ts
import { describe, it, expect } from 'vitest';
import { getWarframeBySlug } from '../../src/lib/wfcd';
import { fixtureFetcher } from '../helpers/fetcher';

describe('getWarframeBySlug', () => {
  it('returns the warframe matching the slug', async () => {
    const wf = await getWarframeBySlug('mag-prime', {
      fetcher: fixtureFetcher('wfcd/warframes.json'),
    });
    expect(wf.name).toBe('Mag Prime');
  });
});
```

`pnpm test` → red (function does not exist). Commit:
`test(lib/wfcd): add failing test for getWarframeBySlug`.

### 2. Green

Implement the minimum:

```
// src/lib/wfcd.ts
export async function getWarframeBySlug(
  slug: string,
  deps: { fetcher: Fetcher },
): Promise<Warframe> {
  const all = await deps.fetcher.json<Warframe[]>('warframes.json');
  const found = all.find(w => slugify(w.name) === slug);
  if (!found) throw new Error(`warframe not found: ${slug}`);
  return found;
}
```

`pnpm test` → green. Commit:
`feat(lib/wfcd): implement getWarframeBySlug`.

### 3. Refactor (optional)

Extract `slugify` to its own module if it gets reused. Tests stay green.
Commit: `refactor(lib): extract slugify helper`.

---

## Anti-Patterns

These will be flagged in review:

- Writing the implementation first, then "back-filling" a test that
  trivially passes. The test must have been seen failing first; the red
  commit is your proof.
- Tests that only check the function returns a truthy value. Assert on
  specific fields.
- Hitting the real network in a test, even if the data is "stable."
- Catching errors in tests to make them pass.
- Single-commit `test:` + `feat:` squashes. Keep them separate so the
  red commit shows up in history.

---

## When in doubt

| Question                            | Answer                                  |
| ----------------------------------- | --------------------------------------- |
| Is this change logic-bearing?       | If it has a conditional or computation, yes. |
| Do I need a fixture?                | If your code makes a network call, yes. |
| Can I skip the red commit?          | No. Even one-line bugs get a red test.  |
| What if the test is hard to write?  | That's the design smell. Refactor.      |
| Where do prompts reference this?    | `docs/AGENTS.md` for every code role.   |

---

## Visual Regression Snapshots

Playwright visual snapshot tests live in `tests/e2e/visual.spec.ts`.  They
cover 12 high-value pages and catch CSS regressions that functional smoke
tests miss.

Baselines are stored at:

```
tests/e2e/visual.spec.ts-snapshots/<name>-chromium-linux.png
```

### Running visual tests

```
# Compare against baselines (CI mode)
pnpm exec playwright test tests/e2e/visual.spec.ts

# Regenerate baselines after an intentional design change
pnpm exec playwright test tests/e2e/visual.spec.ts --update-snapshots
```

Always commit the updated PNG baselines together with the code change so CI
has a matching reference.

### Tuning tolerance

Each snapshot uses `threshold: 0.2` (per-pixel colour delta) and
`maxDiffPixels: 500`.  If you see environment-specific flakes (font
anti-aliasing differences between machines), increase `maxDiffPixels` or
`threshold` in `visual.spec.ts` rather than disabling the test.

### Masking dynamic content

The worldstate page masks its `<time>` element (build timestamp) so the
baseline does not drift when the site is rebuilt.  Add further selectors to
the `maskSelectors` array in `visual.spec.ts` when new pages contain
content that changes each build.
