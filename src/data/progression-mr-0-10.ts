// progression-mr-0-10.ts -- MR 0-5 and MR 6-10 progression track data.

import type { ProgressionTrack } from './progression-types';

export const TRACKS_MR_0_10: readonly ProgressionTrack[] = [
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
          { name: 'Primed Continuity', why: "Duration increase on abilities; available from Baro Ki'Teer or trading.", link: 'mods/primed-continuity' },
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
];
