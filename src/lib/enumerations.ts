// Typed loaders for /data/enumerations/*.json files.
// Used by list-page routes that have no per-entity MDX.

import { existsSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
const ENUM_DIR = join(REPO_ROOT, 'data', 'enumerations');

// ---------- Item shape interfaces ----------------------------------------

export interface EnumWarframe {
  slug: string;
  name: string;
  sourceId: string;
  isPrime: boolean;
}

export interface EnumWeapon {
  slug: string;
  name: string;
  type: string;
  sourceId: string;
  masteryRank?: number;
}

export interface EnumMod {
  slug: string;
  name: string;
  polarity?: string;
  rarity?: string;
  type?: string;
  isAugment?: boolean;
}

export interface EnumArcane {
  slug: string;
  name: string;
  type?: string;
  rarity?: string | null;
  sourceId?: string | null;
}

export interface EnumMission {
  slug: string;
  name: string;
  type?: string;
  faction?: string;
  planet?: string;
  levelRange?: string;
  sourceId?: string;
}

export interface EnumResource {
  name: string;
  rarity?: string | null;
  slug: string;
  sourceId?: string;
  type?: string;
}

export interface EnumRelic {
  slug: string;
  name: string;
  era?: string;
  sourceId?: string;
}

export interface EnumFactionItem {
  slug: string;
  name: string;
  role?: string;
  sourceId?: string | null;
}

export interface EnumSyndicateItem {
  slug: string;
  name: string;
  type?: string;
  sourceId?: string;
}

export interface EnumQuest {
  slug: string;
  name: string;
}

// Factions and syndicates have an object wrapper
interface WrappedList<T> {
  sources: unknown[];
  items: T[];
}

// ---------- Loader helpers -----------------------------------------------

function loadJson<T>(filename: string): T {
  const path = join(ENUM_DIR, filename);
  if (!existsSync(path)) {
    console.error(`[enumerations] missing file: ${path}`);
    return [] as unknown as T;
  }
  return JSON.parse(readFileSync(path, 'utf8')) as T;
}

function loadArray<T>(filename: string): T[] {
  return loadJson<T[]>(filename);
}

function loadWrapped<T>(filename: string): T[] {
  const raw = loadJson<WrappedList<T>>(filename);
  if (Array.isArray(raw)) return raw as T[];
  return raw.items ?? [];
}

// ---------- Public accessors ---------------------------------------------

export function getWarframeEnumeration(): EnumWarframe[] {
  return loadArray<EnumWarframe>('warframes.json');
}

export function getWeaponEnumeration(): EnumWeapon[] {
  return loadArray<EnumWeapon>('weapons.json');
}

export function getModEnumeration(): EnumMod[] {
  return loadArray<EnumMod>('mods-featured.json');
}

export function getArcaneEnumeration(): EnumArcane[] {
  return loadArray<EnumArcane>('arcanes.json');
}

export function getMissionEnumeration(): EnumMission[] {
  return loadArray<EnumMission>('missions.json');
}

export function getResourceEnumeration(): EnumResource[] {
  return loadArray<EnumResource>('resources.json');
}

export function getRelicEnumeration(): EnumRelic[] {
  return loadArray<EnumRelic>('relics.json');
}

export function getFactionEnumeration(): EnumFactionItem[] {
  return loadWrapped<EnumFactionItem>('factions.json');
}

export function getSyndicateEnumeration(): EnumSyndicateItem[] {
  return loadWrapped<EnumSyndicateItem>('syndicates.json');
}

export function getQuestEnumeration(): EnumQuest[] {
  return loadArray<EnumQuest>('quests.json');
}
