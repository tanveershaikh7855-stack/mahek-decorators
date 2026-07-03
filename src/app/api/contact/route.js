import { NextResponse } from 'next/server'

// ─── Rate Limiter (in-memory) ───────────────────────────────
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
  if (entry.count > RATE_MAX) return true
  return false
}

// ─── Validation ─────────────────────────────────────────────
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

// ─── POST ───────────────────────────────────────────────────
export async function POST(request) {
  try {
    // Honeypot check
    const body = await request.json()
    if (body.website?.trim()) {
      return NextResponse.json({ success: true, message: 'Thank you!' })
    }

    // Rate limit
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
    if (rateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    // Validate
    const errors = validate(body)
    if (errors.length > 0) {
      return NextResponse.json({ error: errors.join('. ') }, { status: 400 })
    }

    // Build email content
    const fields = [
      ['Name', body.name],
      ['Phone', body.phone],
      ['Email', body.email || '—'],
      ['Occasion', body.occasion],
      ['Service', body.service],
      ['Budget', body.budget || '—'],
      ['Event Date', body.eventDate],
      ['Event Time', body.eventTime || '—'],
      ['Guest Count', body.guestCount || '—'],
      ['Location', body.location],
      ['Preferred Contact', body.preferredContact || '—'],
      ['Message', body.message || '—'],
    ]
    const tableHtml = fields
      .map(([k, v]) => `<tr><td style="padding:8px 12px;border:1px solid #333;font-weight:600;color:#d4af37">${k}</td><td style="padding:8px 12px;border:1px solid #333;color:#fff">${v}</td></tr>`)
      .join('')

    const html = `
      <div style="max-width:600px;margin:0 auto;font-family:sans-serif;background:#0b0b0b;padding:30px;border-radius:16px">
        <div style="text-align:center;margin-bottom:24px">
          <div style="width:48px;height:48px;border-radius:50%;background:linear-gradient(135deg,#d4af37,#b8962e);margin:0 auto 12px;display:flex;align-items:center;justify-content:center;font-size:22px;font-weight:bold;color:#0b0b0b">M</div>
          <h1 style="color:#fff;font-size:20px;margin:0">New Contact Inquiry</h1>
          <p style="color:rgba(255,255,255,0.4);font-size:13px;margin:4px 0 0">Received on ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
        </div>
        <table style="width:100%;border-collapse:collapse;font-size:14px">${tableHtml}</table>
        <hr style="border:none;border-top:1px solid rgba(255,255,255,0.1);margin:20px 0" />
        <p style="color:rgba(255,255,255,0.3);font-size:12px;text-align:center">Mahek Balloon Decorators</p>
      </div>
    `

    const text = fields.map(([k, v]) => `${k}: ${v}`).join('\n')

    // Send email via Resend (or log fallback)
    const RESEND_API_KEY = process.env.RESEND_API_KEY
    if (RESEND_API_KEY) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Mahek Decorator <noreply@mahekdecorators.com>',
          to: process.env.NOTIFICATION_EMAIL || 'hello@mahekdecorators.com',
          replyTo: body.email || 'noreply@mahekdecorators.com',
          subject: `New Inquiry: ${body.name} — ${body.occasion}`,
          html,
          text,
        }),
      })
    } else {
      // Fallback: log to console
      // Contact inquiry logged
    }

    return NextResponse.json({ success: true, message: 'Inquiry received successfully!' })
  } catch (error) {
    console.error('Contact API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
