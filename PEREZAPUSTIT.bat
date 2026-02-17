@echo off
cd /d "%~dp0"
echo Osvobozhdayu port 3001...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3001') do taskkill /F /PID %%a 2>nul
timeout /t 2 /nobreak >nul
echo Zapusk Security...
start "" cmd /k "pnpm dev:web"
timeout /t 6 /nobreak >nul
start http://localhost:3001/
echo Gotovo.
