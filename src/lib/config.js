// ============================================================
// MAHEK DECORATOR — Centralized Business Configuration
// ============================================================
// Change any value here and it propagates across the entire site.
// ============================================================

const CONFIG = {
  // ─── BUSINESS INFO ──────────────────────────────────────────
  businessName: 'Mahek Balloon Decorators',
  businessNameShort: 'Mahek',
  ownerName: 'Bilal Shaikh',
  tagline: 'Premium Balloon Decoration Services',
  description: 'Premium balloon decoration services across Pune and 160+ KM surrounding areas. Transform every celebration into an unforgettable memory.',

  // ─── CONTACT ────────────────────────────────────────────────
  phone: {
    primary: '+918087867988',
    secondary: '+918087867988',
    display: '8087867988',
  },
  whatsapp: {
    number: '918087867988',
    display: '+91 80878 67988',
  },
  email: {
    business: 'hello@mahekdecorators.com',
    support: 'support@mahekdecorators.com',
  },
  address: {
    line1: 'Opposite to Saras Baug Road',
    line2: 'Municipal Colony, Pune',
    city: 'Pune',
    state: 'Maharashtra',
    pincode: '411030',
    full: 'Opposite to Saras Baug Road, Municipal Colony, Pune, Maharashtra 411030',
  },
  googleMaps: {
    url: 'https://maps.app.goo.gl/gWNSmK4reE3FHfLP8',
    embed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.0!2d73.8567!3d18.5204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDMxJzEzLjQiTiA3M8KwNTEnMjQuMCJF!5e0!3m2!1sen!2sin!4v1',
  },

  // ─── SOCIAL MEDIA ───────────────────────────────────────────
  social: {
    instagram: 'https://www.instagram.com/mahek_balloons_shop_808/?hl=en',
    facebook: '#',
    youtube: '#',
  },

  // ─── WORKING HOURS ──────────────────────────────────────────
  workingHours: {
    display: '24/7',
    note: 'Available every day, including holidays',
  },

  // ─── SERVICE AREA ───────────────────────────────────────────
  serviceArea: {
    city: 'Pune',
    radius: '160 KM',
    description: 'Serving Pune and 160+ KM surrounding areas including Pimpri, Hinjewadi, Wakad, Baner, Kharadi, Hadapsar, Talegaon, Lonavala, Satara, Ahmednagar, Baramati, Chakan',
  },

  // ─── NAVIGATION ─────────────────────────────────────────────
  navLinks: [
    { label: 'Home', href: '#hero' },
    { label: 'Decorations', href: '#decorations' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Contact', href: '#contact' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'FAQ', href: '#faq' },
  ],

  // ─── WHATSAPP MESSAGE TEMPLATES ─────────────────────────────
  whatsappMessages: {
    booking:
      'Hello Mahek Decorator,%0A%0AI want decoration service for:%0A%0AOccasion:%0ADate:%0ALocation:%0ABudget:%0A%0APlease share the details.',
    negotiate: 'Hi Mahek Decorator! Can we negotiate the price for my event decoration? Please share the best offer.',
    general: 'Hi Mahek Decorator! I would like to know more about your decoration services.',
  },

  // ─── STATS ──────────────────────────────────────────────────
  stats: [
    { number: '500+', label: 'Events Decorated' },
    { number: '160 KM', label: 'Service Radius' },
    { number: '4.9', label: 'Client Rating' },
  ],
}

// ─── HELPER FUNCTIONS ────────────────────────────────────────

export function whatsappUrl(message) {
  return `https://wa.me/${CONFIG.whatsapp.number}?text=${message}`
}

export function telUrl(number) {
  return `tel:${number.replace(/[^0-9]/g, '')}`
}

export function mailUrl(email, subject, body) {
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

export default CONFIG
