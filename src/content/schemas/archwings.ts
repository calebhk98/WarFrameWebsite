import { z } from 'astro:content';
import { acquisitionSchema, isoDateLike, sourceSchema, statsRecordSchema } from './shared';

export const archwingTypeSchema = z.enum(['archwing', 'archgun', 'archmelee']);

const numOrUnknown = z.union([z.number(), z.literal('unknown')]);

export const archwingAbilitySchema = z.object({
  name: z.string().min(1),
  key: z.enum(['1', '2', '3', '4']),
  description: z.string().min(1),
  stats: statsRecordSchema.default({}),
});

export const archwingSchema = z.object({
  name: z.string().min(1),
  type: archwingTypeSchema,
  masteryRank: z.number().int().min(0).max(30),
  health: numOrUnknown,
  shield: numOrUnknown,
  armor: numOrUnknown,
  energy: numOrUnknown,
  abilities: z.array(archwingAbilitySchema).default([]),
  acquisition: acquisitionSchema,
  sources: z.array(sourceSchema).min(2),
  updatedAt: isoDateLike,
});
