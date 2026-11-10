'use client'
/**
 * Magazine — 3D coverflow carousel that loops endlessly.
 * Auto-advances (pauses on hover / focus / reduced motion), drag or click to browse.
 * Covers come from the monthly issue list; Read → issue page (flipbook), PDF → issue page downloads.
 */

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { gsap } from '@/lib/gsap'
import { ISSUES, issueKey } from '@/content/issues'
import { t, num, date } from '@/lib/i18n'

const COVERED = ISSUES.filter((i) => i.cover).sort((a, b) => b.date.localeCompare(a.date))
// Two copies so the card that wraps around always travels while invisible
const RING = [...COVERED, ...COVERED]
const N = RING.length
const AUTO_MS = 3500

const S = {
  label: { en: 'The archive', bn: 'আর্কাইভ' },
  title: { en: 'Every issue, every month', bn: 'প্রতি মাসের প্রতিটি সংখ্যা' },
  issue: { en: 'Issue', bn: 'সংখ্যা' },
  read: { en: 'Read', bn: 'পড়ুন' },
  pdf: { en: 'PDF', bn: 'পিডিএফ' },
  print: { en: 'Hard copy', bn: 'মুদ্রিত কপি' },
  archive: { en: 'All issues', bn: 'সব সংখ্যা' },
}

export function Magazine({ locale = 'en' }: { locale?: string }) {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const startX = useRef(0)
  const isDragging = useRef(false)

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current || !headerRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current, { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      })
      gsap.fromTo(trackRef.current, { opacity: 0, scale: 0.9, y: 50 }, {
        opacity: 1, scale: 1, y: 0, duration: 1.2, ease: 'back.out(1.5)',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      })
    })
    return () => ctx.revert()
  }, [])

  // Endless auto-play
  useEffect(() => {
    if (paused) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => setActive((a) => (a + 1) % N), AUTO_MS)
    return () => clearInterval(id)
  }, [paused])

  const step = (d: number) => setActive((a) => (a + d + N) % N)

  const onPointerDown = (e: React.PointerEvent) => { isDragging.current = true; startX.current = e.clientX }
  const onPointerUp = (e: React.PointerEvent) => {
    if (!isDragging.current) return
    isDragging.current = false
    const dx = e.clientX - startX.current
    if (Math.abs(dx) > 40) step(dx < 0 ? 1 : -1)
  }

  const current = RING[active]

  return (
    <section
      ref={sectionRef}
      id="magazine"
      className="relative bg-cream py-24 px-6 overflow-hidden"
      aria-label="Brand Bangladesh magazine"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div ref={headerRef} className="mb-16 text-center">
        <p className="micro-label mb-3">{t(S.label, locale)}</p>
        <h2 className="font-cormorant text-display-md text-ink leading-display tracking-tighter">
          {t(S.title, locale)}
        </h2>
      </div>

      {/* Coverflow */}
      <div
        ref={trackRef}
        className="relative flex items-center justify-center gap-4 select-none overflow-visible"
        style={{ height: 440, perspective: '1200px' }}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onKeyDown={(e) => { if (e.key === 'ArrowRight') step(1); if (e.key === 'ArrowLeft') step(-1) }}
        tabIndex={0}
        data-cursor="drag"
        aria-roledescription="carousel"
        aria-label="Magazine issues — drag or use arrow keys to browse"
      >
        {RING.map((issue, i) => {
          // Shortest circular distance from the active card
          let offset = i - active
          if (offset > N / 2) offset -= N
          if (offset < -N / 2) offset += N
          const absOffset = Math.abs(offset)
          const isActive = offset === 0
          const hidden = absOffset > 2

          return (
            <div
              key={`${issue.number}-${i}`}
              className="absolute flex-shrink-0 cursor-pointer"
              style={{
                width: isActive ? 260 : 180,
                height: isActive ? 380 : 280,
                transform: `translateX(${offset * 200}px) rotateY(${offset * -18}deg) scale(${isActive ? 1 : 0.8 - absOffset * 0.05})`,
                opacity: hidden ? 0 : 1 - absOffset * 0.25,
                zIndex: 10 - absOffset,
                pointerEvents: hidden ? 'none' : 'auto',
                transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              onClick={() => !isActive && setActive(i)}
              aria-hidden={!isActive}
            >
              <div
                className="w-full h-full rounded-lg shadow-2xl flex flex-col items-start justify-end p-6 relative overflow-hidden"
                style={{ backgroundColor: issue.color }}
              >
                <div className="absolute inset-0">
                  <img src={issue.cover} alt="" className="w-full h-full object-cover" draggable={false} />
                  <div className="absolute inset-0 opacity-30 mix-blend-multiply" style={{ backgroundColor: issue.color }} />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="relative z-10">
                  <p className="text-white/60 text-xs font-inter uppercase tracking-widest mb-1">
                    {t(S.issue, locale)} {num(issue.number, locale)} · {date(issue.date, locale)}
                  </p>
                  {isActive && (
                    <h3 className="font-cormorant text-2xl text-white leading-tight">{t(issue.title, locale)}</h3>
                  )}
                </div>
              </div>

              {isActive && (
                <div className="flex gap-3 mt-4 justify-center">
                  <Link
                    href={`/${locale}/publication/${issueKey(issue)}#reader`}
                    className="font-inter text-xs uppercase tracking-label text-ink/60 border border-ink/20 px-4 py-2 rounded-full hover:bg-ink hover:text-cream transition-all duration-300"
                    data-cursor="view"
                  >
                    {t(S.read, locale)}
                  </Link>
                  <Link
                    href={`/${locale}/publication/${issueKey(issue)}#get`}
                    className="font-inter text-xs uppercase tracking-label text-ink/60 border border-ink/20 px-4 py-2 rounded-full hover:bg-ink hover:text-cream transition-all duration-300"
                    data-cursor="view"
                  >
                    {t(issue.printAvailable ? S.print : S.pdf, locale)}
                  </Link>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        {t(S.issue, locale)} {num(current.number, locale)}: {t(current.title, locale)}
      </p>

      {/* Pagination dots */}
      <div className="flex justify-center items-center gap-2 mt-12" role="tablist" aria-label="Magazine issues">
        {COVERED.map((issue, i) => (
          <button
            key={issue.number}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              active % COVERED.length === i ? 'bg-ink w-6' : 'bg-ink/20 w-1.5'
            }`}
            onClick={() => setActive(i + (active >= COVERED.length ? COVERED.length : 0))}
            role="tab"
            aria-selected={active % COVERED.length === i}
            aria-label={`${t(S.issue, locale)} ${issue.number}: ${t(issue.title, locale)}`}
          />
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <Link
          href={`/${locale}/publication`}
          className="micro-label text-ink/50 hover:text-ink transition-colors"
          data-cursor="link"
        >
          {t(S.archive, locale)} →
        </Link>
      </div>
    </section>
  )
}
