// modular-hound.ts -- Hound companion part data for the Modular Builder.
// Source: https://warframe.fandom.com/wiki/Hound (accessed 2026-05-20)

import { buildMods } from './modular-types';
import type { ModularPart } from './modular-types';

export const HOUND_MODELS: readonly ModularPart[] = [
  {
    slug: 'hound-bhaira',
    name: 'Bhaira',
    weaponType: 'hound',
    partRole: 'model',
    masteryReq: 0,
    statModifiers: buildMods({ healthMult: 1.20, shieldMult: 0.90 }),
  },
  {
    slug: 'hound-dorrclave',
    name: 'Dorrclave',
    weaponType: 'hound',
    partRole: 'model',
    masteryReq: 0,
    statModifiers: buildMods({ armorMult: 1.15, healthMult: 1.05 }),
  },
  {
    slug: 'hound-hec',
    name: 'Hec',
    weaponType: 'hound',
    partRole: 'model',
    masteryReq: 0,
    statModifiers: buildMods({ shieldMult: 1.30, armorMult: 0.90 }),
  },
  {
    slug: 'hound-sentry',
    name: 'Sentry',
    weaponType: 'hound',
    partRole: 'model',
    masteryReq: 0,
    statModifiers: buildMods({ healthMult: 1.10, shieldMult: 1.10 }),
  },
];

export const HOUND_BRACKETS: readonly ModularPart[] = [
  {
    slug: 'hound-adlet',
    name: 'Adlet',
    weaponType: 'hound',
    partRole: 'bracket',
    masteryReq: 0,
    statModifiers: buildMods({ armorMult: 1.20, healthMult: 0.95 }),
  },
  {
    slug: 'hound-lycath',
    name: 'Lycath',
    weaponType: 'hound',
    partRole: 'bracket',
    masteryReq: 0,
    statModifiers: buildMods({ healthMult: 1.15, armorMult: 1.05 }),
  },
  {
    slug: 'hound-niral',
    name: 'Niral',
    weaponType: 'hound',
    partRole: 'bracket',
    masteryReq: 0,
    statModifiers: buildMods({ shieldMult: 1.20, armorMult: 0.95 }),
  },
  {
    slug: 'hound-urga',
    name: 'Urga',
    weaponType: 'hound',
    partRole: 'bracket',
    masteryReq: 0,
    statModifiers: buildMods({ healthMult: 1.10, shieldMult: 1.10 }),
  },
];

export const HOUND_STABILIZERS: readonly ModularPart[] = [
  {
    slug: 'hound-glaukus',
    name: 'Glaukus',
    weaponType: 'hound',
    partRole: 'stabilizer',
    masteryReq: 0,
    statModifiers: buildMods({ armorMult: 1.10, healthMult: 1.05 }),
  },
  {
    slug: 'hound-mendix',
    name: 'Mendix',
    weaponType: 'hound',
    partRole: 'stabilizer',
    masteryReq: 0,
    statModifiers: buildMods({ healthMult: 1.20, shieldMult: 0.95 }),
  },
  {
    slug: 'hound-pawelo',
    name: 'Pawelo',
    weaponType: 'hound',
    partRole: 'stabilizer',
    masteryReq: 0,
    statModifiers: buildMods({ shieldMult: 1.20, healthMult: 0.95 }),
  },
  {
    slug: 'hound-rispah',
    name: 'Rispah',
    weaponType: 'hound',
    partRole: 'stabilizer',
    masteryReq: 0,
    statModifiers: buildMods({ armorMult: 1.15, shieldMult: 1.05 }),
  },
];
