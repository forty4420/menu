@echo off
REM ========================================
REM Restaurant Menu Creator Pro - START
REM Runs both web server and image processor
REM ========================================

color 0B
echo.
echo ================================================
echo    RESTAURANT MENU CREATOR PRO
echo ================================================
echo.

REM Check if node_modules exists
if not exist "node_modules\" (
    echo [ERROR] Dependencies not installed!
    echo.
    echo Please run SETUP.bat first to install dependencies.
    echo.
    pause
    exit /b 1
)

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js not found!
    echo.
    echo Please install Node.js from: https://nodejs.org/
    echo.
    pause
    exit /b 1
)

echo Starting web server and image processor...
echo.
echo Web App will be available at: http://localhost:3000
echo.
echo Press Ctrl+C to stop both services
echo.
echo ================================================
echo.

REM Start both services (this keeps terminal open)
npm run dev

REM If npm run dev fails, show error and keep terminal open
if errorlevel 1 (
    echo.
    echo [ERROR] Failed to start!
    echo.
    echo Common issues:
    echo   1. Did you run SETUP.bat first?
    echo   2. Is Node.js installed? Run: node --version
    echo   3. Are the files in the correct folder?
    echo.
    pause
)
