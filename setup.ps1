# setup.ps1
# Kjør fra root mappen docker-compose.yml <-- docker mappen ligger også i root mappen :)

$ErrorActionPreference = "Stop"
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new($true)

function Fail($msg) {
  Write-Host ""
  Write-Host "FEIL: $msg" -ForegroundColor Red
  exit 1
}

function Has($cmd) {
  return [bool](Get-Command $cmd -ErrorAction SilentlyContinue)
}

Write-Host "Sjekker om alt er innstallert"

if (-not (Has "docker")) { Fail "Kunne ikke finne Docker CLI - Installer Docker Desktop og prøv igjen" }
if (-not (Has "node"))   { Fail "Node.js ble ikke funnet. Installer Node.js" }
if (-not (Has "npm"))    { Fail "npm ble ikke funnet. Installer Node.js (inkluderer npm)." }

function Test-DockerReady {
  try { docker info *> $null; return ($LASTEXITCODE -eq 0) }
  catch { return $false }
}

# 1 Starter Docker Desktop om den ikke kjører
if (-not (Test-DockerReady)) {
  Write-Host "Docker kjører ikke - prøver å starte Docker Desktop..."

  $dockerDesktop = "C:\Program Files\Docker\Docker\Docker Desktop.exe"
  if (Test-Path $dockerDesktop) {
    Start-Process $dockerDesktop | Out-Null
  } else {
    Fail "Kunne ikke finne Docker Desktop -  Start Docker Desktop manuelt og kjør setup.ps1 igjen"
  }

  Write-Host "Venter på Docker Engine..."
  $ready = $false
  for ($i=0; $i -lt 90; $i++) {
    Start-Sleep -Seconds 2
    if (Test-DockerReady) { $ready = $true; break }
  }
  if (-not $ready) { Fail "Docker kunne ikke kjøre ---- Sjekk Docker Desktop og prøv igjen." }
}

# 2 Start DB
Write-Host "Starter database (docker compose)..."
docker compose up -d | Out-Null

$cid = (docker compose ps -q db).Trim()
if (-not $cid) { Fail "Fant ikke db-container (service: db). Sjekk docker-compose.yml." }

# 3 Vent på Postgres
Write-Host "Venter på database tilkobling..."
$pgReady = $false
for ($i=0; $i -lt 60; $i++) {
  docker exec $cid bash -lc "pg_isready -U ungokonom -d ungokonom >/dev/null 2>&1"
  if ($LASTEXITCODE -eq 0) { $pgReady = $true; break }
  Start-Sleep -Seconds 1
}
if (-not $pgReady) { Fail "Databasen ble ikke klar." }

# 4 SQL via STDIN (robust på Windows)
Write-Host "Oppretter og eller oppdaterer tabeller..."

$sql = @"
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL
);
ALTER TABLE users ADD COLUMN IF NOT EXISTS active BOOLEAN NOT NULL DEFAULT TRUE;
"@

# Sender SQL inn i psql via pipe i containeren
$sqlEsc = $sql.Replace("`r","").Replace("`n","\n")
$cmd = "PGPASSWORD=ungokonom psql -U ungokonom -d ungokonom -v ON_ERROR_STOP=1"

# Vi bruker echo -e for å få \n tolket riktig inne i bash
docker exec $cid bash -lc "echo -e '$sqlEsc' | $cmd"
if ($LASTEXITCODE -ne 0) { Fail "Klarte ikke å opprette/oppdatere tabeller." }

# 5 backend\.env
if (!(Test-Path "backend\.env")) {
  if (Test-Path "backend\.env.example") {
    Copy-Item "backend\.env.example" "backend\.env"
    Write-Host "Laget backend\.env fra backend\.env.example"
  } else {
    "DATABASE_URL=postgresql://ungokonom:ungokonom@127.0.0.1:5433/ungokonom" | Set-Content "backend\.env" -Encoding utf8
    "PORT=3000" | Add-Content "backend\.env" -Encoding utf8
    Write-Host "Laget backend\.env (fallback)"
  }
}

# 6 npm install
Write-Host "Installerer backend..."
Push-Location "backend"
npm install
Pop-Location

# 7 Starter backend i nytt vindu
Write-Host ""
Write-Host "Starter backend i nytt vindu..."
Start-Process powershell -WorkingDirectory (Join-Path $PSScriptRoot "backend") -ArgumentList "-NoExit","-Command","npm start"

# 8 Start frontend-server (live-server-ish) i nytt vindu
Write-Host "Starter enkel frontend-server i nytt vindu..."
Start-Process powershell -WorkingDirectory $PSScriptRoot -ArgumentList "-NoExit","-Command","npx --yes http-server . -p 5500 -c-1"

# 9 Åpner VS Code om mulig
if (Has "code") {
  Write-Host "Åpner VS Code..."
  Start-Process "code" -ArgumentList "."
}

# 10 Åpner login-siden i nettleser
$loginUrl = "http://127.0.0.1:5500/Smidig-Prosjekt/Login/login.html"

Write-Host ""
Write-Host "Oppsett ferdig!"
Write-Host "Backend: http://127.0.0.1:3000"
Write-Host "Login:   $loginUrl"
Start-Process $loginUrl
