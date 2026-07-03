'use client'

import { useEffect, useRef } from 'react'

export default function Hero() {
  const containerRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const frameRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleMouse = (e) => {
      const rect = container.getBoundingClientRect()
      mouseRef.current = {
        x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
        y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
      }
    }

    container.addEventListener('mousemove', handleMouse, { passive: true })

    // Animate floating elements via CSS transforms
    const balloons = container.querySelectorAll('.float-balloon')
    const particles = container.querySelectorAll('.particle')
    const lights = container.querySelectorAll('.ambient-light')

    let startTime = Date.now()

    const animate = () => {
      const t = (Date.now() - startTime) / 1000
      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      balloons.forEach((el, i) => {
        const speed = 0.3 + i * 0.1
        const offset = i * 1.5
        const x = Math.sin(t * speed + offset) * 6 + mx * 4
        const y = Math.sin(t * speed * 0.7 + offset + 1) * 8 + my * 3
        const rot = Math.sin(t * speed * 0.5 + offset) * 3
        el.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${rot}deg)`
      })

      particles.forEach((el, i) => {
        const speed = 0.15 + (i % 5) * 0.05
        const offset = i * 0.7
        const x = Math.sin(t * speed + offset) * (10 + (i % 3) * 5) + mx * (5 + (i % 3) * 2)
        const y = Math.sin(t * speed * 0.6 + offset + 2) * (12 + (i % 3) * 5) + my * (4 + (i % 3) * 2)
        const scale = 0.6 + Math.sin(t * speed + offset) * 0.4
        el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`
        el.style.opacity = 0.15 + Math.sin(t * speed + offset + 1) * 0.1
      })

      lights.forEach((el) => {
        const glow = 0.3 + Math.sin(t * 0.5 + parseFloat(el.dataset.offset || 0)) * 0.2
        el.style.opacity = glow
      })

      frameRef.current = requestAnimationFrame(animate)
    }

    frameRef.current = requestAnimationFrame(animate)

    return () => {
      container.removeEventListener('mousemove', handleMouse)
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [])

  return (
    <section id="hero" className="relative min-h-screen overflow-hidden bg-[#0b0b0b]" ref={containerRef}>
      {/* Background gradient layers */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(139,92,246,0.08),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,rgba(212,175,55,0.06),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_80%,rgba(139,92,246,0.05),transparent_50%)]" />

      {/* Particle layer */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={`p-${i}`}
            className="particle absolute w-1 h-1 rounded-full"
            style={{
              background: i % 3 === 0 ? '#d4af37' : i % 3 === 1 ? '#8b5cf6' : 'rgba(255,255,255,0.4)',
              left: `${5 + (i * 17) % 90}%`,
              top: `${10 + (i * 23) % 80}%`,
              boxShadow: i % 3 === 0 ? '0 0 6px rgba(212,175,55,0.3)' : i % 3 === 1 ? '0 0 6px rgba(139,92,246,0.3)' : 'none',
            }}
          />
        ))}
      </div>

      {/* Ambient light orbs */}
      <div className="absolute top-[20%] left-[60%] w-[300px] h-[300px] rounded-full bg-[rgba(139,92,246,0.06)] blur-[80px] ambient-light" data-offset="0" />
      <div className="absolute top-[50%] right-[20%] w-[200px] h-[200px] rounded-full bg-[rgba(212,175,55,0.04)] blur-[60px] ambient-light" data-offset="1" />

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 pt-[120px] pb-20 min-h-screen flex flex-col lg:flex-row items-center gap-12 lg:gap-0">
        {/* LEFT CONTENT */}
        <div className="flex-1 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs text-[#d4af37] tracking-[0.15em] uppercase mb-8 font-medium border-[rgba(212,175,55,0.15)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] animate-pulse-glow" />
            Pune&apos;s Premium Decorators
          </div>

          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-semibold leading-[1.05] tracking-[-0.03em] text-white mb-6 text-balance">
            Luxury Balloon
            <br />
            <span className="gold-gradient">Decorations</span>
            <br />
            For Every Celebration
          </h1>

          <p className="text-base sm:text-lg text-[rgba(255,255,255,0.55)] max-w-[520px] leading-relaxed font-light mb-10 mx-auto lg:mx-0">
            Premium balloon decoration services across Pune and 160+ KM surrounding areas. Transform every celebration into an unforgettable memory.
          </p>

          <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <a
              href="https://wa.me/919876543210?text=Hi%20Mahek%20Decorator!%20I%27d%20like%20to%20book%20a%20decoration."
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 rounded-full btn-gold text-sm no-underline inline-flex items-center gap-2"
            >
              Book Now
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </a>
            <a
              href="#decorations"
              className="px-8 py-3.5 rounded-full btn-outline text-sm no-underline inline-flex items-center gap-2"
            >
              Explore Decorations
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </a>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap gap-8 mt-14 justify-center lg:justify-start">
            {[
              { number: '500+', label: 'Events Decorated' },
              { number: '160 KM', label: 'Service Radius' },
              { number: '4.9', label: 'Client Rating' },
            ].map((stat) => (
              <div key={stat.label} className="text-center lg:text-left">
                <div className="text-xl font-display font-semibold gold-gradient">{stat.number}</div>
                <div className="text-xs text-[rgba(255,255,255,0.4)] mt-0.5 tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SHOWCASE */}
        <div className="flex-1 flex items-center justify-center relative h-[400px] sm:h-[500px] lg:h-[600px] w-full">
          {/* Main balloon arch */}
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Balloon cluster - back layer */}
            <div className="absolute inset-0 flex items-center justify-center">
              {[
                { size: 100, x: -40, y: -30, color: 'rgba(212,175,55,0.15)', delay: 0 },
                { size: 80, x: 50, y: -20, color: 'rgba(139,92,246,0.12)', delay: 0.5 },
                { size: 90, x: -30, y: 40, color: 'rgba(212,175,55,0.1)', delay: 1 },
                { size: 70, x: 60, y: 30, color: 'rgba(139,92,246,0.15)', delay: 1.5 },
                { size: 110, x: 0, y: -50, color: 'rgba(212,175,55,0.12)', delay: 0.3 },
              ].map((b, i) => (
                <div
                  key={`b-${i}`}
                  className="float-balloon absolute rounded-[50%_50%_50%_50%/45%_45%_55%_55%]"
                  style={{
                    width: b.size,
                    height: b.size * 1.25,
                    background: `radial-gradient(ellipse at 35% 30%, ${b.color.replace('0.1', '0.3').replace('0.12', '0.35').replace('0.15', '0.4')}, ${b.color})`,
                    left: `calc(50% + ${b.x}px)`,
                    top: `calc(50% + ${b.y}px)`,
                    transform: `translate(-50%, -50%)`,
                    boxShadow: `inset -20px -10px 30px rgba(0,0,0,0.2), 0 0 40px ${b.color}`,
                    border: '1px solid rgba(255,255,255,0.05)',
                    animationDelay: `${b.delay}s`,
                  }}
                />
              ))}
            </div>

            {/* Front centerpiece balloon */}
            <div
              className="float-balloon absolute rounded-[50%_50%_50%_50%/40%_40%_60%_60%]"
              style={{
                width: 140,
                height: 175,
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                background: 'radial-gradient(ellipse at 30% 25%, rgba(212,175,55,0.35), rgba(139,92,246,0.2) 60%, rgba(11,11,11,0.4))',
                boxShadow: 'inset -30px -15px 40px rgba(0,0,0,0.3), 0 0 60px rgba(212,175,55,0.15), 0 0 120px rgba(139,92,246,0.08)',
                border: '1px solid rgba(212,175,55,0.15)',
              }}
            >
              {/* Gold reflection */}
              <div
                className="absolute rounded-full"
                style={{
                  width: 30,
                  height: 50,
                  background: 'rgba(212,175,55,0.2)',
                  top: '20%',
                  left: '20%',
                  filter: 'blur(8px)',
                }}
              />
              <div
                className="absolute rounded-full"
                style={{
                  width: 20,
                  height: 40,
                  background: 'rgba(255,255,255,0.08)',
                  top: '15%',
                  left: '30%',
                  filter: 'blur(12px)',
                }}
              />
            </div>

            {/* Gold sparkle accents */}
            {[...Array(6)].map((_, i) => (
              <div
                key={`s-${i}`}
                className="particle absolute w-1.5 h-1.5 rounded-full"
                style={{
                  background: '#d4af37',
                  left: `calc(50% + ${Math.cos(i * 1.047) * 90}px)`,
                  top: `calc(50% + ${Math.sin(i * 1.047) * 90}px)`,
                  boxShadow: '0 0 10px rgba(212,175,55,0.5), 0 0 20px rgba(212,175,55,0.2)',
                }}
              />
            ))}

            {/* Purple glow ring */}
            <div
              className="absolute rounded-full animate-pulse-glow"
              style={{
                width: 200,
                height: 200,
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                background: 'radial-gradient(circle, rgba(139,92,246,0.08), transparent 70%)',
                filter: 'blur(30px)',
              }}
            />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <span className="text-[10px] text-[rgba(255,255,255,0.25)] tracking-[0.2em] uppercase font-medium">Scroll</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-[rgba(255,255,255,0.3)] to-transparent animate-bounce" />
      </div>
    </section>
  )
}
