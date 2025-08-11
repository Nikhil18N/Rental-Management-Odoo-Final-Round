# 🚀 DOCKER SETUP SUCCESS GUIDE - HACKATHON TEAM

## ✅ Docker is Installed! Now Let's Get Everyone Working

### 🔧 **Step 1: Start Docker Desktop**

1. **Find Docker Desktop**:
   - Press `Windows + S`
   - Search "Docker Desktop"
   - Click to open
   - Wait for Docker to start (whale icon in system tray)

2. **Verify Docker is Running**:
   ```powershell
   docker --version
   docker compose version
   ```

### 🐳 **Step 2: Start Shared Database**

```bash
# 1. Make sure you're in project root
cd Rental-Management-Odoo-Final-Round

# 2. Create environment file
copy backend\.env.example backend\.env

# 3. Start PostgreSQL database
docker compose up -d postgres

# 4. Wait 30 seconds for database to initialize
```

### 🎯 **Step 3: Team Workflow**

#### **For You (Project Owner):**
```bash
# 1. Start database
docker compose up -d postgres

# 2. Start backend manually (faster development)
cd backend
npm install
npm run dev

# 3. Start frontend
cd ../frontend  
npm install
npm run dev
```

#### **For Your Friends:**
```bash
# 1. Clone repo
git clone https://github.com/Nikhil18N/Rental-Management-Odoo-Final-Round.git
cd Rental-Management-Odoo-Final-Round

# 2. Run the setup script
.\hackathon-setup.ps1

# 3. Start working on their features
git checkout -b feature/their-name-feature
```

## 🔥 **Quick Test Commands**

### Test Database Connection:
```bash
# Should show running postgres container
docker ps

# Should connect to database
docker exec -it rentease_postgres psql -U rental_user -d rental_db
```

### Test Full Stack:
```bash
# Option A: Everything in Docker
docker compose up

# Option B: Database in Docker, apps manual (RECOMMENDED)
docker compose up -d postgres
cd backend && npm run dev    # Terminal 1
cd frontend && npm run dev   # Terminal 2
```

## 📱 **Access Points**

- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:3000  
- **Database**: localhost:5432
  - Username: `rental_user`
  - Password: `rental_password`
  - Database: `rental_db`

## 🔑 **Test Login Credentials**

- **Admin**: admin@rentease.com / admin123
- **Manager**: manager@rentease.com / manager123
- **Customer**: customer1@example.com / customer123

## 🚨 **Common Issues & Solutions**

### Issue: "Docker Desktop not responding"
```bash
# Solution 1: Restart Docker Desktop
# Close Docker Desktop completely
# Restart it from Start Menu

# Solution 2: Reset Docker
# Docker Desktop → Settings → Troubleshoot → Reset to Factory Defaults
```

### Issue: "Port already in use"
```bash
# Find what's using the port
netstat -ano | findstr :5432
netstat -ano | findstr :3000

# Kill the process (replace PID with actual number)
taskkill /PID 1234 /F
```

### Issue: "Cannot connect to database"
```bash
# Check if container is running
docker ps

# Check container logs
docker logs rentease_postgres

# Restart database
docker compose restart postgres
```

## ⚡ **Hackathon Speed Tips**

### 1. **Use Manual Development** (Faster):
```bash
# Only database in Docker
docker compose up -d postgres

# Everything else manually
cd backend && npm run dev
cd frontend && npm run dev
```

### 2. **Parallel Team Work**:
- **Person 1**: Auth backend → `feature/auth-backend`
- **Person 2**: Booking system → `feature/booking-system`  
- **Person 3**: Product enhancement → `feature/product-system`

### 3. **Quick Commits** (Every 30 mins):
```bash
git add .
git commit -m "feat: quick description"
git push origin feature/your-branch
```

## 🎯 **SUCCESS CHECKLIST**

- [ ] Docker Desktop running (whale icon in system tray)
- [ ] PostgreSQL container started (`docker ps` shows postgres)
- [ ] Backend connects to database (no connection errors)
- [ ] Frontend loads at localhost:5173
- [ ] Login works with test credentials
- [ ] Team members can clone and run setup script

## 🏆 **You're Ready!**

Your team now has:
- ✅ Shared PostgreSQL database in Docker
- ✅ Consistent development environment
- ✅ Working authentication system
- ✅ Complete setup documentation

**Time to code! 🚀 Good luck with your hackathon! 💪**

---

### 📞 **Team Communication**

Share this message with your friends:

> 🚀 **Docker Setup Complete!** 
> 
> 1. Make sure Docker Desktop is running
> 2. Clone repo: `git clone https://github.com/Nikhil18N/Rental-Management-Odoo-Final-Round.git`
> 3. Run: `.\hackathon-setup.ps1`
> 4. Start coding: `docker compose up -d postgres` then manual dev servers
> 
> **We're all using the same database now! Let's build! 🏆**
