// Import WFCD warframe-items JSON dumps into /data/wfcd/.
//
// Reads /node_modules/warframe-items/data/json/*.json, attaches a normalized
// `slug` field to each entity, and writes one flattened file per category
// to /data/wfcd/. The output is what src/lib/wfcd.ts loads at build time.
//
// Usage:  pnpm run import   (or)   tsx scripts/import-wfcd.ts

import { mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { slugify } from '../src/lib/wfcd.js';

interface RawEntity {
  readonly name?: string;
  readonly uniqueName?: string;
  readonly masteryReq?: number;
  readonly masteryRank?: number;
  readonly category?: string;
  readonly [key: string]: unknown;
}

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, '..');
const SRC = join(ROOT, 'node_modules', 'warframe-items', 'data', 'json');
const OUT = join(ROOT, 'data', 'wfcd');

// Skip non-item bundles (i18n is a massive translation map, not items).
const SKIP_FILES = new Set<string>(['i18n.json']);

// Map WFCD category file -> weapon bucket. Used for Weapons union slug field.
const WEAPON_BUCKETS: Record<string, string> = {
  'Primary.json': 'Primary',
  'Secondary.json': 'Secondary',
  'Melee.json': 'Melee',
  'Archwing.json': 'Archwing',
  'Arch-Gun.json': 'Arch-Gun',
  'Arch-Melee.json': 'Arch-Melee',
};

function listSourceFiles(): readonly string[] {
  return readdirSync(SRC)
    .filter((f) => f.endsWith('.json'))
    .filter((f) => !SKIP_FILES.has(f))
    .sort();
}

function ensureOutputDir(): void {
  mkdirSync(OUT, { recursive: true });
}

function readRawCategory(filename: string): readonly RawEntity[] {
  const raw = readFileSync(join(SRC, filename), 'utf8');
  const parsed: unknown = JSON.parse(raw);
  if (!Array.isArray(parsed)) return [];
  return parsed as readonly RawEntity[];
}

function normaliseEntity(entity: RawEntity, weaponType?: string): RawEntity {
  const base = entity.name ?? entity.uniqueName ?? '';
  const slug = slugify(base);
  const masteryRank =
    typeof entity.masteryRank === 'number'
      ? entity.masteryRank
      : typeof entity.masteryReq === 'number'
        ? entity.masteryReq
        : undefined;
  const result: Record<string, unknown> = { ...entity, slug };
  if (masteryRank !== undefined) result.masteryRank = masteryRank;
  if (weaponType) result.weaponType = weaponType;
  return result as RawEntity;
}

function writeCategory(filename: string, entities: readonly RawEntity[]): void {
  const outPath = join(OUT, filename);
  writeFileSync(outPath, JSON.stringify(entities, null, 0));
}

function importOneFile(filename: string): number {
  const weaponType = WEAPON_BUCKETS[filename];
  const raw = readRawCategory(filename);
  const normalised = raw.map((e) => normaliseEntity(e, weaponType));
  writeCategory(filename, normalised);
  return normalised.length;
}

function importMissionsAlias(): number {
  // Some downstream code asks for Missions.json; WFCD ships them as Node.json.
  const raw = readRawCategory('Node.json');
  const normalised = raw.map((e) => normaliseEntity(e));
  writeCategory('Missions.json', normalised);
  return normalised.length;
}

function writeEmptyAlias(filename: string): void {
  writeCategory(filename, []);
}

function main(): void {
  ensureOutputDir();
  const files = listSourceFiles();
  const counts: Record<string, number> = {};
  let total = 0;

  for (const file of files) {
    const n = importOneFile(file);
    counts[file] = n;
    total += n;
  }

  // Derived/aliased outputs the site expects but WFCD doesn't ship.
  counts['Missions.json (alias of Node.json)'] = importMissionsAlias();
  // WFCD has no Syndicates.json or Factions.json. Emit empty files so the
  // lib's missing-file warning never fires for these expected categories.
  writeEmptyAlias('Syndicates.json');
  writeEmptyAlias('Factions.json');
  counts['Syndicates.json'] = 0;
  counts['Factions.json'] = 0;

  for (const [k, v] of Object.entries(counts)) {
    process.stdout.write(`imported: ${v} ${k}\n`);
  }
  process.stdout.write(`total: ${total}\n`);
}

main();
