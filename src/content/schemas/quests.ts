import { z } from 'astro:content';
import { isoDateLike, slug, sourceSchema } from './shared';

export const questStageSchema = z.object({
  name: z.string().min(1),
  objective: z.string().min(1),
  location: z.string().optional(),
});

export const questSchema = z.object({
  slug,
  name: z.string().min(1),
  prerequisites: z.array(z.string()).default([]),
  rewards: z.array(z.string()).default([]),
  stages: z.array(questStageSchema).min(1),
  lore: z.string().min(1),
  sources: z.array(sourceSchema).min(2),
  updatedAt: isoDateLike,
});
