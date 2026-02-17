/** Мок-данные заказов. В дальнейшем — запрос к API. */

export interface OrderItem {
  id: string;
  status: 'new' | 'accepted' | 'in_progress' | 'completed' | 'cancelled';
  serviceType: string;
  address: string;
  price: number;
  createdAt: string;
  scheduledAt?: string;
  guard?: { name: string; rating: number; phone?: string };
}

export const orders: OrderItem[] = [
  { id: '1', status: 'in_progress', serviceType: 'bodyguard', address: 'ул. Абая 150, Алматы', price: 16000, createdAt: '2026-02-16T10:00:00Z', guard: { name: 'Алексей П.', rating: 4.9 } },
  { id: '2', status: 'completed', serviceType: 'event_security', address: 'Дворец Республики, Алматы', price: 48000, createdAt: '2026-02-15T14:00:00Z', guard: { name: 'Дмитрий К.', rating: 4.7 } },
  { id: '3', status: 'new', serviceType: 'property_patrol', address: 'КП Жетысу, Алматы', price: 9000, scheduledAt: '2026-02-18T09:00:00Z', createdAt: '2026-02-16T11:30:00Z' },
];

const serviceTypeLabels: Record<string, string> = {
  bodyguard: 'Телохранитель',
  property_patrol: 'Патруль объекта',
  event_security: 'Охрана мероприятия',
  vehicle_escort: 'Сопровождение',
};

export function getOrderById(id: string): OrderItem | undefined {
  return orders.find((o) => o.id === id);
}

export function getServiceLabel(serviceType: string): string {
  return serviceTypeLabels[serviceType] ?? serviceType;
}
