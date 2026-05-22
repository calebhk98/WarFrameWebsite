import { z } from 'astro:content';
import { isoDateLike, sourceSchema } from './shared';

export const farmingMissionRefSchema = z.object({
  node: z.string().min(1),
  why: z.string().min(1),
});

export const farmingGuideSchema = z.object({
  name: z.string().min(1),
  kind: z.literal('farming'),
  target: z.string().min(1),
  recommendedMissions: z.array(farmingMissionRefSchema).default([]),
  recommendedFrames: z.array(z.string()).default([]),
  modsToBring: z.array(z.string()).optional(),
  tips: z.array(z.string()).default([]),
  sources: z.array(sourceSchema).min(2),
  updatedAt: isoDateLike,
});

export const strategyGuideSchema = z.object({
  name: z.string().min(1),
  kind: z.literal('strategy'),
  topic: z.string().min(1),
  prerequisites: z.array(z.string()).default([]),
  steps: z.array(z.string()).min(1),
  commonMistakes: z.array(z.string()).default([]),
  sources: z.array(sourceSchema).min(2),
  updatedAt: isoDateLike,
});

export const pathMilestoneSchema = z.object({
  order: z.number().int().nonnegative(),
  title: z.string().min(1),
  description: z.string().min(1),
  recommendedActions: z.array(z.string()).default([]),
});

export const pathGuideSchema = z.object({
  name: z.string().min(1),
  kind: z.literal('path'),
  audience: z.enum(['new-player', 'intermediate', 'endgame']),
  milestones: z.array(pathMilestoneSchema).min(1),
  sources: z.array(sourceSchema).min(2),
  updatedAt: isoDateLike,
});

export const guideSchema = z.discriminatedUnion('kind', [
  farmingGuideSchema,
  strategyGuideSchema,
  pathGuideSchema,
]);
