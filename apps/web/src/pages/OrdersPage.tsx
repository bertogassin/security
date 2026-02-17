import { createSignal, For, Show, createResource } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import { OrderCard, Button, PhosphorIcon } from '@security/ui';
import { getOrders } from '../shared/api';
import { apiOrderToItem } from '../shared/normalizers';
import { orders as fallbackOrders } from '../shared/ordersData';
import type { OrderItem } from '../shared/ordersData';

const tabs = ['Активные', 'Завершённые', 'Все'];

export function OrdersPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = createSignal('Активные');
  const [ordersResource] = createResource(getOrders, { initialValue: { orders: [] as Record<string, unknown>[] } });
  const orders = () => {
    const data = ordersResource();
    if (data?.orders?.length) return (data.orders as Record<string, unknown>[]).map(apiOrderToItem);
    return fallbackOrders;
  };

  const filteredOrders = () => {
    const list = orders();
    switch (activeTab()) {
      case 'Активные':
        return list.filter((o) => ['new', 'accepted', 'in_progress'].includes(o.status));
      case 'Завершённые':
        return list.filter((o) => o.status === 'completed');
      default:
        return list;
    }
  };

  const activeOrder = () => orders().find((o) => o.status === 'in_progress');
  const openOrder = (id: string) => navigate(`/order/${id}`);

  return (
    <div class="page px-4">
      <div class="flex items-center justify-between mb-4">
        <h1 class="text-xl font-bold text-[var(--color-text)]">Мои заказы</h1>
        <Button variant="primary" size="sm" leftIcon={<PhosphorIcon name="plus" size="sm" class="text-[var(--color-white)]" />} onClick={() => navigate('/')}>
          Новый
        </Button>
      </div>

      <Show when={activeOrder()}>
        {(order) => (
          <button
            type="button"
            onClick={() => openOrder(order().id)}
            class="w-full mb-4 rounded-[var(--radius-xl)] p-4 flex items-center gap-3 shadow-[var(--shadow-lg)] transition-all active:scale-[0.99] border-0"
            style={{ background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)' }}
          >
            <div class="relative">
              <div class="w-12 h-12 bg-[var(--color-white)]/20 rounded-xl flex items-center justify-center">
                <PhosphorIcon name="location" size="lg" class="text-[var(--color-white)]" />
              </div>
              <span class="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-[var(--color-success)] rounded-full border-2 border-[var(--color-primary)] animate-pulse" />
            </div>
            <div class="flex-1 text-left min-w-0">
              <p class="text-[var(--color-white)] font-semibold">Охранник в пути</p>
              <p class="text-[var(--color-white)]/80 text-sm truncate">{order().guard?.name} • {order().address}</p>
            </div>
            <div class="text-right shrink-0">
              <p class="text-[var(--color-white)] font-bold text-lg">~5 мин</p>
              <p class="text-[var(--color-white)]/80 text-xs">Отследить →</p>
            </div>
          </button>
        )}
      </Show>

      <div class="flex border-b border-[var(--color-border)] mb-4">
        <For each={tabs}>
          {(tab) => (
            <button
              type="button"
              onClick={() => setActiveTab(tab)}
              class={`
                flex-1 px-4 py-3.5 min-h-[48px] text-sm font-medium border-b-2 -mb-px transition-colors
                ${activeTab() === tab ? 'border-[var(--color-primary)] text-[var(--color-primary)]' : 'border-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text)]'}
              `}
            >
              {tab}
              <Show when={tab === 'Активные' && activeOrder()}>
                <span class="ml-1.5 w-2 h-2 bg-[var(--color-success)] rounded-full inline-block animate-pulse" />
              </Show>
            </button>
          )}
        </For>
      </div>

      <Show
        when={filteredOrders().length > 0}
        fallback={
          <div class="text-center py-14">
            <div class="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 bg-[var(--color-surface)] border border-[var(--color-border-light)]">
              <PhosphorIcon name="shield" size="xl" class="text-[var(--color-primary)]" />
            </div>
            <h3 class="text-lg font-medium text-[var(--color-text)] mb-1">Заказов пока нет</h3>
            <p class="text-[var(--color-text-secondary)] mb-5">Закажите первую охранную услугу</p>
            <Button variant="primary" onClick={() => navigate('/')}>
              Создать заказ
            </Button>
          </div>
        }
      >
        <div class="space-y-3">
          <For each={filteredOrders()}>
            {(order) => (
              <div class={order.status === 'in_progress' ? 'ring-2 ring-[var(--color-primary)]/30 rounded-[var(--radius-xl)]' : ''}>
                <OrderCard
                  {...order}
                  onClick={() => openOrder(order().id)}
                />
              </div>
            )}
          </For>
        </div>
      </Show>
    </div>
  );
}
