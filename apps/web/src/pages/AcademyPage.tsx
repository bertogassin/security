import { For } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import { Card, PhosphorIcon } from '@security/ui';

const internationalRules = [
  'Применение силы (ООН, принцип соразмерности)',
  'Права человека при охране (ЕКПЧ)',
  'Частная охрана: стандарты ISO',
  'Огнестрельное оружие и спецсредства',
  'Документирование и отчётность',
  'Монтевидейская конвенция (частная охрана)',
  'Кодекс поведения сотрудников охраны (ООН)',
  'Задержание и доставление: правовые рамки',
  'Оказание первой помощи (международные протоколы)',
  'Эвакуация и кризисные ситуации',
  'Конфиденциальность и защита персональных данных (GDPR)',
  'Противодействие коррупции и взяткам',
  'Охрана объектов критической инфраструктуры',
  'Работа с правоохранительными органами',
  'Дискриминация и равное обращение',
  'Охрана массовых мероприятий (международная практика)',
  'Сопровождение грузов и логистика',
  'Кибербезопасность на объекте',
];

export function AcademyPage() {
  const navigate = useNavigate();

  return (
    <div class="page px-4">
      <button type="button" onClick={() => navigate('/profile')} class="back-button mb-4">
        <PhosphorIcon name="arrowLeft" size="md" />
        <span>Назад</span>
      </button>
      <h1 class="text-xl font-bold text-[var(--color-text)] mb-1">Академия безопасности</h1>
      <p class="text-sm text-[var(--color-text-secondary)] mb-4">Международные правила и курсы</p>
      <Card>
        <ul class="space-y-0">
          <For each={internationalRules}>
            {(rule) => (
              <li class="flex items-center gap-2 py-2.5 border-b border-[var(--color-border-light)] last:border-0">
                <PhosphorIcon name="check" size="sm" class="text-[var(--color-success)] shrink-0" />
                <span class="text-sm text-[var(--color-text)]">{rule}</span>
              </li>
            )}
          </For>
        </ul>
      </Card>
    </div>
  );
}
