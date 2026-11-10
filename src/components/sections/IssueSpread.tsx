'use client'
/**
 * IssueSpread — "This month" opening spread.
 * Left: the cover in 3D (tilts toward the pointer) on a stack of pages, with a rotating issue seal.
 * Right: issue title, editor's note, contents list with a floating photo preview on hover.
 */
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { gsap } from '@/lib/gsap'
import { latestIssue, issueKey, THEMES } from '@/content/issues'
import { ARTICLES } from '@/content/articles'
import { getPillar } from '@/content/pillars'
import { ph } from '@/content/photos'
import { t, num, monthName, type L } from '@/lib/i18n'

const S = {
  label: { en: 'This month', bn: 'এই মাসে' },
  note: { en: "Editor's note", bn: 'সম্পাদকের কথা' },
  contents: { en: 'In this issue', bn: 'এই সংখ্যায়' },
  print: { en: 'In print', bn: 'মুদ্রিত সংস্করণে' },
  read: { en: 'Read online', bn: 'অনলাইনে পড়ুন' },
  pdf: { en: 'Download PDF', bn: 'পিডিএফ' },
  order: { en: 'Order the print copy', bn: 'মুদ্রিত কপি অর্ডার' },
  seal: { en: 'BRAND BANGLADESH · THE MONTHLY MAGAZINE · ', bn: 'ব্র্যান্ড বাংলাদেশ · মাসিক ম্যাগাজিন · ' },
}
const PREVIEW_POOL = ['sundriv_0', 'sunddeer_0', 'fisher_3', 'riversun']

