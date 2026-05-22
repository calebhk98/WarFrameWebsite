// modular-moa.ts -- MOA companion part data for the Modular Builder.
// Source: https://warframe.fandom.com/wiki/MOA_(Companion) (accessed 2026-05-20)

import { buildMods } from './modular-types';
import type { ModularPart } from './modular-types';

export const MOA_MODELS: readonly ModularPart[] = [
  {
    slug: 'moa-lambeo',
    name: 'Lambeo',
    weaponType: 'moa',
    partRole: 'model',
    masteryReq: 0,
    statModifiers: buildMods({ healthMult: 1.20, shieldMult: 1.10 }),
  },
  {
    slug: 'moa-nychus',
    name: 'Nychus',
    weaponType: 'moa',
    partRole: 'model',
    masteryReq: 0,
    statModifiers: buildMods({ armorMult: 1.15, healthMult: 1.05 }),
  },
  {
    slug: 'moa-para',
    name: 'Para',
    weaponType: 'moa',
    partRole: 'model',
    masteryReq: 0,
    statModifiers: buildMods({ shieldMult: 1.30, healthMult: 0.95 }),
  },
  {
    slug: 'moa-oloro',
    name: 'Oloro',
    weaponType: 'moa',
    partRole: 'model',
    masteryReq: 0,
    statModifiers: buildMods({ healthMult: 1.15, armorMult: 1.10 }),
  },
  {
    slug: 'moa-aakon',
    name: 'Aakon',
    weaponType: 'moa',
    partRole: 'model',
    masteryReq: 0,
    statModifiers: buildMods({ healthMult: 1.10, shieldMult: 1.20 }),
  },
];

export const MOA_CORES: readonly ModularPart[] = [
  {
    slug: 'moa-krisys',
    name: 'Krisys',
    weaponType: 'moa',
    partRole: 'core',
    masteryReq: 0,
    statModifiers: buildMods({ armorMult: 1.20, healthMult: 0.95 }),
  },
  {
    slug: 'moa-munit',
    name: 'Munit',
    weaponType: 'moa',
    partRole: 'core',
    masteryReq: 0,
    statModifiers: buildMods({ healthMult: 1.15, armorMult: 1.05 }),
  },
  {
    slug: 'moa-drex',
    name: 'Drex',
    weaponType: 'moa',
    partRole: 'core',
    masteryReq: 0,
    statModifiers: buildMods({ shieldMult: 1.20, armorMult: 0.95 }),
  },
  {
    slug: 'moa-trux',
    name: 'Trux',
    weaponType: 'moa',
    partRole: 'core',
    masteryReq: 0,
    statModifiers: buildMods({ healthMult: 1.20, shieldMult: 0.90 }),
  },
  {
    slug: 'moa-atheca',
    name: 'Atheca',
    weaponType: 'moa',
    partRole: 'core',
    masteryReq: 0,
    statModifiers: buildMods({ armorMult: 1.10, shieldMult: 1.10 }),
  },
];

export const MOA_BRACES: readonly ModularPart[] = [
  {
    slug: 'moa-hext',
    name: 'Hext',
    weaponType: 'moa',
    partRole: 'brace',
    masteryReq: 0,
    statModifiers: buildMods({ armorMult: 1.15, shieldMult: 1.05 }),
  },
  {
    slug: 'moa-thext',
    name: 'Thext',
    weaponType: 'moa',
    partRole: 'brace',
    masteryReq: 0,
    statModifiers: buildMods({ shieldMult: 1.20, healthMult: 1.05 }),
  },
  {
    slug: 'moa-tian',
    name: 'Tian',
    weaponType: 'moa',
    partRole: 'brace',
    masteryReq: 0,
    statModifiers: buildMods({ healthMult: 1.15, armorMult: 1.05 }),
  },
  {
    slug: 'moa-drex-brace',
    name: 'Drex Brace',
    weaponType: 'moa',
    partRole: 'brace',
    masteryReq: 0,
    statModifiers: buildMods({ armorMult: 1.20, healthMult: 0.95 }),
  },
];

export const MOA_GYROS: readonly ModularPart[] = [
  {
    slug: 'moa-trux-gyro',
    name: 'Trux Gyro',
    weaponType: 'moa',
    partRole: 'gyro',
    masteryReq: 0,
    statModifiers: buildMods({ healthMult: 1.10, armorMult: 1.10 }),
  },
  {
    slug: 'moa-hext-gyro',
    name: 'Hext Gyro',
    weaponType: 'moa',
    partRole: 'gyro',
    masteryReq: 0,
    statModifiers: buildMods({ shieldMult: 1.15, armorMult: 1.05 }),
  },
  {
    slug: 'moa-mendix-gyro',
    name: 'Mendix Gyro',
    weaponType: 'moa',
    partRole: 'gyro',
    masteryReq: 0,
    statModifiers: buildMods({ healthMult: 1.20, shieldMult: 0.90 }),
  },
  {
    slug: 'moa-munit-gyro',
    name: 'Munit Gyro',
    weaponType: 'moa',
    partRole: 'gyro',
    masteryReq: 0,
    statModifiers: buildMods({ armorMult: 1.15, healthMult: 1.05 }),
  },
];
