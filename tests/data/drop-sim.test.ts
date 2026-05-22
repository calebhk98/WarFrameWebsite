/**
 * tests/data/drop-sim.test.ts
 *
 * TDD backfill for drop-sim Monte Carlo math.
 * Both features shipped without preceding `test:` red commits (docs/TDD.md
 * violation). This file adds retroactive coverage.
 *
 * The simulation logic lives in an inline <script> inside
 * src/pages/drop-sim.astro and cannot be imported directly. The functions
 * are re-implemented here from their public behaviour spec so the tests are
 * deterministic. Where possible the data module (src/data/drop-tables.ts) is
 * imported to verify the canonical constants.
 *
 * All tests use a seeded Mulberry32 PRNG — no Math.random() calls.
 */

import { describe, it, expect } from 'vitest';
import {
  DROP_GROUPS,
  ALL_ENTRIES,
  type DropEntry,
} from '../../src/data/drop-tables';

// ---------------------------------------------------------------------------
// Seeded PRNG (Mulberry32) — deterministic replacer for Math.random()
// ---------------------------------------------------------------------------

function mulberry32(seed: number): () => number {
  let s = seed;
  return () => {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let z = Math.imul(s ^ (s >>> 15), 1 | s);
    z = (z + Math.imul(z ^ (z >>> 7), 61 | z)) ^ z;
    return ((z ^ (z >>> 14)) >>> 0) / 4294967296;
  };
}

// ---------------------------------------------------------------------------
// Pure implementations of the drop-sim math functions
// (mirroring the logic in drop-sim.astro <script>)
// ---------------------------------------------------------------------------

function percentile(sorted: number[], p: number): number {
  const idx = Math.max(0, Math.ceil((sorted.length * p) / 100) - 1);
  return sorted[idx]!;
}

interface MonteCarloResult {
  hitPct: number;
  expected: number;
  p10: number;
  p50: number;
  p90: number;
  sorted: number[];
}

function runMonteCarlo(
  pct: number,
  n: number,
  t: number,
  rng: () => number,
): MonteCarloResult {
  const p = pct / 100;

  if (p <= 0) {
    // Edge case: zero probability — never hits
    const sorted = Array.from({ length: t }, () => Infinity);
    return {
      hitPct: 0,
      expected: Infinity,
      p10: Infinity,
      p50: Infinity,
      p90: Infinity,
      sorted,
    };
  }

  if (p >= 1) {
    // Edge case: 100% probability — always hits on run 1
    const sorted = Array.from({ length: t }, () => 1);
    return {
      hitPct: 100,
      expected: 1,
      p10: 1,
      p50: 1,
      p90: 1,
      sorted,
    };
  }

  const successInN = new Array<number>(t);
  const runsToFirst = new Array<number>(t);

  for (let i = 0; i < t; i++) {
    // Did at least one success occur in n runs?
    let hit = false;
    for (let r = 0; r < n; r++) {
      if (rng() < p) {
        hit = true;
        break;
      }
    }
    successInN[i] = hit ? 1 : 0;

    // Geometric: count until first success
    let count = 0;
    while (rng() >= p) count++;
    runsToFirst[i] = count + 1;
  }

  const hitCount = successInN.reduce((a, b) => a + b, 0);
  const hitPct = (hitCount / t) * 100;
  const expected = 1 / p;

  const sorted = runsToFirst.slice().sort((a, b) => a - b);
  const p10 = percentile(sorted, 10);
  const p50 = percentile(sorted, 50);
  const p90 = percentile(sorted, 90);

  return { hitPct, expected, p10, p50, p90, sorted };
}

// ---------------------------------------------------------------------------
// describe: percentile helper
// ---------------------------------------------------------------------------

describe('percentile', () => {
  it('returns the first element for p=0 (floor-clamped)', () => {
    const sorted = [1, 2, 3, 4, 5];
    // Math.max(0, ceil(5*0/100)-1) = Math.max(0,-1) = 0
    expect(percentile(sorted, 0)).toBe(1);
  });

  it('returns the last element for p=100', () => {
    const sorted = [1, 2, 3, 4, 5];
    expect(percentile(sorted, 100)).toBe(5);
  });

  it('returns the median for p=50 on an odd-length array', () => {
    const sorted = [1, 2, 3, 4, 5];
    // ceil(5*50/100)-1 = ceil(2.5)-1 = 3-1 = 2  → sorted[2] = 3
    expect(percentile(sorted, 50)).toBe(3);
  });

  it('returns the 10th percentile element for p=10', () => {
    const sorted = Array.from({ length: 10 }, (_, i) => i + 1); // [1..10]
    // ceil(10*10/100)-1 = ceil(1)-1 = 0 → sorted[0] = 1
    expect(percentile(sorted, 10)).toBe(1);
  });

  it('returns the 90th percentile element for p=90', () => {
    const sorted = Array.from({ length: 10 }, (_, i) => i + 1); // [1..10]
    // ceil(10*90/100)-1 = ceil(9)-1 = 8 → sorted[8] = 9
    expect(percentile(sorted, 90)).toBe(9);
  });

  it('handles a single-element array for any p', () => {
    expect(percentile([42], 10)).toBe(42);
    expect(percentile([42], 50)).toBe(42);
    expect(percentile([42], 90)).toBe(42);
  });
});

