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

powershell.exe -NoProfile -Command "try { Invoke-WebRequest -UseBasicParsing -Uri 'http://localhost:4000/' -TimeoutSec 1 | Out-Null; exit 0 } catch { exit 1 }"
if not errorlevel 1 goto open_page

echo Starting the local portfolio server...
start "Portfolio Local Server" /min cmd.exe /k "npm.cmd run server"

for /l %%I in (1,1,20) do (
    powershell.exe -NoProfile -Command "try { Invoke-WebRequest -UseBasicParsing -Uri 'http://localhost:4000/' -TimeoutSec 1 | Out-Null; exit 0 } catch { exit 1 }"
    if not errorlevel 1 goto open_page
    timeout /t 1 /nobreak >nul
)

echo.
echo The local website did not start within 20 seconds.
echo Check the minimized "Portfolio Local Server" window for details.
pause
exit /b 1

:open_page
start "" "%LOCAL_URL%"
exit /b 0

:no_npm
echo.
echo Node.js or npm was not found. Please install Node.js first.
pause
exit /b 1

:install_failed
echo.
echo Dependency installation failed. Check the network connection above.
pause
exit /b 1
