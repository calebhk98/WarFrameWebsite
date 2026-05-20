import { z } from 'astro:content';
import { isoDateLike, sourceSchema } from './shared';

export const openWorldSchema = z.object({
  name: z.string().min(1),
  location: z.string().min(1),
  faction_primary: z.string().min(1),
  syndicate_hub: z.string().min(1),
  features: z.array(z.string()).default([]),
  resources_unique: z.array(z.string()).default([]),
  cycle: z.string().nullable().default(null),
  level_range: z.object({
    min: z.number().int().nonnegative(),
    max: z.number().int().nonnegative(),
  }),
  quests_associated: z.array(z.string()).default([]),
  sources: z.array(sourceSchema).min(2),
  updatedAt: isoDateLike,
});
