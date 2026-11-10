'use client'
/**
 * DivisionExplorer — pinned horizontal scroll of 8 division cards.
 * Hover: image scale 1.06, accent glow, cursor label "View".
 * Click → TransitionLink to division page.
 */

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { TransitionLink } from '@/components/layout/PageTransition'
import divisions from '../../../data/divisions.json'
import { t, num } from '@/lib/i18n'

// Map slug → available division photo filename
const PHOTO_MAP: Record<string, string> = {
  barishal: '/assets/divisions/barishal.webp',
  chattogram: '/assets/divisions/chattogram.webp',
  dhaka: '/assets/divisions/dhaka.webp',
  khulna: '/assets/divisions/khulna.webp',
  mymensingh: '/assets/divisions/mymensingh.webp',
  rajshahi: '/assets/divisions/rajshahi.webp',
  rangpur: '/assets/divisions/rangpur.webp',
  sylhet: '/assets/divisions/sylhet.webp',
}

export function DivisionExplorer({ locale = 'en' }: { locale?: string }) {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      const elements = gsap.utils.toArray([headerRef.current, ...(gridRef.current?.children || [])])
      
      gsap.from(elements, {
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
        }
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="divisions"
      className="relative bg-cream py-24 px-6 md:px-10"
      aria-label="Explore Bangladesh divisions"
    >
      {/* Header */}
      <div ref={headerRef} className="mb-12">
        <p className="micro-label mb-2">{t({ en: 'Explore', bn: 'ঘুরে দেখুন' }, locale)}</p>
        <h2 className="font-cormorant text-display-md text-ink leading-display tracking-tighter">
          {t({ en: 'Eight Divisions', bn: 'আট বিভাগ' }, locale)}
        </h2>
      </div>

      {/* Grid */}
      <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {divisions.map((div) => (
          <DivisionCard key={div.slug} division={div} locale={locale} />
        ))}
      </div>
    </section>
  )
}

interface Division {
  slug: string
  name: { en: string; bn: string }
  accent: string
  districtCount: number
}

function DivisionCard({ division, locale }: { division: Division; locale: string }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  const handleEnter = () => {
    if (imageRef.current) gsap.to(imageRef.current, { scale: 1.05, duration: 0.8, ease: 'power3.out' })
    if (cardRef.current) cardRef.current.style.boxShadow = `0 32px 60px -30px ${division.accent}cc`
  }
  const handleLeave = () => {
    if (imageRef.current) gsap.to(imageRef.current, { scale: 1, duration: 0.8, ease: 'power3.out' })
    if (cardRef.current) cardRef.current.style.boxShadow = ''
  }

  const photo = PHOTO_MAP[division.slug]
  const name = locale === 'bn' ? division.name.bn : division.name.en
  const other = locale === 'bn' ? division.name.en : division.name.bn

  return (
    <TransitionLink href={`/${locale}/divisions/${division.slug}`} accent={division.accent} className="group/card block w-full h-full">
      <div
        ref={cardRef}
        className="group relative w-full aspect-[4/5] rounded-2xl overflow-hidden ring-1 ring-white/70 shadow-[0_18px_40px_-26px_rgba(16,20,20,.45)] transition-[box-shadow,transform] duration-500 hover:-translate-y-1"
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        {/* Full-colour, full-resolution image — no colour wash */}
        <div ref={imageRef} className="absolute inset-0" style={{ willChange: 'transform' }}>
          {photo && (
            <img
              src={photo}
              alt={`${division.name.en} division`}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
        </div>

        {/* Gloss — soft light from the top-left, like glass over a print */}
        <div className="pointer-events-none absolute inset-0" style={{ background: 'linear-gradient(140deg, rgba(255,255,255,.42) 0%, rgba(255,255,255,.1) 20%, rgba(255,255,255,0) 42%)' }} />
        {/* Shine — a light streak sweeps across on hover */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute -inset-y-16 -left-1/2 w-1/3 rotate-[14deg] bg-gradient-to-r from-transparent via-white/55 to-transparent -translate-x-full group-hover:translate-x-[460%] transition-transform duration-[1200ms] ease-out" />
        </div>

      </div>

      {/* Caption below the map — keeps the artwork uncovered */}
      <div className="flex items-start justify-between gap-3 pt-4 px-1">
        <div className="min-w-0">
          <h3 className="font-cormorant text-[1.75rem] text-ink leading-none tracking-tight group-hover/card:text-teal transition-colors">{name}</h3>
          <p className={`text-ink/55 text-sm mt-1 ${locale === 'bn' ? 'font-cormorant' : 'font-bengali'}`}>{other}</p>
        </div>
        <p className="flex items-center gap-2 micro-label pt-1.5 shrink-0" style={{ color: 'rgba(16,20,20,.55)' }}>
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: division.accent }} />
          {num(division.districtCount, locale)} {t({ en: 'districts', bn: 'জেলা' }, locale)}
        </p>
      </div>
    </TransitionLink>
  )
}
