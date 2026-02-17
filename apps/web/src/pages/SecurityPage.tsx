import { useNavigate } from '@solidjs/router';
import { Card, ListItem, PhosphorIcon } from '@security/ui';

const items = [
  { id: 'sessions', title: 'Активные сессии', subtitle: 'Устройства с доступом к аккаунту', icon: 'list' as const, route: '/profile/security/sessions' },
  { id: 'password', title: 'Сменить пароль', subtitle: 'Рекомендуется менять раз в 3–6 месяцев', icon: 'shield' as const, route: '/profile/security/password' },
  { id: '2fa', title: 'Двухфакторная аутентификация', subtitle: 'TOTP, SMS или email', icon: 'guard' as const, route: '/profile/security/2fa' },
];

export function SecurityPage() {
  const navigate = useNavigate();

  return (
    <div class="page px-4">
      <button type="button" onClick={() => navigate('/profile')} class="back-button mb-4">
        <PhosphorIcon name="arrowLeft" size="md" />
        <span>Назад</span>
      </button>
      <h1 class="text-xl font-bold text-[var(--color-text)] mb-4">Безопасность аккаунта</h1>
      <Card>
        {items.map((item, index) => (
          <>
            <ListItem
              title={item.title}
              subtitle={item.subtitle}
              leftIcon={<PhosphorIcon name={item.icon} size="md" class="text-[var(--color-primary)]" />}
              rightIcon={<PhosphorIcon name="chevronRight" size="sm" class="text-[var(--color-text-secondary)]" />}
              onClick={() => navigate(item.route)}
            />
            {index < items.length - 1 && <div class="border-b border-[var(--color-border-light)] mx-4" />}
          </>
        ))}
      </Card>
      <p class="text-xs text-[var(--color-text-secondary)] mt-4 text-center">
        Сессии, смена пароля и 2FA будут доступны после подключения бэкенда.
      </p>
    </div>
  );
}
