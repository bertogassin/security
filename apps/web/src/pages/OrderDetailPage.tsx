import { createResource, Show } from 'solid-js';
import { useParams, useNavigate } from '@solidjs/router';
import { Card, Button, PhosphorIcon } from '@security/ui';
import { getOrder } from '../shared/api';
import { apiOrderToItem } from '../shared/normalizers';
import { getOrderById, getServiceLabel } from '../shared/ordersData';
import { DEFAULT_PHONE } from '../shared/constants';
import type { OrderItem } from '../shared/ordersData';

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('ru-RU', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function OrderDetailPage() {
  const params = useParams();
  const navigate = useNavigate();
  const [orderResource] = createResource(() => params.id, (id) => getOrder(id));
  const raw = () => orderResource() ?? null;
  const order = (): OrderItem | undefined => {
    const r = raw();
    if (r) return apiOrderToItem(r);
    return getOrderById(params.id);
  };
  const orderPhone = () => order()?.guard?.phone ?? (order()?.guard ? DEFAULT_PHONE : null);

  return (
    <div class="page px-4 pb-8">
      <button type="button" onClick={() => navigate('/orders')} class="back-button mb-4">
        <PhosphorIcon name="arrowLeft" size="md" />
        <span>Назад</span>
      </button>

      <Show when={order()} keyed>
        {(ord) => (
        <>
          <h1 class="text-xl font-bold text-[var(--color-text)] mb-4">Заказ #{ord.id}</h1>
          <Card class="mb-4">
            <div class="space-y-3">
              <div class="flex justify-between items-center">
                <span class="text-sm text-[var(--color-text-secondary)]">Статус</span>
                <span
                  class={`text-sm font-medium px-2 py-1 rounded-full ${
                    ord.status === 'in_progress'
                      ? 'bg-[var(--color-warning)]/15 text-[var(--color-warning)]'
                      : ord.status === 'completed'
                        ? 'bg-[var(--color-success)]/15 text-[var(--color-success)]'
                        : ord.status === 'new'
                          ? 'bg-[var(--color-primary)]/15 text-[var(--color-primary)]'
                          : 'bg-[var(--color-surface)] text-[var(--color-text)]'
                  }`}
                >
                  {ord.status === 'in_progress' && 'В работе'}
                  {ord.status === 'completed' && 'Завершён'}
                  {ord.status === 'new' && 'Новый'}
                  {ord.status === 'accepted' && 'Принят'}
                  {ord.status === 'cancelled' && 'Отменён'}
                </span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-[var(--color-text-secondary)]">Услуга</span>
                <span class="text-sm font-medium text-[var(--color-text)]">{getServiceLabel(ord.serviceType)}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-[var(--color-text-secondary)]">Адрес</span>
                <span class="text-sm text-[var(--color-text)] text-right max-w-[60%]">{ord.address}</span>
              </div>
              {ord.guard && (
                <div class="flex justify-between">
                  <span class="text-sm text-[var(--color-text-secondary)]">Охранник</span>
                  <span class="text-sm font-medium text-[var(--color-text)]">{ord.guard.name} ★ {ord.guard.rating}</span>
                </div>
              )}
              <div class="flex justify-between pt-2 border-t border-[var(--color-border-light)]">
                <span class="text-sm text-[var(--color-text-secondary)]">Сумма</span>
                <span class="text-lg font-bold text-[var(--color-primary)]">{ord.price.toLocaleString()} ₸</span>
              </div>
              <p class="text-xs text-[var(--color-text-secondary)] pt-1">{formatDate(ord.createdAt)}</p>
            </div>
          </Card>

          {ord.status === 'in_progress' && (
            <p class="text-sm text-[var(--color-text-secondary)] mb-4 flex items-center gap-2">
              <span class="w-2 h-2 bg-[var(--color-success)] rounded-full animate-pulse" />
              Охранник в пути. Приблизительное время прибытия ~5 мин.
            </p>
          )}

          <div class="flex gap-3">
            {ord.guard && (
              <Button variant="outline" class="flex-1" leftIcon={<PhosphorIcon name="chat" size="sm" class="text-[var(--color-primary)]" />} onClick={() => window.open('tel:' + (orderPhone() ?? DEFAULT_PHONE))}>
                Позвонить
              </Button>
            )}
            {ord.status === 'new' && (
              <Button variant="ghost" class="flex-1 !text-[var(--color-error)]" onClick={() => navigate('/orders')}>
                Отменить заказ
              </Button>
            )}
          </div>
        </>
        )}
      </Show>
      <Show when={!order()}>
        <div class="text-center py-12">
          <PhosphorIcon name="list" size="xl" class="text-[var(--color-text-secondary)] mx-auto mb-4" />
          <h2 class="text-lg font-semibold text-[var(--color-text)] mb-2">Заказ не найден</h2>
          <p class="text-sm text-[var(--color-text-secondary)] mb-4">Проверьте ссылку или вернитесь в список заказов.</p>
          <Button variant="primary" onClick={() => navigate('/orders')}>
            К заказам
          </Button>
        </div>
      </Show>
    </div>
  );
}
