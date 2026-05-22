// mods-index.ts -- build-time helper that shapes mod content collection entries
// into a minimal serialisable array for the client-side build calculator widget.
// Import this file only inside .astro frontmatter (SSG context).

import type { CollectionEntry } from 'astro:content';

export interface ModEffect {
  readonly stat: string;
  readonly value: number;
}

export interface ModIndexEntry {
  readonly slug: string;
  readonly name: string;
  readonly polarity: string;
  readonly drain: number;
  readonly maxRank: number;
  readonly type: string;
  readonly effects: readonly ModEffect[];
}

function effectsAtMaxRank(entry: CollectionEntry<'mods'>): readonly ModEffect[] {
  const { perRankStats, maxRank } = entry.data;
  const row = perRankStats.find((r) => r.rank === maxRank) ?? perRankStats[perRankStats.length - 1];
  if (!row) return [];
  return Object.entries(row.stats)
    .filter((pair): pair is [string, number] => typeof pair[1] === 'number')
    .map(([stat, value]) => ({ stat, value }));
}

export function toModIndexEntry(entry: CollectionEntry<'mods'>): ModIndexEntry {
  return {
    slug: entry.slug,
    name: entry.data.name,
    polarity: entry.data.polarity,
    drain: entry.data.drain,
    maxRank: entry.data.maxRank,
    type: entry.data.type,
    effects: effectsAtMaxRank(entry),
  };
}
