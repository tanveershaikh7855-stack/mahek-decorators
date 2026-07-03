export const metadata = {
  title: 'Admin — Mahek Decorator',
  robots: 'noindex, nofollow',
}

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#0b0b0b]">
      {children}
    </div>
  )
}
