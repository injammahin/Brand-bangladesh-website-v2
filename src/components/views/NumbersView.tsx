'use client'
import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { Page, PageHero, Section, Chips, UpNext } from '@/components/page/Blocks'
import { Counter } from '@/components/motion/Counter'
import { STATS, type Stat } from '@/content/stats'
import { PILLARS, getPillar } from '@/content/pillars'
import { ARTICLES } from '@/content/articles'
import divisions from '../../../data/divisions.json'
import { t, num, ui, type L } from '@/lib/i18n'

const S = {
  label: { en: 'Numbers & Stories', bn: 'সংখ্যা ও গল্প' },
  title: { en: 'Credible numbers, real people', bn: 'বিশ্বাসযোগ্য সংখ্যা, বাস্তব মানুষ' },
  intro: { en: 'Every figure carries its official source and reference year — and, wherever we can, the human story behind it.', bn: 'প্রতিটি সংখ্যার সঙ্গে আছে সরকারি সূত্র ও বছর — এবং যেখানে সম্ভব, তার পেছনের মানুষের গল্প।' },
  pillar: { en: 'Filter by pillar', bn: 'স্তম্ভ অনুযায়ী' },
  region: { en: 'Filter by region', bn: 'অঞ্চল অনুযায়ী' },
  national: { en: 'National', bn: 'জাতীয়' },
  story: { en: 'The story behind it', bn: 'এর পেছনের গল্প' },
  png: { en: 'Download PNG', bn: 'PNG ডাউনলোড' },
  none: { en: 'No figures match these filters yet.', bn: 'এই ফিল্টারে এখনো কোনো সংখ্যা নেই।' },
  library: { en: 'Statistics library', bn: 'পরিসংখ্যান ভান্ডার' },
}

/** Render a stat card to a 1200×1200 PNG — shareable infographic (BRD 5.6.4) */
async function downloadPng(s: Stat, locale: string) {
  const c = document.createElement('canvas')
  c.width = 1200; c.height = 1200
  const g = c.getContext('2d')!
  const p = getPillar(s.pillar)!
  await document.fonts.ready
  // next/font hashes family names — read the real stacks from the CSS variables
  const css = getComputedStyle(document.documentElement)
  const v = (n: string) => css.getPropertyValue(n).trim()
  const serif = `${v('--font-cormorant')}, ${v('--font-noto-bengali')}, Georgia, serif`
  const sans = `${v('--font-inter')}, ${v('--font-hind-siliguri')}, sans-serif`
  g.fillStyle = '#FBFAF7'; g.fillRect(0, 0, 1200, 1200)
  g.fillStyle = p.color; g.fillRect(0, 0, 1200, 16); g.fillRect(100, 180, 80, 3)
  g.fillStyle = p.color; g.font = `600 28px ${sans}`; g.fillText(t(p.name, locale).toUpperCase(), 100, 240)
  g.fillStyle = '#101414'; g.font = `500 220px ${serif}`
  g.fillText(`${s.prefix ?? ''}${num(s.value.toLocaleString('en-US'), locale)}${t(s.suffix, locale)}`, 92, 520)
  g.font = `500 56px ${serif}`; g.fillText(t(s.label, locale), 100, 620)
  // wrap context
  g.fillStyle = 'rgba(16,20,20,.6)'; g.font = `32px ${sans}`
  const words = t(s.context, locale).split(' '); let line = ''; let y = 720
  for (const w of words) {
    const test = line + w + ' '
    if (g.measureText(test).width > 1000) { g.fillText(line, 100, y); line = w + ' '; y += 48 } else line = test
  }
  g.fillText(line, 100, y)
  g.fillStyle = 'rgba(16,20,20,.45)'; g.font = `26px ${sans}`
  g.fillText(`${t(ui.source, locale)}: ${s.source}, ${num(s.year, locale)}`, 100, 1060)
  g.fillStyle = '#101414'; g.font = `600 30px ${serif}`; g.fillText('BRAND BANGLADESH', 100, 1120)
  const a = document.createElement('a')
  a.download = `brand-bangladesh-${s.id}-${locale}.png`
  a.href = c.toDataURL('image/png')
  a.click()
}

