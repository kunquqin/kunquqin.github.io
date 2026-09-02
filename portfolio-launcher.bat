@echo off
setlocal
cd /d "%~dp0"

set "PAGE_PATH=%~1"
if not defined PAGE_PATH set "PAGE_PATH=/"
set "LOCAL_URL=http://localhost:4000%PAGE_PATH%"

where npm.cmd >nul 2>nul
if errorlevel 1 goto no_npm

if not exist "node_modules" (
    echo Installing dependencies for the first run...
    call npm.cmd install
    if errorlevel 1 goto install_failed
)

call :server_ready
if not errorlevel 1 goto open_page

echo Starting the local portfolio server...
start "Portfolio Local Server" /min cmd.exe /k "cd /d ""%~dp0"" && npm.cmd run server"

for /l %%I in (1,1,20) do (
    timeout /t 1 /nobreak >nul
    call :server_ready
    if not errorlevel 1 goto open_page
)

echo.
echo ERROR: The local website did not start within 20 seconds.
echo Open the minimized Portfolio Local Server window to see the error.
pause
exit /b 1

:server_ready
powershell.exe -NoProfile -Command "try { $response = Invoke-WebRequest -UseBasicParsing -Uri 'http://localhost:4000/' -TimeoutSec 1; if ($response.StatusCode -eq 200) { exit 0 } else { exit 1 } } catch { exit 1 }"
exit /b %errorlevel%

:open_page
echo Opening %LOCAL_URL%
start "" "%LOCAL_URL%"
exit /b 0

:no_npm
echo.
echo ERROR: Node.js or npm was not found.
echo Install Node.js and then run this shortcut again.
pause
exit /b 1

:install_failed
echo.
echo ERROR: Dependency installation failed.
echo Check the network connection and the message above.
pause
exit /b 1
