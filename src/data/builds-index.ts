// builds-index.ts -- build-time helper that shapes content collection entries
// into a minimal serialisable array for the client-side comparator widget.
// Import this file only inside .astro frontmatter (SSG context).

import type { CollectionEntry } from 'astro:content';

export interface BuildIndexEntry {
  readonly slug: string;
  readonly name: string;
  readonly warframe: string;
  readonly entityType: string;
  readonly purpose: string;
  readonly mods: readonly string[];
  readonly focus: string;
  readonly helminth: string;
  readonly arcanes: readonly string[];
  readonly strengths: readonly string[];
  readonly weaknesses: readonly string[];
}

export function toBuildIndexEntry(
  build: CollectionEntry<'builds'>,
): BuildIndexEntry {
  return {
    slug: build.slug,
    name: build.data.name,
    warframe: build.data.forEntity,
    entityType: build.data.entityType,
    purpose: build.data.purpose,
    mods: build.data.mods.map((m) => `${m.modSlug} (${m.slot})`),
    focus: build.data.focus ?? '',
    helminth: build.data.helminth ?? '',
    arcanes: (build.data.arcanes ?? []).map((a) => a.slug),
    strengths: build.data.strengths,
    weaknesses: build.data.weaknesses,
  };
}
