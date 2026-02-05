@echo off
REM ========================================
REM Restaurant Menu Creator Pro - Setup
REM Windows Installation Script
REM ========================================

color 0A
echo.
echo ================================================
echo    RESTAURANT MENU CREATOR PRO - SETUP
echo ================================================
echo.
echo This will:
echo   1. Create all necessary folders
echo   2. Install dependencies (npm install)
echo   3. Verify installation
echo.
pause

REM ========================================
REM Step 1: Create Folder Structure
REM ========================================

echo.
echo [1/3] Creating folder structure...
echo.

if not exist "INPUT" mkdir "INPUT"
if not exist "TEMP" mkdir "TEMP"

REM Create all background format folders
if not exist "images\backgrounds" mkdir "images\backgrounds"

REM Letter format
if not exist "images\backgrounds\letter" mkdir "images\backgrounds\letter"
if not exist "images\backgrounds\letter\previews" mkdir "images\backgrounds\letter\previews"
if not exist "images\backgrounds\letter\full" mkdir "images\backgrounds\letter\full"
if not exist "images\backgrounds\letter\thumbnails" mkdir "images\backgrounds\letter\thumbnails"

REM Half-Letter format
if not exist "images\backgrounds\half-letter" mkdir "images\backgrounds\half-letter"
if not exist "images\backgrounds\half-letter\previews" mkdir "images\backgrounds\half-letter\previews"
if not exist "images\backgrounds\half-letter\full" mkdir "images\backgrounds\half-letter\full"
if not exist "images\backgrounds\half-letter\thumbnails" mkdir "images\backgrounds\half-letter\thumbnails"

REM Tabloid format
if not exist "images\backgrounds\tabloid" mkdir "images\backgrounds\tabloid"
if not exist "images\backgrounds\tabloid\previews" mkdir "images\backgrounds\tabloid\previews"
if not exist "images\backgrounds\tabloid\full" mkdir "images\backgrounds\tabloid\full"
if not exist "images\backgrounds\tabloid\thumbnails" mkdir "images\backgrounds\tabloid\thumbnails"

REM Tri-Fold format
if not exist "images\backgrounds\trifold" mkdir "images\backgrounds\trifold"
if not exist "images\backgrounds\trifold\previews" mkdir "images\backgrounds\trifold\previews"
if not exist "images\backgrounds\trifold\full" mkdir "images\backgrounds\trifold\full"
if not exist "images\backgrounds\trifold\thumbnails" mkdir "images\backgrounds\trifold\thumbnails"

REM A4 format
if not exist "images\backgrounds\a4" mkdir "images\backgrounds\a4"
if not exist "images\backgrounds\a4\previews" mkdir "images\backgrounds\a4\previews"
if not exist "images\backgrounds\a4\full" mkdir "images\backgrounds\a4\full"
if not exist "images\backgrounds\a4\thumbnails" mkdir "images\backgrounds\a4\thumbnails"

REM A5 format
if not exist "images\backgrounds\a5" mkdir "images\backgrounds\a5"
if not exist "images\backgrounds\a5\previews" mkdir "images\backgrounds\a5\previews"
if not exist "images\backgrounds\a5\full" mkdir "images\backgrounds\a5\full"
if not exist "images\backgrounds\a5\thumbnails" mkdir "images\backgrounds\a5\thumbnails"

REM Digital 16:9 format
if not exist "images\backgrounds\digital-16x9" mkdir "images\backgrounds\digital-16x9"
if not exist "images\backgrounds\digital-16x9\previews" mkdir "images\backgrounds\digital-16x9\previews"
if not exist "images\backgrounds\digital-16x9\full" mkdir "images\backgrounds\digital-16x9\full"
if not exist "images\backgrounds\digital-16x9\thumbnails" mkdir "images\backgrounds\digital-16x9\thumbnails"

echo    [OK] All folders created!
echo.

REM ========================================
REM Step 2: Verify Node.js
REM ========================================

echo [2/3] Verifying Node.js installation...
echo.

node --version >nul 2>&1
if errorlevel 1 (
    echo    [ERROR] Node.js not found!
    echo    Please install Node.js from: https://nodejs.org/
    echo.
    pause
    exit /b 1
)

echo    [OK] Node.js is installed
node --version
echo.

REM ========================================
REM Step 3: Install Dependencies
REM ========================================

echo [3/3] Installing dependencies...
echo.
echo This may take 2-5 minutes...
echo.

call npm install

if errorlevel 1 (
    echo.
    echo    [ERROR] npm install failed!
    echo    Please check your internet connection and try again.
    echo.
    pause
    exit /b 1
)

echo.
echo    [OK] Dependencies installed!
echo.

REM ========================================
REM Installation Complete
REM ========================================

color 0A
echo.
echo ================================================
echo    INSTALLATION COMPLETE!
echo ================================================
echo.
echo Next steps:
echo.
echo   1. Edit config.js:
echo      - Add your Gumroad product URLs
echo      - Update branding (app name, email, etc.)
echo.
echo   2. Install Upscayl (for image processing):
echo      - Download from: https://github.com/upscayl/upscayl/releases
echo      - Install to: C:\Program Files\Upscayl\
echo      - Edit image-processor.js with the path
echo.
echo   3. Start the app:
echo      - Double-click: START.bat
echo      - Or run: npm run dev
echo.
echo   4. Open in browser:
echo      - http://localhost:3000
echo.
echo See COMPLETE_INSTALL_GUIDE.md for full instructions!
echo.
pause
