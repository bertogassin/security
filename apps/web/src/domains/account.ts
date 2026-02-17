/**
 * Домен: безопасность аккаунта — сессии, 2FA, устройства.
 * Только контракты (типы). Логика — в features/account.
 * @see docs/ACCOUNT_SECURITY.md
 */

export interface Session {
  id: string;
  device?: string;
  browser?: string;
  ip?: string;
  createdAt: string;
  lastActiveAt: string;
  isCurrent?: boolean;
}

export type MfaMethod = 'totp' | 'sms' | 'email';
export type MfaStatus = 'disabled' | 'enabled' | 'pending';

export interface MfaState {
  status: MfaStatus;
  method?: MfaMethod;
  enrolledAt?: string;
}

export interface TrustedDevice {
  id: string;
  name?: string;
  lastUsedAt: string;
  sessionId?: string;
}
