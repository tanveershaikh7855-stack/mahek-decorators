'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import CONFIG, { whatsappUrl } from '@/lib/config'

export default function Hero() {
  const balloonRef = useRef(null)
  const particlesRef = useRef([])
  const mouseRef = useRef({ x: 0, y: 0 })

  // GPU-accelerated float + mouse parallax
  useEffect(() => {
    const particles = particlesRef.current
    const balloon = balloonRef.current
    if (!balloon) return

    let animFrame
    let start = Date.now()

    const handleMouse = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2
      const y = (e.clientY / window.innerHeight - 0.5) * 2
      mouseRef.current = { x, y }
    }
    window.addEventListener('mousemove', handleMouse, { passive: true })

    const tick = () => {
      const t = (Date.now() - start) / 1000
      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      // Gentle balloon float + parallax
      const floatY = Math.sin(t * 0.3) * 6
      const paraX = mx * 8
      const paraY = my * 6
      balloon.style.transform = `translate3d(${paraX}px, ${floatY + paraY}px, 0) scale(${1 + Math.sin(t * 0.2) * 0.01})`

      // Particles
      particles.forEach((el, i) => {
        if (!el) return
        const speed = 0.15 + (i % 5) * 0.03
        const offset = i * 1.2
        const px = Math.sin(t * speed + offset) * 15 + mx * 3
        const py = Math.sin(t * speed * 0.5 + offset + 1) * 12 + my * 2
        const ps = 0.5 + Math.sin(t * speed + offset) * 0.5
        el.style.transform = `translate3d(${px}px, ${py}px, 0) scale(${ps})`
        el.style.opacity = 0.15 + Math.sin(t * speed + offset + 1) * 0.15
      })

      animFrame = requestAnimationFrame(tick)
    }
    animFrame = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', handleMouse)
      cancelAnimationFrame(animFrame)
    }
  }, [])

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
  }
  const childVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } },
  }

  return (
    <section id="hero" className="relative min-h-screen bg-[#0b0b0b] overflow-hidden">
      {/* Ambient glow gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(139,92,246,0.1),transparent_60%)] animate-pulse-glow" style={{ animationDuration: '6s' }} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,rgba(212,175,55,0.06),transparent_50%)] animate-pulse-glow" style={{ animationDuration: '8s' }} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_80%,rgba(139,92,246,0.05),transparent_50%)]" />

      {/* Floating decoration orbs */}
      {[...Array(5)].map((_, i) => (
        <div
          key={`orb-${i}`}
          className="absolute rounded-full"
          style={{
            width: `${80 + i * 40}px`, height: `${80 + i * 40}px`,
            left: `${10 + i * 20}%`, top: `${15 + (i % 3) * 25}%`,
            background: `radial-gradient(circle, rgba(212,175,55,${0.03 + i * 0.005}), transparent 70%)`,
            filter: 'blur(40px)',
            transform: `translate3d(0, 0, 0)`,
            animation: `float ${6 + i * 2}s ease-in-out infinite`,
            animationDelay: `${i * 1.2}s`,
            pointerEvents: 'none',
          }}
        />
      ))}

      {/* Background Typography */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none z-[1]">
        <span className="font-display font-bold text-[clamp(4rem,20vw,16rem)] leading-[0.85] tracking-[-0.06em] gold-gradient opacity-[0.07]">
          MAHEK
        </span>
        <span className="font-display font-bold text-[clamp(3rem,15vw,12rem)] leading-[0.85] tracking-[-0.04em] gold-gradient opacity-[0.05] -mt-[0.05em]">
          DECORATOR
        </span>
      </div>

      {/* Central Glass Balloon */}
      <div className="absolute inset-0 flex items-center justify-center z-[3]">
        <div
          ref={balloonRef}
          className="relative w-[200px] h-[260px] sm:w-[260px] sm:h-[340px] md:w-[320px] md:h-[420px] lg:w-[380px] lg:h-[500px] will-change-transform"
        >
          <div className="absolute inset-0 rounded-[50%_50%_50%_50%/40%_40%_60%_60%] bg-gradient-to-b from-[rgba(212,175,55,0.2)] via-[rgba(139,92,246,0.12)] to-[rgba(212,175,55,0.06)] border border-[rgba(212,175,55,0.12)] shadow-[inset_-30px_-15px_50px_rgba(0,0,0,0.3),0_0_60px_rgba(212,175,55,0.08),0_0_120px_rgba(139,92,246,0.06)] backdrop-blur-[2px] overflow-hidden">
            <div className="absolute top-[12%] left-[18%] w-[40%] h-[20%] rounded-full bg-gradient-to-br from-white/[0.08] to-transparent blur-sm" />
            <div className="absolute top-[28%] left-[12%] w-[18%] h-[40%] rounded-full bg-gradient-to-b from-white/[0.04] to-transparent blur-[8px]" />
            <div className="absolute bottom-[18%] right-[12%] w-[25%] h-[12%] rounded-full bg-gradient-to-tl from-[rgba(212,175,55,0.08)] to-transparent blur-sm" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[65%] h-[65%] rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.06),transparent_70%)] blur-[20px]" />
          </div>
          <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-[10px] h-[14px] bg-gradient-to-b from-[rgba(212,175,55,0.25)] to-[rgba(139,92,246,0.15)] rounded-b-full border border-[rgba(212,175,55,0.12)]" />
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 380 500" fill="none">
            <path d="M190 50 C150 30, 90 70, 70 150 C50 230, 70 290, 110 330" stroke="url(#r1)" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
            <path d="M190 50 C230 30, 290 70, 310 150 C330 230, 310 290, 270 330" stroke="url(#r2)" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
            <path d="M190 50 C170 10, 130 40, 110 110 C90 180, 130 250, 170 290" stroke="url(#r1)" strokeWidth="1.2" strokeLinecap="round" opacity="0.25" />
            <defs>
              <linearGradient id="r1" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#d4af37" /><stop offset="1" stopColor="#8b5cf6" stopOpacity="0.3" /></linearGradient>
              <linearGradient id="r2" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#8b5cf6" /><stop offset="1" stopColor="#d4af37" stopOpacity="0.3" /></linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Particles */}
      <div className="absolute inset-0 z-[4] pointer-events-none">
        {Array.from({ length: 25 }).map((_, i) => (
          <div
            key={i}
            ref={(el) => (particlesRef.current[i] = el)}
            className="absolute w-1 h-1 rounded-full will-change-transform"
            style={{
              left: `${3 + (i * 13) % 94}%`, top: `${5 + (i * 19) % 90}%`,
              background: i % 3 === 0 ? '#d4af37' : i % 3 === 1 ? '#8b5cf6' : 'rgba(255,255,255,0.3)',
              boxShadow: i % 2 === 0 ? '0 0 6px rgba(212,175,55,0.3)' : '0 0 6px rgba(139,92,246,0.3)',
              width: `${2 + (i % 3)}px`, height: `${2 + (i % 3)}px`,
            }}
          />
        ))}
      </div>

      {/* CTA */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="absolute bottom-[15%] left-1/2 -translate-x-1/2 z-[5] flex flex-col items-center gap-5"
      >
        <motion.a
          variants={childVariants}
          href={whatsappUrl(CONFIG.whatsappMessages.booking)}
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-3.5 rounded-full btn-gold text-sm no-underline inline-flex items-center gap-2 group"
        >
          <span>Book Experience</span>
          <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </motion.a>
        <motion.span variants={childVariants} className="text-[10px] text-[rgba(255,255,255,0.2)] tracking-[0.25em] uppercase font-medium">
          Scroll to explore
        </motion.span>
      </motion.div>

      {/* Scroll indicator */}
      <div className="absolute bottom-[5%] left-1/2 -translate-x-1/2 z-[5]">
        <div className="flex flex-col items-center gap-2">
          <div className="w-px h-8 bg-gradient-to-b from-[rgba(255,255,255,0.2)] to-transparent" />
          <div className="w-1 h-1 rounded-full bg-[#d4af37] animate-pulse-glow" />
        </div>
      </div>
    </section>
  )
}
