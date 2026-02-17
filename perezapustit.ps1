# Перезапуск Security — каждый раз сразу
$port = 3001
$url = "http://localhost:$port"

# Освободить порт
Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue | ForEach-Object {
  Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue
}
Start-Sleep -Seconds 2

# Запуск
Set-Location $PSScriptRoot
Start-Process powershell -ArgumentList "-NoExit", "-Command", "pnpm dev:web; Start-Process '$url'"
Start-Sleep -Seconds 6
Start-Process $url
