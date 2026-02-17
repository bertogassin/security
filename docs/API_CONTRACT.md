# Контракт API (Security Backend)

Один источник правды для фронта и бэкенда. Изменения в эндпоинтах или полях — сюда.

---

## Base

- **Backend:** Rust (Axum), порт по умолчанию `8080` (переменная `SECURITY_PORT`).
- **Frontend:** вызовы через `shared/api.ts`; в dev — proxy на бэкенд.

---

## Эндпоинты

### `GET /healthz`

Проверка доступности сервиса.

- **Ответ:** `200 OK`, тело `OK` (текст).

---

### `GET /guards`

Список охранников (без привязки к геолокации).

- **Ответ:** JSON
  - `guards: array` — массив объектов охранника (см. ниже).
  - `total: number` — количество.

---

### `GET /guards/nearby`

Охранники рядом с точкой.

- **Query:**  
  - `latitude` (обязательный), `longitude` (обязательный) — координаты.  
  - `radius_km` (опционально, по умолчанию 10) — радиус в км.  
  - `limit` (опционально, по умолчанию 20) — макс. количество.
- **Ответ:** JSON
  - `guards: array` — массив охранников с полем `distance_km`.
  - `center: { latitude, longitude }`.
  - `radius_km: number`.
  - `bounding_box` — гео-бокс (для карты).

---

## Объект охранника (в ответах)

Поля в snake_case, как отдаёт бэкенд. Фронт использует типы из `domains/guards`.

- `id`, `name`, `phone`, `avatar_url`
- `verification_level`: строка `none` | `basic` | `standard` | `premium` | `elite`
- `rating`, `total_reviews`, `latitude`, `longitude`
- `is_available`, `is_online`, `hourly_rate`, `experience_years`
- `specializations`: массив строк (snake_case: `bodyguard`, `event_security`, …)
- В ответе `/guards/nearby` у каждого элемента есть также `distance_km`, `score`.

### `GET /guards/:id`

Профиль одного охранника.

- **Ответ:** `200 OK` — JSON-объект охранника (те же поля, что выше; плюс `completed_orders`). `404` — не найден.

---

### `GET /orders`

Список заказов текущего пользователя.

- **Ответ:** JSON `{ "orders": [ ... ] }`. Каждый элемент:
  - `id`, `status` (`new` | `accepted` | `in_progress` | `completed` | `cancelled`), `service_type`, `address`, `price`, `created_at`, опционально `scheduled_at`
  - `guard`: опционально `{ "name", "rating", "phone" }`.

---

### `GET /orders/:id`

Один заказ по id.

- **Ответ:** `200 OK` — объект заказа (как в массиве `orders`). `404` — не найден.
