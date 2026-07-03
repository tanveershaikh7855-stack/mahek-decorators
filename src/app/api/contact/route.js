import { NextResponse } from 'next/server'
import { create } from '@/lib/db'

// ─── Rate Limiter ───────────────────────────────────────────
const rateMap = new Map()
const RATE_WINDOW = 60 * 1000
const RATE_MAX = 3

function rateLimit(ip) {
  const now = Date.now()
  const entry = rateMap.get(ip)
  if (!entry || now - entry.start > RATE_WINDOW) {
    rateMap.set(ip, { start: now, count: 1 })
    return false
  }
  entry.count++
  return entry.count > RATE_MAX
}

// ─── Validation ─────────────────────────────────────────────
function validate(body) {
  const errors = []
  if (!body.name?.trim()) errors.push('Name is required')
  if (!body.phone?.trim()) errors.push('Phone is required')
  else if (!/^[0-9+\-\s]{7,15}$/.test(body.phone)) errors.push('Invalid phone number')
  if (body.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) errors.push('Invalid email')
  return errors
}

// ─── Email Templates ────────────────────────────────────────
function adminEmailHtml(data) {
  const fields = [
    ['Name', data.name],
    ['Phone', data.phone],
    ['Email', data.email || '—'],
    ['Occasion', data.occasion || '—'],
    ['Service', data.service || '—'],
    ['Budget', data.budget || '—'],
    ['Event Date', data.eventDate || '—'],
    ['Event Time', data.eventTime || '—'],
    ['Guest Count', data.guestCount || '—'],
    ['Location', data.location || '—'],
    ['Preferred Contact', data.preferredContact || '—'],
    ['Message', data.message || '—'],
  ]
  const rows = fields
    .map(([k, v]) => `<tr><td style="padding:8px 14px;border:1px solid rgba(255,255,255,0.1);font-weight:600;color:#d4af37;font-size:13px">${k}</td><td style="padding:8px 14px;border:1px solid rgba(255,255,255,0.1);color:#fff;font-size:13px">${v}</td></tr>`)
    .join('')
  return `
    <div style="max-width:560px;margin:0 auto;font-family:system-ui,sans-serif;background:#0b0b0b;padding:32px;border-radius:16px;border:1px solid rgba(255,255,255,0.08)">
      <div style="text-align:center;margin-bottom:24px">
        <div style="width:44px;height:44px;border-radius:50%;background:linear-gradient(135deg,#d4af37,#b8962e);margin:0 auto 12px;display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:bold;color:#0b0b0b">M</div>
        <h1 style="color:#fff;font-size:18px;margin:0;font-weight:600">New Contact Inquiry</h1>
        <p style="color:rgba(255,255,255,0.4);font-size:12px;margin:4px 0 0">${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
      </div>
      <table style="width:100%;border-collapse:collapse">${rows}</table>
      <hr style="border:none;border-top:1px solid rgba(255,255,255,0.06);margin:20px 0" />
      <p style="color:rgba(255,255,255,0.25);font-size:11px;text-align:center">Mahek Balloon Decorators</p>
    </div>`
}

