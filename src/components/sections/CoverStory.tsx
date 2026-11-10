'use client'
/**
 * CoverStory — this month's lead feature, laid out like a magazine opening spread:
 * framed photo, kicker, headline, standfirst, byline, and an "Also in this issue" column.
 */
import Link from 'next/link'
import { ImageReveal } from '@/components/motion/ImageReveal'
import { Parallax } from '@/components/motion/Parallax'
import { ParallaxImg } from '@/components/motion/ParallaxImg'
import { Stagger } from '@/components/motion/Stagger'
import { Reveal } from '@/components/motion/Reveal'
import { SplitHeading } from '@/components/motion/SplitHeading'
import { latestIssue, issueKey } from '@/content/issues'
import { ARTICLES } from '@/content/articles'
import { getPillar } from '@/content/pillars'
import { t, num, date, ui } from '@/lib/i18n'

const S = {
  label: { en: 'Cover story', bn: 'প্রচ্ছদ প্রতিবেদন' },
  issue: { en: 'Issue', bn: 'সংখ্যা' },
  read: { en: 'Read the story', bn: 'গল্পটি পড়ুন' },
  also: { en: 'Also in the magazine', bn: 'ম্যাগাজিনে আরও' },
  all: { en: 'Browse every issue', bn: 'সব সংখ্যা দেখুন' },
}

export function CoverStory({ locale = 'en' }: { locale?: string }) {
  const issue = latestIssue()
  const lead = ARTICLES.find((a) => a.slug === issue.articles[0]) ?? ARTICLES[0]
  const pillar = getPillar(lead.pillar)!
  const more = ARTICLES.filter((a) => a.slug !== lead.slug).slice(0, 4)
  const b = `/${locale}`

  return (
    <section className="relative bg-cream px-6 md:px-10 lg:px-16 py-20 md:py-28" aria-label={t(S.label, locale)}>
      {/* Section masthead */}
      <div className="flex items-center gap-4 mb-12 border-b border-ink/10 pb-4">
        <div className="flex h-[3px] w-16 rounded-full overflow-hidden" aria-hidden="true">
          {['#DF1A23', '#F68421', '#FECB02', '#016171', '#A5CD2F', '#EF1551'].map((c) => <span key={c} className="flex-1" style={{ backgroundColor: c }} />)}
        </div>
        <p className="micro-label">{t(S.label, locale)}</p>
        <p className="micro-label text-ink/40 ml-auto">{t(S.issue, locale)} {num(issue.number, locale)} · {date(issue.date, locale)}</p>
      </div>

      <div className="grid lg:grid-cols-[1.55fr_1fr] gap-12 lg:gap-16">
        {/* Lead */}
        <article className="grid md:grid-cols-[1.1fr_1fr] gap-8 md:gap-10 items-center">
          <Link href={`${b}/articles/${lead.slug}`} className="group relative block" data-slide="left" data-cursor="view">
            <Parallax speed={-0.6} className="absolute inset-0 translate-x-4 translate-y-4"><div className="w-full h-full rounded-xl" style={{ backgroundColor: `${pillar.color}30` }} aria-hidden="true" /></Parallax>
            <ImageReveal className="relative aspect-[4/5] rounded-xl overflow-hidden shadow-[0_30px_60px_-30px_rgba(16,20,20,.55)]">
              <div className="absolute inset-0 transition-transform duration-1000 group-hover:scale-105"><ParallaxImg src={lead.image} alt={t(lead.title, locale)} amount={20} /></div>
            </ImageReveal>
            <span className="absolute top-4 left-4 micro-label bg-cream/90 backdrop-blur px-3 py-1 rounded-full" style={{ color: pillar.color }}>{t(pillar.name, locale)}</span>
          </Link>
          <div data-slide="right">
            <p className="micro-label mb-4" style={{ color: pillar.color }}>{t(issue.title, locale)}</p>
            <SplitHeading as="h2" className="font-cormorant text-ink leading-[1.05] tracking-tight text-[clamp(2.1rem,3.6vw,3.3rem)] mb-5">
              {t(lead.title, locale)}
            </SplitHeading>
            <Reveal>
              <p className="font-inter text-base text-ink/65 leading-relaxed mb-6">{t(lead.excerpt, locale)}</p>
            </Reveal>
            {lead.quote && (
              <p className="font-cormorant italic text-xl text-teal leading-snug border-l-2 pl-4 mb-6" style={{ borderColor: pillar.color }}>
                {t(lead.quote, locale).replace(/[“”"]/g, '')}
              </p>
            )}
            <p className="micro-label text-ink/40 mb-6">{t(lead.author, locale)} · {num(lead.readMin, locale)} {t(ui.minRead, locale)}</p>
            <Link href={`${b}/articles/${lead.slug}`} className="inline-flex items-center gap-2 font-inter text-xs uppercase tracking-label px-5 py-2.5 rounded-full bg-ink text-cream hover:bg-teal transition-colors" data-cursor="link">
              {t(S.read, locale)} →
            </Link>
          </div>
        </article>

        {/* Also in the magazine */}
        <aside data-slide="right" className="lg:border-l lg:border-ink/10 lg:pl-12">
          <p className="micro-label text-ink/45 mb-5">{t(S.also, locale)}</p>
          <Stagger as="ol" className="divide-y divide-ink/10">
            {more.map((a, i) => {
              const p = getPillar(a.pillar)!
              return (
                <li key={a.slug}>
                  <Link href={`${b}/articles/${a.slug}`} className="group flex gap-4 py-4" data-cursor="view">
                    <span className="relative w-20 h-20 shrink-0 rounded-lg overflow-hidden">
                      <img src={a.image} alt="" loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    </span>
                    <span className="min-w-0">
                      <span className="block micro-label mb-1" style={{ color: p.color }}>{num(String(i + 2).padStart(2, '0'), locale)} · {t(p.name, locale)}</span>
                      <span className="block font-cormorant text-xl md:text-[1.4rem] text-ink leading-tight group-hover:text-teal transition-colors">{t(a.title, locale)}</span>
                    </span>
                  </Link>
                </li>
              )
            })}
          </Stagger>
          <Link href={`${b}/publication/${issueKey(issue)}`} className="inline-block micro-label text-ink/50 hover:text-ink mt-6" data-cursor="link">
            {t(S.all, locale)} →
          </Link>
        </aside>
      </div>
    </section>
  )
}
