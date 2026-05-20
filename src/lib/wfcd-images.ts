// Image URL resolution for WFCD entities.
// Priority: wikiaThumbnail (Fandom CDN) > imageName via warframestat.us CDN.
// No network calls -- only WFCD data read from local JSON files.

import {
  getWarframe,
  getWeapon,
  loadCategory,
  DEFAULT_DIR,
  slugify,
  type WfcdBase,
} from './wfcd';

// ---------- Types --------------------------------------------------------

export type ImageCollection = 'warframes' | 'weapons' | 'companions' | 'archwings';

export interface WfcdCompanion extends WfcdBase {
  readonly wikiaThumbnail?: string;
  readonly wikiaUrl?: string;
}

export interface WfcdArchwingEntry extends WfcdBase {
  readonly wikiaThumbnail?: string;
  readonly wikiaUrl?: string;
}

// ---------- Accessors ----------------------------------------------------

export function getAllCompanions(
  dataDir: string = DEFAULT_DIR,
): readonly WfcdCompanion[] {
  const buckets: readonly string[] = ['Sentinels.json', 'Pets.json'];
  return buckets.flatMap((f) => loadCategory<WfcdCompanion>(f, dataDir));
}

export function getAllArchwingEntries(
  dataDir: string = DEFAULT_DIR,
): readonly WfcdArchwingEntry[] {
  const buckets: readonly string[] = [
    'Archwing.json',
    'Arch-Gun.json',
    'Arch-Melee.json',
  ];
  return buckets.flatMap((f) => loadCategory<WfcdArchwingEntry>(f, dataDir));
}

// ---------- Helpers ------------------------------------------------------

function findBySlugLocal<T extends WfcdBase>(
  list: readonly T[],
  slug: string,
): T | null {
  const needle = slugify(slug);
  return list.find((e) => e.slug === needle) ?? null;
}

function imageUrlFromEntry(
  entry: WfcdBase & { wikiaThumbnail?: string },
): string | undefined {
  if (entry.wikiaThumbnail) return entry.wikiaThumbnail;
  if (entry.imageName) {
    return `https://cdn.warframestat.us/img/${entry.imageName}`;
  }
  return undefined;
}

// ---------- Public API ---------------------------------------------------

export function getEntityImageUrl(
  slug: string,
  collection: ImageCollection,
): string | undefined {
  if (collection === 'warframes') {
    const entry = getWarframe(slug);
    return entry ? imageUrlFromEntry(entry) : undefined;
  }
  if (collection === 'weapons') {
    const entry = getWeapon(slug);
    return entry ? imageUrlFromEntry(entry) : undefined;
  }
  if (collection === 'companions') {
    const entry = findBySlugLocal(getAllCompanions(), slug);
    return entry ? imageUrlFromEntry(entry) : undefined;
  }
  if (collection === 'archwings') {
    const entry = findBySlugLocal(getAllArchwingEntries(), slug);
    return entry ? imageUrlFromEntry(entry) : undefined;
  }
  return undefined;
}
