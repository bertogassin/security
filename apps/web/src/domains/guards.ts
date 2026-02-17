/**
 * Домен Guards — типы для охранников (camelCase в приложении).
 * API отдаёт snake_case; нормализация — в shared/normalizers.ts.
 */

export interface GuardItem {
  id: number;
  name: string;
  phone?: string;
  avatarUrl?: string;
  rating: number;
  totalReviews: number;
  /** 0–4 для UI (Badge, GuardCard). */
  verificationLevel: number;
  distanceKm?: number;
  hourlyRate: number;
  isAvailable: boolean;
  isOnline: boolean;
  specializations?: string[];
  experienceYears?: number;
  completedOrders?: number;
  bio?: string;
}

export interface GuardReview {
  id: number;
  author: string;
  rating: number;
  text: string;
  date: string;
}

export interface GuardDetail extends GuardItem {
  reviews?: GuardReview[];
}

/** Строковый уровень из API → число 0–4. */
export function verificationLevelToNumber(level: string): number {
  const map: Record<string, number> = {
    none: 0,
    basic: 1,
    standard: 2,
    premium: 3,
    elite: 4,
  };
  return map[level.toLowerCase()] ?? 0;
}

/** Подпись уровня верификации для отображения. */
export function verificationLabel(level: number): string {
  switch (level) {
    case 4:
      return 'Elite';
    case 3:
      return 'Premium';
    case 2:
      return 'Verified';
    case 1:
      return 'Basic';
    default:
      return '';
  }
}
