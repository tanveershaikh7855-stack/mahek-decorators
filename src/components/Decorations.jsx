'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import CONFIG, { whatsappUrl } from '@/lib/config'

const products = [
  {
    title: 'Luxury Black & Gold Balloon Setup',
    price: '₹5,000 – ₹50,000',
    tag: 'Premium',
    img: '/images/product-1.jpg',
    tags: ['Balloon Arch', 'Luxury Setup', 'Event Backdrop'],
    desc: 'Premium luxury balloon setup for birthdays, anniversaries, and events.',
  },
  {
    title: 'Outdoor Balloon Entrance Decoration',
    price: '₹50,000 – ₹80,000',
    tag: 'Grand',
    img: '/images/product-2.jpg',
    tags: ['Entrance Decoration', 'Outdoor Event', 'Premium Walkway'],
    desc: 'Luxury entrance balloon decoration for weddings and grand events.',
  },
  {
    title: 'Birthday Balloon Ring Decoration',
    price: '₹5,000 – ₹10,000',
    tag: 'Popular',
    img: '/images/product-3.jpg',
    tags: ['Birthday', 'Balloon Ring', 'Celebration'],
    desc: 'Elegant circular balloon setup for birthdays and celebrations.',
  },
  {
    title: 'Corporate Event Decoration',
    price: '₹45,000 – ₹50,000',
    tag: 'Corporate',
    img: '/images/product-4.jpg',
    tags: ['Corporate', 'Annual Event', 'Premium Stage'],
    desc: 'Professional corporate balloon event setup with brand integration.',
  },
  {
    title: 'Baby Shower Decoration',
    price: '₹10,000 – ₹20,000',
    tag: 'Celebration',
    img: '/images/product-5.jpg',
    tags: ['Baby Shower', 'Welcome Baby', 'Family Event'],
    desc: 'Premium baby shower decoration setup with pastel themes.',
  },
  {
    title: 'Romantic Room Decoration',
    price: '₹10,000 – ₹11,000',
    tag: 'Romantic',
    img: '/images/product-6.jpg',
    tags: ['Couple', 'Romantic', 'Room Decoration'],
    desc: 'Luxury romantic surprise room decoration with candle-lit ambiance.',
  },
]

function ProductCard({ item, index }) {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group rounded-3xl overflow-hidden bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] hover:border-[rgba(212,175,55,0.2)] transition-all duration-500"
    >
      {/* Image with glass overlay */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[#151515]">
        <img src={item.img} alt={item.title} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
        {/* Glass overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(11,11,11,0.6)] via-transparent to-[rgba(11,11,11,0.2)] group-hover:from-[rgba(11,11,11,0.4)] transition-all duration-500" />
        <div className="absolute inset-0 bg-[rgba(255,255,255,0.02)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Tag */}
        <div className="absolute top-4 left-4 px-3 py-1 rounded-full glass text-[10px] text-[#d4af37] tracking-[0.1em] uppercase font-medium border-[rgba(212,175,55,0.2)] z-[2]">
          {item.tag}
        </div>
        <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-[rgba(212,175,55,0.12)] backdrop-blur-[12px] text-[#d4af37] text-xs font-semibold border border-[rgba(212,175,55,0.15)] z-[2]">
          {item.price}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 sm:p-7">
        <h3 className="font-display text-lg sm:text-xl font-semibold text-white mb-2 leading-snug">
          {item.title}
        </h3>
        <p className="text-sm text-[rgba(255,255,255,0.45)] mb-4 leading-relaxed">{item.desc}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          {item.tags.map((t) => (
            <span key={t} className="px-3 py-1 rounded-full bg-[rgba(255,255,255,0.04)] text-[11px] text-[rgba(255,255,255,0.5)] border border-[rgba(255,255,255,0.06)]">
              {t}
            </span>
          ))}
        </div>

        {/* Negotiable */}
        <div className="flex items-center gap-2 mb-5 py-2.5 px-3.5 rounded-xl bg-[rgba(212,175,55,0.06)] border border-[rgba(212,175,55,0.1)]">
          <svg className="w-3.5 h-3.5 text-[#d4af37] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <span className="text-xs text-[#d4af37] font-medium">Price Negotiable</span>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <a
            href={whatsappUrl(`Hello Mahek Decorator, I am interested in:\n\nDecoration: ${item.title}\nBudget: ${item.price}\n\nCan we discuss the details?`)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 px-5 py-2.5 rounded-full btn-gold text-xs text-center no-underline inline-flex items-center justify-center gap-1.5 group/btn"
          >
            <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:scale-110" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Book Now
          </a>
          <a
            href={whatsappUrl(`Hello Mahek Decorator, I want to negotiate the price for ${item.title} (${item.price}).`)}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-full btn-outline text-xs no-underline inline-flex items-center gap-1.5 group/neg"
          >
            <svg className="w-3.5 h-3.5 transition-all duration-300 group-hover/neg:rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Bargain On WhatsApp
          </a>
        </div>
      </div>
    </motion.div>
  )
}

export default function Decorations() {
  return (
    <section id="decorations" className="relative py-28 sm:py-36 bg-[#0b0b0b] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.03),transparent_60%)]" />

      <div className="relative z-10 max-w-[1280px] mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs text-[#d4af37] tracking-[0.15em] uppercase mb-5 font-medium border-[rgba(212,175,55,0.15)]">
            Our Portfolio
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-[-0.03em] text-white mb-4">
            Our <span className="gold-gradient">Decorations</span>
          </h2>
          <p className="text-[rgba(255,255,255,0.5)] text-base max-w-[500px] mx-auto">
            Premium balloon artistry for every occasion. Each design crafted to perfection.
          </p>
        </motion.div>

        {/* 2-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {products.map((item, i) => (
            <ProductCard key={item.title} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
