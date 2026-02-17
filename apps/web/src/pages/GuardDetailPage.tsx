import { createResource, Show, For } from 'solid-js';
import { useParams, useNavigate } from '@solidjs/router';
import { Avatar, Badge, Rating, Button, PhosphorIcon, Card } from '@security/ui';
import type { GuardDetail } from '../domains/guards';
import { verificationLabel } from '../domains/guards';
import { getGuard } from '../shared/api';
import { apiGuardToDetail } from '../shared/normalizers';
import { DEFAULT_PHONE } from '../shared/constants';

const mockGuard: GuardDetail = {
  id: 1,
  name: 'Алексей Петров',
  rating: 4.9,
  totalReviews: 124,
  verificationLevel: 3,
  distanceKm: 1.2,
  hourlyRate: 2500,
  isAvailable: true,
  isOnline: true,
  specializations: ['Офис', 'Склад', 'События'],
  bio: 'Профессиональный охранник с опытом. Сертифицирован.',
  experienceYears: 8,
  completedOrders: 245,
  reviews: [
    { id: 1, author: 'Марат К.', rating: 5, text: 'Отличный профессионал!', date: '2026-02-01' },
    { id: 2, author: 'Айгерим Б.', rating: 5, text: 'Пунктуальный и ответственный', date: '2026-01-28' },
  ],
};

const mockGuards: Record<string, GuardDetail> = {
  '1': { ...mockGuard },
  '2': { ...mockGuard, id: 2, name: 'Дмитрий Козлов', totalReviews: 89, verificationLevel: 2, hourlyRate: 2200 },
  '3': { ...mockGuard, id: 3, name: 'Игорь Соколов', totalReviews: 56, verificationLevel: 4, hourlyRate: 3000 },
};

async function fetchGuard(id: string): Promise<GuardDetail | null> {
  const raw = await getGuard(id);
  if (raw) return apiGuardToDetail(raw);
  return mockGuards[id] ?? mockGuard;
}

export function GuardDetailPage() {
  const params = useParams();
  const navigate = useNavigate();
  const [guard] = createResource(() => params.id, fetchGuard);

  const resolvedGuard = () => guard() ?? (params.id ? mockGuards[params.id] ?? null : null);
  const g = () => resolvedGuard() ?? mockGuard;
  const guardPhone = () => g().phone ?? DEFAULT_PHONE;

  return (
    <div class="pb-28">
      <Show when={guard.loading}>
        <div class="rounded-[var(--radius-xl)] bg-[var(--color-surface-elevated)] p-8 shadow-[var(--shadow-md)] text-center text-[var(--color-text-secondary)]">Загрузка...</div>
      </Show>
      <Show when={!guard.loading && resolvedGuard()}>
        <div
          class="text-[var(--color-white)] px-4 pt-4 pb-20 min-h-[140px]"
          style={{ background: 'linear-gradient(180deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)' }}
        >
          <button
            type="button"
            onClick={() => navigate(-1)}
            class="back-button text-[var(--color-white)]/90 hover:text-[var(--color-white)] active:opacity-80 -ml-1 pl-1"
          >
            <PhosphorIcon name="arrowLeft" size="md" class="text-[var(--color-white)]" />
            <span>Назад</span>
          </button>
        </div>

        <Card class="-mt-16 mx-4 relative z-0">
          <div class="text-center pt-2 pb-4">
            <Avatar
              src={g().avatarUrl}
              name={g().name}
              size="xl"
              status={g().isOnline ? 'online' : 'offline'}
              class="mx-auto border-4 border-[var(--color-white)] -mt-12"
            />
            <h1 class="text-xl font-bold text-[var(--color-text)] mt-3">{g().name}</h1>
            <div class="flex items-center justify-center gap-2 mt-1 flex-wrap">
              <Badge variant={g().verificationLevel >= 4 ? 'warning' : g().verificationLevel >= 3 ? 'primary' : 'success'} size="sm">
                {verificationLabel(g().verificationLevel)}
              </Badge>
              {g().isAvailable && <Badge variant="success" size="sm">Доступен</Badge>}
            </div>
            <div class="flex items-center justify-center gap-1 mt-2">
              <Rating value={g().rating} size="sm" readonly />
              <span class="text-sm text-[var(--color-text-secondary)]">({g().totalReviews})</span>
            </div>
          </div>

          <div class="flex border-t border-[var(--color-border-light)] divide-x divide-[var(--color-border-light)]">
            <div class="flex-1 py-3 text-center">
              <p class="text-lg font-bold text-[var(--color-text)]">{g().experienceYears ?? 5}</p>
              <p class="text-xs text-[var(--color-text-secondary)]">лет опыта</p>
            </div>
            <div class="flex-1 py-3 text-center">
              <p class="text-lg font-bold text-[var(--color-text)]">{g().completedOrders ?? 120}</p>
              <p class="text-xs text-[var(--color-text-secondary)]">заказов</p>
            </div>
            <div class="flex-1 py-3 text-center">
              <p class="text-lg font-bold text-[var(--color-primary)]">{g().hourlyRate.toLocaleString()} ₸</p>
              <p class="text-xs text-[var(--color-text-secondary)]">в час</p>
            </div>
          </div>
        </Card>

        <Show when={g().bio || (g().specializations && g().specializations!.length)}>
          <div class="px-4 mt-4">
            <Card title="О себе">
              <Show when={g().bio}>
                <p class="text-[var(--color-text-secondary)]">{g().bio}</p>
              </Show>
              <Show when={g().specializations?.length}>
                <div class="flex flex-wrap gap-2 mt-4">
                  <For each={g().specializations}>
                    {(spec) => <Badge variant="default">{spec}</Badge>}
                  </For>
                </div>
              </Show>
            </Card>
          </div>
        </Show>

        <Show when={g().reviews?.length}>
          <div class="px-4 mt-4">
            <Card title="Отзывы">
              <For each={g().reviews}>
                {(review) => (
                  <div class="py-3 border-b border-[var(--color-border-light)] last:border-0">
                    <div class="flex items-center justify-between">
                      <p class="font-medium text-[var(--color-text)]">{review.author}</p>
                      <Rating value={review.rating} size="sm" readonly />
                    </div>
                    <p class="text-sm text-[var(--color-text-secondary)] mt-1">{review.text}</p>
                    <p class="text-xs text-[var(--color-text-secondary)]/80 mt-1">{review.date}</p>
                  </div>
                )}
              </For>
            </Card>
          </div>
        </Show>

        <div class="fixed bottom-0 left-0 right-0 bg-[var(--color-surface-elevated)] border-t border-[var(--color-border)] p-4 safe-area-inset-bottom z-[60] shadow-[0 -4px 12px rgba(0,0,0,0.06)]">
          <div class="flex gap-3 max-w-[430px] mx-auto">
            <Button variant="outline" class="flex-1" leftIcon={<PhosphorIcon name="chat" size="sm" class="text-[var(--color-primary)]" />} onClick={() => window.open('tel:' + guardPhone())}>
              Написать
            </Button>
            <Button
              variant="primary"
              class="flex-1"
              disabled={!g().isAvailable}
              onClick={() => navigate('/orders')}
            >
              {g().isAvailable ? 'Заказать' : 'Недоступен'}
            </Button>
          </div>
        </div>
      </Show>
      <Show when={!guard.loading && !resolvedGuard()}>
        <div class="rounded-[var(--radius-xl)] bg-[var(--color-surface-elevated)] p-6 shadow-[var(--shadow-md)] text-[var(--color-text-secondary)] text-center">Охранник не найден.</div>
      </Show>
    </div>
  );
}
