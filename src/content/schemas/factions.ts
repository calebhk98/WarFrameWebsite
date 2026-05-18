import { z } from 'astro:content';
import { isoDateLike, slug, sourceSchema, statsRecordSchema } from './shared';

export const factionSchema = z.object({
  slug,
  name: z.string().min(1),
  units: z.array(z.string()).default([]),
  weakness: statsRecordSchema.default({}),
  resistance: statsRecordSchema.default({}),
  locations: z.array(z.string()).default([]),
  sources: z.array(sourceSchema).min(2),
  updatedAt: isoDateLike,
});
