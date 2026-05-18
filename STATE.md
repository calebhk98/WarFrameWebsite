# Warframe Site — Manager State

This file is the manager's source of truth. Update via `grep`/append, never
read whole. One slug per line, format `- <slug>` (optionally with
`retry:N`). The manager moves slugs between sections by appending to the
target section and deleting from the source section.

## phase
4:content

## cursor
warframes: 0
weapons: 0
mods: 0
quests: 42
factions: 0
syndicates: 0
relics: 0
arcanes: 0
missions: 0
resources: 0

## queue.phases
- 2:data
- 3:enumeration
- 4:content
- 5:pages
- 6:polish
- 7:closeout
- 8:improvement

## queue.warframes
enumerated: data/enumerations/warframes.json count=110 strategy=per-slug

## queue.weapons
enumerated: data/enumerations/weapons.json count=598 strategy=per-slug

## queue.mods
enumerated: data/enumerations/mods-featured.json count=199 strategy=featured-subset note=augments-only-others-browse-raw-json

## queue.quests
enumerated: data/enumerations/quests.json count=43 strategy=per-slug

## queue.factions
enumerated: data/enumerations/factions.json count=35 strategy=per-slug

## queue.syndicates
enumerated: data/enumerations/syndicates.json count=18 strategy=per-slug

## queue.relics
enumerated: data/enumerations/relics.json count=2682 strategy=aggregate-by-era note=5-era-pages-instead-of-per-slug

## queue.arcanes
enumerated: data/enumerations/arcanes.json count=156 strategy=per-slug

## queue.missions
enumerated: data/enumerations/missions.json count=260 strategy=aggregate-by-planet note=~21-planet-pages-plus-mission-type-pages

## queue.resources
enumerated: data/enumerations/resources.json count=224 strategy=per-slug

## queue.builds
deferred-to-phase-4 strategy=top-3-per-warframe-top-2-per-popular-weapon

## queue.guides
deferred-to-phase-4 strategy=author-decided-during-fan-out

## done.warframes

## done.weapons

## done.mods

## done.quests
- a-man-of-few-words :: src/content/quests/a-man-of-few-words.mdx
- angels-of-the-zariman :: src/content/quests/angels-of-the-zariman.mdx
- apostasy-prologue :: src/content/quests/apostasy-prologue.mdx
- awakening :: src/content/quests/awakening.mdx
- call-of-the-tempestarii :: src/content/quests/call-of-the-tempestarii.mdx
- chains-of-harrow :: src/content/quests/chains-of-harrow.mdx
- chimera-prologue :: src/content/quests/chimera-prologue.mdx
- clan-key :: src/content/quests/clan-key.mdx
- erra :: src/content/quests/erra.mdx
- heart-of-deimos :: src/content/quests/heart-of-deimos.mdx
- hidden-messages :: src/content/quests/hidden-messages.mdx
- howl-of-the-kubrow :: src/content/quests/howl-of-the-kubrow.mdx
- jade-shadows :: src/content/quests/jade-shadows.mdx
- mask-of-the-revenant :: src/content/quests/mask-of-the-revenant.mdx
- mutalist-alad-v-assassinate :: src/content/quests/mutalist-alad-v-assassinate.mdx
- natah :: src/content/quests/natah.mdx
- octavias-anthem :: src/content/quests/octavias-anthem.mdx
- once-awake :: src/content/quests/once-awake.mdx
- patient-zero :: src/content/quests/patient-zero.mdx
- rising-tide :: src/content/quests/rising-tide.mdx
- sands-of-inaros :: src/content/quests/sands-of-inaros.mdx
- sayas-vigil :: src/content/quests/sayas-vigil.mdx
- stolen-dreams :: src/content/quests/stolen-dreams.mdx
- the-archwing :: src/content/quests/the-archwing.mdx
- the-deadlock-protocol :: src/content/quests/the-deadlock-protocol.mdx
- the-duviri-paradox :: src/content/quests/the-duviri-paradox.mdx
- the-glast-gambit :: src/content/quests/the-glast-gambit.mdx
- the-hex :: src/content/quests/the-hex.mdx
- the-hex-finale :: src/content/quests/the-hex-finale.mdx
- the-jordas-precept :: src/content/quests/the-jordas-precept.mdx
- the-limbo-theorem :: src/content/quests/the-limbo-theorem.mdx
- the-lotus-eaters :: src/content/quests/the-lotus-eaters.mdx
- the-new-strange :: src/content/quests/the-new-strange.mdx
- the-new-war :: src/content/quests/the-new-war.mdx
- the-sacrifice :: src/content/quests/the-sacrifice.mdx
- the-second-dream :: src/content/quests/the-second-dream.mdx
- the-silver-grove :: src/content/quests/the-silver-grove.mdx
- the-war-within :: src/content/quests/the-war-within.mdx
- the-waverider :: src/content/quests/the-waverider.mdx
- veilbreaker :: src/content/quests/veilbreaker.mdx
- vors-prize :: src/content/quests/vors-prize.mdx
- vox-solaris :: src/content/quests/vox-solaris.mdx

## done.factions

## done.syndicates

## done.relics

## done.arcanes

## done.missions

## done.resources

## done.builds

## done.guides

## verified.warframes

## verified.weapons

## verified.mods

## verified.quests

## verified.factions

## verified.syndicates

## verified.relics

## verified.arcanes

## verified.missions

## verified.resources

## verified.builds

## verified.guides

## failed.warframes

## failed.weapons

## failed.mods

## failed.quests

## failed.factions

## failed.syndicates

## failed.relics

## failed.arcanes

## failed.missions

## failed.resources

## failed.builds

## failed.guides
