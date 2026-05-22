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
  missionTypeKey?: string;
  modifier: string;
  modifierDescription: string;
  node: string;
  nodeKey?: string;
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

export interface ArchonMission {
  type: string;
  typeKey?: string;
  node: string;
  nodeKey?: string;
  modifier?: string;
  modifierDescription?: string;
}

export interface ArchonHunt {
  id: string;
  activation: string;
  expiry: string;
  boss: string;
  faction: string;
  expired?: boolean;
  missions: ArchonMission[];
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
  reward: { asString?: string; countedItems?: Array<{ count: number; type: string }> };
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

export interface CambionCycle {
  id?: string;
  activation?: string;
  expiry: string;
  active: 'vome' | 'fass' | string;
  timeLeft: string;
  shortString?: string;
}

export interface ZarimanCycle {
  id?: string;
  activation?: string;
  expiry: string;
  state: 'grineer' | 'corpus' | string;
  timeLeft: string;
  shortString?: string;
}

export interface NightwaveAct {
  id: string;
  activation?: string;
  expiry?: string;
  challenge: string;
  desc: string;
  reputation: number;
  isDaily?: boolean;
  isElite?: boolean;
  active?: boolean;
}

export interface Nightwave {
  id: string;
  activation: string;
  expiry: string;
  season: number;
  tag: string;
  phase: number;
  active: boolean;
  activeChallenges: NightwaveAct[];
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

export async function getArchonHunt(): Promise<ArchonHunt | null> {
  try {
    return await fetchEndpoint<ArchonHunt>(`/pc/archonHunt`);
  } catch {
    return null;
  }
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

export async function getCambionCycle(): Promise<CambionCycle | null> {
  try {
    return await fetchEndpoint<CambionCycle>(`/pc/cambionCycle`);
  } catch {
    return null;
  }
}

export async function getZarimanCycle(): Promise<ZarimanCycle | null> {
  try {
    return await fetchEndpoint<ZarimanCycle>(`/pc/zarimanCycle`);
  } catch {
    return null;
  }
}

export async function getNightwave(): Promise<Nightwave | null> {
  try {
    return await fetchEndpoint<Nightwave>(`/pc/nightwave`);
  } catch {
    return null;
  }
}
