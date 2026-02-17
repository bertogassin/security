import { JSX, splitProps, Show } from 'solid-js';

export interface CardProps {
  children: JSX.Element;
  title?: string;
  subtitle?: string;
  footer?: JSX.Element;
  onClick?: () => void;
  hoverable?: boolean;
  class?: string;
}

export function Card(props: CardProps) {
  const [local] = splitProps(props, ['children', 'title', 'subtitle', 'footer', 'onClick', 'hoverable', 'class']);

  return (
    <div
      class={`
        bg-[var(--color-surface-elevated)] rounded-[var(--radius-xl)] overflow-hidden
        shadow-[var(--shadow-md)] border border-[var(--color-border-light)]
        ${local.hoverable ? 'cursor-pointer hover:shadow-[var(--shadow-lg)] transition-shadow duration-200' : ''}
        ${local.class || ''}
      `}
      onClick={local.onClick}
    >
      <Show when={local.title || local.subtitle}>
        <div class="px-4 py-3 border-b border-[var(--color-border-light)]">
          <Show when={local.title}>
            <h3 class="text-lg font-semibold text-[var(--color-text)]">{local.title}</h3>
          </Show>
          <Show when={local.subtitle}>
            <p class="text-sm text-[var(--color-text-secondary)] mt-0.5">{local.subtitle}</p>
          </Show>
        </div>
      </Show>
      <div class="p-4">{local.children}</div>
      <Show when={local.footer}>
        <div class="px-4 py-3 bg-[var(--color-surface)] border-t border-[var(--color-border-light)]">{local.footer}</div>
      </Show>
    </div>
  );
}
