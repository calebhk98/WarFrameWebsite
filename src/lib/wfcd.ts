// WFCD typed accessors. Reads /data/wfcd/<Category>.json files written by
// scripts/import-wfcd.ts and exposes typed, cached read-only views.
//
// Synchronous reads (fs.readFileSync) are intentional: this lib runs at
// build time (Astro SSG) and during Vitest. Pages must NOT call it at
// runtime — see docs/DATA.md.

import { existsSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

// ---------- Types --------------------------------------------------------

export interface WfcdBase {
  readonly slug: string;
  readonly name: string;
  readonly uniqueName?: string;
  readonly description?: string;
  readonly type?: string;
  readonly category?: string;
  readonly imageName?: string;
}

export interface WfcdAbility {
  readonly name: string;
  readonly description: string;
  readonly uniqueName?: string;
  readonly imageName?: string;
}

export interface WfcdWarframe extends WfcdBase {
  readonly masteryRank: number;
  readonly health: number;
  readonly shield: number;
  readonly armor: number;
  readonly energy: number;
  readonly sprintSpeed?: number;
  readonly abilities?: readonly WfcdAbility[];
  readonly passiveDescription?: string;
  readonly wikiaThumbnail?: string;
  readonly wikiaUrl?: string;
}

export interface WfcdWeapon extends WfcdBase {
  readonly masteryRank?: number;
  readonly disposition?: number;
  readonly criticalChance?: number;
  readonly criticalMultiplier?: number;
  readonly procChance?: number;
  readonly fireRate?: number;
  readonly magazineSize?: number;
  readonly reloadTime?: number;
  readonly totalDamage?: number;
  readonly weaponType: 'Primary' | 'Secondary' | 'Melee' | 'Archwing' | 'Other';
}

export interface WfcdLevelStat {
  readonly stats: readonly string[];
}

export interface WfcdMod extends WfcdBase {
  readonly polarity?: string;
  readonly rarity?: string;
  readonly baseDrain?: number;
  readonly fusionLimit?: number;
  readonly compatName?: string;
  readonly isAugment?: boolean;
  readonly levelStats?: readonly WfcdLevelStat[];
}

export interface WfcdResource extends WfcdBase {
  readonly rarity?: string;
}

export interface WfcdArcane extends WfcdBase {
  readonly rarity?: string;
  readonly levelStats?: readonly WfcdLevelStat[];
}

export interface WfcdRelic extends WfcdBase {
  readonly vaulted?: boolean;
}

export interface WfcdMission extends WfcdBase {
  readonly systemName?: string;
  readonly minEnemyLevel?: number;
  readonly maxEnemyLevel?: number;
  readonly masteryReq?: number;
}

export interface WfcdQuest extends WfcdBase {}
export interface WfcdSyndicate extends WfcdBase {}
export interface WfcdFaction extends WfcdBase {}

// ---------- Internals ----------------------------------------------------

function resolveDataDir(): string {
  // During Astro SSG, process.cwd() is the project root.
  // Fallback to import.meta.url-based resolution for Vitest.
  const cwd = process.cwd();
  const fromCwd = join(cwd, 'data', 'wfcd');
  if (existsSync(fromCwd)) return fromCwd;
  const fromMeta = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..', 'data', 'wfcd');
  return fromMeta;
}

const DEFAULT_DIR = resolveDataDir();

const cache = new Map<string, readonly WfcdBase[]>();
const missing = new Set<string>();

function cacheKey(dir: string, file: string): string {
  return `${dir}::${file}`;
}

function loadCategory<T extends WfcdBase>(
  filename: string,
  dataDir: string,
): readonly T[] {
  const key = cacheKey(dataDir, filename);
  const hit = cache.get(key);
  if (hit) return hit as readonly T[];

  const path = join(dataDir, filename);
  if (!existsSync(path)) {
    warnMissingOnce(path);
    cache.set(key, []);
    return [];
  }

  const raw = readFileSync(path, 'utf8');
  const parsed = JSON.parse(raw) as readonly T[];
  cache.set(key, parsed);
  return parsed;
}

function warnMissingOnce(path: string): void {
  if (missing.has(path)) return;
  missing.add(path);
  console.error(
    `[wfcd] missing data file: ${path}. Run \`pnpm run import\` to populate.`,
  );
}

function findBySlug<T extends WfcdBase>(
  list: readonly T[],
  slug: string,
): T | null {
  const needle = slugify(slug);
  return list.find((entry) => entry.slug === needle) ?? null;
}

// ---------- slugify ------------------------------------------------------

export function slugify(name: string): string {
  if (!name) return '';
  // Decompose diacritics, strip combining marks, drop apostrophes and
  // non-alphanumerics, collapse whitespace/hyphens.
  const normalised = name.normalize('NFD').replace(/[̀-ͯ]/g, '');
  const stripped = normalised.replace(/['‘’ʼ]/g, '');
  const ascii = stripped
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return ascii;
}

// ---------- Public accessors --------------------------------------------

export function getAllWarframes(
  dataDir: string = DEFAULT_DIR,
  filename = 'Warframes.json',
): readonly WfcdWarframe[] {
  return loadCategory<WfcdWarframe>(filename, dataDir);
}

export function getWarframe(slug: string): WfcdWarframe | null {
  return findBySlug(getAllWarframes(), slug);
}

export function getAllWeapons(
  dataDir: string = DEFAULT_DIR,
): readonly WfcdWeapon[] {
  const buckets: readonly string[] = [
    'Primary.json',
    'Secondary.json',
    'Melee.json',
    'Archwing.json',
    'Arch-Gun.json',
    'Arch-Melee.json',
  ];
  return buckets.flatMap((f) => loadCategory<WfcdWeapon>(f, dataDir));
}

export function getWeapon(slug: string): WfcdWeapon | null {
  return findBySlug(getAllWeapons(), slug);
}

export function getAllMods(dataDir: string = DEFAULT_DIR): readonly WfcdMod[] {
  return loadCategory<WfcdMod>('Mods.json', dataDir);
}

export function getMod(slug: string): WfcdMod | null {
  return findBySlug(getAllMods(), slug);
}

export function getAllResources(
  dataDir: string = DEFAULT_DIR,
): readonly WfcdResource[] {
  return loadCategory<WfcdResource>('Resources.json', dataDir);
}

export function getResource(slug: string): WfcdResource | null {
  return findBySlug(getAllResources(), slug);
}

export function getAllArcanes(
  dataDir: string = DEFAULT_DIR,
): readonly WfcdArcane[] {
  return loadCategory<WfcdArcane>('Arcanes.json', dataDir);
}

export function getAllRelics(
  dataDir: string = DEFAULT_DIR,
): readonly WfcdRelic[] {
  return loadCategory<WfcdRelic>('Relics.json', dataDir);
}

export function getAllMissions(
  dataDir: string = DEFAULT_DIR,
): readonly WfcdMission[] {
  return loadCategory<WfcdMission>('Missions.json', dataDir);
}

export function getAllQuests(
  dataDir: string = DEFAULT_DIR,
): readonly WfcdQuest[] {
  return loadCategory<WfcdQuest>('Quests.json', dataDir);
}

export function getAllSyndicates(
  dataDir: string = DEFAULT_DIR,
): readonly WfcdSyndicate[] {
  return loadCategory<WfcdSyndicate>('Syndicates.json', dataDir);
}

export function getAllFactions(
  dataDir: string = DEFAULT_DIR,
): readonly WfcdFaction[] {
  return loadCategory<WfcdFaction>('Factions.json', dataDir);
}

// Test-only: clear in-memory caches (e.g. between fixture and real-dir tests).
export function __resetWfcdCache(): void {
  cache.clear();
  missing.clear();
}
