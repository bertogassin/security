/**
 * Единый API-клиент. Все вызовы к бэкенду — через этот модуль.
 * Base URL из env (VITE_API_URL) или относительный (proxy в dev).
 */

const baseUrl = import.meta.env.VITE_API_URL ?? '';

export interface NearbyParams {
  latitude: number;
  longitude: number;
  radius_km?: number;
  limit?: number;
}

export interface GuardsListResponse {
  guards: Array<Record<string, unknown>>;
  total: number;
}

export interface NearbyResponse {
  guards: Array<Record<string, unknown> & { distance_km?: number }>;
  center: { latitude: number; longitude: number };
  radius_km: number;
  bounding_box: unknown;
}

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${baseUrl}${path}`, {
    headers: { Accept: 'application/json' },
  });
  if (!res.ok) throw new Error(`API ${res.status}: ${path}`);
  return res.json() as Promise<T>;
}

/** Список охранников (без гео). */
export async function getGuards(): Promise<GuardsListResponse> {
  return get<GuardsListResponse>('/guards');
}

/** Охранники рядом с точкой. */
export async function getNearbyGuards(params: NearbyParams): Promise<NearbyResponse> {
  const sp = new URLSearchParams({
    latitude: String(params.latitude),
    longitude: String(params.longitude),
  });
  if (params.radius_km != null) sp.set('radius_km', String(params.radius_km));
  if (params.limit != null) sp.set('limit', String(params.limit));
  return get<NearbyResponse>(`/guards/nearby?${sp}`);
}

/** Один охранник по id. 404 → null. */
export async function getGuard(id: number | string): Promise<Record<string, unknown> | null> {
  try {
    return await get<Record<string, unknown>>(`/guards/${id}`);
  } catch {
    return null;
  }
}

export interface OrdersListResponse {
  orders: Array<Record<string, unknown>>;
}

/** Список заказов. */
export async function getOrders(): Promise<OrdersListResponse> {
  return get<OrdersListResponse>('/orders');
}

/** Один заказ по id. 404 → null. */
export async function getOrder(id: string): Promise<Record<string, unknown> | null> {
  try {
    return await get<Record<string, unknown>>(`/orders/${id}`);
  } catch {
    return null;
  }
}

/** Проверка доступности API. */
export async function healthCheck(): Promise<boolean> {
  try {
    const res = await fetch(`${baseUrl}/healthz`);
    return res.ok;
  } catch {
    return false;
  }
}
