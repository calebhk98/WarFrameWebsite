// dojo-rooms.ts -- public re-export surface for the Dojo Planner data.
// Consumers import from this file; the underlying data lives in focused modules:
//   dojo-types.ts         -- shared TypeScript interfaces
//   dojo-room-data.ts     -- DOJO_ROOMS
//   dojo-research-data.ts -- RESEARCH_ITEMS

export type { RoomCategory, ResourceCost, DojoRoom, ResearchItem } from './dojo-types';
export { DOJO_ROOMS } from './dojo-room-data';
export { RESEARCH_ITEMS } from './dojo-research-data';

export const CLAN_TIERS = [
  { slug: 'ghost',    name: 'Ghost',    multiplier: 1,   maxMembers: 10   },
  { slug: 'shadow',   name: 'Shadow',   multiplier: 3,   maxMembers: 30   },
  { slug: 'storm',    name: 'Storm',    multiplier: 10,  maxMembers: 100  },
  { slug: 'mountain', name: 'Mountain', multiplier: 30,  maxMembers: 300  },
  { slug: 'moon',     name: 'Moon',     multiplier: 100, maxMembers: 1000 },
] as const;
