'use client'
import { useEffect, useRef, useState } from 'react'
import { gsap } from '@/lib/gsap'
import { Page, PageHero, Section, PillLink, CtaBand, FramedImage, UpNext, BrandStripe, WARM } from '@/components/page/Blocks'
import { Reveal } from '@/components/motion/Reveal'
import { Stagger } from '@/components/motion/Stagger'
import { CHAPTERS, TIMELINE, VALUES, BRAND_PROMISE } from '@/content/story'
import { latestIssue, issueKey } from '@/content/issues'
import { t, num } from '@/lib/i18n'

const S = {
  label: { en: 'The Brand Story', bn: 'ব্র্যান্ড গল্প' },
  title: { en: 'Who Bangladesh is, and where it is heading', bn: 'বাংলাদেশ কে, আর কোথায় চলেছে' },
  intro: { en: 'Five chapters on the land, the history, the people, the economy and the future of a nation born of rivers.', bn: 'নদী থেকে জন্ম নেওয়া এক জাতির মাটি, ইতিহাস, মানুষ, অর্থনীতি ও ভবিষ্যৎ নিয়ে পাঁচটি অধ্যায়।' },
  m1: { en: '5 chapters', bn: '৫টি অধ্যায়' },
  m2: { en: '8 min read', bn: '৮ মিনিটের পাঠ' },
  m3: { en: 'Brand film', bn: 'ব্র্যান্ড চলচ্চিত্র' },
  contents: { en: 'In this story', bn: 'এই গল্পে' },
  chapter: { en: 'Chapter', bn: 'অধ্যায়' },
  film: { en: 'The Brand Film', bn: 'ব্র্যান্ড চলচ্চিত্র' },
  filmTitle: { en: 'Bangladesh, in three minutes', bn: 'তিন মিনিটে বাংলাদেশ' },
  filmBody: { en: 'Rivers at dawn, looms at noon, cities at night — the flagship film follows one day across the delta. Captions in English and Bangla.', bn: 'ভোরের নদী, দুপুরের তাঁত, রাতের শহর — ব-দ্বীপজুড়ে একটি দিনের গল্প বলে এই প্রধান চলচ্চিত্র। ইংরেজি ও বাংলা ক্যাপশনসহ।' },
  play: { en: 'Play film', bn: 'চলচ্চিত্র চালান' },
  timeline: { en: 'Timeline', bn: 'সময়রেখা' },
  timelineTitle: { en: 'Milestones of a nation', bn: 'একটি জাতির মাইলফলক' },
  essence: { en: 'Brand essence', bn: 'ব্র্যান্ডের সারকথা' },
  values: { en: 'What we stand for', bn: 'আমরা যা ধারণ করি' },
  kit: { en: 'For partners & media', bn: 'অংশীদার ও গণমাধ্যমের জন্য' },
  kitTitle: { en: 'Brand guidelines & logo kit', bn: 'ব্র্যান্ড নির্দেশিকা ও লোগো কিট' },
  kitBody: { en: 'Download approved logos and read how to use the Brand Bangladesh identity correctly.', bn: 'অনুমোদিত লোগো ডাউনলোড করুন এবং ব্র্যান্ড বাংলাদেশ পরিচিতির সঠিক ব্যবহার জানুন।' },
  logo: { en: 'Download logo (PNG)', bn: 'লোগো ডাউনলোড (PNG)' },
  guidelines: { en: 'Usage guidelines', bn: 'ব্যবহার নির্দেশিকা' },
  media: { en: 'Media kit', bn: 'মিডিয়া কিট' },
}


