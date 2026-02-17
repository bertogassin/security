import { For } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import { Avatar, Card, ListItem, PhosphorIcon, Button } from '@security/ui';
import { LANGUAGES, clearOnboardingDone } from '../shared/languages';
import { theme, setTheme } from '../shared/theme';
import { mockUser } from '../shared/user';

const menuItems = [
  { id: 'orders', title: 'Мои заказы', icon: 'list', route: '/orders' },
  { id: 'languages', title: 'Языки', icon: 'chat', route: '/profile/languages' },
  { id: 'security', title: 'Безопасность аккаунта', icon: 'guard', route: '/profile/security' },
  { id: 'academy', title: 'Академия безопасности', icon: 'shield', route: '/profile/academy' },
  { id: 'favorites', title: 'Избранные охранники', icon: 'heart', route: '/profile/favorites' },
  { id: 'settings', title: 'Настройки', icon: 'settings', route: '/profile/settings' },
  { id: 'help', title: 'Помощь и поддержка', icon: 'chat', route: '/profile/help' },
];

const internationalRules = [
  { id: '1', title: 'Применение силы (ООН, принцип соразмерности)' },
  { id: '2', title: 'Права человека при охране (ЕКПЧ)' },
  { id: '3', title: 'Частная охрана: стандарты ISO' },
  { id: '4', title: 'Огнестрельное оружие и спецсредства' },
  { id: '5', title: 'Документирование и отчётность' },
  { id: '6', title: 'Монтевидейская конвенция (частная охрана)' },
  { id: '7', title: 'Кодекс поведения сотрудников охраны (ООН)' },
  { id: '8', title: 'Задержание и доставление: правовые рамки' },
  { id: '9', title: 'Оказание первой помощи (международные протоколы)' },
  { id: '10', title: 'Эвакуация и кризисные ситуации' },
  { id: '11', title: 'Конфиденциальность и защита персональных данных (GDPR)' },
  { id: '12', title: 'Противодействие коррупции и взяткам' },
  { id: '13', title: 'Охрана объектов критической инфраструктуры' },
  { id: '14', title: 'Работа с правоохранительными органами' },
  { id: '15', title: 'Дискриминация и равное обращение' },
  { id: '16', title: 'Охрана массовых мероприятий (международная практика)' },
  { id: '17', title: 'Сопровождение грузов и логистика' },
  { id: '18', title: 'Кибербезопасность на объекте' },
];

