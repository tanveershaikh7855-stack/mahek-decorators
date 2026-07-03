'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CONFIG, { whatsappUrl } from '@/lib/config'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const sectionRef = useRef(null)
  const bgTextRef = useRef(null)
  const balloonRef = useRef(null)
  const overlayRef = useRef(null)
  const ctaRef = useRef(null)
  const particlesRef = useRef([])
  const ribbonRef = useRef(null)
  const timeline = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const bgText = bgTextRef.current
    const balloon = balloonRef.current
    const overlay = overlayRef.current
    const cta = ctaRef.current
    const particles = particlesRef.current
    const ribbon = ribbonRef.current

    if (!section) return

    const ctx = gsap.context(() => {
      // Master timeline scrubbed by scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          invalidateOnRefresh: true,
        },
      })

      // 0%-20%: Dark, particles move slowly
      tl.to(overlay, { opacity: 0.3, duration: 20, ease: 'power1.out' }, 0)
      tl.fromTo(
        particles,
        { y: 0, opacity: 0 },
        { y: -30, opacity: 0.6, duration: 20, ease: 'power1.out', stagger: 0.02 },
        0
      )

      // 20%-40%: Balloon starts forming, glow increases
      tl.fromTo(
        balloon,
        { scale: 0.6, opacity: 0.2, filter: 'blur(12px)' },
        { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 20, ease: 'power2.out' },
        20
      )
      tl.to(
        balloon,
        { boxShadow: '0 0 80px rgba(212,175,55,0.3), 0 0 160px rgba(139,92,246,0.15)', duration: 20, ease: 'power1.out' },
        20
      )

      // 40%-60%: Ribbon particles rotate, BG text fades in
      tl.to(ribbon, { rotation: 180, duration: 20, ease: 'none' }, 40)
      tl.fromTo(
        bgText,
        { opacity: 0, y: 60, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 20, ease: 'power2.out' },
        40
      )

      // 60%-80%: Camera zoom effect, depth
      tl.to(section, { scale: 1.02, duration: 20, ease: 'power1.out' }, 60)
      tl.to(balloon, { scale: 1.05, duration: 20, ease: 'power1.out' }, 60)
      tl.to(bgText, { letterSpacing: '0.02em', duration: 20, ease: 'power1.out' }, 60)

      // 80%-100%: Gentle float, lock in place
      tl.to(balloon, { y: -8, duration: 10, ease: 'sine.inOut', yoyo: true, repeat: -1 }, 80)
      tl.to(particles, { opacity: 0.8, duration: 20, ease: 'power1.out' }, 80)
      tl.to(cta, { opacity: 1, y: 0, duration: 10, ease: 'back.out(1.7)' }, 85)
    }, section)

    return () => ctx.revert()
  }, [])

  // Individual particle animation with rAF for GPU perf
  useEffect(() => {
    const particles = particlesRef.current
    if (!particles.length) return

    let animFrame
    let start = Date.now()

    const tick = () => {
      const t = (Date.now() - start) / 1000
      particles.forEach((el, i) => {
        if (!el) return
        const speed = 0.2 + (i % 5) * 0.04
        const offset = i * 0.8
        const x = Math.sin(t * speed + offset) * 12
        const y = Math.sin(t * speed * 0.6 + offset + 1.5) * 8
        el.style.transform = `translate3d(${x}px, ${y}px, 0)`
      })
      animFrame = requestAnimationFrame(tick)
    }
    animFrame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(animFrame)
  }, [])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-[200vh] bg-[#0b0b0b] overflow-hidden"
    >
      {/* Sticky viewport container */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
        {/* Background gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(139,92,246,0.08),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,rgba(212,175,55,0.05),transparent_50%)]" />

        {/* Overlay for dark start */}
        <div ref={overlayRef} className="absolute inset-0 bg-black z-10 opacity-0 pointer-events-none" />

        {/* Large Background Typography */}
        <div
          ref={bgTextRef}
          className="absolute inset-0 flex flex-col items-center justify-center z-[2] opacity-0 pointer-events-none select-none"
        >
          <span className="font-display font-bold text-[clamp(4rem,20vw,18rem)] leading-[0.85] tracking-[-0.06em] text-white/5 gold-gradient">
            MAHEK
          </span>
          <span className="font-display font-bold text-[clamp(3rem,15vw,14rem)] leading-[0.85] tracking-[-0.04em] text-white/5 gold-gradient">
            DECORATOR
          </span>
        </div>

        {/* Central Glass Balloon Sculpture */}
        <div className="absolute inset-0 flex items-center justify-center z-[3]">
          <div
            ref={balloonRef}
            className="relative w-[220px] h-[280px] sm:w-[280px] sm:h-[360px] md:w-[340px] md:h-[440px] lg:w-[400px] lg:h-[520px]"
          >
            {/* Main balloon body */}
            <div className="absolute inset-0 rounded-[50%_50%_50%_50%/40%_40%_60%_60%] bg-gradient-to-b from-[rgba(212,175,55,0.25)] via-[rgba(139,92,246,0.15)] to-[rgba(212,175,55,0.08)] border border-[rgba(212,175,55,0.15)] shadow-[inset_-40px_-20px_60px_rgba(0,0,0,0.3),0_0_80px_rgba(212,175,55,0.1),0_0_160px_rgba(139,92,246,0.08)] backdrop-blur-[2px] overflow-hidden">
              {/* Glass reflections */}
              <div className="absolute top-[15%] left-[20%] w-[35%] h-[25%] rounded-full bg-gradient-to-br from-white/10 to-transparent blur-sm" />
              <div className="absolute top-[30%] left-[15%] w-[15%] h-[35%] rounded-full bg-gradient-to-b from-white/5 to-transparent blur-[6px]" />
              <div className="absolute bottom-[20%] right-[15%] w-[20%] h-[15%] rounded-full bg-gradient-to-tl from-[rgba(212,175,55,0.1)] to-transparent blur-sm" />
              {/* Inner glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.08),transparent_70%)] blur-[20px]" />
            </div>

            {/* Knot / base */}
            <div className="absolute bottom-[-8px] left-1/2 -translate-x-1/2 w-[12px] h-[16px] bg-gradient-to-b from-[rgba(212,175,55,0.3)] to-[rgba(139,92,246,0.2)] rounded-b-full border border-[rgba(212,175,55,0.15)]" />

            {/* Ribbons */}
            <svg
              ref={ribbonRef}
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 400 520"
              fill="none"
            >
              <path
                d="M200 60 C160 40, 100 80, 80 160 C60 240, 80 300, 120 340"
                stroke="url(#r1)"
                strokeWidth="2.5"
                strokeLinecap="round"
                opacity="0.5"
              />
              <path
                d="M200 60 C240 40, 300 80, 320 160 C340 240, 320 300, 280 340"
                stroke="url(#r2)"
                strokeWidth="2.5"
                strokeLinecap="round"
                opacity="0.5"
              />
              <path
                d="M200 60 C180 20, 140 50, 120 120 C100 190, 140 260, 180 300"
                stroke="url(#r1)"
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity="0.3"
              />
              <defs>
                <linearGradient id="r1" x1="0" y1="0" x2="0" y2="1">
                  <stop stopColor="#d4af37" />
                  <stop offset="1" stopColor="#8b5cf6" stopOpacity="0.3" />
                </linearGradient>
                <linearGradient id="r2" x1="0" y1="0" x2="0" y2="1">
                  <stop stopColor="#8b5cf6" />
                  <stop offset="1" stopColor="#d4af37" stopOpacity="0.3" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Particles */}
        <div className="absolute inset-0 z-[4] pointer-events-none">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              ref={(el) => (particlesRef.current[i] = el)}
              className="absolute w-1 h-1 rounded-full"
              style={{
                left: `${3 + (i * 11) % 94}%`,
                top: `${5 + (i * 17) % 90}%`,
                background: i % 3 === 0 ? '#d4af37' : i % 3 === 1 ? '#8b5cf6' : 'rgba(255,255,255,0.3)',
                boxShadow: i % 2 === 0 ? '0 0 6px rgba(212,175,55,0.3)' : '0 0 6px rgba(139,92,246,0.3)',
                width: `${2 + (i % 3)}px`,
                height: `${2 + (i % 3)}px`,
              }}
            />
          ))}
        </div>

        {/* CTA */}
        <div
          ref={ctaRef}
          className="absolute bottom-[12%] left-1/2 -translate-x-1/2 z-[5] opacity-0 translate-y-8"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-4"
          >
            <a
              href={whatsappUrl(CONFIG.whatsappMessages.booking)}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 rounded-full btn-gold text-sm no-underline inline-flex items-center gap-2 group"
            >
              <span>Book Experience</span>
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <span className="text-[10px] text-[rgba(255,255,255,0.2)] tracking-[0.25em] uppercase font-medium">
              Scroll to explore
            </span>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-[5%] left-1/2 -translate-x-1/2 z-[5]">
          <div className="flex flex-col items-center gap-2">
            <div className="w-[1px] h-10 bg-gradient-to-b from-[rgba(255,255,255,0.2)] to-transparent" />
            <div className="w-1 h-1 rounded-full bg-[#d4af37] animate-pulse-glow" />
          </div>
        </div>
      </div>
    </section>
  )
}
