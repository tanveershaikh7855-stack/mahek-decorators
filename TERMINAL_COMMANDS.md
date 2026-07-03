# 🖥️ TERMINAL COMMANDS REFERENCE

Complete list of all terminal commands for MAHEK DECORATOR setup and deployment.

---

## 📍 NAVIGATE TO PROJECT FOLDER

```powershell
cd "c:\Users\Tanveer\OneDrive\Pictures\Documents\mahek decorators"
```

---

## 🚀 SETUP & INSTALLATION

### Clone Repository
```bash
git clone https://github.com/yourusername/mahek-decorator.git
cd mahek-decorator
```

### Install All Dependencies
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

### Setup Environment Variables
```bash
# Copy example
cp .env.example .env.local

# Edit the file with your values
# (Use Notepad or VS Code)
```

---

## 🔥 FIREWALL SETUP (WINDOWS - RUN AS ADMIN)

### Automatic Setup (Recommended)
```powershell
# Right-click PowerShell and select "Run as administrator"
# Then run:
.\setup-firewall.ps1

# To remove firewall rules later:
.\setup-firewall.ps1 -Remove
```

### Manual Setup
```powershell
# In PowerShell (as Administrator):

# Add port 3000 (Frontend)
netsh advfirewall firewall add rule ^
  name="MAHEK Decorator - Port 3000" ^
  dir=in action=allow protocol=tcp localport=3000 enable=yes

# Add port 5000 (Backend)
netsh advfirewall firewall add rule ^
  name="MAHEK Decorator - Port 5000" ^
  dir=in action=allow protocol=tcp localport=5000 enable=yes

# Verify rules added
netsh advfirewall firewall show rule name="MAHEK*"
```

---

## 🎯 RUNNING THE APPLICATION

### Run Both Services (Recommended)
```bash
npm run dev:all
```

**Output:**
```
> next dev --hostname 0.0.0.0
ready - started server on 0.0.0.0:3000
MAHEK DECORATOR API running on port 5000
```

### Run Frontend Only
```bash
npm run dev

# Or specify port:
npm run dev -- -p 3000
```

### Run Backend Only
```bash
npm run backend

# Or from backend directory:
cd backend && npm run dev
```

### Run in Production Mode
```bash
# Build
npm run build

# Start
npm run start

# In another terminal:
npm run backend
```

---

## 📡 NETWORK ACCESS

### Find Your Local IP
```powershell
# Windows
ipconfig | findstr "IPv4"

# Linux/Mac
ifconfig | grep "inet "
```

### Test Local Access
```bash
# Frontend
curl http://localhost:3000

# Backend API
curl http://localhost:5000/api/health
```

### Test Network Access (From Another Device)
```bash
# Replace 10.65.59.11 with your IP
ping 10.65.59.11

# Open in browser:
# http://10.65.59.11:3000
# http://10.65.59.11:5000/api/health
```

---

## 📦 BUILD & OPTIMIZATION

### Development Build
```bash
npm run build:dev
```

### Production Build
```bash
npm run build
```

### Check Build Size
```powershell
# After building, check .next folder size
Get-ChildItem -Path ".next" -Recurse | Measure-Object -Property Length -Sum

# Expected: ~2-5 MB
```

### Run Production Build Locally
```bash
npm run start
```

---

## 🧹 CLEANUP & MAINTENANCE

### Clear Node Modules
```bash
# Frontend
rm -r node_modules
npm cache clean --force
npm install

# Backend
cd backend
rm -r node_modules
npm cache clean --force
npm install
cd ..
```

### Clean Build Cache
```bash
# Remove Next.js cache
rm -r .next

# Rebuild
npm run build
```

### Remove Logs
```bash
# Clear npm logs
npm cache clean --force

# Remove node_modules cache
rm -r ~/.npm
```

---

## 🔍 TESTING & DEBUGGING

### Run Linter
```bash
npm run lint
```

### Check for Issues
```bash
# TypeScript check
npx tsc --noEmit

# ESLint check
npx eslint src/
```

### Test API Health
```bash
curl -X GET http://localhost:5000/api/health
```

### Test Contact Form
```bash
curl -X POST http://localhost:5000/api/contacts \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "9876543210",
    "message": "Test message"
  }'
```

---

## 🐙 GIT COMMANDS

### Initialize Repository
```bash
git init
```

### Check Status
```bash
git status
```

### Add All Files
```bash
git add .
```

### Commit Changes
```bash
git commit -m "Initial production commit"
```

### Create GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Create repository named `mahek-decorator`
3. Copy remote URL

### Add Remote & Push
```bash
# Replace USERNAME and REPO with your values
git remote add origin https://github.com/USERNAME/REPO.git

# Set main branch
git branch -M main

# Push to GitHub
git push -u origin main
```

