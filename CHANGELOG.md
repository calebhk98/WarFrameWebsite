# Changelog

All notable changes to Warframe Codex are documented here.
Grouped by Conventional Commit type and development phase.

---

## Phase 0 -- Scaffold

### chore
- `0390816` chore(phase-0): scaffold Astro+MDX+TS+Tailwind+Vitest project
- `6979cf4` chore(phase-0): add EditorConfig for consistent formatting

---

## Phase 1 -- Documentation and Schemas

### chore
- `dfa41ea` chore(phase-1): define Zod content schemas for all 12 collections
- `b05d110` chore(phase-1): add coordination docs (CLAUDE, ORCH, TDD, SCHEMAS, STYLE, AGENTS, DATA, LOCAL_DEV) + issue templates + Makefile
- `0bb3f03` chore(phase-1): advance to phase 2

### test
- `9e7049b` test(lib/wfcd): add failing tests for WFCD accessor functions
- `9a9f553` test(lib/fetch): add failing tests for throttled fetcher
- `bb4f23f` test(lib/worldstate): add failing tests with recorded fixtures
- `7079433` test(lib/market): add failing tests with recorded fixtures

---

## Phase 2 -- Core Libraries

### feat
- `35b70fb` feat(lib/fetch): implement throttled fetcher with token-bucket and disk cache
- `5ced35f` feat(lib/wfcd): import WFCD warframe-items data and add typed accessors
- `4dce408` feat(lib): implement worldstate and market API clients

### chore
- `e522d7c` chore(phase-2): advance to phase 3

---

## Phase 3 -- Enumeration and Content Fan-out

### data
- `65a734c` data: enumerate all 10 collections (warframes, weapons, mods, resources, arcanes, relics, missions, quests, syndicates, factions)

### docs
- `7f72fe2` docs: document MediaWiki API endpoint and clarify state-protocol for research subagents

### chore
- `48a0715` chore(phase-3): advance to phase 4 (content fan-out)
- `9e78c16` chore(state): record done quests +9 (indices 0-8); advance quests cursor to 9
- `e222b3e` chore(state): record done quests (full set); advance quests cursor
- `d4351ae` chore(state): record done factions +2 (acolytes, murmur)
- `a4e2293` chore(state): record done syndicates +18, factions +10

---

## Phase 4 -- Content: Warframes, Quests, Factions, Syndicates

### content
- `ea7a965` content(quests): research first 9 quests (indices 0-8)
- `6a39b1a` content(quests): research all remaining quests (indices 9-42)
- `8059e17` content(factions): research acolytes and murmur (stranded survivors of rate-limit)
- `265da90` content(syndicates): research all 18 syndicates
- `3f6e4e2` content(factions): research 10 more factions (now 12 of 35 done)
- `b170ecf` content(factions,warframes): recover 22 factions + 3 warframes after agent crash
- `101c693` content(warframes,factions,quests): wave 2 - 6 warframes, dax faction, whispers-in-the-walls quest
- `fd8ff21` content(warframes): wave 3 - 8 warframes (caliban through ember)
- `bf4234d` content(warframes): wave 4 - 8 warframes (ember-prime through frost-prime)
- `9a3f9b9` content(warframes): wave 5 + verifier docs hardening + MVP scope
- `a6cc176` content(warframes): wave 6 - 8 warframes (gyre through hydroid-prime)
- `94402b8` content(warframes): wave 7 - 8 warframes (inaros through koumei)
- `8054c17` content(warframes): wave 8 - 8 warframes (kullervo through mag)
- `f87918a` content(warframes): wave 9 - 8 warframes (mag-prime through nezha)
- `3c29010` content(warframes): wave 10 - 8 warframes (nezha-prime through oberon)
- `1248dbf` content(warframes): wave 11 - 8 warframes (oberon-prime through revenant-prime)
- `a65ba34` content(warframes): wave 12 - 8 warframes (rhino through temple)
- `c739715` content(warframes): wave 13 - 8 warframes (titania through vauban-prime)
- `dae3ec3` content(warframes): wave 14 - 8 warframes (voidrig through wukong-prime)
- `3d037c9` content(warframes): wave 15 - 5 warframes (xaku through zephyr-prime); WARFRAMES COMPLETE

