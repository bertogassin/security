import { useNavigate } from '@solidjs/router';
import { Card, PhosphorIcon, Button } from '@security/ui';

export function SessionsPage() {
  const navigate = useNavigate();
  return (
    <div class="page px-4">
      <button type="button" onClick={() => navigate('/profile/security')} class="back-button mb-4">
        <PhosphorIcon name="arrowLeft" size="md" />
        <span>Назад</span>
      </button>
      <h1 class="text-xl font-bold text-[var(--color-text)] mb-4">Активные сессии</h1>
      <Card>
        <p class="text-sm text-[var(--color-text-secondary)] mb-4">Устройства с доступом к аккаунту. После подключения бэкенда здесь можно будет завершать сессии.</p>
        <div class="flex items-center gap-3 py-3 border-t border-[var(--color-border-light)]">
          <div class="w-10 h-10 rounded-lg bg-[var(--color-primary)]/15 flex items-center justify-center shrink-0">
            <PhosphorIcon name="phone" size="lg" class="text-[var(--color-primary)]" />
          </div>
          <div class="flex-1 min-w-0">
            <p class="font-medium text-[var(--color-text)] text-sm">Текущее устройство</p>
            <p class="text-xs text-[var(--color-text-secondary)]">Эта сессия</p>
          </div>
          <PhosphorIcon name="check" size="sm" class="text-[var(--color-success)] shrink-0" />
        </div>
      </Card>
      <Button variant="ghost" fullWidth class="mt-4" onClick={() => navigate('/profile/security')}>К безопасности</Button>
    </div>
  );
}
