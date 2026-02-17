import { JSX, splitProps, Show } from 'solid-js';

export interface ButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
  class?: string;
}

export function Button(props: ButtonProps) {
  const [local, rest] = splitProps(props, [
    'variant', 'size', 'loading', 'fullWidth', 'leftIcon', 'rightIcon', 'children', 'class', 'disabled',
  ]);

  const variant = () => local.variant || 'primary';
  const size = () => local.size || 'md';

  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  const variantStyles = {
    primary: 'bg-[var(--color-primary)] text-[var(--color-text-inverse)] hover:opacity-95 focus:ring-[var(--color-primary-light)] active:opacity-90',
    secondary: 'bg-[var(--color-border)] text-[var(--color-text)] hover:bg-[var(--color-border-light)] focus:ring-[var(--color-secondary)] active:opacity-90',
    outline: 'border-2 border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)]/5 focus:ring-[var(--color-primary-light)] active:bg-[var(--color-primary)]/10',
    ghost: 'text-[var(--color-text)] hover:bg-[var(--color-border-light)] focus:ring-[var(--color-secondary)] active:bg-[var(--color-border)]',
    danger: 'bg-[var(--color-error)] text-white hover:opacity-95 focus:ring-[var(--color-error)] active:opacity-90',
  };
  const sizeStyles = {
    sm: 'px-3 py-2 text-sm gap-1.5 min-h-[40px]',
    md: 'px-4 py-2.5 text-base gap-2 min-h-[44px]',
    lg: 'px-6 py-3 text-lg gap-2.5 min-h-[48px]',
  };

  return (
    <button
      {...rest}
      disabled={local.disabled || local.loading}
      class={`${baseStyles} ${variantStyles[variant()]} ${sizeStyles[size()]} ${local.fullWidth ? 'w-full' : ''} ${local.class || ''}`}
    >
      <Show when={local.loading}>
        <svg class="animate-spin h-4 w-4" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" />
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      </Show>
      <Show when={!local.loading && local.leftIcon}>{local.leftIcon}</Show>
      <span>{local.children}</span>
      <Show when={!local.loading && local.rightIcon}>{local.rightIcon}</Show>
    </button>
  );
}
