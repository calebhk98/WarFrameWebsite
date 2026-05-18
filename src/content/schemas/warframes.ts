import { z } from 'astro:content';
import {
  acquisitionSchema,
  isoDateLike,
  primeVariantSchema,
  slug,
  sourceSchema,
  statsRecordSchema,
} from './shared';

export const abilitySchema = z.object({
  name: z.string().min(1),
  key: z.enum(['1', '2', '3', '4', 'passive']),
  energyCost: z.number().nonnegative(),
  description: z.string().min(1),
  stats: statsRecordSchema.default({}),
});

export const warframeSchema = z.object({
  slug,
  name: z.string().min(1),
  aliases: z.array(z.string()).default([]),
  masteryRank: z.number().int().min(0).max(30),
  health: z.number().nonnegative(),
  shield: z.number().nonnegative(),
  armor: z.number().nonnegative(),
  energy: z.number().nonnegative(),
  sprintSpeed: z.number().positive(),
  passive: z.object({
    name: z.string().min(1),
    description: z.string().min(1),
  }),
  abilities: z.array(abilitySchema).min(1).max(5),
  acquisition: acquisitionSchema,
  prime: primeVariantSchema,
  sources: z.array(sourceSchema).min(2),
  updatedAt: isoDateLike,
});
