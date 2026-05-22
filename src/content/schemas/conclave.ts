import { z } from 'astro:content';
import { isoDateLike, sourceSchema } from './shared';

export const conclaveSchema = z.object({
  name: z.string().min(1),
  type: z.enum(['mode', 'weapon', 'syndicate-rank']),
  description: z.string().min(1),
  sources: z.array(sourceSchema).min(2),
  updatedAt: isoDateLike,
});
