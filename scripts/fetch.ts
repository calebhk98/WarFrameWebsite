import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';

export interface FetchOptions {
  ttlMs?: number;
  cacheKey?: string;
  forceRefresh?: boolean;
  headers?: Record<string, string>;
  method?: 'GET' | 'POST';
  body?: unknown;
  bucket?: string;
}

interface BucketConfig {
  ratePerSec: number;
  burst: number;
}

interface BucketState {
  tokens: number;
  lastRefill: number;
  queue: Promise<void>;
}

const DEFAULT_TTL_MS = 5 * 60_000;
const DEFAULT_BUCKET = 'default';
const MAX_RETRIES = 3;
const BACKOFF_BASE_MS = 25;

const defaultBuckets: Record<string, BucketConfig> = {
  default: { ratePerSec: 3, burst: 3 },
  warframestat: { ratePerSec: 3, burst: 3 },
  market: { ratePerSec: 3, burst: 3 },
  wiki: { ratePerSec: 1, burst: 1 },
};

const buckets = new Map<string, { config: BucketConfig; state: BucketState }>();
let cacheDir: string = resolve(process.cwd(), 'data', 'cache');

function bucketFor(name: string): { config: BucketConfig; state: BucketState } {
  let entry = buckets.get(name);
  if (entry) return entry;
  const config = defaultBuckets[name] ?? defaultBuckets.default!;
  entry = {
    config: { ...config },
    state: { tokens: config.burst, lastRefill: Date.now(), queue: Promise.resolve() },
  };
  buckets.set(name, entry);
  return entry;
}

export function configureBucket(
  name: string,
  opts: { ratePerSec: number; burst?: number },
): void {
  const burst = opts.burst ?? Math.max(1, Math.ceil(opts.ratePerSec));
  const config: BucketConfig = { ratePerSec: opts.ratePerSec, burst };
  buckets.set(name, {
    config,
    state: { tokens: burst, lastRefill: Date.now(), queue: Promise.resolve() },
  });
}

export function resetBuckets(): void {
  buckets.clear();
}

export function setCacheDir(dir: string): void {
  cacheDir = dir;
}

export function getCacheDir(): string {
  return cacheDir;
}

export function __resetForTests(): void {
  resetBuckets();
}

function sleep(ms: number): Promise<void> {
  return new Promise(r => setTimeout(r, Math.max(0, ms)));
}

async function acquireToken(name: string): Promise<void> {
  const entry = bucketFor(name);
  const release = entry.state.queue;
  let done!: () => void;
  entry.state.queue = new Promise<void>(r => {
    done = r;
  });
  await release;
  try {
    const { config, state } = entry;
    const now = Date.now();
    const elapsedSec = (now - state.lastRefill) / 1000;
    state.tokens = Math.min(config.burst, state.tokens + elapsedSec * config.ratePerSec);
    state.lastRefill = now;
    if (state.tokens < 1) {
      const waitMs = Math.ceil(((1 - state.tokens) / config.ratePerSec) * 1000);
      await sleep(waitMs);
      const after = Date.now();
      const refill = ((after - state.lastRefill) / 1000) * config.ratePerSec;
      state.tokens = Math.min(config.burst, state.tokens + refill);
      state.lastRefill = after;
    }
    state.tokens -= 1;
  } finally {
    done();
  }
}

function hashKey(input: string): string {
  return createHash('sha256').update(input).digest('hex');
}

function defaultCacheKey(url: string, method: string, body: unknown): string {
  const bodyStr = body === undefined ? '' : JSON.stringify(body);
  return `${method}\n${url}\n${bodyStr}`;
}

function cachePath(bucket: string, key: string): string {
  return join(cacheDir, bucket, `${hashKey(key)}.json`);
}

interface CacheEntry<T> {
  cachedAt: number;
  ttlMs: number;
  url: string;
  status: number;
  body: T;
}

