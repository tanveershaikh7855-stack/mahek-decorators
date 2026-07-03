import { NextResponse } from 'next/server'
import { getAll, create } from '@/lib/db'

export async function GET() {
  return NextResponse.json(getAll('customers'))
}

export async function POST(req) {
  try {
    const body = await req.json()
    if (!body.name?.trim() || !body.phone?.trim()) {
      return NextResponse.json({ error: 'Name and phone are required' }, { status: 400 })
    }
    const customer = create('customers', {
      name: body.name.trim(),
      phone: body.phone.trim(),
      email: body.email?.trim() || '',
      address: body.address?.trim() || '',
      city: body.city?.trim() || '',
      notes: body.notes?.trim() || '',
      source: body.source || 'website',
    })
    return NextResponse.json(customer, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
