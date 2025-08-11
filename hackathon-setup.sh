#!/bin/bash
# 🚀 HACKATHON QUICK SETUP SCRIPT
# Run this to get up and running in 5 minutes!

echo "🏆 HACKATHON SETUP - 6 HOURS LEFT!"
echo "=================================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Please run this from the project root directory"
    exit 1
fi

echo "📦 Installing dependencies..."

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
echo "🔥 Start both servers:"
echo "Terminal 1: cd backend && npm run dev"
echo "Terminal 2: cd frontend && npm run dev"
echo ""
echo "🌐 URLs:"
echo "Frontend: http://localhost:5173"
echo "Backend:  http://localhost:3000"
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
echo "⏰ 6 HOURS LEFT - LET'S BUILD!"
echo "💪 Good luck team!"
