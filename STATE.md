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
factions: 12
syndicates: 18
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
- ash :: src/content/warframes/ash.mdx
- ash-prime :: src/content/warframes/ash-prime.mdx
- atlas :: src/content/warframes/atlas.mdx
- atlas-prime :: src/content/warframes/atlas-prime.mdx
- banshee :: src/content/warframes/banshee.mdx
- banshee-prime :: src/content/warframes/banshee-prime.mdx
- baruuk :: src/content/warframes/baruuk.mdx
- baruuk-prime :: src/content/warframes/baruuk-prime.mdx
- bonewidow :: src/content/warframes/bonewidow.mdx

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
- whispers-in-the-walls :: src/content/quests/whispers-in-the-walls.mdx

## done.factions
- acolytes :: src/content/factions/acolytes.mdx
- amalgam :: src/content/factions/amalgam.mdx
- cephalon :: src/content/factions/cephalon.mdx
- corpus :: src/content/factions/corpus.mdx
- corrupted :: src/content/factions/corrupted.mdx
- dax :: src/content/factions/dax.mdx
- entrati :: src/content/factions/entrati.mdx
- grineer :: src/content/factions/grineer.mdx
- holdfasts :: src/content/factions/holdfasts.mdx
- infested :: src/content/factions/infested.mdx
- kuva-lich :: src/content/factions/kuva-lich.mdx
- lotus :: src/content/factions/lotus.mdx
- murmur :: src/content/factions/murmur.mdx
- narmer :: src/content/factions/narmer.mdx
- new-loka :: src/content/factions/new-loka.mdx
- nightwave :: src/content/factions/nightwave.mdx
- orokin :: src/content/factions/orokin.mdx
- ostron :: src/content/factions/ostron.mdx
- perrin-sequence retry:1 :: src/content/factions/perrin-sequence.mdx
- red-veil retry:1 :: src/content/factions/red-veil.mdx
- relay-syndicates :: src/content/factions/relay-syndicates.mdx
- scaldra :: src/content/factions/scaldra.mdx
- sentient :: src/content/factions/sentient.mdx
- shadow-stalker :: src/content/factions/shadow-stalker.mdx
- solaris-united :: src/content/factions/solaris-united.mdx
- stalker :: src/content/factions/stalker.mdx
- steel-meridian :: src/content/factions/steel-meridian.mdx
- syndicate :: src/content/factions/syndicate.mdx
- tenno :: src/content/factions/tenno.mdx
- tribunal :: src/content/factions/tribunal.mdx
- ventkids :: src/content/factions/ventkids.mdx
- vox-solaris :: src/content/factions/vox-solaris.mdx
- warframe :: src/content/factions/warframe.mdx
- wild :: src/content/factions/wild.mdx
- zariman-children :: src/content/factions/zariman-children.mdx
## done.syndicates
- arbiters-of-hexis :: src/content/syndicates/arbiters-of-hexis.mdx
- cephalon-simaris :: src/content/syndicates/cephalon-simaris.mdx
- cephalon-suda :: src/content/syndicates/cephalon-suda.mdx
- conclave :: src/content/syndicates/conclave.mdx
- entrati :: src/content/syndicates/entrati.mdx
- holdfasts :: src/content/syndicates/holdfasts.mdx
- kahls-garrison :: src/content/syndicates/kahls-garrison.mdx
- necraloid :: src/content/syndicates/necraloid.mdx
- new-loka :: src/content/syndicates/new-loka.mdx
- nightwave :: src/content/syndicates/nightwave.mdx
- ostron :: src/content/syndicates/ostron.mdx
- perrin-sequence :: src/content/syndicates/perrin-sequence.mdx
- red-veil :: src/content/syndicates/red-veil.mdx
- solaris-united :: src/content/syndicates/solaris-united.mdx
- steel-meridian :: src/content/syndicates/steel-meridian.mdx
- the-hex :: src/content/syndicates/the-hex.mdx
- vent-kids :: src/content/syndicates/vent-kids.mdx
- vox-solaris :: src/content/syndicates/vox-solaris.mdx

## done.relics

## done.arcanes

## done.missions

## done.resources

## done.builds

## done.guides

## verified.warframes
- ash
- ash-prime
- atlas
- atlas-prime
- banshee
- banshee-prime
- baruuk
- baruuk-prime
- bonewidow

## verified.weapons

## verified.mods

## verified.quests
- whispers-in-the-walls

## verified.factions
- dax
- narmer
- new-loka
- nightwave
- orokin
- ostron
- perrin-sequence
- red-veil
- relay-syndicates
- scaldra
- sentient
- shadow-stalker
- solaris-united
- stalker
- steel-meridian
- syndicate
- tenno
- tribunal
- ventkids
- vox-solaris
- warframe
- wild
- zariman-children

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
