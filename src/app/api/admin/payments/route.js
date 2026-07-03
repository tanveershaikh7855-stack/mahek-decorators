import { NextResponse } from 'next/server'
import { getAll, create } from '@/lib/db'

export async function GET() {
  return NextResponse.json(getAll('payments'))
}

export async function POST(req) {
  try {
    const body = await req.json()
    if (!body.name?.trim() || !body.phone?.trim()) {
      return NextResponse.json({ error: 'Name and phone are required' }, { status: 400 })
    }
    const item = create('payments', body)
    return NextResponse.json(item, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
