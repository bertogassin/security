import { splitProps, createMemo } from 'solid-js';

export interface AvatarProps {
  src?: string;
  name?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  status?: 'online' | 'offline' | 'busy';
  class?: string;
}

export function Avatar(props: AvatarProps) {
  const [local] = splitProps(props, ['src', 'name', 'size', 'status', 'class']);
  const size = () => local.size || 'md';
  const sizeStyles = { sm: 'w-8 h-8 text-xs', md: 'w-10 h-10 text-sm', lg: 'w-12 h-12 text-base', xl: 'w-16 h-16 text-lg' };
  const statusStyles = { online: 'bg-green-500', offline: 'bg-gray-400', busy: 'bg-red-500' };
  const initials = createMemo(() => {
    if (!local.name) return '?';
    return local.name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
  });
  return (
    <div class={`relative inline-flex shrink-0 ${local.class || ''}`}>
      {local.src ? (
        <img src={local.src} alt={local.name} class={`rounded-full object-cover ${sizeStyles[size()]}`} />
      ) : (
        <div class={`rounded-full flex items-center justify-center font-medium text-white bg-blue-500 ${sizeStyles[size()]}`}>
          {initials()}
        </div>
      )}
      {local.status && (
        <span class={`absolute bottom-0 right-0 rounded-full border-2 border-white ${statusStyles[local.status]}`} style={{ width: '25%', height: '25%' }} />
      )}
    </div>
  );
}