// ---------------------------------------------------------------------------
// describe: edge cases — empty / single-item / 100% tables
// ---------------------------------------------------------------------------

describe('runMonteCarlo — edge cases', () => {
  it('100% probability: hitPct = 100, expected = 1, all sorted entries = 1', () => {
    const rng = mulberry32(1234);
    const result = runMonteCarlo(100, 10, 100, rng);
    expect(result.hitPct).toBe(100);
    expect(result.expected).toBe(1);
    expect(result.p50).toBe(1);
    expect(result.sorted.every((v) => v === 1)).toBe(true);
  });

  it('0% probability: hitPct = 0, expected = Infinity, sorted entries = Infinity', () => {
    const rng = mulberry32(1234);
    const result = runMonteCarlo(0, 10, 100, rng);
    expect(result.hitPct).toBe(0);
    expect(result.expected).toBe(Infinity);
    expect(result.sorted.every((v) => v === Infinity)).toBe(true);
  });

  it('single-item table (100%): every trial hits in run 1', () => {
    // A table with exactly one item at 100% — like a guaranteed drop
    const rng = mulberry32(5678);
    const result = runMonteCarlo(100, 1, 50, rng);
    expect(result.hitPct).toBe(100);
    expect(result.p10).toBe(1);
    expect(result.p50).toBe(1);
    expect(result.p90).toBe(1);
  });
});

// ---------------------------------------------------------------------------
// describe: Monte Carlo math correctness (10k+ trials, tolerance check)
// ---------------------------------------------------------------------------

describe('runMonteCarlo — probability convergence', () => {
  const TRIALS = 10_000;
  const TOLERANCE_PCT = 3; // ±3 percentage points at 10k trials

  it.each([
    // [label, pct, nRuns, expectedHitPct formula description]
    ['10% drop, 1 run → ~10% hit', 10, 1, 10],
    ['10% drop, 10 runs → ~65.1% hit (1-(0.9^10))', 10, 10, 65.1],
    ['25% drop, 4 runs → ~68.4% hit (1-(0.75^4))', 25, 4, 68.4],
    ['50% drop, 1 run → ~50% hit', 50, 1, 50],
    ['2% drop, 1 run → ~2% hit (intact relic rate)', 2, 1, 2],
  ] as const)(
    '%s',
    (
      _label: string,
      pct: number,
      nRuns: number,
      expectedHitPct: number,
    ) => {
      const rng = mulberry32(42);
      const result = runMonteCarlo(pct, nRuns, TRIALS, rng);
      expect(result.hitPct).toBeGreaterThan(expectedHitPct - TOLERANCE_PCT);
      expect(result.hitPct).toBeLessThan(expectedHitPct + TOLERANCE_PCT);
    },
  );

  it('expected value E[X] = 1/p matches analytical result', () => {
    const rng = mulberry32(99);
    const result = runMonteCarlo(10, 1, TRIALS, rng);
    // E[X] for geometric distribution with p=0.1 is 10
    expect(result.expected).toBe(10);
  });

  it('median (p50) of geometric(p=0.5) is 1', () => {
    // For p=0.5, the probability of needing just 1 run is 50%, so median=1
    const rng = mulberry32(111);
    const result = runMonteCarlo(50, 1, TRIALS, rng);
    expect(result.p50).toBe(1);
  });

  it('p10 <= p50 <= p90 ordering is maintained', () => {
    const rng = mulberry32(222);
    const result = runMonteCarlo(10, 1, TRIALS, rng);
    expect(result.p10).toBeLessThanOrEqual(result.p50);
    expect(result.p50).toBeLessThanOrEqual(result.p90);
  });

  it('sorted array has length equal to trial count', () => {
    const rng = mulberry32(333);
    const result = runMonteCarlo(5, 1, 5_000, rng);
    expect(result.sorted).toHaveLength(5_000);
  });
});

