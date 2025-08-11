# 🏆 HACKATHON QUICK SETUP (Windows) - DOCKER VERSION
# Run this to get up and running in 5 minutes with shared database!

Write-Host "🏆 HACKATHON SETUP - 6 HOURS LEFT!" -ForegroundColor Green
Write-Host "🐳 Docker Edition - Shared Database for All!" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Green

# Check if Docker is installed
Write-Host "🔍 Checking Docker installation..." -ForegroundColor Yellow
try {
    $dockerVersion = docker --version
    Write-Host "✅ Docker found: $dockerVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Docker not found! Please install Docker Desktop first:" -ForegroundColor Red
    Write-Host "   https://www.docker.com/products/docker-desktop" -ForegroundColor White
    exit 1
}

# Check if we're in the right directory
if (!(Test-Path "package.json")) {
    Write-Host "❌ Please run this from the project root directory" -ForegroundColor Red
    exit 1
}

Write-Host "📦 Setting up environment files..." -ForegroundColor Yellow

# Setup backend environment
if (!(Test-Path "backend/.env")) {
    Copy-Item "backend/.env.example" "backend/.env"
    Write-Host "✅ Backend .env created" -ForegroundColor Green
} else {
    Write-Host "✅ Backend .env already exists" -ForegroundColor Green
}

# Setup frontend environment
if (!(Test-Path "frontend/.env")) {
    Copy-Item "frontend/.env.example" "frontend/.env" -ErrorAction SilentlyContinue
    Write-Host "✅ Frontend .env ready" -ForegroundColor Green
}

Write-Host "🐳 Starting Docker containers..." -ForegroundColor Yellow
Write-Host "This will start PostgreSQL database that everyone can use!" -ForegroundColor Cyan

# Start only the database first
docker-compose up -d postgres

Write-Host "⏰ Waiting for database to be ready..." -ForegroundColor Yellow
Start-Sleep -Seconds 10

# Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow

Write-Host "🔧 Setting up backend..." -ForegroundColor Cyan
Set-Location backend
npm install
Write-Host "✅ Backend dependencies installed" -ForegroundColor Green

Write-Host "🎨 Setting up frontend..." -ForegroundColor Cyan
Set-Location ../frontend
npm install
Write-Host "✅ Frontend dependencies installed" -ForegroundColor Green

Set-Location ..

Write-Host ""
Write-Host "🎯 READY TO START DEVELOPMENT!" -ForegroundColor Green
Write-Host "===============================" -ForegroundColor Green
Write-Host ""
Write-Host "🔥 OPTION 1 - Use Docker (Recommended):" -ForegroundColor Yellow
Write-Host "docker-compose up" -ForegroundColor White
Write-Host ""
Write-Host "🔥 OPTION 2 - Manual start:" -ForegroundColor Yellow
Write-Host "Terminal 1: cd backend && npm run dev" -ForegroundColor White
Write-Host "Terminal 2: cd frontend && npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "🌐 URLs:" -ForegroundColor Yellow
Write-Host "Frontend: http://localhost:5173" -ForegroundColor White
Write-Host "Backend:  http://localhost:3000" -ForegroundColor White
Write-Host "Database: localhost:5432 (user: rental_user, db: rental_db)" -ForegroundColor White
Write-Host ""
Write-Host "🔑 Test Login Credentials:" -ForegroundColor Yellow
Write-Host "Admin:    admin@rentease.com / admin123" -ForegroundColor White
Write-Host "Manager:  manager@rentease.com / manager123" -ForegroundColor White
Write-Host "Customer: customer1@example.com / customer123" -ForegroundColor White
Write-Host ""
Write-Host "📋 TEAM WORKFLOW:" -ForegroundColor Yellow
Write-Host "1. git checkout -b feature/your-name-feature" -ForegroundColor White
Write-Host "2. Make changes" -ForegroundColor White
Write-Host "3. git add .; git commit -m 'feat: your changes'" -ForegroundColor White
Write-Host "4. git push origin feature/your-name-feature" -ForegroundColor White
Write-Host "5. Create Pull Request on GitHub" -ForegroundColor White
Write-Host ""
Write-Host "🐳 Docker Commands:" -ForegroundColor Yellow
Write-Host "Stop all:     docker-compose down" -ForegroundColor White
Write-Host "Restart:      docker-compose restart" -ForegroundColor White
Write-Host "Logs:         docker-compose logs -f" -ForegroundColor White
Write-Host "Database only: docker-compose up -d postgres" -ForegroundColor White
Write-Host ""
Write-Host "⏰ 6 HOURS LEFT - LET'S BUILD!" -ForegroundColor Magenta
Write-Host "💪 Good luck team!" -ForegroundColor Green
