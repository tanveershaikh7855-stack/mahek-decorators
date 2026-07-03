'use client'

import { useState, useEffect, useCallback } from 'react'

const TABS = [
  { id: 'dashboard', label: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { id: 'leads', label: 'Leads', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z' },
  { id: 'bookings', label: 'Bookings', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
  { id: 'payments', label: 'Payments', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
  { id: 'contacts', label: 'Contacts', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
  { id: 'reviews', label: 'Reviews', icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z' },
  { id: 'products', label: 'Products', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
]

const STATUS_OPTIONS = {
  bookings: ['pending', 'approved', 'completed', 'cancelled'],
  leads: ['new', 'contacted', 'qualified', 'converted', 'lost'],
  payments: ['pending', 'completed', 'failed', 'refunded'],
  contacts: ['new', 'contacted', 'closed'],
  reviews: ['pending', 'approved'],
}

export default function AdminPage() {
  const [tab, setTab] = useState('dashboard')
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  const fetchAll = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin')
      const json = await res.json()
      setData(json)
    } catch (e) {
      console.error('Failed to fetch admin data', e)
    }
    setLoading(false)
  }, [])

  useEffect(() => { fetchAll() }, [fetchAll])

  const updateStatus = async (collection, id, status) => {
    try {
      await fetch(`/api/admin/${collection}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      fetchAll()
    } catch (e) {
      console.error('Failed to update status', e)
    }
  }

  const deleteItem = async (collection, id) => {
    if (!confirm('Delete this item?')) return
    try {
      await fetch(`/api/admin/${collection}/${id}`, { method: 'DELETE' })
      fetchAll()
    } catch (e) {
      console.error('Failed to delete', e)
    }
  }

  const exportCSV = (collection) => {
    const items = data[`${collection}_data`] || []
    if (!items.length) return
    const headers = Object.keys(items[0])
    const rows = items.map((item) => headers.map((h) => `"${String(item[h] || '').replace(/"/g, '""')}"`).join(','))
    const csv = [headers.join(','), ...rows].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${collection}-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const currentData = data[`${tab}_data`] || []
  const filtered = currentData.filter((item) => {
    if (search) {
      const q = search.toLowerCase()
      const match = Object.values(item).some((v) => String(v).toLowerCase().includes(q))
      if (!match) return false
    }
    if (statusFilter && item.status !== statusFilter) return false
    return true
  })

  const countByStatus = (collection, status) =>
    (data[`${collection}_data`] || []).filter((i) => i.status === status).length

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#0b0b0b]">
      {/* Sidebar */}
      <aside className="lg:w-64 border-r border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] backdrop-blur-[20px]">
        <div className="p-6 border-b border-[rgba(255,255,255,0.06)]">
          <a href="/" className="flex items-center gap-3 no-underline">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#d4af37] to-[#b8962e] flex items-center justify-center text-[#0b0b0b] font-bold text-base font-display">M</div>
            <div className="leading-tight">
              <div className="text-[14px] font-bold text-white font-display -mb-[1px]">MAHEK</div>
              <div className="text-[8px] tracking-[0.25em] uppercase text-[#d4af37] font-medium">Admin</div>
            </div>
          </a>
        </div>
        <nav className="p-3 space-y-1">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => { setTab(t.id); setSearch(''); setStatusFilter('') }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-left transition-all duration-300 cursor-pointer ${
                tab === t.id
                  ? 'bg-[rgba(212,175,55,0.1)] text-[#d4af37] border border-[rgba(212,175,55,0.15)]'
                  : 'text-[rgba(255,255,255,0.4)] hover:text-white hover:bg-[rgba(255,255,255,0.03)] border border-transparent'
              }`}
            >
              <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d={t.icon} />
              </svg>
              {t.label}
              {data[t.id] !== undefined && (
                <span className="ml-auto text-[10px] bg-[rgba(255,255,255,0.06)] px-2 py-0.5 rounded-full">{data[t.id]}</span>
              )}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto max-h-screen">
        <div className="p-6 lg:p-8">
          {tab === 'dashboard' && (
            <>
              <h1 className="font-display text-2xl font-semibold text-white mb-1">Dashboard</h1>
              <p className="text-sm text-[rgba(255,255,255,0.35)] mb-8">Overview of your business</p>

              {loading ? (
                <div className="flex items-center justify-center h-64 text-[rgba(255,255,255,0.2)]">Loading...</div>
              ) : (
                <>
                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {[
                      { label: 'Total Customers', count: data.customers, color: '#d4af37' },
                      { label: 'Total Bookings', count: data.bookings, color: '#8b5cf6' },
                      { label: 'New Leads', count: countByStatus('leads', 'new'), color: '#22c55e' },
                      { label: 'Pending Payments', count: countByStatus('payments', 'pending'), color: '#f59e0b' },
                    ].map((s) => (
                      <div key={s.label} className="rounded-2xl glass border border-[rgba(255,255,255,0.06)] p-5">
                        <div className="text-2xl font-display font-semibold text-white mb-1">{s.count ?? 0}</div>
                        <div className="text-xs text-[rgba(255,255,255,0.35)]">{s.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Status breakdowns */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {['leads', 'bookings', 'payments'].map((col) => (
                      <div key={col} className="rounded-2xl glass border border-[rgba(255,255,255,0.06)] p-5">
                        <h3 className="text-sm font-semibold text-white capitalize mb-4">{col}</h3>
                        <div className="space-y-3">
                          {(STATUS_OPTIONS[col] || []).map((s) => {
                            const count = countByStatus(col, s)
                            const total = data[col] || 1
                            const pct = total > 0 ? Math.round((count / total) * 100) : 0
                            return (
                              <div key={s}>
                                <div className="flex justify-between text-xs mb-1">
                                  <span className="text-[rgba(255,255,255,0.5)] capitalize">{s}</span>
                                  <span className="text-white font-medium">{count}</span>
                                </div>
                                <div className="h-1.5 rounded-full bg-[rgba(255,255,255,0.06)] overflow-hidden">
                                  <div className="h-full rounded-full bg-gradient-to-r from-[#d4af37] to-[#8b5cf6] transition-all duration-500" style={{ width: `${pct}%` }} />
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Recent Activity */}
                  <div className="rounded-2xl glass border border-[rgba(255,255,255,0.06)] p-5">
                    <h3 className="text-sm font-semibold text-white mb-4">Recent Activity</h3>
                    <div className="space-y-3">
                      {(['leads', 'contacts', 'bookings']).flatMap((col) =>
                        (data[`${col}_data`] || []).slice(-3).map((item) => (
                          <div key={item.id} className="flex items-center gap-3 text-xs">
                            <div className="w-2 h-2 rounded-full bg-[#d4af37] flex-shrink-0" />
                            <span className="text-[rgba(255,255,255,0.5)] capitalize">{col.slice(0, -1)}:</span>
                            <span className="text-white">{item.name || item.customer_name || item.product_name}</span>
                            <span className="text-[rgba(255,255,255,0.2)] ml-auto">{new Date(item.createdAt).toLocaleDateString()}</span>
                          </div>
                        ))
                      )}
                      {(['leads', 'contacts', 'bookings']).every((col) => !data[`${col}_data`]?.length) && (
                        <p className="text-xs text-[rgba(255,255,255,0.2)]">No activity yet</p>
                      )}
                    </div>
                  </div>
                </>
              )}
            </>
          )}

          {/* Data Table tabs */}
          {tab !== 'dashboard' && (
            <>
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <h1 className="font-display text-2xl font-semibold text-white capitalize">{tab}</h1>
                <div className="flex gap-3">
                  <input
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="px-4 py-2 rounded-xl glass border border-[rgba(255,255,255,0.08)] text-xs text-white bg-transparent outline-none w-48 focus:border-[rgba(212,175,55,0.3)]"
                  />
                  {STATUS_OPTIONS[tab] && (
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="px-4 py-2 rounded-xl glass border border-[rgba(255,255,255,0.08)] text-xs text-white bg-transparent outline-none focus:border-[rgba(212,175,55,0.3)]"
                      style={{ color: statusFilter ? 'white' : 'rgba(255,255,255,0.4)' }}
                    >
                      <option value="" className="bg-[#1a1a1a]">All Status</option>
                      {STATUS_OPTIONS[tab].map((s) => (
                        <option key={s} value={s} className="bg-[#1a1a1a] capitalize text-white">{s}</option>
                      ))}
                    </select>
                  )}
                  <button onClick={() => exportCSV(tab)} className="px-4 py-2 rounded-xl btn-gold text-xs cursor-pointer">
                    Export CSV
                  </button>
                </div>
              </div>

              <div className="rounded-2xl glass border border-[rgba(255,255,255,0.06)] overflow-hidden">
                {loading ? (
                  <div className="flex items-center justify-center h-64 text-[rgba(255,255,255,0.2)]">Loading...</div>
                ) : filtered.length === 0 ? (
                  <div className="flex items-center justify-center h-48 text-xs text-[rgba(255,255,255,0.2)]">No data found</div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b border-[rgba(255,255,255,0.06)]">
                          {Object.keys(filtered[0]).filter((k) => !['id', 'updatedAt'].includes(k)).map((key) => (
                            <th key={key} className="text-left px-4 py-3 text-[rgba(255,255,255,0.3)] font-medium capitalize whitespace-nowrap">
                              {key.replace(/_/g, ' ')}
                            </th>
                          ))}
                          <th className="text-left px-4 py-3 text-[rgba(255,255,255,0.3)] font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filtered.map((item) => (
                          <tr key={item.id} className="border-b border-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.02)] transition-colors">
                            {Object.keys(filtered[0]).filter((k) => !['id', 'updatedAt'].includes(k)).map((key) => (
                              <td key={key} className="px-4 py-3 text-white whitespace-nowrap max-w-[200px] truncate">
                                {key === 'status' ? (
                                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                                    (item[key] === 'pending' || item[key] === 'new') ? 'bg-[rgba(245,158,11,0.1)] text-[#f59e0b] border border-[rgba(245,158,11,0.2)]' :
                                    (item[key] === 'approved' || item[key] === 'completed' || item[key] === 'converted') ? 'bg-[rgba(34,197,94,0.1)] text-[#22c55e] border border-[rgba(34,197,94,0.2)]' :
                                    (item[key] === 'cancelled' || item[key] === 'lost') ? 'bg-[rgba(239,68,68,0.1)] text-[#ef4444] border border-[rgba(239,68,68,0.2)]' :
                                    'bg-[rgba(255,255,255,0.05)] text-[rgba(255,255,255,0.5)] border border-[rgba(255,255,255,0.1)]'
                                  }`}>
                                    {item[key]}
                                  </span>
                                ) : key === 'createdAt' ? (
                                  new Date(item[key]).toLocaleDateString()
                                ) : (
                                  item[key] || '—'
                                )}
                              </td>
                            ))}
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                {STATUS_OPTIONS[tab] && (
                                  <select
                                    value={item.status || ''}
                                    onChange={(e) => updateStatus(tab, item.id, e.target.value)}
                                    className="px-2 py-1 rounded-lg glass border border-[rgba(255,255,255,0.08)] text-[10px] text-white bg-transparent outline-none cursor-pointer"
                                  >
                                    {STATUS_OPTIONS[tab].map((s) => (
                                      <option key={s} value={s} className="bg-[#1a1a1a] capitalize">{s}</option>
                                    ))}
                                  </select>
                                )}
                                <button onClick={() => deleteItem(tab, item.id)} className="p-1.5 rounded-lg hover:bg-[rgba(239,68,68,0.1)] text-[rgba(255,255,255,0.3)] hover:text-[#ef4444] transition-all cursor-pointer">
                                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                  </svg>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  )
}
