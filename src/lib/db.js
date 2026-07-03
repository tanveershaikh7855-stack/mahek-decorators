// Simple JSON file-based database
// Swap this with PostgreSQL in production by replacing the storage methods.

import fs from 'fs'
import path from 'path'

const DATA_DIR = path.join(process.cwd(), 'data')

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true })
}

function filePath(collection) {
  ensureDir()
  return path.join(DATA_DIR, `${collection}.json`)
}

function read(collection) {
  const fp = filePath(collection)
  if (!fs.existsSync(fp)) {
    fs.writeFileSync(fp, '[]', 'utf-8')
    return []
  }
  try {
    return JSON.parse(fs.readFileSync(fp, 'utf-8'))
  } catch {
    return []
  }
}

function write(collection, data) {
  fs.writeFileSync(filePath(collection), JSON.stringify(data, null, 2), 'utf-8')
}

// ─── Public API ──────────────────────────────────────────────

export function getAll(collection) {
  return read(collection)
}

export function getById(collection, id) {
  return read(collection).find((item) => item.id === id) || null
}

export function create(collection, data) {
  const items = read(collection)
  const now = new Date().toISOString()
  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
  const newItem = { id, ...data, createdAt: now, updatedAt: now }
  items.push(newItem)
  write(collection, items)
  return newItem
}

export function update(collection, id, data) {
  const items = read(collection)
  const index = items.findIndex((item) => item.id === id)
  if (index === -1) return null
  items[index] = { ...items[index], ...data, updatedAt: new Date().toISOString() }
  write(collection, items)
  return items[index]
}

export function remove(collection, id) {
  const items = read(collection)
  const index = items.findIndex((item) => item.id === id)
  if (index === -1) return false
  items.splice(index, 1)
  write(collection, items)
  return true
}

export function query(collection, filterFn) {
  return read(collection).filter(filterFn)
}
