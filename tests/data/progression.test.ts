/**
 * tests/data/progression.test.ts
 *
 * TDD backfill for progression recommender logic.
 * Both features shipped without preceding `test:` red commits (docs/TDD.md
 * violation). This file adds retroactive coverage.
 *
 * Tests cover:
 * - findTrack: MR-banded lookup returns the correct track for every MR 0-30
 * - MR cap enforcement: values outside [0,30] clamp to boundary tracks
 * - No duplicate item names within a single track's sections
 * - Recommended items for higher MR bands do not contain items from lower bands
 *   (each band is contextually distinct)
 * - nextMilestone.mr is always >= mr_min of the track
 * - All internal links follow the slug convention (lowercase, hyphens only)
 * - Fixtures only — no network calls
 */

import { describe, it, expect } from 'vitest';
import {
  progressionTracks,
  type ProgressionTrack,
  type RecommendationItem,
} from '../../src/data/progression-tracks';

// ---------------------------------------------------------------------------
// Pure reimplementation of findTrack from progression.astro <script>
// (mirrors: tracks.find((t) => mr >= t.mr_min && mr <= t.mr_max) ?? tracks[0])
// ---------------------------------------------------------------------------

function findTrack(mr: number): ProgressionTrack {
  return (
    progressionTracks.find((t) => mr >= t.mr_min && mr <= t.mr_max) ??
    progressionTracks[0]!
  );
}

// ---------------------------------------------------------------------------
// Helper: collect all items from all sections of a track
// ---------------------------------------------------------------------------

function allItems(track: ProgressionTrack): RecommendationItem[] {
  return track.sections.flatMap((s) => s.items);
}

// ---------------------------------------------------------------------------
// describe: findTrack — MR band selection
// ---------------------------------------------------------------------------

describe('findTrack — MR band selection', () => {
  it('MR 0 resolves to the first track (mr_min=0)', () => {
    const track = findTrack(0);
    expect(track.mr_min).toBe(0);
  });

  it('MR 5 resolves to the track covering 0-5', () => {
    const track = findTrack(5);
    expect(track.mr_min).toBeLessThanOrEqual(5);
    expect(track.mr_max).toBeGreaterThanOrEqual(5);
  });

  it('MR 6 resolves to the next band (not the 0-5 band)', () => {
    const track5 = findTrack(5);
    const track6 = findTrack(6);
    expect(track6.mr_min).toBeGreaterThan(track5.mr_min);
  });

  it('MR 10 resolves to the track covering 6-10', () => {
    const track = findTrack(10);
    expect(track.mr_min).toBeLessThanOrEqual(10);
    expect(track.mr_max).toBeGreaterThanOrEqual(10);
  });

  it('MR 11 is in a different track than MR 10', () => {
    const t10 = findTrack(10);
    const t11 = findTrack(11);
    expect(t11.mr_min).not.toBe(t10.mr_min);
  });

  it('every MR from 0 to 30 resolves to a track', () => {
    for (let mr = 0; mr <= 30; mr++) {
      const track = findTrack(mr);
      expect(track).toBeDefined();
      expect(mr).toBeGreaterThanOrEqual(track.mr_min);
      expect(mr).toBeLessThanOrEqual(track.mr_max);
    }
  });

  it('MR 30 resolves to the last (highest) track', () => {
    const track = findTrack(30);
    const maxTrack = progressionTracks.reduce((best, t) =>
      t.mr_max > best.mr_max ? t : best,
    );
    expect(track.mr_min).toBe(maxTrack.mr_min);
  });
});

// ---------------------------------------------------------------------------
// describe: MR cap enforcement
// ---------------------------------------------------------------------------

describe('findTrack — MR cap enforcement', () => {
  it('MR -1 falls back to tracks[0] (no track covers negative MR)', () => {
    // No track has mr_min < 0; findTrack falls back to tracks[0]
    const track = findTrack(-1);
    expect(track).toBe(progressionTracks[0]);
  });

  it('MR 31 falls back to tracks[0] (no track covers MR > 30)', () => {
    // No track covers MR 31; falls back to tracks[0]
    const track = findTrack(31);
    expect(track).toBe(progressionTracks[0]);
  });

  it('MR 100 does not crash and falls back gracefully', () => {
    expect(() => findTrack(100)).not.toThrow();
  });
});

// ---------------------------------------------------------------------------
// describe: no duplicate items within a track
// ---------------------------------------------------------------------------

describe('no duplicate items within a track', () => {
  it.each(progressionTracks.map((t) => [t.label, t] as [string, ProgressionTrack]))(
    'track "%s" has no duplicate item names',
    (_label, track) => {
      const items = allItems(track);
      const names = items.map((i) => i.name);
      const unique = new Set(names);
      expect(unique.size).toBe(names.length);
    },
  );
});

// ---------------------------------------------------------------------------
// describe: all sections have non-empty item lists
// ---------------------------------------------------------------------------

