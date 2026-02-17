# Где какой язык в проекте Security

---

## Rust

| Путь | Назначение |
|------|------------|
| **backend/** | API-сервер (Axum) |
| `backend/src/main.rs` | Точка входа, роуты |
| **packages/core/** | Ядро: типы, логика |
| `packages/core/src/lib.rs` | Публичное API ядра |
| `packages/core/src/guards.rs` | Модель охранников |
| `packages/core/src/geo.rs` | Геолокация |
| **Cargo.toml** (корень, backend, packages/core) | Зависимости Rust |

---

## TypeScript / TSX

| Путь | Назначение |
|------|------------|
| **apps/web/src/** | Фронт приложения |
| `App.tsx`, `main.tsx` | Роутинг, точка входа |
| `pages/*.tsx` | Экраны (Главная, Заказы, Профиль, Языки, Безопасность, Академия, Избранное, Настройки, Помощь, Детали охранника) |
| `components/Layout.tsx`, `Onboarding.tsx` | Шапка, онбординг |
| **apps/web/src/domains/*.ts** | Типы (верификация, аккаунт) |
| **apps/web/src/shared/languages.ts** | Языки приложения, онбординг |
| **packages/ui/src/** | UI-библиотека |
| `components/**/*.tsx` | Компоненты (Button, Card, GuardCard, SearchBar, PhosphorIcon и т.д.) |
| `index.ts`, `styles/tokens.ts` | Экспорты, токены |
| **Конфиги** | `vite.config.ts`, `capacitor.config.ts` |

---

## CSS

| Путь | Назначение |
|------|------------|
| **packages/ui/src/styles/global.css** | Переменные, сброс, утилиты |
| **apps/web/src/index.css** | Tailwind, импорт global.css, .page, .back-button |

---

## HTML

| Путь | Назначение |
|------|------------|
| **apps/web/index.html** | Единственная страница SPA, подключение скриптов |

---

## Kotlin / Java (Android, через Capacitor)

| Путь | Назначение |
|------|------------|
| **android/** | Сборка под Android (генерируется Capacitor) |
| `android/app/build.gradle` | Сборка приложения |
| `android/app/capacitor.build.gradle` | Подключение Capacitor (Java 17) |

---

## Groovy (Gradle)

| Путь | Назначение |
|------|------------|
| **android/*.gradle**, **android/**/build.gradle** | Сборка Android (зависимости, версии SDK) |

---

## JSON / прочее

- **package.json** — скрипты и зависимости Node (pnpm)
- **docs/** — документация (Markdown)
