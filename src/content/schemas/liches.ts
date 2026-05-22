import { z } from 'astro:content';
import { isoDateLike, sourceSchema } from './shared';

export const lichTypeSchema = z.enum(['kuva', 'sister']);

export const elementSchema = z.enum([
  'heat',
  'cold',
  'electric',
  'toxin',
  'impact',
  'magnetic',
  'radiation',
  'viral',
]);

export const requiemPatternSchema = z.tuple([
  z.string().min(1),
  z.string().min(1),
  z.string().min(1),
]);

export const lichAcquisitionSchema = z.object({
  converted_from: z.string().min(1),
  required_warframe: z.string().min(1),
  requiem_pattern: requiemPatternSchema,
});

export const lichSchema = z.object({
  name: z.string().min(1),
  lichType: lichTypeSchema,
  weaponSlug: z.string().optional(),
  element: elementSchema,
  acquisition: lichAcquisitionSchema,
  rewards: z.array(z.string()).default([]),
  sources: z.array(sourceSchema).min(2),
  updatedAt: isoDateLike,
});

export type LichEntry = z.infer<typeof lichSchema>;
