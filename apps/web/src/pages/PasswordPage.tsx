import { useNavigate } from '@solidjs/router';
import { Card, PhosphorIcon, Button } from '@security/ui';

export function PasswordPage() {
  const navigate = useNavigate();

  return (
    <div class="page px-4">
      <button type="button" onClick={() => navigate('/profile/security')} class="back-button mb-4">
        <PhosphorIcon name="arrowLeft" size="md" />
        <span>Назад</span>
      </button>
      <h1 class="text-xl font-bold text-[var(--color-text)] mb-4">Сменить пароль</h1>
      <Card>
        <p class="text-sm text-[var(--color-text-secondary)] mb-4">Рекомендуется менять пароль раз в 3–6 месяцев. После подключения авторизации здесь появится форма с полями «Текущий пароль», «Новый пароль», «Подтверждение».</p>
      </Card>
      <Button variant="primary" fullWidth class="mt-4" onClick={() => navigate('/profile/security')}>
        Понятно
      </Button>
    </div>
  );
}
