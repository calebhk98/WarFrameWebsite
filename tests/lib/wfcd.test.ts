import { describe, it, expect } from 'vitest';
import * as path from 'node:path';
import {
  slugify,
  getAllWarframes,
  getWarframe,
  getAllWeapons,
  getAllMods,
  getAllResources,
  getAllArcanes,
  getAllRelics,
  getAllMissions,
  getAllSyndicates,
  getAllFactions,
  getAllQuests,
} from '../../src/lib/wfcd';

const FIXTURE_DIR = path.resolve(__dirname, '../fixtures/wfcd');

describe('slugify', () => {
  it('slugify("Mag Prime") returns "mag-prime"', () => {
    expect(slugify('Mag Prime')).toBe('mag-prime');
  });

  it('slugify handles diacritics: "Nezha’s Halo" -> "nezhas-halo"', () => {
    expect(slugify('Nezha’s Halo')).toBe('nezhas-halo');
  });

  it('slugify strips diacritics from accented letters', () => {
    expect(slugify('Hildrýn')).toBe('hildryn');
  });

  it('slugify collapses internal whitespace and punctuation', () => {
    expect(slugify("Kuva  Bramma!")).toBe('kuva-bramma');
  });
});

describe('wfcd accessors', () => {
  it('getAllWarframes returns array with at least 30 entries', () => {
    const frames = getAllWarframes();
    expect(Array.isArray(frames)).toBe(true);
    expect(frames.length).toBeGreaterThanOrEqual(30);
  });

  it('getWarframe(slug) returns null for unknown slug', () => {
    expect(getWarframe('this-frame-does-not-exist-xyz')).toBeNull();
  });

  it('getWarframe(slug) returns object with name, masteryRank, health for valid slug', () => {
    const frames = getAllWarframes();
    const sample = frames[0];
    expect(sample).toBeDefined();
    if (!sample) return;
    const looked = getWarframe(sample.slug);
    expect(looked).not.toBeNull();
    expect(looked?.name).toBe(sample.name);
    expect(typeof looked?.masteryRank).toBe('number');
    expect(typeof looked?.health).toBe('number');
  });

  it('getAllWeapons returns array', () => {
    expect(Array.isArray(getAllWeapons())).toBe(true);
    expect(getAllWeapons().length).toBeGreaterThan(0);
  });

  it('getAllMods returns array', () => {
    expect(Array.isArray(getAllMods())).toBe(true);
  });

  it('getAllResources returns array', () => {
    expect(Array.isArray(getAllResources())).toBe(true);
  });

  it('getAllArcanes returns array', () => {
    expect(Array.isArray(getAllArcanes())).toBe(true);
  });

  it('getAllRelics returns array', () => {
    expect(Array.isArray(getAllRelics())).toBe(true);
  });

  it('getAllMissions returns array', () => {
    expect(Array.isArray(getAllMissions())).toBe(true);
  });

  it('getAllSyndicates returns array', () => {
    expect(Array.isArray(getAllSyndicates())).toBe(true);
  });

  it('getAllFactions returns array', () => {
    expect(Array.isArray(getAllFactions())).toBe(true);
  });

  it('getAllQuests returns array', () => {
    expect(Array.isArray(getAllQuests())).toBe(true);
  });
});

describe('wfcd fixture-backed loading', () => {
  it('getAllWarframes(dataDir) reads from the provided directory', () => {
    const frames = getAllWarframes(FIXTURE_DIR, 'Warframes.sample.json');
    expect(frames).toHaveLength(3);
    const mag = frames.find((f) => f.slug === 'mag-prime');
    expect(mag?.name).toBe('Mag Prime');
    expect(mag?.health).toBe(100);
  });
});
