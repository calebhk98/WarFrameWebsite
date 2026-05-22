// helminth-index.ts -- public re-export surface for the Helminth subsystem.
// Consumers import from this file; the underlying data lives in focused modules:
//   helminth-types.ts       -- shared TypeScript interfaces
//   helminth-costs.ts       -- HELMINTH_SUBSUME_COST
//   helminth-synergies.ts   -- SYNERGY_NOTES, findSynergyNotes
//   helminth-data-a-e.ts    -- Ash through Dante
//   helminth-data-f-h.ts    -- Ember through Harrow Prime
//   helminth-data-i-l.ts    -- Hildryn through Loki Prime
//   helminth-data-m.ts      -- Mag through Mirage Prime
//   helminth-data-n-r.ts    -- Nekros through Revenant Prime
//   helminth-data-r-v.ts    -- Rhino through Volt Prime
//   helminth-data-w-z.ts    -- Voruna through Zephyr Prime

export type { HelminthAbility, HelminthEntry, HelminthResource, SynergyNote } from './helminth-types';
export { HELMINTH_SUBSUME_COST } from './helminth-costs';
export { SYNERGY_NOTES, findSynergyNotes } from './helminth-synergies';

import { HELMINTH_DATA_A_E } from './helminth-data-a-e';
import { HELMINTH_DATA_F_H } from './helminth-data-f-h';
import { HELMINTH_DATA_I_L } from './helminth-data-i-l';
import { HELMINTH_DATA_M } from './helminth-data-m';
import { HELMINTH_DATA_N_R } from './helminth-data-n-r';
import { HELMINTH_DATA_R_V } from './helminth-data-r-v';
import { HELMINTH_DATA_W_Z } from './helminth-data-w-z';
import type { HelminthEntry } from './helminth-types';

export const HELMINTH_DATA: readonly HelminthEntry[] = [
  ...HELMINTH_DATA_A_E,
  ...HELMINTH_DATA_F_H,
  ...HELMINTH_DATA_I_L,
  ...HELMINTH_DATA_M,
  ...HELMINTH_DATA_N_R,
  ...HELMINTH_DATA_R_V,
  ...HELMINTH_DATA_W_Z,
];

export function findHelminthEntry(slug: string): HelminthEntry | undefined {
  return HELMINTH_DATA.find((e) => e.slug === slug);
}
