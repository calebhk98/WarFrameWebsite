import { throttledFetch } from '../../scripts/fetch';

const BASE_URL = 'https://api.warframestat.us';
const BUCKET = 'warframestat';
const TTL_MS = 5 * 60_000;

export type Platform = 'pc' | 'ps4' | 'xb1' | 'swi';

export interface NewsItem {
  id: string;
  message: string;
  link: string;
  date: string;
}

export interface SortieVariant {
  missionType: string;
  modifier: string;
  modifierDescription: string;
  node: string;
}

export interface Sortie {
  id: string;
  activation: string;
  expiry: string;
  boss: string;
  faction: string;
  expired?: boolean;
  eta?: string;
  rewardPool?: string;
  variants: SortieVariant[];
}

export type FissureTier = 'Lith' | 'Meso' | 'Neo' | 'Axi' | 'Requiem' | 'Omnia';

export interface Fissure {
  id: string;
  activation: string;
  expiry: string;
  node: string;
  missionType: string;
  enemy: string;
  tier: FissureTier | string;
  tierNum: number;
  expired: boolean;
  isStorm?: boolean;
  isHard?: boolean;
}

export interface InvasionSide {
  faction: string;
  reward: { asString: string };
}

export interface Invasion {
  id: string;
  activation: string;
  node: string;
  desc: string;
  attacker: InvasionSide;
  defender: InvasionSide;
  completion: number;
  completed: boolean;
  eta?: string;
}

export interface DayNightCycle {
  id: string;
  activation?: string;
  expiry: string;
  isDay: boolean;
  state: 'day' | 'night' | string;
  timeLeft: string;
  shortString?: string;
}

export interface WarmColdCycle {
  id: string;
  activation?: string;
  expiry: string;
  isWarm: boolean;
  state: 'warm' | 'cold' | string;
  timeLeft: string;
  shortString?: string;
}

export interface WorldState {
  timestamp: string;
  news: NewsItem[];
  sortie: Sortie;
  fissures: Fissure[];
  invasions: Invasion[];
  cetusCycle: DayNightCycle;
  vallisCycle: WarmColdCycle;
}

function fetchEndpoint<T>(path: string): Promise<T> {
  return throttledFetch<T>(`${BASE_URL}${path}`, {
    bucket: BUCKET,
    ttlMs: TTL_MS,
  });
}

export async function getWorldState(
  opts: { platform?: Platform } = {},
): Promise<WorldState> {
  const platform = opts.platform ?? 'pc';
  return fetchEndpoint<WorldState>(`/${platform}`);
}

export async function getSorties(): Promise<Sortie[]> {
  const result = await fetchEndpoint<Sortie | Sortie[]>(`/pc/sortie`);
  return Array.isArray(result) ? result : [result];
}

export async function getFissures(): Promise<Fissure[]> {
  return fetchEndpoint<Fissure[]>(`/pc/fissures`);
}

export async function getInvasions(): Promise<Invasion[]> {
  return fetchEndpoint<Invasion[]>(`/pc/invasions`);
}

export async function getCetusCycle(): Promise<DayNightCycle> {
  return fetchEndpoint<DayNightCycle>(`/pc/cetusCycle`);
}

export async function getVallisCycle(): Promise<WarmColdCycle> {
  return fetchEndpoint<WarmColdCycle>(`/pc/vallisCycle`);
}
