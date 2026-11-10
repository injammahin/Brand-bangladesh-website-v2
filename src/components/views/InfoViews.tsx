'use client'
import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { Page, PageHero, Section, PillLink } from '@/components/page/Blocks'
import { TextField, TextArea, Select, Checkbox, Honeypot, SubmitButton, FormSuccess } from '@/components/forms/Fields'
import { useSubmit, isEmail, formToObject } from '@/components/forms/useSubmit'
import { INQUIRY_CATEGORIES, FAQ, LEGAL } from '@/content/site'
import { PILLARS } from '@/content/pillars'
import { ARTICLES } from '@/content/articles'
import { ISSUES, issueKey } from '@/content/issues'
import { STATS } from '@/content/stats'
import { REPORTS } from '@/content/site'
import { REGIONS } from '@/content/regions'
import { CHAPTERS } from '@/content/story'
import divisions from '../../../data/divisions.json'
import { t, num, ui, type L } from '@/lib/i18n'

/* ───────────── About ───────────── */
const A = {
  label: { en: 'About the initiative', bn: 'উদ্যোগ সম্পর্কে' },
  title: { en: 'Telling the story of Bangladesh, together', bn: 'একসঙ্গে বাংলাদেশের গল্প বলা' },
  intro: { en: 'Brand Bangladesh is the national identity and storytelling platform — a monthly magazine, online and in print, presenting the country to investors, buyers, travellers, journalists, the diaspora and its own citizens.', bn: 'ব্র্যান্ড বাংলাদেশ জাতীয় পরিচয় ও গল্প বলার প্ল্যাটফর্ম — অনলাইন ও মুদ্রিত মাসিক ম্যাগাজিন, যা বিনিয়োগকারী, ক্রেতা, পর্যটক, সাংবাদিক, প্রবাসী ও দেশের নাগরিকদের সামনে দেশকে তুলে ধরে।' },
  mission: { en: 'Mission', bn: 'লক্ষ্য' },
  missionBody: { en: 'Leave every visitor with a stronger, more accurate and more positive perception of Bangladesh — and a clear next step to engage with it.', bn: 'প্রত্যেক দর্শনার্থীর মনে বাংলাদেশ সম্পর্কে আরও দৃঢ়, নির্ভুল ও ইতিবাচক ধারণা তৈরি করা — এবং দেশের সঙ্গে যুক্ত হওয়ার একটি সুস্পষ্ট পরবর্তী পদক্ষেপ দেওয়া।' },
  gov: { en: 'Governance', bn: 'পরিচালনা' },
  govBody: { en: 'An editorial board sets each month’s agenda. Every page passes writer, editor and senior-editor review before publication, and every statistic is checked against its official source.', bn: 'একটি সম্পাদকীয় পর্ষদ প্রতি মাসের বিষয়সূচি নির্ধারণ করে। প্রকাশের আগে প্রতিটি পাতা লেখক, সম্পাদক ও জ্যেষ্ঠ সম্পাদকের পর্যালোচনা পেরোয় এবং প্রতিটি পরিসংখ্যান সরকারি সূত্রের সঙ্গে মিলিয়ে দেখা হয়।' },
  team: { en: 'Team', bn: 'দল' },
  teamList: [
    { en: 'Editorial board', bn: 'সম্পাদকীয় পর্ষদ' }, { en: 'Writers & translators', bn: 'লেখক ও অনুবাদক' },
    { en: 'Photo & film desk', bn: 'ছবি ও চলচ্চিত্র ডেস্ক' }, { en: 'Data & research', bn: 'তথ্য ও গবেষণা' },
    { en: 'Community moderators', bn: 'কমিউনিটি মডারেটর' }, { en: 'Print & distribution', bn: 'মুদ্রণ ও বিতরণ' },
  ],
  partners: { en: 'Partner organisations', bn: 'অংশীদার প্রতিষ্ঠান' },
  partnerList: ['BIDA', 'BEZA', 'BEPZA', 'Export Promotion Bureau', 'Bangladesh Tourism Board', 'Bangladesh Bureau of Statistics', 'a2i', 'Bangla Academy'],
  partnerNote: { en: 'Partner list for illustration — to be confirmed with the client.', bn: 'অংশীদার তালিকা উদাহরণমাত্র — ক্লায়েন্টের সঙ্গে চূড়ান্ত করা হবে।' },
  contact: { en: 'Contact us', bn: 'যোগাযোগ করুন' },
  faq: { en: 'Read the FAQ', bn: 'সাধারণ প্রশ্ন পড়ুন' },
}

