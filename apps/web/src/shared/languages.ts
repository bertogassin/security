/**
 * Языки приложения. Французский и сенегальский — отдельно.
 * При подключении i18n: locale совпадает с id или маппится в бандле локалей.
 */
export type LocaleId = 'ru' | 'en' | 'fr' | 'sn' | 'ce';

export interface LanguageOption {
  id: LocaleId;
  label: string;
  /** Код для API / Accept-Language */
  locale: string;
}

export const LANGUAGES: LanguageOption[] = [
  { id: 'ru', label: 'Русский', locale: 'ru' },
  { id: 'en', label: 'English', locale: 'en' },
  { id: 'fr', label: 'Français', locale: 'fr' },
  { id: 'sn', label: 'Sénégal', locale: 'fr-SN' },
  { id: 'ce', label: 'Чеченский', locale: 'ce' },
];

const ONBOARDING_KEY = 'security_onboarding_done';

export function getOnboardingDone(): boolean {
  if (typeof window === 'undefined') return true;
  return localStorage.getItem(ONBOARDING_KEY) === '1';
}

export function setOnboardingDone(): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(ONBOARDING_KEY, '1');
}

export function clearOnboardingDone(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(ONBOARDING_KEY);
}
