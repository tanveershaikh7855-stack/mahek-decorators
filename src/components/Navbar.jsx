'use client'

import { useState, useEffect } from 'react'

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'Decorations', href: '#decorations' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Packages', href: '#packages' },
  { label: 'Contact', href: '#contact' },
  { label: 'FAQ', href: '#faq' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNav = (e, href) => {
    e.preventDefault()
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[rgba(11,11,11,0.85)] backdrop-blur-[25px] border-b border-[rgba(255,255,255,0.06)]'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-[1280px] mx-auto px-6 h-[72px] flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" onClick={(e) => handleNav(e, '#hero')} className="flex items-center gap-3 no-underline group">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#d4af37] to-[#b8962e] flex items-center justify-center text-[#0b0b0b] font-bold text-lg font-display shadow-lg gold-glow transition-transform duration-300 group-hover:scale-105">
            M
          </div>
          <div className="leading-tight">
            <div className="text-[17px] font-bold tracking-tight text-white font-display -mb-[2px]">MAHEK</div>
            <div className="text-[10px] tracking-[0.25em] uppercase text-[#d4af37] font-medium">Decorator</div>
          </div>
        </a>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex items-center gap-8 list-none">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                onClick={(e) => handleNav(e, link.href)}
                className="text-sm text-[rgba(255,255,255,0.7)] no-underline transition-all duration-300 hover:text-white relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1.5px] after:bg-[#d4af37] after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Book Now */}
        <a
          href="https://wa.me/919876543210?text=Hi%20Mahek%20Decorator!%20I%27d%20like%20to%20book%20a%20decoration."
          target="_blank"
          rel="noopener noreferrer"
          className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 rounded-full btn-gold text-sm no-underline"
        >
          Book Now
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
        </a>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-[5px] bg-none border-none cursor-pointer z-50"
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-[1.5px] bg-white rounded transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-[6.5px]' : ''}`} />
          <span className={`block w-6 h-[1.5px] bg-white rounded transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-[1.5px] bg-white rounded transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-[6.5px]' : ''}`} />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-[rgba(11,11,11,0.98)] backdrop-blur-[30px] z-40 flex flex-col items-center justify-center gap-8 transition-all duration-500 lg:hidden ${
          mobileOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            onClick={(e) => handleNav(e, link.href)}
            className="text-2xl text-white no-underline font-display font-medium transition-all duration-300 hover:text-[#d4af37]"
          >
            {link.label}
          </a>
        ))}
        <a
          href="https://wa.me/919876543210?text=Hi%20Mahek%20Decorator!%20I%27d%20like%20to%20book%20a%20decoration."
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-3 rounded-full btn-gold text-base no-underline mt-4"
        >
          Book Now
        </a>
      </div>
    </header>
  )
}
