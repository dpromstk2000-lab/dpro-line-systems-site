@echo off
chcp 65001 >nul
cd /d "%~dp0"
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0CREATE_SALON_DROP_FILE.ps1"
echo.
echo 終了するには何かキーを押してください。
pause >nul
