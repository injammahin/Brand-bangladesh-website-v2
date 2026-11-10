'use client'
import Link from 'next/link'
import { Page, Crumbs, Section, PillLink, StoryCard } from '@/components/page/Blocks'
import { Flipbook } from '@/components/publication/Flipbook'
import { Cover, PUB } from './PublicationView'
import { getIssue, THEMES, ISSUES, issueKey } from '@/content/issues'
import { ARTICLES } from '@/content/articles'
import { getPillar } from '@/content/pillars'
import { t, num, date } from '@/lib/i18n'

const S = {
  note: { en: "Editor's note", bn: 'সম্পাদকের কথা' },
  toc: { en: 'In this issue', bn: 'এই সংখ্যায়' },
  printOnly: { en: 'In print & PDF', bn: 'মুদ্রিত ও পিডিএফে' },
  reader: { en: 'Read online', bn: 'অনলাইনে পড়ুন' },
  get: { en: 'Get this issue', bn: 'সংখ্যাটি সংগ্রহ করুন' },
  pdf: { en: 'Download PDF', bn: 'পিডিএফ ডাউনলোড' },
  pdfSoon: { en: 'PDF available on release', bn: 'প্রকাশের পর পিডিএফ পাওয়া যাবে' },
  pdfBody: { en: 'The full issue as a single high-quality PDF.', bn: 'পুরো সংখ্যা একটি উচ্চমানের পিডিএফে।' },
  hard: { en: 'Hard copy (print edition)', bn: 'মুদ্রিত কপি (প্রিন্ট সংস্করণ)' },
  hardYes: { en: 'Printed copies of this issue are available for readers, institutions, embassies, investors and partners.', bn: 'এই সংখ্যার মুদ্রিত কপি পাঠক, প্রতিষ্ঠান, দূতাবাস, বিনিয়োগকারী ও অংশীদারদের জন্য পাওয়া যাচ্ছে।' },
  hardNo: { en: 'The print run for this issue has ended — subscribe to receive future issues in print.', bn: 'এই সংখ্যার মুদ্রণ শেষ — ভবিষ্যৎ সংখ্যার মুদ্রিত কপি পেতে সাবস্ক্রাইব করুন।' },
  order: { en: 'Order this issue', bn: 'এই সংখ্যা অর্ডার করুন' },
  sub: { en: 'Subscribe to print', bn: 'মুদ্রিত সংস্করণে সাবস্ক্রাইব' },
  web: { en: 'Read the articles on the web', bn: 'ওয়েবে আর্টিকেল পড়ুন' },
  other: { en: 'More issues', bn: 'আরও সংখ্যা' },
  contents: { en: 'Contents', bn: 'সূচিপত্র' },
}

