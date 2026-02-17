# Установка на телефон

## Готовый APK (уже собран)

Файл: **`android/app/build/outputs/apk/debug/app-debug.apk`** (~4 МБ)

### Вариант 1: USB-кабель
1. Включите на телефоне **«Режим разработчика»** и **«Отладка по USB»**.
2. Подключите телефон к компьютеру.
3. В папке проекта выполните:
   ```bash
   cd android
   .\gradlew.bat installDebug
   ```
   Или установите APK вручную: `adb install app\build\outputs\apk\debug\app-debug.apk`

### Вариант 2: Файл на телефон
1. Скопируйте `android/app/build/outputs/apk/debug/app-debug.apk` на телефон (мессенджер, облако, USB).
2. На телефоне откройте файл и разрешите установку из неизвестных источников при запросе.
3. Установите приложение.

---

## Пересборка (после изменений в коде)

```bash
pnpm run build:web
npx cap sync android
cd android
.\gradlew.bat assembleDebug
```

Новый APK будет в `android/app/build/outputs/apk/debug/app-debug.apk`.

**Важно:** после `npx cap sync android` в `android/app/capacitor.build.gradle` снова может появиться Java 21. Если сборка выдаст «invalid source release: 21», замените в этом файле `VERSION_21` на `VERSION_17` и снова запустите `.\gradlew.bat assembleDebug`.