export function NumbersView({ locale }: { locale: string }) {
  const [pillar, setPillar] = useState<string>('all')
  const [region, setRegion] = useState<string>('all')

  useEffect(() => {
    const q = new URLSearchParams(window.location.search)
    if (q.get('pillar')) setPillar(q.get('pillar')!)
    if (q.get('region')) setRegion(q.get('region')!)
  }, [])

  const list = useMemo(() => STATS.filter((s) =>
    (pillar === 'all' || s.pillar === pillar) &&
    (region === 'all' || (region === 'national' ? !s.region : s.region === region)),
  ), [pillar, region])

  return (
    <Page>
      <PageHero locale={locale} label={t(S.label, locale)} title={t(S.title, locale)} intro={t(S.intro, locale)} image="/assets/stories/febric.jpg" accent="#D9AA66" />

      <Section index={1} tone="warm" label={t(S.library, locale)}>
        <div className="space-y-4 mb-12">
          <Chips label={t(S.pillar, locale)} value={pillar} onChange={setPillar}
            options={[{ value: 'all', label: t(ui.all, locale) }, ...PILLARS.map((p) => ({ value: p.slug as string, label: t(p.name, locale) }))]} />
          <Chips label={t(S.region, locale)} value={region} onChange={setRegion}
            options={[{ value: 'all', label: t(ui.all, locale) }, { value: 'national', label: t(S.national, locale) }, ...divisions.map((d) => ({ value: d.slug, label: t(d.name as L, locale) }))]} />
        </div>

        {list.length === 0 && <p className="font-inter text-sm text-ink/50">{t(S.none, locale)}</p>}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((s) => {
            const p = getPillar(s.pillar)!
            const story = s.story ? ARTICLES.find((a) => a.slug === s.story) : undefined
            return (
              <article key={s.id} className="relative overflow-hidden border border-ink/[0.07] rounded-xl p-6 flex flex-col bg-cream transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_-24px_rgba(16,20,20,.4)]">
                <span className="absolute inset-x-0 top-0 h-[3px]" style={{ backgroundColor: p.color }} />
                <div className="flex items-center justify-between mb-6">
                  <span className="flex items-center gap-2 micro-label" style={{ color: p.color }}>
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />{t(p.name, locale)}
                  </span>
                  {s.region && <span className="micro-label text-ink/35">{t(divisions.find((d) => d.slug === s.region)!.name as L, locale)}</span>}
                </div>
                <p className="font-cormorant text-display-sm text-ink leading-display tracking-tighter mb-2">
                  <Counter to={s.value} prefix={s.prefix} suffix={t(s.suffix, locale)} decimals={s.decimals ?? 0} locale={locale} />
                </p>
                <h3 className="font-cormorant text-2xl text-ink leading-heading mb-3">{t(s.label, locale)}</h3>
                <p className="font-inter text-sm text-ink/55 leading-relaxed mb-5 flex-1">{t(s.context, locale)}</p>
                <p className="font-inter text-[11px] text-ink/40 border-t border-ink/10 pt-3 mb-4">
                  {t(ui.source, locale)}: <strong className="font-medium text-ink/60">{s.source}</strong> · {num(s.year, locale)}
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  {story && (
                    <Link href={`/${locale}/articles/${story.slug}`} className="micro-label hover:opacity-70" style={{ color: p.color }}>
                      {t(S.story, locale)} →
                    </Link>
                  )}
                  <button onClick={() => downloadPng(s, locale)} className="micro-label text-ink/45 hover:text-ink ml-auto">
                    {t(S.png, locale)} ↓
                  </button>
                </div>
              </article>
            )
          })}
        </div>
      </Section>
      <UpNext locale={locale} items={[
          { href: `/${locale}/story`, label: t({ en: 'The Brand Story', bn: 'ব্র্যান্ড গল্প' }, locale), title: t({ en: 'Who Bangladesh is', bn: 'বাংলাদেশ কে' }, locale), image: '/assets/map.jpg', color: '#479E90' },
          { href: `/${locale}/regions`, label: t({ en: 'Regions', bn: 'অঞ্চল' }, locale), title: t({ en: 'Explore the eight divisions', bn: 'আট বিভাগ ঘুরে দেখুন' }, locale), image: '/assets/sylhet.jpg', color: '#F68421' },
          { href: `/${locale}/publication`, label: t({ en: 'Publication', bn: 'প্রকাশনা' }, locale), title: t({ en: 'This month’s magazine', bn: 'এই মাসের ম্যাগাজিন' }, locale), image: '/assets/magazine-covers/cover-1.jpg', color: '#016171' },
        ]} />
    </Page>
  )
}
