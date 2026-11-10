'use client'
import Link from 'next/link'
import { Page, PageHero, Section, StoryCard, PillLink, CtaBand, UpNext } from '@/components/page/Blocks'
import { ImageReveal } from '@/components/motion/ImageReveal'
import { ParallaxImg } from '@/components/motion/ParallaxImg'
import { Reveal } from '@/components/motion/Reveal'
import { PILLARS, getPillar } from '@/content/pillars'
import { ARTICLES } from '@/content/articles'
import { STATS } from '@/content/stats'
import { REGIONS } from '@/content/regions'
import divisions from '../../../data/divisions.json'
import { t, num, ui } from '@/lib/i18n'

const S = {
  label: { en: 'Brand Pillars', bn: 'ব্র্যান্ড স্তম্ভ' },
  title: { en: 'Six pillars, one nation', bn: 'ছয় স্তম্ভ, এক জাতি' },
  intro: { en: 'Tourism, Exports, Governance, Investment & Immigration, Culture & Heritage, and People — the six ways the world meets Bangladesh.', bn: 'পর্যটন, রপ্তানি, সুশাসন, বিনিয়োগ ও অভিবাসন, সংস্কৃতি ও ঐতিহ্য এবং মানুষ — বিশ্ব যে ছয় পথে বাংলাদেশকে চেনে।' },
  pillar: { en: 'Pillar', bn: 'স্তম্ভ' },
  facts: { en: 'Key facts', bn: 'মূল তথ্য' },
  topics: { en: 'Explore deeper', bn: 'আরও গভীরে' },
  stories: { en: 'Featured stories', bn: 'নির্বাচিত গল্প' },
  regions: { en: 'Connected regions', bn: 'সংশ্লিষ্ট অঞ্চল' },
  official: { en: 'Official portals', bn: 'সরকারি পোর্টাল' },
  numbers: { en: 'See the numbers', bn: 'সংখ্যাগুলো দেখুন' },
  other: { en: 'Other pillars', bn: 'অন্যান্য স্তম্ভ' },
}

