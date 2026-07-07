'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { whatsappUrl } from '@/lib/config'

const negotiateMessage = `Hello Mahek Decorator,

I am interested in:

Package:
Budget:
Location:
Date:

Can we negotiate the pricing?`

const packages = [
  {
    category: 'Luxury Birthday Backdrop',
    image: '/images/product-1.jpg',
    title: 'Luxury Black & Gold Birthday Setup',
    description:
      'Premium black and gold balloon backdrop with metallic chrome accents, luxury stage styling, and event photography setup.',
    price: '₹5,000 – ₹50,000',
    features: ['Premium balloons', 'Metallic decor', 'Stage setup', 'LED lighting', 'Custom backdrop'],
    addOns: ['Name lettering', 'Cake plinths', 'Number lights', 'Chrome balloon upgrade'],
    duration: '3-5 hours event display',
    setupTime: '2-4 hours before event',
    height: 'lg:min-h-[690px]',
  },
  {
    category: 'Outdoor Entrance Decoration',
    image: '/images/product-2.jpg',
    title: 'Grand Entrance Balloon Experience',
    description: 'Luxury outdoor entrance decoration designed for weddings, receptions, and premium events.',
    price: '₹50,000 – ₹80,000',
    features: ['Entrance tunnel', 'Balloon pathway', 'Hanging balloons', 'Outdoor setup', 'Event styling'],
    addOns: ['Floral runners', 'Welcome signage', 'Pathway lights', 'Guest photo zone'],
    duration: 'Full event coverage',
    setupTime: '5-7 hours before event',
    height: 'lg:min-h-[610px]',
  },
  {
    category: 'Birthday Circle Arch',
    image: '/images/product-3.jpg',
    title: 'Elegant Birthday Balloon Ring',
    description: 'Minimal luxury birthday decoration featuring neutral tones and premium styling.',
    price: '₹5,000 – ₹10,000',
    features: ['Circular arch', 'Premium balloons', 'Neon signage', 'Photography corner'],
    addOns: ['Theme props', 'Acrylic board', 'Cake table styling', 'Floor balloons'],
    duration: '3-4 hours event display',
    setupTime: '90-150 minutes before event',
    height: 'lg:min-h-[560px]',
  },
  {
    category: 'Corporate Event Decoration',
    image: '/images/product-4.jpg',
    title: 'Corporate Celebration Experience',
    description: 'Premium corporate event backdrop and balloon styling for conferences and celebrations.',
    price: '₹45,000 – ₹50,000',
    features: ['Corporate branding', 'Stage setup', 'Balloon walls', 'Event styling'],
    addOns: ['Logo placement', 'Welcome gate', 'Podium styling', 'Media backdrop'],
    duration: 'Half-day to full-day event',
    setupTime: '4-6 hours before event',
    height: 'lg:min-h-[650px]',
  },
  {
    category: 'Baby Welcome Decoration',
    image: '/images/product-5.jpg',
    title: 'Luxury Welcome Baby Setup',
    description: 'Elegant baby welcome celebration setup with pastel luxury balloon styling.',
    price: '₹10,000 – ₹20,000',
    features: ['Balloon arch', 'Custom name board', 'Baby theme styling', 'Photography setup'],
    addOns: ['Cradle styling', 'Soft toy props', 'Pastel florals', 'Family photo corner'],
    duration: '3-5 hours event display',
    setupTime: '2-3 hours before event',
    height: 'lg:min-h-[600px]',
  },
  {
    category: 'Romantic Room Decoration',
    image: '/images/product-6.jpg',
    title: 'Romantic Surprise Experience',
    description: 'Premium romantic room decoration with balloons, flowers, candles, and lighting.',
    price: '₹10,000 – ₹11,000',
    features: ['Ceiling balloons', 'Rose petals', 'LED candles', 'Romantic setup'],
    addOns: ['Photo memories', 'Fairy lights', 'Flower bouquet', 'Private dinner styling'],
    duration: 'Same evening experience',
    setupTime: '90-120 minutes before arrival',
    height: 'lg:min-h-[540px]',
  },
]

