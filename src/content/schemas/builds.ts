import { z } from 'astro:content';
import { isoDateLike, slug, sourceSchema } from './shared';

export const buildModSlotSchema = z.object({
  slot: z.string().min(1),
  modSlug: slug,
  rank: z.number().int().min(0),
});

export const buildArcaneSlotSchema = z.object({
  slot: z.string().min(1),
  slug,
  rank: z.number().int().min(0),
});

export const buildSchema = z.object({
  name: z.string().min(1),
  forEntity: slug,
  entityType: z.enum(['warframe', 'weapon']),
  purpose: z.string().min(1),
  mods: z.array(buildModSlotSchema).min(1),
  arcanes: z.array(buildArcaneSlotSchema).optional(),
  focus: z.string().optional(),
  helminth: z.string().optional(),
  playstyle: z.string().min(1),
  strengths: z.array(z.string()).default([]),
  weaknesses: z.array(z.string()).default([]),
  sources: z.array(sourceSchema).min(2),
  updatedAt: isoDateLike,
});
