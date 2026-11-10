'use client'
import { useState } from 'react'
import { Page, PageHero, Section, Chips, PillLink } from '@/components/page/Blocks'
import { REPORTS, REPORT_TYPES, type ReportType } from '@/content/site'
import { PILLARS, getPillar } from '@/content/pillars'
import { t, date, ui } from '@/lib/i18n'

const R = {
  label: { en: 'Publication', bn: 'প্রকাশনা' },
  title: { en: 'Reports Library', bn: 'রিপোর্ট লাইব্রেরি' },
  intro: { en: 'Official reports, brochures and press releases from Brand Bangladesh and partner authorities.', bn: 'ব্র্যান্ড বাংলাদেশ ও সহযোগী কর্তৃপক্ষের সরকারি প্রতিবেদন, ব্রোশিওর ও প্রেস বিজ্ঞপ্তি।' },
  type: { en: 'Type', bn: 'ধরন' },
  pillar: { en: 'Pillar', bn: 'স্তম্ভ' },
  dl: { en: 'Download', bn: 'ডাউনলোড' },
  request: { en: 'Request copy', bn: 'কপির অনুরোধ' },
}

export function ReportsView({ locale }: { locale: string }) {
  const [type, setType] = useState<string>('all')
  const [pillar, setPillar] = useState<string>('all')
  const list = REPORTS.filter((r) => (type === 'all' || r.type === type) && (pillar === 'all' || r.pillar === pillar))
    .sort((a, z) => z.date.localeCompare(a.date))
  return (
    <Page>
      <PageHero locale={locale} crumbs={[{ label: t(R.label, locale), href: `/${locale}/publication` }, { label: t(R.title, locale) }]}
        label={t(R.label, locale)} title={t(R.title, locale)} intro={t(R.intro, locale)} image="/assets/Dhaka.jpg" />
      <Section tone="warm">
        <div className="space-y-4 mb-10">
          <Chips label={t(R.type, locale)} value={type} onChange={setType}
            options={[{ value: 'all', label: t(ui.all, locale) }, ...(Object.keys(REPORT_TYPES) as ReportType[]).map((k) => ({ value: k, label: t(REPORT_TYPES[k], locale) }))]} />
          <Chips label={t(R.pillar, locale)} value={pillar} onChange={setPillar}
            options={[{ value: 'all', label: t(ui.all, locale) }, ...PILLARS.map((p) => ({ value: p.slug as string, label: t(p.name, locale) }))]} />
        </div>
        <ul className="divide-y divide-ink/10 border-y border-ink/10">
          {list.map((r) => {
            const p = getPillar(r.pillar)!
            return (
              <li key={r.id} className="py-5 grid md:grid-cols-[140px_1fr_auto] gap-2 md:gap-6 items-center">
                <span className="micro-label" style={{ color: p.color }}>{t(REPORT_TYPES[r.type], locale)}</span>
                <div>
                  <p className="font-cormorant text-2xl text-ink leading-heading">{t(r.title, locale)}</p>
                  <p className="font-inter text-xs text-ink/40 mt-1">{date(r.date, locale)} · {t(p.name, locale)} · PDF {r.size}</p>
                </div>
                {/* File links are attached through the CMS; until then visitors can request the document */}
                <PillLink href={`/${locale}/contact?category=media&doc=${r.id}`}>{t(R.request, locale)}</PillLink>
              </li>
            )
          })}
        </ul>
      </Section>
    </Page>
  )
}

const P = {
  label: { en: 'Publication', bn: 'প্রকাশনা' },
  title: { en: 'Press Room & Media Kit', bn: 'প্রেস রুম ও মিডিয়া কিট' },
  intro: { en: 'Approved logos, high-resolution photography, press contacts and usage guidelines for journalists and partners.', bn: 'সাংবাদিক ও অংশীদারদের জন্য অনুমোদিত লোগো, উচ্চ রেজোলিউশনের ছবি, প্রেস যোগাযোগ ও ব্যবহার নির্দেশিকা।' },
  logos: { en: 'Logos', bn: 'লোগো' },
  photos: { en: 'Photography', bn: 'আলোকচিত্র' },
  contacts: { en: 'Press contacts', bn: 'প্রেস যোগাযোগ' },
  usage: { en: 'Usage guidelines', bn: 'ব্যবহার নির্দেশিকা' },
  usageBody: { en: 'Free for editorial coverage of Bangladesh with the credit “Brand Bangladesh”. Do not alter the logo. Commercial use needs written permission.', bn: '“ব্র্যান্ড বাংলাদেশ” কৃতজ্ঞতাসহ বাংলাদেশ বিষয়ক সম্পাদকীয় কাজে বিনামূল্যে ব্যবহারযোগ্য। লোগো পরিবর্তন করবেন না। বাণিজ্যিক ব্যবহারে লিখিত অনুমতি প্রয়োজন।' },
  read: { en: 'Read the full policy', bn: 'পূর্ণ নীতিমালা পড়ুন' },
  inquiry: { en: 'Media inquiry', bn: 'গণমাধ্যম জিজ্ঞাসা' },
}

