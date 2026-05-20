import { z } from 'astro:content';
import { isoDateLike, sourceSchema } from './shared';

export const ampDamageTypeSchema = z.enum([
  'void',
  'heat',
  'cold',
  'electric',
  'toxin',
  'radiation',
  'corrosive',
]);

export const ampSchema = z.object({
  name: z.string().min(1),
  prism: z.string().min(1),
  scaffold: z.string().min(1),
  brace: z.string().min(1),
  damage_type: ampDamageTypeSchema,
  status: z.string().min(1),
  criticalChance: z.number().min(0),
  sources: z.array(sourceSchema).min(2),
  updatedAt: isoDateLike,
});
