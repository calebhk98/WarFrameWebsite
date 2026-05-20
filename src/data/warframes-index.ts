// warframes-index.ts -- build-time helper that shapes warframe content collection
// entries into a minimal serialisable array for the client-side comparator widget.
// Import this file only inside .astro frontmatter (SSG context).

import type { CollectionEntry } from 'astro:content';

export interface AbilityIndexEntry {
  readonly name: string;
  readonly key: string;
}

export interface WarframeIndexEntry {
  readonly slug: string;
  readonly name: string;
  readonly masteryRank: number;
  readonly health: number | 'unknown';
  readonly shield: number | 'unknown';
  readonly armor: number | 'unknown';
  readonly energy: number | 'unknown';
  readonly sprintSpeed: number | 'unknown';
  readonly abilities: readonly AbilityIndexEntry[];
  readonly aliases: readonly string[];
}

export function toWarframeIndexEntry(
  entry: CollectionEntry<'warframes'>,
): WarframeIndexEntry {
  return {
    slug: entry.slug,
    name: entry.data.name,
    masteryRank: entry.data.masteryRank,
    health: entry.data.health,
    shield: entry.data.shield,
    armor: entry.data.armor,
    energy: entry.data.energy,
    sprintSpeed: entry.data.sprintSpeed,
    abilities: entry.data.abilities.map((a) => ({ name: a.name, key: a.key })),
    aliases: entry.data.aliases,
  };
}
