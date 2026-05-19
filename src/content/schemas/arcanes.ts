import { z } from 'astro:content';
import {
  dropSchema,
  isoDateLike,
  perRankStatSchema,
  sourceSchema,
} from './shared';

export const arcaneTypeSchema = z.enum([
  'operator',
  'warframe',
  'weapon',
  'companion',
  'kitgun',
  'zaw',
  'melee',
  'other',
]);

export const arcaneSchema = z.object({
  name: z.string().min(1),
  type: arcaneTypeSchema,
  maxRank: z.number().int().min(0),
  effect: z.string().min(1),
  perRankStats: z.array(perRankStatSchema).default([]),
  drops: z.array(dropSchema).default([]),
  sources: z.array(sourceSchema).min(2),
  updatedAt: isoDateLike,
});
