# 🏆 HACKATHON QUICK SETUP (Windows)
# Run this to get up and running in 5 minutes!

Write-Host "🏆 HACKATHON SETUP - 6 HOURS LEFT!" -ForegroundColor Green
Write-Host "==================================" -ForegroundColor Green

# Check if we're in the right directory
if (!(Test-Path "package.json")) {
    Write-Host "❌ Please run this from the project root directory" -ForegroundColor Red
    exit 1
}

Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow

# Install backend dependencies
Write-Host "🔧 Setting up backend..." -ForegroundColor Cyan
Set-Location backend
npm install
Write-Host "✅ Backend dependencies installed" -ForegroundColor Green

# Install frontend dependencies  
Write-Host "🎨 Setting up frontend..." -ForegroundColor Cyan
Set-Location ../frontend
npm install
Write-Host "✅ Frontend dependencies installed" -ForegroundColor Green

# Go back to root
Set-Location ..

Write-Host ""
Write-Host "🎯 READY TO START DEVELOPMENT!" -ForegroundColor Green
Write-Host "===============================" -ForegroundColor Green
Write-Host ""
Write-Host "🔥 Start both servers:" -ForegroundColor Yellow
Write-Host "Terminal 1: cd backend; npm run dev" -ForegroundColor White
Write-Host "Terminal 2: cd frontend; npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "🌐 URLs:" -ForegroundColor Yellow
Write-Host "Frontend: http://localhost:5173" -ForegroundColor White
Write-Host "Backend:  http://localhost:3000" -ForegroundColor White
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
Write-Host "⏰ 6 HOURS LEFT - LET'S BUILD!" -ForegroundColor Magenta
Write-Host "💪 Good luck team!" -ForegroundColor Green