// ---------------------------------------------------------------------------
// describe: relic refinement modifier math
// ---------------------------------------------------------------------------

describe('relic refinement modifier — rate constants', () => {
  // The drop-tables.ts documents the per-refinement rare-slot probabilities.
  // These tests verify the constants are set correctly and in ascending order.

  const INTACT_RARE_PCT = 2.01;
  const EXCEPT_RARE_PCT = 4.0;
  const FLAWLESS_RARE_PCT = 5.17;
  const RADIANT_RARE_PCT = 10.0;

  it('intact < exceptional < flawless < radiant (ascending order)', () => {
    expect(INTACT_RARE_PCT).toBeLessThan(EXCEPT_RARE_PCT);
    expect(EXCEPT_RARE_PCT).toBeLessThan(FLAWLESS_RARE_PCT);
    expect(FLAWLESS_RARE_PCT).toBeLessThan(RADIANT_RARE_PCT);
  });

  it('all relic-intact entries have rarity_pct === 2.01', () => {
    const group = DROP_GROUPS.find((g) => g.category === 'relic-intact');
    expect(group).toBeDefined();
    for (const entry of group!.entries) {
      expect(entry.rarity_pct).toBeCloseTo(INTACT_RARE_PCT, 5);
    }
  });

  it('all relic-exceptional entries have rarity_pct === 4.0', () => {
    const group = DROP_GROUPS.find((g) => g.category === 'relic-exceptional');
    expect(group).toBeDefined();
    for (const entry of group!.entries) {
      expect(entry.rarity_pct).toBeCloseTo(EXCEPT_RARE_PCT, 5);
    }
  });

  it('all relic-flawless entries have rarity_pct === 5.17', () => {
    const group = DROP_GROUPS.find((g) => g.category === 'relic-flawless');
    expect(group).toBeDefined();
    for (const entry of group!.entries) {
      expect(entry.rarity_pct).toBeCloseTo(FLAWLESS_RARE_PCT, 5);
    }
  });

  it('all relic-radiant entries have rarity_pct === 10.0', () => {
    const group = DROP_GROUPS.find((g) => g.category === 'relic-radiant');
    expect(group).toBeDefined();
    for (const entry of group!.entries) {
      expect(entry.rarity_pct).toBeCloseTo(RADIANT_RARE_PCT, 5);
    }
  });

  it('radiant rare rate is ~5x intact rare rate', () => {
    // Warframe wiki spec: radiant ~5x intact improvement
    const ratio = RADIANT_RARE_PCT / INTACT_RARE_PCT;
    expect(ratio).toBeGreaterThan(4.5);
    expect(ratio).toBeLessThan(5.5);
  });
});

// ---------------------------------------------------------------------------
// describe: drop-tables data integrity
// ---------------------------------------------------------------------------

describe('drop-tables data integrity', () => {
  it('DROP_GROUPS is non-empty', () => {
    expect(DROP_GROUPS.length).toBeGreaterThan(0);
  });

  it('ALL_ENTRIES contains all entries from all groups', () => {
    const total = DROP_GROUPS.reduce((sum, g) => sum + g.entries.length, 0);
    expect(ALL_ENTRIES.length).toBe(total);
  });

  it('every entry has a unique id', () => {
    const ids = ALL_ENTRIES.map((e) => e.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('every entry has rarity_pct in (0, 100]', () => {
    for (const entry of ALL_ENTRIES) {
      expect(entry.rarity_pct).toBeGreaterThan(0);
      expect(entry.rarity_pct).toBeLessThanOrEqual(100);
    }
  });

  it('every entry has a non-empty name, id, context, source_url', () => {
    for (const entry of ALL_ENTRIES) {
      expect(entry.name.length).toBeGreaterThan(0);
      expect(entry.id.length).toBeGreaterThan(0);
      expect(entry.context.length).toBeGreaterThan(0);
      expect(entry.source_url.length).toBeGreaterThan(0);
    }
  });

  it('runMonteCarlo with radiant rate converges to ~10% hit per run', () => {
    // Pick any radiant entry and verify the Monte Carlo matches its rate
    const radiantGroup = DROP_GROUPS.find((g) => g.category === 'relic-radiant');
    const entry = radiantGroup!.entries[0] as DropEntry;
    const rng = mulberry32(77);
    const result = runMonteCarlo(entry.rarity_pct, 1, 10_000, rng);
    // ±3% tolerance at 10k trials
    expect(result.hitPct).toBeGreaterThan(7);
    expect(result.hitPct).toBeLessThan(13);
  });
});
