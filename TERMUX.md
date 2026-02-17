# Termux — скачать и запустить на телефоне

## 1. Установить зависимости (один раз)

```bash
pkg update && pkg install -y git nodejs
npm install -g pnpm
```

## 2. Скачать проект

```bash
cd ~
git clone https://github.com/bertogassin/security.git
cd security
```

## 3. Собрать веб и запустить

```bash
pnpm install
pnpm run build:web
```

Дальше два варианта.

### Вариант A: только фронт (статический сервер)

```bash
cd apps/web/dist
python -m http.server 8080
```

Открой в браузере: **http://localhost:8080**

### Вариант B: бэкенд (Rust) в Termux

```bash
pkg install rust
cd ~/security
cargo build --release -p security-backend
./target/release/security-server
```

API будет на **http://localhost:8080**. Фронт в браузере подключай к этому адресу или раздай `apps/web/dist` через `python -m http.server 3001` и в приложении укажи API URL.

---

**Одна строка (после `pkg install git nodejs` и `npm i -g pnpm`):**

```bash
git clone https://github.com/bertogassin/security.git && cd security && pnpm install && pnpm run build:web && cd apps/web/dist && python -m http.server 8080
```
