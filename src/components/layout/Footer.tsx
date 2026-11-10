'use client'
/**
 * Footer — cloud video band + BRAND BANGLADESH wordmark + links + newsletter.
 * footer.mp4 plays looped, muted. Mouse parallax on the band.
 * Pause control for accessibility.
 */

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { gsap } from '@/lib/gsap'
import { ui, t, num, type L } from '@/lib/i18n'
import { PILLARS } from '@/content/pillars'

import { useSubmit, isEmail } from '@/components/forms/useSubmit'

const LABELS = {
  discover: { en: 'Discover', bn: 'আবিষ্কার' },
  pillars: { en: 'Pillars', bn: 'স্তম্ভ' },
  help: { en: 'Help', bn: 'সহায়তা' },
  newsletter: { en: 'Newsletter', bn: 'নিউজলেটার' },
  newsletterBody: { en: 'The monthly magazine and Brand Bangladesh stories, in your inbox.', bn: 'মাসিক ম্যাগাজিন ও ব্র্যান্ড বাংলাদেশের গল্প, আপনার ইনবক্সে।' },
  subscribed: { en: 'Subscribed — see you next month.', bn: 'সাবস্ক্রাইব হয়েছে — আগামী মাসে দেখা হবে।' },
  rights: { en: 'Brand Bangladesh. All rights reserved.', bn: 'ব্র্যান্ড বাংলাদেশ। সর্বস্বত্ব সংরক্ষিত।' },
  tagline: { en: 'A nation of rivers and resilience — told every month.', bn: 'নদী ও সহনশীলতার দেশ — প্রতি মাসে নতুন গল্পে।' },
  play: { en: '▶ Play', bn: '▶ চালান' },
  pause: { en: '⏸ Pause', bn: '⏸ থামান' },
}