export function IssueView({ id, locale }: { id: string; locale: string }) {
  const issue = getIssue(id)!
  const b = `/${locale}`
  const articles = issue.articles.map((s) => ARTICLES.find((a) => a.slug === s)!).filter(Boolean)
  const others = ISSUES.filter((i) => i !== issue).sort((a, z) => z.date.localeCompare(a.date)).slice(0, 5)

  // Flipbook pages: cover → editor's note → contents → each article (photo + text) → back cover.
  // When the CMS renders PDF pages to images, swap these for <img> pages.
  const pages = [
    <Cover key="c" issue={issue} locale={locale} className="w-full h-full !rounded-none !shadow-none" />,
    <div key="n" className="p-[8%] h-full flex flex-col">
      <p className="micro-label mb-4">{t(S.note, locale)}</p>
      <p className="font-cormorant text-[clamp(1rem,2vw,1.6rem)] text-ink leading-snug">{t(issue.editorsNote, locale)}</p>
      <img src="/assets/brand/logo-full.png" alt="" className="w-1/3 mt-auto opacity-80" />
    </div>,
    <div key="t" className="p-[8%] h-full">
      <p className="micro-label mb-6">{t(S.contents, locale)}</p>
      <ol className="space-y-3">
        {[...articles.map((a) => a.title), ...issue.toc].map((x, i) => (
          <li key={i} className="flex gap-3 border-b border-ink/10 pb-2">
            <span className="font-cormorant text-gold">{num(i + 1, locale)}</span>
            <span className="font-cormorant text-[clamp(.9rem,1.6vw,1.25rem)] text-ink">{t(x, locale)}</span>
          </li>
        ))}
      </ol>
    </div>,
    ...articles.flatMap((a) => [
      <div key={a.slug + 'i'} className="h-full relative">
        <img src={a.image} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <p className="absolute bottom-[8%] left-[8%] right-[8%] font-cormorant text-[clamp(1.2rem,2.6vw,2.2rem)] text-white leading-tight">{t(a.title, locale)}</p>
      </div>,
      <div key={a.slug + 't'} className="p-[8%] h-full overflow-hidden">
        <p className="micro-label mb-3">{t(getPillar(a.pillar)!.name, locale)}</p>
        {a.body.slice(0, 3).map((p, i) => (
          <p key={i} className="font-inter text-[clamp(.6rem,1vw,.8rem)] text-ink/70 leading-relaxed mb-3">{t(p, locale)}</p>
        ))}
      </div>,
    ]),
    <div key="back" className="h-full bg-ink flex items-center justify-center">
      <img src="/assets/brand/logo-full-light.png" alt="" className="w-1/2" />
    </div>,
  ]

  return (
    <Page>
      <section className="px-6 md:px-10 lg:px-16 pt-12 md:pt-16 pb-12">
        <Crumbs locale={locale} items={[{ label: t(PUB.label, locale), href: `${b}/publication` }, { label: `${t(PUB.issue, locale)} ${num(issue.number, locale)}` }]} />
        <div className="grid md:grid-cols-[minmax(0,340px)_1fr] gap-10 md:gap-16 items-start">
          <div data-slide="left"><Cover issue={issue} locale={locale} className="aspect-[0.707] w-full max-w-[340px]" /></div>
          <div data-slide="right">
            <div className="w-8 h-px mb-5" style={{ backgroundColor: issue.color }} />
            <p className="micro-label mb-4" style={{ color: issue.color }}>
              {t(PUB.issue, locale)} {num(issue.number, locale)} · {date(issue.date, locale)} · {t(THEMES[issue.theme], locale)}
            </p>
            <h1 className="font-cormorant text-display-lg text-ink leading-display tracking-tighter mb-8">{t(issue.title, locale)}</h1>
            <p className="micro-label text-ink/40 mb-3">{t(S.note, locale)}</p>
            <p className="font-cormorant text-2xl md:text-3xl text-teal leading-snug mb-10 max-w-2xl">{t(issue.editorsNote, locale)}</p>
            <div className="flex flex-wrap gap-3">
              <PillLink href="#reader" dark>{t(S.reader, locale)}</PillLink>
              <PillLink href="#get">{t(S.get, locale)}</PillLink>
            </div>
          </div>
        </div>
      </section>

      {/* TOC */}
      <Section index={1} tone="warm" label={t(S.toc, locale)}>
        <ol className="divide-y divide-ink/10 max-w-3xl">
          {articles.map((a, i) => (
            <li key={a.slug}>
              <Link href={`${b}/articles/${a.slug}`} className="group flex items-baseline gap-5 py-4">
                <span className="font-cormorant text-xl text-gold">{num(String(i + 1).padStart(2, '0'), locale)}</span>
                <span className="font-cormorant text-2xl md:text-3xl text-ink group-hover:opacity-60 transition-opacity flex-1">{t(a.title, locale)}</span>
                <span className="micro-label text-ink/40">{t(S.web, locale)} →</span>
              </Link>
            </li>
          ))}
          {issue.toc.map((x, i) => (
            <li key={i} className="flex items-baseline gap-5 py-4">
              <span className="font-cormorant text-xl text-gold">{num(String(articles.length + i + 1).padStart(2, '0'), locale)}</span>
              <span className="font-cormorant text-2xl md:text-3xl text-ink/70 flex-1">{t(x, locale)}</span>
              <span className="micro-label text-ink/30">{t(S.printOnly, locale)}</span>
            </li>
          ))}
        </ol>
      </Section>

      {/* Flipbook */}
      <Section index={2} id="reader" label={t(S.reader, locale)}>
        <Flipbook pages={pages} locale={locale} label={t(issue.title, locale)} />
      </Section>

      {/* Digital + print access */}
      <Section index={3} tone="warm" id="get" label={t(S.get, locale)}>
        <div className="grid md:grid-cols-2 gap-6">
          <div data-slide="left" className="border border-ink/10 rounded-xl p-8">
            <div className="w-8 h-px bg-teal mb-5" />
            <h3 className="font-cormorant text-3xl text-ink mb-3">PDF</h3>
            <p className="font-inter text-sm text-ink/55 leading-relaxed mb-6">{t(S.pdfBody, locale)}</p>
            {issue.pdf ? (
              <a href={issue.pdf} download className="inline-flex items-center gap-2 font-inter text-xs uppercase tracking-label px-5 py-2.5 rounded-full bg-ink text-cream hover:bg-ink/80">{t(S.pdf, locale)} ↓</a>
            ) : (
              <span className="inline-flex font-inter text-xs uppercase tracking-label px-5 py-2.5 rounded-full border border-ink/15 text-ink/40" aria-disabled="true">{t(S.pdfSoon, locale)}</span>
            )}
          </div>
          <div data-slide="right" className="border border-ink/10 rounded-xl p-8">
            <div className="w-8 h-px bg-gold mb-5" />
            <h3 className="font-cormorant text-3xl text-ink mb-3">{t(S.hard, locale)}</h3>
            <p className="font-inter text-sm text-ink/55 leading-relaxed mb-6">{t(issue.printAvailable ? S.hardYes : S.hardNo, locale)}</p>
            <div className="flex flex-wrap gap-3">
              {issue.printAvailable && <PillLink href={`${b}/contact?category=print&issue=${issue.number}`} dark>{t(S.order, locale)}</PillLink>}
              <PillLink href={`${b}/contact?category=print&subscribe=1`}>{t(S.sub, locale)}</PillLink>
            </div>
          </div>
        </div>
      </Section>

      {articles.length > 0 && (
        <Section label={t(S.web, locale)}>
          <div className="grid md:grid-cols-3 gap-8">
            {articles.map((a) => {
              const p = getPillar(a.pillar)!
              return <StoryCard key={a.slug} href={`${b}/articles/${a.slug}`} image={a.image} accent={p.color} label={t(p.name, locale)} title={t(a.title, locale)} excerpt={t(a.excerpt, locale)} />
            })}
          </div>
        </Section>
      )}

      <Section label={t(S.other, locale)}>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {others.map((i) => (
            <Link key={issueKey(i)} href={`${b}/publication/${issueKey(i)}`} className="group" data-cursor="view">
              <Cover issue={i} locale={locale} className="aspect-[0.707] transition-transform duration-500 group-hover:-translate-y-2" />
            </Link>
          ))}
        </div>
      </Section>
    </Page>
  )
}
