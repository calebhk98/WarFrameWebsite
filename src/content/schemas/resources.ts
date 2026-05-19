import { z } from 'astro:content';
import { isoDateLike, sourceSchema } from './shared';

export const resourceTypeSchema = z.enum([
  'common',
  'uncommon',
  'rare',
  'component',
  'fish',
  'gem',
  'plant',
  'pigment',
  'currency',
  'other',
]);

export const resourceSchema = z.object({
  name: z.string().min(1),
  type: resourceTypeSchema,
  planets: z.array(z.string()).default([]),
  dropSources: z.array(z.string()).default([]),
  usedFor: z.array(z.string()).default([]),
  sources: z.array(sourceSchema).min(2),
  updatedAt: isoDateLike,
});
