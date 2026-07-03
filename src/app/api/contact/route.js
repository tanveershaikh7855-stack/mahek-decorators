import { NextResponse } from 'next/server'
import { create } from '@/lib/db'

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

function validate(body) {
  const errors = []
  if (!body.name?.trim()) errors.push('Name is required')
  if (!body.phone?.trim()) errors.push('Phone is required')
  else if (!/^[0-9+\-\s]{7,15}$/.test(body.phone)) errors.push('Invalid phone number')
  if (body.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) errors.push('Invalid email')
  if (!body.occasion?.trim()) errors.push('Occasion is required')
  if (!body.service?.trim()) errors.push('Service is required')
  if (!body.eventDate?.trim()) errors.push('Event date is required')
  if (!body.location?.trim()) errors.push('Location is required')
  return errors
}

function sendEmail({ to, subject, html, text, replyTo }) {
  const RESEND_API_KEY = process.env.RESEND_API_KEY
  if (!RESEND_API_KEY) {
    console.log(`[EMAIL] To: ${to}, Subject: ${subject}`)
    console.log(text)
    return
  }
  return fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: 'Mahek Decorator <noreply@mahekdecorators.com>',
      to,
      replyTo: replyTo || 'noreply@mahekdecorators.com',
      subject,
      html,
      text,
    }),
  })
}

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

    // Store in database
    create('contacts', {
      name: body.name,
      phone: body.phone,
      email: body.email || '',
      occasion: body.occasion,
      service: body.service,
      budget: body.budget || '',
      event_date: body.eventDate,
      event_time: body.eventTime || '',
      guest_count: body.guestCount || '',
      location: body.location,
      preferred_contact: body.preferredContact || '',
      message: body.message || '',
      status: 'new',
    })

    // Build HTML for admin notification
    const fields = [
      ['Name', body.name], ['Phone', body.phone], ['Email', body.email || '—'],
      ['Occasion', body.occasion], ['Service', body.service], ['Budget', body.budget || '—'],
      ['Event Date', body.eventDate], ['Event Time', body.eventTime || '—'],
      ['Guest Count', body.guestCount || '—'], ['Location', body.location],
      ['Preferred Contact', body.preferredContact || '—'], ['Message', body.message || '—'],
    ]
    const rows = fields.map(([k, v]) =>
      `<tr><td style="padding:8px 12px;border:1px solid #333;font-weight:600;color:#d4af37">${k}</td><td style="padding:8px 12px;border:1px solid #333;color:#fff">${v}</td></tr>`
    ).join('')

    const emailHtml = (title, extra) => `
      <div style="max-width:600px;margin:0 auto;font-family:sans-serif;background:#0b0b0b;padding:30px;border-radius:16px">
        <div style="text-align:center;margin-bottom:24px">
          <div style="width:48px;height:48px;border-radius:50%;background:linear-gradient(135deg,#d4af37,#b8962e);margin:0 auto 12px;display:flex;align-items:center;justify-content:center;font-size:22px;font-weight:bold;color:#0b0b0b">M</div>
          <h1 style="color:#fff;font-size:20px;margin:0">${title}</h1>
          <p style="color:rgba(255,255,255,0.4);font-size:13px;margin:4px 0 0">${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
        </div>
        <table style="width:100%;border-collapse:collapse;font-size:14px">${rows}</table>
        ${extra || ''}
        <hr style="border:none;border-top:1px solid rgba(255,255,255,0.1);margin:20px 0" />
        <p style="color:rgba(255,255,255,0.3);font-size:12px;text-align:center">Mahek Balloon Decorators — Pune</p>
      </div>
    `
    const text = fields.map(([k, v]) => `${k}: ${v}`).join('\n')

    const RESEND_KEY = process.env.RESEND_API_KEY

    // 1) Notify admin
    if (RESEND_KEY) {
      await sendEmail({
        to: process.env.NOTIFICATION_EMAIL || 'hello@mahekdecorators.com',
        subject: `New Inquiry: ${body.name} — ${body.occasion}`,
        html: emailHtml('New Contact Inquiry', ''),
        text,
        replyTo: body.email || undefined,
      })

      // 2) Auto-reply to customer (if email provided)
      if (body.email) {
        await sendEmail({
          to: body.email,
          subject: 'Thank you for contacting Mahek Decorator',
          html: emailHtml('Thank You! 🎈', `
            <p style="color:rgba(255,255,255,0.6);font-size:14px;line-height:1.6;margin:16px 0">
              Dear ${body.name},<br><br>
              Thank you for reaching out to Mahek Balloon Decorators.<br>
              We have received your inquiry for <strong style="color:#d4af37">${body.occasion}</strong> on <strong style="color:#d4af37">${body.eventDate}</strong>.<br><br>
              Our team will contact you shortly via ${body.preferredContact || 'WhatsApp'}.<br>
              Expect a response within 30 minutes.
            </p>
            <div style="text-align:center;margin:24px 0">
              <a href="https://wa.me/918087867988" style="display:inline-block;padding:12px 24px;border-radius:50px;background:linear-gradient(135deg,#d4af37,#e8c84a);color:#0b0b0b;text-decoration:none;font-weight:600;font-size:14px">Chat on WhatsApp</a>
            </div>
          `),
          text: `Thank you for contacting Mahek Decorator, ${body.name}!\n\nWe received your inquiry for ${body.occasion} on ${body.eventDate}.\n\nOur team will reach out within 30 minutes.\n\n- Mahek Balloon Decorators`,
        })
      }
    }

    return NextResponse.json({ success: true, message: 'Inquiry received! We will contact you shortly.' })
  } catch (error) {
    console.error('Contact API error:', error)
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
