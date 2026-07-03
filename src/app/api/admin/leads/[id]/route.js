import { NextResponse } from 'next/server'
import { getById, update, remove } from '@/lib/db'

export async function GET(_, { params }) {
  const item = getById('leads', params.id)
  if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(item)
}

export async function PATCH(req, { params }) {
  try {
    const body = await req.json()
    const item = update('leads', params.id, body)
    if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(item)
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}

export async function DELETE(_, { params }) {
  const ok = remove('leads', params.id)
  if (!ok) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json({ success: true })
}
