@echo off
setlocal
cd /d "%~dp0"

echo Starting Existcode backend (Laravel) on http://localhost:8000 ...
start "Existcode - Backend (Laravel)" cmd /k "cd /d "%~dp0backend" && php artisan serve --port=8000"

echo Starting Existcode web app on http://localhost:5173 ...
start "Existcode - Web" cmd /k "cd /d "%~dp0" && npm run dev:web --port=5173"

echo Starting Existcode admin app on http://localhost:5174 ...
start "Existcode - Admin" cmd /k "cd /d "%~dp0" && npm run dev:admin --port=5174"

echo.
echo All services are starting in separate windows:
echo   - Backend : http://localhost:8000
echo   - Web     : http://localhost:5173
echo   - Admin   : http://localhost:5174
echo.
echo Close each window to stop that service.
endlocal
