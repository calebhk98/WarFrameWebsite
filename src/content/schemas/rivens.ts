import { z } from 'astro:content';
import { isoDateLike, sourceSchema } from './shared';

export const rivenWeaponCategorySchema = z.enum([
  'rifle',
  'shotgun',
  'pistol',
  'melee',
]);

export const rivenSchema = z.object({
  name: z.string().min(1),
  weapon_target: z.string().min(1),
  weapon_category: rivenWeaponCategorySchema,
  disposition: z.number().min(0.5).max(1.55),
  notable_positive_combos: z.array(z.array(z.string()).min(1)).default([]),
  notable_negative_combos: z.array(z.string()).default([]),
  market_average_plat: z.number().nonnegative().nullable(),
  sources: z.array(sourceSchema).min(2),
  updatedAt: isoDateLike,
});
