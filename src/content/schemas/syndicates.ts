import { z } from 'astro:content';
import { isoDateLike, slug, sourceSchema } from './shared';

export const syndicateTypeSchema = z.enum(['open-world', 'standing', 'other']);

export const syndicateTierSchema = z.object({
  tier: z.string().min(1),
  offerings: z.array(z.string()).default([]),
});

export const syndicateSchema = z.object({
  slug,
  name: z.string().min(1),
  type: syndicateTypeSchema,
  faction: z.string().optional(),
  rewards: z.array(syndicateTierSchema).default([]),
  dailyCap: z.number().int().nonnegative().optional(),
  sources: z.array(sourceSchema).min(2),
  updatedAt: isoDateLike,
});
