# 🚀 QUICK START GUIDE

Complete setup guide for MAHEK DECORATOR - from zero to production.

---

## 📋 PREREQUISITES

- **Node.js**: 18.0.0+ ([Download](https://nodejs.org))
- **npm**: 9.0.0+ (comes with Node.js)
- **Git**: 2.30.0+ ([Download](https://git-scm.com))
- **MongoDB**: 5.0+ (local or [Atlas](https://www.mongodb.com/cloud/atlas))
- **PowerShell 5.1+** (Windows users)

**Verify Installation:**
```powershell
node --version    # v18.0.0 or higher
npm --version     # 9.0.0 or higher
git --version     # 2.30.0 or higher
```

---

## 🏃 QUICK START (5 minutes)

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/mahek-decorator.git
cd mahek-decorator
```

### 2. Install Dependencies
```bash
npm install
cd backend && npm install && cd ..
```

### 3. Configure Environment
```bash
# Copy example file
cp .env.example .env.local

# Edit with your values
# Set:
# - MONGODB_URI
# - EMAIL credentials
# - Payment gateway keys
```

### 4. Setup Firewall (Windows)
```powershell
# Run PowerShell as Administrator, then:
.\setup-firewall.ps1
```

### 5. Run Locally
```bash
npm run dev:all
```

**Access:**
```
Frontend: http://localhost:3000
Backend:  http://localhost:5000/api
```

---

## 📱 NETWORK ACCESS (WiFi/Mobile)

After running `npm run dev:all`, access from any device:

```
http://10.65.59.11:3000        (Replace 10.65.59.11 with your IP)
http://10.65.59.11:5000/api    (Backend)
```

**Find Your IP:**
```powershell
ipconfig | findstr "IPv4"
```

---

## 🔧 DETAILED SETUP

### Step 1: Clone Repository
```bash
git clone https://github.com/yourusername/mahek-decorator.git
cd mahek-decorator
```

### Step 2: Install Frontend Dependencies
```bash
npm install
```

**Output:**
```
added 150+ packages
```

### Step 3: Install Backend Dependencies
```bash
cd backend
npm install
cd ..
```

### Step 4: Environment Configuration

**Create .env.local file:**
```bash
cp .env.example .env.local
```

**Edit .env.local and add:**

```env
# ══════════════════════════════
# FRONTEND CONFIGURATION
# ══════════════════════════════
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# ══════════════════════════════
# BACKEND CONFIGURATION
# ══════════════════════════════
PORT=5000
NODE_ENV=development

# ══════════════════════════════
# DATABASE (MongoDB)
# ══════════════════════════════
# Local MongoDB:
MONGODB_URI=mongodb://localhost:27017/mahek-decorator

# OR MongoDB Atlas (Cloud):
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mahek-decorator

# ══════════════════════════════
# EMAIL (Gmail SMTP)
# ══════════════════════════════
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=noreply@mahekdecorator.com
EMAIL_ADMIN=admin@mahekdecorator.com

# ══════════════════════════════
# PAYMENT GATEWAY (Razorpay)
# ══════════════════════════════
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxx

# ══════════════════════════════
# CONTACT INFORMATION
# ══════════════════════════════
WHATSAPP_PHONE=919876543210
PHONE_NUMBER=919876543210
NEXT_PUBLIC_ADMIN_EMAIL=admin@mahekdecorator.com

# ══════════════════════════════
# ANALYTICS (Optional)
# ══════════════════════════════
NEXT_PUBLIC_GA_ID=G-XXXXXXXXX
```

### Step 5: Setup Database

**Option A: Local MongoDB**
```bash
# Windows (Chocolatey)
choco install mongodb-community

# Start MongoDB
mongod

# In another terminal, verify:
mongo
```

**Option B: MongoDB Atlas (Cloud)**
1. Create account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create free cluster
3. Get connection string
4. Add to `.env.local` as `MONGODB_URI`

### Step 6: Configure Firewall (Windows)

**Run as Administrator:**
```powershell
# In PowerShell (Run as Administrator):
.\setup-firewall.ps1
```

**Or manually:**
```powershell
netsh advfirewall firewall add rule `
  name="MAHEK Port 3000" `
  dir=in action=allow protocol=tcp localport=3000 enable=yes

netsh advfirewall firewall add rule `
  name="MAHEK Port 5000" `
  dir=in action=allow protocol=tcp localport=5000 enable=yes
```

### Step 7: Build Frontend (Optional)
```bash
npm run build

# Test production build
npm run start
```

---

## 🎯 RUNNING THE APPLICATION

### Development Mode (Recommended)

**Option 1: Both Services**
```bash
npm run dev:all
```

**Option 2: Separate Terminals**

Terminal 1 (Frontend):
```bash
npm run dev
```

Terminal 2 (Backend):
```bash
npm run backend
```

**Access:**
```
Frontend: http://localhost:3000
Backend:  http://localhost:5000/api
Network:  http://10.65.59.11:3000
```

### Production Mode

```bash
# Build
npm run build

# Start
npm run start

# Then run backend in another terminal:
npm run backend
```

---

## 📡 NETWORK ACCESS TROUBLESHOOTING

### Cannot Access from Another Device

**Check 1: Firewall**
```powershell
# Run as Administrator
.\setup-firewall.ps1
```

**Check 2: Get Your IP**
```powershell
ipconfig | findstr "IPv4"
# Look for: IPv4 Address . . . . . . . . . . : 10.65.59.XX
```

**Check 3: Test Connection**
```powershell
# From another machine on same WiFi:
ping 10.65.59.11

# If successful, try:
# http://10.65.59.11:3000
```

**Check 4: Verify Services Running**
```bash
# Frontend running?
curl http://localhost:3000

# Backend running?
curl http://localhost:5000/api/health
```

---

## 🔑 EMAIL SETUP (Gmail)

### Generate App Password

1. Go to [myaccount.google.com/security](https://myaccount.google.com/security)
2. Enable 2-Step Verification
3. Go to App passwords
4. Select "Mail" and "Windows Computer"
5. Copy generated password
6. Add to `.env.local`:
   ```env
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=generated-password-here
   ```

### Test Email
```bash
# API request to test:
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

## 💳 PAYMENT SETUP (Razorpay)

1. Create account at [razorpay.com](https://razorpay.com)
2. Go to Settings → API Keys
3. Copy Key ID and Key Secret
4. Add to `.env.local`:
   ```env
   RAZORPAY_KEY_ID=rzp_test_xxxxx
   RAZORPAY_KEY_SECRET=xxxxx
   ```

---

## 📦 BUILD & DEPLOYMENT

### Build for Production
```bash
npm run build
```

Output:
```
✓ Compiled successfully
✓ Page 420KB
✓ API routes 8.5KB
```

### Build Verification
```bash
npm run start
```

Then open: http://localhost:3000

---

## 🐛 COMMON ISSUES

### Issue: "Cannot find module"
```bash
# Solution:
rm -rf node_modules package-lock.json
npm install
```

### Issue: "Port 3000 already in use"
```bash
# Find process using port:
netstat -ano | findstr :3000

# Kill process:
taskkill /PID <process-id> /F

# Or use different port:
npm run dev -- -p 3001
```

### Issue: "MongoDB connection refused"
```bash
# Ensure MongoDB is running:
mongod

# Or use MongoDB Atlas:
# Update MONGODB_URI in .env.local
```

### Issue: "Email not sending"
- Check EMAIL_USER and EMAIL_PASS in .env.local
- Verify Gmail app password (not regular password)
- Check firewall (port 587 for SMTP)

### Issue: "Cannot access from network"
```powershell
# Run firewall setup script:
.\setup-firewall.ps1

# Verify IP:
ipconfig | findstr IPv4
```

---

## 🔍 VERIFICATION CHECKLIST

- [ ] Node.js installed
- [ ] npm dependencies installed
- [ ] MongoDB running
- [ ] .env.local configured
- [ ] Firewall rules added
- [ ] Frontend loads (http://localhost:3000)
- [ ] Backend responding (http://localhost:5000/api/health)
- [ ] Can access from another device
- [ ] Forms submitting
- [ ] Emails sending
- [ ] Payment gateway configured

---

## 📚 NEXT STEPS

1. **Customize**: Update content in components/
2. **Deploy**: Follow [DEPLOYMENT.md](DEPLOYMENT.md)
3. **Monitor**: Setup analytics and error tracking
4. **Optimize**: Run Lighthouse audit
5. **Secure**: Review security checklist

---

## 💬 SUPPORT

- **Issues**: Check [DEPLOYMENT.md](DEPLOYMENT.md) troubleshooting
- **Docs**: Read [README_PRODUCTION.md](README_PRODUCTION.md)
- **Contact**: [admin@mahekdecorator.com](mailto:admin@mahekdecorator.com)

---

**Happy Coding! 🎉**
