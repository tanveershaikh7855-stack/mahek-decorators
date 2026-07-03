'use client'

const gallery = [
  { src: 'https://images.unsplash.com/photo-1558036117-15d82a90b9b1?w=800&q=80', label: 'Wedding Reception', span: 'lg:col-span-2' },
  { src: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&q=80', label: 'Birthday Celebration', span: '' },
  { src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=80', label: 'Proposal Setup', span: '' },
  { src: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=600&q=80', label: 'Engagement Decor', span: '' },
  { src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80', label: 'Anniversary Setup', span: '' },
  { src: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80', label: 'Grand Wedding', span: 'lg:col-span-2' },
]

export default function Gallery() {
  return (
    <section id="gallery" className="section-padding relative bg-[#0b0b0b]">
      <div className="container-custom">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs text-[#d4af37] tracking-[0.15em] uppercase mb-5 font-medium border-[rgba(212,175,55,0.15)]">
            Gallery
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-[-0.03em] text-white mb-4">
            Our <span className="gold-gradient">Masterpieces</span>
          </h2>
          <p className="text-[rgba(255,255,255,0.5)] text-base max-w-[500px] mx-auto font-light">
            Every decoration tells a story. Browse through our recent creations.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {gallery.map((item, i) => (
            <div
              key={i}
              className={`group relative rounded-2xl overflow-hidden cursor-pointer aspect-[4/3] ${item.span}`}
            >
              <img
                src={item.src}
                alt={item.label}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(11,11,11,0.7)] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-5">
                <span className="text-white text-sm font-medium">{item.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
