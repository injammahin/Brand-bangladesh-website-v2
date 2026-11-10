'use client'
/**
 * Division landing page (BRD 5.4.2–5.4.3) — magazine-style, animated:
 * hero map · facts strip · landscape + locator · must-see bento · "Life in" tabs ·
 * stories · districts · plan your visit · previous / next divisions.
 */

import { useState } from 'react'
import Link from 'next/link'
import { useMotionInit } from '@/hooks/useMotionInit'
import { useScrollSlides } from '@/hooks/useScrollSlides'
import { DivisionHero } from '@/components/sections/divisions/DivisionHero'
import { DivisionLocator } from '@/components/sections/divisions/DivisionLocator'
import { Counter } from '@/components/motion/Counter'
import { Stagger } from '@/components/motion/Stagger'
import { ParallaxImg } from '@/components/motion/ParallaxImg'
import { StoryCard } from '@/components/page/Blocks'
import { REGIONS, DISTRICT_BN, districtSlug } from '@/content/regions'
import { REGION_EXTRA } from '@/content/regionsExtra'
import { ARTICLES } from '@/content/articles'
import { STATS } from '@/content/stats'
import { getPillar } from '@/content/pillars'
import { ph } from '@/content/photos'
import { t, num, ui, type L } from '@/lib/i18n'

interface Division {
  slug: string
  name: L
  accent: string
  districtCount: number
  districts: string[]
}

interface Props {
  division: Division
  locale: string
  prev: { slug: string; name: L; accent: string } | null
  next: { slug: string; name: L; accent: string } | null
}

const S = {
  population: { en: 'Population', bn: 'জনসংখ্যা' },
  census: { en: 'BBS Census 2022', bn: 'বিবিএস শুমারি ২০২২' },
  districts: { en: 'Districts', bn: 'জেলা' },
  hq: { en: 'Divisional HQ', bn: 'বিভাগীয় সদর' },
  rivers: { en: 'Major rivers', bn: 'প্রধান নদী' },
  best: { en: 'Best time to visit', bn: 'ভ্রমণের সেরা সময়' },
  landscape: { en: 'The land', bn: 'ভূপ্রকৃতি' },
  where: { en: 'Where it is', bn: 'অবস্থান' },
  mustSee: { en: 'Must-see', bn: 'অবশ্যই দেখুন' },
  mustSeeTitle: { en: 'Places worth the journey', bn: 'যে জায়গাগুলো দেখতেই হবে' },
  photoNote: { en: 'Photos: Wikimedia Commons — see Photo credits.', bn: 'ছবি: উইকিমিডিয়া কমন্স — ছবির কৃতজ্ঞতা দেখুন।' },
  life: { en: 'Life here', bn: 'এখানকার জীবন' },
  lifeIn: { en: 'Life in', bn: 'জীবনযাত্রা —' },
  economy: { en: 'Economy', bn: 'অর্থনীতি' },
  culture: { en: 'Culture', bn: 'সংস্কৃতি' },
  food: { en: 'Food', bn: 'খাবার' },
  people: { en: 'People', bn: 'মানুষ' },
  stories: { en: 'Stories from here', bn: 'এখানকার গল্প' },
  districtsN: { en: 'districts to discover', bn: 'টি জেলা ঘুরে দেখার' },
  plan: { en: 'Plan your visit', bn: 'ভ্রমণের পরিকল্পনা' },
  getting: { en: 'Getting there', bn: 'যেভাবে যাবেন' },
  numbers: { en: 'In numbers', bn: 'সংখ্যায়' },
  pillars: { en: 'Related pillars', bn: 'সংশ্লিষ্ট স্তম্ভ' },
  tourism: { en: 'Ask our tourism desk', bn: 'পর্যটন ডেস্কে জিজ্ঞাসা' },
  share: { en: 'Share a story from here', bn: 'এখানকার একটি গল্প বলুন' },
  prev: { en: 'Previous division', bn: 'আগের বিভাগ' },
  next: { en: 'Next division', bn: 'পরের বিভাগ' },
}

const pad = (n: number) => String(n).padStart(2, '0')

function Folio({ n, label, accent, locale }: { n: number; label: L; accent: string; locale: string }) {
  return (
    <div className="flex items-center gap-4 mb-5">
      <span className="font-cormorant text-lg text-ink/40">{num(pad(n), locale)}</span>
      <span className="h-px w-8" style={{ backgroundColor: accent }} />
      <p className="micro-label" style={{ color: 'rgba(16,20,20,.6)' }}>{t(label, locale)}</p>
    </div>
  )
}

