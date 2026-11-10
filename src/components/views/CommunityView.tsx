'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Page, PageHero, Section, Chips } from '@/components/page/Blocks'
import { TextField, TextArea, Select, Checkbox, Honeypot, SubmitButton, FormSuccess } from '@/components/forms/Fields'
import { useSubmit, isEmail, formToObject } from '@/components/forms/useSubmit'
import { WALL_STORIES, CAMPAIGNS } from '@/content/site'
import { PILLARS, getPillar } from '@/content/pillars'
import { t, ui, date } from '@/lib/i18n'

const S = {
  label: { en: 'Community', bn: 'কমিউনিটি' },
  title: { en: 'Tell the world your Bangladesh', bn: 'বিশ্বকে বলুন আপনার বাংলাদেশের কথা' },
  intro: { en: 'At home or abroad, every Bangladeshi has a story worth sharing. The best ones appear on the Story Wall and in the monthly magazine.', bn: 'দেশে বা বিদেশে — প্রত্যেক বাংলাদেশির একটি বলার মতো গল্প আছে। সেরা গল্পগুলো স্টোরি ওয়াল ও মাসিক ম্যাগাজিনে প্রকাশিত হয়।' },
  wall: { en: 'Story Wall', bn: 'স্টোরি ওয়াল' },
  wallNote: { en: 'Every story is reviewed by our moderators before it appears here.', bn: 'এখানে প্রকাশের আগে প্রতিটি গল্প আমাদের মডারেটররা পর্যালোচনা করেন।' },
  share: { en: 'Share your story', bn: 'আপনার গল্প বলুন' },
  shareIntro: { en: 'A personal story, an achievement, a place or a person you are proud of. Add a photo if you have one.', bn: 'একটি ব্যক্তিগত গল্প, অর্জন, কোনো স্থান বা মানুষ — যাঁকে নিয়ে আপনি গর্বিত। ছবি থাকলে যুক্ত করুন।' },
  name: { en: 'Your name', bn: 'আপনার নাম' },
  email: { en: 'Email', bn: 'ইমেইল' },
  place: { en: 'City & country', bn: 'শহর ও দেশ' },
  topic: { en: 'Topic', bn: 'বিষয়' },
  storyTitle: { en: 'Story title', bn: 'গল্পের শিরোনাম' },
  story: { en: 'Your story', bn: 'আপনার গল্প' },
  storyHint: { en: 'Up to 1,500 characters. English or Bangla.', bn: '১,৫০০ অক্ষর পর্যন্ত। ইংরেজি বা বাংলায়।' },
  photo: { en: 'Photo (optional, JPG/PNG, max 5 MB)', bn: 'ছবি (ঐচ্ছিক, JPG/PNG, সর্বোচ্চ ৫ MB)' },
  photoBig: { en: 'Photo must be under 5 MB', bn: 'ছবি ৫ MB-এর কম হতে হবে' },
  consent: { en: 'I confirm this story and photo are my own, and I agree to the Terms of Use and Privacy Policy, allowing Brand Bangladesh to edit and publish it with credit.', bn: 'আমি নিশ্চিত করছি যে গল্প ও ছবিটি আমার নিজের এবং ব্যবহারের শর্তাবলি ও গোপনীয়তা নীতিতে সম্মত; ব্র্যান্ড বাংলাদেশ কৃতজ্ঞতাসহ এটি সম্পাদনা ও প্রকাশ করতে পারবে।' },
  thanks: { en: 'Thank you — your story is with our moderators', bn: 'ধন্যবাদ — আপনার গল্প মডারেটরদের কাছে পৌঁছেছে' },
  thanksBody: { en: 'We review every submission within a few days. If it is approved, it will appear on the Story Wall and we will email you.', bn: 'আমরা কয়েক দিনের মধ্যে প্রতিটি জমা পর্যালোচনা করি। অনুমোদিত হলে এটি স্টোরি ওয়ালে প্রকাশিত হবে এবং আমরা আপনাকে ইমেইল করব।' },
  ref: { en: 'Reference', bn: 'রেফারেন্স' },
  campaigns: { en: 'Campaigns', bn: 'ক্যাম্পেইন' },
  until: { en: 'Open until', bn: 'চলবে' },
  join: { en: 'Join the campaign', bn: 'ক্যাম্পেইনে যোগ দিন' },
  amb: { en: 'Become an ambassador', bn: 'অ্যাম্বাসেডর হোন' },
  ambIntro: { en: 'Volunteer to represent Brand Bangladesh in your city, campus or community abroad.', bn: 'আপনার শহর, ক্যাম্পাস বা প্রবাসী সমাজে ব্র্যান্ড বাংলাদেশের প্রতিনিধিত্ব করতে স্বেচ্ছাসেবক হোন।' },
  country: { en: 'Country of residence', bn: 'বসবাসের দেশ' },
  why: { en: 'How would you like to help?', bn: 'আপনি কীভাবে সাহায্য করতে চান?' },
  ambConsent: { en: 'I agree to be contacted by the Brand Bangladesh community team.', bn: 'ব্র্যান্ড বাংলাদেশ কমিউনিটি দলের যোগাযোগে আমি সম্মত।' },
  ambThanks: { en: 'Welcome aboard', bn: 'স্বাগতম' },
  ambThanksBody: { en: 'Our community team will be in touch with next steps.', bn: 'পরবর্তী ধাপ জানাতে আমাদের কমিউনিটি দল যোগাযোগ করবে।' },
  news: { en: 'Newsletter', bn: 'নিউজলেটার' },
  newsTitle: { en: 'The monthly magazine, in your inbox', bn: 'মাসিক ম্যাগাজিন, আপনার ইনবক্সে' },
  lang: { en: 'Preferred language', bn: 'পছন্দের ভাষা' },
  subscribe: { en: 'Subscribe', bn: 'সাবস্ক্রাইব' },
  subThanks: { en: 'You are subscribed', bn: 'সাবস্ক্রিপশন সম্পন্ন' },
  subThanksBody: { en: 'The next issue arrives at the start of next month.', bn: 'পরের সংখ্যা আসছে আগামী মাসের শুরুতে।' },
  print: { en: 'Prefer print? Order the hard copy →', bn: 'মুদ্রিত কপি চান? অর্ডার করুন →' },
  phase2: { en: 'Coming next: photo contests and community polls.', bn: 'আসছে: ফটো প্রতিযোগিতা ও কমিউনিটি জরিপ।' },
}