async function readCache<T>(path: string): Promise<CacheEntry<T> | null> {
  try {
    const text = await readFile(path, 'utf8');
    return JSON.parse(text) as CacheEntry<T>;
  } catch {
    return null;
  }
}

async function writeCache<T>(path: string, entry: CacheEntry<T>): Promise<void> {
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, JSON.stringify(entry), 'utf8');
}

function parseRetryAfter(value: string | null): number | null {
  if (!value) return null;
  const asNum = Number(value);
  if (Number.isFinite(asNum)) return asNum * 1000;
  const asDate = Date.parse(value);
  if (Number.isFinite(asDate)) return Math.max(0, asDate - Date.now());
  return null;
}

async function parseBody<T>(res: Response): Promise<T> {
  const ct = res.headers.get('content-type') ?? '';
  const clone = typeof res.clone === 'function' ? res.clone() : res;
  if (ct.includes('application/json')) return (await clone.json()) as T;
  const text = await clone.text();
  try {
    return JSON.parse(text) as T;
  } catch {
    return text as unknown as T;
  }
}

interface DoFetchArgs {
  url: string;
  method: string;
  headers: Record<string, string>;
  body: unknown;
  bucket: string;
}

async function doFetchOnce<T>(
  args: DoFetchArgs,
): Promise<{ status: number; body: T; res: Response }> {
  await acquireToken(args.bucket);
  const init: RequestInit = { method: args.method, headers: args.headers };
  if (args.body !== undefined && args.method !== 'GET') {
    init.body = typeof args.body === 'string' ? args.body : JSON.stringify(args.body);
  }
  const res = await fetch(args.url, init);
  const body = await parseBody<T>(res);
  return { status: res.status, body, res };
}

function isRetriable(status: number): boolean {
  return status === 429 || status >= 500;
}

async function fetchWithRetry<T>(args: DoFetchArgs): Promise<{ status: number; body: T }> {
  let lastError: unknown;
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt += 1) {
    try {
      const { status, body, res } = await doFetchOnce<T>(args);
      if (status >= 200 && status < 300) return { status, body };
      if (!isRetriable(status)) {
        throw new Error(`HTTP ${status} for ${args.url}`);
      }
      if (attempt === MAX_RETRIES) {
        throw new Error(`HTTP ${status} after ${attempt + 1} attempts for ${args.url}`);
      }
      const retryAfter = parseRetryAfter(res.headers.get('retry-after'));
      const backoff = retryAfter ?? BACKOFF_BASE_MS * Math.pow(2, attempt);
      await sleep(backoff);
    } catch (err) {
      lastError = err;
      const msg = err instanceof Error ? err.message : String(err);
      if (msg.startsWith('HTTP ') && !msg.includes('attempts')) throw err;
      if (attempt === MAX_RETRIES) break;
      await sleep(BACKOFF_BASE_MS * Math.pow(2, attempt));
    }
  }
  throw lastError instanceof Error ? lastError : new Error(String(lastError));
}

export async function throttledFetch<T>(url: string, opts: FetchOptions = {}): Promise<T> {
  const method = opts.method ?? 'GET';
  const bucket = opts.bucket ?? DEFAULT_BUCKET;
  const ttlMs = opts.ttlMs ?? DEFAULT_TTL_MS;
  const cacheKey = opts.cacheKey ?? defaultCacheKey(url, method, opts.body);
  const path = cachePath(bucket, cacheKey);

  if (!opts.forceRefresh) {
    const cached = await readCache<T>(path);
    if (cached && cached.cachedAt + cached.ttlMs > Date.now()) {
      return cached.body;
    }
  }

  const { status, body } = await fetchWithRetry<T>({
    url,
    method,
    headers: opts.headers ?? {},
    body: opts.body,
    bucket,
  });

  await writeCache<T>(path, {
    cachedAt: Date.now(),
    ttlMs,
    url,
    status,
    body,
  });
  return body;
}
