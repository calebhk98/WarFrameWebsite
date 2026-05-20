import { z } from 'astro:content';
import { isoDateLike, sourceSchema } from './shared';

export const railjackSchema = z.object({
  name: z.string().min(1),
  type: z.enum(['warship-section', 'intrinsic-tree', 'mission-type', 'weapon-component']),
  description: z.string().min(1),
  sources: z.array(sourceSchema).min(2),
  updatedAt: isoDateLike,
});