function StoryForm({ locale }: { locale: string }) {
  const { state, result, submit } = useSubmit('story')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const d = formToObject(form)
    const er: Record<string, string> = {}
    for (const k of ['name', 'title', 'story']) if (!String(d[k] || '').trim()) er[k] = t(ui.required, locale)
    if (!isEmail(String(d.email || ''))) er.email = t(ui.invalidEmail, locale)
    if (!d.consent) er.consent = t(ui.consentRequired, locale)
    const file = (form.elements.namedItem('photo') as HTMLInputElement)?.files?.[0]
    if (file && file.size > 5 * 1024 * 1024) er.photo = t(S.photoBig, locale)
    setErrors(er)
    if (Object.keys(er).length) return
    // Photo metadata travels with the submission; binary upload goes to CMS media storage in Phase 2 backend
    await submit({ ...d, locale, photo: file ? { name: file.name, size: file.size, type: file.type } : null })
  }

  if (state === 'done') return <FormSuccess title={t(S.thanks, locale)} body={`${t(S.thanksBody, locale)} ${t(S.ref, locale)}: ${result.ref}`} />

  return (
    <form onSubmit={onSubmit} noValidate className="relative grid sm:grid-cols-2 gap-5" aria-label={t(S.share, locale)}>
      <Honeypot />
      <TextField name="name" label={t(S.name, locale)} required error={errors.name} autoComplete="name" />
      <TextField name="email" type="email" label={t(S.email, locale)} required error={errors.email} autoComplete="email" />
      <TextField name="place" label={t(S.place, locale)} />
      <Select name="pillar" label={t(S.topic, locale)} options={PILLARS.map((p) => ({ value: p.slug, label: t(p.name, locale) }))} defaultValue="people" />
      <div className="sm:col-span-2"><TextField name="title" label={t(S.storyTitle, locale)} required error={errors.title} /></div>
      <div className="sm:col-span-2"><TextArea name="story" label={t(S.story, locale)} required error={errors.story} hint={t(S.storyHint, locale)} maxLength={1500} rows={6} /></div>
      <div className="sm:col-span-2">
        <label className="block micro-label text-ink/60 mb-2" htmlFor="story-photo">{t(S.photo, locale)}</label>
        <input id="story-photo" name="photo" type="file" accept="image/jpeg,image/png" className="font-inter text-sm text-ink/60 file:mr-4 file:px-4 file:py-2 file:rounded-full file:border file:border-ink/20 file:bg-transparent file:font-inter file:text-xs file:uppercase file:tracking-label" />
        {errors.photo && <p className="font-inter text-xs text-red mt-1.5" role="alert">{errors.photo}</p>}
      </div>
      <div className="sm:col-span-2">
        <Checkbox name="consent" required error={errors.consent} label={<>{t(S.consent, locale)} <Link href={`/${locale}/legal/terms`} className="underline">↗</Link></>} />
      </div>
      {state === 'error' && <p className="sm:col-span-2 font-inter text-xs text-red" role="alert">{t(ui.genericError, locale)}</p>}
      <div className="sm:col-span-2"><SubmitButton busy={state === 'sending'}>{t(state === 'sending' ? ui.sending : ui.submit, locale)}</SubmitButton></div>
    </form>
  )
}

