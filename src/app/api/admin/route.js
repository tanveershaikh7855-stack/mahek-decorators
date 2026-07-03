import { NextResponse } from 'next/server'
import { getAll } from '@/lib/db'

export async function GET() {
  const collections = ['customers', 'bookings', 'leads', 'payments', 'products', 'reviews', 'contacts']
  const stats = {}
  for (const name of collections) {
    const items = getAll(name)
    stats[name] = items.length
    stats[`${name}_data`] = items
  }
  return NextResponse.json(stats)
}
