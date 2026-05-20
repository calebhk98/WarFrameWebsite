// damage-data.ts -- static reference data for the damage types page.
// Source: https://warframe.fandom.com/wiki/Damage (accessed 2026-05-20)

export const ENEMY_TYPES: readonly string[] = [
  'Cloned Flesh', 'Ferrite Armor', 'Alloy Armor', 'Shield', 'Proto Shield',
  'Flesh', 'Robotic', 'Infested Flesh', 'Fossilized', 'Sinew', 'Machinery',
];

export interface DamageRow {
  readonly name: string;
  readonly cat: string;
  readonly mods: readonly number[];
}

// Each mods entry maps to ENEMY_TYPES by index.
// [clonedFlesh, ferrite, alloy, shield, protoShield, flesh, robotic, infestedFlesh, fossilized, sinew, machinery]
export const DAMAGE_MATRIX: readonly DamageRow[] = [
  { name: 'Impact',    cat: 'Physical',  mods: [1.0,  1.0,  1.0,  1.5,  1.0,  1.0,  1.0,  0.75, 1.0,  1.0,  1.0 ] },
  { name: 'Puncture',  cat: 'Physical',  mods: [1.0,  1.5,  1.0,  1.0,  1.0,  1.0,  1.5,  1.0,  0.85, 1.0,  1.5 ] },
  { name: 'Slash',     cat: 'Physical',  mods: [1.25, 0.85, 0.85, 1.0,  0.85, 1.25, 1.0,  1.5,  1.5,  0.5,  1.0 ] },
  { name: 'Heat',      cat: 'Elemental', mods: [1.25, 1.0,  1.0,  1.0,  1.0,  1.5,  1.0,  1.5,  1.0,  1.0,  1.0 ] },
  { name: 'Cold',      cat: 'Elemental', mods: [1.0,  1.0,  1.25, 1.5,  1.0,  1.0,  1.0,  1.0,  0.75, 1.25, 0.75] },
  { name: 'Electric',  cat: 'Elemental', mods: [1.0,  1.0,  1.0,  1.0,  1.0,  1.0,  1.5,  1.0,  0.5,  1.5,  1.5 ] },
  { name: 'Toxin',     cat: 'Elemental', mods: [1.0,  1.0,  0.5,  1.0,  1.75, 1.5,  1.0,  1.0,  1.5,  0.5,  0.75] },
  { name: 'Blast',     cat: 'Combined',  mods: [1.0,  0.75, 0.75, 1.75, 1.0,  1.0,  1.0,  1.5,  1.75, 0.5,  1.75] },
  { name: 'Magnetic',  cat: 'Combined',  mods: [0.75, 1.0,  0.5,  1.75, 1.75, 0.75, 1.0,  0.5,  0.75, 0.75, 0.75] },
  { name: 'Corrosive', cat: 'Combined',  mods: [1.0,  1.75, 1.0,  0.5,  0.5,  1.0,  1.0,  1.0,  1.75, 1.5,  1.0 ] },
  { name: 'Gas',       cat: 'Combined',  mods: [0.75, 0.5,  0.5,  1.0,  1.0,  1.75, 0.75, 1.5,  0.5,  0.75, 0.5 ] },
  { name: 'Radiation', cat: 'Combined',  mods: [0.75, 1.75, 1.75, 0.75, 0.5,  0.75, 1.25, 0.5,  0.5,  0.75, 0.75] },
  { name: 'Viral',     cat: 'Combined',  mods: [1.75, 0.5,  0.5,  0.75, 0.75, 1.75, 1.0,  1.0,  0.5,  0.5,  0.5 ] },
  { name: 'Void',      cat: 'Special',   mods: [1.0,  1.0,  1.0,  1.0,  1.0,  1.0,  1.0,  1.0,  1.0,  1.0,  1.0 ] },
  { name: 'True',      cat: 'Special',   mods: [1.0,  1.0,  1.0,  1.0,  1.0,  1.0,  1.0,  1.0,  1.0,  1.0,  1.0 ] },
];

export interface StatusRow {
  readonly name: string;
  readonly effect: string;
}

