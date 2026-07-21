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

  if ($Clean) {
    Write-Host "      Limpiando únicamente los archivos web generados..." -ForegroundColor DarkYellow

    $generatedEntries = @(
      "index.html",
      ".htaccess",
      "favicon.svg",
      "icons.svg",
      "assets",
      "images"
    )

    foreach ($entry in $generatedEntries) {
      $publishedEntry = Join-Path $resolvedTarget $entry

      if (Test-Path -LiteralPath $publishedEntry) {
        try {
          Remove-Item -LiteralPath $publishedEntry -Recurse -Force -ErrorAction Stop
        }
        catch {
          Write-Warning "No se pudo eliminar '$publishedEntry'. Se sobrescribirá cuando sea posible. Detalle: $($_.Exception.Message)"
        }
      }
    }
  }

  & robocopy `
    $distRoot `
    $resolvedTarget `
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

  $publishedIndex = Join-Path $resolvedTarget "index.html"

  if (-not (Test-Path -LiteralPath $publishedIndex -PathType Leaf)) {
    throw "No se ha podido verificar el index.html publicado."
  }

  Write-Host "[3/3] Despliegue verificado." -ForegroundColor Green
  Write-Host ""
  Write-Host "Abre desde el móvil: http://10.100.100.101/" -ForegroundColor Green
  Write-Host "Fecha de publicación: $((Get-Item -LiteralPath $publishedIndex).LastWriteTime)"
}
finally {
  Pop-Location
}
