# Contributing to Warframe Codex

Thank you for your interest in contributing. This guide covers everything you
need to get a change merged.

## Pull Request Process

1. Branch from `claude/warframe-website-setup-gvaG9` (the active long-lived branch).
2. Make focused, atomic commits using Conventional Commits (see below).
3. Open a pull request targeting the same branch.
4. All CI gates must be green before merge:
   - `pnpm typecheck` -- TypeScript strict, no `any`.
   - `pnpm build` -- Astro build + Pagefind index.
   - `pnpm test` -- Vitest unit tests.
   - `pnpm bundle:check` -- bundle size budgets (500 KB total JS, 100 KB per file, 200 KB per HTML page compressed).
   - `pnpm html:check` -- HTML validation via html-validate.
   - Lighthouse CI -- Performance/Accessibility/Best-Practices/SEO >= 90.

## Conventional Commits

Use the scopes defined in `CLAUDE.md`:

```
feat:                New feature (component, page, script, lib)
fix:                 Bug fix
content(<name>):     New or updated MDX content file
verify(<name>):      Verifier output or verifier code
data:                WFCD import, worldstate cache, market snapshot
refactor:            Behaviour-preserving code change
test:                Test-only commit
docs:                Documentation change
chore(phase-N):      Phase boundary, label moves, housekeeping
```

## Adding New Content

1. Choose a slug (lowercase, hyphen-separated ASCII; see `CLAUDE.md` Slug rules).
2. Create an MDX file in the correct collection under `src/content/<collection>/`.
3. All numeric stats come from `/data/wfcd/*.json` via `src/lib/wfcd.ts` -- never invent numbers.
4. Include >= 2 sources in frontmatter (`{ url, accessedAt }` in ISO-8601 UTC).
5. Meet the word-count floor for your collection (see `CLAUDE.md` Content Rules).
6. Add a `LinkOutFandom` component pointing to the canonical Fandom wiki page.
7. See `docs/SCHEMAS.md` for required frontmatter fields.

## Code Style

- TypeScript strict; no `any`; no `@ts-ignore` without a GitHub issue link.
- Files <= 250 lines, functions <= 40 lines, max 3 parameters per function.
- No `console.log`; no dead code; no commented-out blocks.
- Early returns over nested `if`; max 2 levels of indentation inside a function.
- See `docs/STYLE.md` for prose style guidance.

## Testing

- Run `pnpm test` for unit tests (Vitest).
- Run `pnpm test:e2e` for end-to-end tests (Playwright).
- Use fixtures, not live network calls, in tests. See `docs/TDD.md`.

## Questions

If something is not covered here, check the `docs/` directory or open a
`kind:feature` issue with context.