export function DivisionPageClient({ division, locale, prev, next }: Props) {
  useMotionInit()
  useScrollSlides()
  const r = REGIONS[division.slug]
  const x = REGION_EXTRA[division.slug]
  const accent = division.accent
  const b = `/${locale}`
  const name = t(division.name, locale)
  const stories = ARTICLES.filter((a) => a.region === division.slug)
  const stats = STATS.filter((s) => s.region === division.slug)
  const tabs = [
    { label: S.economy, body: [r.economy], photo: x.life[0] },
    { label: S.culture, body: [r.culture], photo: x.life[1] },
    { label: S.food, body: r.food, photo: x.life[2] },
    { label: S.people, body: r.people, photo: x.life[3] },
  ]
  const [tab, setTab] = useState(0)
  const cur = tabs[tab]
  let n = 0

  return (
    <main id="main-content" tabIndex={-1} className="bg-cream pt-[64px] outline-none overflow-x-clip">
      <DivisionHero name={division.name} accent={accent} intro={r.intro} districtCount={division.districtCount} reliefImage={r.photo} heroImage={r.photo} locale={locale} />

      {/* Facts strip */}
      <section className="px-6 md:px-10 lg:px-16 pb-8" aria-label={t(S.population, locale)}>
        <Stagger className="grid grid-cols-2 lg:grid-cols-5 border-y border-ink/10">
          <div className="p-5 md:p-7 border-r border-ink/10">
            <p className="micro-label mb-3" style={{ color: 'rgba(16,20,20,.5)' }}>{t(S.population, locale)}</p>
            <p className="font-cormorant text-[2.6rem] leading-none text-ink">
              <Counter to={Math.round(x.population / 1e5) / 10} decimals={1} suffix={t({ en: 'M', bn: ' মিলিয়ন' }, locale)} locale={locale} />
            </p>
            <p className="font-inter text-[11px] text-ink/40 mt-2">{t(ui.source, locale)}: {t(S.census, locale)}</p>
          </div>
          <div className="p-5 md:p-7 lg:border-r border-ink/10">
            <p className="micro-label mb-3" style={{ color: 'rgba(16,20,20,.5)' }}>{t(S.districts, locale)}</p>
            <p className="font-cormorant text-[2.6rem] leading-none text-ink"><Counter to={division.districtCount} locale={locale} /></p>
          </div>
          <div className="p-5 md:p-7 border-r border-t lg:border-t-0 border-ink/10">
            <p className="micro-label mb-3" style={{ color: 'rgba(16,20,20,.5)' }}>{t(S.hq, locale)}</p>
            <p className="font-cormorant text-[2rem] leading-none text-ink">{t(x.hq, locale)}</p>
          </div>
          <div className="p-5 md:p-7 border-t lg:border-t-0 lg:border-r border-ink/10">
            <p className="micro-label mb-3" style={{ color: 'rgba(16,20,20,.5)' }}>{t(S.rivers, locale)}</p>
            <p className="font-cormorant text-xl leading-snug text-ink">{x.rivers.map((rv) => t(rv, locale)).join(' · ')}</p>
          </div>
          <div className="col-span-2 lg:col-span-1 p-5 md:p-7 border-t lg:border-t-0 border-ink/10">
            <p className="micro-label mb-3" style={{ color: 'rgba(16,20,20,.5)' }}>{t(S.best, locale)}</p>
            <p className="font-inter text-sm leading-relaxed text-ink/75">{t(x.best, locale)}</p>
          </div>
        </Stagger>
      </section>

      {/* The land + locator */}
      <section className="px-6 md:px-10 lg:px-16 py-20 md:py-28 grid lg:grid-cols-[1.45fr_1fr] gap-14 items-center">
        <div data-slide="left">
          <Folio n={++n} label={S.landscape} accent={accent} locale={locale} />
          <p className="font-cormorant text-[clamp(2rem,3.6vw,3.3rem)] leading-[1.15] text-ink">{t(r.landscape, locale)}</p>
          <p className="font-inter text-base text-ink/60 leading-relaxed mt-6 max-w-xl">{t(r.intro, locale)}</p>
        </div>
        <figure data-slide="right" className="relative mx-auto w-full max-w-[320px]">
          <DivisionLocator slug={division.slug} accent={accent} label={`${name} — ${t(S.where, locale)}`} />
          <figcaption className="micro-label text-center mt-3" style={{ color: 'rgba(16,20,20,.45)' }}>{t(S.where, locale)}</figcaption>
        </figure>
      </section>

      {/* Must-see bento */}
      <section className="px-6 md:px-10 lg:px-16 py-20 md:py-24 bg-[#F5EFE5]">
        <header data-slide="left" className="mb-10">
          <Folio n={++n} label={S.mustSee} accent={accent} locale={locale} />
          <h2 className="font-cormorant text-ink leading-[1.02] tracking-tight text-[clamp(2.2rem,4vw,3.6rem)]">{t(S.mustSeeTitle, locale)}</h2>
        </header>
        <Stagger className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 md:h-[640px]">
          {r.attractions.map((a, i) => {
            const key = x.attractionPhotos[i]
            const size = i === 0 ? 'md:col-span-2 md:row-span-2 h-[340px]' : i === 3 ? 'md:col-span-2 h-[220px]' : 'h-[220px]'
            return (
              <div key={a.en} className={`group relative overflow-hidden rounded-2xl md:h-auto ${size} ${key ? 'shadow-[0_24px_48px_-30px_rgba(16,20,20,.5)]' : 'bg-cream border border-ink/[0.08]'}`}>
                {key ? (
                  <>
                    <div className="absolute inset-0 transition-transform duration-1000 ease-expo-out group-hover:scale-105"><ParallaxImg src={ph(key, i === 0 ? 1920 : 960)} amount={14} /></div>
                    <span className="absolute left-4 bottom-4 z-[3] inline-flex items-center gap-3 rounded-full bg-cream/95 backdrop-blur px-4 py-2 shadow-sm">
                      <span className="font-cormorant text-base" style={{ color: accent }}>{num(pad(i + 1), locale)}</span>
                      <span className="font-cormorant text-xl text-ink leading-none">{t(a, locale)}</span>
                    </span>
                  </>
                ) : (
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <span className="absolute top-3 right-5 font-cormorant leading-none text-transparent text-[6.5rem]" style={{ WebkitTextStroke: `1px ${accent}88` }} aria-hidden="true">{num(pad(i + 1), locale)}</span>
                    <span className="h-[3px] w-10 rounded-full mb-4 transition-all duration-700 group-hover:w-20" style={{ backgroundColor: accent }} />
                    <p className="font-cormorant text-[1.9rem] leading-tight text-ink">{t(a, locale)}</p>
                  </div>
                )}
              </div>
            )
          })}
        </Stagger>
        <p className="font-inter text-[11px] text-ink/40 mt-4"><Link href={`${b}/credits`} className="hover:text-ink">{t(S.photoNote, locale)}</Link></p>
      </section>

      {/* Life in … — tabs */}
      <section className="px-6 md:px-10 lg:px-16 py-20 md:py-28">
        <header data-slide="left">
          <Folio n={++n} label={S.life} accent={accent} locale={locale} />
          <h2 className="font-cormorant text-ink leading-[1.02] tracking-tight text-[clamp(2.2rem,4vw,3.6rem)]">{t(S.lifeIn, locale)} {name}</h2>
        </header>
        <div role="tablist" aria-label={t(S.life, locale)} className="flex flex-wrap gap-2 mt-8 mb-10">
          {tabs.map((tb, i) => (
            <button
              key={tb.label.en}
              role="tab"
              aria-selected={i === tab}
              onClick={() => setTab(i)}
              className={`relative font-inter text-xs uppercase tracking-label px-5 py-2.5 rounded-full border transition-all duration-300 ${i === tab ? 'bg-ink text-cream border-ink' : 'border-ink/15 text-ink/60 hover:border-ink/40 hover:text-ink'}`}
            >
              {t(tb.label, locale)}
            </button>
          ))}
        </div>
        <div className="grid lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-16 items-center" role="tabpanel">
          <div className="group relative aspect-[4/3] rounded-2xl overflow-hidden shadow-[0_30px_60px_-34px_rgba(16,20,20,.55)]" data-slide="left">
            {tabs.map((tb, i) => (
              <img
                key={tb.photo + i}
                src={ph(tb.photo, 1920)}
                alt=""
                loading="lazy"
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-[900ms] ease-expo-out ${i === tab ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`}
              />
            ))}
            <span className="absolute left-4 bottom-4 z-[3] micro-label bg-cream/95 px-3 py-1.5 rounded-full" style={{ color: 'rgba(16,20,20,.7)' }}>{t(cur.label, locale)}</span>
          </div>
          <div key={tab} className="animate-[bb-tab-in_.7s_cubic-bezier(.16,1,.3,1)_both]">
            <p className="font-cormorant text-[5.5rem] leading-none text-transparent mb-2" style={{ WebkitTextStroke: `1px ${accent}` }} aria-hidden="true">{num(pad(tab + 1), locale)}</p>
            <h3 className="font-cormorant text-[clamp(2rem,3.2vw,2.8rem)] text-ink mb-5">{t(cur.label, locale)}</h3>
            {cur.body.length === 1 ? (
              <p className="font-inter text-lg text-ink/65 leading-relaxed max-w-lg">{t(cur.body[0], locale)}</p>
            ) : (
              <ul className="space-y-4">
                {cur.body.map((it) => (
                  <li key={it.en} className="flex items-center gap-4 font-cormorant text-2xl md:text-[1.7rem] text-ink">
                    <span className="w-2.5 h-2.5 rotate-45 shrink-0" style={{ backgroundColor: accent }} />{t(it, locale)}
                  </li>
                ))}
              </ul>
            )}
            <div className="flex gap-2 mt-10">
              <button onClick={() => setTab((tab + tabs.length - 1) % tabs.length)} className="w-11 h-11 rounded-full border border-ink/20 hover:bg-ink hover:text-cream transition-colors" aria-label="Previous">←</button>
              <button onClick={() => setTab((tab + 1) % tabs.length)} className="w-11 h-11 rounded-full border border-ink/20 hover:bg-ink hover:text-cream transition-colors" aria-label="Next">→</button>
            </div>
          </div>
        </div>
        <style jsx global>{`@keyframes bb-tab-in { from { opacity: 0; transform: translateX(32px) } to { opacity: 1; transform: none } }`}</style>
      </section>

      {/* Stories */}
      {stories.length > 0 && (
        <section className="px-6 md:px-10 lg:px-16 py-20 md:py-24 bg-[#F5EFE5]">
          <header data-slide="left" className="mb-10"><Folio n={++n} label={S.stories} accent={accent} locale={locale} /></header>
          <Stagger className="grid md:grid-cols-3 gap-6">
            {stories.map((a) => {
              const p = getPillar(a.pillar)!
              return <StoryCard key={a.slug} href={`${b}/articles/${a.slug}`} image={a.image} accent={p.color} label={t(p.name, locale)} title={t(a.title, locale)} excerpt={t(a.excerpt, locale)} />
            })}
          </Stagger>
        </section>
      )}

      {/* Districts */}
      <section className="px-6 md:px-10 lg:px-16 py-20 md:py-28" aria-label={t(S.districts, locale)}>
        <header data-slide="left" className="mb-10">
          <Folio n={++n} label={S.districts} accent={accent} locale={locale} />
          <h2 className="font-cormorant text-ink leading-[1.02] tracking-tight text-[clamp(2.2rem,4vw,3.6rem)]">{num(division.districtCount, locale)} {t(S.districtsN, locale)}</h2>
        </header>
        <Stagger className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {division.districts.map((d, i) => (
            <Link key={d} href={`${b}/divisions/${division.slug}/${districtSlug(d)}`} className="group relative flex items-center justify-between rounded-xl border border-ink/[0.08] bg-cream px-5 py-4 overflow-hidden">
              <span className="absolute inset-0 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-expo-out" style={{ backgroundColor: `${accent}22` }} aria-hidden="true" />
              <span className="relative flex items-baseline gap-3">
                <span className="font-cormorant text-sm text-ink/40">{num(pad(i + 1), locale)}</span>
                <span className="font-cormorant text-xl text-ink">{locale === 'bn' ? DISTRICT_BN[d] ?? d : d}</span>
              </span>
              <span className="relative text-ink/30 transition-all duration-300 group-hover:text-ink group-hover:translate-x-1" aria-hidden="true">→</span>
            </Link>
          ))}
        </Stagger>
      </section>

      {/* Plan your visit */}
      <section className="px-6 md:px-10 lg:px-16 py-20 md:py-24 bg-[#F5EFE5]">
        <header data-slide="left" className="mb-10">
          <Folio n={++n} label={S.plan} accent={accent} locale={locale} />
        </header>
        <Stagger className="grid md:grid-cols-3 gap-4">
          <div className="rounded-2xl bg-cream border border-ink/[0.07] p-7">
            <p className="text-2xl mb-4" aria-hidden="true">✈</p>
            <p className="micro-label mb-3" style={{ color: 'rgba(16,20,20,.5)' }}>{t(S.getting, locale)}</p>
            <p className="font-cormorant text-[1.6rem] leading-snug text-ink">{t(x.travel, locale)}</p>
          </div>
          <div className="rounded-2xl bg-cream border border-ink/[0.07] p-7">
            <p className="text-2xl mb-4" aria-hidden="true">☀</p>
            <p className="micro-label mb-3" style={{ color: 'rgba(16,20,20,.5)' }}>{t(S.best, locale)}</p>
            <p className="font-cormorant text-[1.6rem] leading-snug text-ink">{t(x.best, locale)}</p>
          </div>
          <div className="rounded-2xl bg-cream border border-ink/[0.07] p-7">
            <p className="micro-label mb-4" style={{ color: 'rgba(16,20,20,.5)' }}>{stats.length ? t(S.numbers, locale) : t(S.pillars, locale)}</p>
            {stats.length > 0 ? (
              <ul className="space-y-4">
                {stats.slice(0, 2).map((s) => (
                  <li key={s.id}>
                    <p className="font-cormorant text-[2.2rem] leading-none text-ink">{s.prefix}{num(s.value.toLocaleString('en-US'), locale)}{t(s.suffix, locale)}</p>
                    <p className="font-inter text-xs text-ink/55 mt-1">{t(s.label, locale)} · {s.source}, {num(s.year, locale)}</p>
                  </li>
                ))}
              </ul>
            ) : null}
            <div className="flex flex-wrap gap-2 mt-5">
              {r.pillars.map((ps) => {
                const p = getPillar(ps)!
                return (
                  <Link key={ps} href={`${b}/pillars/${ps}`} className="inline-flex items-center gap-2 border border-ink/15 rounded-full pl-3 pr-4 py-1.5 hover:border-ink/50 transition-colors">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
                    <span className="font-inter text-xs text-ink/70">{t(p.name, locale)}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        </Stagger>
        <div className="flex flex-wrap gap-3 mt-8" data-slide="left">
          <Link href={`${b}/contact?category=tourism`} className="inline-flex items-center gap-2 font-inter text-xs uppercase tracking-label px-6 py-3 rounded-full bg-ink text-cream hover:bg-teal transition-colors">{t(S.tourism, locale)} →</Link>
          <Link href={`${b}/community#share`} className="inline-flex items-center gap-2 font-inter text-xs uppercase tracking-label px-6 py-3 rounded-full border border-ink/20 text-ink/75 hover:bg-ink hover:text-cream transition-colors">{t(S.share, locale)}</Link>
        </div>
      </section>

      {/* Previous / next — typographic, so it sits calmly above the footer film */}
      <nav className="px-6 md:px-10 lg:px-16 py-14" aria-label="Navigate between divisions">
        <div className="max-w-[1320px] mx-auto grid grid-cols-2 border-y border-ink/10">
          {[prev && { d: prev, label: S.prev, right: false }, next && { d: next, label: S.next, right: true }].map((it, i) =>
            it ? (
              <Link
                key={it.d.slug}
                href={`${b}/divisions/${it.d.slug}`}
                className={`group flex flex-col gap-2 py-8 md:py-10 ${it.right ? 'items-end text-right pl-6 border-l border-ink/10' : 'pr-6'}`}
              >
                <span className="micro-label flex items-center gap-2" style={{ color: 'rgba(16,20,20,.5)' }}>
                  {!it.right && <span className="inline-block transition-transform duration-500 group-hover:-translate-x-1.5">←</span>}
                  {t(it.label, locale)}
                  {it.right && <span className="inline-block transition-transform duration-500 group-hover:translate-x-1.5">→</span>}
                </span>
                <span className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: it.d.accent }} />
                  <span className="font-cormorant text-[clamp(2rem,4vw,3.4rem)] leading-none text-ink transition-colors duration-300 group-hover:text-teal">{t(it.d.name, locale)}</span>
                </span>
              </Link>
            ) : <div key={i} className={i ? 'border-l border-ink/10' : ''} />,
          )}
        </div>
      </nav>
    </main>
  )
}
