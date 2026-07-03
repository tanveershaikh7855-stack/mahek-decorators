'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CONFIG from '@/lib/config'

export default function CallButton() {
  const [visible, setVisible] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const s = window.scrollY > 400
      setVisible(s)
      setScrolled(s)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const tel = `tel:${CONFIG.phone.primary.replace(/[^0-9]/g, '')}`

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={tel}
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 left-6 z-40 w-14 h-14 rounded-full bg-[#d4af37] shadow-[0_8px_32px_rgba(212,175,55,0.3)] flex items-center justify-center no-underline hover:scale-105 active:scale-95 transition-all duration-300 hover:shadow-[0_8px_40px_rgba(212,175,55,0.4)]"
          aria-label="Call us"
        >
          <svg className="w-6 h-6 text-[#0b0b0b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#0b0b0b] text-[8px] text-[#d4af37] font-bold flex items-center justify-center shadow-lg">
            <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
          </span>
          <span className="sr-only">Call {CONFIG.phone.display}</span>
        </motion.a>
      )}
    </AnimatePresence>
  )
}
