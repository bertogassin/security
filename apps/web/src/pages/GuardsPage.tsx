import { createSignal, createResource, For, Show } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import { GuardCard, SearchBar, Card, Button, PhosphorIcon } from '@security/ui';
import { getNearbyGuards } from '../shared/api';
import { apiGuardToItem } from '../shared/normalizers';
import type { GuardItem } from '../domains/guards';

const DEFAULT_LAT = 43.238949;
const DEFAULT_LNG = 76.945465;

const quickActions = [
  { id: 'bodyguard', label: 'Охрана', icon: 'guard', color: 'bg-[var(--color-black)]' },
  { id: 'patrol', label: 'Патруль', icon: 'patrolCar', color: 'bg-[var(--color-black)]' },
  { id: 'escort', label: 'Сопровождение', icon: 'arrowRight', color: 'bg-[var(--color-black)]' },
];

const DEMO_GUARDS: GuardItem[] = [
  { id: 1, name: 'Алексей Петров', rating: 4.9, totalReviews: 124, verificationLevel: 3, distanceKm: 1.2, hourlyRate: 2500, isAvailable: true, isOnline: true, specializations: ['Офис', 'Склад'] },
  { id: 2, name: 'Дмитрий Козлов', rating: 4.7, totalReviews: 89, verificationLevel: 2, distanceKm: 2.5, hourlyRate: 2200, isAvailable: true, isOnline: true, specializations: ['События'] },
  { id: 3, name: 'Игорь Соколов', rating: 5.0, totalReviews: 56, verificationLevel: 4, distanceKm: 0.8, hourlyRate: 3000, isAvailable: true, isOnline: false, specializations: ['Офис', 'Склад', 'События'] },
];

async function fetchNearbyGuards(): Promise<GuardItem[]> {
  try {
    const data = await getNearbyGuards({
      latitude: DEFAULT_LAT,
      longitude: DEFAULT_LNG,
      radius_km: 15,
    });
    const list = (data.guards || []) as Record<string, unknown>[];
    return list.map(apiGuardToItem);
  } catch {
    return [];
  }
}

