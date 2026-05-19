import { z } from 'astro:content';
import {
  dropSchema,
  isoDateLike,
  perRankStatSchema,
  raritySchema,
  sourceSchema,
} from './shared';

export const polaritySchema = z.enum([
  'madurai',
  'naramon',
  'vazarin',
  'zenurik',
  'unairu',
  'penjaga',
  'umbra',
  'exilus',
  'none',
]);

export const modTypeSchema = z.enum([
  'warframe',
  'primary',
  'secondary',
  'melee',
  'shotgun',
  'rifle',
  'pistol',
  'companion',
  'sentinel',
  'archwing',
  'arch-gun',
  'arch-melee',
  'aura',
  'stance',
  'exilus',
  'augment',
  'parazon',
  'railjack',
  'necramech',
  'other',
]);

export const modSchema = z.object({
  name: z.string().min(1),
  polarity: polaritySchema,
  drain: z.number().int(),
  maxRank: z.number().int().min(0),
  rarity: raritySchema,
  type: modTypeSchema,
  effect: z.string().min(1),
  perRankStats: z.array(perRankStatSchema).default([]),
  drops: z.array(dropSchema).default([]),
  sources: z.array(sourceSchema).min(2),
  updatedAt: isoDateLike,
});
