'use client'
import { useMemo, useState } from 'react'
import Link from 'next/link'
import { Page, PageHero, Section, Chips, PillLink, CtaBand } from '@/components/page/Blocks'
import { ImageReveal } from '@/components/motion/ImageReveal'
import { ISSUES, THEMES, issueKey, latestIssue, type ThemeSlug, type Issue } from '@/content/issues'
import { t, num, date, monthName, ui } from '@/lib/i18n'
import { ph } from '@/content/photos'

export const PUB = {
  label: { en: 'Publication', bn: 'প্রকাশনা' },
  title: { en: 'The monthly magazine', bn: 'মাসিক ম্যাগাজিন' },
  intro: { en: 'A new issue every month — read online as a flipbook or as web articles, download the PDF, or receive the printed hard copy.', bn: 'প্রতি মাসে নতুন সংখ্যা — অনলাইনে ফ্লিপবুক বা ওয়েব আর্টিকেল হিসেবে পড়ুন, পিডিএফ ডাউনলোড করুন, অথবা মুদ্রিত কপি সংগ্রহ করুন।' },
  latest: { en: 'This month', bn: 'এই মাসে' },
  issue: { en: 'Issue', bn: 'সংখ্যা' },
  read: { en: 'Read online', bn: 'অনলাইনে পড়ুন' },
  archive: { en: 'Archive', bn: 'আর্কাইভ' },
  year: { en: 'Year', bn: 'বছর' },
  month: { en: 'Month', bn: 'মাস' },
  theme: { en: 'Theme', bn: 'বিষয়' },
  number: { en: 'Issue no.', bn: 'সংখ্যা নং' },
  none: { en: 'No issues match these filters.', bn: 'এই ফিল্টারে কোনো সংখ্যা নেই।' },
  print: { en: 'Print edition', bn: 'মুদ্রিত সংস্করণ' },
  printAvail: { en: 'Print available', bn: 'মুদ্রিত কপি আছে' },
  more: { en: 'More from Publication', bn: 'প্রকাশনার আরও' },
  reports: { en: 'Reports Library', bn: 'রিপোর্ট লাইব্রেরি' },
  press: { en: 'Press Room & Media Kit', bn: 'প্রেস রুম ও মিডিয়া কিট' },
  subTitle: { en: 'Get the magazine in print', bn: 'মুদ্রিত ম্যাগাজিন সংগ্রহ করুন' },
  subBody: { en: 'Individuals, institutions, embassies and partners can order single issues or subscribe to the monthly hard copy.', bn: 'ব্যক্তি, প্রতিষ্ঠান, দূতাবাস ও অংশীদাররা একক সংখ্যা অর্ডার বা মাসিক মুদ্রিত কপির সাবস্ক্রিপশন নিতে পারেন।' },
  subscribe: { en: 'Subscribe / order', bn: 'সাবস্ক্রাইব / অর্ডার' },
}