function AmbassadorForm({ locale }: { locale: string }) {
  const { state, submit } = useSubmit('ambassador')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const d = formToObject(e.currentTarget)
    const er: Record<string, string> = {}
    if (!String(d.name || '').trim()) er.name = t(ui.required, locale)
    if (!isEmail(String(d.email || ''))) er.email = t(ui.invalidEmail, locale)
    if (!d.consent) er.consent = t(ui.consentRequired, locale)
    setErrors(er)
    if (!Object.keys(er).length) await submit({ ...d, locale })
  }
  if (state === 'done') return <FormSuccess title={t(S.ambThanks, locale)} body={t(S.ambThanksBody, locale)} />
  return (
    <form onSubmit={onSubmit} noValidate className="relative grid gap-5" aria-label={t(S.amb, locale)}>
      <Honeypot />
      <TextField name="name" label={t(S.name, locale)} required error={errors.name} autoComplete="name" />
      <TextField name="email" type="email" label={t(S.email, locale)} required error={errors.email} autoComplete="email" />
      <TextField name="country" label={t(S.country, locale)} autoComplete="country-name" />
      <TextArea name="message" label={t(S.why, locale)} rows={3} />
      <Checkbox name="consent" required error={errors.consent} label={t(S.ambConsent, locale)} />
      {state === 'error' && <p className="font-inter text-xs text-red" role="alert">{t(ui.genericError, locale)}</p>}
      <div><SubmitButton busy={state === 'sending'}>{t(state === 'sending' ? ui.sending : ui.submit, locale)}</SubmitButton></div>
    </form>
  )
}

function NewsletterForm({ locale }: { locale: string }) {
  const { state, submit } = useSubmit('newsletter')
  const [err, setErr] = useState('')
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const d = formToObject(e.currentTarget)
    if (!isEmail(String(d.email || ''))) { setErr(t(ui.invalidEmail, locale)); return }
    setErr('')
    await submit({ ...d, source: 'community' })
  }
  if (state === 'done') return <FormSuccess title={t(S.subThanks, locale)} body={t(S.subThanksBody, locale)} />
  return (
    <form onSubmit={onSubmit} noValidate className="relative grid sm:grid-cols-[1fr_200px_auto] gap-4 items-end" aria-label={t(S.news, locale)}>
      <Honeypot />
      <TextField name="email" type="email" label={t(S.email, locale)} required error={err} autoComplete="email" />
      <Select name="lang" label={t(S.lang, locale)} defaultValue={locale} options={[{ value: 'en', label: 'English' }, { value: 'bn', label: 'বাংলা' }]} />
      <div className="pb-[1px]"><SubmitButton busy={state === 'sending'}>{t(S.subscribe, locale)}</SubmitButton></div>
    </form>
  )
}