### verify
- `64ae75b` verify: add phase 0/1/2 verification reports and quest batch reports

---

## Phase 5 -- Site UI, Routes, Search

### feat
- `5413df6` feat(phase-5): site UI, routes, search, worldstate widget

---

## Phase 6 -- Deploy Infrastructure

### feat
- `21c7133` feat(phase-6): GitHub Pages deploy infrastructure

---

## Phase 7 -- CI Gates and QA Sweep

### fix
- `1b1e3a1` fix(content): phase 7 closeout - QA sweep

### chore
- `c3cdc7d` chore(phase-7): include final CI gate report

---

## Phase 8 -- Wave A and B -- Content Expansion

### feat
- `6bd3ce5` feat(phase-8): Wave A - audit, builds, guides, missions, UI polish
- `3ed3e40` feat(compare): client-side build comparator widget at /compare
- `c7c008b` feat(compare-warframes): side-by-side stat comparator at /compare-warframes
- `41b9481` feat(worldstate,a11y): full worldstate page + accessibility pass
- `1dd2258` feat(build-calculator): interactive mod selector with live stat calc
- `16a18a8` feat(helminth-planner): interactive Helminth subsume planner
- `f0d3b63` feat(seo): Open Graph + Twitter Card meta, RSS feed, sitemap
- `442cff7` feat(schemas): add focus-schools and amps content collection schemas
- `22e91f8` feat(content): focus schools + amps collections (15 detail pages)
- `ac30b7f` feat(content,ui): companions collection + sweep cross-links
- `f5b3218` feat(pwa): installable + offline-capable via @vite-pwa/astro
- `c8e3053` feat(damage-types): interactive damage effectiveness reference
- `d2b2cac` feat(content,ui): liches + archwings collections + final sweep
- `eb76ce1` feat(wave-3): open worlds + image embedding + e2e tests + QA fixes

### content
- `6327418` content(arcanes,mods,weapons): wave A - 64 new entities
- `23ef389` content: wave B partial - arcanes(8) + farming guides(6) + resources(8)
- `5d588bf` content: weapons hygiene sweep + 2 final strategy guides (profit-taker, exploiter)
- `237a351` content(missions): wave 2 - 8 endgame missions (exploiter orb, archon hunt, netracells, circuit, void cascade, sortie, arbitration, ESO)
- `5c0e80b` content(relics): wave 1 - 6 sample relics (lith-a7, meso-d6, neo-z11, axi-l4, requiem-i, axi-h4)
- `52942b6` content(mods): wave 3 - 8 combat mods (galvanized set + condition overload + weeping wounds + blood rush + cunning drift + corrosive projection)
- `0de96ad` content(arcanes): wave 6 - 7 new + 1 refined (consequence, healing, nullifier, phantasm, blessing, fortification, tempo, momentum)
- `331ff7a` content(weapons): wave 4 - 8 more curated weapons (arca-plasmor, tigris-prime, acceltra-prime, burston-prime, lex-prime, akstiletto-prime, scoliac, atterax)
- `2991bc3` content(builds): 10 more builds (nova, wisp, voruna, lavos, trinity, volt, nezha, nidus, titania, wukong) - 22 builds total
- `704ee93` content(arcanes): wave 7 - 16 weapon/operator arcanes
- `4f398b3` content(builds): 10 more builds (xaku, limbo, loki, nekros, valkyr, zephyr, atlas, styanax, kullervo, yareli) - 32 total
- `683b22d` content(weapons): wave 4 - 12 more weapons (44 total)
- `073384f` content(mods): wave 5 - 16 core mods (40 total)
- `d60674a` feat(routes,content): detail routes + weapons wave 3 + remaining guides

### fix
- `eaeb9e6` fix(content): Phase 8 wide QA - factual corrections across 14 files
- `a52b493` fix(content,ui): unicode hygiene sweep + leftover content
- `af55d90` fix(content): guide audit - 76 issues across 16 guides
- `46b2f7b` fix(schemas): remove reserved 'slug' field from focus-schools and amps
- `cdf2637` fix(ui,test): Pagefind search race + a11y test exception
- `eab4653` fix(content): open-worlds audit - all 5 zones corrected

### test
- `805102c` test(e2e,a11y): ship-readiness audit + WorldstateInvasions a11y fix