export function AboutView({ locale }: { locale: string }) {
  return (
    <Page>
      <PageHero locale={locale} label={t(A.label, locale)} title={t(A.title, locale)} intro={t(A.intro, locale)} image="/assets/map.jpg" accent="#479E90">
        <div className="mt-8 flex flex-wrap gap-3">
          <PillLink href={`/${locale}/contact`} dark>{t(A.contact, locale)}</PillLink>
          <PillLink href={`/${locale}/faq`}>{t(A.faq, locale)}</PillLink>
        </div>
      </PageHero>
      <Section>
        <div className="grid md:grid-cols-2 gap-12">
          {[[A.mission, A.missionBody], [A.gov, A.govBody]].map(([h, p], i) => (
            <div key={h.en} data-slide={i ? 'right' : 'left'}>
              <div className="w-8 h-px bg-gold mb-5" />
              <h2 className="font-cormorant text-4xl text-ink mb-4">{t(h, locale)}</h2>
              <p className="font-inter text-base text-ink/60 leading-relaxed">{t(p, locale)}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section index={2} tone="warm" label={t(A.team, locale)}>
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {A.teamList.map((x, i) => (
            <li key={x.en} className="border border-ink/10 rounded-xl p-6 flex items-center gap-4">
              <span className="font-cormorant text-2xl text-gold">{num(String(i + 1).padStart(2, '0'), locale)}</span>
              <span className="font-cormorant text-2xl text-ink">{t(x, locale)}</span>
            </li>
          ))}
        </ul>
      </Section>
      <Section index={3} label={t(A.partners, locale)}>
        <ul className="flex flex-wrap gap-3">
          {A.partnerList.map((p) => <li key={p} className="font-inter text-sm text-ink/70 border border-ink/15 rounded-full px-4 py-2">{p}</li>)}
        </ul>
        <p className="font-inter text-xs text-ink/35 mt-4">{t(A.partnerNote, locale)}</p>
      </Section>
    </Page>
  )
}

/* ───────────── Contact (smart routing, BRD 5.8.2) ───────────── */
const C = {
  label: { en: 'Contact & Inquiries', bn: 'যোগাযোগ ও জিজ্ঞাসা' },
  title: { en: 'How can we help?', bn: 'আমরা কীভাবে সাহায্য করতে পারি?' },
  intro: { en: 'Choose a category and your message goes straight to the right team — investment, exports, tourism, media or the magazine print desk.', bn: 'একটি বিভাগ বেছে নিন — আপনার বার্তা সরাসরি সঠিক দলের কাছে যাবে: বিনিয়োগ, রপ্তানি, পর্যটন, গণমাধ্যম বা ম্যাগাজিনের মুদ্রণ ডেস্ক।' },
  category: { en: 'Inquiry category', bn: 'জিজ্ঞাসার বিভাগ' },
  name: { en: 'Full name', bn: 'পূর্ণ নাম' },
  email: { en: 'Email', bn: 'ইমেইল' },
  org: { en: 'Organisation', bn: 'প্রতিষ্ঠান' },
  country: { en: 'Country', bn: 'দেশ' },
  message: { en: 'Message', bn: 'বার্তা' },
  issue: { en: 'Issue number (optional)', bn: 'সংখ্যা নং (ঐচ্ছিক)' },
  copies: { en: 'Number of copies', bn: 'কপির সংখ্যা' },
  plan: { en: 'Request type', bn: 'অনুরোধের ধরন' },
  single: { en: 'Single issue', bn: 'একক সংখ্যা' },
  subscription: { en: 'Monthly subscription', bn: 'মাসিক সাবস্ক্রিপশন' },
  bulk: { en: 'Institutional / bulk distribution', bn: 'প্রাতিষ্ঠানিক / একাধিক কপি বিতরণ' },
  address: { en: 'Delivery address', bn: 'ডেলিভারির ঠিকানা' },
  sector: { en: 'Sector of interest', bn: 'আগ্রহের খাত' },
  consent: { en: 'I agree that Brand Bangladesh may store my details to answer this inquiry, as described in the Privacy Policy.', bn: 'গোপনীয়তা নীতিতে বর্ণিত অনুযায়ী এই জিজ্ঞাসার উত্তর দিতে ব্র্যান্ড বাংলাদেশ আমার তথ্য সংরক্ষণ করতে পারবে — আমি সম্মত।' },
  sent: { en: 'Message received', bn: 'বার্তা পৌঁছেছে' },
  sentBody: { en: 'Your inquiry has been logged and routed to', bn: 'আপনার জিজ্ঞাসা নথিভুক্ত হয়ে পাঠানো হয়েছে' },
  reply: { en: 'We reply within three working days.', bn: 'আমরা তিন কর্মদিবসের মধ্যে উত্তর দিই।' },
  direct: { en: 'Direct lines', bn: 'সরাসরি যোগাযোগ' },
}

export function ContactView({ locale }: { locale: string }) {
  const [cat, setCat] = useState('general')
  const [preset, setPreset] = useState<{ issue?: string; subscribe?: boolean; doc?: string }>({})
  const { state, result, submit } = useSubmit('contact')
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    const q = new URLSearchParams(window.location.search)
    const c = q.get('category')
    if (c && INQUIRY_CATEGORIES.some((x) => x.id === c)) setCat(c)
    setPreset({ issue: q.get('issue') ?? undefined, subscribe: q.get('subscribe') === '1', doc: q.get('doc') ?? undefined })
  }, [])

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const d = formToObject(e.currentTarget)
    const er: Record<string, string> = {}
    if (!String(d.name || '').trim()) er.name = t(ui.required, locale)
    if (!isEmail(String(d.email || ''))) er.email = t(ui.invalidEmail, locale)
    if (!String(d.message || '').trim()) er.message = t(ui.required, locale)
    if (cat === 'print' && !String(d.address || '').trim()) er.address = t(ui.required, locale)
    if (!d.consent) er.consent = t(ui.consentRequired, locale)
    setErrors(er)
    if (!Object.keys(er).length) await submit({ ...d, category: cat, locale, doc: preset.doc })
  }

  return (
    <Page>
      <PageHero locale={locale} label={t(C.label, locale)} title={t(C.title, locale)} intro={t(C.intro, locale)} image="/assets/Chittagong.jpg" />
      <Section tone="warm">
        <div className="grid lg:grid-cols-[1.6fr_1fr] gap-12 lg:gap-20">
          {state === 'done' ? (
            <FormSuccess title={t(C.sent, locale)} body={`${t(C.sentBody, locale)} ${result.routedTo}. ${t(C.reply, locale)} (${result.ref})`} />
          ) : (
            <form data-slide="left" onSubmit={onSubmit} noValidate className="relative grid sm:grid-cols-2 gap-5" aria-label={t(C.label, locale)}>
              <Honeypot />
              <fieldset className="sm:col-span-2">
                <legend className="micro-label text-ink/60 mb-3">{t(C.category, locale)} <span className="text-red" aria-hidden="true">*</span></legend>
                <div className="flex flex-wrap gap-2">
                  {INQUIRY_CATEGORIES.map((c) => (
                    <label key={c.id} className={`cursor-pointer font-inter text-xs px-4 py-2 rounded-full border transition-colors ${cat === c.id ? 'bg-ink text-cream border-ink' : 'border-ink/15 text-ink/60 hover:border-ink/40'}`}>
                      <input type="radio" name="category" value={c.id} checked={cat === c.id} onChange={() => setCat(c.id)} className="sr-only" />
                      {t(c.label, locale)}
                    </label>
                  ))}
                </div>
              </fieldset>
              <TextField name="name" label={t(C.name, locale)} required error={errors.name} autoComplete="name" />
              <TextField name="email" type="email" label={t(C.email, locale)} required error={errors.email} autoComplete="email" />
              <TextField name="organisation" label={t(C.org, locale)} autoComplete="organization" />
              <TextField name="country" label={t(C.country, locale)} autoComplete="country-name" />

              {(cat === 'investment' || cat === 'exports') && (
                <div className="sm:col-span-2">
                  <Select name="sector" label={t(C.sector, locale)}
                    options={(cat === 'exports'
                      ? PILLARS.find((p) => p.slug === 'exports')!.subtopics.map((s) => s.title)
                      : PILLARS.find((p) => p.slug === 'investment')!.subtopics.map((s) => s.title)
                    ).map((x) => ({ value: x.en, label: t(x, locale) }))} />
                </div>
              )}

              {cat === 'print' && (
                <>
                  <Select key={`plan-${preset.subscribe}`} name="plan" label={t(C.plan, locale)} defaultValue={preset.subscribe ? 'subscription' : preset.issue ? 'single' : 'subscription'}
                    options={[{ value: 'single', label: t(C.single, locale) }, { value: 'subscription', label: t(C.subscription, locale) }, { value: 'bulk', label: t(C.bulk, locale) }]} />
                  <TextField key={`issue-${preset.issue}`} name="issue" label={t(C.issue, locale)} defaultValue={preset.issue} />
                  <TextField name="copies" type="number" label={t(C.copies, locale)} defaultValue="1" />
                  <div className="sm:col-span-2"><TextArea name="address" label={t(C.address, locale)} rows={2} required error={errors.address} /></div>
                </>
              )}

              <div className="sm:col-span-2"><TextArea name="message" label={t(C.message, locale)} required error={errors.message} rows={5} /></div>
              <div className="sm:col-span-2"><Checkbox name="consent" required error={errors.consent} label={t(C.consent, locale)} /></div>
              {state === 'error' && <p className="sm:col-span-2 font-inter text-xs text-red" role="alert">{t(ui.genericError, locale)}</p>}
              <div className="sm:col-span-2"><SubmitButton busy={state === 'sending'}>{t(state === 'sending' ? ui.sending : ui.submit, locale)}</SubmitButton></div>
            </form>
          )}

          <aside data-slide="right">
            <p className="micro-label mb-6">{t(C.direct, locale)}</p>
            <ul className="space-y-5">
              {INQUIRY_CATEGORIES.map((c) => (
                <li key={c.id} className="border-b border-ink/10 pb-4">
                  <p className="font-cormorant text-xl text-ink">{t(c.label, locale)}</p>
                  <a href={`mailto:${c.team}`} className="font-inter text-sm text-ink/50 hover:text-ink">{c.team}</a>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </Section>
    </Page>
  )
}

/* ───────────── FAQ ───────────── */
export function FaqView({ locale }: { locale: string }) {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <Page>
      <PageHero locale={locale} label={t({ en: 'Help', bn: 'সহায়তা' }, locale)} title={t({ en: 'Frequently asked questions', bn: 'সাধারণ জিজ্ঞাসা' }, locale)} />
      <Section>
        <div className="max-w-3xl divide-y divide-ink/10 border-y border-ink/10">
          {FAQ.map((f, i) => {
            const on = open === i
            return (
              <div key={i}>
                <h2>
                  <button
                    id={`faq-q-${i}`}
                    aria-expanded={on}
                    aria-controls={`faq-a-${i}`}
                    onClick={() => setOpen(on ? null : i)}
                    className="w-full flex items-center justify-between gap-6 py-6 text-left"
                  >
                    <span className="font-cormorant text-2xl md:text-3xl text-ink">{t(f.q, locale)}</span>
                    <span className={`shrink-0 w-8 h-8 rounded-full border border-ink/20 flex items-center justify-center transition-transform duration-300 ${on ? 'rotate-45' : ''}`} aria-hidden="true">+</span>
                  </button>
                </h2>
                <div id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`} hidden={!on} className="pb-6 pr-14">
                  <p className="font-inter text-base text-ink/60 leading-relaxed">{t(f.a, locale)}</p>
                </div>
              </div>
            )
          })}
        </div>
        <div className="mt-10"><PillLink href={`/${locale}/contact`}>{t(A.contact, locale)}</PillLink></div>
      </Section>
    </Page>
  )
}

/* ───────────── Legal ───────────── */
export function LegalView({ slug, locale }: { slug: string; locale: string }) {
  const doc = LEGAL[slug]
  const others = Object.entries(LEGAL).filter(([k]) => k !== slug)
  return (
    <Page>
      <PageHero locale={locale} label={t({ en: 'Policies', bn: 'নীতিমালা' }, locale)} title={t(doc.title, locale)} />
      <Section>
        <div className="grid lg:grid-cols-[1fr_260px] gap-16">
          <div className="max-w-2xl space-y-10">
            {doc.sections.map((s) => (
              <div key={s.h.en}>
                <h2 className="font-cormorant text-3xl text-ink mb-3">{t(s.h, locale)}</h2>
                <p className="font-inter text-base text-ink/60 leading-relaxed">{t(s.p, locale)}</p>
              </div>
            ))}
            <p className="font-inter text-xs text-ink/35">{t({ en: 'Draft text — to be finalised by the client’s legal team.', bn: 'খসড়া — ক্লায়েন্টের আইনি দল চূড়ান্ত করবে।' }, locale)}</p>
          </div>
          <ul className="space-y-3">
            {others.map(([k, d]) => (
              <li key={k}><Link href={`/${locale}/legal/${k}`} className="font-inter text-sm text-ink/50 hover:text-ink">{t(d.title, locale)} →</Link></li>
            ))}
          </ul>
        </div>
      </Section>
    </Page>
  )
}

/* ───────────── Search (bilingual, BRD 7.4) ───────────── */
type Hit = { type: L; title: string; text: string; href: string }

function buildIndex(locale: string): Hit[] {
  const b = `/${locale}`
  const both = (x: L) => `${x.en} ${x.bn}`
  const hits: (Hit & { hay: string })[] = [
    ...PILLARS.map((p) => ({ type: { en: 'Pillar', bn: 'স্তম্ভ' }, title: t(p.name, locale), text: t(p.hook, locale), href: `${b}/pillars/${p.slug}`, hay: [both(p.name), both(p.intro), ...p.subtopics.map((s) => both(s.title) + both(s.body))].join(' ') })),
    ...ARTICLES.map((a) => ({ type: { en: 'Article', bn: 'আর্টিকেল' }, title: t(a.title, locale), text: t(a.excerpt, locale), href: `${b}/articles/${a.slug}`, hay: [both(a.title), both(a.excerpt), ...a.body.map(both)].join(' ') })),
    ...ISSUES.map((i) => ({ type: { en: 'Magazine issue', bn: 'ম্যাগাজিন সংখ্যা' }, title: `${num(i.number, locale)} · ${t(i.title, locale)}`, text: t(i.editorsNote, locale).slice(0, 140) + '…', href: `${b}/publication/${issueKey(i)}`, hay: [both(i.title), both(i.editorsNote), ...i.toc.map(both), String(i.number)].join(' ') })),
    ...divisions.map((d) => ({ type: { en: 'Division', bn: 'বিভাগ' }, title: t(d.name as L, locale), text: t(REGIONS[d.slug].intro, locale), href: `${b}/divisions/${d.slug}`, hay: [both(d.name as L), both(REGIONS[d.slug].intro), ...d.districts, ...REGIONS[d.slug].attractions.map(both)].join(' ') })),
    ...STATS.map((s) => ({ type: { en: 'Statistic', bn: 'পরিসংখ্যান' }, title: `${s.prefix ?? ''}${num(s.value, locale)}${t(s.suffix, locale)} — ${t(s.label, locale)}`, text: `${s.source}, ${num(s.year, locale)}`, href: `${b}/numbers?pillar=${s.pillar}`, hay: [both(s.label), both(s.context), s.source].join(' ') })),
    ...REPORTS.map((r) => ({ type: { en: 'Report', bn: 'প্রতিবেদন' }, title: t(r.title, locale), text: r.date, href: `${b}/publication/reports`, hay: both(r.title) })),
    ...CHAPTERS.map((c) => ({ type: { en: 'Brand Story', bn: 'ব্র্যান্ড গল্প' }, title: t(c.title, locale), text: t(c.body, locale).slice(0, 140) + '…', href: `${b}/story#${c.id}`, hay: both(c.title) + both(c.body) })),
  ]
  return hits as Hit[]
}

export function SearchView({ locale }: { locale: string }) {
  const [q, setQ] = useState('')
  useEffect(() => { setQ(new URLSearchParams(window.location.search).get('q') ?? '') }, [])
  const index = useMemo(() => buildIndex(locale) as (Hit & { hay: string })[], [locale])
  const results = useMemo(() => {
    const terms = q.toLowerCase().trim().split(/\s+/).filter(Boolean)
    if (!terms.length) return []
    return index.filter((h) => { const hay = h.hay.toLowerCase(); return terms.every((x) => hay.includes(x)) })
  }, [q, index])

  return (
    <Page>
      <PageHero locale={locale} label={t(ui.search, locale)} title={t({ en: 'Search Brand Bangladesh', bn: 'ব্র্যান্ড বাংলাদেশে অনুসন্ধান' }, locale)} />
      <Section>
        <form role="search" onSubmit={(e) => { e.preventDefault(); history.replaceState(null, '', `?q=${encodeURIComponent(q)}`) }} className="max-w-3xl mb-12">
          <label htmlFor="site-search" className="sr-only">{t(ui.search, locale)}</label>
          <input
            id="site-search"
            type="search"
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t({ en: 'Sundarbans, garments, সুন্দরবন…', bn: 'সুন্দরবন, পোশাক, Sundarbans…' }, locale)}
            className="w-full font-cormorant text-3xl md:text-5xl bg-transparent border-b border-ink/20 focus:border-teal outline-none py-3 placeholder:text-ink/20"
          />
          <p className="font-inter text-xs text-ink/40 mt-3">{t({ en: 'Searches English and Bangla content together.', bn: 'ইংরেজি ও বাংলা দুই ভাষার কনটেন্টে একসঙ্গে খোঁজে।' }, locale)}</p>
        </form>
        {q && (
          <p className="micro-label text-ink/50 mb-6" aria-live="polite">
            {num(results.length, locale)} {t({ en: 'results', bn: 'টি ফলাফল' }, locale)}
          </p>
        )}
        <ul className="max-w-3xl divide-y divide-ink/10">
          {results.map((h) => (
            <li key={h.href + h.title}>
              <Link href={h.href} className="group block py-5">
                <p className="micro-label mb-1">{t(h.type, locale)}</p>
                <p className="font-cormorant text-2xl text-ink group-hover:opacity-60">{h.title}</p>
                <p className="font-inter text-sm text-ink/50 mt-1">{h.text}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </Page>
  )
}
