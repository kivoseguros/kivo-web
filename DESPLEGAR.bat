@echo off
chcp 65001 >nul
REM Entra SIEMPRE en la carpeta del proyecto (donde esta el git), da igual desde donde se abra.
cd /d "C:\Users\mrcar\Desktop\Web oficial KIVO"
title KIVO - Desplegar

echo ===============================================
echo   KIVO - SUBIR WEB (coordinado)
echo ===============================================
echo.

if not exist ".git\" (
  echo *** No encuentro git en la carpeta del proyecto:
  echo     C:\Users\mrcar\Desktop\Web oficial KIVO
  echo.
  pause
  exit /b 1
)

echo [1/3] Bajando lo ultimo de GitHub...
git pull origin main --no-edit

echo.
echo [2/3] Guardando y subiendo tus cambios...
git add -A
git commit -m "Deploy KIVO %date% %time%"
git push origin main

echo.
echo [3/3] Listo. Vercel publicara en 1-2 minutos.
echo.
pause
