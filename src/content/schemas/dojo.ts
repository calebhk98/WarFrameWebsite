import { z } from 'astro:content';
import { isoDateLike, sourceSchema } from './shared';

export const dojoSchema = z.object({
  name: z.string().min(1),
  type: z.enum(['clan-tier', 'room', 'research', 'decoration']),
  description: z.string().min(1),
  sources: z.array(sourceSchema).min(2),
  updatedAt: isoDateLike,
});
