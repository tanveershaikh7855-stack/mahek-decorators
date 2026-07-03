import { NextResponse } from 'next/server'
import { getAll, create } from '@/lib/db'

export async function GET() {
  return NextResponse.json(getAll('products'))
}

export async function POST(req) {
  try {
    const body = await req.json()
    if (!body.name?.trim()) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 })
    }
    const item = create('products', body)
    return NextResponse.json(item, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
