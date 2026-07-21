@echo off
setlocal
cd /d "%~dp0"

echo.
echo Compilando y publicando Storm Forge en Apache...
echo Se publicara en el DocumentRoot configurado: Z:\html\dist.
echo.

call npm run deploy:apache

if errorlevel 1 (
  echo.
  echo ERROR: no se ha podido completar el despliegue.
  pause
  exit /b 1
)

echo.
echo Despliegue completado: http://10.100.100.101/
pause
