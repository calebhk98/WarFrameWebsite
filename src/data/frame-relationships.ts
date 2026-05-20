// frame-relationships.ts -- hand-curated warframe synergy relationship graph.
// Edges describe how frames interact via buffs, role synergy, subsume pairings,
// and established team compositions. Used by /frame-graph.

export type RelationshipType = 'buffs' | 'synergy' | 'subsume-pair' | 'team-comp';

export interface FrameRelationship {
  readonly from: string; // warframe slug (source of the relationship)
  readonly to: string;   // warframe slug (target / recipient)
  readonly type: RelationshipType;
  readonly strength: 1 | 2 | 3 | 4 | 5; // 1 = mild, 5 = essential
  readonly note: string; // short explanation shown on hover / in detail panel
}

// Node slugs that appear in the graph (25 popular frames).
export const GRAPH_NODES: readonly string[] = [
  'saryn-prime',
  'mesa-prime',
  'wisp-prime',
  'rhino-prime',
  'trinity-prime',
  'volt-prime',
  'chroma-prime',
  'harrow-prime',
  'nova-prime',
  'nekros-prime',
  'khora-prime',
  'octavia-prime',
  'mag-prime',
  'protea-prime',
  'sevagoth-prime',
  'gauss-prime',
  'hildryn-prime',
  'nidus-prime',
  'gara-prime',
  'equinox-prime',
  'loki-prime',
  'vauban-prime',
  'ash-prime',
  'banshee-prime',
  'mirage-prime',
];

