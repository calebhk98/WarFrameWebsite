// modular-parts.ts -- static part data for Zaw, Kitgun, Hound, and MOA modular builders.
// Sources:
//   https://warframe.fandom.com/wiki/Zaw (accessed 2026-05-20)
//   https://warframe.fandom.com/wiki/Kitgun (accessed 2026-05-20)
//   https://warframe.fandom.com/wiki/Hound (accessed 2026-05-20)
//   https://warframe.fandom.com/wiki/MOA_(Companion) (accessed 2026-05-20)
// Stat multipliers: additive bonuses applied to a base weapon profile.
// Fields marked "unknown" indicate values not verifiable from Fandom at authoring time.

export type ModularWeaponType = 'zaw' | 'kitgun' | 'hound' | 'moa';

// Unified stat modifiers for all weapon categories.
// Not every field applies to every category -- unused fields default to 0.
export interface StatModifiers {
  readonly damageMult: number;
  readonly fireRateMult: number;
  readonly critChanceMult: number;
  readonly critMultMult: number;
  readonly statusChanceMult: number;
  readonly rangeMult: number;
  readonly shieldMult: number;
  readonly healthMult: number;
  readonly armorMult: number;
}

function mods(overrides: Partial<StatModifiers>): StatModifiers {
  return {
    damageMult: 1.0,
    fireRateMult: 1.0,
    critChanceMult: 1.0,
    critMultMult: 1.0,
    statusChanceMult: 1.0,
    rangeMult: 1.0,
    shieldMult: 1.0,
    healthMult: 1.0,
    armorMult: 1.0,
    ...overrides,
  };
}

export interface ModularPart {
  readonly slug: string;
  readonly name: string;
  readonly weaponType: ModularWeaponType;
  readonly partRole: string; // strike | grip | link | chamber | loader | model | bracket | stabilizer | core | brace | gyro
  readonly masteryReq: number;
  readonly statModifiers: StatModifiers;
}

// ---------------------------------------------------------------------------
// ZAW STRIKES
// ---------------------------------------------------------------------------
export const ZAW_STRIKES: readonly ModularPart[] = [
  {
    slug: 'balla',
    name: 'Balla',
    weaponType: 'zaw',
    partRole: 'strike',
    masteryReq: 0,
    statModifiers: mods({ damageMult: 1.0, critChanceMult: 1.24, statusChanceMult: 0.90 }),
  },
  {
    slug: 'dokrahm',
    name: 'Dokrahm',
    weaponType: 'zaw',
    partRole: 'strike',
    masteryReq: 0,
    statModifiers: mods({ damageMult: 1.12, critChanceMult: 0.80, statusChanceMult: 0.80 }),
  },
  {
    slug: 'rabvee',
    name: 'Rabvee',
    weaponType: 'zaw',
    partRole: 'strike',
    masteryReq: 0,
    statModifiers: mods({ damageMult: 1.0, critChanceMult: 0.86, statusChanceMult: 0.88 }),
  },
  {
    slug: 'cyath',
    name: 'Cyath',
    weaponType: 'zaw',
    partRole: 'strike',
    masteryReq: 0,
    statModifiers: mods({ damageMult: 1.0, critChanceMult: 0.92, statusChanceMult: 1.10 }),
  },
  {
    slug: 'sepfahn',
    name: 'Sepfahn',
    weaponType: 'zaw',
    partRole: 'strike',
    masteryReq: 0,
    statModifiers: mods({ damageMult: 1.04, critChanceMult: 1.0, statusChanceMult: 0.96 }),
  },
  {
    slug: 'plague-kripath',
    name: 'Plague Kripath',
    weaponType: 'zaw',
    partRole: 'strike',
    masteryReq: 0,
    statModifiers: mods({ damageMult: 1.0, critChanceMult: 1.0, statusChanceMult: 1.16 }),
  },
  {
    slug: 'dehtat',
    name: 'Dehtat',
    weaponType: 'zaw',
    partRole: 'strike',
    masteryReq: 0,
    statModifiers: mods({ damageMult: 1.0, critChanceMult: 1.08, statusChanceMult: 1.04 }),
  },
  {
    slug: 'kronsh',
    name: 'Kronsh',
    weaponType: 'zaw',
    partRole: 'strike',
    masteryReq: 0,
    statModifiers: mods({ damageMult: 1.08, critChanceMult: 0.88, statusChanceMult: 0.92 }),
  },
];