export function GuardsPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = createSignal('');
  const [guards] = createResource(fetchNearbyGuards);

  const searchRightIcons = (): { icon: string; onClick: () => void; label: string }[] => [
    {
      icon: 'close',
      onClick: () => setSearchQuery(''),
      label: 'Очистить',
    },
    {
      icon: 'mic',
      onClick: () => {},
      label: 'Голосовой поиск',
    },
    {
      icon: 'filter',
      onClick: () => {},
      label: 'Фильтр',
    },
  ];

  return (
    <div class="page px-4 space-y-5 fade-in">
      <header
        class="rounded-[var(--radius-xl)] p-5 shadow-[var(--shadow-lg)] flex items-start gap-4 min-h-[100px]"
        style={{
          background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)',
          borderRadius: 'var(--radius-xl)',
        }}
      >
        <div class="w-12 h-12 rounded-xl bg-[var(--color-white)]/20 flex items-center justify-center shrink-0">
          <PhosphorIcon name="shield" size="xl" class="text-[var(--color-white)]" />
        </div>
        <div class="flex-1 min-w-0">
          <h1 class="text-xl font-bold text-[var(--color-white)] tracking-tight">Охранники рядом</h1>
          <p class="text-[var(--color-white)]/90 mt-1 text-sm leading-snug">Онлайн охранник сразу находится — выберите доступного</p>
        </div>
      </header>

      <SearchBar
        placeholder="Поиск охранников, услуг..."
        value={searchQuery()}
        onChange={setSearchQuery}
        onSearch={(q) => setSearchQuery(q)}
        rightIcons={searchRightIcons()}
      />

      <Card class="border-[var(--color-success)]/30 bg-[var(--color-surface)]">
        <div class="flex items-start gap-3">
          <div class="w-10 h-10 rounded-lg bg-[var(--color-success)]/15 flex items-center justify-center shrink-0">
            <PhosphorIcon name="guard" size="lg" class="text-[var(--color-success)]" />
          </div>
          <div>
            <h3 class="font-semibold text-[var(--color-text)]">Безопасность и верификация</h3>
            <p class="text-sm text-[var(--color-text-secondary)] mt-1">Все охранники проходят проверку документов и верификацию. Данные защищены, платежи — безопасны.</p>
          </div>
        </div>
      </Card>

      <section>
        <h2 class="text-base font-semibold text-[var(--color-text)] mb-3 flex items-center gap-2">
          <PhosphorIcon name="star" size="md" class="text-[var(--color-primary)]" />
          Быстрые действия
        </h2>
        <div class="grid grid-cols-3 gap-3">
          <For each={quickActions}>
            {(action) => (
              <button
                type="button"
                onClick={() => navigate('/')}
                class="flex flex-col items-center gap-2.5 active:scale-[0.97] transition-transform min-h-[88px] w-full"
              >
                <div class={`w-14 h-14 flex-shrink-0 ${action.color} rounded-[var(--radius-lg)] flex items-center justify-center shadow-[var(--shadow-md)]`}>
                  <PhosphorIcon name={action.icon} size="lg" class="text-[var(--color-white)]" />
                </div>
                <span class="text-xs text-[var(--color-text)] font-medium text-center leading-tight">{action.label}</span>
              </button>
            )}
          </For>
        </div>
      </section>

      <Show when={guards.loading}>
        <div class="rounded-[var(--radius-xl)] bg-[var(--color-surface-elevated)] p-6 shadow-[var(--shadow-md)] text-center text-[var(--color-text-secondary)]">Загрузка...</div>
      </Show>
      <Show when={guards.error}>
        <div class="rounded-[var(--radius-xl)] bg-[var(--color-surface-elevated)] p-4 shadow-[var(--shadow-md)] mb-4 border border-[var(--color-border-light)]">
          <p class="text-[var(--color-warning)] font-medium">API недоступен — показываем демо-карточки.</p>
        </div>
      </Show>

      <section>
        <div class="flex items-center justify-between mb-3">
          <h2 class="text-base font-semibold text-[var(--color-text)] flex items-center gap-2">
            <PhosphorIcon name="location" size="md" class="text-[var(--color-primary)]" />
            Рядом с вами
          </h2>
        </div>
        <Show when={!guards.loading && guards() && guards()!.length > 0}>
          <ul class="space-y-4">
            <For each={guards()!}>
              {(g) => (
                <li>
                  <GuardCard
                    id={g.id}
                    name={g.name}
                    avatarUrl={g.avatarUrl}
                    rating={g.rating}
                    totalReviews={g.totalReviews}
                    verificationLevel={g.verificationLevel}
                    distanceKm={g.distanceKm}
                    hourlyRate={g.hourlyRate}
                    isAvailable={g.isAvailable}
                    isOnline={g.isOnline}
                    specializations={g.specializations}
                    onClick={() => navigate(`/guard/${g.id}`)}
                  />
                </li>
              )}
            </For>
          </ul>
        </Show>
        <Show when={!guards.loading && (!guards() || guards()!.length === 0)}>
          <ul class="space-y-4">
            <For each={DEMO_GUARDS}>
              {(g) => (
                <li>
                  <GuardCard
                    id={g.id}
                    name={g.name}
                    avatarUrl={g.avatarUrl}
                    rating={g.rating}
                    totalReviews={g.totalReviews}
                    verificationLevel={g.verificationLevel}
                    distanceKm={g.distanceKm}
                    hourlyRate={g.hourlyRate}
                    isAvailable={g.isAvailable}
                    isOnline={g.isOnline}
                    specializations={g.specializations}
                    onClick={() => navigate(`/guard/${g.id}`)}
                  />
                </li>
              )}
            </For>
          </ul>
        </Show>
      </section>

      <Card class="!border-0 !shadow-lg text-[var(--color-white)]" style={{ background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)' }}>
        <div class="flex items-center justify-between gap-3">
          <div class="flex items-start gap-3">
            <div class="w-10 h-10 rounded-lg bg-[var(--color-white)]/20 flex items-center justify-center shrink-0">
              <PhosphorIcon name="star" size="lg" class="text-[var(--color-white)]" />
            </div>
            <div>
              <h3 class="font-semibold text-[var(--color-white)]">Премиум-подписка</h3>
              <p class="text-sm text-[var(--color-white)]/90 mt-0.5">Скидка 20% на все услуги</p>
            </div>
          </div>
          <Button variant="secondary" size="sm" class="!bg-[var(--color-white)]/20 !text-[var(--color-white)] hover:!bg-[var(--color-white)]/30 border-0" onClick={() => navigate('/premium')}>Подробнее</Button>
        </div>
      </Card>
    </div>
  );
}
