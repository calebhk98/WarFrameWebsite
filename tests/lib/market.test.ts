import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

vi.mock('../../scripts/fetch', () => ({
  throttledFetch: vi.fn(),
  configureBucket: vi.fn(),
}));

import { throttledFetch } from '../../scripts/fetch';
import {
  getItemListings,
  getItemStats,
  searchItems,
} from '../../src/lib/market';

const fixturesDir = join(__dirname, '..', 'fixtures', 'market');

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

describe('getItemListings', () => {
  it('fetches orders for a slug and returns sell + buy orders', async () => {
    const fixture = await loadFixture<Record<string, unknown>>(
      'orders.mag-prime-set.json',
    );
    mockFetch.mockResolvedValueOnce(fixture);

    const listings = await getItemListings('mag_prime_set');

    expect(mockFetch).toHaveBeenCalledTimes(1);
    const [url, opts] = mockFetch.mock.calls[0]!;
    expect(url).toContain('api.warframe.market');
    expect(url).toContain('/items/mag_prime_set/orders');
    expect(opts).toMatchObject({ bucket: 'market' });

    expect(listings.sell).toHaveLength(2);
    expect(listings.buy).toHaveLength(1);
    expect(listings.sell[0]!.platinum).toBe(120);
    expect(listings.sell[0]!.user.ingameName).toBe('TestSellerA');
    expect(listings.buy[0]!.platinum).toBe(100);
  });

  it('passes the language and platform headers', async () => {
    const fixture = await loadFixture<Record<string, unknown>>(
      'orders.mag-prime-set.json',
    );
    mockFetch.mockResolvedValueOnce(fixture);

    await getItemListings('mag_prime_set');

    const [, opts] = mockFetch.mock.calls[0]!;
    expect(opts?.headers).toMatchObject({
      language: 'en',
      platform: 'pc',
      accept: 'application/json',
    });
  });
});

describe('getItemStats', () => {
  it('returns the 48h closed statistics', async () => {
    const fixture = await loadFixture<Record<string, unknown>>(
      'statistics.mag-prime-set.json',
    );
    mockFetch.mockResolvedValueOnce(fixture);

    const stats = await getItemStats('mag_prime_set');

    const [url] = mockFetch.mock.calls[0]!;
    expect(url).toContain('/items/mag_prime_set/statistics');

    expect(stats.fortyEightHours).toHaveLength(2);
    expect(stats.fortyEightHours[0]!.avgPrice).toBeCloseTo(118.5);
    expect(stats.fortyEightHours[1]!.volume).toBe(19);
    expect(stats.fortyEightHours[1]!.median).toBe(120);
  });
});

describe('searchItems', () => {
  it('filters the catalogue by query string (case insensitive)', async () => {
    const fixture = await loadFixture<Record<string, unknown>>('items.json');
    mockFetch.mockResolvedValueOnce(fixture);

    const matches = await searchItems('mag prime');

    const [url] = mockFetch.mock.calls[0]!;
    expect(url).toContain('/items');

    expect(matches.map(m => m.urlName)).toEqual([
      'mag_prime_set',
      'mag_prime_neuroptics',
      'mag_prime_chassis',
    ]);
    expect(matches[0]!.itemName).toBe('Mag Prime Set');
  });

  it('returns an empty array when no items match', async () => {
    const fixture = await loadFixture<Record<string, unknown>>('items.json');
    mockFetch.mockResolvedValueOnce(fixture);

    const matches = await searchItems('nonexistent-weapon-xyz');
    expect(matches).toHaveLength(0);
  });
});

describe('market clients do not hit live network', () => {
  it('only the mocked throttledFetch is used', async () => {
    const fixture = await loadFixture<Record<string, unknown>>(
      'orders.mag-prime-set.json',
    );
    mockFetch.mockResolvedValueOnce(fixture);
    await getItemListings('mag_prime_set');
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });
});
