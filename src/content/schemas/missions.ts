import { z } from 'astro:content';
import { isoDateLike, sourceSchema } from './shared';

export const missionSchema = z.object({
  name: z.string().min(1),
  type: z.string().min(1),
  faction: z.string().min(1),
  location: z.string().min(1),
  levelRange: z.object({
    min: z.number().int().nonnegative(),
    max: z.number().int().nonnegative(),
  }),
  rewards: z.array(z.string()).default([]),
  notes: z.string().optional(),
  sources: z.array(sourceSchema).min(2),
  updatedAt: isoDateLike,
});
