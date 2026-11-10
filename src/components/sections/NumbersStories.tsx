'use client'
/**
 * NumbersStories — "Bangladesh at a glance" counters + featured story grid.
 * Every figure shows its source and reference year (BRD 5.6.2).
 */

import Link from 'next/link'
import { Counter } from '@/components/motion/Counter'
import { ImageReveal } from '@/components/motion/ImageReveal'
import { ParallaxImg } from '@/components/motion/ParallaxImg'
import { Stagger } from '@/components/motion/Stagger'
import { SplitHeading } from '@/components/motion/SplitHeading'
import { STATS } from '@/content/stats'
import { ARTICLES } from '@/content/articles'
import { getPillar } from '@/content/pillars'
import { t, num, ui } from '@/lib/i18n'

const GLANCE = ['population', 'exports', 'remittance', 'districts'].map((id) => STATS.find((s) => s.id === id)!)
const FEATURED = ['the-fabric-of-the-world', 'sundarbans-the-living-delta', 'a-global-diaspora'].map((s) => ARTICLES.find((a) => a.slug === s)!)

const S = {
  label: { en: 'At a glance', bn: 'এক নজরে' },
  title: { en: 'Bangladesh in numbers', bn: 'সংখ্যায় বাংলাদেশ' },
  stories: { en: 'Stories', bn: 'গল্প' },
  all: { en: 'All numbers & stories', bn: 'সব সংখ্যা ও গল্প' },
}

export function NumbersStories({ locale = 'en' }: { locale?: string }) {
  return (
    <section id="numbers" className="bg-cream py-24 px-6 md:px-10 lg:px-16" aria-label="Bangladesh in numbers and stories">
      <div className="mb-16" data-slide="left">
        <p className="micro-label mb-3">{t(S.label, locale)}</p>
        <SplitHeading as="h2" className="font-cormorant text-display-md text-ink leading-display tracking-tighter max-w-lg">
          {t(S.title, locale)}
        </SplitHeading>
      </div>

      <Stagger className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24">
        {GLANCE.map((stat) => (
          <div key={stat.id}>
            <div className="rule-thin mb-4" />
            <p className="font-cormorant text-display-sm text-ink leading-display tracking-tighter">
              <Counter to={stat.value} prefix={stat.prefix} suffix={t(stat.suffix, locale)} decimals={stat.decimals ?? 0} duration={2} locale={locale} />
            </p>
            <p className="micro-label mt-2 text-ink/50">{t(stat.label, locale)}</p>
            <p className="font-inter text-[11px] text-ink/35 mt-1">{t(ui.source, locale)}: {stat.source}, {num(stat.year, locale)}</p>
          </div>
        ))}
      </Stagger>

      <div className="mb-12">
        <p className="micro-label mb-8">{t(S.stories, locale)}</p>
        <div className="grid md:grid-cols-3 gap-8">
          {FEATURED.map((story, i) => {
            const pillar = getPillar(story.pillar)!
            return (
              <article key={story.slug} className="group" data-slide={i === 0 ? 'left' : i === 2 ? 'right' : 'up'}>
                <Link href={`/${locale}/articles/${story.slug}`} data-cursor="view">
                  <ImageReveal delay={i * 0.08} className="relative w-full aspect-[4/3] mb-5 rounded-lg overflow-hidden bg-ink/5">
                    <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"><ParallaxImg src={story.image} amount={16} /></div>
                  </ImageReveal>
                  <div className="w-6 h-px mb-3" style={{ backgroundColor: pillar.color }} />
                  <p className="micro-label mb-2" style={{ color: pillar.color }}>{t(pillar.name, locale)}</p>
                  <h3 className="font-cormorant text-2xl text-ink leading-heading mb-3 group-hover:opacity-70 transition-opacity">
                    {t(story.title, locale)}
                  </h3>
                  <p className="font-inter text-xs text-ink/50 leading-relaxed">{t(story.excerpt, locale)}</p>
                </Link>
              </article>
            )
          })}
        </div>
      </div>

      <Link href={`/${locale}/numbers`} className="micro-label text-ink/50 hover:text-ink transition-colors" data-cursor="link">
        {t(S.all, locale)} →
      </Link>
    </section>
  )
}
