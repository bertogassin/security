/**
 * Домен: верификация, фото, документы, дипломы.
 * Только контракты (типы). Логика — в features/verification.
 * @see docs/VERIFICATION.md
 */

export type VerificationLevel = 0 | 1 | 2 | 3 | 4;

export const VERIFICATION_LEVELS = {
  none: 0,
  basic: 1,
  standard: 2,
  premium: 3,
  elite: 4,
} as const;

export type DocumentType =
  | 'id'           // паспорт/удостоверение
  | 'license'      // лицензия охранника
  | 'contract'     // контракт с фирмой
  | 'diploma'      // диплом
  | 'certificate'  // сертификат
  | 'other';

export type DocumentStatus = 'pending' | 'verified' | 'rejected';

export interface VerificationDocument {
  id: string;
  type: DocumentType;
  name?: string;
  fileId?: string;
  url?: string;
  status: DocumentStatus;
  rejectionReason?: string;
  verifiedAt?: string;
  verifiedBy?: string;
  issuedAt?: string;
  organization?: string;
}

export interface VerificationPhoto {
  id: string;
  purpose: 'avatar' | 'verification_selfie';
  url?: string;
  fileId?: string;
  status: DocumentStatus;
}

export interface VerificationState {
  level: VerificationLevel;
  documents: VerificationDocument[];
  photos: VerificationPhoto[];
}
