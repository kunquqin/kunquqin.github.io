@echo off
setlocal
title Portfolio Local Server
cd /d "%~dp0"

where npm.cmd >nul 2>nul
if errorlevel 1 goto no_npm

if not exist "node_modules" (
    echo Installing dependencies for the first run...
    call npm.cmd install
    if errorlevel 1 goto install_failed
)

echo.
echo Starting website at http://localhost:4000
echo Keep this window open. Press Ctrl+C to stop the website.
echo.
call npm.cmd run server -- --open
set "SERVER_EXIT=%ERRORLEVEL%"

echo.
echo The website server has stopped. Exit code: %SERVER_EXIT%
pause
exit /b %SERVER_EXIT%

:no_npm
echo.
echo Node.js or npm was not found.
echo Please install Node.js and try again.
pause
exit /b 1

:install_failed
echo.
echo Dependency installation failed. Check the network connection above.
pause
exit /b 1
