import { defineCollection } from 'astro:content';

import { ampSchema } from './schemas/amps';
import { arcaneSchema } from './schemas/arcanes';
import { archwingSchema } from './schemas/archwings';
import { buildSchema } from './schemas/builds';
import { companionSchema } from './schemas/companions';
import { conclaveSchema } from './schemas/conclave';
import { dojoSchema } from './schemas/dojo';
import { factionSchema } from './schemas/factions';
import { focusSchoolSchema } from './schemas/focus-schools';
import { guideSchema } from './schemas/guides';
import { lichSchema } from './schemas/liches';
import { necramechSchema } from './schemas/necramechs';
import { openWorldSchema } from './schemas/open-worlds';
import { missionSchema } from './schemas/missions';
import { modSchema } from './schemas/mods';
import { questSchema } from './schemas/quests';
import { railjackSchema } from './schemas/railjack';
import { relicSchema } from './schemas/relics';
import { resourceSchema } from './schemas/resources';
import { rivenSchema } from './schemas/rivens';
import { syndicateSchema } from './schemas/syndicates';
import { warframeSchema } from './schemas/warframes';
import { weaponSchema } from './schemas/weapons';

// Re-export every named schema and shared helper so downstream callers
// (e.g. `scripts/verify-content.ts`) have a single import surface.
export * from './schemas/shared';
export * from './schemas/amps';
export * from './schemas/arcanes';
export * from './schemas/archwings';
export * from './schemas/builds';
export * from './schemas/companions';
export * from './schemas/conclave';
export * from './schemas/dojo';
export * from './schemas/factions';
export * from './schemas/focus-schools';
export * from './schemas/guides';
export * from './schemas/liches';
export * from './schemas/necramechs';
export * from './schemas/open-worlds';
export * from './schemas/missions';
export * from './schemas/mods';
export * from './schemas/quests';
export * from './schemas/railjack';
export * from './schemas/relics';
export * from './schemas/resources';
export * from './schemas/rivens';
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
  'focus-schools': defineCollection({ type: 'content', schema: focusSchoolSchema }),
  amps: defineCollection({ type: 'content', schema: ampSchema }),
  archwings: defineCollection({ type: 'content', schema: archwingSchema }),
  companions: defineCollection({ type: 'content', schema: companionSchema }),
  conclave: defineCollection({ type: 'content', schema: conclaveSchema }),
  dojo: defineCollection({ type: 'content', schema: dojoSchema }),
  liches: defineCollection({ type: 'content', schema: lichSchema }),
  necramechs: defineCollection({ type: 'content', schema: necramechSchema }),
  'open-worlds': defineCollection({ type: 'content', schema: openWorldSchema }),
  railjack: defineCollection({ type: 'content', schema: railjackSchema }),
  rivens: defineCollection({ type: 'content', schema: rivenSchema }),
};