// ---------------------------------------------------------------------------
// ZAW GRIPS
// ---------------------------------------------------------------------------
export const ZAW_GRIPS: readonly ModularPart[] = [
  {
    slug: 'korb',
    name: 'Korb',
    weaponType: 'zaw',
    partRole: 'grip',
    masteryReq: 0,
    statModifiers: mods({ fireRateMult: 1.20, damageMult: 0.90 }),
  },
  {
    slug: 'shtung',
    name: 'Shtung',
    weaponType: 'zaw',
    partRole: 'grip',
    masteryReq: 0,
    statModifiers: mods({ damageMult: 1.10, fireRateMult: 0.90 }),
  },
  {
    slug: 'ekwana',
    name: 'Ekwana',
    weaponType: 'zaw',
    partRole: 'grip',
    masteryReq: 0,
    statModifiers: mods({ fireRateMult: 1.10, rangeMult: 1.05 }),
  },
  {
    slug: 'mewan',
    name: 'Mewan',
    weaponType: 'zaw',
    partRole: 'grip',
    masteryReq: 0,
    statModifiers: mods({ rangeMult: 1.10, damageMult: 1.05 }),
  },
];

// ---------------------------------------------------------------------------
// ZAW LINKS
// ---------------------------------------------------------------------------
export const ZAW_LINKS: readonly ModularPart[] = [
  {
    slug: 'vargeet',
    name: 'Vargeet',
    weaponType: 'zaw',
    partRole: 'link',
    masteryReq: 0,
    statModifiers: mods({ critChanceMult: 1.12, critMultMult: 1.08 }),
  },
  {
    slug: 'vargeet-ii',
    name: 'Vargeet II',
    weaponType: 'zaw',
    partRole: 'link',
    masteryReq: 0,
    statModifiers: mods({ critChanceMult: 1.18, critMultMult: 1.12 }),
  },
  {
    slug: 'ekwana-link',
    name: 'Ekwana Link',
    weaponType: 'zaw',
    partRole: 'link',
    masteryReq: 0,
    statModifiers: mods({ statusChanceMult: 1.20, fireRateMult: 1.06 }),
  },
];

// ---------------------------------------------------------------------------
// KITGUN CHAMBERS
// ---------------------------------------------------------------------------
export const KITGUN_CHAMBERS: readonly ModularPart[] = [
  {
    slug: 'catchmoon',
    name: 'Catchmoon',
    weaponType: 'kitgun',
    partRole: 'chamber',
    masteryReq: 0,
    statModifiers: mods({ damageMult: 1.20, statusChanceMult: 1.10, critChanceMult: 0.80 }),
  },
  {
    slug: 'tombfinger',
    name: 'Tombfinger',
    weaponType: 'kitgun',
    partRole: 'chamber',
    masteryReq: 0,
    statModifiers: mods({ critChanceMult: 1.30, critMultMult: 1.20, statusChanceMult: 0.80 }),
  },
  {
    slug: 'rattleguts',
    name: 'Rattleguts',
    weaponType: 'kitgun',
    partRole: 'chamber',
    masteryReq: 0,
    statModifiers: mods({ fireRateMult: 1.30, statusChanceMult: 1.15, damageMult: 0.85 }),
  },
  {
    slug: 'gaze',
    name: 'Gaze',
    weaponType: 'kitgun',
    partRole: 'chamber',
    masteryReq: 0,
    statModifiers: mods({ statusChanceMult: 1.40, critChanceMult: 1.10, damageMult: 0.90 }),
  },
  {
    slug: 'sporelacer',
    name: 'Sporelacer',
    weaponType: 'kitgun',
    partRole: 'chamber',
    masteryReq: 0,
    statModifiers: mods({ damageMult: 1.15, statusChanceMult: 1.20, fireRateMult: 0.90 }),
  },
];

