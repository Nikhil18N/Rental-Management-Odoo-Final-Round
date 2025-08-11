@echo off
echo 🚀 HACKATHON DOCKER STARTUP SCRIPT
echo ================================

echo.
echo 🐳 Step 1: Starting Docker Desktop...
echo Please manually start Docker Desktop from the Start Menu if not already running
echo Wait for the whale icon to appear in the system tray
echo.
pause

echo.
echo 🔍 Step 2: Testing Docker...
docker --version
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Docker not ready. Please ensure Docker Desktop is running.
    pause
    exit /b 1
)

echo ✅ Docker is ready!
echo.

echo 🗄️ Step 3: Creating environment file...
if not exist "backend\.env" (
    copy "backend\.env.example" "backend\.env"
    echo ✅ Environment file created
) else (
    echo ✅ Environment file already exists
)

echo.
echo 🐳 Step 4: Starting PostgreSQL database...
docker compose up -d postgres

if %ERRORLEVEL% NEQ 0 (
    echo ❌ Failed to start database. Checking Docker status...
    docker ps
    pause
    exit /b 1
)

echo ✅ Database starting...
echo ⏰ Waiting 10 seconds for database initialization...
timeout /t 10

echo.
echo 🔍 Step 5: Verifying database...
docker ps | findstr postgres
if %ERRORLEVEL% NEQ 0 (
    echo ❌ PostgreSQL container not found
    echo Running containers:
    docker ps
) else (
    echo ✅ PostgreSQL is running!
)

echo.
echo 🎯 READY FOR DEVELOPMENT!
echo ========================
echo.
echo Open 2 terminals and run:
echo Terminal 1: cd backend ^&^& npm run dev
echo Terminal 2: cd frontend ^&^& npm run dev
echo.
echo 🌐 URLs will be:
echo Frontend: http://localhost:5173
echo Backend:  http://localhost:3000
echo.
echo 🔑 Test with: admin@rentease.com / admin123
echo.
pause
