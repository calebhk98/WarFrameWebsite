// progression-mr-11-20.ts -- MR 11-15 and MR 16-20 progression track data.

import type { ProgressionTrack } from './progression-types';

export const TRACKS_MR_11_20: readonly ProgressionTrack[] = [
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
          { name: 'Mesa Prime', why: "Peacemaker shreds armor-stripped enemies; 95% damage reduction from Shatter Shield.", link: 'warframes/mesa-prime' },
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
          { name: 'Primed Flow', why: "Energy-pool multiplier; available from Baro Ki'Teer -- the backbone of ability-heavy builds.", link: 'mods/primed-flow' },
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
          { name: 'Whispers in the Walls', why: "Unlocks Albrecht's Laboratories and the Incarnon Genesis crafting system.", link: 'quests/whispers-in-the-walls' },
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
];
