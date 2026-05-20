# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in this project, please report it
responsibly. Do not open a public issue.

**Preferred method:** Open a private security advisory via GitHub:
  Settings -> Security -> Advisories -> "Report a vulnerability"

If you cannot use that channel, email the maintainer at:
  security-warframe-codex@example.com  (placeholder -- replace before going live)

We aim to acknowledge reports within 48 hours and provide a resolution timeline
within 7 days.

## Threat Model

This is a static fan site with no server-side logic, no user accounts, and no
database. The primary concerns are:

- **Content injection / XSS** -- mitigated by the Content Security Policy
  header shipped in every page and in `public/_headers` for CDN deployments.
- **Dependency vulnerabilities** -- addressed by keeping npm dependencies
  up-to-date and running `pnpm audit` in CI.
- **Data integrity** -- all numeric game stats source from the WFCD
  `warframe-items` JSON; no user-supplied data is stored or rendered.

Third-party API calls (warframestat.us, warframe.market) are read-only and
do not transmit any personal data.

## Scope

Reports about the Warframe game itself, Digital Extremes' infrastructure, or
the Fandom wiki are out of scope. This policy covers only this repository and
the site it produces.