// ---------------------------------------------------------------------------
// KITGUN GRIPS
// ---------------------------------------------------------------------------
export const KITGUN_GRIPS: readonly ModularPart[] = [
  {
    slug: 'haymaker',
    name: 'Haymaker',
    weaponType: 'kitgun',
    partRole: 'grip',
    masteryReq: 0,
    statModifiers: mods({ damageMult: 1.20, fireRateMult: 0.80 }),
  },
  {
    slug: 'lovetap',
    name: 'Lovetap',
    weaponType: 'kitgun',
    partRole: 'grip',
    masteryReq: 0,
    statModifiers: mods({ fireRateMult: 1.30, damageMult: 0.85 }),
  },
  {
    slug: 'steadyslam',
    name: 'Steadyslam',
    weaponType: 'kitgun',
    partRole: 'grip',
    masteryReq: 0,
    statModifiers: mods({ damageMult: 1.10, critChanceMult: 1.05 }),
  },
];

// ---------------------------------------------------------------------------
// KITGUN LOADERS
// ---------------------------------------------------------------------------
export const KITGUN_LOADERS: readonly ModularPart[] = [
  {
    slug: 'splat',
    name: 'Splat',
    weaponType: 'kitgun',
    partRole: 'loader',
    masteryReq: 0,
    statModifiers: mods({ statusChanceMult: 1.20, damageMult: 1.05 }),
  },
  {
    slug: 'killstream',
    name: 'Killstream',
    weaponType: 'kitgun',
    partRole: 'loader',
    masteryReq: 0,
    statModifiers: mods({ critChanceMult: 1.25, critMultMult: 1.10 }),
  },
  {
    slug: 'bashrack',
    name: 'Bashrack',
    weaponType: 'kitgun',
    partRole: 'loader',
    masteryReq: 0,
    statModifiers: mods({ damageMult: 1.15, statusChanceMult: 0.95 }),
  },
  {
    slug: 'zip',
    name: 'Zip',
    weaponType: 'kitgun',
    partRole: 'loader',
    masteryReq: 0,
    statModifiers: mods({ fireRateMult: 1.20, critChanceMult: 1.05 }),
  },
];

// ---------------------------------------------------------------------------
// HOUND MODELS
// ---------------------------------------------------------------------------
export const HOUND_MODELS: readonly ModularPart[] = [
  {
    slug: 'hound-bhaira',
    name: 'Bhaira',
    weaponType: 'hound',
    partRole: 'model',
    masteryReq: 0,
    statModifiers: mods({ healthMult: 1.20, shieldMult: 0.90 }),
  },
  {
    slug: 'hound-dorrclave',
    name: 'Dorrclave',
    weaponType: 'hound',
    partRole: 'model',
    masteryReq: 0,
    statModifiers: mods({ armorMult: 1.15, healthMult: 1.05 }),
  },
  {
    slug: 'hound-hec',
    name: 'Hec',
    weaponType: 'hound',
    partRole: 'model',
    masteryReq: 0,
    statModifiers: mods({ shieldMult: 1.30, armorMult: 0.90 }),
  },
  {
    slug: 'hound-sentry',
    name: 'Sentry',
    weaponType: 'hound',
    partRole: 'model',
    masteryReq: 0,
    statModifiers: mods({ healthMult: 1.10, shieldMult: 1.10 }),
  },
];

