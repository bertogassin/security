# Установка Security на телефон как отдельное приложение

## Вариант 1: Установить как PWA (без Android Studio)

1. На телефоне открой в браузере (Chrome/Safari) адрес приложения:
   - Если сервер запущен у тебя на компе в той же Wi‑Fi: **http://192.168.1.14:3001**
   - Или после деплоя: **https://твой-домен.ru**

2. В меню браузера выбери:
   - **Chrome (Android):** ⋮ → «Установить приложение» / «Добавить на главный экран»
   - **Safari (iPhone):** Поделиться → «На экран Домой»

3. На главном экране появится иконка **Security** — приложение откроется без адресной строки, как отдельное приложение.

---

## Вариант 2: Собрать APK (нужен Android Studio / SDK)

1. Установи [Android Studio](https://developer.android.com/studio) (вместе с ним ставится Android SDK).

2. Задай переменную окружения (в PowerShell один раз):
   ```powershell
   [System.Environment]::SetEnvironmentVariable('ANDROID_HOME', 'C:\Users\ТВОЙ_ПОЛЬЗОВАТЕЛЬ\AppData\Local\Android\Sdk', 'User')
   ```
   Путь к SDK смотри в Android Studio: Settings → Appearance & Behavior → System Settings → Android SDK.

3. Собери веб и синхронизируй с Android:
   ```bash
   cd C:\Users\zabir\Desktop\security
   pnpm run build:android
   ```

4. Собери APK одним из способов:
   - **Через Android Studio:** открой папку `android` → Build → Build Bundle(s) / APK(s) → Build APK(s). APK будет в `android/app/build/outputs/apk/debug/`.
   - **Через командную строку** (если ANDROID_HOME задан):
     ```bash
     cd android
     .\gradlew assembleDebug
     ```
     APK: `android\app\build\outputs\apk\debug\app-debug.apk`.

5. Перенеси `app-debug.apk` на телефон (USB, облако, мессенджер) и установи (разреши установку из неизвестных источников при запросе).
