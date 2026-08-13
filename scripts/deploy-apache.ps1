param(
  [string]$TargetRoot = "Z:\html\dist",
  [switch]$Clean
)

$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $PSScriptRoot
$distRoot = Join-Path $projectRoot "dist"

Write-Host ""
Write-Host "Storm Forge - despliegue en Apache" -ForegroundColor Cyan
Write-Host "Proyecto: $projectRoot"
Write-Host "Destino:  $TargetRoot"
Write-Host ""

if (-not (Test-Path -LiteralPath $TargetRoot -PathType Container)) {
  $targetParent = Split-Path -Parent $TargetRoot

  if ($TargetRoot -eq "Z:\html\dist" -and (Test-Path -LiteralPath "Z:\" -PathType Container)) {
    New-Item -ItemType Directory -Path $TargetRoot -Force | Out-Null
  }
  elseif (-not $targetParent -or -not (Test-Path -LiteralPath $targetParent -PathType Container)) {
    throw "No se puede acceder al directorio padre de '$TargetRoot'. Comprueba que la unidad Z: está conectada en esta sesión o ejecuta el script con -TargetRoot '\\servidor\recurso\html\dist'."
  }
  else {
    New-Item -ItemType Directory -Path $TargetRoot | Out-Null
  }
}

$resolvedTarget = (Resolve-Path -LiteralPath $TargetRoot).Path
$resolvedProject = (Resolve-Path -LiteralPath $projectRoot).Path
$deploymentMarker = ".storm-forge-deploy"

if (
  $resolvedTarget -eq $resolvedProject -or
  $resolvedTarget -eq "C:\" -or
  $resolvedTarget.Length -lt 3
) {
  throw "Destino rechazado por seguridad: '$resolvedTarget'."
}

if ($resolvedTarget -match "^[A-Za-z]:\\$") {
  throw "No se permite publicar directamente en la raíz de una unidad. Destino recibido: '$resolvedTarget'."
}

if ($Clean) {
  $targetEntries = @(Get-ChildItem -LiteralPath $resolvedTarget -Force)
  $markerPath = Join-Path $resolvedTarget $deploymentMarker
  $indexPath = Join-Path $resolvedTarget "index.html"
  $looksLikeStormForge = Test-Path -LiteralPath $markerPath -PathType Leaf

  if (-not $looksLikeStormForge -and (Test-Path -LiteralPath $indexPath -PathType Leaf)) {
    $looksLikeStormForge = (Get-Content -LiteralPath $indexPath -Raw) -match "Storm Forge"
  }

  if ($targetEntries.Count -gt 0 -and -not $looksLikeStormForge) {
    throw "Destino rechazado: '$resolvedTarget' contiene archivos que no pertenecen a Storm Forge."
  }
}

Push-Location $projectRoot

try {
  Write-Host "[1/3] Compilando la aplicación..." -ForegroundColor Yellow
  & npm.cmd run build

  if ($LASTEXITCODE -ne 0) {
    throw "La compilación ha fallado con el código $LASTEXITCODE."
  }

  if (-not (Test-Path -LiteralPath (Join-Path $distRoot "index.html") -PathType Leaf)) {
    throw "La compilación no ha generado dist\index.html."
  }

  Write-Host "[2/3] Publicando los archivos en Apache..." -ForegroundColor Yellow

  $copyTarget = $resolvedTarget
  $stagingTarget = $null
  $backupTarget = $null

  if ($Clean) {
    $targetParent = Split-Path -Parent $resolvedTarget
    $deploymentId = [guid]::NewGuid().ToString("N")
    $stagingTarget = Join-Path $targetParent ".storm-forge-stage-$deploymentId"
    $backupTarget = Join-Path $targetParent ".storm-forge-backup-$deploymentId"
    New-Item -ItemType Directory -Path $stagingTarget -ErrorAction Stop | Out-Null
    $copyTarget = $stagingTarget
    Write-Host "      Preparando una publicación atómica antes de sustituir la actual..." -ForegroundColor DarkYellow
  }

  & robocopy `
    $distRoot `
    $copyTarget `
    /E `
    /R:2 `
    /W:1 `
    /NFL `
    /NDL `
    /NJH `
    /NJS `
    /NP

  $robocopyExitCode = $LASTEXITCODE

  if ($robocopyExitCode -gt 7) {
    throw "Robocopy no ha podido publicar la aplicación. Código: $robocopyExitCode."
  }

  $copiedIndex = Join-Path $copyTarget "index.html"
  $copiedMarker = Join-Path $copyTarget $deploymentMarker

  if (
    -not (Test-Path -LiteralPath $copiedIndex -PathType Leaf) -or
    -not (Test-Path -LiteralPath $copiedMarker -PathType Leaf)
  ) {
    throw "La copia preparada no contiene index.html y su marcador de seguridad."
  }

  if ($Clean) {
    try {
      Move-Item -LiteralPath $resolvedTarget -Destination $backupTarget -ErrorAction Stop
      Move-Item -LiteralPath $stagingTarget -Destination $resolvedTarget -ErrorAction Stop
      $stagingTarget = $null
    }
    catch {
      if (
        -not (Test-Path -LiteralPath $resolvedTarget) -and
        (Test-Path -LiteralPath $backupTarget)
      ) {
        Move-Item -LiteralPath $backupTarget -Destination $resolvedTarget -ErrorAction SilentlyContinue
      }
      throw "No se pudo activar la nueva publicación; se ha intentado restaurar la anterior. Detalle: $($_.Exception.Message)"
    }

    try {
      Remove-Item -LiteralPath $backupTarget -Recurse -Force -ErrorAction Stop
    }
    catch {
      Write-Warning "La publicación terminó, pero la copia anterior quedó en '$backupTarget' y puede eliminarse manualmente."
    }
  }

  $publishedIndex = Join-Path $resolvedTarget "index.html"

  if (-not (Test-Path -LiteralPath $publishedIndex -PathType Leaf)) {
    throw "No se ha podido verificar el index.html publicado."
  }

  Write-Host "[3/3] Despliegue verificado." -ForegroundColor Green
  Write-Host ""
  Write-Host "Abre desde el móvil: https://10.100.100.101/" -ForegroundColor Green
  Write-Host "HTTPS es obligatorio para instalar la PWA y usar el modo sin conexión." -ForegroundColor Yellow
  Write-Host "Fecha de publicación: $((Get-Item -LiteralPath $publishedIndex).LastWriteTime)"
}
finally {
  if ($stagingTarget -and (Test-Path -LiteralPath $stagingTarget)) {
    Remove-Item -LiteralPath $stagingTarget -Recurse -Force -ErrorAction SilentlyContinue
  }
  Pop-Location
}