export function Cover({ issue, locale, className = '' }: { issue: Issue; locale: string; className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-lg shadow-xl ${className}`} style={{ backgroundColor: issue.color }}>
      {issue.cover ? (
        <img src={issue.cover} alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
      ) : issue.photo ? (
        <>
          <img src={ph(issue.photo, 960)} alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-x-0 top-0 h-[38%] bg-gradient-to-b from-black/50 via-black/20 to-transparent" />
          <img src="/assets/brand/logo-full-light.png" alt="" className="absolute top-[7%] left-1/2 -translate-x-1/2 w-[70%] drop-shadow-[0_2px_10px_rgba(0,0,0,.35)]" />
        </>
      ) : (
        <div className="absolute inset-0 flex flex-col items-center pt-[12%]">
          <img src="/assets/brand/logo-full-light.png" alt="" className="w-[70%] opacity-90" />
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
      <div className="absolute bottom-0 p-4">
        <p className="text-white/60 text-[10px] font-inter uppercase tracking-widest mb-1">{t(PUB.issue, locale)} {num(issue.number, locale)} · {date(issue.date, locale)}</p>
        <p className="font-cormorant text-xl text-white leading-tight">{t(issue.title, locale)}</p>
      </div>
    </div>
  )
}

export function PublicationView({ locale }: { locale: string }) {
  const latest = latestIssue()
  const years = Array.from(new Set(ISSUES.map((i) => i.date.slice(0, 4)))).sort().reverse()
  const [year, setYear] = useState('all')
  const [month, setMonth] = useState('all')
  const [theme, setTheme] = useState<string>('all')
  const [q, setQ] = useState('')
  const b = `/${locale}`

  const list = useMemo(() => ISSUES
    .filter((i) => (year === 'all' || i.date.startsWith(year))
      && (month === 'all' || +i.date.slice(5, 7) === +month)
      && (theme === 'all' || i.theme === theme)
      && (!q || String(i.number) === q.replace(/[০-৯]/g, (d) => String('০১২৩৪৫৬৭৮৯'.indexOf(d))).trim()))
    .sort((a, z) => z.date.localeCompare(a.date)), [year, month, theme, q])

  const months = Array.from(new Set(ISSUES.filter((i) => year === 'all' || i.date.startsWith(year)).map((i) => +i.date.slice(5, 7)))).sort((a, z) => z - a)

  return (
    <Page>
      <PageHero locale={locale} label={t(PUB.label, locale)} title={t(PUB.title, locale)} intro={t(PUB.intro, locale)} image="/assets/Tourism/rangamati.png" meta={[t({ en: 'Monthly', bn: 'মাসিক' }, locale), t({ en: 'Online & print', bn: 'অনলাইন ও মুদ্রিত' }, locale), `${num(ISSUES.length, locale)} ${t({ en: 'issues', bn: 'টি সংখ্যা' }, locale)}`]} />

      {/* Latest issue spotlight */}
      <Section index={1} tone="warm" label={t(PUB.latest, locale)}>
        <div className="grid md:grid-cols-[minmax(0,320px)_1fr] gap-10 md:gap-16 items-center">
          <div data-slide="left"><ImageReveal className="w-full max-w-[320px]">
            <Link href={`${b}/publication/${issueKey(latest)}`} data-cursor="view"><Cover issue={latest} locale={locale} className="aspect-[0.707]" /></Link>
          </ImageReveal></div>
          <div data-slide="right">
            <p className="micro-label mb-3">{t(PUB.issue, locale)} {num(latest.number, locale)} · {t(THEMES[latest.theme], locale)}</p>
            <h2 className="font-cormorant text-display-sm text-ink leading-display tracking-tighter mb-5">{t(latest.title, locale)}</h2>
            <p className="font-inter text-base text-ink/60 leading-relaxed max-w-xl mb-8">{t(latest.editorsNote, locale)}</p>
            <div className="flex flex-wrap gap-3">
              <PillLink href={`${b}/publication/${issueKey(latest)}#reader`} dark>{t(PUB.read, locale)}</PillLink>
              <PillLink href={`${b}/publication/${issueKey(latest)}#get`}>PDF</PillLink>
              <PillLink href={`${b}/contact?category=print&issue=${latest.number}`}>{t(PUB.print, locale)}</PillLink>
            </div>
          </div>
        </div>
      </Section>

      {/* Archive */}
      <Section index={2} id="archive" label={t(PUB.archive, locale)}>
        <div className="grid gap-5 mb-12">
          <div className="flex flex-wrap items-center gap-4">
            <span className="micro-label text-ink/40 w-16">{t(PUB.year, locale)}</span>
            <Chips label={t(PUB.year, locale)} value={year} onChange={(v) => { setYear(v); setMonth('all') }}
              options={[{ value: 'all', label: t(ui.all, locale) }, ...years.map((y) => ({ value: y, label: num(y, locale) }))]} />
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <span className="micro-label text-ink/40 w-16">{t(PUB.month, locale)}</span>
            <Chips label={t(PUB.month, locale)} value={month} onChange={setMonth}
              options={[{ value: 'all', label: t(ui.all, locale) }, ...months.map((m) => ({ value: String(m), label: monthName(m, locale) }))]} />
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <span className="micro-label text-ink/40 w-16">{t(PUB.theme, locale)}</span>
            <Chips label={t(PUB.theme, locale)} value={theme} onChange={setTheme}
              options={[{ value: 'all', label: t(ui.all, locale) }, ...(Object.keys(THEMES) as ThemeSlug[]).map((k) => ({ value: k, label: t(THEMES[k], locale) }))]} />
          </div>
          <div className="flex items-center gap-4">
            <label htmlFor="issue-no" className="micro-label text-ink/40 w-16">{t(PUB.number, locale)}</label>
            <input id="issue-no" inputMode="numeric" value={q} onChange={(e) => setQ(e.target.value)} placeholder="24"
              className="w-28 font-inter text-sm bg-transparent border border-ink/20 rounded px-3 py-1.5 focus:border-teal outline-none" />
          </div>
        </div>

        {list.length === 0 ? (
          <p className="font-inter text-sm text-ink/50">{t(PUB.none, locale)}</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {list.map((i) => (
              <Link key={issueKey(i)} href={`${b}/publication/${issueKey(i)}`} className="group block" data-cursor="view">
                <Cover issue={i} locale={locale} className="aspect-[0.707] transition-transform duration-500 group-hover:-translate-y-2" />
                <div className="mt-3 flex items-center justify-between">
                  <span className="micro-label text-ink/40">{t(THEMES[i.theme], locale)}</span>
                  {i.printAvailable && <span className="micro-label text-teal">{t(PUB.printAvail, locale)}</span>}
                </div>
              </Link>
            ))}
          </div>
        )}
      </Section>

      <Section index={3} tone="warm" label={t(PUB.more, locale)}>
        <div className="grid md:grid-cols-2 gap-6">
          {[{ href: `${b}/publication/reports`, title: PUB.reports, body: { en: 'Official reports, brochures and press releases — filterable and downloadable.', bn: 'সরকারি প্রতিবেদন, ব্রোশিওর ও প্রেস বিজ্ঞপ্তি — ফিল্টার ও ডাউনলোডযোগ্য।' } },
            { href: `${b}/publication/press`, title: PUB.press, body: { en: 'Approved high-resolution photos, logos, press contacts and usage guidelines.', bn: 'অনুমোদিত উচ্চ রেজোলিউশনের ছবি, লোগো, প্রেস যোগাযোগ ও ব্যবহার নির্দেশিকা।' } }].map((c) => (
            <Link key={c.href} href={c.href} data-slide={c.href.endsWith('reports') ? 'left' : 'right'} className="group border border-ink/10 rounded-xl p-8 hover:border-ink/30 transition-colors" data-cursor="link">
              <div className="w-8 h-px bg-gold mb-5" />
              <h3 className="font-cormorant text-3xl text-ink mb-3 group-hover:opacity-70">{t(c.title, locale)} →</h3>
              <p className="font-inter text-sm text-ink/55 leading-relaxed">{t(c.body, locale)}</p>
            </Link>
          ))}
        </div>
      </Section>

      <CtaBand label={t(PUB.print, locale)} title={t(PUB.subTitle, locale)} body={t(PUB.subBody, locale)}>
        <PillLink href={`${b}/contact?category=print`}>{t(PUB.subscribe, locale)}</PillLink>
      </CtaBand>
    </Page>
  )
}
