'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import CONFIG, { whatsappUrl } from '@/lib/config'

export default function Hero() {
  const sectionRef = useRef(null)
  const particlesRef = useRef([])
  const balloonRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const frameRef = useRef(null)

  // Subtle mouse parallax
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const handleMouse = (e) => {
      const rect = section.getBoundingClientRect()
      mouseRef.current = {
        x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
        y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
      }
    }
    section.addEventListener('mousemove', handleMouse, { passive: true })
    return () => section.removeEventListener('mousemove', handleMouse)
  }, [])

  // GPU-accelerated rAF particle + float loop
  useEffect(() => {
    const particles = particlesRef.current
    const balloon = balloonRef.current
    if (!particles.length) return

    let start = performance.now()

    const tick = (now) => {
      const t = (now - start) / 1000
      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      // Balloon slow breathing + float + parallax
      if (balloon) {
        const breathe = 1 + Math.sin(t * 0.4) * 0.02
        const floatY = Math.sin(t * 0.3) * 6
        const floatX = Math.sin(t * 0.2) * 4
        const rotate = Math.sin(t * 0.15) * 1.5
        balloon.style.transform = `translate3d(${floatX + mx * 6}px, ${floatY + my * 4}px, 0) scale(${breathe}) rotate(${rotate}deg)`
      }

      // Gentle particles
      particles.forEach((el, i) => {
        if (!el) return
        const speed = 0.15 + (i % 5) * 0.03
        const offset = i * 0.6
        const x = Math.sin(t * speed + offset) * 8 + mx * (2 + (i % 3))
        const y = Math.sin(t * speed * 0.7 + offset + 1.2) * 6 + my * (1.5 + (i % 3))
        const s = 0.7 + Math.sin(t * speed + offset + 2) * 0.3
        el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${s})`
      })

      frameRef.current = requestAnimationFrame(tick)
    }

    frameRef.current = requestAnimationFrame(tick)
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen bg-[#0b0b0b] overflow-hidden flex items-center"
    >
      {/* Ambient glow gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,rgba(139,92,246,0.06),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_60%,rgba(212,175,55,0.04),transparent_50%)]" />
      <div className="absolute top-[-20%] left-[50%] w-[60%] h-[60%] bg-[radial-gradient(circle,rgba(212,175,55,0.03),transparent_70%)] blur-[80px]" />

      {/* Large background typography */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none z-[1]">
        <span className="font-display font-bold text-[clamp(5rem,22vw,20rem)] leading-[0.8] tracking-[-0.06em] text-white/[0.03]">
          MAHEK
        </span>
        <span className="font-display font-bold text-[clamp(3.5rem,16vw,15rem)] leading-[0.8] tracking-[-0.04em] text-white/[0.025]">
          DECORATOR
        </span>
      </div>

      {/* Particles */}
      <div className="absolute inset-0 z-[2] pointer-events-none">
        {Array.from({ length: 25 }).map((_, i) => (
          <div
            key={i}
            ref={(el) => (particlesRef.current[i] = el)}
            className="absolute rounded-full"
            style={{
              left: `${4 + (i * 13) % 92}%`,
              top: `${8 + (i * 19) % 84}%`,
              width: `${2 + (i % 3)}px`,
              height: `${2 + (i % 3)}px`,
              background: i % 4 === 0 ? '#d4af37' : i % 4 === 1 ? '#8b5cf6' : i % 4 === 2 ? 'rgba(255,255,255,0.4)' : '#d4af37',
              boxShadow: i % 3 === 0 ? '0 0 8px rgba(212,175,55,0.3)' : i % 3 === 1 ? '0 0 8px rgba(139,92,246,0.2)' : 'none',
              opacity: 0.3 + (i % 4) * 0.12,
            }}
          />
        ))}
      </div>

      {/* Central glass balloon */}
      <div className="relative z-[3] w-full flex flex-col lg:flex-row items-center max-w-[1280px] mx-auto px-6 pt-28 pb-20 gap-8 lg:gap-0">
        {/* Left: Content */}
        <div className="flex-1 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs text-[#d4af37] tracking-[0.15em] uppercase mb-6 font-medium">
              Pune&apos;s Premium Decorators
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-semibold leading-[1.05] tracking-[-0.03em] text-white mb-6 text-balance"
          >
            Luxury Balloon
            <br />
            <span className="gold-gradient">Decorations</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg text-[rgba(255,255,255,0.5)] max-w-[500px] leading-relaxed font-light mb-10 mx-auto lg:mx-0"
          >
            Premium balloon decoration services across Pune and 160+ KM surrounding areas.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap gap-4 justify-center lg:justify-start"
          >
            <a
              href={whatsappUrl(CONFIG.whatsappMessages.booking)}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 rounded-full btn-gold text-sm no-underline inline-flex items-center gap-2 group"
            >
              Book Experience
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </a>
            <a
              href="#decorations"
              className="px-8 py-3.5 rounded-full btn-outline text-sm no-underline inline-flex items-center gap-2"
            >
              View Decorations
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap gap-8 mt-12 justify-center lg:justify-start"
          >
            {CONFIG.stats.map((s) => (
              <div key={s.label}>
                <div className="text-xl font-display font-semibold gold-gradient">{s.number}</div>
                <div className="text-xs text-[rgba(255,255,255,0.35)] mt-0.5 tracking-wide">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: Glass Balloon Sculpture */}
        <div className="flex-1 flex items-center justify-center h-[350px] sm:h-[420px] lg:h-[550px] w-full relative">
          <div
            ref={balloonRef}
            className="relative"
            style={{ willChange: 'transform' }}
          >
            {/* Main glass balloon */}
            <div className="relative w-[180px] h-[230px] sm:w-[220px] sm:h-[280px] md:w-[260px] md:h-[330px] lg:w-[320px] lg:h-[410px]">
              {/* Outer glow */}
              <div className="absolute inset-[-20px] rounded-[50%_50%_50%_50%/40%_40%_60%_60%] bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.06),transparent_70%)] blur-[30px] animate-pulse-glow" />

              {/* Balloon body */}
              <div className="absolute inset-0 rounded-[50%_50%_50%_50%/40%_40%_60%_60%] bg-gradient-to-b from-[rgba(255,255,255,0.08)] via-[rgba(139,92,246,0.06)] to-[rgba(212,175,55,0.04)] border border-[rgba(255,255,255,0.12)] shadow-[inset_-30px_-15px_50px_rgba(0,0,0,0.2),0_0_60px_rgba(212,175,55,0.08),0_0_120px_rgba(139,92,246,0.04)] backdrop-blur-[4px] overflow-hidden">
                {/* Glass reflections */}
                <div className="absolute top-[18%] left-[22%] w-[30%] h-[20%] rounded-full bg-gradient-to-br from-white/[0.12] to-transparent blur-[2px]" />
                <div className="absolute top-[35%] left-[18%] w-[12%] h-[30%] rounded-full bg-gradient-to-b from-white/[0.06] to-transparent blur-[6px]" />
                <div className="absolute bottom-[25%] right-[18%] w-[18%] h-[12%] rounded-full bg-gradient-to-tl from-[rgba(212,175,55,0.08)] to-transparent blur-[2px]" />
                {/* Inner ambient glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55%] h-[55%] rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.06),transparent_70%)] blur-[15px]" />
              </div>

              {/* Knot */}
              <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-[10px] h-[14px] bg-gradient-to-b from-[rgba(255,255,255,0.08)] to-[rgba(139,92,246,0.04)] rounded-b-full border border-[rgba(255,255,255,0.1)]" />

              {/* Ribbons */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 320 410" fill="none">
                <path d="M160 50 C120 30, 70 70, 50 150 C30 230, 50 290, 90 330" stroke="url(#rg1)" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
                <path d="M160 50 C200 30, 250 70, 270 150 C290 230, 270 290, 230 330" stroke="url(#rg2)" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
                <path d="M160 50 C140 10, 100 40, 80 110 C60 180, 100 250, 140 290" stroke="url(#rg1)" strokeWidth="1.2" strokeLinecap="round" opacity="0.25" />
                <defs>
                  <linearGradient id="rg1" x1="0" y1="0" x2="0" y2="1">
                    <stop stopColor="#d4af37" />
                    <stop offset="1" stopColor="#8b5cf6" stopOpacity="0.2" />
                  </linearGradient>
                  <linearGradient id="rg2" x1="0" y1="0" x2="0" y2="1">
                    <stop stopColor="#8b5cf6" />
                    <stop offset="1" stopColor="#d4af37" stopOpacity="0.2" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] text-[rgba(255,255,255,0.2)] tracking-[0.25em] uppercase font-medium">Scroll</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-[rgba(255,255,255,0.2)] to-transparent animate-bounce" />
      </motion.div>
    </section>
  )
}
