'use client'

import { motion } from 'framer-motion'
import ContactCard from './ContactCard'
import ContactForm from './ContactForm'
import CONFIG, { whatsappUrl, telUrl, mailUrl } from '@/lib/config'

export default function Contact() {
  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-50px' },
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
  })

  const cards = [
    {
      icon: 'phone',
      title: 'Call Us',
      lines: [CONFIG.phone.display, CONFIG.phone.display],
      href: telUrl(CONFIG.phone.primary),
      label: CONFIG.phone.display,
    },
    {
      icon: 'whatsapp',
      title: 'WhatsApp',
      lines: [CONFIG.whatsapp.display],
      href: whatsappUrl(CONFIG.whatsappMessages.general),
      label: 'Chat on WhatsApp',
    },
    {
      icon: 'email',
      title: 'Email',
      lines: [CONFIG.email.business, CONFIG.email.support],
      href: mailUrl(CONFIG.email.business, 'Decoration Inquiry', 'Hi Mahek Decorator!'),
      label: 'Send Email',
    },
    {
      icon: 'location',
      title: 'Our Office',
      lines: ['Opp. Saras Baug Road', 'Municipal Colony, Pune'],
      href: CONFIG.googleMaps.url,
      label: 'View on Map',
    },
    {
      icon: 'clock',
      title: 'Working Hours',
      lines: [CONFIG.workingHours.display, CONFIG.workingHours.note],
    },
  ]

  return (
    <section id="contact" className="relative py-28 sm:py-36 overflow-hidden bg-[#0b0b0b]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_40%,rgba(139,92,246,0.04),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_60%,rgba(212,175,55,0.03),transparent_50%)]" />

      <div className="relative z-10 max-w-[1280px] mx-auto px-6">
        {/* Section Header */}
        <motion.div {...fadeUp(0)} className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs text-[#d4af37] tracking-[0.15em] uppercase mb-6 font-medium border-[rgba(212,175,55,0.15)]">
            Get in Touch
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-white mb-5 tracking-[-0.02em]">
            Let&apos;s Plan Your{' '}
            <span className="gold-gradient">Perfect Event</span>
          </h2>
          <p className="text-[rgba(255,255,255,0.5)] text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Ready to transform your event? Reach out and our team will craft a stunning balloon decoration experience tailored just for you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          {/* LEFT CARDS */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {cards.slice(0, 2).map((card, i) => (
                <ContactCard key={card.title} {...card} delay={i * 0.1} />
              ))}
            </div>
            <ContactCard {...cards[2]} delay={0.2} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {cards.slice(3).map((card, i) => (
                <ContactCard key={card.title} {...card} delay={0.3 + i * 0.1} />
              ))}
            </div>

            {/* Service Area */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="p-5 rounded-2xl glass border border-[rgba(212,175,55,0.1)]"
            >
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-4 h-4 text-[#d4af37]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                <span className="text-xs font-medium tracking-[0.1em] uppercase text-[rgba(255,255,255,0.3)]">Service Area</span>
              </div>
              <p className="text-sm text-[rgba(255,255,255,0.6)] leading-relaxed">{CONFIG.serviceArea.description}</p>
            </motion.div>
          </div>

          {/* RIGHT FORM */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-3xl glass border border-[rgba(255,255,255,0.06)] p-6 sm:p-8"
          >
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-[rgba(255,255,255,0.06)]">
              <div className="w-10 h-10 rounded-xl bg-[rgba(212,175,55,0.1)] flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-[#d4af37]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-display font-semibold text-lg">Quick Inquiry</h3>
                <p className="text-[rgba(255,255,255,0.35)] text-xs">Fill in the details and we&apos;ll get back to you</p>
              </div>
            </div>
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
