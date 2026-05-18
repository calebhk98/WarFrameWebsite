import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { mkdtemp, readdir, rm, readFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import {
  configureBucket,
  resetBuckets,
  setCacheDir,
  throttledFetch,
  __resetForTests,
} from '../../scripts/fetch';

interface MockResponseInit {
  status?: number;
  body?: unknown;
  headers?: Record<string, string>;
}

function mockResponse(init: MockResponseInit = {}): Response {
  const status = init.status ?? 200;
  const headers = new Headers(init.headers ?? {});
  if (!headers.has('content-type')) {
    headers.set('content-type', 'application/json');
  }
  const bodyText =
    typeof init.body === 'string'
      ? init.body
      : JSON.stringify(init.body ?? {});
  return new Response(bodyText, { status, headers });
}

let cacheDir: string;
let fetchSpy: ReturnType<typeof vi.fn>;

beforeEach(async () => {
  cacheDir = await mkdtemp(join(tmpdir(), 'fetch-test-'));
  setCacheDir(cacheDir);
  resetBuckets();
  __resetForTests();
  fetchSpy = vi.fn();
  vi.stubGlobal('fetch', fetchSpy);
});

afterEach(async () => {
  vi.unstubAllGlobals();
  vi.useRealTimers();
  await rm(cacheDir, { recursive: true, force: true });
});

describe('throttledFetch — cache behavior', () => {
  it('cache miss: fetches, writes to disk, returns parsed JSON', async () => {
    fetchSpy.mockResolvedValueOnce(mockResponse({ body: { value: 42 } }));

    const result = await throttledFetch<{ value: number }>(
      'https://api.example.com/x',
      { bucket: 'test', ttlMs: 60_000 },
    );

    expect(result).toEqual({ value: 42 });
    expect(fetchSpy).toHaveBeenCalledTimes(1);

    const files = await readdir(join(cacheDir, 'test'));
    expect(files).toHaveLength(1);
    const cached = JSON.parse(
      await readFile(join(cacheDir, 'test', files[0]!), 'utf8'),
    );
    expect(cached.body).toEqual({ value: 42 });
    expect(cached.status).toBe(200);
    expect(typeof cached.cachedAt).toBe('number');
  });

  it('cache hit: returns cached value without network call', async () => {
    fetchSpy.mockResolvedValueOnce(mockResponse({ body: { value: 1 } }));
    await throttledFetch('https://api.example.com/y', {
      bucket: 'test',
      ttlMs: 60_000,
    });
    expect(fetchSpy).toHaveBeenCalledTimes(1);

    fetchSpy.mockClear();
    const second = await throttledFetch<{ value: number }>(
      'https://api.example.com/y',
      { bucket: 'test', ttlMs: 60_000 },
    );
    expect(second).toEqual({ value: 1 });
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('expired cache triggers re-fetch', async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-01-01T00:00:00Z'));

    fetchSpy.mockResolvedValueOnce(mockResponse({ body: { v: 'old' } }));
    await throttledFetch('https://api.example.com/z', {
      bucket: 'test',
      ttlMs: 1_000,
    });

    vi.setSystemTime(new Date('2026-01-01T00:00:02Z'));
    fetchSpy.mockResolvedValueOnce(mockResponse({ body: { v: 'new' } }));
    const result = await throttledFetch<{ v: string }>(
      'https://api.example.com/z',
      { bucket: 'test', ttlMs: 1_000 },
    );

    expect(result).toEqual({ v: 'new' });
    expect(fetchSpy).toHaveBeenCalledTimes(2);
  });

  it('forceRefresh: true bypasses cache', async () => {
    fetchSpy.mockResolvedValueOnce(mockResponse({ body: { v: 'a' } }));
    await throttledFetch('https://api.example.com/f', {
      bucket: 'test',
      ttlMs: 60_000,
    });

    fetchSpy.mockResolvedValueOnce(mockResponse({ body: { v: 'b' } }));
    const result = await throttledFetch<{ v: string }>(
      'https://api.example.com/f',
      { bucket: 'test', ttlMs: 60_000, forceRefresh: true },
    );

    expect(result).toEqual({ v: 'b' });
    expect(fetchSpy).toHaveBeenCalledTimes(2);
  });
});

describe('throttledFetch — retries', () => {
  it('429 triggers retry with backoff and eventually succeeds', async () => {
    fetchSpy
      .mockResolvedValueOnce(mockResponse({ status: 429 }))
      .mockResolvedValueOnce(mockResponse({ status: 503 }))
      .mockResolvedValueOnce(mockResponse({ body: { ok: true } }));

    const result = await throttledFetch<{ ok: boolean }>(
      'https://api.example.com/retry',
      { bucket: 'test', ttlMs: 60_000 },
    );

    expect(result).toEqual({ ok: true });
    expect(fetchSpy).toHaveBeenCalledTimes(3);
  });

  it('4xx (non-429) does NOT retry', async () => {
    fetchSpy.mockResolvedValueOnce(mockResponse({ status: 404 }));

    await expect(
      throttledFetch('https://api.example.com/nope', {
        bucket: 'test',
        ttlMs: 60_000,
      }),
    ).rejects.toThrow();

    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });

  it('exhausts retries on persistent 5xx and throws', async () => {
    fetchSpy.mockResolvedValue(mockResponse({ status: 500 }));

    await expect(
      throttledFetch('https://api.example.com/fail', {
        bucket: 'test',
        ttlMs: 60_000,
      }),
    ).rejects.toThrow();

    // 1 initial + 3 retries = 4 attempts
    expect(fetchSpy).toHaveBeenCalledTimes(4);
  });
});

describe('throttledFetch — token bucket', () => {
  it('different buckets are independent', async () => {
    configureBucket('bucketA', { ratePerSec: 1, burst: 1 });
    configureBucket('bucketB', { ratePerSec: 1, burst: 1 });

    fetchSpy.mockResolvedValue(mockResponse({ body: { ok: true } }));

    const start = Date.now();
    await Promise.all([
      throttledFetch('https://api.example.com/a1', {
        bucket: 'bucketA',
        ttlMs: 60_000,
      }),
      throttledFetch('https://api.example.com/b1', {
        bucket: 'bucketB',
        ttlMs: 60_000,
      }),
    ]);
    const elapsed = Date.now() - start;

    // Both should fire near-immediately since they're different buckets.
    expect(elapsed).toBeLessThan(500);
    expect(fetchSpy).toHaveBeenCalledTimes(2);
  });

  it('honors rate limit within a single bucket', async () => {
    configureBucket('slow', { ratePerSec: 10, burst: 1 });
    fetchSpy.mockResolvedValue(mockResponse({ body: { ok: true } }));

    const start = Date.now();
    await throttledFetch('https://api.example.com/s1', {
      bucket: 'slow',
      ttlMs: 60_000,
    });
    await throttledFetch('https://api.example.com/s2', {
      bucket: 'slow',
      ttlMs: 60_000,
    });
    const elapsed = Date.now() - start;

    // Second request must wait at least ~100ms (1 token / 10 per sec).
    expect(elapsed).toBeGreaterThanOrEqual(90);
    expect(fetchSpy).toHaveBeenCalledTimes(2);
  });
});