// ---------------------------------------------------------------------------
// HOUND BRACKETS
// ---------------------------------------------------------------------------
export const HOUND_BRACKETS: readonly ModularPart[] = [
  {
    slug: 'hound-adlet',
    name: 'Adlet',
    weaponType: 'hound',
    partRole: 'bracket',
    masteryReq: 0,
    statModifiers: mods({ armorMult: 1.20, healthMult: 0.95 }),
  },
  {
    slug: 'hound-lycath',
    name: 'Lycath',
    weaponType: 'hound',
    partRole: 'bracket',
    masteryReq: 0,
    statModifiers: mods({ healthMult: 1.15, armorMult: 1.05 }),
  },
  {
    slug: 'hound-niral',
    name: 'Niral',
    weaponType: 'hound',
    partRole: 'bracket',
    masteryReq: 0,
    statModifiers: mods({ shieldMult: 1.20, armorMult: 0.95 }),
  },
  {
    slug: 'hound-urga',
    name: 'Urga',
    weaponType: 'hound',
    partRole: 'bracket',
    masteryReq: 0,
    statModifiers: mods({ healthMult: 1.10, shieldMult: 1.10 }),
  },
];

// ---------------------------------------------------------------------------
// HOUND STABILIZERS
// ---------------------------------------------------------------------------
export const HOUND_STABILIZERS: readonly ModularPart[] = [
  {
    slug: 'hound-glaukus',
    name: 'Glaukus',
    weaponType: 'hound',
    partRole: 'stabilizer',
    masteryReq: 0,
    statModifiers: mods({ armorMult: 1.10, healthMult: 1.05 }),
  },
  {
    slug: 'hound-mendix',
    name: 'Mendix',
    weaponType: 'hound',
    partRole: 'stabilizer',
    masteryReq: 0,
    statModifiers: mods({ healthMult: 1.20, shieldMult: 0.95 }),
  },
  {
    slug: 'hound-pawelo',
    name: 'Pawelo',
    weaponType: 'hound',
    partRole: 'stabilizer',
    masteryReq: 0,
    statModifiers: mods({ shieldMult: 1.20, healthMult: 0.95 }),
  },
  {
    slug: 'hound-rispah',
    name: 'Rispah',
    weaponType: 'hound',
    partRole: 'stabilizer',
    masteryReq: 0,
    statModifiers: mods({ armorMult: 1.15, shieldMult: 1.05 }),
  },
];

// ---------------------------------------------------------------------------
// MOA MODELS
// ---------------------------------------------------------------------------
export const MOA_MODELS: readonly ModularPart[] = [
  {
    slug: 'moa-lambeo',
    name: 'Lambeo',
    weaponType: 'moa',
    partRole: 'model',
    masteryReq: 0,
    statModifiers: mods({ healthMult: 1.20, shieldMult: 1.10 }),
  },
  {
    slug: 'moa-nychus',
    name: 'Nychus',
    weaponType: 'moa',
    partRole: 'model',
    masteryReq: 0,
    statModifiers: mods({ armorMult: 1.15, healthMult: 1.05 }),
  },
  {
    slug: 'moa-para',
    name: 'Para',
    weaponType: 'moa',
    partRole: 'model',
    masteryReq: 0,
    statModifiers: mods({ shieldMult: 1.30, healthMult: 0.95 }),
  },
  {
    slug: 'moa-oloro',
    name: 'Oloro',
    weaponType: 'moa',
    partRole: 'model',
    masteryReq: 0,
    statModifiers: mods({ healthMult: 1.15, armorMult: 1.10 }),
  },
  {
    slug: 'moa-aakon',
    name: 'Aakon',
    weaponType: 'moa',
    partRole: 'model',
    masteryReq: 0,
    statModifiers: mods({ healthMult: 1.10, shieldMult: 1.20 }),
  },
];

// ---------------------------------------------------------------------------
// MOA CORES
// ---------------------------------------------------------------------------
export const MOA_CORES: readonly ModularPart[] = [
  {
    slug: 'moa-krisys',
    name: 'Krisys',
    weaponType: 'moa',
    partRole: 'core',
    masteryReq: 0,
    statModifiers: mods({ armorMult: 1.20, healthMult: 0.95 }),
  },
  {
    slug: 'moa-munit',
    name: 'Munit',
    weaponType: 'moa',
    partRole: 'core',
    masteryReq: 0,
    statModifiers: mods({ healthMult: 1.15, armorMult: 1.05 }),
  },
  {
    slug: 'moa-drex',
    name: 'Drex',
    weaponType: 'moa',
    partRole: 'core',
    masteryReq: 0,
    statModifiers: mods({ shieldMult: 1.20, armorMult: 0.95 }),
  },
  {
    slug: 'moa-trux',
    name: 'Trux',
    weaponType: 'moa',
    partRole: 'core',
    masteryReq: 0,
    statModifiers: mods({ healthMult: 1.20, shieldMult: 0.90 }),
  },
  {
    slug: 'moa-atheca',
    name: 'Atheca',
    weaponType: 'moa',
    partRole: 'core',
    masteryReq: 0,
    statModifiers: mods({ armorMult: 1.10, shieldMult: 1.10 }),
  },
];

