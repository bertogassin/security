import { For, createSignal } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import { Card, ListItem, PhosphorIcon } from '@security/ui';
import { theme, setTheme } from '../shared/theme';

const NOTIFICATIONS_KEY = 'security_notifications';
const SOUNDS_KEY = 'security_sounds';

function getStoredBool(key: string, defaultVal: boolean): boolean {
  if (typeof window === 'undefined') return defaultVal;
  const v = localStorage.getItem(key);
  if (v === '0' || v === 'false') return false;
  if (v === '1' || v === 'true') return true;
  return defaultVal;
}

function setStoredBool(key: string, value: boolean) {
  localStorage.setItem(key, value ? '1' : '0');
}

const items = [
  { id: 'notifications', title: 'Уведомления', subtitle: 'Push о заказах и сообщениях', icon: 'bell' as const, key: NOTIFICATIONS_KEY },
  { id: 'sounds', title: 'Звуки', subtitle: 'Звуковые уведомления', icon: 'phone' as const, key: SOUNDS_KEY },
];

export function SettingsPage() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = createSignal(getStoredBool(NOTIFICATIONS_KEY, true));
  const [sounds, setSounds] = createSignal(getStoredBool(SOUNDS_KEY, true));
  const getValue = (key: string) => (key === NOTIFICATIONS_KEY ? notifications() : sounds());
  const setValue = (key: string, value: boolean) => {
    setStoredBool(key, value);
    if (key === NOTIFICATIONS_KEY) setNotifications(value);
    else setSounds(value);
  };

  return (
    <div class="page px-4">
      <button type="button" onClick={() => navigate('/profile')} class="back-button mb-4">
        <PhosphorIcon name="arrowLeft" size="md" />
        <span>Назад</span>
      </button>
      <h1 class="text-xl font-bold text-[var(--color-text)] mb-4">Настройки</h1>

      <Card title="Внешний вид" subtitle="Светлый или тёмный экран" class="mb-4">
        <div class="flex gap-2">
          <button
            type="button"
            onClick={() => setTheme('light')}
            class={`flex-1 flex items-center justify-center gap-2 py-3 rounded-[var(--radius-md)] border-2 transition-colors ${theme() === 'light' ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/10 text-[var(--color-primary)]' : 'border-[var(--color-border-light)] text-[var(--color-text-secondary)] hover:border-[var(--color-border)]'}`}
          >
            <span class="w-6 h-6 rounded-full bg-[var(--color-surface-elevated)] border border-[var(--color-border)]" aria-hidden />
            <span class="text-sm font-medium">Светлый</span>
          </button>
          <button
            type="button"
            onClick={() => setTheme('dark')}
            class={`flex-1 flex items-center justify-center gap-2 py-3 rounded-[var(--radius-md)] border-2 transition-colors ${theme() === 'dark' ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/10 text-[var(--color-primary)]' : 'border-[var(--color-border-light)] text-[var(--color-text-secondary)] hover:border-[var(--color-border)]'}`}
          >
            <span class="w-6 h-6 rounded-full bg-[var(--color-black)] border border-[var(--color-border)]" aria-hidden />
            <span class="text-sm font-medium">Тёмный</span>
          </button>
        </div>
      </Card>

      <Card>
        <For each={items}>
          {(item, index) => {
            const on = () => getValue(item.key);
            const toggle = () => setValue(item.key, !on());
            return (
              <>
                <div class="flex items-center gap-3 py-3 min-h-[52px]">
                  <PhosphorIcon name={item.icon} size="md" class="text-[var(--color-primary)] shrink-0" />
                  <div class="flex-1 min-w-0">
                    <p class="font-medium text-[var(--color-text)] text-sm">{item.title}</p>
                    <p class="text-xs text-[var(--color-text-secondary)]">{item.subtitle}</p>
                  </div>
                  <button
                    type="button"
                    onClick={toggle}
                    class={`shrink-0 w-11 h-6 rounded-full transition-colors ${on() ? 'bg-[var(--color-primary)]' : 'bg-[var(--color-border)]'}`}
                    aria-label={item.title}
                  >
                    <span class={`block w-5 h-5 rounded-full bg-white shadow transition-all ${on() ? 'ml-5' : 'ml-0.5'}`} style={{ marginTop: '2px' }} />
                  </button>
                </div>
                {index() < items.length - 1 && <div class="border-b border-[var(--color-border-light)] mx-4" />}
              </>
            );
          }}
        </For>
      </Card>
    </div>
  );
}
