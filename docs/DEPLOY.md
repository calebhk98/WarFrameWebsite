# Deployment

The site is a static Astro build deployed to GitHub Pages at
`https://calebhk98.github.io/warframewebsite/`.

## CI (pull requests and branch pushes)

`.github/workflows/ci.yml` triggers on:
- Any push to `main` or `claude/warframe-website-setup-gvaG9`.
- Any pull request targeting `main`.

Steps: checkout, enable corepack, setup Node 20 with pnpm cache, install with
`pnpm install --frozen-lockfile`, then run `pnpm typecheck`, `pnpm build`
(which also runs Pagefind), and `pnpm test`. The built `dist/` directory is
uploaded as a workflow artifact (7-day retention) for inspection.

CI must pass before any merge to `main`.

## Deploy (main pushes)

`.github/workflows/deploy.yml` triggers on:
- Any push to `main`.
- Manual `workflow_dispatch` from the Actions tab.

Job `build` runs the same steps as CI but uploads via
`actions/upload-pages-artifact@v3` from `dist/`. Job `deploy` (depends on
`build`) calls `actions/deploy-pages@v4` to push to the `github-pages`
environment.

## Pages settings checklist

1. In the repo Settings -> Pages -> Build and deployment, set Source to
   **GitHub Actions** (not "Deploy from a branch").
2. The first successful deploy will create the `github-pages` environment
   automatically.

## Test the production build locally

```
pnpm build    # builds Astro + runs Pagefind post-build
pnpm preview  # serves dist/ with the configured base path
```

Visit `http://localhost:4321/warframewebsite/` to verify the site under the
correct sub-path.

## Custom domain

No custom domain is planned for this fan site. If one is added later, set
`site` in `astro.config.mjs` to the full custom origin, remove the `base`
option (or keep it if the domain still uses a sub-path), and add a `CNAME`
file to `public/`.
