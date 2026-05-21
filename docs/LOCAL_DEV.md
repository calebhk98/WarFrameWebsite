# LOCAL_DEV.md — Local development guide

This guide assumes a fresh machine. It is written so a human
contributor or a future subagent with no project context can go from
zero to a running dev server.

---

## 1. Prerequisites

| Tool   | Version   | Install                                                                 |
|--------|-----------|-------------------------------------------------------------------------|
| Node   | 20.x LTS  | `nvm install 20 && nvm use 20`                                          |
| pnpm   | latest    | `corepack enable && corepack prepare pnpm@latest --activate`            |
| git    | any 2.x   | OS package manager                                                      |
| make   | any GNU   | OS package manager (optional; pnpm scripts work without it)             |

`nvm` is recommended; the project pins Node 20 via the `.nvmrc` file
once it lands. If you do not use `nvm`, install Node 20 from
`https://nodejs.org/`. **Do not** install pnpm globally with npm; use
corepack so the version stays consistent across contributors.

Verify:

```
node --version    # v20.x.x
pnpm --version    # 9.x.x or newer
git --version     # any 2.x
```

---

## 2. Clone and install

```
git clone https://github.com/calebhk98/WarFrameWebsite.git
cd WarFrameWebsite
git checkout claude/warframe-website-setup-gvaG9
pnpm install
```

`pnpm install` reads `pnpm-lock.yaml` and produces a deterministic
`node_modules/`. Do not edit the lockfile by hand.

---

## 3. Import data (build-time)

```
make import
# or, if make is not installed:
pnpm run import-wfcd
```

This populates `/data/wfcd/*.json` from the pinned `warframe-items`
package. It is **idempotent** and safe to re-run. Before Phase 2
lands, the import script is a no-op; treat the directory as empty in
that case.

If you bump the `warframe-items` version, re-run `make import` and
commit the regenerated JSON together with the version bump.

---

## 4. Run the dev server

```
pnpm dev
```

Astro serves `http://localhost:4321/` with hot reload. MDX and
component changes hot-swap; schema changes in `src/content/config.ts`
require a server restart.

Open `http://localhost:4321/` in your browser. The home page lists
the available collections.

---

## 5. Tests

```
pnpm test          # full Vitest run
pnpm test --watch  # watch mode
```

Tests live in `/tests/` (unit + integration) and beside the unit they
cover (`*.test.ts` colocated). Fixtures for external APIs live in
`/tests/fixtures/`. No live network is used in CI; if a test needs an
API, add a fixture and route through `scripts/fetch.ts` with
`--no-network`.

---

## 6. Type checking

```
pnpm typecheck
```

This runs `astro check` plus `tsc --noEmit`. `astro check` is what
catches Zod content-collection violations; `tsc` is what catches
library-code errors.

Strict mode is on. The codebase forbids `any` and `// @ts-ignore`
(both fail `pnpm lint`).

---

## 7. Production build

```
pnpm build
```

Output goes to `/dist/`. The build runs:

1. `astro check` (typecheck + schema validation).
2. `astro build` (SSG render of every MDX page).
3. `pagefind` post-build indexing into `dist/pagefind/`.

A successful build prints one page per content slug plus index pages.
If the page count looks low, you probably forgot to run
`make import`.

---

## 8. Preview a built site

```
pnpm preview
```

Serves `/dist/` on `http://localhost:4321/` (or the next free port).
This is the closest local equivalent of a production deploy.

---

## 9. Local CI gate (pre-push hook)

A Husky `pre-push` hook fires automatically on every `git push` and runs the
same checks that GitHub Actions `build`, `validate-html`, and `bundle-size`
jobs run. This catches failures locally before they burn cloud minutes.

The hook runs in order, fail-fast:

```
pnpm typecheck   # astro check + tsc --noEmit
pnpm build       # astro build + pagefind indexing
pnpm test        # vitest run
pnpm html:check  # html-validate against dist/
pnpm bundle:check # bundle size assertion
```

**Run the full gate manually** (without going through git):

```
pnpm verify
```

This is identical to what the hook runs. Use it to pre-flight before pushing,
or after pulling changes to confirm nothing broke.

**Emergency skip** (rare — document in commit message when used):

