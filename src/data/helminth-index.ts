// helminth-index.ts -- hand-curated Helminth subsume data.
// Source: Warframe Fandom Wiki -- Helminth Segment, Subsumable Abilities table.
// URL: https://warframe.fandom.com/wiki/Helminth#Subsumable_Abilities
// Accessed: 2026-05-20
//
// Each warframe has exactly ONE ability that can be subsumed. The subsumable
// ability is listed here alongside its key (1/2/3/4) in the frame's kit.
// Frames not in this list are marked "uncurated" in the widget.

export interface HelminthEntry {
  readonly slug: string;
  readonly name: string;
  readonly abilities: readonly HelminthAbility[];
  readonly subsumeAbility: string; // name of the subsumable ability
  readonly subsumeKey: '1' | '2' | '3' | '4'; // which ability slot is subsumable
}

export interface HelminthAbility {
  readonly key: '1' | '2' | '3' | '4';
  readonly name: string;
}

// Helminth resource costs for subsuming any ability (universal flat cost).
// Source: https://warframe.fandom.com/wiki/Helminth#Subsume
// These are the MINIMUM costs to subsume (at rank 0 Helminth). Costs shown
// in the UI as reference; exact values depend on Helminth rank milestones.
export interface HelminthResource {
  readonly name: string;
  readonly amount: number;
  readonly description: string;
}

export const HELMINTH_SUBSUME_COST: readonly HelminthResource[] = [
  { name: 'Bile', amount: 1500, description: 'Yellow ichor from the Infestation' },
  { name: 'Calx', amount: 1500, description: 'Mineral secretion from Fortuna' },
  { name: 'Synthetics', amount: 1500, description: 'Orokin-era synthetic compounds' },
  { name: 'Pheromones', amount: 1500, description: 'Biological attractants from the Plains' },
  { name: 'Oxides', amount: 1500, description: 'Oxidised matter from the Void' },
  { name: 'Biotics', amount: 1500, description: 'Biological material from any mission' },
];

// NOTE: Minimum resource cost per subsume is 1500 of one resource type. The
// Helminth will consume the cheapest available resource first. Exact per-frame
// costs may vary. See Helminth Segment in-game menu for current values.

// Known popular synergy combos. Keys are "baseSlug|subsumeSlug" pairs.
// Shown in the "Synergy Notes" panel when both selections match.
export interface SynergyNote {
  readonly baseSlug: string;
  readonly subsumeSlug: string;
  readonly notes: readonly string[];
}

export const SYNERGY_NOTES: readonly SynergyNote[] = [
  {
    baseSlug: 'mag',
    subsumeSlug: 'rhino',
    notes: [
      'Roar amplifies all of Mag\'s damage including Spore procs and Magnetize detonations.',
      'Pull + Roar + Magnetize is a staple damage combo for Corpus-heavy missions.',
      'Replace Pull (1) with Roar to gain a team-wide buff without losing core kit.',
    ],
  },
  {
    baseSlug: 'mesa',
    subsumeSlug: 'saryn',
    notes: [
      'Gloom from Sevagoth is the more common pick, but Spores pairs well with Peacemaker\'s fire rate.',
      'Mesa\'s high damage output detonates Spores rapidly across grouped enemies.',
    ],
  },
  {
    baseSlug: 'mesa',
    subsumeSlug: 'sevagoth',
    notes: [
      'Gloom provides life-leech and a slow aura while Peacemaker is active.',
      'Mesa is normally immobile during Peacemaker; Gloom healing mitigates incoming damage.',
      'Replace Ballistic Battery (1) with Gloom for maximum survivability.',
    ],
  },
  {
    baseSlug: 'saryn',
    subsumeSlug: 'rhino',
    notes: [
      'Roar multiplicatively stacks with Saryn\'s Spore damage scaling.',
      'Replacing Spores on your second Saryn with Roar lets a duo cover both roles in ESO.',
    ],
  },
  {
    baseSlug: 'nova',
    subsumeSlug: 'rhino',
    notes: [
      'Roar amplifies the Molecular Prime detonation multiplier.',
      'Nova already slows or speeds enemies; Roar fills the missing damage-amp role.',
    ],
  },
  {
    baseSlug: 'octavia',
    subsumeSlug: 'rhino',
    notes: [
      'Roar combines with Mallet + Resonator for very high ambient damage output.',
      'Octavia\'s kit buffs Roar through Amp (Mallet) doubling friendly damage.',
    ],
  },
  {
    baseSlug: 'hildryn',
    subsumeSlug: 'saryn',
    notes: [
      'Spores spread via Hildryn\'s Pillage shield-strip, enabling rapid propagation.',
      'Hildryn\'s high shield pool supports Spore energy via Pillage restores.',
    ],
  },
  {
    baseSlug: 'protea',
    subsumeSlug: 'rhino',
    notes: [
      'Roar pairs with Protea\'s Dispensary for a self-sustaining damage amp loop.',
      'Replace Grenade Fan (1) with Roar to free up a kit slot without losing turrets.',
    ],
  },
];

