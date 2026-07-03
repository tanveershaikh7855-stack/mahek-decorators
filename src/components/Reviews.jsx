'use client'

const reviews = [
  {
    name: 'Priya Sharma',
    role: 'Birthday Decoration, Pune',
    text: 'Absolutely stunning decoration! They transformed our living room into a magical wonderland for my daughter\'s birthday. Every detail was perfect.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
  },
  {
    name: 'Rahul Mehta',
    role: 'Proposal Setup, Hinjewadi',
    text: 'The proposal setup was absolutely breathtaking. She said yes! The team went above and beyond to create the perfect romantic atmosphere.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
  },
  {
    name: 'Ananya Patel',
    role: 'Wedding Decoration, Lonavala',
    text: 'We hired them for our wedding decoration and they exceeded every expectation. The mandap was a dream come true. Truly premium service.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
  },
  {
    name: 'Vikram Joshi',
    role: 'Corporate Event, Baner',
    text: 'Professional, creative, and incredibly responsive. Our corporate event looked world-class. Highly recommend for any business function.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
  },
]

export default function Reviews() {
  return (
    <section id="reviews" className="section-padding relative bg-[#0b0b0b]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(212,175,55,0.03),transparent_60%)]" />

      <div className="container-custom relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs text-[#d4af37] tracking-[0.15em] uppercase mb-5 font-medium border-[rgba(212,175,55,0.15)]">
            Testimonials
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-[-0.03em] text-white mb-4">
            What Our <span className="gold-gradient">Clients Say</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {reviews.map((r, i) => (
            <div key={i} className="glass-card rounded-2xl p-6">
              <div className="flex gap-1 mb-4">
                {[...Array(r.rating)].map((_, j) => (
                  <span key={j} className="text-[#d4af37] text-sm">★</span>
                ))}
              </div>
              <p className="text-sm text-[rgba(255,255,255,0.65)] leading-relaxed mb-5 font-light">&ldquo;{r.text}&rdquo;</p>
              <div className="flex items-center gap-3">
                <img src={r.avatar} alt={r.name} loading="lazy" className="w-9 h-9 rounded-full object-cover" />
                <div>
                  <div className="text-sm text-white font-medium">{r.name}</div>
                  <div className="text-[11px] text-[rgba(255,255,255,0.35)]">{r.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