function customerEmailHtml(name) {
  return `
    <div style="max-width:480px;margin:0 auto;font-family:system-ui,sans-serif;background:#0b0b0b;padding:32px;border-radius:16px;border:1px solid rgba(255,255,255,0.08)">
      <div style="text-align:center;margin-bottom:20px">
        <div style="width:44px;height:44px;border-radius:50%;background:linear-gradient(135deg,#d4af37,#b8962e);margin:0 auto 12px;display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:bold;color:#0b0b0b">M</div>
      </div>
      <h1 style="color:#fff;font-size:18px;text-align:center;margin:0 0 8px;font-weight:600">Thank You, ${name}!</h1>
      <p style="color:rgba(255,255,255,0.5);font-size:13px;text-align:center;line-height:1.6;margin:0 0 24px">
        We have received your inquiry. Our team will reach out within 30 minutes on your preferred contact method.
      </p>
      <div style="background:rgba(255,255,255,0.04);border-radius:12px;padding:16px;margin-bottom:20px;border:1px solid rgba(255,255,255,0.06)">
        <p style="color:rgba(255,255,255,0.35);font-size:11px;margin:0 0 8px;text-transform:uppercase;letter-spacing:0.1em">Need immediate assistance?</p>
        <p style="color:#fff;font-size:13px;margin:0">Call: <a href="tel:+918087867988" style="color:#d4af37;text-decoration:none">8087867988</a></p>
        <p style="color:#fff;font-size:13px;margin:4px 0 0">WhatsApp: <a href="https://wa.me/918087867988" style="color:#d4af37;text-decoration:none">8087867988</a></p>
      </div>
      <hr style="border:none;border-top:1px solid rgba(255,255,255,0.06);margin:20px 0" />
      <p style="color:rgba(255,255,255,0.2);font-size:11px;text-align:center">Mahek Balloon Decorators, Pune</p>
    </div>`
}

async function sendEmail({ to, subject, html, text }) {
  const RESEND_API_KEY = process.env.RESEND_API_KEY
  if (!RESEND_API_KEY) {
    console.log(`[EMAIL] ${subject}\n${text}`)
    return
  }
  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Mahek Decorator <noreply@mahekdecorators.com>',
        to,
        replyTo: 'hello@mahekdecorators.com',
        subject,
        html,
        text,
      }),
    })
  } catch (err) {
    console.error('Resend error:', err)
  }
}

// ─── POST ───────────────────────────────────────────────────
export async function POST(request) {
  try {
    const body = await request.json()

    // Honeypot
    if (body.website?.trim()) {
      return NextResponse.json({ success: true, message: 'Thank you!' })
    }

    // Rate limit
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
    if (rateLimit(ip)) {
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 })
    }

    // Validate
    const errors = validate(body)
    if (errors.length > 0) {
      return NextResponse.json({ error: errors.join('. ') }, { status: 400 })
    }

    // Save to database
    const contact = create('contacts', {
      name: body.name.trim(),
      phone: body.phone.trim(),
      email: body.email?.trim() || '',
      occasion: body.occasion || '',
      service: body.service || '',
      budget: body.budget || '',
      eventDate: body.eventDate || '',
      eventTime: body.eventTime || '',
      guestCount: body.guestCount || '',
      location: body.location || '',
      preferredContact: body.preferredContact || '',
      message: body.message || '',
      status: 'new',
    })

    // Build text version
    const text = [
      `Name: ${body.name}`,
      `Phone: ${body.phone}`,
      `Email: ${body.email || '—'}`,
      `Occasion: ${body.occasion || '—'}`,
      `Service: ${body.service || '—'}`,
      `Budget: ${body.budget || '—'}`,
      `Event Date: ${body.eventDate || '—'}`,
      `Event Time: ${body.eventTime || '—'}`,
      `Guest Count: ${body.guestCount || '—'}`,
      `Location: ${body.location || '—'}`,
      `Preferred Contact: ${body.preferredContact || '—'}`,
      `Message: ${body.message || '—'}`,
    ].join('\n')

    // Send admin notification
    await sendEmail({
      to: process.env.NOTIFICATION_EMAIL || 'hello@mahekdecorators.com',
      subject: `New Inquiry: ${body.name} — ${body.occasion || 'General'}`,
      html: adminEmailHtml(body),
      text,
    })

    // Send customer thank-you
    if (body.email) {
      await sendEmail({
        to: body.email,
        subject: 'Thank you for contacting Mahek Decorator',
        html: customerEmailHtml(body.name),
        text: `Thank you, ${body.name}! We have received your inquiry and will contact you shortly.`,
      })
    }

    return NextResponse.json({ success: true, message: 'Inquiry received successfully!', id: contact.id })
  } catch (error) {
    console.error('Contact API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
