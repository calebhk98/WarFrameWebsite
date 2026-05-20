// riven-stats.ts -- canonical Riven mod stat pool data.
// Sources:
//   https://warframe.fandom.com/wiki/Riven_Mod (accessed 2026-05-20)
//   https://warframe.fandom.com/wiki/Riven_Mod/Weapon_Buffs (accessed 2026-05-20)
//
// Disposition scale: 0.5 (weak) to 1.55 (strong), in 0.05 increments.
// positiveBase and negativeBase are the stat magnitude at disposition 1.0.
// Actual value = base * disposition * rollFactor
// rollFactor ranges ~0.9 to 1.1 (average) for a standard 2-positive roll.
// Formula source: Warframe community reverse-engineering; see Fandom Riven page.

export type WeaponCategory =
  | 'Rifle'
  | 'Shotgun'
  | 'Pistol'
  | 'Melee'
  | 'Sniper'
  | 'Bow'
  | 'Archgun';

export type RollQuality = 'god' | 'average' | 'bad';

export interface RivenStat {
  readonly key: string;
  readonly label: string;
  readonly positiveBase: number; // magnitude at disp 1.0, no prefix symbol needed
  readonly negativeBase: number; // magnitude at disp 1.0 when rolled as negative
  readonly unit: '%' | 'x' | 's' | 'm';
  readonly categories: readonly WeaponCategory[];
}

// Roll-quality factor ranges (applied symmetrically around 1.0).
// Source: Warframe Fandom Riven page -- observed stat variance.
export const ROLL_FACTOR: Record<RollQuality, { min: number; max: number }> = {
  god:     { min: 1.0,  max: 1.1 },
  average: { min: 0.9,  max: 1.1 },
  bad:     { min: 0.9,  max: 0.95 },
};

// Chance to get a negative stat on any given roll.
// Source: Warframe Fandom Riven page -- ~20% of rolls include a negative.
export const NEGATIVE_ROLL_CHANCE = 0.2;

// Kuva cost schedule per roll attempt (1st roll through 6th+).
// After 6 rolls the cost is capped at 3500 Kuva per roll.
// Source: Warframe Fandom Riven page -- Transmutation costs section.
export const KUVA_COST_SCHEDULE: readonly number[] = [900, 1000, 1200, 1750, 2500, 3500];

const ALL: readonly WeaponCategory[] = ['Rifle', 'Shotgun', 'Pistol', 'Melee', 'Sniper', 'Bow', 'Archgun'];
const RANGED: readonly WeaponCategory[] = ['Rifle', 'Shotgun', 'Pistol', 'Sniper', 'Bow', 'Archgun'];
const RANGED_NO_SHOTGUN: readonly WeaponCategory[] = ['Rifle', 'Pistol', 'Sniper', 'Bow', 'Archgun'];
const RIFLE_SNIPER_BOW: readonly WeaponCategory[] = ['Rifle', 'Sniper', 'Bow'];
const MELEE_ONLY: readonly WeaponCategory[] = ['Melee'];
const RANGED_EXCEPT_BOW: readonly WeaponCategory[] = ['Rifle', 'Shotgun', 'Pistol', 'Sniper', 'Archgun'];
const SNIPER_ONLY: readonly WeaponCategory[] = ['Sniper'];

