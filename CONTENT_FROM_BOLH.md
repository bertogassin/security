# Что перенесено из BOLH / Content moved from BOLH

Репозиторий **security** содержит только то, что относится к охране (и общее ядро для этого). Идея: **онлайн охранник сразу находится**.

---

## Из BOLH перенесено / From BOLH

### Общее (general)

- **packages/core (Rust):** модуль `guards` (Guard, GuardDiscovery, RankedGuard, Specialization, VerificationLevel, фильтры), модуль `geo` (GeoService: расстояние, геозона, bounding box). В BOLH это было в `packages/core/src/guards` и `packages/core/src/geo`.
- **packages/ui:** карточка охранника GuardCard и базовые атомы/молекулы (Avatar, Badge, Icon, Rating) — упрощённые копии из BOLH `packages/ui`.
- **backend:** API для охранников — список, рядом по координатам, ранжирование. В BOLH: `backend/src/api/handlers/guards.rs`, `backend/src/services/guard_service.rs`, роут `/guards` (здесь оставлено имя **guards**, т.к. проект только про охрану).

### Только охрана (guard/security only)

- Логика «охранник рядом»: поиск по координатам, расстояние, ранжирование (рейтинг, верификация, доступность).
- Эндпоинты: `GET /guards`, `GET /guards/nearby?latitude=&longitude=&radius_km=`.
- Веб-страница «Охранники рядом» — сразу видно, кто доступен онлайн (список GuardCard).

---

## Структура репозитория security

```
security/
├── README.md                 # Концепция: охранник сразу находится
├── CONTENT_FROM_BOLH.md      # Этот файл
├── Cargo.toml                # Workspace: packages/core, backend
├── package.json              # pnpm: dev:web, build:web, dev:api
├── pnpm-workspace.yaml
├── packages/
│   ├── core/                 # Rust: guards, geo
│   └── ui/                   # GuardCard + atoms/molecules
├── backend/                  # Rust Axum: /guards, /guards/nearby
└── apps/
    └── web/                  # Одна страница: охранники рядом
```

---

**Автор:** bertogassin  
**GitHub:** https://github.com/bertogassin/security
