// modular-base-stats.ts -- base weapon stats and mastery requirements for modular builders.
// Sources:
//   https://warframe.fandom.com/wiki/Zaw (accessed 2026-05-20)
//   https://warframe.fandom.com/wiki/Kitgun (accessed 2026-05-20)

import type { ModularWeaponType, BaseStats, Recommendation } from './modular-types';

// Mastery rank requirements by weapon type.
export const MODULAR_MASTERY_REQ: Record<ModularWeaponType, number> = {
  zaw: 10,
  kitgun: 10,
  hound: 0,
  moa: 0,
};

// Base stats for each weapon type before part multipliers are applied.
export const BASE_STATS: Record<ModularWeaponType, BaseStats> = {
  zaw: {
    label: 'Zaw',
    damage: 250,
    fireRate: 0.9,
    critChance: 0.20,
    critMult: 2.0,
    statusChance: 0.20,
    range: 2.0,
    shield: 0,
    health: 0,
    armor: 0,
  },
  kitgun: {
    label: 'Kitgun',
    damage: 80,
    fireRate: 2.5,
    critChance: 0.22,
    critMult: 2.0,
    statusChance: 0.18,
    range: 30,
    shield: 0,
    health: 0,
    armor: 0,
  },
  hound: {
    label: 'Hound',
    damage: 0,
    fireRate: 0,
    critChance: 0,
    critMult: 0,
    statusChance: 0,
    range: 0,
    shield: 300,
    health: 500,
    armor: 50,
  },
  moa: {
    label: 'MOA',
    damage: 0,
    fireRate: 0,
    critChance: 0,
    critMult: 0,
    statusChance: 0,
    range: 0,
    shield: 250,
    health: 450,
    armor: 30,
  },
};

// Recommended polish and mod tips shown in the builder UI.
export const ZAW_POLISH_TIPS: readonly Recommendation[] = [
  { name: 'Sacrificial Steel', reason: 'Doubles critical chance -- essential for crit Zaw builds.' },
  { name: 'Blood Rush', reason: 'Multiplies crit chance with combo counter -- synergises with high-CC strikes.' },
  { name: 'Condition Overload', reason: 'Exponential damage per status type -- ideal for status-focused strikes like Cyath.' },
  { name: 'Organ Shatter', reason: 'Largest critical multiplier bonus available for melee.' },
];

export const KITGUN_MOD_TIPS: readonly Recommendation[] = [
  { name: 'Amalgam Barrel Diffusion', reason: 'Extra roll count amplifies damage per shot for Catchmoon and Tombfinger.' },
  { name: 'Primed Pistol Gambit', reason: 'High critical chance bonus -- pairs well with Tombfinger.' },
  { name: 'Galvanized Shot', reason: 'Stacking damage on status proc -- best with high status chambers like Gaze.' },
  { name: 'Primary Merciless', reason: 'Damage on kill -- applies to Kitguns used as primaries via Riven or grip.' },
];
