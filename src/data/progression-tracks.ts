// progression-tracks.ts -- mastery-rank-banded recommendations for the MR
// progression recommender page (/progression). All links are internal site
// paths relative to BASE_URL; the page prepends base at render time.

export interface RecommendationItem {
  readonly name: string;
  readonly why: string;
  readonly link?: string;
}

export interface RecommendationSection {
  readonly title: string;
  readonly items: readonly RecommendationItem[];
}

export interface MilestoneNote {
  readonly mr: number;
  readonly label: string;
}

export interface ProgressionTrack {
  readonly mr_min: number;
  readonly mr_max: number;
  readonly label: string;
  readonly tagline: string;
  readonly nextMilestone: MilestoneNote;
  readonly sections: readonly RecommendationSection[];
}

export const progressionTracks: readonly ProgressionTrack[] = [
  {
    mr_min: 0,
    mr_max: 5,
    label: 'MR 0 - 5',
    tagline: 'Foundation -- unlock the Star Chart and your first real arsenal.',
    nextMilestone: { mr: 5, label: 'Unlock Quill Onkko daily standing (Plains of Eidolon bounties).' },
    sections: [
      {
        title: 'Frames to Chase',
        items: [
          { name: 'Rhino', why: 'Iron Skin makes you nearly invincible; the best early-game survival frame.', link: 'warframes/rhino' },
          { name: 'Mag', why: 'Magnetic damage crushes Corpus shields -- dominant on Venus and early Corpus planets.', link: 'warframes/mag' },
          { name: 'Volt', why: 'Speed buff accelerates levelling runs; Electric Shield supercharges guns.', link: 'warframes/volt' },
          { name: 'Excalibur', why: 'Radial Blind provides free crowd control; great starter if you enjoy melee.', link: 'warframes/excalibur' },
          { name: 'Trinity', why: 'Energy Vampire removes the need for energy pads; keeps any squad running.', link: 'warframes/trinity' },
        ],
      },
      {
        title: 'Weapons to Acquire',
        items: [
          { name: 'Braton', why: 'Reliable starter rifle with strong slash procs; craftable from the Market.', link: 'weapons/braton' },
          { name: 'Lex', why: 'High-damage secondary with good crit -- teaches you shot placement early.', link: 'weapons/lex' },
          { name: 'Skana', why: 'Free starting sword; level it to MR 30 rank then replace with a high-stat melee.', link: 'weapons/skana' },
          { name: 'Hek', why: 'MR 4 shotgun with powerful burst; one of the best early-game primaries.', link: 'weapons/hek' },
          { name: 'Paris', why: 'MR 0 bow with high critical chance; excellent for Headshot bonus mastery XP.', link: 'weapons/paris' },
        ],
      },
      {
        title: 'Quests to Complete',
        items: [
          { name: "Vor's Prize", why: 'Tutorial quest -- mandatory, unlocks the Star Chart and basic mechanics.', link: 'quests/vors-prize' },
          { name: 'Howl of the Kubrow', why: 'Unlocks the Kubrow companion slot; your first permanent companion.', link: 'quests/howl-of-the-kubrow' },
          { name: 'Stolen Dreams', why: 'Awards the Orokin Key Blueprint essential for progressing Junctions.', link: 'quests/stolen-dreams' },
          { name: 'The Archwing', why: 'Unlocks Archwing combat required for several Junction completions.', link: 'quests/the-archwing' },
        ],
      },
      {
        title: 'Activities',
        items: [
          { name: 'Complete All Starter Planet Junctions', why: 'Each Junction unlocks new planets and gives Warframe Slots, Exilus Adapters, and mods.' },
          { name: 'Farm Rhino from Jackal (Fossa, Venus)', why: 'Jackal is the first real boss -- repeatable for Rhino Neuroptics, Chassis, and Systems.' },
          { name: 'Daily Sortie check-in', why: 'Log in to see the Sortie target faction -- start familiarising yourself with daily rotations.' },
          { name: 'Syndicate intro quests (Steel Meridian, Arbiters)', why: 'Joining a Syndicate early seeds your standing gains for later unlock rewards.' },
        ],
      },
      {
        title: 'Mods to Farm',
        items: [
          { name: 'Serration', why: 'The most important rifle mod -- adds flat damage percentage to all rifles.', link: 'mods/serration' },
          { name: 'Hornet Strike', why: 'Same role as Serration but for secondaries; immediately doubles secondary damage.', link: 'mods/hornet-strike' },
          { name: 'Vitality', why: 'Doubles Warframe health; mandatory on every survivability-focused build.', link: 'mods/vitality' },
          { name: 'Redirection', why: 'Doubles shield capacity; combine with Vitality for robust early-game tankiness.', link: 'mods/redirection' },
          { name: 'Steel Fiber', why: 'Armor percentage boost; essential for Iron Skin Rhino and any armored frame.', link: 'mods/steel-fiber' },
        ],
      },
      {
        title: 'Resources to Stockpile',
        items: [
          { name: 'Ferrite', why: 'Earth and Mercury drop it abundantly; used in nearly every early Warframe blueprint.', link: 'resources/ferrite' },
          { name: 'Alloy Plate', why: 'Venus and Saturn resource -- needed for Rhino parts and dozens of weapon blueprints.', link: 'resources/alloy-plate' },
          { name: 'Polymer Bundle', why: 'Mercury and Uranus drop it; critical for energy pads and early weapon construction.', link: 'resources/polymer-bundle' },
          { name: 'Circuits', why: 'Venus and Ceres -- essential for Warframe chassis blueprints across all factions.', link: 'resources/circuits' },
          { name: 'Nano Spores', why: 'Deimos and Saturn; required for both weapons and Warframe system blueprints.', link: 'resources/nano-spores' },
        ],
      },
    ],
  },
  {
    mr_min: 6,
    mr_max: 10,
    label: 'MR 6 - 10',
    tagline: 'Mid-game -- Void Relics, key story quests, and your first Prime frames.',
    nextMilestone: { mr: 8, label: 'Helminth Chrysalis unlocks at MR 8 -- subsuming frame abilities.' },
    sections: [
      {
        title: 'Frames to Chase',
        items: [
          { name: 'Nekros', why: 'Desecrate grants bonus loot drops from every corpse -- mandatory for resource farms.', link: 'warframes/nekros' },
          { name: 'Nova', why: 'Molecular Prime slows or speeds all enemies in a wide radius -- outstanding crowd control.', link: 'warframes/nova' },
          { name: 'Rhino Prime', why: 'Primed Rhino with more armor and energy; top target from Axi relics.', link: 'warframes/rhino-prime' },
          { name: 'Wukong', why: 'Twin AI companion doubles your kill speed and his passive makes him near-immortal.', link: 'warframes/wukong' },
          { name: 'Harrow', why: 'Covenant builds a critical multiplier on command; strong in organized groups.', link: 'warframes/harrow' },
        ],
      },
      {
        title: 'Weapons to Acquire',
        items: [
          { name: 'Tigris Prime', why: 'Best-in-class shotgun for slash procs; synergizes with Viral status.', link: 'weapons/tigris-prime' },
          { name: 'Arca Plasmor', why: 'MR 10 corpus-dropped AoE shotgun; no ammo economy issues and large punch-through.', link: 'weapons/arca-plasmor' },
          { name: 'Nikana Prime', why: 'High crit/status melee with a sleek moveset; works in virtually any content.', link: 'weapons/nikana-prime' },
          { name: 'Lex Prime', why: 'Prime secondary with one of the highest base crits for any pistol.', link: 'weapons/lex-prime' },
          { name: 'Kogake Prime', why: 'Fastest-attacking fist weapon; great for Swift Momentum stance and quick melee combos.', link: 'weapons/kogake-prime' },
        ],
      },
      {
        title: 'Quests to Complete',
        items: [
          { name: 'The Second Dream', why: 'Major story milestone that unlocks Operator mode -- avoid spoilers before playing.', link: 'quests/the-second-dream' },
          { name: 'Chains of Harrow', why: 'Rewards the Harrow Warframe blueprint; a key mid-game frame for crit-focused players.', link: 'quests/chains-of-harrow' },
          { name: 'The Silver Grove', why: 'Unlocks Titania and introduces the Grove Specters combat mechanic.', link: 'quests/the-silver-grove' },
          { name: 'Sands of Inaros', why: 'Directly rewards the Inaros Warframe; one of the tankiest frames with enormous health.', link: 'quests/sands-of-inaros' },
        ],
      },
      {
        title: 'Activities',
        items: [
          { name: 'Crack Void Relics (Void Fissures)', why: 'The primary engine for acquiring Prime Warframe parts -- learn fissure missions now.' },
          { name: 'Join an Active Syndicate', why: 'Six syndicates offer unique mods and augments not available anywhere else in the game.' },
          { name: 'Install Orokin Reactors on Main Frames', why: 'Doubles mod capacity from 30 to 60 -- absolutely necessary for competitive builds.' },
          { name: 'Unlock Plains of Eidolon (Cetus, Earth)', why: 'Access to Ostron standing, Zaw crafting, and Eidolon Teralyst fights at night.' },
        ],
      },
      {
        title: 'Mods to Farm',
        items: [
          { name: 'Primed Continuity', why: 'Duration increase on abilities; available from Baro Ki\'Teer or trading.', link: 'mods/primed-continuity' },
          { name: 'Split Chamber', why: 'Multishot on rifles -- one of the best overall DPS mods in the game.', link: 'mods/split-chamber' },
          { name: 'Blind Rage', why: 'Dramatic ability-strength boost with an energy cost drawback; used in most endgame builds.', link: 'mods/blind-rage' },
          { name: 'Hunter Munitions', why: 'Converts a fraction of crit hits to Slash procs -- core to any crit weapon build.', link: 'mods/hunter-munitions' },
          { name: 'Condition Overload', why: 'Scales damage based on active status procs; foundation for status-weapon builds.', link: 'mods/condition-overload' },
        ],
      },
      {
        title: 'Resources to Stockpile',
        items: [
          { name: 'Orokin Cell', why: 'Saturn and Deimos -- mandatory for Reactors, Catalysts, and most Prime blueprints.', link: 'resources/orokin-cell' },
          { name: 'Neurodes', why: 'Earth and Eris drop them; one of the most frequently required crafting components.', link: 'resources/neurodes' },
          { name: 'Rubedo', why: 'Phobos and Sedna provide abundant Rubedo used in dozens of weapon and frame blueprints.', link: 'resources/rubedo' },
          { name: 'Plastids', why: 'Saturn and Uranus -- needed for Volt builds, many Orokin components, and Clan research.', link: 'resources/plastids' },
          { name: 'Argon Crystal', why: 'Void-exclusive resource that decays after 24 hours; farm on demand before crafting.', link: 'resources/argon-crystal' },
        ],
      },
    ],
  },
  {
    mr_min: 11,
    mr_max: 15,
    label: 'MR 11 - 15',
    tagline: 'Endgame approach -- open worlds, Operator upgrades, and top-tier frames.',
    nextMilestone: { mr: 15, label: 'All Star Chart nodes completed enables Steel Path access at any MR.' },
    sections: [
      {
        title: 'Frames to Chase',
        items: [
          { name: 'Saryn Prime', why: 'Spore-spread Viral AoE clears entire tile sets -- best damage frame for Steel Path.', link: 'warframes/saryn-prime' },
          { name: 'Mesa Prime', why: 'Peacemaker shreds armor-stripped enemies; 95% damage reduction from Shatter Shield.', link: 'warframes/mesa-prime' },
          { name: 'Octavia Prime', why: 'Near-invincibility through Metronome; Mallet scales infinitely with enemy damage.', link: 'warframes/octavia-prime' },
          { name: 'Khora Prime', why: 'Strangledome plus Whipclaw synergy delivers sustained top-tier damage in any mission.', link: 'warframes/khora-prime' },
          { name: 'Revenant Prime', why: 'Mesmer Skin grants practical immortality; an accessible endgame-survivability pick.', link: 'warframes/revenant-prime' },
        ],
      },
      {
        title: 'Weapons to Acquire',
        items: [
          { name: 'Kuva Bramma', why: 'Highest AoE cluster-bomb bow in the game; the gold standard for open-world clears.', link: 'weapons/kuva-bramma' },
          { name: 'Tenet Cycron', why: 'Sister weapon with a massive status-damage beam -- ideal for stripping armor rapidly.', link: 'weapons/tenet-cycron' },
          { name: 'Stropha', why: 'MR 10 combo-heavy shotgun melee with ground-slam burst; excels in Steel Path.', link: 'weapons/stropha' },
          { name: 'Epitaph', why: 'Lavos signature weapon; alternate fire applies all four main status types instantly.', link: 'weapons/epitaph' },
          { name: 'Pyrana Prime', why: 'High-fire-rate shotgun pistol with a ghost proc that doubles it temporarily.', link: 'weapons/pyrana-prime' },
        ],
      },
      {
        title: 'Quests to Complete',
        items: [
          { name: 'The War Within', why: 'Unlocks Transference combat (Operator in missions) and the Void Mode ability.', link: 'quests/the-war-within' },
          { name: 'Apostasy Prologue', why: 'Short quest that transitions the main story -- required before Heart of Deimos.', link: 'quests/apostasy-prologue' },
          { name: 'The Sacrifice', why: 'Awards Excalibur Umbra, a unique Warframe with its own passive Umbra mods.', link: 'quests/the-sacrifice' },
          { name: 'Erra', why: 'Advances the Sentient storyline leading directly into The New War.', link: 'quests/erra' },
        ],
      },
      {
        title: 'Activities',
        items: [
          { name: 'Unlock Fortuna (Venus) and Solaris United Standing', why: 'Access to Kitgun modular secondaries, MOA companions, and K-Drive gear.' },
          { name: 'Farm Arcane Energize and Arcane Guardian', why: 'These two arcanes provide passive energy and armor bonuses that define endgame builds.' },
          { name: 'Unlock Cambion Drift (Deimos)', why: 'Entrati standing gives access to the Necramech, Helminth, and Son conservation rewards.' },
          { name: 'Begin Eidolon Teralyst Hunts (Plains, night cycle)', why: 'Eidolons drop Arcane Energize, Arcane Grace, and lens blueprints for Focus farming.' },
        ],
      },
      {
        title: 'Mods to Farm',
        items: [
          { name: 'Primed Flow', why: 'Energy-pool multiplier; available from Baro Ki\'Teer -- the backbone of ability-heavy builds.', link: 'mods/primed-flow' },
          { name: 'Adaptation', why: 'Grants stacking damage resistance to incoming damage types; exceptional survivability mod.', link: 'mods/adaptation' },
          { name: 'Umbral Intensify', why: 'Strength plus health buff from Sacrifice quest Umbra mods; pairs with Umbral Vitality.', link: 'mods/umbral-intensify' },
          { name: 'Amalgam Serration', why: 'Slightly lower Serration bonus but grants a Sprint Speed boost for rapid traversal.', link: 'mods/amalgam-serration' },
          { name: 'Rivens', why: 'Riven mods for top weapons provide 20-60% stat boosts; start with a Kuva Bramma or Stropha Riven.', link: 'rivens' },
        ],
      },
      {
        title: 'Resources to Stockpile',
        items: [
          { name: 'Kuva', why: 'Required for Riven rerolling and Kuva Lich confrontations -- farm Kuva Fortress survival.', link: 'resources/kuva' },
          { name: 'Vitus Essence', why: 'Arbitration reward currency -- only source of Adaptation and Aura Forma.', link: 'resources/vitus-essence' },
          { name: 'Endo', why: 'Mod ranking currency -- you need tens of thousands to max out endgame mod stacks.', link: 'resources/endo' },
          { name: 'Forma', why: 'Polarity-changing consumable; each endgame build needs 4-6 Formas per weapon or frame.', link: 'resources/forma' },
          { name: 'Void Traces', why: 'Used to refine Void Relics to Radiant tier; keep a 1200-trace buffer for co-op cracking.', link: 'resources/void-traces' },
        ],
      },
    ],
  },
  {
    mr_min: 16,
    mr_max: 20,
    label: 'MR 16 - 20',
    tagline: 'Veteran -- Steel Path, Railjack, Necramech, and high-level Incarnon weapons.',
    nextMilestone: { mr: 20, label: 'MR 20 unlocks the highest-tier Arbitration reward table and elite weekly challenges.' },
    sections: [
      {
        title: 'Frames to Chase',
        items: [
          { name: 'Protea Prime', why: 'Dispensary sustains energy and ammo; Temporal Anchor enables risk-free aggressive play.', link: 'warframes/protea-prime' },
          { name: 'Wisp Prime', why: 'Reservoir buffs (health, speed, electric) are among the strongest passive team bonuses.', link: 'warframes/wisp-prime' },
          { name: 'Nidus Prime', why: 'Effectively immortal with full Mutation stacks; Parasitic Link enables powerful subsume plays.', link: 'warframes/nidus-prime' },
          { name: 'Garuda Prime', why: 'Bloodletting converts health to energy freely; Seeking Talons fires reliable status procs.', link: 'warframes/garuda-prime' },
          { name: 'Lavos', why: 'Elemental-reaction kit needs no energy at all -- unique and powerful in any content.', link: 'warframes/lavos' },
        ],
      },
      {
        title: 'Weapons to Acquire',
        items: [
          { name: 'Felarx (Incarnon)', why: 'Top-tier primary after Incarnon Genesis evolve; massive burst damage vs. Steel Path targets.', link: 'weapons/felarx' },
          { name: 'Laetum (Incarnon)', why: 'Explosive secondary with crit synergy; paired with Mesa it clears rooms in seconds.', link: 'weapons/laetum' },
          { name: 'Innodem (Incarnon)', why: 'Dagger with devastating Incarnon form that hits for tens of millions per swing.', link: 'weapons/innodem' },
          { name: 'Torid Incarnon', why: 'Gas-cloud launcher upgraded with Incarnon Genesis; S-tier status-cloud generator.', link: 'weapons/torid' },
          { name: 'Angstrum (Incarnon)', why: 'Secondary launcher turned pure burst-damage machine via its Incarnon Genesis form.', link: 'weapons/angstrum' },
        ],
      },
      {
        title: 'Quests to Complete',
        items: [
          { name: 'The New War', why: 'Major story arc; unlocks Duviri and the Drifter as an alternate playable character.', link: 'quests/the-new-war' },
          { name: 'Angels of the Zariman', why: 'Introduces the Zariman open world and the Gyre, Styanax, and Citrine frames.', link: 'quests/angels-of-the-zariman' },
          { name: 'Whispers in the Walls', why: 'Unlocks Albrecht\'s Laboratories and the Incarnon Genesis crafting system.', link: 'quests/whispers-in-the-walls' },
          { name: 'Duviri Paradox', why: 'Alternate game mode with the Circuit -- the primary way to earn Incarnon Genesis adapters.', link: 'quests/the-duviri-paradox' },
        ],
      },
      {
        title: 'Activities',
        items: [
          { name: 'Steel Path Star Chart (all nodes)', why: 'Unlocks Steel Path Incursions, the Teshin cosmetic shop, and Steel Essence currency.' },
          { name: 'Railjack Proxima missions (all regions)', why: 'Railjack intrinsics unlock crew management, fighter abilities, and void storm relics.' },
          { name: 'Necramech Mastery (Voidrig and Bonewidow)', why: 'Both Necramechs award substantial MR and unlock high-level open-world combat roles.' },
          { name: 'Duviri Circuit (weekly rotation)', why: 'Primary source of Incarnon Genesis adapters -- three adapters awarded each week on rotation.' },
        ],
      },
      {
        title: 'Mods to Farm',
        items: [
          { name: 'Arcane Energize (R5)', why: 'On energy orb pickup restores energy to the whole squad; game-changing passive.', link: 'arcanes/arcane-energize' },
          { name: 'Arcane Guardian (R5)', why: 'On any damage taken grants massive armor buff for 20 seconds; best survivability arcane.', link: 'arcanes/arcane-guardian' },
          { name: 'Primed Shred', why: 'Adds fire rate and punch-through to primaries; vastly improves crowd-clear on rifles.', link: 'mods/primed-shred' },
          { name: 'Galvanized Aptitude', why: 'Post-kill status chance bonus stacks quickly -- core for any status-weapon build.', link: 'mods/galvanized-aptitude' },
          { name: 'Cascadia Overcharge', why: 'Shield-gate amplifier that converts full shields into massive bonus damage on hits.', link: 'mods/cascadia-overcharge' },
        ],
      },
      {
        title: 'Resources to Stockpile',
        items: [
          { name: 'Steel Essence', why: 'Steel Path currency -- used at Teshin for Galvanized mods and Primed mod copies.', link: 'resources/steel-essence' },
          { name: 'Cavia Standing (Albrecht Labs)', why: 'Unlocks Incarnon upgrade paths, Son Tokens for conservation, and Entrati Lanthorn.', link: 'resources/cavia-standing' },
          { name: 'Zariman Syndicate Standing', why: 'Zariman weapons and mods (Gyre augments, Incarnon adapter blueprints) gated here.', link: 'resources/zariman-standing' },
          { name: 'Riven Slivers', why: 'Convert 10 slivers into one Riven Mod via Palladino; a reliable Riven income stream.', link: 'resources/riven-sliver' },
          { name: 'Lua Thrax Plasm', why: 'Zariman blueprint currency -- needed for Gyre, Styanax, and Citrine component prints.', link: 'resources/lua-thrax-plasm' },
        ],
      },
    ],
  },
  {
    mr_min: 21,
    mr_max: 25,
    label: 'MR 21 - 25',
    tagline: 'High mastery -- Warframe: 1999, Hollvania, and deep min-max territory.',
    nextMilestone: { mr: 25, label: 'MR 25 grants access to the Ambassador and Felarx direct-access market listing.' },
    sections: [
      {
        title: 'Frames to Chase',
        items: [
          { name: 'Dante', why: 'Noctua damage buff plus overguard generation makes Dante one of the strongest 2024 frames.', link: 'warframes/dante' },
          { name: 'Citrine', why: 'Crystalline buffs stack crits and status chance; exceptional squad support with Prismatic Gem.', link: 'warframes/citrine' },
          { name: 'Voruna', why: 'Fused wolf-pack Warframe with innate multishot and viral status application at will.', link: 'warframes/voruna' },
          { name: 'Gyre', why: 'Electrical arc chain conduits across grouped enemies; exceptional for high-density Steel Path.', link: 'warframes/gyre' },
          { name: 'Styanax', why: 'Rallying Cry restores energy to the squad on kills; durable front-liner with crowd control.', link: 'warframes/styanax' },
        ],
      },
      {
        title: 'Weapons to Acquire',
        items: [
          { name: 'Ambassador', why: 'MR 15 assault rifle with hybrid Arca Plasmor alt-fire; top-tier for sustained damage.', link: 'weapons/ambassador' },
          { name: 'Grimoire', why: 'Dante signature tome weapon -- augmented by Dante\'s Tragedy for explosive area clears.', link: 'weapons/grimoire' },
          { name: 'Nataruk', why: 'Unranked powerful bow that requires zero forma investment; the best free bow in the game.', link: 'weapons/nataruk' },
          { name: 'Phenmor (Incarnon)', why: 'Incarnon rifle with enormous burst potential after two shots -- the sniper-rifle answer to crowds.', link: 'weapons/phenmor' },
          { name: 'Knell Prime', why: 'Headshot-combo pistol that refills its single-round magazine on kill; absurd burst damage.', link: 'weapons/knell-prime' },
        ],
      },
      {
        title: 'Quests to Complete',
        items: [
          { name: 'Warframe: 1999 (Lotus Eaters)', why: 'Update 38 content expanding the Hex storyline; unlocks Arthur and Hollvania hub access.', link: 'quests/the-lotus-eaters' },
          { name: 'Jade Shadows', why: 'Awards Jade Warframe blueprint and advances the Stalker rework storyline.', link: 'quests/jade-shadows' },
          { name: 'Cavia Syndicate Story Quests', why: 'Completes Albrecht Labs lore and unlocks Cavia Rank 5 rewards including Qorvex Warframe.' },
        ],
      },
      {
        title: 'Activities',
        items: [
          { name: 'Hollvania (1999 Open World) Bounties', why: 'The newest open world hub with unique Syndicate standing, cosmetics, and The Hex frames.' },
          { name: 'Elite Onslaught (Arbitrations)', why: 'Arbitrations reward Vitus Essence and Arcane Energize; bring a damage-optimised build.' },
          { name: 'Void Angel Hunting (Zariman)', why: 'Void Angels drop Lua Lens blueprints and Zariman-exclusive Arcanes at T1-T5 scaling.' },
          { name: 'Netracell Missions (Albrecht Labs, Deimos)', why: 'Weekly guaranteed rewards include Arcanes, Incarnon Genesis adapters, and Mod Sets.' },
        ],
      },
      {
        title: 'Mods to Farm',
        items: [
          { name: 'Arcane Rise', why: 'Grants bonus primary weapon damage after casting abilities -- huge multiplier for casters.', link: 'arcanes/arcane-rise' },
          { name: 'Merciless (Warframe Arcane)', why: 'After kills, massive primary damage buff stacking to 16 charges; dominant on clearing builds.', link: 'arcanes/merciless' },
          { name: 'Molt Augmented', why: 'After kills, grants a stacking armor bonus with no duration cap -- the best passive armor arcane.', link: 'arcanes/molt-augmented' },
          { name: 'Galvanized Chamber', why: 'Multishot with on-kill bonus -- the Primed/Galvanized replacement for Split Chamber.', link: 'mods/galvanized-chamber' },
          { name: 'Base Damage Arcane (Fury/Avenger)', why: 'Arcane Fury (melee) and Arcane Avenger (any) add critical chance on hit -- consistent DPS lifts.' },
        ],
      },
      {
        title: 'Resources to Stockpile',
        items: [
          { name: 'Entrati Lanthorn', why: 'Rare Deimos resource needed for top-tier Cavia Syndicate Rank 5 rewards.', link: 'resources/entrati-lanthorn' },
          { name: 'Pathos Clamp', why: 'Duviri resource for crafting Incarnon weapons offered through the Circuit rewards.', link: 'resources/pathos-clamp' },
          { name: 'Nacreous Pebble', why: 'Zariman resource dropped by Void Angels -- needed for Void Flood weapon blueprints.', link: 'resources/nacreous-pebble' },
          { name: 'Steel Essence (x300+ buffer)', why: 'Teshin\'s Steel Path shop rotates; a buffer lets you buy the next Primed mod without grinding.' },
          { name: 'Lua Thrax Plasm (surplus)', why: 'Excess plasm converts to Riven Slivers via Palladino -- reliable passive Riven income.' },
        ],
      },
    ],
  },
  {
    mr_min: 26,
    mr_max: 30,
    label: 'MR 26 - 30',
    tagline: 'Max mastery -- cosmetics, completionism, and the prestige of a full Codex.',
    nextMilestone: { mr: 30, label: 'MR 30 is the current cap. The goal shifts to 100% star-chart Nightwave completion and full Arcane sets.' },
    sections: [
      {
        title: 'Frames to Chase',
        items: [
          { name: 'Kullervo', why: 'Wrathful Advance melee combo teleport and Wrathful Advance combo has absurd Steel Path scaling.', link: 'warframes/kullervo' },
          { name: 'Dagath', why: 'Nightmare-mode inspired kit with stacking DoT; one of the smoothest endgame solo frames.', link: 'warframes/dagath' },
          { name: 'Jade', why: 'Jade Shadows frame with a passive healing aura; great for extended endurance missions.', link: 'warframes/jade' },
          { name: 'Arthur', why: 'Warframe: 1999 frame with a sword-and-board kit tailored for Hollvania faction content.', link: 'warframes/arthur' },
          { name: 'Oberon Prime', why: 'For completionists only -- Sancti Castanas augment makes Oberon a niche but fun healer.', link: 'warframes/oberon-prime' },
        ],
      },
      {
        title: 'Weapons to Acquire',
        items: [
          { name: 'Hex Signature Weapons (1999)', why: 'Each Hex member has a unique signature weapon exclusive to the Warframe: 1999 update.' },
          { name: 'Incarnon Genesis Set (all 14)', why: 'Collect all 14 Incarnon adapters through Duviri Circuit to complete the set and unlock set bonuses.' },
          { name: 'Coda Weapons (Hollvania)', why: 'Hollvania-exclusive weapons with unique Coda mechanics tied to the 1999 faction faction loop.' },
          { name: 'Tenet Arca Plasmor', why: 'Sister weapon variant; remains one of the cleanest AoE shotguns at any mastery rank.', link: 'weapons/tenet-arca-plasmor' },
          { name: 'Praedos', why: 'Tonfas with built-in Motus setup bonus and best-in-class combo efficiency for spin-attack builds.', link: 'weapons/praedos' },
        ],
      },
      {
        title: 'Quests to Complete',
        items: [
          { name: 'All Nightwave Acts (all series)', why: 'Completing every Nightwave series grants Nora\'s Choice credits for Arcanes and cosmetics.' },
          { name: 'Steel Path Endurance Records', why: 'Community leaderboard challenge -- reach wave 100 Survival on Steel Path for bragging rights.' },
          { name: 'All Codex Scans (Simaris)', why: 'Scanning every enemy type fills the Simaris Codex and awards Synthesis points for Augments.' },
        ],
      },
      {
        title: 'Activities',
        items: [
          { name: 'Full Arcane Sets (all 156 arcanes)', why: 'Complete the Arcane collection to access every passive bonus; Eidolons and Elite Arbits are the grind.' },
          { name: 'Steel Path Incursions (daily x5)', why: 'Guaranteed Steel Essence; the single most efficient source for Teshin shop currency.' },
          { name: 'Elite Weekly Nightwave Challenges', why: 'Elite acts award 7000 Nightwave standing each; the fastest path to Nora prestige ranks.' },
          { name: 'Perfect Conservation (all open worlds)', why: 'Perfect captures for all Pobber, Velocipod, and Condroc variants unlock cosmetic trophies.' },
        ],
      },
      {
        title: 'Mods to Farm',
        items: [
          { name: 'Complete Primary Arcane Set (Merciless/Deadhead/Sharpshooter)', why: 'Rotate arcane weapons slots based on loadout -- a full set gives maximum flexibility.', link: 'arcanes/primary-deadhead' },
          { name: 'Primed Sure Footed', why: 'Available only from Baro Ki\'Teer; prevents all knockdown -- quality-of-life for Steel Path.', link: 'mods/primed-sure-footed' },
          { name: 'Augur Set (full)', why: 'Four-piece set bonus doubles shield gate efficiency -- cornerstone of shield-gate survivability.', link: 'mods/augur-secrets' },
          { name: 'Melee Arcane Set (Fury/Blade Charger/Dexterity)', why: 'Rotating melee arcanes for different content -- Fury for sustained DPS, Dexterity for ability casts.' },
          { name: 'Rolling Guard', why: 'On dodge clears all status effects and grants immunity; essential for high-density Steel Path.', link: 'mods/rolling-guard' },
        ],
      },
      {
        title: 'Resources to Stockpile',
        items: [
          { name: 'Nora\'s Choice Credits', why: 'Nightwave prestige currency -- buy cosmetic collections only available through seasonal rewards.' },
          { name: 'Intact / Exceptional / Flawless / Radiant Relics (Stockpile)', why: 'Keep 20+ of each rarity for every Prime currently in the vault rotation.' },
          { name: 'Kuva (5 million buffer)', why: 'Riven rerolling never ends at MR 30; a multi-million Kuva buffer keeps you rolling without farming gaps.' },
          { name: 'Ayatan Sculptures', why: 'Convert full sculptures to Endo via Maroo\'s Bazaar weekly -- the most Endo-efficient use of drops.', link: 'resources/ayatan-sculpture' },
          { name: 'Platinum (emergency reserve)', why: 'Keep 200-500 plat for emergency slots when a new update drops before you\'ve made room in inventory.' },
        ],
      },
    ],
  },
];
