@echo off
cls
echo 🚀 HACKATHON DOCKER STARTUP SCRIPT v2.0
echo =======================================

echo.
echo 🐳 Step 1: Checking Docker Desktop Status...
echo.

:check_docker
docker info >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Docker Desktop is not fully started yet
    echo.
    echo 💡 SOLUTIONS:
    echo 1. Check system tray for Docker whale icon
    echo 2. If no whale icon, manually start Docker Desktop:
    echo    - Press Windows + S
    echo    - Search "Docker Desktop"  
    echo    - Click to open
    echo    - Wait 2-3 minutes for full startup
    echo.
    echo 3. Or restart Docker Desktop:
    echo    - Right-click whale icon → Quit Docker Desktop
    echo    - Start Docker Desktop again
    echo.
    set /p retry="Press Enter to check again, or type 'skip' to continue without Docker: "
    if /i "%retry%"=="skip" goto skip_docker
    goto check_docker
) else (
    echo ✅ Docker Desktop is running!
)

echo.
echo 🗄️ Step 2: Environment file check...
if exist "backend\.env" (
    echo ✅ Backend .env file exists
) else (
    copy "backend\.env.example" "backend\.env"
    echo ✅ Environment file created
)

echo.
echo 🐳 Step 3: Starting PostgreSQL database...
docker compose up -d postgres

if %ERRORLEVEL% NEQ 0 (
    echo ❌ Failed to start PostgreSQL container
    echo.
    echo 🔧 TROUBLESHOOTING:
    echo 1. Make sure Docker Desktop is fully loaded (whale icon stable)
    echo 2. Try: docker system prune -f
    echo 3. Or restart Docker Desktop completely
    echo.
    goto manual_start
)

echo ✅ PostgreSQL starting...
echo ⏰ Waiting for database initialization...
timeout /t 15 /nobreak

echo.
echo 🔍 Step 4: Verifying database...
docker ps | findstr postgres >nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ PostgreSQL container not running
    docker ps
    echo.
    goto manual_start
) else (
    echo ✅ PostgreSQL is running!
    echo ✅ Database ready for team collaboration!
)

goto success

:skip_docker
echo.
echo 🚨 ALTERNATIVE: Manual Database Setup
echo Since Docker isn't ready, let's use alternatives:
echo.
echo Option 1: Try again in 5 minutes when Docker fully loads
echo Option 2: Use Supabase (cloud database):
echo   - Go to supabase.com
echo   - Create free project
echo   - Get connection details
echo   - Update .env file
echo.
goto manual_start

:manual_start
echo.
echo 📱 MANUAL START INSTRUCTIONS:
echo ================================
echo.
echo If Docker database isn't working, start manually:
echo.
echo Terminal 1 (Backend):
echo   cd backend
echo   npm install
echo   npm run dev
echo.
echo Terminal 2 (Frontend):  
echo   cd frontend
echo   npm install
echo   npm run dev
echo.
echo 🌐 Then access:
echo   Frontend: http://localhost:5173
echo   Backend:  http://localhost:3000
echo.
echo 🔑 Login with: admin@rentease.com / admin123
echo.
goto end

:success
echo.
echo 🎯 SUCCESS! READY FOR DEVELOPMENT!
echo ==================================
echo.
echo 🔥 Next steps:
echo.
echo Terminal 1 (Backend):
echo   cd backend ^&^& npm run dev
echo.
echo Terminal 2 (Frontend):
echo   cd frontend ^&^& npm run dev
echo.
echo 🌐 URLs:
echo   Frontend: http://localhost:5173
echo   Backend:  http://localhost:3000
echo   Database: localhost:5432
echo.
echo 🔑 Test login: admin@rentease.com / admin123
echo.
echo 🏆 Your team can now:
echo   1. Clone this repo
echo   2. Run this same script
echo   3. Start coding features!
echo.

:end
echo Press any key to continue...
pause >nul
