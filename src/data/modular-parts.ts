// modular-parts.ts -- public re-export surface for the Modular Builder data.
// Consumers import from this file; the underlying data lives in focused modules:
//   modular-types.ts      -- shared TypeScript interfaces, buildMods()
//   modular-zaw.ts        -- ZAW_STRIKES, ZAW_GRIPS, ZAW_LINKS
//   modular-kitgun.ts     -- KITGUN_CHAMBERS, KITGUN_GRIPS, KITGUN_LOADERS
//   modular-hound.ts      -- HOUND_MODELS, HOUND_BRACKETS, HOUND_STABILIZERS
//   modular-moa.ts        -- MOA_MODELS, MOA_CORES, MOA_BRACES, MOA_GYROS
//   modular-base-stats.ts -- MODULAR_MASTERY_REQ, BASE_STATS, ZAW_POLISH_TIPS, KITGUN_MOD_TIPS

export type { ModularWeaponType, StatModifiers, ModularPart, BaseStats, Recommendation } from './modular-types';
export { buildMods } from './modular-types';
export { ZAW_STRIKES, ZAW_GRIPS, ZAW_LINKS } from './modular-zaw';
export { KITGUN_CHAMBERS, KITGUN_GRIPS, KITGUN_LOADERS } from './modular-kitgun';
export { HOUND_MODELS, HOUND_BRACKETS, HOUND_STABILIZERS } from './modular-hound';
export { MOA_MODELS, MOA_CORES, MOA_BRACES, MOA_GYROS } from './modular-moa';
export { MODULAR_MASTERY_REQ, BASE_STATS, ZAW_POLISH_TIPS, KITGUN_MOD_TIPS } from './modular-base-stats';
