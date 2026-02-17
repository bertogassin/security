/** Пользователь (профиль). Пока мок; позже — API / auth. */

export interface User {
  name: string;
  phone: string;
  email: string;
  ordersCount?: number;
  rating?: number;
}

export const mockUser: User = {
  name: 'Пользователь',
  phone: '+7 (777) 123-45-67',
  email: 'user@example.com',
  ordersCount: 12,
  rating: 4.9,
};