export function PillarsIndexView({ locale }: { locale: string }) {
  return (
    <Page>
      <PageHero locale={locale} label={t(S.label, locale)} title={t(S.title, locale)} intro={t(S.intro, locale)} image="/assets/Tourism/sundarbans.png" imageClass="object-[center_88%]" meta={PILLARS.slice(0, 3).map((p) => t(p.name, locale))} />
      <section className="px-6 md:px-10 lg:px-16 py-14 md:py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PILLARS.map((p, i) => (
            <Link key={p.slug} href={`/${locale}/pillars/${p.slug}`} className="group block" data-cursor="view">
              <ImageReveal delay={(i % 3) * 0.08} className="relative w-full aspect-[5/6] rounded-xl overflow-hidden bg-ink/5 shadow-[0_24px_48px_-28px_rgba(16,20,20,.5)] transition-transform duration-500 group-hover:-translate-y-1">
                <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"><ParallaxImg src={p.image} amount={18} /></div>
                <div className="absolute inset-0 division-card-overlay" />
                <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${p.color}cc 0%, transparent 55%)` }} />
                <div className="absolute bottom-0 inset-x-0 p-6">
                  <p className="micro-label text-cream/70 mb-2">{num(String(i + 1).padStart(2, '0'), locale)} · {t(S.pillar, locale)}</p>
                  <h2 className="font-cormorant text-4xl text-cream leading-heading tracking-tight mb-2">{t(p.name, locale)}</h2>
                  <p className="font-inter text-sm text-cream/80 leading-relaxed max-w-xs">{t(p.hook, locale)}</p>
                </div>
              </ImageReveal>
            </Link>
          ))}
        </div>
      </section>
      <UpNext locale={locale} items={[
          { href: `/${locale}/story`, label: t({ en: 'The Brand Story', bn: 'ব্র্যান্ড গল্প' }, locale), title: t({ en: 'Who Bangladesh is', bn: 'বাংলাদেশ কে' }, locale), image: '/assets/map.jpg', color: '#479E90' },
          { href: `/${locale}/regions`, label: t({ en: 'Regions', bn: 'অঞ্চল' }, locale), title: t({ en: 'Explore the eight divisions', bn: 'আট বিভাগ ঘুরে দেখুন' }, locale), image: '/assets/sylhet.jpg', color: '#F68421' },
          { href: `/${locale}/numbers`, label: t({ en: 'Numbers & Stories', bn: 'সংখ্যা ও গল্প' }, locale), title: t({ en: 'Credible numbers, real people', bn: 'বিশ্বাসযোগ্য সংখ্যা, বাস্তব মানুষ' }, locale), image: '/assets/stories/febric.jpg', color: '#EF1551' },
        ]} />
    </Page>
  )
}

export function PillarView({ slug, locale }: { slug: string; locale: string }) {
  const p = getPillar(slug)!
  const stories = ARTICLES.filter((a) => a.pillar === p.slug)
  const stats = STATS.filter((s) => s.pillar === p.slug)
  const b = `/${locale}`
  const ctaHref =
    p.cta.category === 'reports' ? `${b}/publication/reports` :
    p.cta.category === 'publication' ? `${b}/publication` :
    p.cta.category === 'community' ? `${b}/community#share` :
    `${b}/contact?category=${p.cta.category}`

  return (
    <Page>
      <PageHero
        locale={locale}
        crumbs={[{ label: t(S.label, locale), href: `${b}/pillars` }, { label: t(p.name, locale) }]}
        label={t(S.pillar, locale)}
        title={t(p.name, locale)}
        intro={t(p.intro, locale)}
        image={p.image}
        accent={p.color}
      >
        <div className="mt-8"><PillLink href={ctaHref} dark>{t(p.cta.label, locale)}</PillLink></div>
      </PageHero>

      {/* Key facts */}
      <Section index={1} tone="warm" label={t(S.facts, locale)} accent={p.color}>
        <div className="grid sm:grid-cols-3 gap-8">
          {p.facts.map((f) => (
            <div key={f.label.en}>
              <div className="rule-thin mb-4" />
              <p className="font-cormorant text-[clamp(2.4rem,4vw,3.6rem)] leading-none tracking-tight" style={{ color: p.color }}>{t(f.value, locale)}</p>
              <p className="micro-label mt-2 text-ink/50">{t(f.label, locale)}</p>
              <p className="font-inter text-[11px] text-ink/35 mt-2">{t(ui.source, locale)}: {f.source}, {num(f.year, locale)}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Sub-topics */}
      <Section index={2} label={t(S.topics, locale)} title={t(p.hook, locale)} accent={p.color}>
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
          {p.subtopics.map((s, i) => (
            <Reveal key={s.title.en} delay={(i % 2) * 0.08}>
              <div className="flex gap-5" data-slide={i % 2 ? 'right' : 'left'}>
                <span className="font-cormorant text-2xl" style={{ color: p.color }}>{num(String(i + 1).padStart(2, '0'), locale)}</span>
                <div>
                  <h3 className="font-cormorant text-3xl text-ink mb-2">{t(s.title, locale)}</h3>
                  <p className="font-inter text-sm text-ink/55 leading-relaxed">{t(s.body, locale)}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Pillar-specific feature: seasonal guide / business setup steps */}
      {p.feature && (
        <Section index={3} tone="warm" label={t(p.feature.title, locale)} accent={p.color}>
          <ol className={`grid gap-4 ${p.feature.items.length > 3 ? 'md:grid-cols-5' : 'md:grid-cols-3'}`}>
            {p.feature.items.map((it) => (
              <li key={it.title.en} className="border border-ink/[0.07] rounded-xl p-6 bg-cream transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_18px_36px_-22px_rgba(16,20,20,.4)]">
                <div className="w-8 h-px mb-4" style={{ backgroundColor: p.color }} />
                <h3 className="font-cormorant text-2xl text-ink mb-3 leading-heading">{t(it.title, locale)}</h3>
                <p className="font-inter text-sm text-ink/55 leading-relaxed">{t(it.body, locale)}</p>
              </li>
            ))}
          </ol>
        </Section>
      )}

      {/* Featured stories */}
      {stories.length > 0 && (
        <Section index={4} label={t(S.stories, locale)} accent={p.color}>
          <div className="grid md:grid-cols-3 gap-8">
            {stories.map((a, i) => (
              <StoryCard key={a.slug} delay={i * 0.08} href={`${b}/articles/${a.slug}`} image={a.image} accent={p.color}
                label={t(p.name, locale)} title={t(a.title, locale)} excerpt={t(a.excerpt, locale)} />
            ))}
          </div>
        </Section>
      )}

      {/* Connected regions */}
      <Section index={5} tone="warm" label={t(S.regions, locale)} accent={p.color}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {p.regions.map((slug) => {
            const d = divisions.find((x) => x.slug === slug)!
            return (
              <Link key={slug} href={`${b}/divisions/${slug}`} className="group relative aspect-[4/3] rounded-xl overflow-hidden" data-cursor="view">
                <img src={REGIONS[slug].photo} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 division-card-overlay" />
                <div className="absolute bottom-0 p-4">
                  <div className="w-6 h-px mb-2" style={{ backgroundColor: d.accent }} />
                  <p className="font-cormorant text-2xl text-cream">{t(d.name, locale)}</p>
                </div>
              </Link>
            )
          })}
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          {stats.length > 0 && <PillLink href={`${b}/numbers?pillar=${p.slug}`}>{t(S.numbers, locale)}</PillLink>}
          {p.links?.map((l) => <PillLink key={l.href} href={l.href} external>{l.label}</PillLink>)}
        </div>
      </Section>

      <CtaBand label={t(p.name, locale)} title={t(p.cta.title, locale)} body={t(p.cta.body, locale)}>
        <PillLink href={ctaHref}>{t(p.cta.label, locale)}</PillLink>
      </CtaBand>

      {/* Other pillars */}
      <Section label={t(S.other, locale)}>
        <div className="flex flex-wrap gap-3">
          {PILLARS.filter((x) => x.slug !== p.slug).map((x) => (
            <Link key={x.slug} href={`${b}/pillars/${x.slug}`} className="inline-flex items-center gap-3 border border-ink/15 rounded-full pl-3 pr-5 py-2 hover:border-ink/50 transition-colors">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: x.color }} />
              <span className="font-inter text-sm text-ink/70">{t(x.name, locale)}</span>
            </Link>
          ))}
        </div>
      </Section>
    </Page>
  )
}
