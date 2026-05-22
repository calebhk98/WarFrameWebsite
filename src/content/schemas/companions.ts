import { z } from 'astro:content';
import { acquisitionSchema, isoDateLike, sourceSchema } from './shared';

export const companionTypeSchema = z.enum([
  'sentinel',
  'kubrow',
  'kavat',
  'vulpaphyla',
  'predasite',
  'moa',
  'hound',
  'infested-companion',
]);

const numOrUnknown = z.union([z.number(), z.literal('unknown')]);

export const companionAbilitySchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  isPassive: z.boolean().default(false),
});

export const companionSchema = z.object({
  name: z.string().min(1),
  type: companionTypeSchema,
  masteryRank: z.number().int().min(0).max(30),
  health: numOrUnknown,
  shield: numOrUnknown,
  armor: numOrUnknown,
  energy: numOrUnknown,
  abilities: z.array(companionAbilitySchema).default([]),
  modSlots: z.array(z.string()).default([]),
  preceptWeapon: z.string().optional(),
  acquisition: acquisitionSchema,
  sources: z.array(sourceSchema).min(2),
  updatedAt: isoDateLike,
});
