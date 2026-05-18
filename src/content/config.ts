import { defineCollection } from 'astro:content';

import { arcaneSchema } from './schemas/arcanes';
import { buildSchema } from './schemas/builds';
import { factionSchema } from './schemas/factions';
import { guideSchema } from './schemas/guides';
import { missionSchema } from './schemas/missions';
import { modSchema } from './schemas/mods';
import { questSchema } from './schemas/quests';
import { relicSchema } from './schemas/relics';
import { resourceSchema } from './schemas/resources';
import { syndicateSchema } from './schemas/syndicates';
import { warframeSchema } from './schemas/warframes';
import { weaponSchema } from './schemas/weapons';

// Re-export every named schema and shared helper so downstream callers
// (e.g. `scripts/verify-content.ts`) have a single import surface.
export * from './schemas/shared';
export * from './schemas/arcanes';
export * from './schemas/builds';
export * from './schemas/factions';
export * from './schemas/guides';
export * from './schemas/missions';
export * from './schemas/mods';
export * from './schemas/quests';
export * from './schemas/relics';
export * from './schemas/resources';
export * from './schemas/syndicates';
export * from './schemas/warframes';
export * from './schemas/weapons';

export const collections = {
  warframes: defineCollection({ type: 'content', schema: warframeSchema }),
  weapons: defineCollection({ type: 'content', schema: weaponSchema }),
  mods: defineCollection({ type: 'content', schema: modSchema }),
  quests: defineCollection({ type: 'content', schema: questSchema }),
  factions: defineCollection({ type: 'content', schema: factionSchema }),
  syndicates: defineCollection({ type: 'content', schema: syndicateSchema }),
  relics: defineCollection({ type: 'content', schema: relicSchema }),
  arcanes: defineCollection({ type: 'content', schema: arcaneSchema }),
  missions: defineCollection({ type: 'content', schema: missionSchema }),
  resources: defineCollection({ type: 'content', schema: resourceSchema }),
  builds: defineCollection({ type: 'content', schema: buildSchema }),
  guides: defineCollection({ type: 'content', schema: guideSchema }),
};
