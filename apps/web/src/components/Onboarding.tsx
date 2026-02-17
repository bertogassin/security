import { createSignal, Show } from 'solid-js';
import { PhosphorIcon } from '@security/ui';

const SLIDES = [
  {
    icon: 'shield' as const,
    title: 'Охранники рядом',
    text: 'Выберите доступного охранника по рейтингу и расстоянию — онлайн и сразу.',
  },
  {
    icon: 'guard' as const,
    title: 'Быстрые действия',
    text: 'Охрана, патруль или сопровождение — один тап до заказа.',
  },
  {
    icon: 'location' as const,
    title: 'Отслеживание в реальном времени',
    text: 'Видьте статус заказа и движение охранника к вам.',
  },
  {
    icon: 'star' as const,
    title: 'Всё под контролем',
    text: 'Заказы, профиль и безопасность — в одном приложении.',
  },
];

interface OnboardingProps {
  onDone: () => void;
}

export function Onboarding(props: OnboardingProps) {
  const [step, setStep] = createSignal(0);
  const current = () => SLIDES[step()];
  const isLast = () => step() === SLIDES.length - 1;

  const handleNext = () => {
    if (isLast()) {
      props.onDone();
    } else {
      setStep((s) => s + 1);
    }
  };

  const handleSkip = () => props.onDone();

  return (
    <div class="fixed inset-0 z-[100] flex flex-col bg-[var(--color-surface)]">
      <div class="flex-1 flex flex-col items-center justify-center px-6 pt-12 pb-8">
        <button
          type="button"
          onClick={handleSkip}
          class="absolute top-4 right-4 py-2 px-3 min-h-[44px] flex items-center text-[var(--color-text-secondary)] hover:text-[var(--color-text)] text-sm rounded-lg active:bg-black/5"
        >
          Пропустить
        </button>

        <div
          class="w-20 h-20 rounded-2xl flex items-center justify-center mb-8"
          style={{ background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)' }}
        >
          <PhosphorIcon name={current().icon} size="xl" class="text-[var(--color-white)]" />
        </div>
        <h2 class="text-xl font-bold text-[var(--color-text)] text-center mb-2">{current().title}</h2>
        <p class="text-[var(--color-text-secondary)] text-center text-sm leading-relaxed max-w-[280px]">{current().text}</p>
      </div>

      <div class="flex justify-center gap-1.5 pb-4">
        {SLIDES.map((_, i) => (
          <span
            class={`block w-2 h-2 rounded-full transition-colors ${
              i === step() ? 'bg-[var(--color-primary)] w-6' : 'bg-[var(--color-border)]'
            }`}
          />
        ))}
      </div>

      <div class="px-6 pb-8 safe-area-inset-bottom">
        <button
          type="button"
          onClick={handleNext}
          class="w-full py-3.5 min-h-[52px] rounded-xl font-semibold text-[var(--color-white)] transition-opacity active:opacity-90"
          style={{ background: 'var(--color-primary)' }}
        >
          {isLast() ? 'Начать' : 'Далее'}
        </button>
      </div>
    </div>
  );
}
