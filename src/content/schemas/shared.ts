import { z } from 'astro:content';

/**
 * Loose ISO-8601 date / datetime check. Accepts YYYY-MM-DD or full ISO
 * timestamps; we keep it permissive so subagents can pass `new Date().toISOString()`
 * or a plain date string from a wiki citation.
 */
export const isoDateLike = z
  .string()
  .min(8)
  .refine((value) => !Number.isNaN(Date.parse(value)), {
    message: 'Expected ISO-8601 date or datetime string',
  });

/** Lowercase, hyphenated, no diacritics. Matches the slug rule in CLAUDE.md. */
export const slug = z
  .string()
  .min(1)
  .max(80)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message: 'slug must be lowercase-hyphenated (a-z, 0-9, single hyphens)',
  });

export const sourceSchema = z.object({
  url: z.string().url(),
  accessedAt: isoDateLike,
  title: z.string().optional(),
  publisher: z.string().optional(),
  note: z.string().optional(),
});

export const statsRecordSchema = z.record(z.string(), z.number());

export const perRankStatSchema = z.object({
  rank: z.number().int().min(0),
  stats: statsRecordSchema,
});

export const dropSchema = z.object({
  source: z.string().min(1),
  chance: z.number().min(0).max(100).optional(),
  rotation: z.string().optional(),
  rarity: z.string().optional(),
  note: z.string().optional(),
});

export const acquisitionSchema = z.object({
  source: z.string().min(1),
  blueprintLocations: z.array(z.string()).default([]),
  cost: z
    .object({
      credits: z.number().int().nonnegative().optional(),
      platinum: z.number().int().nonnegative().optional(),
    })
    .optional(),
  buildTimeHours: z.number().nonnegative().optional(),
  note: z.string().optional(),
});

export const primeVariantSchema = z.object({
  available: z.boolean(),
  vaulted: z.boolean().optional(),
  releasedAt: isoDateLike.optional(),
  vaultedAt: isoDateLike.optional(),
});

export const raritySchema = z.enum([
  'common',
  'uncommon',
  'rare',
  'legendary',
  'peculiar',
  'riven',
]);
