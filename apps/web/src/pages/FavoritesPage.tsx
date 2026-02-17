import { useNavigate } from '@solidjs/router';
import { Button, PhosphorIcon } from '@security/ui';

export function FavoritesPage() {
  const navigate = useNavigate();

  return (
    <div class="page px-4">
      <button type="button" onClick={() => navigate('/profile')} class="back-button mb-4">
        <PhosphorIcon name="arrowLeft" size="md" />
        <span>Назад</span>
      </button>
      <h1 class="text-xl font-bold text-[var(--color-text)] mb-4">Избранные охранники</h1>
      <div class="text-center py-12">
        <div class="w-16 h-16 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border-light)] flex items-center justify-center mx-auto mb-4">
          <PhosphorIcon name="heart" size="xl" class="text-[var(--color-text-secondary)]" />
        </div>
        <p class="text-[var(--color-text)] font-medium mb-1">Пока никого нет</p>
        <p class="text-sm text-[var(--color-text-secondary)] mb-5">Добавляйте охранников в избранное с карточки или после заказа</p>
        <Button variant="primary" onClick={() => navigate('/')}>
          Найти охранников
        </Button>
      </div>
    </div>
  );
}