// Display labels for graph nodes (strip "-prime" suffix for brevity).
export function nodeLabel(slug: string): string {
  return slug
    .replace(/-prime$/, '')
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

// 35 hand-curated relationship edges.
export const FRAME_RELATIONSHIPS: readonly FrameRelationship[] = [
  // --- buffs ---
  {
    from: 'wisp-prime',
    to: 'saryn-prime',
    type: 'buffs',
    strength: 5,
    note: 'Wisp Reservoirs grant Haste (fire rate/speed) and Vitality, directly boosting Saryn\'s Spore spread speed and survivability.',
  },
  {
    from: 'wisp-prime',
    to: 'mesa-prime',
    type: 'buffs',
    strength: 5,
    note: 'Wisp Haste reservoir dramatically increases Mesa\'s Peacemaker fire rate, roughly doubling damage throughput.',
  },
  {
    from: 'rhino-prime',
    to: 'saryn-prime',
    type: 'buffs',
    strength: 4,
    note: 'Roar provides a multiplicative damage amplifier that stacks with Saryn\'s Spore scaling for extreme endgame numbers.',
  },
  {
    from: 'rhino-prime',
    to: 'nova-prime',
    type: 'buffs',
    strength: 4,
    note: 'Roar multiplies the Molecular Prime detonation damage, pushing nuke potential in level-cap content.',
  },
  {
    from: 'rhino-prime',
    to: 'octavia-prime',
    type: 'buffs',
    strength: 4,
    note: 'Roar stacks multiplicatively with Octavia\'s Amp buff, compounding ambient damage from Mallet and Resonator.',
  },
  {
    from: 'wisp-prime',
    to: 'chroma-prime',
    type: 'buffs',
    strength: 3,
    note: 'Haste reservoir accelerates Chroma\'s Vex Armor stacking by increasing attack speed for melee-based builds.',
  },
  {
    from: 'harrow-prime',
    to: 'volt-prime',
    type: 'buffs',
    strength: 4,
    note: 'Covenant grants critical-chance buff timed to Volt\'s Electric Shield amp window in Eidolon hunts.',
  },
  {
    from: 'banshee-prime',
    to: 'saryn-prime',
    type: 'buffs',
    strength: 3,
    note: 'Sonar marks enemy weak spots; Saryn\'s Spore detonation on a Sonar node results in enormous burst damage.',
  },
  {
    from: 'octavia-prime',
    to: 'saryn-prime',
    type: 'buffs',
    strength: 3,
    note: 'Octavia Amp doubles ally damage including Saryn\'s Spore procs when teammates hit in-rhythm.',
  },
  {
    from: 'mirage-prime',
    to: 'mesa-prime',
    type: 'buffs',
    strength: 3,
    note: 'Eclipse provides a 200 % damage bonus in lit areas that applies to Mesa\'s Peacemaker rounds.',
  },
  // --- synergy ---
  {
    from: 'khora-prime',
    to: 'nekros-prime',
    type: 'synergy',
    strength: 5,
    note: 'Khora\'s Strangledome groups enemies into Nekros\'s Desecrate AoE, maximizing drop-chance coverage in survival farming.',
  },
  {
    from: 'volt-prime',
    to: 'chroma-prime',
    type: 'synergy',
    strength: 5,
    note: 'Volt\'s Electric Shield amplifies and adds electricity to shots passing through it; Chroma\'s Vex Armor benefits from the same damage spike.',
  },
  {
    from: 'trinity-prime',
    to: 'chroma-prime',
    type: 'synergy',
    strength: 5,
    note: 'Trinity\'s Energy Vampire keeps Chroma\'s channeled abilities (Vex Armor) running indefinitely and provides team healing.',
  },
  {
    from: 'harrow-prime',
    to: 'chroma-prime',
    type: 'synergy',
    strength: 4,
    note: 'Harrow\'s Covenant critical buff syncs perfectly with Chroma\'s damage phases during Eidolon limb phases.',
  },
  {
    from: 'loki-prime',
    to: 'saryn-prime',
    type: 'synergy',
    strength: 3,
    note: 'Loki\'s Radial Disarm removes armor-granting abilities; Saryn can clear disarmed enemies faster with Spores.',
  },
  {
    from: 'vauban-prime',
    to: 'nekros-prime',
    type: 'synergy',
    strength: 4,
    note: 'Vauban\'s Bastille suspends enemies directly inside Nekros\'s Desecrate range, increasing resource yields.',
  },
  {
    from: 'nidus-prime',
    to: 'khora-prime',
    type: 'synergy',
    strength: 3,
    note: 'Nidus Larva clusters enemies for Khora\'s Strangledome to consolidate -- useful in large open tile sets.',
  },
  {
    from: 'gauss-prime',
    to: 'octavia-prime',
    type: 'synergy',
    strength: 3,
    note: 'Gauss\'s Thermal Sunder primes enemies with heat/cold status; Octavia\'s Mallet detonates them for extra status procs.',
  },
  {
    from: 'protea-prime',
    to: 'wisp-prime',
    type: 'synergy',
    strength: 3,
    note: 'Protea\'s Dispensary provides energy and resources for the squad, letting Wisp cast Reservoirs freely in prolonged missions.',
  },
  {
    from: 'gara-prime',
    to: 'vauban-prime',
    type: 'synergy',
    strength: 3,
    note: 'Gara\'s Vitrify and Vauban\'s Bastille create layered lockdown zones excellent for defense missions.',
  },
  {
    from: 'equinox-prime',
    to: 'nekros-prime',
    type: 'synergy',
    strength: 4,
    note: 'Equinox\'s Maim accumulates stored damage and nukes a room; survivors enter Nekros\'s Desecrate radius.',
  },
  {
    from: 'hildryn-prime',
    to: 'saryn-prime',
    type: 'synergy',
    strength: 4,
    note: 'Hildryn\'s Pillage strips shields and armor before Saryn nukes, removing the main mitigation layer against Spore damage.',
  },
  {
    from: 'ash-prime',
    to: 'banshee-prime',
    type: 'synergy',
    strength: 3,
    note: 'Ash\'s Shuriken strips armor from targets that Banshee\'s Sonar has marked, enabling massive finisher-level bursts.',
  },
  // --- subsume-pair ---
  {
    from: 'rhino-prime',
    to: 'mag-prime',
    type: 'subsume-pair',
    strength: 5,
    note: 'Subsume Roar onto Mag; it multiplicatively amplifies Magnetize detonation damage and Polarize hits against Corpus.',
  },
  {
    from: 'rhino-prime',
    to: 'saryn-prime',
    type: 'subsume-pair',
    strength: 5,
    note: 'Subsume Roar onto Saryn to replace Spores on a second Saryn in ESO, covering both DPS and amp roles.',
  },
  {
    from: 'sevagoth-prime',
    to: 'mesa-prime',
    type: 'subsume-pair',
    strength: 5,
    note: 'Subsume Gloom onto Mesa; Gloom provides life-steal and slows while Peacemaker is active, solving survivability.',
  },
  {
    from: 'rhino-prime',
    to: 'nova-prime',
    type: 'subsume-pair',
    strength: 4,
    note: 'Subsume Roar onto Nova to amplify Molecular Prime detonation damage -- Nova loses Null Star but gains a nuke multiplier.',
  },
  {
    from: 'rhino-prime',
    to: 'octavia-prime',
    type: 'subsume-pair',
    strength: 4,
    note: 'Subsume Roar onto Octavia; Roar + Mallet Amp compound for very high area DPS in stationary missions.',
  },
  {
    from: 'saryn-prime',
    to: 'hildryn-prime',
    type: 'subsume-pair',
    strength: 4,
    note: 'Subsume Spores onto Hildryn; Pillage strips shields to spread Spores rapidly without spending energy.',
  },
  {
    from: 'gauss-prime',
    to: 'saryn-prime',
    type: 'subsume-pair',
    strength: 3,
    note: 'Subsume Thermal Sunder onto Saryn; the cold proc from Sunder groups enemies for more efficient Spore detonations.',
  },
  {
    from: 'protea-prime',
    to: 'rhino-prime',
    type: 'subsume-pair',
    strength: 3,
    note: 'Subsume Dispensary onto Rhino; replaces Rhino Charge for a squad energy/ammo cache on top of Iron Skin tanking.',
  },
  // --- team-comp ---
  {
    from: 'chroma-prime',
    to: 'volt-prime',
    type: 'team-comp',
    strength: 5,
    note: 'Eidolon hunt 4-stack: Chroma (damage), Volt (shield amp), Trinity (energy), Harrow (crit buff) -- all four are essential.',
  },
  {
    from: 'volt-prime',
    to: 'trinity-prime',
    type: 'team-comp',
    strength: 5,
    note: 'Eidolon 4-stack: Volt Electric Shield boosts amp damage; Trinity sustains energy for all frames during hunt phases.',
  },
  {
    from: 'trinity-prime',
    to: 'harrow-prime',
    type: 'team-comp',
    strength: 5,
    note: 'Eidolon 4-stack: Trinity heals and energizes; Harrow\'s Covenant layers a crit buff for the Volt-shielded shots.',
  },
  {
    from: 'nekros-prime',
    to: 'khora-prime',
    type: 'team-comp',
    strength: 5,
    note: 'Farming 4-stack: Nekros + Khora + Wisp + Nova -- Khora corrals, Nekros loots, Wisp buffs, Nova speeds rotations.',
  },
  {
    from: 'wisp-prime',
    to: 'nekros-prime',
    type: 'team-comp',
    strength: 4,
    note: 'Farming 4-stack: Wisp Haste buffer for the DPS frame; Nekros desecrates after the kill wave.',
  },
];
