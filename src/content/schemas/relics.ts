import { z } from 'astro:content';
import { isoDateLike, sourceSchema } from './shared';

export const relicEraSchema = z.enum(['lith', 'meso', 'neo', 'axi', 'requiem']);

export const relicDropSchema = z.object({
  item: z.string().min(1),
  rarity: z.enum(['common', 'uncommon', 'rare']),
});

export const refinementCostSchema = z.object({
  intact: z.number().int().nonnegative(),
  exceptional: z.number().int().nonnegative(),
  flawless: z.number().int().nonnegative(),
  radiant: z.number().int().nonnegative(),
});

export const notableRelicSchema = z.object({
  name: z.string().min(1),
  drop: z.string().min(1),
  dropRarity: z.string().min(1),
  dropChanceRadiant: z.string().min(1),
});

export const relicSchema = z.object({
  name: z.string().min(1),
  era_letter: relicEraSchema,
  description: z.string().min(1),
  total_relics: z.number().int().positive(),
  drop_systems: z.array(z.string()).min(1),
  refinement_costs: refinementCostSchema,
  notable_relics: z.array(notableRelicSchema).default([]),
  sources: z.array(sourceSchema).min(2),
  updatedAt: isoDateLike,
});
