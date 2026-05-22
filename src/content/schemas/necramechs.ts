import { z } from 'astro:content';
import { acquisitionSchema, isoDateLike, sourceSchema } from './shared';

const numOrUnknown = z.union([z.number(), z.literal('unknown')]);

export const necramechAbilitySchema = z.object({
  name: z.string().min(1),
  key: z.enum(['1', '2', '3', '4']),
  description: z.string().min(1),
});

export const necramechIntrinsicsSchema = z.object({
  gunnery: z.number().int().min(0).max(10),
  piloting: z.number().int().min(0).max(10),
  engineering: z.number().int().min(0).max(10),
  tactical: z.number().int().min(0).max(10),
  command: z.number().int().min(0).max(10),
});

export const necramechSchema = z.object({
  name: z.string().min(1),
  masteryRank: z.number().int().min(0).max(30),
  health: numOrUnknown,
  shield: numOrUnknown,
  armor: numOrUnknown,
  energy: numOrUnknown,
  abilities: z.array(necramechAbilitySchema).min(1).max(4),
  weapons_compatible: z.array(z.string()).default([]),
  intrinsics: necramechIntrinsicsSchema,
  acquisition: acquisitionSchema,
  sources: z.array(sourceSchema).min(2),
  updatedAt: isoDateLike,
});
