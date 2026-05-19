import { z } from 'astro:content';
import { isoDateLike, sourceSchema } from './shared';

export const relicEraSchema = z.enum(['lith', 'meso', 'neo', 'axi', 'requiem']);

export const relicDropSchema = z.object({
  item: z.string().min(1),
  rarity: z.enum(['common', 'uncommon', 'rare']),
});

export const refinementSchema = z.object({
  intact: z.array(relicDropSchema).default([]),
  exceptional: z.array(relicDropSchema).default([]),
  flawless: z.array(relicDropSchema).default([]),
  radiant: z.array(relicDropSchema).default([]),
});

export const relicSchema = z.object({
  name: z.string().min(1),
  era: relicEraSchema,
  drops: z.array(relicDropSchema).default([]),
  refinement: refinementSchema,
  sources: z.array(sourceSchema).min(2),
  updatedAt: isoDateLike,
});