### Push Updates
```bash
# After making changes:
git add .
git commit -m "descriptive message"
git push origin main
```

---

## 🚀 DEPLOYMENT COMMANDS

### Deploy to Vercel (Recommended)

**Install Vercel CLI:**
```bash
npm install -g vercel
```

**Deploy:**
```bash
# First deployment
vercel

# Production deployment
vercel --prod

# Set environment variables
vercel env add MONGODB_URI
vercel env add EMAIL_USER
vercel env add EMAIL_PASS
vercel env add RAZORPAY_KEY_ID
vercel env add RAZORPAY_KEY_SECRET

# Check deployment
vercel inspect
```

### Deploy to Netlify

**Install Netlify CLI:**
```bash
npm install -g netlify-cli
```

**Deploy:**
```bash
# Login
netlify login

# Deploy
netlify deploy

# Production deployment
netlify deploy --prod
```

### Deploy to Railway

**Install Railway CLI:**
```bash
npm install -g @railway/cli
```

**Deploy:**
```bash
# Login
railway login

# Link project
railway link

# Deploy
railway up
```

### Docker Deployment

**Build Docker Image:**
```bash
# Build
docker build -t mahek-decorator:latest .

# Tag for registry
docker tag mahek-decorator:latest yourusername/mahek-decorator:latest

# Push to Docker Hub
docker push yourusername/mahek-decorator:latest
```

**Run with Docker:**
```bash
# Run container
docker run -p 3000:3000 -p 5000:5000 mahek-decorator:latest

# Run with compose
docker-compose up -d

# Stop services
docker-compose down
```

---

## 📊 PERFORMANCE OPTIMIZATION

### Run Lighthouse Audit
```bash
# Using Chrome DevTools
# 1. Open http://localhost:3000
# 2. Open DevTools (F12)
# 3. Go to Lighthouse tab
# 4. Click "Generate report"
```

### Check Bundle Size
```bash
npm run build

# Check .next folder:
# Should be < 5MB for optimal performance
```

### Analyze Bundle
```bash
npm install --save-dev @next/bundle-analyzer

# Then configure in next.config.js and run:
ANALYZE=true npm run build
```

---

## 🔒 SECURITY VERIFICATION

### Check for Vulnerabilities
```bash
# Frontend
npm audit

# Backend
cd backend && npm audit && cd ..

# Fix vulnerabilities
npm audit fix
```

### Check Environment Variables
```bash
# Verify .env.local is in .gitignore
cat .gitignore | grep ".env"

# Should contain: .env, .env.local, etc.
```

---

## 📋 MONITORING & LOGS

### View Frontend Logs
```bash
# Terminal where `npm run dev` is running
# Look for errors in real-time
```

### View Backend Logs
```bash
# Terminal where `npm run backend` is running
# Check API request logs
```

### Check Network Activity
```bash
# Open browser DevTools (F12)
# Go to Network tab
# Check API requests and responses
```

---

## 🆘 TROUBLESHOOTING COMMANDS

### Port Already in Use
```powershell
# Find process using port 3000
netstat -ano | findstr :3000

# Kill process
taskkill /PID <process-id> /F

# Or use different port:
npm run dev -- -p 3001
```

### Dependencies Conflict
```bash
# Clear everything
rm -r node_modules
rm package-lock.json
npm cache clean --force

# Reinstall
npm install
cd backend && npm install && cd ..
```

### Database Connection Issues
```bash
# Test MongoDB connection
mongosh "mongodb://localhost:27017/mahek-decorator"

# Or check connection string in .env.local
```

### Build Fails
```bash
# Clear build cache
rm -r .next

# Rebuild with verbose output
npm run build

# Check for TypeScript errors
npx tsc --noEmit
```

---

## 🎯 QUICK CHECKLIST COMMANDS

```bash
# Run all checks:

# 1. Check Node.js version
node --version

# 2. Check npm version
npm --version

# 3. Check git status
git status

# 4. Check dependencies are installed
npm ls --depth=0

# 5. Test frontend
curl http://localhost:3000

# 6. Test backend
curl http://localhost:5000/api/health

# 7. Find local IP
ipconfig | findstr "IPv4"

# 8. Test from another device
ping YOUR_LOCAL_IP
```

---

## 📞 HELPFUL SHORTCUTS

### VS Code Terminal
```
Ctrl + ` → Open terminal
Ctrl + Shift + ` → New terminal
```

### PowerShell
```
Up/Down Arrows → Previous commands
Ctrl + C → Stop command
Clear-Host → Clear screen (alias: cls)
Tab → Auto-complete
```

### Git
```
git log --oneline → View commits
git diff → View changes
git stash → Temporarily save changes
git pull → Update from GitHub
```

---

**Bookmark this page! 🔖**

All commands you need are here.
