/**
 * Тема интерфейса: светлая / тёмная. Сохраняется в localStorage, применяется к document.
 */

import { createSignal } from 'solid-js';

export type ThemeId = 'light' | 'dark';

const STORAGE_KEY = 'security-theme';

function getStored(): ThemeId {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v === 'dark' || v === 'light') return v;
  } catch (_) {}
  return 'light';
}

function apply(theme: ThemeId) {
  document.documentElement.setAttribute('data-theme', theme);
}

const initial = getStored();
apply(initial);

const [theme, setThemeSignal] = createSignal<ThemeId>(initial);

export function getTheme(): ThemeId {
  return theme();
}

export function setTheme(themeId: ThemeId) {
  try {
    localStorage.setItem(STORAGE_KEY, themeId);
  } catch (_) {}
  apply(themeId);
  setThemeSignal(themeId);
}

export function toggleTheme(): ThemeId {
  const next: ThemeId = theme() === 'light' ? 'dark' : 'light';
  setTheme(next);
  return next;
}

/** Реактивное значение темы для UI. */
export { theme };
