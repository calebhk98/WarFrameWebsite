## Warframe Fan Site Makefile
##
## Each target prints help via `make help`. Subagents can invoke any
## target blindly; targets wrap the canonical pnpm scripts.

.PHONY: help install dev build typecheck test lint enumerate enumerate-one import verify qa stub commit-batch clean

help: ## help: print every target and its description
	@awk 'BEGIN {FS = ":.*?## help: "} /^[a-zA-Z_-]+:.*?## help: / {printf "  %-22s %s\n", $$1, $$2}' $(MAKEFILE_LIST)

install: ## help: install dependencies via pnpm
	pnpm install

dev: ## help: start the Astro dev server on http://localhost:4321
	pnpm dev

build: ## help: produce the static site in dist/
	pnpm build

typecheck: ## help: run astro check + tsc --noEmit
	pnpm typecheck

test: ## help: run the Vitest test suite
	pnpm test

lint: ## help: run lint checks (strict no-any, no-console)
	pnpm lint

enumerate: ## help: run enumeration for every collection
	pnpm tsx scripts/enumerate.ts

enumerate-one: ## help: run enumeration for one collection (COLLECTION=warframes)
	@if [ -z "$(COLLECTION)" ]; then echo "Usage: make enumerate-one COLLECTION=<name>"; exit 2; fi
	pnpm tsx scripts/enumerate.ts $(COLLECTION)

import: ## help: import WFCD warframe-items JSON into data/wfcd/
	pnpm tsx scripts/import-wfcd.ts

verify: ## help: verify one content file (COLLECTION=warframes SLUG=ash)
	@if [ -z "$(COLLECTION)" ] || [ -z "$(SLUG)" ]; then echo "Usage: make verify COLLECTION=<name> SLUG=<slug>"; exit 2; fi
	pnpm tsx scripts/verify-content.ts $(COLLECTION) $(SLUG)

qa: ## help: run a QA sample (N=20)
	@if [ -z "$(N)" ]; then echo "Usage: make qa N=<count>"; exit 2; fi
	pnpm tsx scripts/qa-sample.ts --n $(N)

stub: ## help: generate a new content stub (COLLECTION=warframes SLUG=ash)
	@if [ -z "$(COLLECTION)" ] || [ -z "$(SLUG)" ]; then echo "Usage: make stub COLLECTION=<name> SLUG=<slug>"; exit 2; fi
	pnpm tsx scripts/new-content-stub.ts $(COLLECTION) $(SLUG)

commit-batch: ## help: commit and push a batch (MSG="content(warframes): batch")
	@if [ -z "$(MSG)" ]; then echo "Usage: make commit-batch MSG=\"<message>\""; exit 2; fi
	pnpm tsx scripts/commit-batch.ts --message "$(MSG)"

clean: ## help: remove build artifacts and node_modules (interactive)
	@printf "This will delete dist/, .astro/, and node_modules/. Continue? [y/N] "; \
	read ans; \
	if [ "$$ans" = "y" ] || [ "$$ans" = "Y" ]; then \
	  rm -rf dist .astro node_modules; \
	  echo "Cleaned."; \
	else \
	  echo "Aborted."; \
	fi
