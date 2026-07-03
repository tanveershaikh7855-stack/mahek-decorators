'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import CONFIG, { whatsappUrl } from '@/lib/config'

const products = [
  {
    title: 'Luxury Black & Gold Balloon Setup',
    price: '₹5,000 – ₹50,000',
    tag: 'Premium',
    description: 'Premium luxury balloon setup for birthdays, anniversaries, and events.',
    tags: ['Balloon Arch', 'Luxury Setup', 'Event Backdrop'],
  },
  {
    title: 'Outdoor Balloon Entrance Decoration',
    price: '₹50,000 – ₹80,000',
    tag: 'Grand',
    description: 'Luxury entrance balloon decoration for weddings and grand events.',
    tags: ['Entrance Decoration', 'Outdoor Event', 'Premium Walkway'],
  },
  {
    title: 'Birthday Balloon Ring Decoration',
    price: '₹5,000 – ₹10,000',
    tag: 'Popular',
    description: 'Elegant circular balloon setup for birthdays and celebrations.',
    tags: ['Birthday', 'Balloon Ring', 'Celebration'],
  },
  {
    title: 'Corporate Event Decoration',
    price: '₹45,000 – ₹50,000',
    tag: 'Corporate',
    description: 'Professional corporate balloon event setup.',
    tags: ['Corporate', 'Annual Event', 'Premium Stage'],
  },
  {
    title: 'Baby Shower Decoration',
    price: '₹10,000 – ₹20,000',
    tag: 'Celebration',
    description: 'Premium baby shower decoration setup.',
    tags: ['Baby Shower', 'Welcome Baby', 'Family Event'],
  },
  {
    title: 'Romantic Room Decoration',
    price: '₹10,000 – ₹11,000',
    tag: 'Romantic',
    description: 'Luxury romantic surprise room decoration.',
    tags: ['Couple', 'Romantic', 'Room Decoration'],
  },
]

function ProductCard({ item, index }) {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, margin: '-60px' })

  const bookMsg = `Hello Mahek Decorator,%0A%0AI am interested in: ${item.title} (${item.price}).%0A%0APlease share the details.`
  const bargainMsg = `Hello Mahek Decorator,%0A%0AI want to negotiate the price for ${item.title} (${item.price}).%0A%0AMy Budget: %0AEvent Date: %0ALocation: %0A%0ACan we negotiate the pricing?`

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group rounded-3xl overflow-hidden glass border border-[rgba(255,255,255,0.06)] hover:border-[rgba(212,175,55,0.2)] transition-all duration-500 hover:shadow-[0_30px_60px_rgba(0,0,0,0.3),0_0_40px_rgba(212,175,55,0.05)]"
    >
      {/* Image placeholder */}
      <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-[rgba(255,255,255,0.03)] to-[rgba(139,92,246,0.03)]">
        <div className="absolute inset-0 flex items-center justify-center text-[rgba(255,255,255,0.08)]">
          <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(11,11,11,0.7)] via-transparent to-transparent" />
        <div className="absolute top-4 left-4 px-3 py-1 rounded-full glass text-[10px] text-[#d4af37] tracking-[0.1em] uppercase font-medium border-[rgba(212,175,55,0.2)] backdrop-blur-[20px]">
          {item.tag}
        </div>
        <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full glass text-[#d4af37] text-xs font-semibold border border-[rgba(212,175,55,0.15)] backdrop-blur-[20px]">
          {item.price}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 sm:p-7">
        <h3 className="font-display text-lg sm:text-xl font-semibold text-white mb-2 leading-snug">
          {item.title}
        </h3>

        <p className="text-sm text-[rgba(255,255,255,0.45)] mb-4 leading-relaxed">
          {item.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {item.tags.map((t) => (
            <span
              key={t}
              className="px-3 py-1 rounded-full glass text-[11px] text-[rgba(255,255,255,0.5)] border border-[rgba(255,255,255,0.06)]"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Price negotiable */}
        <div className="flex items-center gap-2 mb-5">
          <span className="text-[11px] text-[rgba(212,175,55,0.6)] tracking-wide">Price Negotiable</span>
          <span className="h-px flex-1 bg-[rgba(212,175,55,0.1)]" />
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <a
            href={whatsappUrl(bookMsg)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 px-5 py-2.5 rounded-full btn-gold text-xs text-center no-underline inline-flex items-center justify-center gap-1.5 hover:shadow-[0_8px_24px_rgba(212,175,55,0.25)]"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Book Now
          </a>
          <a
            href={whatsappUrl(bargainMsg)}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-full btn-outline text-xs no-underline inline-flex items-center gap-1.5 hover:border-[#d4af37] hover:text-[#d4af37] hover:shadow-[0_0_20px_rgba(212,175,55,0.15)]"
          >
            Bargain on WhatsApp
          </a>
        </div>
      </div>
    </motion.div>
  )
}

export default function Decorations() {
  return (
    <section id="decorations" className="relative py-28 sm:py-36 bg-[#0b0b0b]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.03),transparent_60%)]" />

      <div className="relative z-10 max-w-[1280px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs text-[#d4af37] tracking-[0.15em] uppercase mb-5 font-medium">
            Our Portfolio
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-[-0.03em] text-white mb-4">
            Our <span className="gold-gradient">Decorations</span>
          </h2>
          <p className="text-[rgba(255,255,255,0.5)] text-base max-w-[500px] mx-auto">
            Premium balloon artistry for every occasion. Each design crafted to perfection.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {products.map((item, i) => (
            <ProductCard key={item.title} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
