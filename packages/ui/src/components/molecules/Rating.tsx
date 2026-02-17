import { For, splitProps } from 'solid-js';

export interface RatingProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  readonly?: boolean;
  class?: string;
}

export function Rating(props: RatingProps) {
  const [local] = splitProps(props, ['value', 'max', 'size', 'readonly', 'class']);
  const max = () => local.max || 5;
  const size = () => local.size || 'md';
  const sizeStyles = { sm: 'w-4 h-4', md: 'w-5 h-5', lg: 'w-6 h-6' };
  return (
    <div class={`flex items-center gap-0.5 ${local.class || ''}`}>
      <For each={Array(max()).fill(0)}>
        {(_, i) => (
          <span class={i() < Math.floor(local.value) ? 'text-amber-400' : 'text-gray-300'}>{'★'}</span>
        )}
      </For>
    </div>
  );
}
