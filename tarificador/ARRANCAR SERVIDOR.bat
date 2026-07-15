@echo off
echo.
echo  =============================================
echo   KIVO Tarificador - Arrancando servidor...
echo  =============================================
echo.
cd /d "%~dp0"
start "" http://localhost:3000
node server.js
pause
