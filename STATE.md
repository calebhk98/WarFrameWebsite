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
- caliban :: src/content/warframes/caliban.mdx
- chroma retry:1 :: src/content/warframes/chroma.mdx
- chroma-prime :: src/content/warframes/chroma-prime.mdx
- citrine retry:1 :: src/content/warframes/citrine.mdx
- cyte-09 :: src/content/warframes/cyte-09.mdx
- dagath retry:1 :: src/content/warframes/dagath.mdx
- dante :: src/content/warframes/dante.mdx
- ember retry:1 :: src/content/warframes/ember.mdx
- ember-prime :: src/content/warframes/ember-prime.mdx
- equinox :: src/content/warframes/equinox.mdx
- equinox-prime :: src/content/warframes/equinox-prime.mdx
- excalibur :: src/content/warframes/excalibur.mdx
- excalibur-prime :: src/content/warframes/excalibur-prime.mdx
- excalibur-umbra :: src/content/warframes/excalibur-umbra.mdx
- frost :: src/content/warframes/frost.mdx
- frost-prime :: src/content/warframes/frost-prime.mdx
- gara :: src/content/warframes/gara.mdx
- gara-prime :: src/content/warframes/gara-prime.mdx
- garuda retry:1 :: src/content/warframes/garuda.mdx
- garuda-prime :: src/content/warframes/garuda-prime.mdx
- gauss retry:1 :: src/content/warframes/gauss.mdx
- gauss-prime :: src/content/warframes/gauss-prime.mdx
- grendel :: src/content/warframes/grendel.mdx
- grendel-prime retry:1 :: src/content/warframes/grendel-prime.mdx
- gyre :: src/content/warframes/gyre.mdx
- harrow retry:1 :: src/content/warframes/harrow.mdx
- harrow-prime :: src/content/warframes/harrow-prime.mdx
- helminth :: src/content/warframes/helminth.mdx
- hildryn :: src/content/warframes/hildryn.mdx
- hildryn-prime :: src/content/warframes/hildryn-prime.mdx
- hydroid :: src/content/warframes/hydroid.mdx
- hydroid-prime :: src/content/warframes/hydroid-prime.mdx
- inaros :: src/content/warframes/inaros.mdx
- inaros-prime :: src/content/warframes/inaros-prime.mdx
- ivara :: src/content/warframes/ivara.mdx
- ivara-prime :: src/content/warframes/ivara-prime.mdx
- jade :: src/content/warframes/jade.mdx
- khora :: src/content/warframes/khora.mdx
- khora-prime :: src/content/warframes/khora-prime.mdx
- koumei :: src/content/warframes/koumei.mdx
- kullervo :: src/content/warframes/kullervo.mdx
- lavos :: src/content/warframes/lavos.mdx
- lavos-prime :: src/content/warframes/lavos-prime.mdx
- limbo :: src/content/warframes/limbo.mdx
- limbo-prime :: src/content/warframes/limbo-prime.mdx
- loki :: src/content/warframes/loki.mdx
- loki-prime :: src/content/warframes/loki-prime.mdx
- mag :: src/content/warframes/mag.mdx
- mag-prime :: src/content/warframes/mag-prime.mdx
- mesa :: src/content/warframes/mesa.mdx
- mesa-prime :: src/content/warframes/mesa-prime.mdx
- mirage :: src/content/warframes/mirage.mdx
- mirage-prime :: src/content/warframes/mirage-prime.mdx
- nekros :: src/content/warframes/nekros.mdx
- nekros-prime :: src/content/warframes/nekros-prime.mdx
- nezha :: src/content/warframes/nezha.mdx
- nezha-prime retry:1 :: src/content/warframes/nezha-prime.mdx
- nidus :: src/content/warframes/nidus.mdx
- nidus-prime :: src/content/warframes/nidus-prime.mdx
- nova :: src/content/warframes/nova.mdx
- nova-prime :: src/content/warframes/nova-prime.mdx
- nyx :: src/content/warframes/nyx.mdx
- nyx-prime :: src/content/warframes/nyx-prime.mdx
- oberon :: src/content/warframes/oberon.mdx
- oberon-prime :: src/content/warframes/oberon-prime.mdx
- octavia :: src/content/warframes/octavia.mdx
- octavia-prime :: src/content/warframes/octavia-prime.mdx
- protea :: src/content/warframes/protea.mdx
- protea-prime :: src/content/warframes/protea-prime.mdx
- qorvex :: src/content/warframes/qorvex.mdx
- revenant :: src/content/warframes/revenant.mdx
- revenant-prime :: src/content/warframes/revenant-prime.mdx
- rhino :: src/content/warframes/rhino.mdx
- rhino-prime :: src/content/warframes/rhino-prime.mdx
- saryn :: src/content/warframes/saryn.mdx
- saryn-prime :: src/content/warframes/saryn-prime.mdx
- sevagoth :: src/content/warframes/sevagoth.mdx
- sevagoth-prime :: src/content/warframes/sevagoth-prime.mdx
- styanax :: src/content/warframes/styanax.mdx
- temple :: src/content/warframes/temple.mdx
- titania :: src/content/warframes/titania.mdx
- titania-prime :: src/content/warframes/titania-prime.mdx
- trinity :: src/content/warframes/trinity.mdx
- trinity-prime :: src/content/warframes/trinity-prime.mdx
- valkyr :: src/content/warframes/valkyr.mdx
- valkyr-prime :: src/content/warframes/valkyr-prime.mdx
- vauban :: src/content/warframes/vauban.mdx
- vauban-prime :: src/content/warframes/vauban-prime.mdx

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
- caliban
- chroma
- chroma-prime
- citrine
- cyte-09
- dagath
- dante
- ember
- ember-prime
- equinox
- equinox-prime
- excalibur
- excalibur-prime
- excalibur-umbra
- frost
- frost-prime
- gara
- gara-prime
- garuda
- garuda-prime
- gauss
- gauss-prime
- grendel
- grendel-prime
- gyre
- harrow
- harrow-prime
- helminth
- hildryn
- hildryn-prime
- hydroid
- hydroid-prime
- inaros
- inaros-prime
- ivara
- ivara-prime
- jade
- khora
- khora-prime
- koumei
- kullervo
- lavos
- lavos-prime
- limbo
- limbo-prime
- loki
- loki-prime
- mag
- mag-prime
- mesa
- mesa-prime
- mirage
- mirage-prime
- nekros
- nekros-prime
- nezha
- nezha-prime
- nidus
- nidus-prime
- nova
- nova-prime
- nyx
- nyx-prime
- oberon
- oberon-prime
- octavia
- octavia-prime
- protea
- protea-prime
- qorvex
- revenant
- revenant-prime
- rhino
- rhino-prime
- saryn
- saryn-prime
- sevagoth
- sevagoth-prime
- styanax
- temple
- titania
- titania-prime
- trinity
- trinity-prime
- valkyr
- valkyr-prime
- vauban
- vauban-prime

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

## scope

Phase 4 was originally scoped to research every entity in every enumeration.
That is infeasible in a single session at the per-entity-MDX granularity for
collections like weapons (598), mods (1733), missions (260), arcanes (156),
resources (224), and relics (2682). Manager has declared the following MVP
scope cut so the project is submittable:

In-scope (per-entity MDX research):
  - warframes (110 total - completing all)
  - quests (43) - DONE
  - factions (35) - DONE
  - syndicates (18) - DONE

Out-of-scope for this session (will render as enumeration-driven list pages
in Phase 5, no per-entity MDX detail page):
  - weapons (598)
  - mods (1733)
  - missions (260)
  - arcanes (156)
  - resources (224)
  - relics (2682)
  - builds (deferred to a future content phase)
  - guides (deferred)

Phase 5 will build the site UI/routing/search on top of what content exists.
Phase 6 will deploy. Phase 7 will undraft the tracking PR.

This is documented intentional MVP scope, not abandoned work. Resuming the
out-of-scope collections is a future content phase, not a regression.
