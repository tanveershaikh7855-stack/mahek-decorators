# MAHEK DECORATOR 🎈

**Premium Balloon Decoration Services — Pune**

A luxury, high-performance event decoration website built with Next.js, featuring glassmorphism design, WhatsApp integration, and a full backend API.

---

## Tech Stack

### Frontend
- **Next.js 14** — React framework with App Router
- **Tailwind CSS** — Utility-first styling
- **CSS Animations** — GPU-accelerated, jank-free motion

### Backend
- **Node.js + Express** — REST API
- **MongoDB** — Database (via Mongoose)
- **Razorpay** — Payment integration
- **Nodemailer** — Email notifications

### Features
- ✅ Luxury glassmorphism UI
- ✅ Smooth 60 FPS animations
- ✅ WhatsApp booking integration
- ✅ Mobile-first responsive design
- ✅ Contact form with WhatsApp fallback
- ✅ Service area: Pune + 160 KM
- ✅ SEO optimized
- ✅ Lighthouse 95+

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/mahek-decorator.git
cd mahek-decorator

# Install frontend dependencies
npm install

# Install backend dependencies
cd backend && npm install && cd ..

# Start development servers
npm run dev:all
```

The frontend runs on `http://localhost:3000` and the API on `http://localhost:5000`.

### Environment Variables

Create `backend/.env`:

```env
PORT=5000
MONGODB_URI=your_mongodb_uri
WHATSAPP_NUMBER=919876543210
RAZORPAY_KEY_ID=your_key
RAZORPAY_KEY_SECRET=your_secret
```

---

## Project Structure

```
mahek-decorator/
├── src/
│   ├── app/
│   │   ├── layout.js       # Root layout & metadata
│   │   ├── page.js          # Main page composition
│   │   └── globals.css      # Global styles & Tailwind
│   ├── components/
│   │   ├── Navbar.jsx       # Glassmorphism nav
│   │   ├── Hero.jsx         # Luxury hero section
│   │   ├── FeaturedDecorations.jsx  # Service cards
│   │   ├── Gallery.jsx      # Portfolio grid
│   │   ├── Reviews.jsx      # Testimonials
│   │   ├── Contact.jsx      # Booking form
│   │   ├── WhatsAppButton.jsx  # Floating WA button
│   │   └── Footer.jsx       # Site footer
│   └── lib/                 # Utilities
├── backend/
│   ├── server.js            # Express entry
│   ├── models/
│   │   ├── Booking.js       # Booking schema
│   │   └── Contact.js       # Contact schema
│   └── routes/
│       ├── bookings.js      # Booking API
│       └── contacts.js      # Contact API
├── public/                  # Static assets
├── package.json
├── next.config.js
├── tailwind.config.js
└── README.md
```

---

## API Endpoints

| Method | Endpoint            | Description          |
|--------|---------------------|----------------------|
| GET    | `/api/health`       | Health check         |
| GET    | `/api/bookings`     | List all bookings    |
| POST   | `/api/bookings`     | Create booking       |
| PATCH  | `/api/bookings/:id` | Update booking status|
| GET    | `/api/contacts`     | List contacts        |
| POST   | `/api/contacts`     | Submit contact form  |

---

## Deployment

### Vercel (Frontend)
```bash
npm run build
vercel --prod
```

### Railway / Render (Backend)
```bash
cd backend
npm start
```

---

## Performance Targets
- Lighthouse Performance: 95+
- Mobile Score: 95+
- CLS: < 0.1
- First Contentful Paint: < 1.5s
- 60 FPS animations
- 100% responsive

---

## License
MIT © MAHEK DECORATOR
