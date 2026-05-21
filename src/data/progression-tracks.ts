// progression-tracks.ts -- public re-export surface for the MR progression data.
// Consumers import from this file; the underlying data lives in focused modules:
//   progression-types.ts    -- shared TypeScript interfaces
//   progression-mr-0-10.ts  -- TRACKS_MR_0_10
//   progression-mr-11-20.ts -- TRACKS_MR_11_20
//   progression-mr-21-30.ts -- TRACKS_MR_21_30

export type { RecommendationItem, RecommendationSection, MilestoneNote, ProgressionTrack } from './progression-types';

import { TRACKS_MR_0_10 } from './progression-mr-0-10';
import { TRACKS_MR_11_20 } from './progression-mr-11-20';
import { TRACKS_MR_21_30 } from './progression-mr-21-30';
import type { ProgressionTrack } from './progression-types';

export const progressionTracks: readonly ProgressionTrack[] = [
  ...TRACKS_MR_0_10,
  ...TRACKS_MR_11_20,
  ...TRACKS_MR_21_30,
];
