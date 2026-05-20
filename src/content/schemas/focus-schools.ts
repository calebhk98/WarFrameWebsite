import { z } from 'astro:content';
import { isoDateLike, slug, sourceSchema } from './shared';

export const focusNodeTypeSchema = z.enum(['Active', 'Passive']);

export const focusNodeSchema = z.object({
  name: z.string().min(1),
  type: focusNodeTypeSchema,
  description: z.string().min(1),
  cost: z.number().int().nonnegative(),
});

export const focusWayboundSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
});

export const focusElementSchema = z.enum([
  'heat',
  'cold',
  'electric',
  'toxin',
  'void',
  'none',
]);

export const focusSchoolSchema = z.object({
  slug,
  name: z.string().min(1),
  element: focusElementSchema,
  waybounds: z.array(focusWayboundSchema).default([]),
  nodes: z.array(focusNodeSchema).min(1),
  playstyle: z.string().min(1),
  recommended_warframes: z.array(z.string()).default([]),
  sources: z.array(sourceSchema).min(2),
  updatedAt: isoDateLike,
});