function packageMessage(item, intent = 'book') {
  const action = intent === 'negotiate' ? 'Can we negotiate the pricing?' : 'Please share booking details.'

  return `Hello Mahek Decorator,

I am interested in:

Package: ${item.title}
Budget: ${item.price}
Location:
Date:

${action}`
}

function MagneticLink({ href, children, className, ariaLabel }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 260, damping: 18 })
  const springY = useSpring(y, { stiffness: 260, damping: 18 })

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      style={{ x: springX, y: springY }}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect()
        x.set((event.clientX - rect.left - rect.width / 2) * 0.16)
        y.set((event.clientY - rect.top - rect.height / 2) * 0.2)
      }}
      onMouseLeave={() => {
        x.set(0)
        y.set(0)
      }}
      className={className}
    >
      {children}
    </motion.a>
  )
}

function PackageCard({ item, index, onOpen }) {
  const pointerX = useMotionValue(0.5)
  const pointerY = useMotionValue(0.5)
  const rotateX = useTransform(pointerY, [0, 1], [2.5, -2.5])
  const rotateY = useTransform(pointerX, [0, 1], [-2.5, 2.5])

  return (
    <motion.article
      layout
      data-package-card
      initial={{ opacity: 0, y: 42, scale: 0.97, filter: 'blur(18px)' }}
      className={`group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.045] shadow-[0_24px_90px_rgba(0,0,0,0.34)] backdrop-blur-2xl transition-[border-color,box-shadow,background] duration-500 hover:border-[#d4af37]/45 hover:bg-white/[0.065] hover:shadow-[0_34px_110px_rgba(0,0,0,0.48)] ${item.height}`}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect()
        pointerX.set((event.clientX - rect.left) / rect.width)
        pointerY.set((event.clientY - rect.top) / rect.height)
      }}
      onMouseLeave={() => {
        pointerX.set(0.5)
        pointerY.set(0.5)
      }}
    >
      <button
        type="button"
        onClick={() => onOpen(item)}
        className="block w-full text-left"
        aria-label={`View details for ${item.title}`}
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-[#15120d] sm:aspect-[16/11]">
          <Image
            src={item.image}
            alt={`${item.category} by Mahek Decorator`}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            priority={index < 2}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0b09] via-[#0d0b09]/20 to-transparent" />
          <div className="absolute left-4 top-4 rounded-full border border-[#d4af37]/20 bg-[#0d0b09]/45 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-[#e5c760] backdrop-blur-xl">
            {item.category}
          </div>
        </div>

        <div className="p-5 sm:p-6 lg:p-7">
          <div className="mb-4 flex items-start justify-between gap-4">
            <h3 className="font-display text-[1.35rem] font-medium leading-tight tracking-[-0.02em] text-white sm:text-2xl">
              {item.title}
            </h3>
            <span className="shrink-0 rounded-full border border-[#d4af37]/20 bg-[#d4af37]/10 px-3 py-1.5 text-xs font-semibold text-[#e6c75a]">
              {item.price}
            </span>
          </div>
          <p className="min-h-[72px] text-sm leading-6 text-white/58">{item.description}</p>

          <div className="mt-5 grid gap-2">
            {item.features.map((feature) => (
              <div key={feature} className="flex items-center gap-2 text-sm text-white/72">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-[#d4af37]/12 text-[11px] text-[#e7cb69]">
                  ✓
                </span>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </button>

      <div className="px-5 pb-5 sm:px-6 sm:pb-6 lg:px-7 lg:pb-7">
        <div className="flex flex-col gap-3 min-[420px]:flex-row">
          <MagneticLink
            href={whatsappUrl(encodeURIComponent(packageMessage(item)))}
            ariaLabel={`Book ${item.title} on WhatsApp`}
            className="inline-flex min-h-11 flex-1 items-center justify-center rounded-full bg-[#e0bd55] px-5 text-sm font-semibold text-[#12100b] no-underline shadow-[0_14px_36px_rgba(212,175,55,0.18)] transition duration-300 hover:bg-[#f1d474] focus:outline-none focus:ring-2 focus:ring-[#e0bd55] focus:ring-offset-2 focus:ring-offset-[#0d0b09]"
          >
            Book Now
          </MagneticLink>
          <MagneticLink
            href={whatsappUrl(encodeURIComponent(packageMessage(item, 'negotiate')))}
            ariaLabel={`Negotiate price for ${item.title} on WhatsApp`}
            className="inline-flex min-h-11 flex-1 items-center justify-center rounded-full border border-white/14 bg-white/[0.03] px-5 text-sm font-semibold text-white no-underline transition duration-300 hover:border-[#d4af37]/45 hover:text-[#efd470] focus:outline-none focus:ring-2 focus:ring-[#e0bd55] focus:ring-offset-2 focus:ring-offset-[#0d0b09]"
          >
            Negotiate Price
          </MagneticLink>
        </div>
      </div>
    </motion.article>
  )
}

function PackageModal({ item, onClose }) {
  useEffect(() => {
    if (!item) return

    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [item, onClose])

  if (!item) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[80] grid place-items-center bg-[#070604]/80 p-4 backdrop-blur-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="package-modal-title"
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) onClose()
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 18, scale: 0.98 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-[30px] border border-white/12 bg-[#11100d]/95 shadow-[0_40px_140px_rgba(0,0,0,0.65)]"
          data-lenis-prevent
        >
          <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
            <div className="relative min-h-[340px] overflow-hidden rounded-t-[30px] bg-[#18140d] lg:rounded-l-[30px] lg:rounded-tr-none">
              <Image src={item.image} alt={item.title} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#11100d] via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 grid grid-cols-3 gap-2">
                {[item.image, item.image, item.image].map((image, index) => (
                  <div key={`${image}-${index}`} className="relative aspect-[5/3] overflow-hidden rounded-2xl border border-white/15 bg-white/10">
                    <Image src={image} alt="" fill sizes="160px" className="object-cover" />
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-[#d4af37]">{item.category}</p>
                  <h3 id="package-modal-title" className="font-display text-3xl font-medium leading-tight tracking-[-0.03em] text-white sm:text-4xl">
                    {item.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close package details"
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/12 bg-white/[0.04] text-xl leading-none text-white/80 transition hover:border-[#d4af37]/40 hover:text-[#f0d672] focus:outline-none focus:ring-2 focus:ring-[#e0bd55]"
                >
                  ×
                </button>
              </div>

              <p className="text-sm leading-7 text-white/62">{item.description}</p>

              <div className="my-6 rounded-3xl border border-[#d4af37]/18 bg-[#d4af37]/10 p-5">
                <span className="text-xs uppercase tracking-[0.18em] text-[#d4af37]">Price range</span>
                <p className="mt-2 font-display text-3xl font-medium text-white">{item.price}</p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <h4 className="mb-3 text-sm font-semibold text-white">Inclusions</h4>
                  <div className="space-y-2">
                    {item.features.map((feature) => (
                      <p key={feature} className="text-sm text-white/62">✓ {feature}</p>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="mb-3 text-sm font-semibold text-white">Add-ons</h4>
                  <div className="space-y-2">
                    {item.addOns.map((addOn) => (
                      <p key={addOn} className="text-sm text-white/62">✓ {addOn}</p>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 grid gap-3 rounded-3xl border border-white/10 bg-white/[0.035] p-5 text-sm text-white/64 sm:grid-cols-2">
                <p><span className="block text-white">Event duration</span>{item.duration}</p>
                <p><span className="block text-white">Setup time</span>{item.setupTime}</p>
              </div>

              <div className="mt-6 flex flex-col gap-3 min-[420px]:flex-row">
                <MagneticLink
                  href={whatsappUrl(encodeURIComponent(packageMessage(item)))}
                  ariaLabel={`Book ${item.title} on WhatsApp`}
                  className="inline-flex min-h-12 flex-1 items-center justify-center rounded-full bg-[#e0bd55] px-6 text-sm font-semibold text-[#12100b] no-underline transition hover:bg-[#f1d474] focus:outline-none focus:ring-2 focus:ring-[#e0bd55]"
                >
                  Book Now
                </MagneticLink>
                <MagneticLink
                  href={whatsappUrl(encodeURIComponent(packageMessage(item, 'negotiate')))}
                  ariaLabel={`Negotiate ${item.title} on WhatsApp`}
                  className="inline-flex min-h-12 flex-1 items-center justify-center rounded-full border border-white/14 bg-white/[0.03] px-6 text-sm font-semibold text-white no-underline transition hover:border-[#d4af37]/45 hover:text-[#efd470] focus:outline-none focus:ring-2 focus:ring-[#e0bd55]"
                >
                  WhatsApp
                </MagneticLink>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default function Decorations() {
  const sectionRef = useRef(null)
  const [selectedPackage, setSelectedPackage] = useState(null)

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const context = gsap.context(() => {
      gsap.from('[data-packages-title]', {
        autoAlpha: 0,
        y: 28,
        filter: 'blur(14px)',
        duration: 1.2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: '[data-packages-title]',
          start: 'top 82%',
          once: true,
        },
      })

      gsap.to('[data-package-card]', {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
        duration: 1.2,
        ease: 'power4.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: '[data-packages-grid]',
          start: 'top 78%',
          once: true,
        },
      })

      gsap.to('[data-parallax-packages]', {
        yPercent: 11,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.6,
        },
      })
    }, sectionRef)

    return () => context.revert()
  }, [])

  return (
    <section id="decorations" ref={sectionRef} className="relative isolate overflow-hidden bg-[#0d0b09] py-20 sm:py-28 lg:py-36">
      <div data-parallax-packages className="pointer-events-none absolute inset-x-0 top-0 h-[580px] bg-[radial-gradient(circle_at_22%_12%,rgba(212,175,55,0.13),transparent_34%),radial-gradient(circle_at_86%_4%,rgba(255,255,255,0.08),transparent_28%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:80px_80px] opacity-20" />

      <div className="relative z-10 mx-auto max-w-[1440px] px-5 sm:px-8">
        <div data-packages-title className="mx-auto mb-12 max-w-4xl text-center sm:mb-16 lg:mb-20">
          <p className="mb-5 text-xs font-medium uppercase tracking-[0.28em] text-[#d4af37]">MAHEK DECORATOR</p>
          <h2 className="font-display text-[2.7rem] font-medium leading-[0.95] tracking-[-0.045em] text-white sm:text-6xl lg:text-7xl">
            Featured Celebration Experiences
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-white/56 sm:text-lg">
            Crafted celebrations for every occasion.
          </p>
        </div>

        <div data-packages-grid className="grid grid-cols-1 items-start gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {packages.map((item, index) => (
            <PackageCard key={item.title} item={item} index={index} onOpen={setSelectedPackage} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-12 max-w-2xl rounded-[28px] border border-white/10 bg-white/[0.045] p-6 text-center shadow-[0_24px_90px_rgba(0,0,0,0.32)] backdrop-blur-2xl sm:p-8"
        >
          <p className="font-display text-2xl font-medium tracking-[-0.02em] text-white">Want a customized package?</p>
          <p className="mt-2 text-sm text-white/58">Let&apos;s discuss your budget.</p>
          <MagneticLink
            href={whatsappUrl(encodeURIComponent(negotiateMessage))}
            ariaLabel="Negotiate a custom package on WhatsApp"
            className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-[#e0bd55] px-7 text-sm font-semibold text-[#12100b] no-underline shadow-[0_14px_36px_rgba(212,175,55,0.18)] transition duration-300 hover:bg-[#f1d474] focus:outline-none focus:ring-2 focus:ring-[#e0bd55] focus:ring-offset-2 focus:ring-offset-[#0d0b09]"
          >
            Negotiate On WhatsApp
          </MagneticLink>
        </motion.div>
      </div>

      <PackageModal item={selectedPackage} onClose={() => setSelectedPackage(null)} />
    </section>
  )
}
