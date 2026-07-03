'use client'

import { motion } from 'framer-motion'
import CONFIG from '@/lib/config'

export default function GoogleMaps() {
  return (
    <section className="relative py-20 sm:py-28 bg-[#0b0b0b]">
      <div className="max-w-[1280px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 text-center"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs text-[#d4af37] tracking-[0.15em] uppercase mb-5 font-medium border-[rgba(212,175,55,0.15)]">
            Find Us
          </span>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold text-white tracking-[-0.02em]">
            Visit Our{' '}
            <span className="gold-gradient">Studio</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-3xl overflow-hidden glass border border-[rgba(255,255,255,0.06)]"
        >
          <div className="aspect-[21/9] min-h-[300px] w-full relative">
            <iframe
              src={CONFIG.googleMaps.embed}
              width="100%"
              height="100%"
              style={{ border: 0, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mahek Decorator Location"
            />
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4 p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-[#d4af37] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <div>
                <p className="text-sm text-white font-medium">{CONFIG.address.full}</p>
                <p className="text-xs text-[rgba(255,255,255,0.4)] mt-0.5">Serving {CONFIG.serviceArea.radius} from {CONFIG.serviceArea.city}</p>
              </div>
            </div>
            <a
              href={CONFIG.googleMaps.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full btn-gold text-xs no-underline flex items-center gap-2 flex-shrink-0"
            >
              Open in Google Maps
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