export function StoryView({ locale }: { locale: string }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const b = `/${locale}`
  const issue = latestIssue()

  useEffect(() => {
    const el = trackRef.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    // Ghost chapter numerals drift faster than the page — layered depth
    const ghosts = gsap.utils.toArray<HTMLElement>('[data-ghost]').map((g) =>
      gsap.fromTo(g, { y: 90 }, { y: -90, ease: 'none', scrollTrigger: { trigger: g.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } }))
    const ctx = gsap.context(() => {
      gsap.from(el.querySelectorAll('[data-tl-item]'), {
        y: 30, opacity: 0, duration: 0.8, stagger: 0.06, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%' },
      })
    }, el)
    // Chapters: image glides in from its side, text from the other — scrubbed, so scrolling up reverses it
    const slides = gsap.utils.toArray<HTMLElement>('[data-ch-grid]').flatMap((grid) => {
      const [img, text] = Array.from(grid.children) as HTMLElement[]
      const dir = grid.dataset.chGrid === 'right' ? 1 : -1
      const wide = window.innerWidth >= 768
      const st = { trigger: grid, start: 'top 92%', end: 'top 38%', scrub: 1.2 }
      return [
        gsap.fromTo(img, { x: (wide ? 220 : 60) * dir, opacity: 0, rotate: 2 * dir }, { x: 0, opacity: 1, rotate: 0, ease: 'power2.out', scrollTrigger: st }),
        gsap.fromTo(text, { x: (wide ? -220 : -60) * dir, opacity: 0 }, { x: 0, opacity: 1, ease: 'power2.out', scrollTrigger: { ...st } }),
      ]
    })
    return () => { ctx.revert(); [...ghosts, ...slides].forEach((tw) => { tw.scrollTrigger?.kill(); tw.revert(); tw.kill() }) }
  }, [])

  const scrollTl = (dir: number) => trackRef.current?.scrollBy({ left: dir * 300, behavior: 'smooth' })
  const play = () => { setPlaying(true); requestAnimationFrame(() => videoRef.current?.play()) }

  return (
    <Page>
      <PageHero
        locale={locale}
        label={t(S.label, locale)}
        title={t(S.title, locale)}
        intro={t(S.intro, locale)}
        image="/assets/map.jpg"
        accent="#479E90"
        meta={[t(S.m1, locale), t(S.m2, locale), t(S.m3, locale)]}
      />

      {/* Contents — magazine-style chapter strip */}
      <nav aria-label={t(S.contents, locale)} className="px-6 md:px-10 lg:px-16 -mt-6 relative z-10">
        <p className="micro-label text-ink/40 mb-3">{t(S.contents, locale)}</p>
        <Stagger as="ol" className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {CHAPTERS.map((c, i) => (
            <li key={c.id}>
              <a href={`#${c.id}`} className="group flex items-center gap-3 rounded-xl bg-cream border border-ink/[0.07] p-2 pr-3 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-18px_rgba(16,20,20,.4)]">
                <span className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0">
                  <img src={c.image} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </span>
                <span className="min-w-0">
                  <span className="block font-cormorant text-sm" style={{ color: VALUES[i % VALUES.length].color }}>{num(String(i + 1).padStart(2, '0'), locale)}</span>
                  <span className="block font-inter text-xs text-ink/70 leading-snug truncate">{t(c.title, locale)}</span>
                </span>
              </a>
            </li>
          ))}
        </Stagger>
      </nav>

      {/* Chapters */}
      {CHAPTERS.map((c, i) => {
        const color = VALUES[i % VALUES.length].color
        const flip = i % 2 === 1
        return (
          <section
            key={c.id}
            id={c.id}
            className="relative px-6 md:px-10 lg:px-16 py-14 md:py-20 scroll-mt-20 overflow-hidden"
            style={flip ? { backgroundColor: WARM } : undefined}
            aria-labelledby={`ch-${c.id}`}
          >
            <span
              aria-hidden="true"
              data-ghost
              className="pointer-events-none select-none absolute -top-2 right-4 md:right-10 font-cormorant leading-none text-transparent"
              style={{ fontSize: 'clamp(6rem, 12vw, 10rem)', WebkitTextStroke: `1px ${color}66` }}
            >
              {num(String(i + 1).padStart(2, '0'), locale)}
            </span>

            <div data-ch-grid={flip ? 'right' : 'left'} className={`relative max-w-6xl mx-auto grid gap-10 lg:gap-20 items-center ${flip ? 'md:grid-cols-[1fr_300px] lg:grid-cols-[1fr_320px] md:[&>*:first-child]:order-2' : 'md:grid-cols-[300px_1fr] lg:grid-cols-[320px_1fr]'}`}>
              <FramedImage src={c.image} color={color} flip={flip} caption={t(c.kicker, locale)} className="w-full max-w-[320px] mx-auto" />

              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-[3px] rounded-full" style={{ backgroundColor: color }} />
                  <p className="micro-label" style={{ color }}>{t(S.chapter, locale)} {num(i + 1, locale)} / {num(CHAPTERS.length, locale)}</p>
                </div>
                <h2 id={`ch-${c.id}`} className="font-cormorant text-[clamp(2rem,3.6vw,3.2rem)] text-ink leading-[1.05] tracking-tight mb-5">{t(c.title, locale)}</h2>
                <Reveal>
                  <p className="font-inter text-base text-ink/65 leading-relaxed max-w-xl first-letter:font-cormorant first-letter:text-5xl first-letter:float-left first-letter:mr-2 first-letter:leading-[0.85] first-letter:text-ink">
                    {t(c.body, locale)}
                  </p>
                </Reveal>
                {c.fact && (
                  <div className="mt-8 inline-flex items-center gap-5 rounded-xl border border-ink/[0.07] bg-cream pl-5 pr-6 py-4 shadow-[0_14px_30px_-20px_rgba(16,20,20,.45)]">
                    <span className="font-cormorant text-[2.4rem] leading-none" style={{ color }}>{t(c.fact.value, locale)}</span>
                    <span className="h-10 w-px bg-ink/10" aria-hidden="true" />
                    <span className="font-inter text-xs text-ink/60 leading-snug max-w-[200px]">{t(c.fact.label, locale)}</span>
                  </div>
                )}
                {c.quote && (
                  <blockquote className="relative mt-8 pl-6 max-w-lg">
                    <span className="absolute -left-1 -top-4 font-cormorant text-6xl leading-none" style={{ color }} aria-hidden="true">“</span>
                    <p className="font-cormorant text-2xl md:text-[1.75rem] text-teal italic leading-snug">{t(c.quote, locale).replace(/[“”"]/g, '')}</p>
                  </blockquote>
                )}
              </div>
            </div>
          </section>
        )
      })}

      {/* Brand film */}
      <Section index={1} label={t(S.film, locale)} title={t(S.filmTitle, locale)} intro={t(S.filmBody, locale)} accent="#EF1551">
        <div className="relative w-full" data-slide="right" data-slide-distance="120">
          <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-2xl bg-pink/15" aria-hidden="true" />
          <div className="relative w-full aspect-video lg:aspect-[21/9] rounded-2xl overflow-hidden bg-ink shadow-[0_30px_60px_-30px_rgba(16,20,20,.6)]">
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              src="/assets/hero.mp4"
              controls={playing}
              playsInline
              preload="metadata"
              poster="/assets/map.jpg"
              aria-label={t(S.filmTitle, locale)}
            >
              <track kind="captions" srcLang="en" label="English" src="/captions/brand-film.en.vtt" default={locale === 'en'} />
              <track kind="captions" srcLang="bn" label="বাংলা" src="/captions/brand-film.bn.vtt" default={locale === 'bn'} />
            </video>
            {!playing && (
              <button onClick={play} className="group absolute inset-0 flex items-center justify-center bg-gradient-to-t from-ink/50 via-transparent to-transparent" aria-label={t(S.play, locale)}>
                <span className="relative flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full bg-cream/95 shadow-xl transition-transform duration-500 group-hover:scale-110">
                  <span className="absolute inset-0 rounded-full border border-cream/60 animate-ping" />
                  <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true"><path d="M6 3l13 8-13 8z" fill="#101414" /></svg>
                </span>
                <span className="absolute bottom-5 left-6 micro-label text-cream">{t(S.play, locale)} · 3:00</span>
              </button>
            )}
          </div>
        </div>
      </Section>

      {/* Timeline */}
      <Section
        index={2}
        tone="warm"
        label={t(S.timeline, locale)}
        title={t(S.timelineTitle, locale)}
        accent="#F68421"
        action={
          <div className="flex gap-2">
            <button onClick={() => scrollTl(-1)} className="w-11 h-11 rounded-full border border-ink/20 hover:bg-ink hover:text-cream transition-colors" aria-label="Previous milestones">←</button>
            <button onClick={() => scrollTl(1)} className="w-11 h-11 rounded-full border border-ink/20 hover:bg-ink hover:text-cream transition-colors" aria-label="Next milestones">→</button>
          </div>
        }
      >
        <div className="relative">
          <div className="absolute left-0 right-0 top-[22px] h-px bg-ink/15" aria-hidden="true" />
          <div
            ref={trackRef}
            className="relative flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            tabIndex={0}
            role="list"
            aria-label={t(S.timelineTitle, locale)}
            data-lenis-prevent
          >
            {TIMELINE.map((m, i) => {
              const color = ['#DF1A23', '#F68421', '#016171', '#A5CD2F', '#EF1551', '#479E90'][i % 6]
              return (
                <div key={m.year} role="listitem" data-tl-item className="snap-start shrink-0 w-[220px] md:w-[250px]">
                  <span className="relative z-10 block w-[13px] h-[13px] ml-5 mt-4 mb-5 rounded-full ring-4 ring-[#F5EFE5]" style={{ backgroundColor: color }} />
                  <div className="h-full rounded-xl bg-cream border border-ink/[0.07] p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_36px_-22px_rgba(16,20,20,.4)]">
                    <p className="font-cormorant text-3xl tracking-tight mb-2" style={{ color }}>{num(m.year, locale)}</p>
                    <p className="font-inter text-sm text-ink/65 leading-relaxed">{t(m.title, locale)}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </Section>

      {/* Brand essence */}
      <Section index={3} label={t(S.essence, locale)} accent="#479E90">
        <figure data-slide="up" className="relative max-w-4xl mx-auto text-center mb-14">
          <span className="absolute left-1/2 -translate-x-1/2 -top-10 font-cormorant text-[7rem] leading-none text-gold/30" aria-hidden="true">“</span>
          <blockquote className="relative font-cormorant text-[clamp(1.7rem,3.2vw,2.8rem)] text-teal leading-[1.2] italic">{t(BRAND_PROMISE, locale)}</blockquote>
          <BrandStripe width="w-20" className="mx-auto mt-8" />
        </figure>
        <p className="micro-label text-center text-ink/45 mb-6">{t(S.values, locale)}</p>
        <Stagger className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {VALUES.map((v, i) => (
            <div key={v.title.en} className="group relative overflow-hidden rounded-xl p-6 border border-ink/[0.06] transition-all duration-500 hover:-translate-y-1" style={{ background: `linear-gradient(160deg, ${v.color}1f 0%, #FBFAF7 70%)` }}>
              <span className="absolute -right-2 -bottom-6 font-cormorant text-[6rem] leading-none text-transparent" style={{ WebkitTextStroke: `1px ${v.color}55` }} aria-hidden="true">{num(i + 1, locale)}</span>
              <div className="h-[3px] w-10 rounded-full mb-6" style={{ backgroundColor: v.color }} />
              <h3 className="relative font-cormorant text-3xl text-ink mb-2">{t(v.title, locale)}</h3>
              <p className="relative font-inter text-sm text-ink/60 leading-relaxed">{t(v.body, locale)}</p>
            </div>
          ))}
        </Stagger>
      </Section>

      <CtaBand label={t(S.kit, locale)} title={t(S.kitTitle, locale)} body={t(S.kitBody, locale)}>
        <a href="/assets/brand/logo-full.png" download className="inline-flex items-center gap-2 font-inter text-xs uppercase tracking-label px-5 py-2.5 rounded-full bg-ink text-cream hover:bg-teal transition-all duration-300">
          {t(S.logo, locale)} ↓
        </a>
        <PillLink href={`${b}/legal/content-usage`}>{t(S.guidelines, locale)}</PillLink>
        <PillLink href={`${b}/publication/press`}>{t(S.media, locale)}</PillLink>
      </CtaBand>

      <UpNext
        locale={locale}
        items={[
          { href: `${b}/pillars`, label: t({ en: 'Brand Pillars', bn: 'ব্র্যান্ড স্তম্ভ' }, locale), title: t({ en: 'Six ways the world meets Bangladesh', bn: 'ছয় পথে বিশ্ব বাংলাদেশকে চেনে' }, locale), image: '/assets/Tourism/coxs-bazar.png', color: '#479E90' },
          { href: `${b}/regions`, label: t({ en: 'Regions', bn: 'অঞ্চল' }, locale), title: t({ en: 'Explore the eight divisions', bn: 'আট বিভাগ ঘুরে দেখুন' }, locale), image: '/assets/sylhet.jpg', color: '#F68421' },
          { href: `${b}/publication/${issueKey(issue)}`, label: t({ en: 'This month', bn: 'এই মাসে' }, locale), title: t(issue.title, locale), image: issue.cover ?? '/assets/map.jpg', color: '#EF1551' },
        ]}
      />
    </Page>
  )
}
