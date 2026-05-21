// helminth-index.ts -- public re-export surface for the Helminth subsystem.
// Consumers import from this file; the underlying data lives in focused modules:
//   helminth-types.ts       -- shared TypeScript interfaces
//   helminth-costs.ts       -- HELMINTH_SUBSUME_COST
//   helminth-synergies.ts   -- SYNERGY_NOTES
//   helminth-data-a-m.ts    -- HELMINTH_DATA entries A-M
//   helminth-data-n-z.ts    -- HELMINTH_DATA entries N-Z

export type { HelminthAbility, HelminthEntry, HelminthResource, SynergyNote } from './helminth-types';
export { HELMINTH_SUBSUME_COST } from './helminth-costs';
export { SYNERGY_NOTES } from './helminth-synergies';
import { HELMINTH_DATA_A_M } from './helminth-data-a-m';
import { HELMINTH_DATA_N_Z } from './helminth-data-n-z';
import type { HelminthEntry } from './helminth-types';

export const HELMINTH_DATA: readonly HelminthEntry[] = [
  ...HELMINTH_DATA_A_M,
  ...HELMINTH_DATA_N_Z,
];

export function findHelminthEntry(slug: string): HelminthEntry | undefined {
  return HELMINTH_DATA.find((e) => e.slug === slug);
}

import { SYNERGY_NOTES } from './helminth-synergies';

export function findSynergyNotes(
  baseSlug: string,
  subsumeSlug: string,
): readonly string[] {
  const match = SYNERGY_NOTES.find(
    (s) => s.baseSlug === baseSlug && s.subsumeSlug === subsumeSlug,
  );
  return match?.notes ?? [];
}
