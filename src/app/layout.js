import './globals.css'

export const metadata = {
  title: 'MAHEK DECORATOR — Premium Balloon Decorations, Pune',
  description: 'Premium balloon decoration services across Pune and 160+ KM surrounding areas. Transform every celebration into a memory with MAHEK DECORATOR.',
  keywords: 'balloon decoration, balloon decorators, pune decoration, party decoration, wedding decoration, event decoration, luxury balloons',
  openGraph: {
    title: 'MAHEK DECORATOR — Premium Balloon Decorations',
    description: 'Premium balloon decoration services across Pune and 160+ KM surrounding areas.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'MAHEK DECORATOR',
  },
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