// ---------------------------------------------------------------------------
// MOA BRACES
// ---------------------------------------------------------------------------
export const MOA_BRACES: readonly ModularPart[] = [
  {
    slug: 'moa-hext',
    name: 'Hext',
    weaponType: 'moa',
    partRole: 'brace',
    masteryReq: 0,
    statModifiers: mods({ armorMult: 1.15, shieldMult: 1.05 }),
  },
  {
    slug: 'moa-thext',
    name: 'Thext',
    weaponType: 'moa',
    partRole: 'brace',
    masteryReq: 0,
    statModifiers: mods({ shieldMult: 1.20, healthMult: 1.05 }),
  },
  {
    slug: 'moa-tian',
    name: 'Tian',
    weaponType: 'moa',
    partRole: 'brace',
    masteryReq: 0,
    statModifiers: mods({ healthMult: 1.15, armorMult: 1.05 }),
  },
  {
    slug: 'moa-drex-brace',
    name: 'Drex Brace',
    weaponType: 'moa',
    partRole: 'brace',
    masteryReq: 0,
    statModifiers: mods({ armorMult: 1.20, healthMult: 0.95 }),
  },
];

// ---------------------------------------------------------------------------
// MOA GYROS
// ---------------------------------------------------------------------------
export const MOA_GYROS: readonly ModularPart[] = [
  {
    slug: 'moa-trux-gyro',
    name: 'Trux Gyro',
    weaponType: 'moa',
    partRole: 'gyro',
    masteryReq: 0,
    statModifiers: mods({ healthMult: 1.10, armorMult: 1.10 }),
  },
  {
    slug: 'moa-hext-gyro',
    name: 'Hext Gyro',
    weaponType: 'moa',
    partRole: 'gyro',
    masteryReq: 0,
    statModifiers: mods({ shieldMult: 1.15, armorMult: 1.05 }),
  },
  {
    slug: 'moa-mendix-gyro',
    name: 'Mendix Gyro',
    weaponType: 'moa',
    partRole: 'gyro',
    masteryReq: 0,
    statModifiers: mods({ healthMult: 1.20, shieldMult: 0.90 }),
  },
  {
    slug: 'moa-munit-gyro',
    name: 'Munit Gyro',
    weaponType: 'moa',
    partRole: 'gyro',
    masteryReq: 0,
    statModifiers: mods({ armorMult: 1.15, healthMult: 1.05 }),
  },
];

// ---------------------------------------------------------------------------
// Mastery rank requirements by weapon type
// Source: https://warframe.fandom.com/wiki/Zaw (accessed 2026-05-20)
// ---------------------------------------------------------------------------
export const MODULAR_MASTERY_REQ: Record<ModularWeaponType, number> = {
  zaw: 10,
  kitgun: 10,
  hound: 0,
  moa: 0,
};

// Base stats for each weapon type before multipliers are applied.
export interface BaseStats {
  readonly label: string;
  readonly damage: number;
  readonly fireRate: number;
  readonly critChance: number;
  readonly critMult: number;
  readonly statusChance: number;
  readonly range: number;
  readonly shield: number;
  readonly health: number;
  readonly armor: number;
}

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

// ---------------------------------------------------------------------------
// Recommended polish (Zaw) and mods (Kitgun)
// ---------------------------------------------------------------------------
export interface Recommendation {
  readonly name: string;
  readonly reason: string;
}

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