export function Footer({ locale = 'en' }: { locale?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const bandRef = useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = useState(false)
  const [email, setEmail] = useState('')
  const [err, setErr] = useState('')
  const { state, submit } = useSubmit('newsletter')

  useEffect(() => {
    const band = bandRef.current
    if (!band) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.matchMedia('(pointer: coarse)').matches) return

    const onMove = (e: MouseEvent) => {
      const rx = (e.clientX / window.innerWidth - 0.5) * 16
      const ry = (e.clientY / window.innerHeight - 0.5) * 8
      gsap.to(band, { x: rx, y: ry, duration: 1, ease: 'power2.out' })
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  const togglePause = () => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) { video.play(); setIsPaused(false) }
    else { video.pause(); setIsPaused(true) }
  }

  const b = `/${locale}`
  const groups: { title: L; items: { label: L | string; href: string }[] }[] = [
    {
      title: LABELS.discover,
      items: [
        { label: ui.nav.story, href: `${b}/story` },
        { label: ui.nav.regions, href: `${b}/regions` },
        { label: ui.nav.numbers, href: `${b}/numbers` },
        { label: ui.nav.publication, href: `${b}/publication` },
        { label: ui.nav.community, href: `${b}/community` },
      ],
    },
    { title: LABELS.pillars, items: PILLARS.map((p) => ({ label: p.name, href: `${b}/pillars/${p.slug}` })) },
    {
      title: LABELS.help,
      items: [
        { label: ui.nav.about, href: `${b}/about` },
        { label: { en: 'Contact & Inquiries', bn: 'যোগাযোগ ও জিজ্ঞাসা' }, href: `${b}/contact` },
        { label: { en: 'FAQ', bn: 'সাধারণ প্রশ্ন' }, href: `${b}/faq` },
        { label: { en: 'Press Room & Media Kit', bn: 'প্রেস রুম ও মিডিয়া কিট' }, href: `${b}/publication/press` },
        { label: ui.search, href: `${b}/search` },
      ],
    },
  ]

  const legal = [
    { label: { en: 'Privacy', bn: 'গোপনীয়তা' }, href: `${b}/legal/privacy` },
    { label: { en: 'Terms', bn: 'শর্তাবলি' }, href: `${b}/legal/terms` },
    { label: { en: 'Accessibility', bn: 'প্রবেশযোগ্যতা' }, href: `${b}/legal/accessibility` },
    { label: { en: 'Content Usage', bn: 'কনটেন্ট ব্যবহার' }, href: `${b}/legal/content-usage` },
    { label: { en: 'Photo credits', bn: 'ছবির কৃতজ্ঞতা' }, href: `${b}/credits` },
  ]

  const onSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!isEmail(email)) { setErr(t(ui.invalidEmail, locale)); return }
    setErr('')
    const website = (e.currentTarget.elements.namedItem('website') as HTMLInputElement)?.value
    await submit({ email, locale, source: 'footer', website })
  }

  return (
    <footer className="bg-cream" role="contentinfo" aria-label="Brand Bangladesh footer">
      {/* Cloud video band */}
      <div className="relative overflow-hidden" style={{ height: 'min(50vh, 400px)' }}>
        <div ref={bandRef} className="absolute inset-0" style={{ willChange: 'transform' }}>
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            src="/assets/footer.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            aria-hidden="true"
          />
        </div>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, #FBFAF7 0%, transparent 25%, transparent 75%, #FBFAF7 100%)' }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to right, transparent 60%, #FBFAF7 100%)' }}
          aria-hidden="true"
        />
        <button
          className="absolute top-4 right-4 micro-label text-ink/40 hover:text-ink/80 transition-colors"
          onClick={togglePause}
          aria-label={isPaused ? 'Play footer video' : 'Pause footer video'}
        >
          {t(isPaused ? LABELS.play : LABELS.pause, locale)}
        </button>
      </div>

      <div className="px-6 md:px-10 lg:px-16 pt-16 pb-12">
        {/* Wordmark — the theme's own Cormorant wordmark, one line, measured size */}
        <div className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b border-ink/[0.08] pb-8">
          <p
            className="font-cormorant text-ink leading-none tracking-tight whitespace-nowrap"
            style={{ fontSize: 'clamp(2.2rem, 5.2vw, 4.4rem)' }}
            aria-label="Brand Bangladesh"
          >
            BRAND BANGLADESH
          </p>
          <p className="font-cormorant italic text-lg md:text-xl text-ink/50 md:text-right md:pb-2">
            {t(LABELS.tagline, locale)}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {groups.map((g) => (
            <div key={g.title.en}>
              <p className="micro-label mb-4">{t(g.title, locale)}</p>
              <ul className="space-y-3" role="list">
                {g.items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="font-inter text-sm text-ink/50 hover:text-ink transition-colors duration-200">
                      {t(item.label, locale)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div className="col-span-2 md:col-span-1">
            <p className="micro-label mb-4">{t(LABELS.newsletter, locale)}</p>
            <p className="font-inter text-xs text-ink/50 mb-4 leading-relaxed">{t(LABELS.newsletterBody, locale)}</p>
            {state === 'done' ? (
              <p role="status" className="font-inter text-xs text-teal">{t(LABELS.subscribed, locale)}</p>
            ) : (
              <form onSubmit={onSubscribe} className="relative" aria-label="Newsletter sign up" noValidate>
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="flex-1 min-w-0 font-inter text-xs bg-transparent border border-ink/20 rounded px-3 py-2 focus:border-teal outline-none transition-colors"
                    aria-label="Email address"
                    aria-invalid={!!err}
                  />
                  <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
                  <button
                    type="submit"
                    disabled={state === 'sending'}
                    className="font-inter text-xs uppercase tracking-label px-3 py-2 bg-ink text-cream rounded hover:bg-ink/80 transition-colors disabled:opacity-50"
                    aria-label="Subscribe"
                  >
                    →
                  </button>
                </div>
                {(err || state === 'error') && (
                  <p className="font-inter text-xs text-red mt-2" role="alert">{err || t(ui.genericError, locale)}</p>
                )}
              </form>
            )}
          </div>
        </div>

        <div className="rule-thin mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="font-inter text-xs text-ink/30">
            © {num(new Date().getFullYear(), locale)} {t(LABELS.rights, locale)}
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2" role="list">
            {legal.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="font-inter text-xs text-ink/40 hover:text-ink/80 transition-colors">
                  {t(l.label, locale)}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex gap-6">
            {['Facebook', 'Instagram', 'X', 'YouTube', 'LinkedIn'].map((social) => (
              <a
                key={social}
                href="#"
                className="font-inter text-xs text-ink/30 hover:text-ink/70 transition-colors uppercase tracking-label"
                aria-label={`Brand Bangladesh on ${social}`}
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