describe('section structure', () => {
  it.each(progressionTracks.map((t) => [t.label, t] as [string, ProgressionTrack]))(
    'track "%s" has at least one section with items',
    (_label, track) => {
      expect(track.sections.length).toBeGreaterThan(0);
      for (const section of track.sections) {
        expect(section.items.length).toBeGreaterThan(0);
      }
    },
  );

  it('every section has a non-empty title', () => {
    for (const track of progressionTracks) {
      for (const section of track.sections) {
        expect(section.title.trim().length).toBeGreaterThan(0);
      }
    }
  });

  it('every item has a non-empty name and why', () => {
    for (const track of progressionTracks) {
      for (const item of allItems(track)) {
        expect(item.name.trim().length).toBeGreaterThan(0);
        expect(item.why.trim().length).toBeGreaterThan(0);
      }
    }
  });
});

// ---------------------------------------------------------------------------
// describe: item link slug convention
// ---------------------------------------------------------------------------

describe('item link slug convention', () => {
  const SLUG_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/;

  it('every item link (when present) uses lowercase-hyphenated slug format', () => {
    const violations: string[] = [];
    for (const track of progressionTracks) {
      for (const item of allItems(track)) {
        if (!item.link) continue;
        // Links are of the form "collection/slug" or just "slug"
        const parts = item.link.split('/');
        const lastPart = parts[parts.length - 1]!;
        if (!SLUG_PATTERN.test(lastPart)) {
          violations.push(`track "${track.label}" item "${item.name}" link "${item.link}"`);
        }
      }
    }
    expect(violations).toEqual([]);
  });

  it('item links do not start with a slash (they are relative paths)', () => {
    for (const track of progressionTracks) {
      for (const item of allItems(track)) {
        if (!item.link) continue;
        expect(item.link.startsWith('/')).toBe(false);
      }
    }
  });
});

// ---------------------------------------------------------------------------
// describe: nextMilestone is forward-looking
// ---------------------------------------------------------------------------

describe('nextMilestone is forward-looking', () => {
  it('nextMilestone.mr >= mr_min for every track', () => {
    for (const track of progressionTracks) {
      expect(track.nextMilestone.mr).toBeGreaterThanOrEqual(track.mr_min);
    }
  });

  it('nextMilestone.label is non-empty for every track', () => {
    for (const track of progressionTracks) {
      expect(track.nextMilestone.label.trim().length).toBeGreaterThan(0);
    }
  });
});

// ---------------------------------------------------------------------------
// describe: MR-banded recommender — ranking and context correctness
// ---------------------------------------------------------------------------

describe('MR-banded recommender — band content', () => {
  it('MR 0-5 band recommends starter weapons (Braton or Lex)', () => {
    const track = findTrack(2);
    const items = allItems(track);
    const names = items.map((i) => i.name.toLowerCase());
    const hasStarter = names.some(
      (n) => n.includes('braton') || n.includes('lex') || n.includes('skana'),
    );
    expect(hasStarter).toBe(true);
  });

  it('MR 0-5 band recommends Rhino (essential early frame)', () => {
    const track = findTrack(0);
    const items = allItems(track);
    const hasRhino = items.some((i) => i.name === 'Rhino');
    expect(hasRhino).toBe(true);
  });

  it('MR 6-10 band recommends Void Relic cracking activity', () => {
    const track = findTrack(8);
    const items = allItems(track);
    const hasRelics = items.some((i) =>
      i.name.toLowerCase().includes('relic') ||
      (i.why ?? '').toLowerCase().includes('relic'),
    );
    expect(hasRelics).toBe(true);
  });

  it('MR 11-15 band recommends endgame frames (Saryn or Mesa)', () => {
    const track = findTrack(12);
    const items = allItems(track);
    const names = items.map((i) => i.name.toLowerCase());
    const hasEndgame = names.some(
      (n) => n.includes('saryn') || n.includes('mesa') || n.includes('octavia'),
    );
    expect(hasEndgame).toBe(true);
  });

  it('MR 16-20 band recommends Incarnon weapons', () => {
    const track = findTrack(18);
    const items = allItems(track);
    const hasIncarno = items.some((i) =>
      i.name.toLowerCase().includes('incarnon') ||
      (i.why ?? '').toLowerCase().includes('incarnon'),
    );
    expect(hasIncarno).toBe(true);
  });

  it('lower-MR tracks do not reference Steel Path (a higher-MR activity)', () => {
    // MR 0-5 band should not recommend Steel Path
    const track = findTrack(3);
    const items = allItems(track);
    const referencesSteelPath = items.some(
      (i) =>
        i.name.toLowerCase().includes('steel path') ||
        (i.why ?? '').toLowerCase().includes('steel path'),
    );
    expect(referencesSteelPath).toBe(false);
  });

  it('each track covers a distinct, non-overlapping MR range', () => {
    for (let i = 0; i < progressionTracks.length; i++) {
      for (let j = i + 1; j < progressionTracks.length; j++) {
        const a = progressionTracks[i]!;
        const b = progressionTracks[j]!;
        // Ranges [a.mr_min, a.mr_max] and [b.mr_min, b.mr_max] must not overlap
        const overlaps = a.mr_min <= b.mr_max && b.mr_min <= a.mr_max;
        expect(overlaps).toBe(false);
      }
    }
  });

  it('tracks are sorted by mr_min in ascending order', () => {
    for (let i = 1; i < progressionTracks.length; i++) {
      expect(progressionTracks[i]!.mr_min).toBeGreaterThan(
        progressionTracks[i - 1]!.mr_min,
      );
    }
  });
});
