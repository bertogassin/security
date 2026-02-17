import { JSX } from 'solid-js';
import { useNavigate, useLocation } from '@solidjs/router';
import { PhosphorIcon } from '@security/ui';

const navItems = [
  { id: 'home', label: 'Главная', icon: 'shield', path: '/' },
  { id: 'orders', label: 'Заказы', icon: 'list', path: '/orders' },
  { id: 'profile', label: 'Профиль', icon: 'user', path: '/profile' },
];

interface LayoutProps {
  children: JSX.Element;
}

export function Layout(props: LayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const activeId = () => {
    const exact = navItems.find((i) => i.path === location.pathname)?.id;
    if (exact) return exact;
    if (location.pathname.startsWith('/profile')) return 'profile';
    return 'home';
  };

  return (
    <div class="min-h-screen flex flex-col bg-[var(--color-surface)]" style={{ paddingBottom: 'calc(5rem + env(safe-area-inset-bottom, 0))' }}>
      <main class="flex-1 min-h-0 pt-[env(safe-area-inset-top,0)]" style={{ minHeight: 'calc(100vh - 5rem - env(safe-area-inset-bottom, 0))' }}>{typeof props.children === 'function' ? (props.children as () => JSX.Element)() : props.children}</main>
      <nav class="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 safe-area-inset-bottom" style={{ background: 'var(--color-black)' }}>
        <div class="flex items-center justify-around h-16 max-w-[430px] mx-auto">
          {navItems.map((item) => {
            const isActive = () => activeId() === item.id;
            return (
              <button
                type="button"
                onClick={() => navigate(item.path)}
                class="relative flex flex-col items-center justify-center w-full h-full gap-1 transition-all duration-200 text-white/70 hover:text-white active:opacity-90 min-w-0 min-h-[56px]"
              >
                <span class={`absolute top-1.5 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full transition-opacity ${isActive() ? 'bg-[var(--color-primary)] opacity-100' : 'opacity-0'}`} />
                <PhosphorIcon name={item.icon} size="md" class={`shrink-0 ${isActive() ? 'text-white' : 'text-white/70'}`} />
                <span class={`text-xs truncate w-full text-center px-0.5 ${isActive() ? 'font-semibold text-white' : 'text-white/70'}`}>{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
