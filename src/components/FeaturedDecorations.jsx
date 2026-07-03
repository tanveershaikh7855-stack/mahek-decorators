'use client'

import { motion } from 'framer-motion'
import CONFIG, { whatsappUrl } from '@/lib/config'

const decorations = [
  {
    title: 'Luxury Black & Gold Setup',
    price: '₹5,000 – ₹50,000',
    tag: 'Premium',
    img: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&q=80',
    category: 'Luxury',
    features: ['Balloon Arch', 'Gold Accents', 'LED Lighting', 'Custom Theme'],
  },
  {
    title: 'Outdoor Balloon Entrance',
    price: '₹50,000 – ₹80,000',
    tag: 'Grand',
    img: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80',
    category: 'Outdoor',
    features: ['Monumental Arch', 'Weather Resistant', 'Floral Accents', 'Lighting Setup'],
  },
  {
    title: 'Birthday Balloon Ring',
    price: '₹5,000 – ₹10,000',
    tag: 'Popular',
    img: 'https://images.unsplash.com/photo-1558036117-15d82a90b9b1?w=600&q=80',
    category: 'Birthday',
    features: ['Custom Colors', 'Number Balloons', 'Table Setup', 'Photo Backdrop'],
  },
  {
    title: 'Corporate Event Decoration',
    price: '₹45,000 – ₹50,000',
    tag: 'Corporate',
    img: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600&q=80',
    category: 'Corporate',
    features: ['Brand Colors', 'Stage Setup', 'Branding Wall', 'Professional Finish'],
  },
  {
    title: 'Baby Shower Decoration',
    price: '₹10,000 – ₹20,000',
    tag: 'Celebration',
    img: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=600&q=80',
    category: 'Baby Shower',
    features: ['Pastel Theme', 'Cake Table', 'Balloon Arch', 'Welcome Sign'],
  },
  {
    title: 'Romantic Room Decoration',
    price: '₹10,000 – ₹11,000',
    tag: 'Romantic',
    img: 'https://images.unsplash.com/photo-1510076857177-7470076d4098?w=600&q=80',
    category: 'Romantic',
    features: ['Rose Petals', 'Candle Setup', 'Balloon Heart', 'Fairy Lights'],
  },
]

export default function FeaturedDecorations() {
  return (
    <section id="decorations" className="section-padding relative bg-[#0b0b0b]">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.03),transparent_60%)]" />

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs text-[#d4af37] tracking-[0.15em] uppercase mb-5 font-medium border-[rgba(212,175,55,0.15)]">
            Our Portfolio
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-[-0.03em] text-white mb-4">
            Featured <span className="gold-gradient">Decorations</span>
          </h2>
          <p className="text-[rgba(255,255,255,0.5)] text-base max-w-[500px] mx-auto font-light">
            Each design is crafted to perfection. Price can be customized according to your requirements.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {decorations.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="glass-card rounded-2xl overflow-hidden group cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-[220px] overflow-hidden">
                <img
                  src={item.img}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(11,11,11,0.8)] via-transparent to-transparent" />

                {/* Tag */}
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full glass text-[10px] text-[#d4af37] tracking-[0.1em] uppercase font-medium border-[rgba(212,175,55,0.2)]">
                  {item.tag}
                </div>

                {/* Price */}
                <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-[rgba(212,175,55,0.15)] backdrop-blur-[10px] text-[#d4af37] text-xs font-semibold border border-[rgba(212,175,55,0.2)]">
                  {item.price}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-display text-lg font-semibold text-white mb-3">{item.title}</h3>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {item.features.map((f) => (
                    <span
                      key={f}
                      className="px-2.5 py-1 rounded-full bg-[rgba(255,255,255,0.04)] text-[11px] text-[rgba(255,255,255,0.5)] border border-[rgba(255,255,255,0.06)]"
                    >
                      {f}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <a
                    href={whatsappUrl(`Hi! I'm interested in ${item.title} (${item.price}).`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-4 py-2.5 rounded-full btn-gold text-xs text-center no-underline inline-flex items-center justify-center gap-1.5"
                  >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    Book Now
                  </a>
                  <a
                    href={whatsappUrl(`Hi! Can we negotiate the price for ${item.title}?`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-full btn-outline text-xs no-underline inline-flex items-center gap-1.5"
                  >
                    Negotiate
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Note */}
        <p className="text-center text-sm text-[rgba(255,255,255,0.3)] mt-10 font-light">
          * Price can be customized according to your requirements. Contact us for a personalized quote.
        </p>
      </div>
    </section>
  )
}