const LOGOS = [
  { file: '/assets/brand/logo-full.png', name: 'Full logo — light backgrounds (PNG)', bg: '#FBFAF7' },
  { file: '/assets/brand/logo-full-light.png', name: 'Full logo — dark backgrounds (PNG)', bg: '#101414' },
  { file: '/assets/brand/logo-mark.svg', name: 'Logo mark (SVG)', bg: '#FBFAF7' },
]
const PHOTOS = [
  { file: '/assets/Tourism/coxs-bazar.png', name: "Cox's Bazar" },
  { file: '/assets/Tourism/sundarbans.png', name: 'Sundarbans' },
  { file: '/assets/Tourism/sixty-dome-mosque.png', name: 'Sixty Dome Mosque' },
  { file: '/assets/Tourism/rangamati.png', name: 'Rangamati' },
  { file: '/assets/Tourism/saint-martin.png', name: "Saint Martin's Island" },
  { file: '/assets/sylhet.jpg', name: 'Sylhet tea gardens' },
  { file: '/assets/Dhaka.jpg', name: 'Dhaka' },
  { file: '/assets/stories/febric.jpg', name: 'Garment industry' },
]

export function PressView({ locale }: { locale: string }) {
  return (
    <Page>
      <PageHero locale={locale} crumbs={[{ label: t(P.label, locale), href: `/${locale}/publication` }, { label: t(P.title, locale) }]}
        label={t(P.label, locale)} title={t(P.title, locale)} intro={t(P.intro, locale)} image="/assets/Tourism/saint-martin.png" />

      <Section index={1} tone="warm" label={t(P.logos, locale)}>
        <div className="grid sm:grid-cols-3 gap-6">
          {LOGOS.map((l) => (
            <a key={l.file} href={l.file} download className="group border border-ink/10 rounded-xl overflow-hidden hover:border-ink/30 transition-colors">
              <div className="aspect-[16/9] flex items-center justify-center p-8" style={{ backgroundColor: l.bg }}>
                <img src={l.file} alt="" className="max-h-full max-w-full object-contain" />
              </div>
              <p className="p-4 font-inter text-sm text-ink/70 flex justify-between">{l.name}<span aria-hidden="true">↓</span></p>
            </a>
          ))}
        </div>
      </Section>

      <Section index={2} label={t(P.photos, locale)}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {PHOTOS.map((p) => (
            <a key={p.file} href={p.file} download className="group block">
              <div className="aspect-[4/3] rounded-lg overflow-hidden bg-ink/5">
                <img src={p.file} alt={p.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <p className="font-inter text-xs text-ink/60 mt-2 flex justify-between">{p.name}<span aria-hidden="true">↓</span></p>
            </a>
          ))}
        </div>
      </Section>

      <Section index={3} tone="warm" label={t(P.contacts, locale)}>
        <div className="grid md:grid-cols-2 gap-10">
          <div data-slide="left">
            <p className="font-cormorant text-3xl text-ink mb-2">Press Office, Brand Bangladesh</p>
            <p className="font-inter text-sm text-ink/60 leading-relaxed">
              <a href="mailto:press@brandbangladesh.gov.bd" className="underline">press@brandbangladesh.gov.bd</a><br />
              +880 2 0000 0000 · Sun–Thu, 9:00–17:00 (GMT+6)
            </p>
            <div className="mt-6"><PillLink href={`/${locale}/contact?category=media`} dark>{t(P.inquiry, locale)}</PillLink></div>
          </div>
          <div data-slide="right">
            <p className="micro-label mb-3">{t(P.usage, locale)}</p>
            <p className="font-inter text-sm text-ink/60 leading-relaxed mb-5">{t(P.usageBody, locale)}</p>
            <PillLink href={`/${locale}/legal/content-usage`}>{t(P.read, locale)}</PillLink>
          </div>
        </div>
      </Section>
    </Page>
  )
}
