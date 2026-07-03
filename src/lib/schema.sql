-- PostgreSQL Schema for Mahek Decorator
-- Run this in your PostgreSQL database to set up the tables.

CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(255),
  address TEXT,
  city VARCHAR(100),
  notes TEXT,
  source VARCHAR(50) DEFAULT 'website',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  product_name VARCHAR(255) NOT NULL,
  occasion VARCHAR(100),
  event_date DATE NOT NULL,
  event_time TIME,
  guest_count INTEGER,
  location TEXT NOT NULL,
  budget VARCHAR(50),
  message TEXT,
  status VARCHAR(20) DEFAULT 'pending', -- pending, approved, completed, cancelled
  payment_status VARCHAR(20) DEFAULT 'unpaid', -- unpaid, partial, paid
  amount DECIMAL(10,2),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(255),
  occasion VARCHAR(100),
  service VARCHAR(100),
  budget VARCHAR(50),
  location TEXT,
  message TEXT,
  source VARCHAR(50) DEFAULT 'website', -- website, whatsapp, instagram, referral
  status VARCHAR(20) DEFAULT 'new', -- new, contacted, qualified, converted, lost
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  method VARCHAR(50), -- cash, upi, card, bank_transfer
  transaction_id VARCHAR(255),
  status VARCHAR(20) DEFAULT 'pending', -- pending, completed, failed, refunded
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price_range VARCHAR(100),
  category VARCHAR(100),
  tags TEXT[],
  image_url TEXT,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name VARCHAR(255) NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  text TEXT NOT NULL,
  event_type VARCHAR(100),
  photo_url TEXT,
  approved BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(255),
  occasion VARCHAR(100),
  service VARCHAR(100),
  budget VARCHAR(50),
  event_date DATE,
  event_time TIME,
  guest_count INTEGER,
  location TEXT,
  preferred_contact VARCHAR(50),
  message TEXT,
  status VARCHAR(20) DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
