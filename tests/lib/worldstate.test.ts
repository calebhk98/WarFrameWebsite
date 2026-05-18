import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

vi.mock('../../scripts/fetch', () => ({
  throttledFetch: vi.fn(),
  configureBucket: vi.fn(),
}));

import { throttledFetch } from '../../scripts/fetch';
import {
  getWorldState,
  getSorties,
  getFissures,
  getInvasions,
  getCetusCycle,
  getVallisCycle,
} from '../../src/lib/worldstate';

const fixturesDir = join(__dirname, '..', 'fixtures', 'worldstate');

async function loadFixture<T>(name: string): Promise<T> {
  const text = await readFile(join(fixturesDir, name), 'utf8');
  return JSON.parse(text) as T;
}

const mockFetch = vi.mocked(throttledFetch);

beforeEach(() => {
  mockFetch.mockReset();
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('getWorldState', () => {
  it('fetches the PC worldstate by default', async () => {
    const fixture = await loadFixture<Record<string, unknown>>('worldstate.pc.json');
    mockFetch.mockResolvedValueOnce(fixture);

    const ws = await getWorldState();

    expect(mockFetch).toHaveBeenCalledTimes(1);
    const [url, opts] = mockFetch.mock.calls[0]!;
    expect(url).toContain('api.warframestat.us');
    expect(url).toContain('/pc');
    expect(opts).toMatchObject({ bucket: 'warframestat' });
    expect(ws.timestamp).toBe('2026-05-18T12:00:00.000Z');
    expect(ws.sortie.boss).toBe('General Sargas Ruk');
  });

  it('honors the platform option', async () => {
    const fixture = await loadFixture<Record<string, unknown>>('worldstate.pc.json');
    mockFetch.mockResolvedValueOnce(fixture);

    await getWorldState({ platform: 'ps4' });

    const [url] = mockFetch.mock.calls[0]!;
    expect(url).toContain('/ps4');
  });
});

describe('getSorties', () => {
  it('returns the current sortie parsed from the API', async () => {
    const fixture = await loadFixture<Record<string, unknown>>('sorties.json');
    mockFetch.mockResolvedValueOnce(fixture);

    const result = await getSorties();

    expect(result).toHaveLength(1);
    const sortie = result[0]!;
    expect(sortie.boss).toBe('Lieutenant Lech Kril');
    expect(sortie.variants).toHaveLength(3);
    expect(sortie.variants[0]!.missionType).toBe('Exterminate');
  });
});

describe('getFissures', () => {
  it('returns fissure list typed with tier info', async () => {
    const fixture = await loadFixture<unknown[]>('fissures.json');
    mockFetch.mockResolvedValueOnce(fixture);

    const fissures = await getFissures();

    expect(fissures).toHaveLength(3);
    expect(fissures[0]!.tier).toBe('Lith');
    expect(fissures[1]!.isHard).toBe(true);
    expect(fissures[2]!.isStorm).toBe(true);
  });
});

describe('getInvasions', () => {
  it('returns invasions with attacker/defender rewards', async () => {
    const fixture = await loadFixture<unknown[]>('invasions.json');
    mockFetch.mockResolvedValueOnce(fixture);

    const invasions = await getInvasions();

    expect(invasions).toHaveLength(2);
    expect(invasions[0]!.attacker.faction).toBe('Grineer');
    expect(invasions[0]!.attacker.reward.asString).toBe('Orokin Cell x3');
    expect(invasions[0]!.completion).toBeCloseTo(42.5);
  });
});

describe('getCetusCycle', () => {
  it('returns the Cetus day/night cycle', async () => {
    const fixture = await loadFixture<Record<string, unknown>>('cetusCycle.json');
    mockFetch.mockResolvedValueOnce(fixture);

    const cycle = await getCetusCycle();

    expect(cycle.isDay).toBe(true);
    expect(cycle.state).toBe('day');
    expect(cycle.expiry).toBe('2026-05-18T13:30:00.000Z');
  });
});

describe('getVallisCycle', () => {
  it('returns the Orb Vallis warm/cold cycle', async () => {
    const fixture = await loadFixture<Record<string, unknown>>('vallisCycle.json');
    mockFetch.mockResolvedValueOnce(fixture);

    const cycle = await getVallisCycle();

    expect(cycle.isWarm).toBe(false);
    expect(cycle.state).toBe('cold');
    expect(cycle.expiry).toBe('2026-05-18T12:20:00.000Z');
  });
});

describe('worldstate clients do not call live network', () => {
  it('mocked throttledFetch is the only network surface', async () => {
    const fixture = await loadFixture<Record<string, unknown>>('cetusCycle.json');
    mockFetch.mockResolvedValueOnce(fixture);
    await getCetusCycle();
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });
});
