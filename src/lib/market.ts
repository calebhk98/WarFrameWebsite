import { throttledFetch } from '../../scripts/fetch';

const BASE_URL = 'https://api.warframe.market/v1';
const BUCKET = 'market';
const TTL_MS = 10 * 60_000;

const DEFAULT_HEADERS: Record<string, string> = {
  language: 'en',
  platform: 'pc',
  accept: 'application/json',
};

export type OrderType = 'buy' | 'sell';
export type UserStatus = 'ingame' | 'online' | 'offline' | string;

export interface MarketUser {
  id: string;
  ingameName: string;
  status: UserStatus;
  region: string;
  reputation: number;
  lastSeen: string;
}

export interface MarketOrder {
  id: string;
  platinum: number;
  quantity: number;
  orderType: OrderType;
  platform: string;
  region: string;
  creationDate: string;
  lastUpdate: string;
  visible: boolean;
  user: MarketUser;
}

export interface MarketListings {
  sell: MarketOrder[];
  buy: MarketOrder[];
}

export interface MarketStatPoint {
  datetime: string;
  volume: number;
  minPrice: number;
  maxPrice: number;
  avgPrice: number;
  waPrice: number;
  median: number;
  movingAvg: number;
  openPrice: number;
  closedPrice: number;
  donchTop: number;
  donchBot: number;
  id: string;
  orderType: 'closed' | string;
}

export interface MarketStats {
  fortyEightHours: MarketStatPoint[];
}

export interface MarketItem {
  id: string;
  urlName: string;
  thumb: string;
  itemName: string;
}

interface RawOrder {
  id: string;
  platinum: number;
  quantity: number;
  order_type: OrderType;
  platform: string;
  region: string;
  creation_date: string;
  last_update: string;
  visible: boolean;
  user: {
    id: string;
    ingame_name: string;
    status: UserStatus;
    region: string;
    reputation: number;
    last_seen: string;
  };
}

interface RawStatPoint {
  datetime: string;
  volume: number;
  min_price: number;
  max_price: number;
  avg_price: number;
  wa_price: number;
  median: number;
  moving_avg: number;
  open_price: number;
  closed_price: number;
  donch_top: number;
  donch_bot: number;
  id: string;
  order_type: string;
}

interface RawItem {
  id: string;
  url_name: string;
  thumb: string;
  item_name: string;
}

interface OrdersResponse {
  payload: { orders: RawOrder[] };
}

interface StatsResponse {
  payload: {
    statistics_closed: { '48hours': RawStatPoint[] };
    statistics_live?: { '48hours': RawStatPoint[] };
  };
}

interface ItemsResponse {
  payload: { items: RawItem[] };
}

function fetchEndpoint<T>(path: string): Promise<T> {
  return throttledFetch<T>(`${BASE_URL}${path}`, {
    bucket: BUCKET,
    ttlMs: TTL_MS,
    headers: DEFAULT_HEADERS,
  });
}

function mapOrder(raw: RawOrder): MarketOrder {
  return {
    id: raw.id,
    platinum: raw.platinum,
    quantity: raw.quantity,
    orderType: raw.order_type,
    platform: raw.platform,
    region: raw.region,
    creationDate: raw.creation_date,
    lastUpdate: raw.last_update,
    visible: raw.visible,
    user: {
      id: raw.user.id,
      ingameName: raw.user.ingame_name,
      status: raw.user.status,
      region: raw.user.region,
      reputation: raw.user.reputation,
      lastSeen: raw.user.last_seen,
    },
  };
}

function mapStatPoint(raw: RawStatPoint): MarketStatPoint {
  return {
    datetime: raw.datetime,
    volume: raw.volume,
    minPrice: raw.min_price,
    maxPrice: raw.max_price,
    avgPrice: raw.avg_price,
    waPrice: raw.wa_price,
    median: raw.median,
    movingAvg: raw.moving_avg,
    openPrice: raw.open_price,
    closedPrice: raw.closed_price,
    donchTop: raw.donch_top,
    donchBot: raw.donch_bot,
    id: raw.id,
    orderType: raw.order_type,
  };
}

function mapItem(raw: RawItem): MarketItem {
  return {
    id: raw.id,
    urlName: raw.url_name,
    thumb: raw.thumb,
    itemName: raw.item_name,
  };
}

export async function getItemListings(slug: string): Promise<MarketListings> {
  const res = await fetchEndpoint<OrdersResponse>(`/items/${slug}/orders`);
  const orders = res.payload.orders.map(mapOrder);
  return {
    sell: orders.filter(o => o.orderType === 'sell'),
    buy: orders.filter(o => o.orderType === 'buy'),
  };
}

export async function getItemStats(slug: string): Promise<MarketStats> {
  const res = await fetchEndpoint<StatsResponse>(`/items/${slug}/statistics`);
  const closed = res.payload.statistics_closed['48hours'] ?? [];
  return { fortyEightHours: closed.map(mapStatPoint) };
}

export async function searchItems(query: string): Promise<MarketItem[]> {
  const res = await fetchEndpoint<ItemsResponse>(`/items`);
  const needle = query.trim().toLowerCase();
  if (!needle) return res.payload.items.map(mapItem);
  return res.payload.items
    .filter(i => i.item_name.toLowerCase().includes(needle))
    .map(mapItem);
}
