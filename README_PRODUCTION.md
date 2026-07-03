# 🎈 MAHEK DECORATOR — Premium Balloon Decoration Services

> Professional balloon decoration website with online booking, consultations, and payment integration.

**Live URL**: [mahek-decorator.vercel.app](https://mahek-decorator.vercel.app)

---

## ✨ Features

- 🎯 **Online Booking System** - Seamless appointment scheduling
- 💬 **Live Consultation** - Connect with decoration experts
- 📸 **Portfolio Gallery** - Showcase of previous projects
- ⭐ **Customer Reviews** - Trust through social proof
- 📞 **Multi-Channel Contact** - WhatsApp, Phone, Email, Forms
- 💳 **Payment Integration** - Razorpay payment gateway
- 📱 **Fully Responsive** - Works on all devices
- ⚡ **High Performance** - Optimized loading times
- 🎨 **Beautiful Animations** - Smooth user experience
- 🗺️ **Location Map** - Google Maps integration

---

## 🛠️ Tech Stack

**Frontend:**
- **Framework**: Next.js 14
- **UI Library**: React 18
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion, GSAP, Lenis
- **Deployment**: Vercel, Netlify, Railway, Render

**Backend:**
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Email**: Nodemailer
- **Payment**: Razorpay API
- **Validation**: Express Validator
- **CORS**: Enabled for cross-origin requests

**DevOps:**
- **Containerization**: Docker
- **Orchestration**: Docker Compose
- **Version Control**: Git & GitHub
- **CI/CD**: GitHub Actions (optional)

---

## 🚀 Quick Start

### Local Setup

**Prerequisites:**
- Node.js 18+ 
- npm or yarn
- MongoDB (local or Atlas)

**Installation:**

```bash
# Clone repository
git clone https://github.com/yourusername/mahek-decorator.git
cd mahek-decorator

# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..

# Create environment file
cp .env.example .env.local
```

**Configure Environment Variables:**

Edit `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
MONGODB_URI=mongodb://localhost:27017/mahek-decorator
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
WHATSAPP_PHONE=919876543210
PHONE_NUMBER=919876543210
```

### Running Locally

**Option 1: Run Both Services Together**
```bash
npm run dev:all
```

**Option 2: Run Separately**

Terminal 1 (Frontend):
```bash
npm run dev
```

Terminal 2 (Backend):
```bash
npm run backend
```

---

## 📡 Network Access

Access from any device on the same network:

```
Local:    http://localhost:3000
Network:  http://10.65.59.11:3000
```

**Backend API:**
```
Local:    http://localhost:5000/api
Network:  http://10.65.59.11:5000/api
```

---

## 🌐 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

**Configure environment variables in Vercel dashboard**

### Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy
```

### Railway

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway up
```

### Docker

```bash
# Build image
docker build -t mahek-decorator .

# Run container
docker run -p 3000:3000 -p 5000:5000 mahek-decorator

# Using Docker Compose
docker-compose up -d
```

---

## 📊 Performance Metrics

| Metric | Target | Status |
|--------|--------|--------|
| Lighthouse Score | 95+ | ✅ |
| Mobile Performance | 95+ | ✅ |
| Accessibility | 95+ | ✅ |
| SEO | 95+ | ✅ |
| First Contentful Paint | <2s | ✅ |
| Time to Interactive | <3s | ✅ |

---

## 📁 Project Structure

```
mahek-decorator/
├── src/
│   ├── app/
│   │   ├── layout.js          # Root layout
│   │   ├── page.js            # Home page
│   │   ├── globals.css        # Global styles
│   │   └── api/               # API routes
│   │       ├── booking/
│   │       ├── consultation/
│   │       └── contact/
│   ├── components/            # Reusable components
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── Gallery.jsx
│   │   └── ...
│   └── lib/
│       └── config.js          # Configuration
├── backend/
│   ├── server.js              # Express server
│   ├── routes/                # API routes
│   │   ├── bookings.js
│   │   └── contacts.js
│   ├── models/                # DB schemas
│   │   ├── Booking.js
│   │   └── Contact.js
│   └── controllers/           # Business logic
├── public/                    # Static files
├── package.json               # Frontend dependencies
├── next.config.js             # Next.js config
├── vercel.json                # Vercel deployment
├── railway.json               # Railway deployment
├── docker-compose.yml         # Docker setup
└── README.md                  # This file
```

---

## 🔧 Available Scripts

```bash
# Development
npm run dev                # Run frontend + backend
npm run dev:host         # Frontend on 0.0.0.0
npm run dev:all          # Both services concurrently

# Production
npm run build             # Build Next.js
npm run start             # Start production server

# Backend
npm run backend           # Run backend only (root)
cd backend && npm run dev # Backend with nodemon

# Linting
npm run lint              # Run ESLint
```

---

## 🔐 Environment Variables

| Variable | Purpose | Example |
|----------|---------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | `http://localhost:5000/api` |
| `MONGODB_URI` | MongoDB connection | `mongodb://localhost:27017/...` |
| `EMAIL_USER` | SMTP email | `your-email@gmail.com` |
| `EMAIL_PASS` | SMTP password | `app-specific-password` |
| `RAZORPAY_KEY_ID` | Payment gateway key | `rzp_live_xxxxx` |
| `RAZORPAY_KEY_SECRET` | Payment secret | `xxxxx` |
| `WHATSAPP_PHONE` | WhatsApp number | `919876543210` |
| `PHONE_NUMBER` | Contact number | `919876543210` |

---

## 📞 API Endpoints

### Bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings/:id` - Get booking details
- `PUT /api/bookings/:id` - Update booking
- `DELETE /api/bookings/:id` - Cancel booking

### Contacts
- `POST /api/contacts` - Submit contact form
- `GET /api/contacts` - List all contacts (admin)
- `DELETE /api/contacts/:id` - Delete contact

### Health
- `GET /api/health` - API health check

---

## 🔒 Security

- ✅ Environment variables for sensitive data
- ✅ CORS enabled for controlled origins
- ✅ Input validation with express-validator
- ✅ Secure headers (Content Security Policy)
- ✅ Rate limiting (optional)
- ✅ HTTPS in production
- ✅ MongoDB connection pooling
- ✅ Error handling and logging

---

## 📝 License

This project is licensed under the MIT License - see [LICENSE](LICENSE) file for details.

---

## 👥 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📧 Contact

**Email**: info@mahekdecorator.com  
**Phone**: +91 9876543210  
**WhatsApp**: [Chat here](https://wa.me/919876543210)  
**Website**: [mahekdecorator.com](https://mahekdecorator.com)

---

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for styling
- Framer Motion for animations
- Vercel for hosting
- MongoDB for database

---

**Made with ❤️ by MAHEK DECORATOR Team**
