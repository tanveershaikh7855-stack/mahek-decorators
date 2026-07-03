import { NextResponse } from 'next/server'
import { getAll, create } from '@/lib/db'

export async function GET() {
  return NextResponse.json(getAll('bookings'))
}

export async function POST(req) {
  try {
    const body = await req.json()
    if (!body.product_name?.trim() || !body.event_date?.trim()) {
      return NextResponse.json({ error: 'Product name and event date are required' }, { status: 400 })
    }
    const item = create('bookings', body)
    return NextResponse.json(item, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
