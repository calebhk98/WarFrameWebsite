// modular-kitgun.ts -- Kitgun secondary weapon part data for the Modular Builder.
// Sources:
//   https://warframe.fandom.com/wiki/Kitgun (accessed 2026-05-20)
// Stat multipliers: additive bonuses applied to a base weapon profile.

import { buildMods } from './modular-types';
import type { ModularPart } from './modular-types';

export const KITGUN_CHAMBERS: readonly ModularPart[] = [
  {
    slug: 'catchmoon',
    name: 'Catchmoon',
    weaponType: 'kitgun',
    partRole: 'chamber',
    masteryReq: 0,
    statModifiers: buildMods({ damageMult: 1.20, statusChanceMult: 1.10, critChanceMult: 0.80 }),
  },
  {
    slug: 'tombfinger',
    name: 'Tombfinger',
    weaponType: 'kitgun',
    partRole: 'chamber',
    masteryReq: 0,
    statModifiers: buildMods({ critChanceMult: 1.30, critMultMult: 1.20, statusChanceMult: 0.80 }),
  },
  {
    slug: 'rattleguts',
    name: 'Rattleguts',
    weaponType: 'kitgun',
    partRole: 'chamber',
    masteryReq: 0,
    statModifiers: buildMods({ fireRateMult: 1.30, statusChanceMult: 1.15, damageMult: 0.85 }),
  },
  {
    slug: 'gaze',
    name: 'Gaze',
    weaponType: 'kitgun',
    partRole: 'chamber',
    masteryReq: 0,
    statModifiers: buildMods({ statusChanceMult: 1.40, critChanceMult: 1.10, damageMult: 0.90 }),
  },
  {
    slug: 'sporelacer',
    name: 'Sporelacer',
    weaponType: 'kitgun',
    partRole: 'chamber',
    masteryReq: 0,
    statModifiers: buildMods({ damageMult: 1.15, statusChanceMult: 1.20, fireRateMult: 0.90 }),
  },
];

export const KITGUN_GRIPS: readonly ModularPart[] = [
  {
    slug: 'haymaker',
    name: 'Haymaker',
    weaponType: 'kitgun',
    partRole: 'grip',
    masteryReq: 0,
    statModifiers: buildMods({ damageMult: 1.20, fireRateMult: 0.80 }),
  },
  {
    slug: 'lovetap',
    name: 'Lovetap',
    weaponType: 'kitgun',
    partRole: 'grip',
    masteryReq: 0,
    statModifiers: buildMods({ fireRateMult: 1.30, damageMult: 0.85 }),
  },
  {
    slug: 'steadyslam',
    name: 'Steadyslam',
    weaponType: 'kitgun',
    partRole: 'grip',
    masteryReq: 0,
    statModifiers: buildMods({ damageMult: 1.10, critChanceMult: 1.05 }),
  },
];

export const KITGUN_LOADERS: readonly ModularPart[] = [
  {
    slug: 'splat',
    name: 'Splat',
    weaponType: 'kitgun',
    partRole: 'loader',
    masteryReq: 0,
    statModifiers: buildMods({ statusChanceMult: 1.20, damageMult: 1.05 }),
  },
  {
    slug: 'killstream',
    name: 'Killstream',
    weaponType: 'kitgun',
    partRole: 'loader',
    masteryReq: 0,
    statModifiers: buildMods({ critChanceMult: 1.25, critMultMult: 1.10 }),
  },
  {
    slug: 'bashrack',
    name: 'Bashrack',
    weaponType: 'kitgun',
    partRole: 'loader',
    masteryReq: 0,
    statModifiers: buildMods({ damageMult: 1.15, statusChanceMult: 0.95 }),
  },
  {
    slug: 'zip',
    name: 'Zip',
    weaponType: 'kitgun',
    partRole: 'loader',
    masteryReq: 0,
    statModifiers: buildMods({ fireRateMult: 1.20, critChanceMult: 1.05 }),
  },
];
