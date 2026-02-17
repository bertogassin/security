import { useNavigate } from '@solidjs/router';
import { Card, Button, PhosphorIcon } from '@security/ui';

const benefits = [
  'Скидка 20% на все услуги охранников',
  'Приоритетная поддержка',
  'Без комиссии за отмену до 2 часов до начала',
  'Доступ к эксклюзивным охранникам с рейтингом 4.9+',
];

export function PremiumPage() {
  const navigate = useNavigate();

  return (
    <div class="page px-4 pb-8">
      <button type="button" onClick={() => navigate(-1)} class="back-button mb-4">
        <PhosphorIcon name="arrowLeft" size="md" />
        <span>Назад</span>
      </button>
      <div
        class="rounded-[var(--radius-xl)] p-6 mb-6 text-[var(--color-white)]"
        style={{ background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)' }}
      >
        <div class="w-14 h-14 rounded-xl bg-[var(--color-white)]/20 flex items-center justify-center mb-4">
          <PhosphorIcon name="star" size="xl" class="text-[var(--color-white)]" />
        </div>
        <h1 class="text-xl font-bold">Премиум-подписка</h1>
        <p class="text-[var(--color-white)]/90 text-sm mt-1">Выгодные условия для постоянных клиентов</p>
      </div>
      <Card title="Что входит">
        <ul class="space-y-3">
          {benefits.map((b) => (
            <li class="flex items-start gap-2 text-sm text-[var(--color-text)]">
              <PhosphorIcon name="check" size="sm" class="text-[var(--color-success)] shrink-0 mt-0.5" />
              {b}
            </li>
          ))}
        </ul>
      </Card>
      <p class="text-xs text-[var(--color-text-secondary)] mt-4 text-center">Оформление подписки будет доступно в следующем обновлении.</p>
      <Button variant="primary" fullWidth class="mt-4" onClick={() => navigate(-1)}>
        Понятно
      </Button>
    </div>
  );
}