export function ProfilePage() {
  const navigate = useNavigate();

  return (
    <div class="page px-4 space-y-5">
      <Card class="text-center !pt-6">
        <div class="py-2">
          <Avatar name={mockUser.name} size="xl" class="mx-auto" />
          <h2 class="text-xl font-semibold text-[var(--color-text)] mt-4">{mockUser.name}</h2>
          <p class="text-[var(--color-text-secondary)] mt-1">{mockUser.phone}</p>
          <p class="text-sm text-[var(--color-text-secondary)]">{mockUser.email}</p>

          <div class="flex items-center justify-center gap-6 mt-5">
            <div class="text-center">
              <p class="text-2xl font-bold text-[var(--color-primary)]">{mockUser.ordersCount ?? 12}</p>
              <p class="text-xs text-[var(--color-text-secondary)] mt-0.5">Заказов</p>
            </div>
            <div class="w-px h-10 bg-[var(--color-border)]" />
            <div class="text-center">
              <p class="text-2xl font-bold text-[var(--color-primary)]">{mockUser.rating ?? 4.9}</p>
              <p class="text-xs text-[var(--color-text-secondary)] mt-0.5">Рейтинг</p>
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <For each={menuItems}>
          {(item, index) => (
            <>
              <ListItem
                title={item.title}
                leftIcon={<PhosphorIcon name={item.icon} size="md" class="text-[var(--color-primary)]" />}
                rightIcon={<PhosphorIcon name="chevronRight" size="sm" class="text-[var(--color-text-secondary)]" />}
                onClick={() => navigate(item.route)}
              />
              {index() < menuItems.length - 1 && <div class="border-b border-[var(--color-border-light)] mx-4" />}
            </>
          )}
        </For>
      </Card>

      <Card title="Почему нам можно доверять" subtitle="Безопасность и верификация">
        <ul class="space-y-2.5 text-sm text-[var(--color-text)]">
          <li class="flex items-start gap-2">
            <PhosphorIcon name="guard" size="sm" class="text-[var(--color-success)] shrink-0 mt-0.5" />
            <span><strong>Верификация охранников</strong> — проверка документов, лицензий и дипломов перед допуском к заказам.</span>
          </li>
          <li class="flex items-start gap-2">
            <PhosphorIcon name="shield" size="sm" class="text-[var(--color-success)] shrink-0 mt-0.5" />
            <span><strong>Защита данных</strong> — персональные данные и переписка шифруются и не передаются третьим лицам.</span>
          </li>
          <li class="flex items-start gap-2">
            <PhosphorIcon name="verified" size="sm" class="text-[var(--color-success)] shrink-0 mt-0.5" />
            <span><strong>Безопасные платежи</strong> — оплата через защищённые каналы; возвраты и споры регулируются правилами платформы.</span>
          </li>
        </ul>
      </Card>

      <Card title="Как это работает" subtitle="Клиент → охранник принимает → алгоритм подбирает → фирма получает уведомление">
        <ol class="space-y-3 text-sm text-[var(--color-text)]">
          <li class="flex gap-2">
            <span class="font-semibold text-[var(--color-primary)] shrink-0">1.</span>
            <span><strong>Клиент</strong> создаёт заказ охранника — выбирает услугу и время.</span>
          </li>
          <li class="flex gap-2">
            <span class="font-semibold text-[var(--color-primary)] shrink-0">2.</span>
            <span><strong>Охранник</strong> принимает заказ (свободный агент с документами).</span>
          </li>
          <li class="flex gap-2">
            <span class="font-semibold text-[var(--color-primary)] shrink-0">3.</span>
            <span><strong>Фирмы</strong> заранее подали документы и согласие — алгоритм выбирает, какой агент работает на их фирму.</span>
          </li>
          <li class="flex gap-2">
            <span class="font-semibold text-[var(--color-primary)] shrink-0">4.</span>
            <span><strong>Фирма</strong> получает уведомление об агенте (с документами) и продолжает работу. Цены фирм и задания охранников видит только алгоритм — подбор автоматический.</span>
          </li>
        </ol>
      </Card>

      <Card title="Академия безопасности" subtitle="Международные правила (курсы)">
        <ul class="space-y-0">
          <For each={internationalRules}>
            {(rule) => (
              <li class="flex items-center gap-2 py-2.5 border-b border-[var(--color-border-light)] last:border-0">
                <PhosphorIcon name="check" size="sm" class="text-[var(--color-success)] shrink-0" />
                <span class="text-sm text-[var(--color-text)]">{rule.title}</span>
              </li>
            )}
          </For>
        </ul>
      </Card>

      <Card title="Внешний вид" subtitle="Светлый или тёмный экран">
        <div class="flex gap-2">
          <button
            type="button"
            onClick={() => setTheme('light')}
            class={`flex-1 flex items-center justify-center gap-2 py-3 rounded-[var(--radius-md)] border-2 transition-colors ${theme() === 'light' ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/10 text-[var(--color-primary)]' : 'border-[var(--color-border-light)] text-[var(--color-text-secondary)] hover:border-[var(--color-border)]'}`}
          >
            <span class="w-6 h-6 rounded-full bg-[var(--color-surface-elevated)] border border-[var(--color-border)]" aria-hidden />
            <span class="text-sm font-medium">Светлый экран</span>
          </button>
          <button
            type="button"
            onClick={() => setTheme('dark')}
            class={`flex-1 flex items-center justify-center gap-2 py-3 rounded-[var(--radius-md)] border-2 transition-colors ${theme() === 'dark' ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/10 text-[var(--color-primary)]' : 'border-[var(--color-border-light)] text-[var(--color-text-secondary)] hover:border-[var(--color-border)]'}`}
          >
            <span class="w-6 h-6 rounded-full bg-[var(--color-black)] border border-[var(--color-border)]" aria-hidden />
            <span class="text-sm font-medium">Тёмный экран</span>
          </button>
        </div>
      </Card>

      <Card title="Языки" class="cursor-pointer hover:opacity-95 transition-opacity" onClick={() => navigate('/profile/languages')}>
        <p class="text-sm text-[var(--color-text-secondary)] mb-2">Язык приложения</p>
        <ul class="space-y-0">
          <For each={LANGUAGES}>
            {(lang, index) => (
              <li class={`flex items-center justify-between py-2.5 ${index() < LANGUAGES.length - 1 ? 'border-b border-[var(--color-border-light)]' : ''}`}>
                <span class={`text-sm ${lang.id === 'ru' ? 'font-medium text-[var(--color-text)]' : 'text-[var(--color-text-secondary)]'}`}>{lang.label}</span>
                {lang.id === 'ru' && <PhosphorIcon name="check" size="sm" class="text-[var(--color-success)]" />}
              </li>
            )}
          </For>
        </ul>
      </Card>

      <Button
        variant="primary"
        fullWidth
        leftIcon={<PhosphorIcon name="shield" size="sm" class="text-white" />}
        onClick={() => navigate('/')}
      >
        Заказать охранника
      </Button>

      <button
        type="button"
        onClick={() => {
          clearOnboardingDone();
          window.location.href = '/';
        }}
        class="w-full py-2.5 text-sm text-[var(--color-primary)] hover:underline flex items-center justify-center gap-2"
      >
        <PhosphorIcon name="star" size="sm" class="text-[var(--color-primary)]" />
        Повторить обучение
      </button>

      <Button variant="ghost" fullWidth class="!text-[var(--color-error)]" leftIcon={<PhosphorIcon name="arrowLeft" size="sm" class="text-[var(--color-error)]" />} onClick={() => navigate('/')}>
        Выйти
      </Button>

      <Card title="Обновления приложения" subtitle="Версия 1.1 · Предложенные улучшения">
        <ul class="space-y-1.5 text-sm text-[var(--color-text)]">
          <li class="flex items-start gap-2"><PhosphorIcon name="check" size="sm" class="text-[var(--color-success)] shrink-0 mt-0.5" /> Тёмная тема</li>
          <li class="flex items-start gap-2"><PhosphorIcon name="check" size="sm" class="text-[var(--color-success)] shrink-0 mt-0.5" /> Push-уведомления о заказе</li>
          <li class="flex items-start gap-2"><PhosphorIcon name="check" size="sm" class="text-[var(--color-success)] shrink-0 mt-0.5" /> Реальное переключение языков (RU / EN / FR)</li>
          <li class="flex items-start gap-2"><PhosphorIcon name="check" size="sm" class="text-[var(--color-success)] shrink-0 mt-0.5" /> Онлайн-оплата в приложении</li>
          <li class="flex items-start gap-2"><PhosphorIcon name="check" size="sm" class="text-[var(--color-success)] shrink-0 mt-0.5" /> Карта с геолокацией охранников</li>
          <li class="flex items-start gap-2"><PhosphorIcon name="check" size="sm" class="text-[var(--color-success)] shrink-0 mt-0.5" /> Чат с охранником</li>
          <li class="flex items-start gap-2"><PhosphorIcon name="check" size="sm" class="text-[var(--color-success)] shrink-0 mt-0.5" /> История и отзывы после заказа</li>
          <li class="flex items-start gap-2"><PhosphorIcon name="check" size="sm" class="text-[var(--color-success)] shrink-0 mt-0.5" /> Академия: тесты и сертификаты</li>
        </ul>
      </Card>

      <p class="text-center text-xs text-[var(--color-text-secondary)]">Security — охранник сразу находится</p>
      <p class="text-center text-xs text-[var(--color-text-secondary)] mt-1">Версия 1.1</p>
    </div>
  );
}
