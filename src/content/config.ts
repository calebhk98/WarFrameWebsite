import { defineCollection, z } from 'astro:content';

// Placeholder schema — Phase 1 will replace with full Zod definitions per
// collection. Using passthrough so future fields don't break Phase 0 builds.
const placeholder = z
  .object({
    slug: z.string(),
    name: z.string(),
  })
  .passthrough();

const make = (): ReturnType<typeof defineCollection> =>
  defineCollection({ type: 'content', schema: placeholder });

export const collections = {
  warframes: make(),
  weapons: make(),
  mods: make(),
  quests: make(),
  factions: make(),
  syndicates: make(),
  relics: make(),
  arcanes: make(),
  missions: make(),
  resources: make(),
  builds: make(),
  // `guides` is a single collection containing farming/, strategy/, paths/
  // subdirectories per the project layout.
  guides: make(),
};
