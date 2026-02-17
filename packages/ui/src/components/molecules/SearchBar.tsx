import { splitProps, createSignal, Show, For } from 'solid-js';
import { PhosphorIcon } from '../atoms/PhosphorIcon';

export interface SearchBarRightIcon {
  icon: string;
  onClick: () => void;
  label?: string;
}

export interface SearchBarProps {
  value?: string;
  placeholder?: string;
  onSearch?: (value: string) => void;
  onChange?: (value: string) => void;
  onClear?: () => void;
  loading?: boolean;
  class?: string;
  /** 3 иконки справа налево (первая в массиве — крайняя правая) */
  rightIcons?: SearchBarRightIcon[];
}

const ICON_SIZE = 'lg';
const RIGHT_BTN = 'min-w-[44px] min-h-[44px]';

export function SearchBar(props: SearchBarProps) {
  const [local] = splitProps(props, [
    'value', 'placeholder', 'onSearch', 'onChange', 'onClear', 'loading', 'class', 'rightIcons',
  ]);
  const [internalValue, setInternalValue] = createSignal(local.value ?? '');
  /** Контролируемый: value из props; иначе — internalValue */
  const displayValue = () => (local.value !== undefined ? local.value : internalValue());

  const handleInput = (e: InputEvent) => {
    const value = (e.target as HTMLInputElement).value;
    setInternalValue(value);
    local.onChange?.(value);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') local.onSearch?.(displayValue());
  };

  const handleClear = () => {
    setInternalValue('');
    local.onChange?.('');
    local.onClear?.();
  };

  const hasRightIcons = () => (local.rightIcons?.length ?? 0) > 0;
  const rightPadding = () =>
    hasRightIcons() ? `${(local.rightIcons!.length * 44 + 8).toString()}px` : displayValue() ? '3.5rem' : '0.75rem';

  return (
    <div class={`relative ${local.class ?? ''}`}>
      <div class="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)] pointer-events-none">
        <Show
          when={!local.loading}
          fallback={
            <svg class="animate-spin h-6 w-6" viewBox="0 0 24 24" aria-hidden>
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" />
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          }
        >
          <PhosphorIcon name="search" size={ICON_SIZE} class="text-[var(--color-text-secondary)]" />
        </Show>
      </div>
      <input
        type="text"
        value={displayValue()}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        placeholder={local.placeholder ?? 'Поиск...'}
        class="w-full pl-12 pr-[var(--search-right-padding,3.5rem)] py-3 min-h-[48px] bg-[var(--color-surface)] border border-transparent rounded-full text-[var(--color-text)] placeholder:text-[var(--color-text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:bg-[var(--color-surface-elevated)] focus:border-[var(--color-border-light)] transition-all duration-200 text-base"
        style={{ '--search-right-padding': rightPadding() } as Record<string, string>}
      />
      <div class="absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-0 flex-row-reverse">
        <Show when={hasRightIcons()}>
          <For each={local.rightIcons}>
            {(item) => (
              <button
                type="button"
                onClick={item.onClick}
                class={`${RIGHT_BTN} flex items-center justify-center text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] hover:opacity-90 rounded-full transition-colors`}
                title={item.label}
                aria-label={item.label ?? item.icon}
              >
                <PhosphorIcon name={item.icon} size={ICON_SIZE} />
              </button>
            )}
          </For>
        </Show>
        <Show when={!hasRightIcons() && displayValue()}>
          <button
            type="button"
            onClick={handleClear}
            class={`${RIGHT_BTN} flex items-center justify-center text-[var(--color-text)] hover:opacity-70 rounded-full`}
            aria-label="Очистить"
          >
            <PhosphorIcon name="close" size={ICON_SIZE} />
          </button>
        </Show>
      </div>
    </div>
  );
}
