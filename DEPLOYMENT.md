# 🚀 DEPLOYMENT GUIDE

Complete guide for deploying MAHEK DECORATOR to production.

---

## 📋 Pre-Deployment Checklist

### Code Quality
- [x] Remove `console.log` statements
- [x] Remove `debugger` statements
- [x] Fix ESLint warnings
- [x] Fix TypeScript errors
- [x] Remove TODO/FIXME comments
- [x] Update import statements
- [x] Test all API endpoints
- [x] Verify form validations
- [x] Test payment integration
- [x] Test email notifications

### Performance
- [x] Enable image optimization
- [x] Implement lazy loading
- [x] Compress assets
- [x] Tree shake unused code
- [x] Minify CSS/JS
- [x] Optimize fonts
- [x] Enable caching headers
- [x] Test on mobile devices
- [x] Run Lighthouse audit
- [x] Verify responsive design

### Security
- [x] Environment variables configured
- [x] CORS settings verified
- [x] HTTPS enabled
- [x] Remove sensitive data from code
- [x] Validate user inputs
- [x] Sanitize HTML output
- [x] Secure API keys
- [x] Rate limiting enabled
- [x] Database connection pooling
- [x] Error messages don't leak sensitive info

### Documentation
- [x] README.md updated
- [x] .env.example created
- [x] API documentation complete
- [x] Deployment instructions provided
- [x] Troubleshooting guide included
- [x] Contributing guidelines added

---

## 🌐 Deployment Options

### 1. VERCEL (Recommended) ⭐

**Why Vercel?**
- Native Next.js support
- Automatic deployments from Git
- Built-in performance monitoring
- Serverless functions
- Global CDN
- Free tier available

**Steps:**

```bash
# 1. Create Vercel account
# https://vercel.com/signup

# 2. Connect GitHub repository
# https://vercel.com/import

# 3. Configure environment variables
# Dashboard → Settings → Environment Variables
# Add:
# - MONGODB_URI
# - EMAIL_USER
# - EMAIL_PASS
# - RAZORPAY_KEY_ID
# - RAZORPAY_KEY_SECRET
# - NEXT_PUBLIC_API_URL=https://your-domain.vercel.app/api

# 4. Deploy
vercel deploy --prod

# 5. View deployment
vercel inspect
```

**Post-Deployment:**
```bash
# Monitor logs
vercel logs

# View analytics
vercel analytics

# Manage domains
vercel domains add your-domain.com
```

---

### 2. NETLIFY

**Steps:**

```bash
# 1. Create Netlify account
# https://app.netlify.com/signup

# 2. Connect Git repository
# https://app.netlify.com/start

# 3. Configure build settings
# Build command: npm run build
# Publish directory: .next
# Functions directory: api

# 4. Set environment variables
# Site settings → Build & deploy → Environment

# 5. Deploy
netlify deploy --prod
```

---

### 3. RAILWAY

**Steps:**

```bash
# 1. Create Railway account
# https://railway.app

# 2. Connect GitHub repository
# Railway dashboard → New Project → GitHub

# 3. Configure environment variables
# Project settings → Variables

# 4. Deploy
railway up
```

---

### 4. RENDER

**Steps:**

```bash
# 1. Create Render account
# https://render.com

# 2. Connect GitHub repository
# New → Web Service → GitHub

# 3. Configure
# Environment: Node
# Build command: npm run build
# Start command: npm run start

# 4. Deploy
# Render auto-deploys on git push
```

---

### 5. DOCKER + CLOUD HOSTING

**Build Image:**

```bash
# Build Docker image
docker build -t mahek-decorator:latest .

# Tag for registry
docker tag mahek-decorator:latest username/mahek-decorator:latest

# Push to Docker Hub
docker push username/mahek-decorator:latest
```

**Deploy to Cloud:**

**AWS:**
```bash
# Using ECS
aws ecs create-service --cluster mahek --task-definition mahek-decorator

# Using EC2
docker run -p 3000:3000 -p 5000:5000 mahek-decorator
```