export const STATUS_PROCS: readonly StatusRow[] = [
  { name: 'Impact',    effect: 'Knockback -- staggers the enemy; successive procs increase the knockback force.' },
  { name: 'Puncture',  effect: 'Weakened -- reduces enemy damage output by 30% for 6 seconds.' },
  { name: 'Slash',     effect: 'Bleeding -- deals a damage over time tick equal to 35% of the hit that triggered it, bypasses armor.' },
  { name: 'Heat',      effect: 'Ignited -- DoT that deals Heat damage over 6 seconds; also reduces enemy armor by 50%.' },
  { name: 'Cold',      effect: 'Frozen -- slows movement and attack speed by 50%; at max stacks enemies are frozen solid; reduces critical damage on afflicted enemies.' },
  { name: 'Electric',  effect: 'Shocked -- chains electricity to nearby enemies within 5 m; all targets in the chain take Electric damage.' },
  { name: 'Toxin',     effect: 'Poisoned -- DoT that deals Toxin damage over 6 seconds; bypasses shields completely.' },
  { name: 'Blast',     effect: 'Knocked down -- launches enemies off their feet; breaks limbs on Grineer-type enemies.' },
  { name: 'Magnetic',  effect: 'Magnetized -- creates a field that draws in projectiles and explosions; drains enemy shields at max stacks.' },
  { name: 'Corrosive', effect: 'Corroded -- permanently reduces enemy armor by 26% per stack, up to 80% total at max (10) stacks.' },
  { name: 'Gas',       effect: 'Gassed -- releases a cloud dealing Toxin DoT to all enemies within 3 m for 8 seconds.' },
  { name: 'Radiation', effect: 'Confused -- forces affected enemy to attack allies for 12 seconds.' },
  { name: 'Viral',     effect: "Infected -- reduces the enemy's maximum health by 50% per stack (up to 325% more effective at max 10 stacks), doubling all damage taken to health." },
  { name: 'Void',      effect: 'Nullified -- removes Sentient damage resistances for 5 seconds; standard enemies are unaffected by a status proc.' },
  { name: 'True',      effect: 'No status proc -- True damage bypasses all damage type interactions and resistance calculations.' },
];

export interface ComboRow {
  readonly result: string;
  readonly components: readonly string[];
  readonly note: string;
}

export const COMBOS: readonly ComboRow[] = [
  { result: 'Blast',     components: ['Heat', 'Cold'],      note: 'AoE knockdown; strong vs Grineer machinery and Corpus robotic units.' },
  { result: 'Magnetic',  components: ['Cold', 'Electric'],  note: 'Shield drain and strip; best vs Corpus shield-heavy units.' },
  { result: 'Corrosive', components: ['Electric', 'Toxin'], note: 'Permanent armor reduction; mandatory for high-level Grineer and Fossilized Infested.' },
  { result: 'Gas',       components: ['Heat', 'Toxin'],     note: 'Toxin cloud AoE; excels vs densely packed Corpus flesh units.' },
  { result: 'Radiation', components: ['Heat', 'Electric'],  note: 'Enemy confusion and Alloy Armor bonus; effective vs Grineer and Sentients.' },
  { result: 'Viral',     components: ['Cold', 'Toxin'],     note: 'Health penalty; universally strong vs all non-Infested factions at high stacks.' },
];

export interface FactionRow {
  readonly name: string;
  readonly href: string;
  readonly types: readonly string[];
  readonly notes: string;
}

export const FACTIONS: readonly FactionRow[] = [
  {
    name: 'Grineer',
    href: 'grineer',
    types: ['Corrosive', 'Viral', 'Slash', 'Radiation'],
    notes: 'Grineer rely on Cloned Flesh and Ferrite or Alloy Armor. Strip armor with Corrosive or Heat first, then amplify with Viral or Slash bleed. Radiation confuses heavy units.',
  },
  {
    name: 'Corpus',
    href: 'corpus',
    types: ['Magnetic', 'Viral', 'Toxin', 'Electric'],
    notes: 'Corpus use Shield or Proto Shield plus Flesh and Robotic health. Magnetic drains shields. Toxin bypasses shields entirely to hit Flesh. Viral amplifies damage on exposed flesh.',
  },
  {
    name: 'Infested',
    href: 'infested',
    types: ['Heat', 'Slash', 'Corrosive', 'Gas'],
    notes: 'Infested have Infested Flesh and Fossilized health. Heat and Slash are universally strong. Corrosive strips Fossilized armor. Gas clouds devastate dense Infested groups.',
  },
  {
    name: 'Sentient',
    href: 'sentients',
    types: ['Void', 'Radiation', 'Tau'],
    notes: 'Sentients adapt to damage types over time, reducing incoming damage by up to 90%. Void damage from Operator Amps bypasses and removes their resistances. Radiation confuses Sentient units.',
  },
  {
    name: 'Murmur',
    href: 'murmur',
    types: ['Slash', 'Viral', 'Corrosive'],
    notes: 'Murmur enemies appear in The Duviri Paradox. They share health types with common Grineer and Corpus archetypes -- apply armor-stripping and Viral for consistent damage.',
  },
];
