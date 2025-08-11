#!/bin/bash
# 🚀 HACKATHON QUICK SETUP SCRIPT - DOCKER VERSION
# Run this to get up and running in 5 minutes with shared database!

echo "🏆 HACKATHON SETUP - 6 HOURS LEFT!"
echo "🐳 Docker Edition - Shared Database for All!"
echo "=================================="

# Check if Docker is installed
echo "🔍 Checking Docker installation..."
if ! command -v docker &> /dev/null; then
    echo "❌ Docker not found! Please install Docker first:"
    echo "   https://www.docker.com/get-docker"
    exit 1
fi

docker_version=$(docker --version)
echo "✅ Docker found: $docker_version"

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Please run this from the project root directory"
    exit 1
fi

echo "📦 Setting up environment files..."

# Setup backend environment
if [ ! -f "backend/.env" ]; then
    cp backend/.env.example backend/.env
    echo "✅ Backend .env created"
else
    echo "✅ Backend .env already exists"
fi

# Setup frontend environment
if [ ! -f "frontend/.env" ]; then
    cp frontend/.env.example frontend/.env 2>/dev/null || echo "Frontend .env template not found, using defaults"
    echo "✅ Frontend .env ready"
fi

echo "� Starting Docker containers..."
echo "This will start PostgreSQL database that everyone can use!"

# Start only the database first
docker-compose up -d postgres

echo "⏰ Waiting for database to be ready..."
sleep 10

echo "�📦 Installing dependencies..."

# Install backend dependencies
echo "🔧 Setting up backend..."
cd backend
npm install
echo "✅ Backend dependencies installed"

# Install frontend dependencies  
echo "🎨 Setting up frontend..."
cd ../frontend
npm install
echo "✅ Frontend dependencies installed"

# Go back to root
cd ..

echo ""
echo "🎯 READY TO START DEVELOPMENT!"
echo "==============================="
echo ""
echo "🔥 OPTION 1 - Use Docker (Recommended):"
echo "docker-compose up"
echo ""
echo "🔥 OPTION 2 - Manual start:"
echo "Terminal 1: cd backend && npm run dev"
echo "Terminal 2: cd frontend && npm run dev"
echo ""
echo "🌐 URLs:"
echo "Frontend: http://localhost:5173"
echo "Backend:  http://localhost:3000"
echo "Database: localhost:5432 (user: rental_user, db: rental_db)"
echo ""
echo "🔑 Test Login Credentials:"
echo "Admin:    admin@rentease.com / admin123"
echo "Manager:  manager@rentease.com / manager123"
echo "Customer: customer1@example.com / customer123"
echo ""
echo "📋 TEAM WORKFLOW:"
echo "1. git checkout -b feature/your-name-feature"
echo "2. Make changes"
echo "3. git add . && git commit -m 'feat: your changes'"
echo "4. git push origin feature/your-name-feature"
echo "5. Create Pull Request on GitHub"
echo ""
echo "🐳 Docker Commands:"
echo "Stop all:      docker-compose down"
echo "Restart:       docker-compose restart"
echo "Logs:          docker-compose logs -f"
echo "Database only: docker-compose up -d postgres"
echo ""
echo "⏰ 6 HOURS LEFT - LET'S BUILD!"
echo "💪 Good luck team!"
