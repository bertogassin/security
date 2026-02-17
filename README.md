# Security — Онлайн охранник сразу находится

**Концепция:** Сервис, в котором **охранник онлайн находится сразу** — по местоположению показываются доступные охранники рядом, можно быстро выбрать и заказать.

**Concept:** A service where **an online guard is found immediately** — by location you see available guards nearby and can quickly choose and order.

---

## Что внутри / Contents

Перенесено из проекта BOLH (общее ядро + всё, что касается охраны):

- **packages/core** — Rust: модуль охранников (guard discovery, ranking, геолокация), гео (расстояние, геозоны).
- **backend** — API: список охранников, охранники рядом (`/guards`, `/guards/nearby`), поиск, доступность.
- **packages/ui** — UI-компоненты: карточка охранника (GuardCard), база (Avatar, Badge, Rating, Icon и др.).
- **apps/web** — веб-приложение: страница «Охранники рядом» / «Find guard now» — сразу видно, кто доступен онлайн.

**From BOLH:** shared core logic and everything related to guard/security (охрана): guard discovery, geo, API, GuardCard, web app to find guard now.

---

## Стек / Stack

- **Core:** Rust (guards, geo).
- **Backend:** Rust + Axum (optional; можно поднять позже с БД).
- **Frontend:** SolidJS + TypeScript + Vite.
- **UI:** GuardCard, атомы/молекулы из BOLH.

---

## Запуск / Run

```bash
pnpm install
pnpm dev:web    # веб: охранники рядом
# backend (Rust) — при необходимости: cargo run -p security-backend
```

---

## Репозиторий / Repository

**GitHub:** https://github.com/bertogassin/security  
**Автор / Author:** bertogassin

Отдельный проект только про охрану; идея — **онлайн охранник сразу находится**.