export function CommunityView({ locale }: { locale: string }) {
  const [filter, setFilter] = useState('all')
  const wall = WALL_STORIES.filter((s) => filter === 'all' || s.pillar === filter)
  const b = `/${locale}`

  return (
    <Page>
      <PageHero locale={locale} label={t(S.label, locale)} title={t(S.title, locale)} intro={t(S.intro, locale)} image="/assets/stories/diaspora.jpg" accent="#A5CD2F" />

      {/* Story wall */}
      <Section index={1} tone="warm" id="wall" label={t(S.wall, locale)}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <Chips label={t(S.topic, locale)} value={filter} onChange={setFilter}
            options={[{ value: 'all', label: t(ui.all, locale) }, ...PILLARS.map((p) => ({ value: p.slug as string, label: t(p.name, locale) }))]} />
          <p className="font-inter text-xs text-ink/40">{t(S.wallNote, locale)}</p>
        </div>
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 [&>*]:mb-6">
          {wall.map((s) => (
            <article key={s.id} className="break-inside-avoid border border-ink/[0.07] rounded-xl p-6 bg-cream transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_18px_36px_-22px_rgba(16,20,20,.4)]">
              <div className="w-8 h-1 rounded-full mb-5" style={{ backgroundColor: s.color }} />
              <h3 className="font-cormorant text-2xl text-ink leading-heading mb-3">{t(s.title, locale)}</h3>
              <p className="font-inter text-sm text-ink/60 leading-relaxed mb-5">“{t(s.body, locale)}”</p>
              <p className="micro-label text-ink/50">{s.name} · {t(s.place, locale)}</p>
              <p className="micro-label mt-1" style={{ color: s.color }}>{t(getPillar(s.pillar)!.name, locale)}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* Share form */}
      <Section index={2} id="share" label={t(S.share, locale)} title={t(S.share, locale)}>
        <div className="grid lg:grid-cols-[1fr_1.6fr] gap-12">
          <p data-slide="left" className="font-inter text-base text-ink/60 leading-relaxed">{t(S.shareIntro, locale)}</p>
          <div data-slide="right"><StoryForm locale={locale} /></div>
        </div>
      </Section>

      {/* Campaigns */}
      <Section index={3} tone="warm" id="campaigns" label={t(S.campaigns, locale)}>
        <div className="grid md:grid-cols-2 gap-6">
          {CAMPAIGNS.map((c) => (
            <Link key={c.slug} href={`${b}/community/campaigns/${c.slug}`} data-slide={c.slug === CAMPAIGNS[0].slug ? 'left' : 'right'} className="group relative block aspect-[16/10] rounded-xl overflow-hidden" data-cursor="view">
              <img src={c.image} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${c.color}dd 0%, transparent 60%)` }} />
              <div className="absolute bottom-0 p-6">
                <p className="micro-label text-cream/80 mb-2">{c.tag}</p>
                <h3 className="font-cormorant text-4xl text-cream leading-heading">{t(c.title, locale)}</h3>
                <p className="micro-label text-cream/70 mt-2">{t(S.until, locale)} {date(c.ends, locale)}</p>
              </div>
            </Link>
          ))}
        </div>
        <p className="font-inter text-xs text-ink/40 mt-6">{t(S.phase2, locale)}</p>
      </Section>

      {/* Ambassador + newsletter */}
      <Section index={4} id="ambassador" label={t(S.amb, locale)}>
        <div className="grid lg:grid-cols-[1fr_1.6fr] gap-12">
          <div data-slide="left">
            <h2 className="font-cormorant text-display-sm text-ink leading-display tracking-tighter mb-4">{t(S.amb, locale)}</h2>
            <p className="font-inter text-base text-ink/60 leading-relaxed">{t(S.ambIntro, locale)}</p>
          </div>
          <div data-slide="right"><AmbassadorForm locale={locale} /></div>
        </div>
      </Section>

      <Section index={5} tone="warm" id="newsletter" label={t(S.news, locale)} title={t(S.newsTitle, locale)}>
        <NewsletterForm locale={locale} />
        <Link href={`${b}/contact?category=print`} className="inline-block micro-label text-ink/50 hover:text-ink mt-6">{t(S.print, locale)}</Link>
      </Section>
    </Page>
  )
}

export function CampaignView({ slug, locale }: { slug: string; locale: string }) {
  const c = CAMPAIGNS.find((x) => x.slug === slug)!
  return (
    <Page>
      <PageHero locale={locale} crumbs={[{ label: t(S.label, locale), href: `/${locale}/community` }, { label: c.tag }]}
        label={c.tag} title={t(c.title, locale)} intro={t(c.body, locale)} image={c.image} accent={c.color}>
        <p className="micro-label text-ink/50 mt-6">{t(S.until, locale)} {date(c.ends, locale)}</p>
      </PageHero>
      <Section id="share" label={t(S.join, locale)} title={t(S.share, locale)}>
        <StoryForm locale={locale} />
      </Section>
    </Page>
  )
}
