# 🚀 DOCKER INSTALLATION GUIDE - HACKATHON SPEED!

## ⚡ **FASTEST METHOD: Manual Download (2 minutes)**

### Step 1: Download Docker Desktop
1. Go to: https://www.docker.com/products/docker-desktop/
2. Click "Download for Windows"
3. Run the installer as Administrator
4. Follow the setup wizard (keep defaults)
5. Restart your computer when prompted

### Step 2: Verify Installation
```powershell
# After restart, open PowerShell and test:
docker --version
docker-compose --version
```

## 🔥 **ALTERNATIVE: Use WSL2 + Docker**

### If you have WSL2:
```bash
# In WSL2 terminal:
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
```

## ⚡ **HACKATHON SHORTCUT: Skip Docker!**

Since you're in a hackathon with limited time, here are faster alternatives:

### **Option A: Cloud Database (RECOMMENDED)**
1. **Supabase** (2 minutes setup):
   - Go to https://supabase.com
   - Sign up with GitHub
   - Create project: "rentease-hackathon"
   - Get database credentials
   - Share with team

### **Option B: Railway Database** (1 minute setup):
   - Go to https://railway.app
   - Deploy PostgreSQL template
   - Get connection details
   - Share with team

### **Option C: SQLite** (30 seconds):
   - No network needed
   - Everyone has same local database
   - Perfect for hackathons

## 🎯 **RECOMMENDED WORKFLOW FOR YOUR TEAM:**

### Since time is critical, use Supabase:

1. **You** (2 minutes):
   ```bash
   # Go to supabase.com
   # Create account
   # Create project: "rentease-hackathon"
   # Get connection string
   ```

2. **Share credentials** with team:
   ```bash
   DB_HOST=db.xxx.supabase.co
   DB_PORT=5432
   DB_NAME=postgres
   DB_USERNAME=postgres.xxx
   DB_PASSWORD=your-password
   ```

3. **Team updates .env** files and starts coding!

## 🚨 **IF YOU WANT DOCKER (Full Installation)**

### Docker Desktop Installation Steps:
1. **Download**: https://desktop.docker.com/win/main/amd64/Docker%20Desktop%20Installer.exe
2. **Run as Administrator**
3. **Enable WSL2** when prompted
4. **Restart computer**
5. **Open Docker Desktop**
6. **Wait for Docker to start**

### After Installation:
```powershell
# Test Docker
docker run hello-world

# Start your database
docker-compose up -d postgres
```

## ⏰ **TIME RECOMMENDATION:**

### If you have < 5 hours left:
- ✅ **Use Supabase** (2 minutes setup)
- ❌ Skip Docker installation (could take 10-30 minutes)

### If you have > 5 hours left:
- ✅ Install Docker properly
- ✅ Use local development

## 🔥 **IMMEDIATE ACTION:**

Run this command to check if Docker is already available:
```powershell
Get-Command docker -ErrorAction SilentlyContinue
```

If not found, **go with Supabase** for your hackathon! 🏆

---

### 📱 **Next Steps:**
1. Choose: Docker installation OR cloud database
2. Update team setup instructions
3. Get everyone coding in < 30 minutes!

**Time is ticking! Choose the fastest path! ⏰**
