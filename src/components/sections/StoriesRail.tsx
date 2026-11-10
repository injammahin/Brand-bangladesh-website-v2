'use client'
/**
 * StoriesRail — features as a pinned horizontal gallery: scroll down, the stories travel sideways,
 * photos drift inside their frames. Mobile / reduced motion: native swipe with snap.
 */
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from '@/lib/gsap'
import { ARTICLES } from '@/content/articles'
import { getPillar } from '@/content/pillars'
import { t, num, ui } from '@/lib/i18n'

const S = {
  label: { en: 'Features', bn: 'ফিচার' },
  title: { en: 'Stories from the delta', bn: 'ব-দ্বীপের গল্প' },
  body: { en: 'Long reads from every corner of the country — the people, places and ideas behind the headlines.', bn: 'দেশের প্রতিটি প্রান্ত থেকে দীর্ঘ পাঠ — শিরোনামের পেছনের মানুষ, জায়গা আর ভাবনা।' },
  hint: { en: 'Keep scrolling', bn: 'স্ক্রল করতে থাকুন' },
  all: { en: 'Every story, every issue', bn: 'সব গল্প, সব সংখ্যা' },
  browse: { en: 'Browse the archive', bn: 'আর্কাইভ দেখুন' },
}

export function StoriesRail({ locale = 'en' }: { locale?: string }) {
  const sec = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const bar = useRef<HTMLDivElement>(null)
  const b = `/${locale}`

  useEffect(() => {
    const s = sec.current, tr = track.current
    if (!s || !tr) return
    const mm = gsap.matchMedia()
    mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
      const dist = () => tr.scrollWidth - window.innerWidth
      const tween = gsap.to(tr, {
        x: () => -dist(), ease: 'none',
        scrollTrigger: { trigger: s, start: 'top top', end: () => `+=${dist()}`, pin: true, scrub: 0.9, invalidateOnRefresh: true, anticipatePin: 1 },
      })
      gsap.fromTo(bar.current, { scaleX: 0 }, { scaleX: 1, ease: 'none', scrollTrigger: { trigger: s, start: 'top top', end: () => `+=${dist()}`, scrub: true, invalidateOnRefresh: true } })
      tr.querySelectorAll<HTMLElement>('[data-par]').forEach((img) => {
        gsap.fromTo(img, { xPercent: -9 }, {
          xPercent: 9, ease: 'none',
          scrollTrigger: { trigger: img.parentElement, containerAnimation: tween, start: 'left right', end: 'right left', scrub: true },
        })
      })
    })
    return () => mm.revert()
  }, [])

  return (
    <section ref={sec} className="relative bg-[#F5EFE5] overflow-hidden md:h-screen flex flex-col justify-center py-20 md:py-0" aria-label={t(S.title, locale)}>
      <div ref={track} className="flex items-center gap-6 md:gap-10 px-6 md:pl-16 md:pr-[12vw] overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden w-full md:w-max">
        {/* Intro panel */}
        <div className="shrink-0 w-[80vw] md:w-[32vw] md:max-w-[460px] snap-start pr-4">
          <div className="flex items-center gap-4 mb-6">
            <span className="font-cormorant text-lg text-ink/40">02</span>
            <span className="h-px w-8 bg-gold" />
            <p className="micro-label">{t(S.label, locale)}</p>
          </div>
          <h2 className="font-cormorant text-ink leading-[0.98] tracking-tight text-[clamp(2.6rem,5vw,4.8rem)] mb-6">{t(S.title, locale)}</h2>
          <p className="font-inter text-base text-ink/60 leading-relaxed mb-8 max-w-sm">{t(S.body, locale)}</p>
          <p className="hidden md:flex items-center gap-3 micro-label text-ink/45">
            {t(S.hint, locale)}
            <span className="relative w-10 h-px bg-ink/20 overflow-hidden"><span className="absolute inset-y-0 left-0 w-1/2 bg-ink/60 animate-[bb-slide-hint_1.6s_ease-in-out_infinite]" /></span>
          </p>
        </div>

        {ARTICLES.map((a, i) => {
          const p = getPillar(a.pillar)!
          const tall = i % 2 === 0
          return (
            <Link
              key={a.slug}
              href={`${b}/articles/${a.slug}`}
              className={`group shrink-0 snap-start w-[78vw] sm:w-[52vw] md:w-[27vw] md:min-w-[320px] md:max-w-[440px] ${tall ? '' : 'md:mt-24'}`}
            >
              <div className={`relative overflow-hidden rounded-xl bg-ink/5 ${tall ? 'aspect-[4/5]' : 'aspect-[1/1]'} shadow-[0_30px_60px_-34px_rgba(16,20,20,.55)]`}>
                <img data-par src={a.image} alt="" loading="lazy" className="absolute inset-y-0 -left-[10%] w-[120%] h-full object-cover transition-[filter] duration-700 group-hover:brightness-105" />
                <span className="absolute top-4 left-4 micro-label bg-cream/90 backdrop-blur px-3 py-1 rounded-full" style={{ color: p.color }}>{t(p.name, locale)}</span>
                <span className="absolute bottom-3 right-4 font-cormorant text-[4.5rem] leading-none text-cream/90 drop-shadow-[0_2px_12px_rgba(0,0,0,.35)]">{num(String(i + 1).padStart(2, '0'), locale)}</span>
              </div>
              <div className="pt-5">
                <h3 className="font-cormorant text-[1.7rem] md:text-[1.9rem] leading-[1.1] text-ink mb-2 group-hover:text-teal transition-colors">{t(a.title, locale)}</h3>
                <p className="font-inter text-sm text-ink/55 leading-relaxed line-clamp-2 mb-3">{t(a.excerpt, locale)}</p>
                <p className="micro-label text-ink/40">{num(a.readMin, locale)} {t(ui.minRead, locale)} <span className="inline-block transition-transform duration-500 group-hover:translate-x-1">→</span></p>
              </div>
            </Link>
          )
        })}

        {/* End panel */}
        <Link href={`${b}/publication`} className="group shrink-0 snap-start w-[70vw] md:w-[22vw] md:min-w-[280px] flex flex-col items-start justify-center gap-6">
          <span className="relative w-28 h-28 rounded-full border border-ink/20 flex items-center justify-center text-3xl text-ink transition-all duration-500 group-hover:bg-ink group-hover:text-cream group-hover:scale-105">→</span>
          <span className="font-cormorant text-[2.2rem] leading-tight text-ink">{t(S.all, locale)}</span>
          <span className="micro-label text-ink/50 group-hover:text-ink transition-colors">{t(S.browse, locale)}</span>
        </Link>
      </div>

      {/* Progress */}
      <div className="hidden md:block absolute left-16 right-16 bottom-10 h-px bg-ink/10" aria-hidden="true">
        <div ref={bar} className="h-full bg-ink/60 origin-left" style={{ transform: 'scaleX(0)' }} />
      </div>
      <style jsx global>{`@keyframes bb-slide-hint { 0% { transform: translateX(-100%) } 100% { transform: translateX(200%) } }`}</style>
    </section>
  )
}