// Curated Helminth subsume data for 40 frames.
// Frames not listed here will display a "see Fandom" notice in the widget.
// Source: https://warframe.fandom.com/wiki/Helminth#Subsumable_Abilities
export const HELMINTH_DATA: readonly HelminthEntry[] = [
  {
    slug: 'ash',
    name: 'Ash',
    abilities: [
      { key: '1', name: 'Shuriken' },
      { key: '2', name: 'Smoke Screen' },
      { key: '3', name: 'Teleport' },
      { key: '4', name: 'Blade Storm' },
    ],
    subsumeAbility: 'Shuriken',
    subsumeKey: '1',
  },
  {
    slug: 'ash-prime',
    name: 'Ash Prime',
    abilities: [
      { key: '1', name: 'Shuriken' },
      { key: '2', name: 'Smoke Screen' },
      { key: '3', name: 'Teleport' },
      { key: '4', name: 'Blade Storm' },
    ],
    subsumeAbility: 'Shuriken',
    subsumeKey: '1',
  },
  {
    slug: 'banshee',
    name: 'Banshee',
    abilities: [
      { key: '1', name: 'Sonic Boom' },
      { key: '2', name: 'Sonar' },
      { key: '3', name: 'Silence' },
      { key: '4', name: 'Sound Quake' },
    ],
    subsumeAbility: 'Sonar',
    subsumeKey: '2',
  },
  {
    slug: 'banshee-prime',
    name: 'Banshee Prime',
    abilities: [
      { key: '1', name: 'Sonic Boom' },
      { key: '2', name: 'Sonar' },
      { key: '3', name: 'Silence' },
      { key: '4', name: 'Sound Quake' },
    ],
    subsumeAbility: 'Sonar',
    subsumeKey: '2',
  },
  {
    slug: 'baruuk',
    name: 'Baruuk',
    abilities: [
      { key: '1', name: 'Elude' },
      { key: '2', name: 'Lull' },
      { key: '3', name: 'Desolate Hands' },
      { key: '4', name: 'Serene Storm' },
    ],
    subsumeAbility: 'Lull',
    subsumeKey: '2',
  },
  {
    slug: 'baruuk-prime',
    name: 'Baruuk Prime',
    abilities: [
      { key: '1', name: 'Elude' },
      { key: '2', name: 'Lull' },
      { key: '3', name: 'Desolate Hands' },
      { key: '4', name: 'Serene Storm' },
    ],
    subsumeAbility: 'Lull',
    subsumeKey: '2',
  },
  {
    slug: 'chroma',
    name: 'Chroma',
    abilities: [
      { key: '1', name: 'Spectral Scream' },
      { key: '2', name: 'Elemental Ward' },
      { key: '3', name: 'Vex Armor' },
      { key: '4', name: 'Effigy' },
    ],
    subsumeAbility: 'Elemental Ward',
    subsumeKey: '2',
  },
  {
    slug: 'chroma-prime',
    name: 'Chroma Prime',
    abilities: [
      { key: '1', name: 'Spectral Scream' },
      { key: '2', name: 'Elemental Ward' },
      { key: '3', name: 'Vex Armor' },
      { key: '4', name: 'Effigy' },
    ],
    subsumeAbility: 'Elemental Ward',
    subsumeKey: '2',
  },
  {
    slug: 'ember',
    name: 'Ember',
    abilities: [
      { key: '1', name: 'Fireball' },
      { key: '2', name: 'Immolation' },
      { key: '3', name: 'Fire Blast' },
      { key: '4', name: 'Inferno' },
    ],
    subsumeAbility: 'Fire Blast',
    subsumeKey: '3',
  },
  {
    slug: 'ember-prime',
    name: 'Ember Prime',
    abilities: [
      { key: '1', name: 'Fireball' },
      { key: '2', name: 'Immolation' },
      { key: '3', name: 'Fire Blast' },
      { key: '4', name: 'Inferno' },
    ],
    subsumeAbility: 'Fire Blast',
    subsumeKey: '3',
  },
  {
    slug: 'excalibur',
    name: 'Excalibur',
    abilities: [
      { key: '1', name: 'Slash Dash' },
      { key: '2', name: 'Radial Blind' },
      { key: '3', name: 'Radial Javelin' },
      { key: '4', name: 'Exalted Blade' },
    ],
    subsumeAbility: 'Radial Blind',
    subsumeKey: '2',
  },
  {
    slug: 'excalibur-prime',
    name: 'Excalibur Prime',
    abilities: [
      { key: '1', name: 'Slash Dash' },
      { key: '2', name: 'Radial Blind' },
      { key: '3', name: 'Radial Javelin' },
      { key: '4', name: 'Exalted Blade' },
    ],
    subsumeAbility: 'Radial Blind',
    subsumeKey: '2',
  },
  {
    slug: 'frost',
    name: 'Frost',
    abilities: [
      { key: '1', name: 'Freeze' },
      { key: '2', name: 'Ice Wave' },
      { key: '3', name: 'Snow Globe' },
      { key: '4', name: 'Avalanche' },
    ],
    subsumeAbility: 'Ice Wave',
    subsumeKey: '2',
  },
  {
    slug: 'frost-prime',
    name: 'Frost Prime',
    abilities: [
      { key: '1', name: 'Freeze' },
      { key: '2', name: 'Ice Wave' },
      { key: '3', name: 'Snow Globe' },
      { key: '4', name: 'Avalanche' },
    ],
    subsumeAbility: 'Ice Wave',
    subsumeKey: '2',
  },
  {
    slug: 'gara',
    name: 'Gara',
    abilities: [
      { key: '1', name: 'Shattered Lash' },
      { key: '2', name: 'Vitrify' },
      { key: '3', name: 'Splinter Storm' },
      { key: '4', name: 'Spectrorage' },
    ],
    subsumeAbility: 'Splinter Storm',
    subsumeKey: '3',
  },
  {
    slug: 'gara-prime',
    name: 'Gara Prime',
    abilities: [
      { key: '1', name: 'Shattered Lash' },
      { key: '2', name: 'Vitrify' },
      { key: '3', name: 'Splinter Storm' },
      { key: '4', name: 'Spectrorage' },
    ],
    subsumeAbility: 'Splinter Storm',
    subsumeKey: '3',
  },
  {
    slug: 'garuda',
    name: 'Garuda',
    abilities: [
      { key: '1', name: 'Dread Mirror' },
      { key: '2', name: 'Blood Altar' },
      { key: '3', name: 'Bloodletting' },
      { key: '4', name: 'Seeking Talons' },
    ],
    subsumeAbility: 'Blood Altar',
    subsumeKey: '2',
  },
  {
    slug: 'garuda-prime',
    name: 'Garuda Prime',
    abilities: [
      { key: '1', name: 'Dread Mirror' },
      { key: '2', name: 'Blood Altar' },
      { key: '3', name: 'Bloodletting' },
      { key: '4', name: 'Seeking Talons' },
    ],
    subsumeAbility: 'Blood Altar',
    subsumeKey: '2',
  },
  {
    slug: 'harrow',
    name: 'Harrow',
    abilities: [
      { key: '1', name: 'Condemn' },
      { key: '2', name: 'Penance' },
      { key: '3', name: 'Thurible' },
      { key: '4', name: 'Covenant' },
    ],
    subsumeAbility: 'Thurible',
    subsumeKey: '3',
  },
  {
    slug: 'harrow-prime',
    name: 'Harrow Prime',
    abilities: [
      { key: '1', name: 'Condemn' },
      { key: '2', name: 'Penance' },
      { key: '3', name: 'Thurible' },
      { key: '4', name: 'Covenant' },
    ],
    subsumeAbility: 'Thurible',
    subsumeKey: '3',
  },
  {
    slug: 'hildryn',
    name: 'Hildryn',
    abilities: [
      { key: '1', name: 'Balefire' },
      { key: '2', name: 'Shield Pillage' },
      { key: '3', name: 'Haven' },
      { key: '4', name: 'Aegis Storm' },
    ],
    subsumeAbility: 'Haven',
    subsumeKey: '3',
  },
  {
    slug: 'hildryn-prime',
    name: 'Hildryn Prime',
    abilities: [
      { key: '1', name: 'Balefire' },
      { key: '2', name: 'Shield Pillage' },
      { key: '3', name: 'Haven' },
      { key: '4', name: 'Aegis Storm' },
    ],
    subsumeAbility: 'Haven',
    subsumeKey: '3',
  },
  {
    slug: 'hydroid',
    name: 'Hydroid',
    abilities: [
      { key: '1', name: 'Tempest Barrage' },
      { key: '2', name: 'Tidal Surge' },
      { key: '3', name: 'Undertow' },
      { key: '4', name: 'Tentacle Swarm' },
    ],
    subsumeAbility: 'Tempest Barrage',
    subsumeKey: '1',
  },
  {
    slug: 'hydroid-prime',
    name: 'Hydroid Prime',
    abilities: [
      { key: '1', name: 'Tempest Barrage' },
      { key: '2', name: 'Tidal Surge' },
      { key: '3', name: 'Undertow' },
      { key: '4', name: 'Tentacle Swarm' },
    ],
    subsumeAbility: 'Tempest Barrage',
    subsumeKey: '1',
  },
  {
    slug: 'inaros',
    name: 'Inaros',
    abilities: [
      { key: '1', name: 'Desiccation' },
      { key: '2', name: 'Devour' },
      { key: '3', name: 'Sandstorm' },
      { key: '4', name: 'Scarab Swarm' },
    ],
    subsumeAbility: 'Desiccation',
    subsumeKey: '1',
  },
  {
    slug: 'inaros-prime',
    name: 'Inaros Prime',
    abilities: [
      { key: '1', name: 'Desiccation' },
      { key: '2', name: 'Devour' },
      { key: '3', name: 'Sandstorm' },
      { key: '4', name: 'Scarab Swarm' },
    ],
    subsumeAbility: 'Desiccation',
    subsumeKey: '1',
  },
  {
    slug: 'ivara',
    name: 'Ivara',
    abilities: [
      { key: '1', name: 'Quiver' },
      { key: '2', name: 'Navigator' },
      { key: '3', name: 'Prowl' },
      { key: '4', name: 'Artemis Bow' },
    ],
    subsumeAbility: 'Quiver',
    subsumeKey: '1',
  },
  {
    slug: 'ivara-prime',
    name: 'Ivara Prime',
    abilities: [
      { key: '1', name: 'Quiver' },
      { key: '2', name: 'Navigator' },
      { key: '3', name: 'Prowl' },
      { key: '4', name: 'Artemis Bow' },
    ],
    subsumeAbility: 'Quiver',
    subsumeKey: '1',
  },
  {
    slug: 'khora',
    name: 'Khora',
    abilities: [
      { key: '1', name: 'Whipclaw' },
      { key: '2', name: 'Ensnare' },
      { key: '3', name: 'Venari' },
      { key: '4', name: 'Strangledome' },
    ],
    subsumeAbility: 'Ensnare',
    subsumeKey: '2',
  },
  {
    slug: 'khora-prime',
    name: 'Khora Prime',
    abilities: [
      { key: '1', name: 'Whipclaw' },
      { key: '2', name: 'Ensnare' },
      { key: '3', name: 'Venari' },
      { key: '4', name: 'Strangledome' },
    ],
    subsumeAbility: 'Ensnare',
    subsumeKey: '2',
  },
  {
    slug: 'lavos',
    name: 'Lavos',
    abilities: [
      { key: '1', name: 'Vial Rush' },
      { key: '2', name: 'Ophidian Bite' },
      { key: '3', name: 'Transmutation Probe' },
      { key: '4', name: 'Catalyze' },
    ],
    subsumeAbility: 'Ophidian Bite',
    subsumeKey: '2',
  },
  {
    slug: 'lavos-prime',
    name: 'Lavos Prime',
    abilities: [
      { key: '1', name: 'Vial Rush' },
      { key: '2', name: 'Ophidian Bite' },
      { key: '3', name: 'Transmutation Probe' },
      { key: '4', name: 'Catalyze' },
    ],
    subsumeAbility: 'Ophidian Bite',
    subsumeKey: '2',
  },
  {
    slug: 'limbo',
    name: 'Limbo',
    abilities: [
      { key: '1', name: 'Banish' },
      { key: '2', name: 'Stasis' },
      { key: '3', name: 'Rift Surge' },
      { key: '4', name: 'Cataclysm' },
    ],
    subsumeAbility: 'Banish',
    subsumeKey: '1',
  },
  {
    slug: 'limbo-prime',
    name: 'Limbo Prime',
    abilities: [
      { key: '1', name: 'Banish' },
      { key: '2', name: 'Stasis' },
      { key: '3', name: 'Rift Surge' },
      { key: '4', name: 'Cataclysm' },
    ],
    subsumeAbility: 'Banish',
    subsumeKey: '1',
  },
  {
    slug: 'loki',
    name: 'Loki',
    abilities: [
      { key: '1', name: 'Decoy' },
      { key: '2', name: 'Invisibility' },
      { key: '3', name: 'Switch Teleport' },
      { key: '4', name: 'Radial Disarm' },
    ],
    subsumeAbility: 'Decoy',
    subsumeKey: '1',
  },
  {
    slug: 'loki-prime',
    name: 'Loki Prime',
    abilities: [
      { key: '1', name: 'Decoy' },
      { key: '2', name: 'Invisibility' },
      { key: '3', name: 'Switch Teleport' },
      { key: '4', name: 'Radial Disarm' },
    ],
    subsumeAbility: 'Decoy',
    subsumeKey: '1',
  },
  {
    slug: 'mag',
    name: 'Mag',
    abilities: [
      { key: '1', name: 'Pull' },
      { key: '2', name: 'Magnetize' },
      { key: '3', name: 'Polarize' },
      { key: '4', name: 'Crush' },
    ],
    subsumeAbility: 'Pull',
    subsumeKey: '1',
  },
  {
    slug: 'mag-prime',
    name: 'Mag Prime',
    abilities: [
      { key: '1', name: 'Pull' },
      { key: '2', name: 'Magnetize' },
      { key: '3', name: 'Polarize' },
      { key: '4', name: 'Crush' },
    ],
    subsumeAbility: 'Pull',
    subsumeKey: '1',
  },
  {
    slug: 'mesa',
    name: 'Mesa',
    abilities: [
      { key: '1', name: 'Ballistic Battery' },
      { key: '2', name: 'Shooting Gallery' },
      { key: '3', name: 'Shatter Shield' },
      { key: '4', name: 'Peacemaker' },
    ],
    subsumeAbility: 'Shooting Gallery',
    subsumeKey: '2',
  },
  {
    slug: 'mesa-prime',
    name: 'Mesa Prime',
    abilities: [
      { key: '1', name: 'Ballistic Battery' },
      { key: '2', name: 'Shooting Gallery' },
      { key: '3', name: 'Shatter Shield' },
      { key: '4', name: 'Peacemaker' },
    ],
    subsumeAbility: 'Shooting Gallery',
    subsumeKey: '2',
  },
  {
    slug: 'mirage',
    name: 'Mirage',
    abilities: [
      { key: '1', name: 'Hall of Malevolence' },
      { key: '2', name: 'Sleight of Hand' },
      { key: '3', name: 'Eclipse' },
      { key: '4', name: 'Total Eclipse' },
    ],
    subsumeAbility: 'Eclipse',
    subsumeKey: '3',
  },
  {
    slug: 'mirage-prime',
    name: 'Mirage Prime',
    abilities: [
      { key: '1', name: 'Hall of Malevolence' },
      { key: '2', name: 'Sleight of Hand' },
      { key: '3', name: 'Eclipse' },
      { key: '4', name: 'Total Eclipse' },
    ],
    subsumeAbility: 'Eclipse',
    subsumeKey: '3',
  },
  {
    slug: 'nekros',
    name: 'Nekros',
    abilities: [
      { key: '1', name: 'Soul Punch' },
      { key: '2', name: 'Terrify' },
      { key: '3', name: 'Desecrate' },
      { key: '4', name: 'Shadows of the Dead' },
    ],
    subsumeAbility: 'Terrify',
    subsumeKey: '2',
  },
  {
    slug: 'nekros-prime',
    name: 'Nekros Prime',
    abilities: [
      { key: '1', name: 'Soul Punch' },
      { key: '2', name: 'Terrify' },
      { key: '3', name: 'Desecrate' },
      { key: '4', name: 'Shadows of the Dead' },
    ],
    subsumeAbility: 'Terrify',
    subsumeKey: '2',
  },
  {
    slug: 'nezha',
    name: 'Nezha',
    abilities: [
      { key: '1', name: 'Fire Walker' },
      { key: '2', name: 'Blazing Chakram' },
      { key: '3', name: 'Warding Halo' },
      { key: '4', name: 'Divine Spears' },
    ],
    subsumeAbility: 'Warding Halo',
    subsumeKey: '3',
  },
  {
    slug: 'nezha-prime',
    name: 'Nezha Prime',
    abilities: [
      { key: '1', name: 'Fire Walker' },
      { key: '2', name: 'Blazing Chakram' },
      { key: '3', name: 'Warding Halo' },
      { key: '4', name: 'Divine Spears' },
    ],
    subsumeAbility: 'Warding Halo',
    subsumeKey: '3',
  },
  {
    slug: 'nidus',
    name: 'Nidus',
    abilities: [
      { key: '1', name: 'Virulence' },
      { key: '2', name: 'Larva' },
      { key: '3', name: 'Parasitic Link' },
      { key: '4', name: 'Ravenous' },
    ],
    subsumeAbility: 'Larva',
    subsumeKey: '2',
  },
  {
    slug: 'nidus-prime',
    name: 'Nidus Prime',
    abilities: [
      { key: '1', name: 'Virulence' },
      { key: '2', name: 'Larva' },
      { key: '3', name: 'Parasitic Link' },
      { key: '4', name: 'Ravenous' },
    ],
    subsumeAbility: 'Larva',
    subsumeKey: '2',
  },
  {
    slug: 'nova',
    name: 'Nova',
    abilities: [
      { key: '1', name: 'Null Star' },
      { key: '2', name: 'Antimatter Drop' },
      { key: '3', name: 'Wormhole' },
      { key: '4', name: 'Molecular Prime' },
    ],
    subsumeAbility: 'Null Star',
    subsumeKey: '1',
  },
  {
    slug: 'nova-prime',
    name: 'Nova Prime',
    abilities: [
      { key: '1', name: 'Null Star' },
      { key: '2', name: 'Antimatter Drop' },
      { key: '3', name: 'Wormhole' },
      { key: '4', name: 'Molecular Prime' },
    ],
    subsumeAbility: 'Null Star',
    subsumeKey: '1',
  },
  {
    slug: 'nyx',
    name: 'Nyx',
    abilities: [
      { key: '1', name: 'Mind Control' },
      { key: '2', name: 'Psychic Bolts' },
      { key: '3', name: 'Chaos' },
      { key: '4', name: 'Absorb' },
    ],
    subsumeAbility: 'Psychic Bolts',
    subsumeKey: '2',
  },
  {
    slug: 'nyx-prime',
    name: 'Nyx Prime',
    abilities: [
      { key: '1', name: 'Mind Control' },
      { key: '2', name: 'Psychic Bolts' },
      { key: '3', name: 'Chaos' },
      { key: '4', name: 'Absorb' },
    ],
    subsumeAbility: 'Psychic Bolts',
    subsumeKey: '2',
  },
  {
    slug: 'oberon',
    name: 'Oberon',
    abilities: [
      { key: '1', name: 'Smite' },
      { key: '2', name: 'Hallowed Ground' },
      { key: '3', name: 'Renewal' },
      { key: '4', name: 'Reckoning' },
    ],
    subsumeAbility: 'Smite',
    subsumeKey: '1',
  },
  {
    slug: 'oberon-prime',
    name: 'Oberon Prime',
    abilities: [
      { key: '1', name: 'Smite' },
      { key: '2', name: 'Hallowed Ground' },
      { key: '3', name: 'Renewal' },
      { key: '4', name: 'Reckoning' },
    ],
    subsumeAbility: 'Smite',
    subsumeKey: '1',
  },
  {
    slug: 'octavia',
    name: 'Octavia',
    abilities: [
      { key: '1', name: 'Mallet' },
      { key: '2', name: 'Resonator' },
      { key: '3', name: 'Metronome' },
      { key: '4', name: 'Amp' },
    ],
    subsumeAbility: 'Resonator',
    subsumeKey: '2',
  },
  {
    slug: 'octavia-prime',
    name: 'Octavia Prime',
    abilities: [
      { key: '1', name: 'Mallet' },
      { key: '2', name: 'Resonator' },
      { key: '3', name: 'Metronome' },
      { key: '4', name: 'Amp' },
    ],
    subsumeAbility: 'Resonator',
    subsumeKey: '2',
  },
  {
    slug: 'protea',
    name: 'Protea',
    abilities: [
      { key: '1', name: 'Grenade Fan' },
      { key: '2', name: 'Blaze Artillery' },
      { key: '3', name: 'Dispensary' },
      { key: '4', name: 'Temporal Anchor' },
    ],
    subsumeAbility: 'Dispensary',
    subsumeKey: '3',
  },
  {
    slug: 'protea-prime',
    name: 'Protea Prime',
    abilities: [
      { key: '1', name: 'Grenade Fan' },
      { key: '2', name: 'Blaze Artillery' },
      { key: '3', name: 'Dispensary' },
      { key: '4', name: 'Temporal Anchor' },
    ],
    subsumeAbility: 'Dispensary',
    subsumeKey: '3',
  },
  {
    slug: 'revenant',
    name: 'Revenant',
    abilities: [
      { key: '1', name: 'Enthrall' },
      { key: '2', name: 'Mesmer Skin' },
      { key: '3', name: 'Reave' },
      { key: '4', name: 'Danse Macabre' },
    ],
    subsumeAbility: 'Enthrall',
    subsumeKey: '1',
  },
  {
    slug: 'revenant-prime',
    name: 'Revenant Prime',
    abilities: [
      { key: '1', name: 'Enthrall' },
      { key: '2', name: 'Mesmer Skin' },
      { key: '3', name: 'Reave' },
      { key: '4', name: 'Danse Macabre' },
    ],
    subsumeAbility: 'Enthrall',
    subsumeKey: '1',
  },
  {
    slug: 'rhino',
    name: 'Rhino',
    abilities: [
      { key: '1', name: 'Rhino Charge' },
      { key: '2', name: 'Iron Skin' },
      { key: '3', name: 'Roar' },
      { key: '4', name: 'Rhino Stomp' },
    ],
    subsumeAbility: 'Roar',
    subsumeKey: '3',
  },
  {
    slug: 'rhino-prime',
    name: 'Rhino Prime',
    abilities: [
      { key: '1', name: 'Rhino Charge' },
      { key: '2', name: 'Iron Skin' },
      { key: '3', name: 'Roar' },
      { key: '4', name: 'Rhino Stomp' },
    ],
    subsumeAbility: 'Roar',
    subsumeKey: '3',
  },
  {
    slug: 'saryn',
    name: 'Saryn',
    abilities: [
      { key: '1', name: 'Spores' },
      { key: '2', name: 'Molt' },
      { key: '3', name: 'Toxic Lash' },
      { key: '4', name: 'Miasma' },
    ],
    subsumeAbility: 'Spores',
    subsumeKey: '1',
  },
  {
    slug: 'saryn-prime',
    name: 'Saryn Prime',
    abilities: [
      { key: '1', name: 'Spores' },
      { key: '2', name: 'Molt' },
      { key: '3', name: 'Toxic Lash' },
      { key: '4', name: 'Miasma' },
    ],
    subsumeAbility: 'Spores',
    subsumeKey: '1',
  },
  {
    slug: 'sevagoth',
    name: 'Sevagoth',
    abilities: [
      { key: '1', name: 'Reap' },
      { key: '2', name: 'Sow' },
      { key: '3', name: 'Gloom' },
      { key: '4', name: 'Exalted Shadow' },
    ],
    subsumeAbility: 'Gloom',
    subsumeKey: '3',
  },
  {
    slug: 'sevagoth-prime',
    name: 'Sevagoth Prime',
    abilities: [
      { key: '1', name: 'Reap' },
      { key: '2', name: 'Sow' },
      { key: '3', name: 'Gloom' },
      { key: '4', name: 'Exalted Shadow' },
    ],
    subsumeAbility: 'Gloom',
    subsumeKey: '3',
  },
  {
    slug: 'titania',
    name: 'Titania',
    abilities: [
      { key: '1', name: 'Spellbind' },
      { key: '2', name: 'Tribute' },
      { key: '3', name: 'Lantern' },
      { key: '4', name: 'Razorwing' },
    ],
    subsumeAbility: 'Spellbind',
    subsumeKey: '1',
  },
  {
    slug: 'titania-prime',
    name: 'Titania Prime',
    abilities: [
      { key: '1', name: 'Spellbind' },
      { key: '2', name: 'Tribute' },
      { key: '3', name: 'Lantern' },
      { key: '4', name: 'Razorwing' },
    ],
    subsumeAbility: 'Spellbind',
    subsumeKey: '1',
  },
  {
    slug: 'trinity',
    name: 'Trinity',
    abilities: [
      { key: '1', name: 'Well of Life' },
      { key: '2', name: 'Energy Vampire' },
      { key: '3', name: 'Link' },
      { key: '4', name: 'Blessing' },
    ],
    subsumeAbility: 'Well of Life',
    subsumeKey: '1',
  },
  {
    slug: 'trinity-prime',
    name: 'Trinity Prime',
    abilities: [
      { key: '1', name: 'Well of Life' },
      { key: '2', name: 'Energy Vampire' },
      { key: '3', name: 'Link' },
      { key: '4', name: 'Blessing' },
    ],
    subsumeAbility: 'Well of Life',
    subsumeKey: '1',
  },
  {
    slug: 'valkyr',
    name: 'Valkyr',
    abilities: [
      { key: '1', name: 'Rip Line' },
      { key: '2', name: 'Warcry' },
      { key: '3', name: 'Paralysis' },
      { key: '4', name: 'Hysteria' },
    ],
    subsumeAbility: 'Warcry',
    subsumeKey: '2',
  },
  {
    slug: 'valkyr-prime',
    name: 'Valkyr Prime',
    abilities: [
      { key: '1', name: 'Rip Line' },
      { key: '2', name: 'Warcry' },
      { key: '3', name: 'Paralysis' },
      { key: '4', name: 'Hysteria' },
    ],
    subsumeAbility: 'Warcry',
    subsumeKey: '2',
  },
  {
    slug: 'vauban',
    name: 'Vauban',
    abilities: [
      { key: '1', name: 'Flechette Orb' },
      { key: '2', name: 'Vector Pad' },
      { key: '3', name: 'Minelayer' },
      { key: '4', name: 'Bastille' },
    ],
    subsumeAbility: 'Flechette Orb',
    subsumeKey: '1',
  },
  {
    slug: 'vauban-prime',
    name: 'Vauban Prime',
    abilities: [
      { key: '1', name: 'Flechette Orb' },
      { key: '2', name: 'Vector Pad' },
      { key: '3', name: 'Minelayer' },
      { key: '4', name: 'Bastille' },
    ],
    subsumeAbility: 'Flechette Orb',
    subsumeKey: '1',
  },
  {
    slug: 'volt',
    name: 'Volt',
    abilities: [
      { key: '1', name: 'Shock' },
      { key: '2', name: 'Speed' },
      { key: '3', name: 'Electric Shield' },
      { key: '4', name: 'Discharge' },
    ],
    subsumeAbility: 'Shock',
    subsumeKey: '1',
  },
  {
    slug: 'volt-prime',
    name: 'Volt Prime',
    abilities: [
      { key: '1', name: 'Shock' },
      { key: '2', name: 'Speed' },
      { key: '3', name: 'Electric Shield' },
      { key: '4', name: 'Discharge' },
    ],
    subsumeAbility: 'Shock',
    subsumeKey: '1',
  },
  {
    slug: 'wisp',
    name: 'Wisp',
    abilities: [
      { key: '1', name: 'Reservoirs' },
      { key: '2', name: 'Wil-O-Wisp' },
      { key: '3', name: 'Breach Surge' },
      { key: '4', name: 'Sol Gate' },
    ],
    subsumeAbility: 'Breach Surge',
    subsumeKey: '3',
  },
  {
    slug: 'wisp-prime',
    name: 'Wisp Prime',
    abilities: [
      { key: '1', name: 'Reservoirs' },
      { key: '2', name: 'Wil-O-Wisp' },
      { key: '3', name: 'Breach Surge' },
      { key: '4', name: 'Sol Gate' },
    ],
    subsumeAbility: 'Breach Surge',
    subsumeKey: '3',
  },
  {
    slug: 'wukong',
    name: 'Wukong',
    abilities: [
      { key: '1', name: 'Iron Jab' },
      { key: '2', name: 'Defy' },
      { key: '3', name: 'Cloud Walker' },
      { key: '4', name: 'Primal Fury' },
    ],
    subsumeAbility: 'Cloud Walker',
    subsumeKey: '3',
  },
  {
    slug: 'wukong-prime',
    name: 'Wukong Prime',
    abilities: [
      { key: '1', name: 'Iron Jab' },
      { key: '2', name: 'Defy' },
      { key: '3', name: 'Cloud Walker' },
      { key: '4', name: 'Primal Fury' },
    ],
    subsumeAbility: 'Cloud Walker',
    subsumeKey: '3',
  },
  {
    slug: 'xaku',
    name: 'Xaku',
    abilities: [
      { key: '1', name: 'Xata\'s Whisper' },
      { key: '2', name: 'Grasp of Lohk' },
      { key: '3', name: 'The Lost' },
      { key: '4', name: 'The Vast Untime' },
    ],
    subsumeAbility: "Xata's Whisper",
    subsumeKey: '1',
  },
  {
    slug: 'xaku-prime',
    name: 'Xaku Prime',
    abilities: [
      { key: '1', name: "Xata's Whisper" },
      { key: '2', name: 'Grasp of Lohk' },
      { key: '3', name: 'The Lost' },
      { key: '4', name: 'The Vast Untime' },
    ],
    subsumeAbility: "Xata's Whisper",
    subsumeKey: '1',
  },
  {
    slug: 'zephyr',
    name: 'Zephyr',
    abilities: [
      { key: '1', name: 'Tail Wind' },
      { key: '2', name: 'Airburst' },
      { key: '3', name: 'Turbulence' },
      { key: '4', name: 'Tornado' },
    ],
    subsumeAbility: 'Airburst',
    subsumeKey: '2',
  },
  {
    slug: 'zephyr-prime',
    name: 'Zephyr Prime',
    abilities: [
      { key: '1', name: 'Tail Wind' },
      { key: '2', name: 'Airburst' },
      { key: '3', name: 'Turbulence' },
      { key: '4', name: 'Tornado' },
    ],
    subsumeAbility: 'Airburst',
    subsumeKey: '2',
  },
];

// Helper: look up a frame by slug.
export function findHelminthEntry(slug: string): HelminthEntry | undefined {
  return HELMINTH_DATA.find((e) => e.slug === slug);
}

// Helper: look up synergy notes for a base+subsume pair.
export function findSynergyNotes(
  baseSlug: string,
  subsumeSlug: string,
): readonly string[] {
  const match = SYNERGY_NOTES.find(
    (s) => s.baseSlug === baseSlug && s.subsumeSlug === subsumeSlug,
  );
  return match?.notes ?? [];
}
