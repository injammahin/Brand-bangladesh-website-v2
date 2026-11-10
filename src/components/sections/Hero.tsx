'use client'
/**
 * Hero section — full-viewport brand film (hero-v2: Bangladesh rising through the clouds → logo).
 * Poster = the film's opening frame, so the first view is never blank while the video loads.
 * On scroll: scales to 0.92, gains rounded corners, lifts.
 */

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { gsap } from '@/lib/gsap'
import { latestIssue, issueKey } from '@/content/issues'
import { ARTICLES } from '@/content/articles'
import { t, num, type L } from '@/lib/i18n'

const S = {
  slogan1: { en: 'A nation of rivers and resilience,', bn: 'নদী ও সহনশীলতার দেশ,' },
  slogan2: { en: 'open to the world.', bn: 'বিশ্বের জন্য উন্মুক্ত।' },
  thisMonth: { en: 'This month', bn: 'এই মাসে' },
  issue: { en: 'Issue', bn: 'সংখ্যা' },
  read: { en: 'Read the issue', bn: 'সংখ্যাটি পড়ুন' },
  scroll: { en: 'Scroll', bn: 'স্ক্রল' },
}

export function Hero({ isLoaded = true, locale = 'en' }: { isLoaded?: boolean; locale?: string }) {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const bandRef = useRef<HTMLDivElement>(null)
  const [muted, setMuted] = useState(true)
  const issue = latestIssue()
  // This month's topics: web articles of the issue + its print contents
  const topics: L[] = [
    ...issue.articles.map((s) => ARTICLES.find((a) => a.slug === s)?.title).filter((x): x is L => !!x),
    ...issue.toc,
  ].slice(0, 4)
  const [topic, setTopic] = useState(0)

  // Rotate topics every 3.2s (paused for reduced motion)
  useEffect(() => {
    if (topics.length < 2 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => setTopic((i) => (i + 1) % topics.length), 3200)
    return () => clearInterval(id)
  }, [topics.length])

  // Band slides in once the preloader has finished
  useEffect(() => {
    const el = bandRef.current
    if (!el || !isLoaded) return
    const items = el.querySelectorAll('[data-band]')
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { gsap.set(items, { opacity: 1 }); return }
    const ctx = gsap.context(() => {
      gsap.fromTo(items, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 1.2, ease: 'expo.out', stagger: 0.15, delay: 0.8 })
    }, el)
    return () => ctx.revert()
  }, [isLoaded])

  // Sound: browsers block autoplay with audio, so switch sound on at the visitor's first interaction
  useEffect(() => {
    const on = () => {
      const v = videoRef.current
      if (!v) return
      v.muted = false; setMuted(false)
      if (v.paused && !v.ended) v.play().catch(() => {})
      off()
    }
    const off = () => ['pointerdown', 'keydown', 'touchstart'].forEach((e) => window.removeEventListener(e, on))
    ;['pointerdown', 'keydown', 'touchstart'].forEach((e) => window.addEventListener(e, on, { once: true, passive: true }))
    return off
  }, [])

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation()
    const v = videoRef.current
    if (!v) return
    const next = !muted
    v.muted = next; setMuted(next)
    if (!next && v.paused) v.play().catch(() => {})
  }

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { v.poster = '/assets/hero-v4-end.jpg'; return }
    if (isLoaded) { v.currentTime = 0; v.play().catch(() => {}) }
    else { v.pause(); v.currentTime = 0 }
  }, [isLoaded])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      gsap.to(section, {
        scale: 0.92, borderRadius: '16px', ease: 'none',
        scrollTrigger: { trigger: section, start: 'top top', end: 'bottom top', scrub: true },
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full min-h-screen bg-[#e9e2cf] overflow-hidden"
      style={{ transformOrigin: 'center top' }}
      aria-label="Brand Bangladesh hero"
    >
      {/* Stage — the film's own warm-beige ground, so the whole frame shows with no seams */}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 70% at 62% 35%, #f4eedd 0%, #e9e2cf 55%, #ddd5c2 100%)' }} aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 top-16 md:top-[68px] md:flex md:items-center md:justify-center" aria-hidden="true">
        <video
          ref={videoRef}
          className="bb-hero-film absolute inset-0 w-full h-full object-cover md:static md:h-auto md:aspect-video md:w-[min(100%,calc((100vh-68px)*16/9),1920px)]"
          poster="/assets/hero-v4-poster.jpg"
          muted={muted}
          playsInline
          preload="auto"
          loop
        >
          {/* Brand film: Bangladesh rising through the clouds → logo (island-map brand film, supplied by the client team).
              Native 1080p — capped at 1920px so it is never stretched beyond its real resolution on large screens. */}
          <source src="/assets/hero-v4.webm" type="video/webm" />
          <source src="/assets/hero-v4.mp4" type="video/mp4" />
        </video>
      </div>

      <button
        onClick={toggleSound}
        className="absolute z-20 right-6 md:right-10 lg:right-16 top-24 md:top-[92px] inline-flex items-center gap-2 rounded-full bg-cream/85 backdrop-blur border border-ink/10 px-4 py-2 font-inter text-[11px] uppercase tracking-label text-ink/75 hover:bg-cream transition-colors"
        aria-pressed={!muted}
        aria-label={muted ? 'Turn sound on' : 'Turn sound off'}
      >
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M2 6h3l4-3v10l-4-3H2z" fill="currentColor" />
          {muted
            ? <path d="M11 6l4 4M15 6l-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            : <path d="M11.5 5.5a3.5 3.5 0 010 5M13 3.5a6 6 0 010 9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />}
        </svg>
        {muted ? (locale === 'bn' ? 'শব্দ চালু' : 'Sound on') : (locale === 'bn' ? 'শব্দ বন্ধ' : 'Sound off')}
      </button>

      {/* Fade into the page below + soft light behind the two text corners only */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #FBFAF7 0%, rgba(251,250,247,0) 14%), radial-gradient(ellipse 36% 32% at 0% 100%, rgba(251,250,247,.92), rgba(251,250,247,0) 72%), radial-gradient(ellipse 36% 32% at 100% 100%, rgba(251,250,247,.92), rgba(251,250,247,0) 72%)' }}
        aria-hidden="true"
      />

      {/* Bottom band — kept below the logo: slogan · scroll focus · this month's topics */}
      <div ref={bandRef} className="absolute inset-x-0 bottom-0 px-6 md:px-10 lg:px-16 pb-7 md:pb-9 grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-end gap-6">
        {/* Slogan */}
        <div data-band className="opacity-0 hidden md:block max-w-[380px]">
          <div className="flex h-[3px] w-14 rounded-full overflow-hidden mb-3" aria-hidden="true">
            {['#DF1A23', '#F68421', '#FECB02', '#016171', '#A5CD2F', '#EF1551'].map((c) => <span key={c} className="flex-1" style={{ backgroundColor: c }} />)}
          </div>
          <p className="font-cormorant text-ink leading-[1.15] text-[clamp(1.35rem,2vw,1.9rem)]">
            {t(S.slogan1, locale)}{' '}
            <span className="italic text-teal">{t(S.slogan2, locale)}</span>
          </p>
        </div>

        {/* Scroll — focus animation */}
        <a href="#manifesto" data-band className="opacity-0 justify-self-center flex flex-col items-center gap-3 group" aria-label={t(S.scroll, locale)} data-cursor="link">
          <span className="relative flex items-center justify-center w-14 h-14">
            <span className="absolute inset-0 rounded-full border border-gold/60 animate-[bb-focus_2.4s_cubic-bezier(.16,1,.3,1)_infinite]" />
            <span className="absolute inset-0 rounded-full border border-gold/40 animate-[bb-focus_2.4s_cubic-bezier(.16,1,.3,1)_1.2s_infinite]" />
            <span className="relative w-[22px] h-[34px] rounded-full border-[1.5px] border-ink/50 flex justify-center pt-1.5 bg-cream/70 backdrop-blur-sm transition-colors group-hover:border-ink">
              <span className="w-[3px] h-[7px] rounded-full bg-ink/70 animate-[bb-wheel_1.6s_ease-in-out_infinite]" />
            </span>
          </span>
          <span className="micro-label">{t(S.scroll, locale)}</span>
        </a>

        {/* This month — rotating topics */}
        <Link
          href={`/${locale}/publication/${issueKey(issue)}`}
          data-band
          className="opacity-0 hidden md:block justify-self-end w-full max-w-[340px] group"
          data-cursor="view"
        >
          <div className="flex items-center justify-between border-b border-ink/15 pb-2 mb-3">
            <p className="micro-label" style={{ color: issue.color }}>{t(S.thisMonth, locale)} · {t(S.issue, locale)} {num(issue.number, locale)}</p>
            <span className="flex gap-1" aria-hidden="true">
              {topics.map((_, i) => (
                <span key={i} className={`h-[3px] rounded-full transition-all duration-500 ${i === topic ? 'w-5 bg-ink/70' : 'w-1.5 bg-ink/20'}`} />
              ))}
            </span>
          </div>
          <div className="relative h-[3.6rem] overflow-hidden" aria-live="polite">
            {topics.map((tp, i) => (
              <p
                key={i}
                className="absolute inset-0 font-cormorant text-[1.45rem] leading-[1.2] text-ink transition-all duration-700 ease-expo-out group-hover:text-teal"
                style={{ opacity: i === topic ? 1 : 0, transform: `translateY(${i === topic ? 0 : i < topic ? -100 : 100}%)` }}
                aria-hidden={i !== topic}
              >
                {t(tp, locale)}
              </p>
            ))}
          </div>
          <p className="micro-label text-ink/40 mt-1 group-hover:text-ink transition-colors">{t(S.read, locale)} →</p>
        </Link>
      </div>

      <style jsx global>{`
        @media (min-width: 768px) {
          .bb-hero-film {
            -webkit-mask-image: linear-gradient(to right, transparent 0%, #000 6%, #000 94%, transparent 100%), linear-gradient(to bottom, transparent 0%, #000 5%, #000 95%, transparent 100%);
            -webkit-mask-composite: source-in;
            mask-image: linear-gradient(to right, transparent 0%, #000 6%, #000 94%, transparent 100%), linear-gradient(to bottom, transparent 0%, #000 5%, #000 95%, transparent 100%);
            mask-composite: intersect;
          }
        }
        @keyframes bb-focus { 0% { transform: scale(.6); opacity: .9 } 100% { transform: scale(1.5); opacity: 0 } }
        @keyframes bb-wheel { 0% { transform: translateY(0); opacity: 1 } 70% { transform: translateY(10px); opacity: 0 } 100% { transform: translateY(0); opacity: 0 } }
      `}</style>
    </section>
  )
}
