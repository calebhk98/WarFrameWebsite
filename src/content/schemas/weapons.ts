import { z } from 'astro:content';
import {
  acquisitionSchema,
  isoDateLike,
  primeVariantSchema,
  slug,
  sourceSchema,
  statsRecordSchema,
} from './shared';

export const weaponTypeSchema = z.enum([
  'primary',
  'secondary',
  'melee',
  'arch-gun',
  'arch-melee',
]);

export const damageSchema = z.object({
  impact: z.number().nonnegative().default(0),
  puncture: z.number().nonnegative().default(0),
  slash: z.number().nonnegative().default(0),
  elemental: statsRecordSchema.default({}),
});

export const weaponSchema = z.object({
  slug,
  name: z.string().min(1),
  type: weaponTypeSchema,
  category: z.string().min(1),
  masteryRank: z.number().int().min(0).max(30),
  damage: damageSchema,
  criticalChance: z.number().min(0),
  criticalMultiplier: z.number().min(0),
  statusChance: z.number().min(0),
  fireRate: z.number().nonnegative().optional(),
  magazine: z.number().int().nonnegative().optional(),
  reload: z.number().nonnegative().optional(),
  accuracy: z.number().nonnegative().optional(),
  range: z.number().nonnegative().optional(),
  attackSpeed: z.number().nonnegative().optional(),
  acquisition: acquisitionSchema,
  prime: primeVariantSchema.optional(),
  sources: z.array(sourceSchema).min(2),
  updatedAt: isoDateLike,
});