**Google Cloud:**
```bash
# Deploy to Cloud Run
gcloud run deploy mahek-decorator \
  --image mahek-decorator:latest \
  --platform managed \
  --region us-central1
```

**Azure:**
```bash
# Deploy to Container Instances
az container create \
  --resource-group myResourceGroup \
  --name mahek-decorator \
  --image mahek-decorator:latest \
  --ports 3000 5000
```

---

## 🔒 Environment Variables for Production

Create a `.env.production` file (never commit this):

```env
# Next.js
NEXT_PUBLIC_API_URL=https://mahek-decorator.vercel.app/api
NODE_ENV=production

# Backend
PORT=3000
BACKEND_PORT=5000

# Database
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/mahek-decorator

# Email (Gmail)
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=noreply@mahekdecorator.com
EMAIL_ADMIN=admin@mahekdecorator.com

# Razorpay (Payment Gateway)
RAZORPAY_KEY_ID=rzp_live_xxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxx

# WhatsApp & Phone
WHATSAPP_PHONE=919876543210
PHONE_NUMBER=919876543210

# Admin Email
NEXT_PUBLIC_ADMIN_EMAIL=admin@mahekdecorator.com

# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXX

# Feature Flags
NEXT_PUBLIC_ENABLE_BOOKINGS=true
NEXT_PUBLIC_ENABLE_PAYMENTS=true
NEXT_PUBLIC_ENABLE_CONSULTATIONS=true
```

---

## 🔄 CI/CD with GitHub Actions

**Create `.github/workflows/deploy.yml`:**

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci && npm ci --prefix backend
      
      - name: Run linter
        run: npm run lint
      
      - name: Build project
        run: npm run build
      
      - name: Deploy to Vercel
        uses: vercel/action@master
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

---

## 🌍 Custom Domain Setup

### Vercel
```bash
# Add domain
vercel domains add mahekdecorator.com

# Verify DNS records
vercel domains verify

# Auto-renew (if purchased through Vercel)
```

### Netlify
```bash
# Go to Domain Settings
# Add custom domain
# Update DNS settings
```

---

## 📊 Monitoring & Analytics

### Vercel Analytics
- Real User Monitoring (RUM)
- Web Vitals
- Performance metrics
- Error tracking

### Google Analytics
1. Create GA4 property
2. Add tracking ID to `.env.local`
3. Verify in Google Search Console

### Sentry (Error Tracking)
```bash
npm install @sentry/nextjs

# Configure in next.config.js
```

---

## 🚨 Troubleshooting

### Build Failures

**Issue:** "Cannot find module"
```bash
# Solution: Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Issue:** "ENOSPC: no space left on device"
```bash
# Solution: Increase build memory
NODE_OPTIONS=--max-old-space-size=4096 npm run build
```

### Runtime Errors

**Issue:** API not responding
```bash
# Check:
1. Environment variables set correctly
2. Backend service running
3. Firewall rules
4. Network connectivity
```

**Issue:** Database connection fails
```bash
# Check:
1. MONGODB_URI correct
2. IP whitelisted in MongoDB Atlas
3. Database user credentials
4. Network connectivity
```

### Performance Issues

**Check:**
1. Lighthouse score
2. Bundle size
3. Image optimization
4. Caching headers
5. CDN configuration

---

## 🔄 Rollback Procedures

### Vercel
```bash
# View deployments
vercel deployments

# Promote to production
vercel promote <deployment-url>
```

### Git
```bash
# Revert to previous commit
git revert <commit-hash>
git push origin main
```

---

## 📞 Support & Resources

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Railway Docs**: https://docs.railway.app
- **Render Docs**: https://render.com/docs

---

## ✅ Post-Deployment Verification

- [ ] Website loads correctly
- [ ] All pages accessible
- [ ] API endpoints working
- [ ] Forms submitting successfully
- [ ] Emails sending correctly
- [ ] Payment integration working
- [ ] Mobile responsive
- [ ] Images loading quickly
- [ ] SSL certificate valid
- [ ] Analytics tracking
- [ ] Error monitoring active

---

**Last Updated**: 2024-01-XX