```
git push --no-verify
```

Reserved for situations where only GitHub's runners can complete the check.
Subagents must not use `--no-verify` without explicit instruction from the
human operator.

The hook is set up automatically by `pnpm install` via the `prepare` script.
If you cloned the repo and the hook is missing, run `pnpm install` again (or
`pnpm exec husky`).

---

## 10. Verify a single content file

```
make verify COLLECTION=warframes SLUG=ash
# or
pnpm tsx scripts/verify-content.ts warframes ash
```

Writes a report to
`/reports/verify/warframes/ash.json`. Exit code 0 = pass; non-zero =
fail.

---

## 11. Generate a content stub

```
make stub COLLECTION=warframes SLUG=ash
# or
pnpm tsx scripts/new-content-stub.ts warframes ash
```

Writes an MDX skeleton with frontmatter pre-filled from WFCD plus
`TODO` markers in the body sections. Subagents fill the body.

---

## 12. Troubleshooting

**`pnpm: command not found`** — corepack is not enabled. Run
`corepack enable && corepack prepare pnpm@latest --activate`.

**`Error: Cannot find module '@astrojs/mdx'`** — `pnpm install` did
not complete. Re-run; if it fails, delete `node_modules/` and
`pnpm-lock.yaml`, then `pnpm install` again.

**Port 4321 is in use** — set `PORT`:

```
PORT=5173 pnpm dev
```

**Type errors after editing `src/content/config.ts`** — restart
`pnpm dev`. Astro caches the generated content types in
`.astro/types.d.ts`; the cache is invalidated only at server start.

**`make: command not found`** — your OS does not ship GNU make. Use
the `pnpm run` equivalents listed against each Makefile target, or
install make (`apt install make`, `brew install make`,
`pacman -S make`).

**`astro check` reports `Frontmatter Zod validation failed`** — the
MDX frontmatter does not match the schema in
`src/content/config.ts`. Open the file, compare against
`docs/SCHEMAS.md`, fix.

**A WebFetch in a script returns 429** — the shared token-bucket is
saturated. Lower the concurrency cap or rerun with the cache warmed
(`pnpm run prime-cache`).

**`pnpm build` succeeds locally but fails in CI** — check Node
version (`node --version` must be 20.x). CI uses `actions/setup-node`
with `node-version: 20`.

**`git push` rejected (non-fast-forward)** — only the `commit-batch`
subagent should be pushing. Stash your changes, `git pull --rebase`,
re-apply, and dispatch a `commit-batch` subagent.

---

## 13. Environment variables

The site needs no secrets to build or run locally. The following
optional variables exist:

| Variable      | Default                          | Purpose                                  |
|---------------|----------------------------------|------------------------------------------|
| `PORT`        | 4321                             | Dev / preview server port                |
| `NO_NETWORK`  | unset                            | Disable outbound HTTP (hermetic builds)  |
| `WFCD_VERSION`| pinned in `package.json`         | Override for `make import`               |
| `CACHE_DIR`   | `data/cache`                     | Move cache off-repo if disk is tight     |

Never commit `.env`; the `.gitignore` excludes it.

---

## 14. Useful one-liners

```
# List queued slugs across all collections:
grep -A 9999 '^## queue\.' STATE.md | grep -c '^- '

# Re-verify every warframe:
ls src/content/warframes | sed 's/\.mdx$//' \
  | xargs -I{} pnpm tsx scripts/verify-content.ts warframes {}

# Print the latest QA averages:
jq -r '"depth=" + (.avg_depth|tostring) + " accuracy=" + (.avg_accuracy|tostring)' \
  reports/qa/*.json | tail -1

# Reset just the cache:
rm -rf data/cache
```

---

## 15. Where to file issues

- **Bug?** Open `kind:bug` via the issue template
  `.github/ISSUE_TEMPLATE/bug.yml`.
- **Missing capability for content?** Open `kind:feature` via
  `feature.yml`.
- **Content verification failure?** Open `kind:bug, state:failed` via
  `verification.yml` (linking the `/reports/verify/...json`).
- **New content item that the enumeration missed?** Open
  `kind:content, state:queued` via `content-item.yml`.

The manager prioritises by label, not by title; pick the right
template.
