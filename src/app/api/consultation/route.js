import { NextResponse } from 'next/server'

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

export async function POST(request) {
  try {
    const body = await request.json()

    if (body.website?.trim()) {
      return NextResponse.json({ success: true })
    }

    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
    if (rateLimit(ip)) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
    }

    if (!body.name?.trim() || !body.phone?.trim()) {
      return NextResponse.json({ error: 'Name and phone are required' }, { status: 400 })
    }

    const fields = [
      ['Type', 'Consultation'],
      ['Name', body.name],
      ['Phone', body.phone],
      ['Email', body.email || '—'],
      ['Occasion', body.occasion || '—'],
      ['Preferred Time', body.preferredTime || '—'],
      ['Message', body.message || '—'],
    ]

    const text = fields.map(([k, v]) => `${k}: ${v}`).join('\n')

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
          subject: `Consultation Request: ${body.name}`,
          text,
        }),
      })
    } else {
      // Consultation request logged
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Consultation API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
