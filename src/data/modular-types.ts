// modular-types.ts -- shared TypeScript interfaces for modular weapon builders.
// Used by modular-zaw.ts, modular-kitgun.ts, modular-companions.ts, and modular-base-stats.ts.

export type ModularWeaponType = 'zaw' | 'kitgun' | 'hound' | 'moa';

// Unified stat modifiers for all modular weapon categories.
// Not every field applies to every category -- unused fields default to 1.0.
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

export interface ModularPart {
  readonly slug: string;
  readonly name: string;
  readonly weaponType: ModularWeaponType;
  readonly partRole: string;
  readonly masteryReq: number;
  readonly statModifiers: StatModifiers;
}

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

export interface Recommendation {
  readonly name: string;
  readonly reason: string;
}

// Helper: build a StatModifiers object with defaults of 1.0, overridden by caller.
export function buildMods(overrides: Partial<StatModifiers>): StatModifiers {
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
