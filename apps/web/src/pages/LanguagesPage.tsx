import { createSignal } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import { Card, PhosphorIcon } from '@security/ui';
import { LANGUAGES } from '../shared/languages';
import type { LocaleId } from '../shared/languages';

const LOCALE_KEY = 'security_locale';

function getStoredLocale(): LocaleId {
  if (typeof window === 'undefined') return 'ru';
  return (localStorage.getItem(LOCALE_KEY) as LocaleId) || 'ru';
}

function setStoredLocale(id: LocaleId) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(LOCALE_KEY, id);
}

export function LanguagesPage() {
  const navigate = useNavigate();
  const [current, setCurrent] = createSignal<LocaleId>(getStoredLocale());

  const handleSelect = (id: LocaleId) => {
    setStoredLocale(id);
    setCurrent(id);
    navigate('/profile');
  };

  return (
    <div class="page px-4">
      <button type="button" onClick={() => navigate('/profile')} class="back-button mb-4">
        <PhosphorIcon name="arrowLeft" size="md" />
        <span>Назад</span>
      </button>
      <h1 class="text-xl font-bold text-[var(--color-text)] mb-4">Язык приложения</h1>
      <Card>
        <ul class="space-y-0">
          {LANGUAGES.map((lang, index) => (
            <li
              class={`flex items-center justify-between min-h-[52px] py-2 ${index < LANGUAGES.length - 1 ? 'border-b border-[var(--color-border-light)]' : ''}`}
            >
              <button
                type="button"
                onClick={() => handleSelect(lang.id)}
                class="flex-1 text-left text-sm font-medium text-[var(--color-text)] py-2 -mx-2 px-2 rounded-lg active:bg-[var(--color-surface)]"
              >
                {lang.label}
              </button>
              {current() === lang.id && <PhosphorIcon name="check" size="sm" class="text-[var(--color-success)] shrink-0" />}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