export function IssueSpread({ locale = 'en' }: { locale?: string }) {
  const issue = latestIssue()
  const b = `/${locale}`
  const [y, m] = issue.date.split('-').map(Number)
  const items: { title: L; tag: L; href: string; image: string; color: string }[] = [
    ...issue.articles.map((slug) => ARTICLES.find((a) => a.slug === slug)).filter((a): a is NonNullable<typeof a> => !!a).map((a) => {
      const p = getPillar(a.pillar)!
      return { title: a.title, tag: p.name, href: `${b}/articles/${a.slug}`, image: a.image, color: p.color }
    }),
    ...issue.toc.map((x, i) => ({ title: x, tag: S.print, href: `${b}/publication/${issueKey(issue)}#reader`, image: ph(PREVIEW_POOL[i % PREVIEW_POOL.length], 960), color: '#D9AA66' })),
  ]

  const card = useRef<HTMLDivElement>(null)
  const list = useRef<HTMLOListElement>(null)
  const preview = useRef<HTMLDivElement>(null)
  const [hover, setHover] = useState<number | null>(null)

  // Cover tilt toward the pointer
  const onTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    const rx = ((e.clientY - r.top) / r.height - 0.5) * -10
    const ry = ((e.clientX - r.left) / r.width - 0.5) * 14
    gsap.to(card.current, { rotateX: rx, rotateY: ry, duration: 0.6, ease: 'power3.out' })
  }
  const resetTilt = () => gsap.to(card.current, { rotateX: 0, rotateY: -6, duration: 0.9, ease: 'power3.out' })

  // Floating preview follows the pointer inside the contents list
  useEffect(() => {
    const el = list.current, pv = preview.current
    if (!el || !pv || window.matchMedia('(pointer: coarse)').matches) return
    const xTo = gsap.quickTo(pv, 'x', { duration: 0.5, ease: 'power3.out' })
    const yTo = gsap.quickTo(pv, 'y', { duration: 0.5, ease: 'power3.out' })
    const move = (e: MouseEvent) => { const r = el.getBoundingClientRect(); xTo(e.clientX - r.left + 28); yTo(e.clientY - r.top - 120) }
    el.addEventListener('mousemove', move)
    return () => el.removeEventListener('mousemove', move)
  }, [])

  return (
    <section className="relative bg-cream px-6 md:px-10 lg:px-16 py-24 md:py-32 overflow-hidden" aria-label={t(S.label, locale)}>
      {/* Folio */}
      <div className="flex items-center gap-4 border-b border-ink/10 pb-4" data-slide="left">
        <span className="font-cormorant text-lg text-ink/40">01</span>
        <span className="h-px w-8 bg-gold" />
        <p className="micro-label">{t(S.label, locale)}</p>
        <p className="micro-label text-ink/40 ml-auto">№ {num(issue.number, locale)} · {monthName(m, locale)} {num(y, locale)}</p>
      </div>

      <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-16 lg:gap-24 items-center mt-16">
        {/* Cover */}
        <div className="relative mx-auto w-full max-w-[420px]" style={{ perspective: '1400px' }} onMouseMove={onTilt} onMouseLeave={resetTilt} data-slide="left">
          <div ref={card} className="relative" style={{ transformStyle: 'preserve-3d', transform: 'rotateY(-6deg)' }}>
            <div className="absolute inset-0 rounded-md bg-[#efe9df] border border-ink/10" style={{ transform: 'translate3d(20px,16px,-40px)' }} aria-hidden="true" />
            <div className="absolute inset-0 rounded-md bg-[#f5f0e8] border border-ink/10" style={{ transform: 'translate3d(10px,8px,-20px)' }} aria-hidden="true" />
            <Link href={`${b}/publication/${issueKey(issue)}`} className="relative block aspect-[0.707] rounded-md overflow-hidden shadow-[0_40px_80px_-30px_rgba(16,20,20,.55)]">
              <img src={issue.cover ?? ph('sund_2')} alt={t(issue.title, locale)} className="w-full h-full object-cover" />
              <span className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/0 to-white/25 pointer-events-none" />
            </Link>
          </div>
          {/* Rotating seal */}
          <div className="absolute -top-10 -right-6 md:-right-12 w-32 h-32 md:w-36 md:h-36" aria-hidden="true">
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full animate-[spin_22s_linear_infinite]">
              <defs><path id="seal" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" /></defs>
              <circle cx="100" cy="100" r="98" fill="#FBFAF7" stroke="#D9AA66" strokeWidth="1" />
              <text fontSize="14" letterSpacing="3" fill="#101414" fontFamily="var(--font-inter), var(--font-hind-siliguri)">
                <textPath href="#seal">{t(S.seal, locale).repeat(2)}</textPath>
              </text>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="micro-label text-[9px] text-ink/50">№</span>
              <span className="font-cormorant text-4xl leading-none text-ink">{num(issue.number, locale)}</span>
            </div>
          </div>
        </div>

        {/* Text */}
        <div className="relative">
          <span
            className="pointer-events-none select-none absolute -top-24 right-0 font-cormorant leading-none text-transparent hidden md:block"
            style={{ fontSize: 'clamp(9rem,20vw,18rem)', WebkitTextStroke: '1px rgba(217,170,102,.35)' }}
            aria-hidden="true"
          >
            {num(issue.number, locale)}
          </span>
          <div data-slide="right" className="relative">
            <p className="micro-label mb-4" style={{ color: issue.color }}>{t(THEMES[issue.theme], locale)}</p>
            <h2 className="font-cormorant text-ink leading-[0.98] tracking-tight text-[clamp(2.8rem,5.6vw,5.4rem)] mb-8">{t(issue.title, locale)}</h2>
            <p className="micro-label text-ink/40 mb-2">{t(S.note, locale)}</p>
            <p className="font-cormorant italic text-[1.35rem] md:text-[1.5rem] text-ink/75 leading-snug max-w-xl mb-10">{t(issue.editorsNote, locale)}</p>
          </div>

          <p className="micro-label text-ink/40 mb-3">{t(S.contents, locale)}</p>
          <div className="relative">
          <ol ref={list} className="relative border-t border-ink/10" onMouseLeave={() => setHover(null)}>
            {items.map((it, i) => (
              <li key={i} className="border-b border-ink/10" onMouseEnter={() => setHover(i)}>
                <Link href={it.href} className="group flex items-baseline gap-5 py-4">
                  <span className="font-cormorant text-lg w-7 shrink-0" style={{ color: it.color }}>{num(String(i + 1).padStart(2, '0'), locale)}</span>
                  <span className="font-cormorant text-[1.5rem] md:text-[1.75rem] leading-tight text-ink flex-1 transition-transform duration-500 ease-expo-out group-hover:translate-x-2">{t(it.title, locale)}</span>
                  <span className="micro-label text-ink/40 hidden sm:block">{t(it.tag, locale)}</span>
                  <span className="text-ink/30 transition-all duration-500 group-hover:text-ink group-hover:translate-x-1" aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ol>
            {/* hover preview */}
            <div ref={preview} className="pointer-events-none absolute left-0 top-0 z-20 hidden md:block w-56 aspect-[4/5] rounded-lg overflow-hidden shadow-2xl transition-[opacity,transform] duration-300" style={{ opacity: hover === null ? 0 : 1, scale: hover === null ? '0.85' : '1' }} aria-hidden="true">
              {items.map((it, i) => (
                <img key={i} src={it.image} alt="" className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300" style={{ opacity: hover === i ? 1 : 0 }} />
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mt-10">
            <Link href={`${b}/publication/${issueKey(issue)}#reader`} className="inline-flex items-center gap-2 font-inter text-xs uppercase tracking-label px-6 py-3 rounded-full bg-ink text-cream hover:bg-teal transition-colors">{t(S.read, locale)} →</Link>
            <Link href={`${b}/publication/${issueKey(issue)}#get`} className="inline-flex items-center gap-2 font-inter text-xs uppercase tracking-label px-6 py-3 rounded-full border border-ink/20 text-ink/75 hover:bg-ink hover:text-cream transition-colors">{t(S.pdf, locale)}</Link>
            <Link href={`${b}/contact?category=print&issue=${issue.number}`} className="inline-flex items-center gap-2 font-inter text-xs uppercase tracking-label px-6 py-3 rounded-full border border-ink/20 text-ink/75 hover:bg-ink hover:text-cream transition-colors">{t(S.order, locale)}</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
