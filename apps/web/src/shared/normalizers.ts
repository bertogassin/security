/**
 * Нормализация ответов API (snake_case) в доменные модели (camelCase).
 * Единая точка маппинга — все страницы используют только эти функции.
 */

import { verificationLevelToNumber } from '../domains/guards';
import type { GuardItem, GuardDetail, GuardReview } from '../domains/guards';
import type { OrderItem } from './ordersData';

function toNum(v: unknown): number {
  if (v == null) return 0;
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

function toStr(v: unknown): string {
  return v != null ? String(v) : '';
}

/** API guard (snake_case) → GuardItem (camelCase). */
export function apiGuardToItem(raw: Record<string, unknown>): GuardItem {
  const g = raw;
  return {
    id: toNum(g.id),
    name: toStr(g.name),
    phone: g.phone != null ? toStr(g.phone) : undefined,
    avatarUrl: g.avatar_url != null ? toStr(g.avatar_url) : undefined,
    rating: toNum(g.rating),
    totalReviews: toNum(g.total_reviews),
    verificationLevel: verificationLevelToNumber(toStr(g.verification_level)),
    distanceKm: g.distance_km != null ? toNum(g.distance_km) : undefined,
    hourlyRate: toNum(g.hourly_rate),
    isAvailable: Boolean(g.is_available ?? true),
    isOnline: Boolean(g.is_online ?? true),
    specializations: Array.isArray(g.specializations) ? (g.specializations as unknown[]).map(toStr) : undefined,
    experienceYears: g.experience_years != null ? toNum(g.experience_years) : undefined,
    completedOrders: g.completed_orders != null ? toNum(g.completed_orders) : undefined,
    bio: g.bio != null ? toStr(g.bio) : undefined,
  };
}

/** API guard → GuardDetail (camelCase), для страницы карточки. */
export function apiGuardToDetail(raw: Record<string, unknown>): GuardDetail {
  const item = apiGuardToItem(raw);
  const g = raw;
  const reviews = Array.isArray(g.reviews)
    ? (g.reviews as unknown[]).map((r: unknown) => {
        const x = r as Record<string, unknown>;
        return {
          id: toNum(x.id),
          author: toStr(x.author),
          rating: toNum(x.rating),
          text: toStr(x.text),
          date: toStr(x.date),
        } as GuardReview;
      })
    : undefined;
  return { ...item, reviews };
}

/** API order (snake_case) → OrderItem (camelCase). */
export function apiOrderToItem(raw: Record<string, unknown>): OrderItem {
  const guard = raw.guard as Record<string, unknown> | undefined;
  return {
    id: toStr(raw.id),
    status: ((raw.status as OrderItem['status']) ?? 'new') as OrderItem['status'],
    serviceType: toStr(raw.service_type ?? raw.serviceType),
    address: toStr(raw.address),
    price: toNum(raw.price),
    createdAt: toStr(raw.created_at ?? raw.createdAt),
    scheduledAt: raw.scheduled_at != null ? toStr(raw.scheduled_at) : undefined,
    guard: guard
      ? {
          name: toStr(guard.name),
          rating: toNum(guard.rating),
          phone: guard.phone != null ? toStr(guard.phone) : undefined,
        }
      : undefined,
  };
}