export const RIVEN_STATS: readonly RivenStat[] = [
  { key: 'damage',         label: 'Damage',            positiveBase: 165,  negativeBase: 33,  unit: '%', categories: ALL },
  { key: 'multishot',      label: 'Multishot',         positiveBase: 120,  negativeBase: 60,  unit: '%', categories: RANGED },
  { key: 'crit-chance',    label: 'Critical Chance',   positiveBase: 150,  negativeBase: 60,  unit: '%', categories: ALL },
  { key: 'crit-damage',    label: 'Critical Damage',   positiveBase: 150,  negativeBase: 60,  unit: '%', categories: ALL },
  { key: 'status-chance',  label: 'Status Chance',     positiveBase: 90,   negativeBase: 60,  unit: '%', categories: ALL },
  { key: 'status-duration',label: 'Status Duration',   positiveBase: 90,   negativeBase: 60,  unit: '%', categories: ALL },
  { key: 'fire-rate',      label: 'Fire Rate / Attack Speed', positiveBase: 60, negativeBase: 60, unit: '%', categories: ALL },
  { key: 'reload',         label: 'Reload Speed',      positiveBase: 55,   negativeBase: 30,  unit: '%', categories: RANGED },
  { key: 'magazine',       label: 'Magazine Capacity', positiveBase: 55,   negativeBase: 30,  unit: '%', categories: RANGED },
  { key: 'punch-through',  label: 'Punch Through',     positiveBase: 1.2,  negativeBase: 0.6, unit: 'm', categories: RANGED },
  { key: 'recoil',         label: 'Recoil',            positiveBase: 60,   negativeBase: 60,  unit: '%', categories: RANGED_EXCEPT_BOW },
  { key: 'zoom',           label: 'Zoom',              positiveBase: 30,   negativeBase: 15,  unit: '%', categories: SNIPER_ONLY },
  { key: 'damage-toxin',   label: 'Toxin Damage',      positiveBase: 90,   negativeBase: 60,  unit: '%', categories: ALL },
  { key: 'damage-electric',label: 'Electric Damage',   positiveBase: 90,   negativeBase: 60,  unit: '%', categories: ALL },
  { key: 'damage-heat',    label: 'Heat Damage',       positiveBase: 90,   negativeBase: 60,  unit: '%', categories: ALL },
  { key: 'damage-cold',    label: 'Cold Damage',       positiveBase: 90,   negativeBase: 60,  unit: '%', categories: ALL },
  { key: 'damage-impact',  label: 'Impact Damage',     positiveBase: 90,   negativeBase: 60,  unit: '%', categories: ALL },
  { key: 'damage-puncture',label: 'Puncture Damage',   positiveBase: 90,   negativeBase: 60,  unit: '%', categories: ALL },
  { key: 'damage-slash',   label: 'Slash Damage',      positiveBase: 90,   negativeBase: 60,  unit: '%', categories: ALL },
  { key: 'range',          label: 'Range / Proj Speed',positiveBase: 60,   negativeBase: 30,  unit: '%', categories: RANGED_NO_SHOTGUN },
  { key: 'melee-range',    label: 'Melee Range',       positiveBase: 60,   negativeBase: 30,  unit: '%', categories: MELEE_ONLY },
  { key: 'combo-duration', label: 'Combo Duration',    positiveBase: 14,   negativeBase: 5,   unit: 's', categories: MELEE_ONLY },
  { key: 'combo-chance',   label: 'Combo Chance',      positiveBase: 60,   negativeBase: 30,  unit: '%', categories: MELEE_ONLY },
  { key: 'slide-attack',   label: 'Slide Attack',      positiveBase: 150,  negativeBase: 60,  unit: '%', categories: MELEE_ONLY },
  { key: 'heavy-attack',   label: 'Heavy Attack',      positiveBase: 150,  negativeBase: 60,  unit: '%', categories: MELEE_ONLY },
  { key: 'charged-shot',   label: 'Charged Shot',      positiveBase: 150,  negativeBase: 60,  unit: '%', categories: RIFLE_SNIPER_BOW },
  { key: 'ammo-max',       label: 'Ammo Maximum',      positiveBase: 55,   negativeBase: 30,  unit: '%', categories: RANGED },
  { key: 'ammo-efficiency',label: 'Ammo Efficiency',   positiveBase: 12,   negativeBase: 6,   unit: '%', categories: RANGED },
  { key: 'faction-grineer', label: 'Damage vs Grineer',positiveBase: 45,   negativeBase: 15,  unit: '%', categories: ALL },
  { key: 'faction-corpus', label: 'Damage vs Corpus',  positiveBase: 45,   negativeBase: 15,  unit: '%', categories: ALL },
  { key: 'faction-infested',label: 'Damage vs Infested',positiveBase: 45,  negativeBase: 15,  unit: '%', categories: ALL },
];

/** Return the stats eligible for the given weapon category. */
export function getEligibleStats(category: WeaponCategory): readonly RivenStat[] {
  return RIVEN_STATS.filter((s) => s.categories.includes(category));
}

/** Compute stat value given disposition, quality, and whether it is a positive roll. */
export function computeStatValue(params: {
  stat: RivenStat;
  disposition: number;
  quality: RollQuality;
  isPositive: boolean;
}): { min: number; max: number } {
  const { stat, disposition, quality, isPositive } = params;
  const base = isPositive ? stat.positiveBase : stat.negativeBase;
  const factor = ROLL_FACTOR[quality];
  const scale = base * disposition;
  return {
    min: Math.round(scale * factor.min * 10) / 10,
    max: Math.round(scale * factor.max * 10) / 10,
  };
}

/**
 * Probability of rolling exactly the two specified positive stat keys.
 * Uses combination formula: 1 / C(n, 2) where n = eligible stat count.
 */
export function calcTwoStatProb(eligibleCount: number): number {
  if (eligibleCount < 2) return 0;
  const combos = (eligibleCount * (eligibleCount - 1)) / 2;
  return 1 / combos;
}

/**
 * Expected Kuva to spend before hitting a target combo.
 * successProb = probability of success per roll.
 * Returns expected number of rolls and expected Kuva cost.
 */
export function calcExpectedKuva(successProb: number): { rolls: number; kuva: number } {
  if (successProb <= 0) return { rolls: 0, kuva: 0 };
  const expectedRolls = Math.ceil(1 / successProb);
  let kuva = 0;
  const capCost = KUVA_COST_SCHEDULE[KUVA_COST_SCHEDULE.length - 1] ?? 3500;
  for (let i = 0; i < expectedRolls; i++) {
    kuva += KUVA_COST_SCHEDULE[i] ?? capCost;
  }
  return { rolls: expectedRolls, kuva };
}
