'use client'
import Link from 'next/link'
import { useState } from 'react'
import { Page, Crumbs, StoryCard, Section } from '@/components/page/Blocks'
import { ImageReveal } from '@/components/motion/ImageReveal'
import { getArticle, ARTICLES } from '@/content/articles'
import { getPillar } from '@/content/pillars'
import { ISSUES, issueKey } from '@/content/issues'
import divisions from '../../../data/divisions.json'
import { t, num, date, ui, type L } from '@/lib/i18n'

const S = {
  issue: { en: 'From issue', bn: 'যে সংখ্যা থেকে' },
  related: { en: 'Related stories', bn: 'সম্পর্কিত গল্প' },
  share: { en: 'Share this story', bn: 'গল্পটি শেয়ার করুন' },
  copy: { en: 'Copy link', bn: 'লিংক কপি' },
}

export function ArticleView({ slug, locale }: { slug: string; locale: string }) {
  const a = getArticle(slug)!
  const p = getPillar(a.pillar)!
  const region = divisions.find((d) => d.slug === a.region)!
  const issue = ISSUES.find((i) => i.articles.includes(a.slug))
  const related = ARTICLES.filter((x) => x.slug !== a.slug && (x.pillar === a.pillar || x.region === a.region)).slice(0, 3)
  const [copied, setCopied] = useState(false)
  const b = `/${locale}`

  const url = typeof window !== 'undefined' ? window.location.href : ''
  const enc = encodeURIComponent

  return (
    <Page>
      <article>
        <header className="px-6 md:px-10 lg:px-16 pt-12 md:pt-16 pb-10 max-w-5xl mx-auto">
          <Crumbs locale={locale} items={[{ label: t(p.name, locale), href: `${b}/pillars/${p.slug}` }, { label: t(a.title, locale) }]} />
          <div className="w-8 h-px mb-5" style={{ backgroundColor: p.color }} />
          <p className="micro-label mb-4" style={{ color: p.color }}>
            <Link href={`${b}/pillars/${p.slug}`} className="hover:opacity-70">{t(p.name, locale)}</Link>
            {' · '}
            <Link href={`${b}/divisions/${region.slug}`} className="hover:opacity-70">{t(region.name as L, locale)}</Link>
          </p>
          <h1 className="font-cormorant text-display-md text-ink leading-display tracking-tighter mb-6">{t(a.title, locale)}</h1>
          <p className="font-inter text-lg text-ink/60 leading-relaxed mb-6 max-w-3xl">{t(a.excerpt, locale)}</p>
          <p className="micro-label text-ink/40">
            {t(a.author, locale)} · <time dateTime={a.date}>{date(a.date, locale)}</time> · {num(a.readMin, locale)} {t(ui.minRead, locale)}
          </p>
        </header>

        <ImageReveal className="relative w-full max-w-6xl mx-auto aspect-[16/9] md:rounded-xl overflow-hidden bg-ink/5 mb-14">
          <img src={a.image} alt={t(a.title, locale)} className="w-full h-full object-cover" />
        </ImageReveal>

        <div className="px-6 md:px-10 max-w-2xl mx-auto">
          {a.body.map((para, i) => (
            <div key={i}>
              <p className={`font-inter text-[1.0625rem] text-ink/75 leading-[1.85] mb-7 ${i === 0 ? 'first-letter:font-cormorant first-letter:text-6xl first-letter:float-left first-letter:mr-3 first-letter:leading-[0.9] first-letter:text-ink' : ''}`}>
                {t(para, locale)}
              </p>
              {i === 1 && a.quote && (
                <blockquote className="my-12 border-l-2 pl-6 font-cormorant text-3xl md:text-4xl italic leading-snug text-teal" style={{ borderColor: p.color }}>
                  {t(a.quote, locale)}
                </blockquote>
              )}
            </div>
          ))}

          {/* Share */}
          <div className="border-t border-ink/10 pt-8 mt-12 flex flex-wrap items-center gap-4">
            <span className="micro-label text-ink/40">{t(S.share, locale)}</span>
            {[
              ['Facebook', `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`],
              ['X', `https://twitter.com/intent/tweet?url=${enc(url)}&text=${enc(t(a.title, locale))}`],
              ['LinkedIn', `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`],
              ['WhatsApp', `https://wa.me/?text=${enc(t(a.title, locale) + ' ' + url)}`],
            ].map(([n, h]) => (
              <a key={n} href={h} target="_blank" rel="noopener noreferrer" className="font-inter text-xs uppercase tracking-label text-ink/50 hover:text-ink">{n}</a>
            ))}
            <button
              onClick={async () => { try { await navigator.clipboard.writeText(window.location.href); setCopied(true); setTimeout(() => setCopied(false), 1600) } catch { /* noop */ } }}
              className="font-inter text-xs uppercase tracking-label text-ink/50 hover:text-ink"
            >
              {copied ? t(ui.copied, locale) : t(S.copy, locale)}
            </button>
          </div>

          {issue && (
            <Link href={`${b}/publication/${issueKey(issue)}`} className="group mt-10 flex items-center gap-5 border border-ink/10 rounded-xl p-5 hover:border-ink/30 transition-colors">
              {issue.cover && <img src={issue.cover} alt="" className="w-16 aspect-[0.707] object-cover rounded" />}
              <div>
                <p className="micro-label text-ink/40 mb-1">{t(S.issue, locale)} {num(issue.number, locale)}</p>
                <p className="font-cormorant text-2xl text-ink group-hover:opacity-70">{t(issue.title, locale)} →</p>
              </div>
            </Link>
          )}
        </div>
      </article>

      {related.length > 0 && (
        <Section label={t(S.related, locale)}>
          <div className="grid md:grid-cols-3 gap-8">
            {related.map((r) => {
              const rp = getPillar(r.pillar)!
              return <StoryCard key={r.slug} href={`${b}/articles/${r.slug}`} image={r.image} accent={rp.color} label={t(rp.name, locale)} title={t(r.title, locale)} excerpt={t(r.excerpt, locale)} />
            })}
          </div>
        </Section>
      )}
    </Page>
  )
}
