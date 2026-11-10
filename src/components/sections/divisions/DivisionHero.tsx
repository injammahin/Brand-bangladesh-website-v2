'use client'
/**
 * Division hero — name, Bangla name, district count and intro on the left;
 * the division's 3D map as a large, clean framed card on the right (no colour tint):
 * light sweep on arrival + on hover, gentle tilt toward the pointer, slow parallax.
 */

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { t, num } from '@/lib/i18n'
import { Shine } from '@/components/ui/Shine'

interface DivisionHeroProps {
  name: { en: string; bn: string }
  accent: string
  intro: { en: string; bn: string }
  districtCount: number
  reliefImage: string
  heroImage: string
  videoLoop?: string
  locale?: string
}

export function DivisionHero({ name, accent, intro, districtCount, reliefImage, locale = 'en' }: DivisionHeroProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  // Card floats in, then drifts slowly on scroll
  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      gsap.fromTo(wrap, { opacity: 0, y: 40, rotate: 2 }, { opacity: 1, y: 0, rotate: 0, duration: 1.3, ease: 'expo.out', delay: 0.15 })
      gsap.to(wrap, { yPercent: -8, ease: 'none', scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: true } })
    })
    return () => ctx.revert()
  }, [])

  const onTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    gsap.to(cardRef.current, {
      rotateX: ((e.clientY - r.top) / r.height - 0.5) * -8,
      rotateY: ((e.clientX - r.left) / r.width - 0.5) * 10,
      duration: 0.6, ease: 'power3.out',
    })
  }
  const resetTilt = () => gsap.to(cardRef.current, { rotateX: 0, rotateY: 0, duration: 0.9, ease: 'power3.out' })

  const introText = locale === 'bn' ? intro.bn : intro.en
  const title = locale === 'bn' ? name.bn : name.en
  const sub = locale === 'bn' ? name.en : name.bn

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[calc(100vh-64px)] bg-cream overflow-hidden flex items-center px-6 md:px-10 py-16"
      aria-label={`${name.en} division`}
    >
      <div className="w-full max-w-[1320px] mx-auto grid md:grid-cols-2 items-center gap-12 lg:gap-24">
      {/* Text */}
      <div className="relative z-10 max-w-xl">
        <div className="w-8 h-px mb-6" style={{ backgroundColor: accent }} />
        <p className={`${locale === 'bn' ? 'font-cormorant' : 'font-bengali'} text-2xl text-ink/60 mb-2`}>{sub}</p>
        <h1 className="font-cormorant text-display-lg text-ink leading-display tracking-tighter mb-4">{title}</h1>
        <p className="micro-label mb-6" style={{ color: accent }}>
          {num(districtCount, locale)} {t({ en: 'districts', bn: 'জেলা' }, locale)}
        </p>
        {introText && introText !== 'TODO' && (
          <p className="font-inter text-base text-ink/60 leading-relaxed max-w-md">{introText}</p>
        )}
        <div className="mt-12 flex items-center gap-3">
          <div className="w-px h-10 bg-ink/15" />
          <span className="micro-label text-ink/40">{t({ en: 'Scroll to explore', bn: 'স্ক্রল করে দেখুন' }, locale)}</span>
        </div>
      </div>

      {/* Shiny framed map */}
      <div ref={wrapRef} className="relative z-10 justify-self-center w-[min(88vw,420px)] md:w-full md:max-w-[600px]" style={{ perspective: '1400px' }} onMouseMove={onTilt} onMouseLeave={resetTilt}>
        <div
          ref={cardRef}
          className="group relative aspect-square rounded-2xl overflow-hidden ring-1 ring-white/80"
          style={{ transformStyle: 'preserve-3d', boxShadow: '0 34px 70px -34px rgba(16,20,20,.38)' }}
        >
          <img src={reliefImage} alt={`${name.en} — 3D map`} fetchPriority="high" decoding="async" className="absolute inset-0 w-full h-full object-cover object-[center_86%] transition-transform duration-1000 group-hover:scale-105" />
          <Shine />
        </div>
      </div>
      </div>
    </section>
  )
}
