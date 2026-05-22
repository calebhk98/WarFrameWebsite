// modular-zaw.ts -- Zaw melee weapon part data for the Modular Builder.
// Sources:
//   https://warframe.fandom.com/wiki/Zaw (accessed 2026-05-20)
// Stat multipliers: additive bonuses applied to a base weapon profile.

import { buildMods } from './modular-types';
import type { ModularPart } from './modular-types';

export const ZAW_STRIKES: readonly ModularPart[] = [
  {
    slug: 'balla',
    name: 'Balla',
    weaponType: 'zaw',
    partRole: 'strike',
    masteryReq: 0,
    statModifiers: buildMods({ damageMult: 1.0, critChanceMult: 1.24, statusChanceMult: 0.90 }),
  },
  {
    slug: 'dokrahm',
    name: 'Dokrahm',
    weaponType: 'zaw',
    partRole: 'strike',
    masteryReq: 0,
    statModifiers: buildMods({ damageMult: 1.12, critChanceMult: 0.80, statusChanceMult: 0.80 }),
  },
  {
    slug: 'rabvee',
    name: 'Rabvee',
    weaponType: 'zaw',
    partRole: 'strike',
    masteryReq: 0,
    statModifiers: buildMods({ damageMult: 1.0, critChanceMult: 0.86, statusChanceMult: 0.88 }),
  },
  {
    slug: 'cyath',
    name: 'Cyath',
    weaponType: 'zaw',
    partRole: 'strike',
    masteryReq: 0,
    statModifiers: buildMods({ damageMult: 1.0, critChanceMult: 0.92, statusChanceMult: 1.10 }),
  },
  {
    slug: 'sepfahn',
    name: 'Sepfahn',
    weaponType: 'zaw',
    partRole: 'strike',
    masteryReq: 0,
    statModifiers: buildMods({ damageMult: 1.04, critChanceMult: 1.0, statusChanceMult: 0.96 }),
  },
  {
    slug: 'plague-kripath',
    name: 'Plague Kripath',
    weaponType: 'zaw',
    partRole: 'strike',
    masteryReq: 0,
    statModifiers: buildMods({ damageMult: 1.0, critChanceMult: 1.0, statusChanceMult: 1.16 }),
  },
  {
    slug: 'dehtat',
    name: 'Dehtat',
    weaponType: 'zaw',
    partRole: 'strike',
    masteryReq: 0,
    statModifiers: buildMods({ damageMult: 1.0, critChanceMult: 1.08, statusChanceMult: 1.04 }),
  },
  {
    slug: 'kronsh',
    name: 'Kronsh',
    weaponType: 'zaw',
    partRole: 'strike',
    masteryReq: 0,
    statModifiers: buildMods({ damageMult: 1.08, critChanceMult: 0.88, statusChanceMult: 0.92 }),
  },
];

export const ZAW_GRIPS: readonly ModularPart[] = [
  {
    slug: 'korb',
    name: 'Korb',
    weaponType: 'zaw',
    partRole: 'grip',
    masteryReq: 0,
    statModifiers: buildMods({ fireRateMult: 1.20, damageMult: 0.90 }),
  },
  {
    slug: 'shtung',
    name: 'Shtung',
    weaponType: 'zaw',
    partRole: 'grip',
    masteryReq: 0,
    statModifiers: buildMods({ damageMult: 1.10, fireRateMult: 0.90 }),
  },
  {
    slug: 'ekwana',
    name: 'Ekwana',
    weaponType: 'zaw',
    partRole: 'grip',
    masteryReq: 0,
    statModifiers: buildMods({ fireRateMult: 1.10, rangeMult: 1.05 }),
  },
  {
    slug: 'mewan',
    name: 'Mewan',
    weaponType: 'zaw',
    partRole: 'grip',
    masteryReq: 0,
    statModifiers: buildMods({ rangeMult: 1.10, damageMult: 1.05 }),
  },
];

export const ZAW_LINKS: readonly ModularPart[] = [
  {
    slug: 'vargeet',
    name: 'Vargeet',
    weaponType: 'zaw',
    partRole: 'link',
    masteryReq: 0,
    statModifiers: buildMods({ critChanceMult: 1.12, critMultMult: 1.08 }),
  },
  {
    slug: 'vargeet-ii',
    name: 'Vargeet II',
    weaponType: 'zaw',
    partRole: 'link',
    masteryReq: 0,
    statModifiers: buildMods({ critChanceMult: 1.18, critMultMult: 1.12 }),
  },
  {
    slug: 'ekwana-link',
    name: 'Ekwana Link',
    weaponType: 'zaw',
    partRole: 'link',
    masteryReq: 0,
    statModifiers: buildMods({ statusChanceMult: 1.20, fireRateMult: 1.06 }),
  },
];
