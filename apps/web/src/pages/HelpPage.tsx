import { useNavigate } from '@solidjs/router';
import { Card, PhosphorIcon } from '@security/ui';
import { SUPPORT_EMAIL } from '../shared/constants';

const faq = [
  { q: 'Как заказать охранника?', a: 'На главной выберите охранника из списка «Рядом с вами» или используйте быстрые действия. Нажмите на карточку и оформите заказ.' },
  { q: 'Как оплатить?', a: 'Оплата доступна после подтверждения заказа. Способы оплаты зависят от региона и настроек платформы.' },
  { q: 'Как отменить заказ?', a: 'В разделе «Мои заказы» откройте заказ и выберите «Отменить». Правила возврата указаны в условиях использования.' },
];

export function HelpPage() {
  const navigate = useNavigate();

  return (
    <div class="page px-4">
      <button type="button" onClick={() => navigate('/profile')} class="back-button mb-4">
        <PhosphorIcon name="arrowLeft" size="md" />
        <span>Назад</span>
      </button>
      <h1 class="text-xl font-bold text-[var(--color-text)] mb-4">Помощь и поддержка</h1>
      <Card title="Частые вопросы">
        <ul class="space-y-4">
          {faq.map((item) => (
            <li>
              <p class="font-medium text-[var(--color-text)] text-sm">{item.q}</p>
              <p class="text-sm text-[var(--color-text-secondary)] mt-1">{item.a}</p>
            </li>
          ))}
        </ul>
      </Card>
      <Card class="mt-4 cursor-pointer hover:opacity-95 transition-opacity" onClick={() => window.open('mailto:' + SUPPORT_EMAIL + '?subject=Помощь')}>
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-[var(--color-primary)]/15 flex items-center justify-center shrink-0">
            <PhosphorIcon name="chat" size="lg" class="text-[var(--color-primary)]" />
          </div>
          <div class="flex-1 min-w-0">
            <p class="font-medium text-[var(--color-text)]">Написать в поддержку</p>
            <p class="text-sm text-[var(--color-text-secondary)]">Ответим в течение 24 часов</p>
          </div>
          <PhosphorIcon name="chevronRight" size="sm" class="text-[var(--color-text-secondary)] shrink-0" />
        </div>
      </Card>
    </div>
  );
}
