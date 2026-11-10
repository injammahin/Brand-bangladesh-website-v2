'use client'
/**
 * GlanceNumbers — "Bangladesh in numbers": editorial grid of large counters, each with source + year,
 * beside a tall photo that drifts on scroll. Followed by ExploreDivisions (click map).
 */
import Link from 'next/link'
import { Counter } from '@/components/motion/Counter'
import { ParallaxImg } from '@/components/motion/ParallaxImg'
import { Stagger } from '@/components/motion/Stagger'
import { DivisionMap } from '@/components/sections/map/DivisionMap'
import { STATS } from '@/content/stats'
import { getPillar } from '@/content/pillars'
import { ph } from '@/content/photos'
import { t, num, ui } from '@/lib/i18n'

const PICK = ['population', 'exports', 'remittance', 'green-factories', 'sundarbans', 'heritage'].map((id) => STATS.find((s) => s.id === id)!)

const S = {
  label: { en: 'At a glance', bn: 'এক নজরে' },
  title: { en: 'Bangladesh in numbers', bn: 'সংখ্যায় বাংলাদেশ' },
  body: { en: 'Every figure carries its official source and year — and links to the story behind it.', bn: 'প্রতিটি সংখ্যার সঙ্গে সরকারি সূত্র ও বছর — আর তার পেছনের গল্পের লিংক।' },
  all: { en: 'All numbers & stories', bn: 'সব সংখ্যা ও গল্প' },
  caption: { en: 'The Padma at dusk', bn: 'সন্ধ্যার পদ্মা' },
  exLabel: { en: 'Explore', bn: 'ঘুরে দেখুন' },
  exTitle: { en: 'Eight divisions, one delta', bn: 'আট বিভাগ, এক ব-দ্বীপ' },
  exBody: { en: 'From tea hills in the north-east to mangroves on the coast — choose a division and step inside.', bn: 'উত্তর-পূর্বের চা-পাহাড় থেকে উপকূলের ম্যানগ্রোভ — একটি বিভাগ বেছে নিয়ে ভেতরে প্রবেশ করুন।' },
  regions: { en: 'All regions', bn: 'সব অঞ্চল' },
}

export function GlanceNumbers({ locale = 'en' }: { locale?: string }) {
  return (
    <section className="relative bg-cream px-6 md:px-10 lg:px-16 py-24 md:py-28" aria-label={t(S.title, locale)}>
      <div className="grid lg:grid-cols-[0.8fr_1.6fr] gap-12 lg:gap-16">
        <div className="flex flex-col" data-slide="left">
          <div className="flex items-center gap-4 mb-5">
            <span className="font-cormorant text-lg text-ink/40">04</span>
            <span className="h-px w-8 bg-gold" />
            <p className="micro-label">{t(S.label, locale)}</p>
          </div>
          <h2 className="font-cormorant text-ink leading-[1] tracking-tight text-[clamp(2.4rem,4.4vw,4.2rem)] mb-5">{t(S.title, locale)}</h2>
          <p className="font-inter text-base text-ink/60 leading-relaxed mb-8 max-w-sm">{t(S.body, locale)}</p>
          <figure className="relative hidden lg:block flex-1 min-h-[300px] rounded-xl overflow-hidden">
            <ParallaxImg src={ph('padma_2', 960)} amount={20} />
            <figcaption className="absolute bottom-3 left-3 micro-label bg-cream/90 px-2.5 py-1 rounded-full">{t(S.caption, locale)}</figcaption>
          </figure>
          <Link href={`/${locale}/numbers`} className="mt-6 micro-label text-ink/55 hover:text-ink transition-colors">{t(S.all, locale)} →</Link>
        </div>

        <Stagger className="grid sm:grid-cols-2 xl:grid-cols-3 border-t border-l border-ink/10">
          {PICK.map((s) => {
            const p = getPillar(s.pillar)!
            return (
              <Link
                key={s.id}
                href={s.story ? `/${locale}/articles/${s.story}` : `/${locale}/numbers?pillar=${s.pillar}`}
                className="group relative border-r border-b border-ink/10 p-6 md:p-8 min-h-[230px] flex flex-col transition-colors duration-500 hover:bg-[#F5EFE5]"
              >
                <span className="absolute top-0 left-0 h-[3px] w-0 group-hover:w-full transition-all duration-700 ease-expo-out" style={{ backgroundColor: p.color }} />
                <p className="micro-label mb-6" style={{ color: p.color }}>{t(p.name, locale)}</p>
                <p className="font-cormorant text-ink leading-none tracking-tight text-[clamp(2.6rem,4vw,3.8rem)] mb-3">
                  <Counter to={s.value} prefix={s.prefix} suffix={t(s.suffix, locale)} decimals={s.decimals ?? 0} locale={locale} />
                </p>
                <p className="font-inter text-sm text-ink/70 leading-snug mb-auto">{t(s.label, locale)}</p>
                <p className="font-inter text-[11px] text-ink/40 mt-5 flex justify-between gap-3">
                  <span>{t(ui.source, locale)}: {s.source}, {num(s.year, locale)}</span>
                  <span className="text-ink/30 group-hover:text-ink group-hover:translate-x-1 transition-all" aria-hidden="true">→</span>
                </p>
              </Link>
            )
          })}
        </Stagger>
      </div>
    </section>
  )
}

export function ExploreDivisions({ locale = 'en' }: { locale?: string }) {
  return (
    <section className="relative bg-[#F5EFE5] px-6 md:px-10 lg:px-16 py-24 md:py-28 overflow-hidden" aria-label={t(S.exTitle, locale)}>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10" data-slide="left">
        <div>
          <div className="flex items-center gap-4 mb-5">
            <span className="font-cormorant text-lg text-ink/40">05</span>
            <span className="h-px w-8 bg-gold" />
            <p className="micro-label">{t(S.exLabel, locale)}</p>
          </div>
          <h2 className="font-cormorant text-ink leading-[1] tracking-tight text-[clamp(2.4rem,4.4vw,4.2rem)] mb-4">{t(S.exTitle, locale)}</h2>
          <p className="font-inter text-base text-ink/60 leading-relaxed max-w-lg">{t(S.exBody, locale)}</p>
        </div>
        <p className="micro-label text-ink/35 md:text-right leading-loose">23.6850° N<br />90.3563° E</p>
      </div>
      <DivisionMap locale={locale} />
      <div className="mt-10"><Link href={`/${locale}/regions`} className="micro-label text-ink/55 hover:text-ink transition-colors">{t(S.regions, locale)} →</Link></div>
    </section>
  )
}
