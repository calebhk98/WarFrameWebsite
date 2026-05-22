// progression-mr-21-30.ts -- MR 21-25 and MR 26-30 progression track data.

import type { ProgressionTrack } from './progression-types';

export const TRACKS_MR_21_30: readonly ProgressionTrack[] = [
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
          { name: 'Grimoire', why: "Dante signature tome weapon -- augmented by Dante's Tragedy for explosive area clears.", link: 'weapons/grimoire' },
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
          { name: 'Steel Essence (x300+ buffer)', why: "Teshin's Steel Path shop rotates; a buffer lets you buy the next Primed mod without grinding." },
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
    nextMilestone: { mr: 30, label: "MR 30 is the current cap. The goal shifts to 100% star-chart Nightwave completion and full Arcane sets." },
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
          { name: 'All Nightwave Acts (all series)', why: "Completing every Nightwave series grants Nora's Choice credits for Arcanes and cosmetics." },
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
          { name: 'Primed Sure Footed', why: "Available only from Baro Ki'Teer; prevents all knockdown -- quality-of-life for Steel Path.", link: 'mods/primed-sure-footed' },
          { name: 'Augur Set (full)', why: 'Four-piece set bonus doubles shield gate efficiency -- cornerstone of shield-gate survivability.', link: 'mods/augur-secrets' },
          { name: 'Melee Arcane Set (Fury/Blade Charger/Dexterity)', why: 'Rotating melee arcanes for different content -- Fury for sustained DPS, Dexterity for ability casts.' },
          { name: 'Rolling Guard', why: 'On dodge clears all status effects and grants immunity; essential for high-density Steel Path.', link: 'mods/rolling-guard' },
        ],
      },
      {
        title: 'Resources to Stockpile',
        items: [
          { name: "Nora's Choice Credits", why: 'Nightwave prestige currency -- buy cosmetic collections only available through seasonal rewards.' },
          { name: 'Intact / Exceptional / Flawless / Radiant Relics (Stockpile)', why: 'Keep 20+ of each rarity for every Prime currently in the vault rotation.' },
          { name: 'Kuva (5 million buffer)', why: 'Riven rerolling never ends at MR 30; a multi-million Kuva buffer keeps you rolling without farming gaps.' },
          { name: 'Ayatan Sculptures', why: "Convert full sculptures to Endo via Maroo's Bazaar weekly -- the most Endo-efficient use of drops.", link: 'resources/ayatan-sculpture' },
          { name: 'Platinum (emergency reserve)', why: "Keep 200-500 plat for emergency slots when a new update drops before you've made room in inventory." },
        ],
      },
    ],
  },
];
