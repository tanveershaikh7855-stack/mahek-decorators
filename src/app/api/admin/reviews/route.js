import { NextResponse } from 'next/server'
import { getAll, create } from '@/lib/db'

export async function GET() {
  return NextResponse.json(getAll('reviews'))
}

export async function POST(req) {
  try {
    const body = await req.json()
    if (!body.customer_name?.trim() || !body.rating?.toString().trim()) {
      return NextResponse.json({ error: 'Customer name and rating are required' }, { status: 400 })
    }
    const item = create('reviews', body)
    return NextResponse.json(item, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
