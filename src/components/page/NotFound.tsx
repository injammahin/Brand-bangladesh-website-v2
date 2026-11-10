'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { t } from '@/lib/i18n'

export function NotFoundContent() {
  const path = usePathname() || ''
  const locale = path.startsWith('/bn') ? 'bn' : 'en'
  const b = `/${locale}`
  const links = [
    { href: `${b}/story`, label: { en: 'The Brand Story', bn: 'ব্র্যান্ড গল্প' } },
    { href: `${b}/regions`, label: { en: 'Regions', bn: 'অঞ্চল' } },
    { href: `${b}/publication`, label: { en: 'This month’s magazine', bn: 'এই মাসের ম্যাগাজিন' } },
    { href: `${b}/search`, label: { en: 'Search', bn: 'অনুসন্ধান' } },
  ]
  return (
    <main id="main-content" className="min-h-[80vh] bg-cream pt-[64px] px-6 md:px-16 flex items-center" lang={locale}>
      <div className="py-24 max-w-3xl">
        <img src="/assets/brand/logo-full.png" alt="Brand Bangladesh" className="h-14 w-auto mb-12" />
        <p className="micro-label mb-4">{locale === 'bn' ? '৪০৪' : '404'}</p>
        <h1 className="font-cormorant text-display-lg text-ink leading-display tracking-tighter mb-6">
          {t({ en: 'This river has changed course', bn: 'এই নদী পথ বদলেছে' }, locale)}
        </h1>
        <p className="font-inter text-base text-ink/60 leading-relaxed mb-10">
          {t({ en: 'The page you were looking for has moved or no longer exists. Try one of these instead.', bn: 'আপনি যে পাতাটি খুঁজছেন তা সরানো হয়েছে বা আর নেই। এর পরিবর্তে এগুলো দেখুন।' }, locale)}
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href={b} className="font-inter text-xs uppercase tracking-label px-5 py-2.5 rounded-full bg-ink text-cream hover:bg-ink/80">{t({ en: 'Home', bn: 'প্রথম পাতা' }, locale)} →</Link>
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="font-inter text-xs uppercase tracking-label px-5 py-2.5 rounded-full border border-ink/20 text-ink/70 hover:bg-ink hover:text-cream">{t(l.label, locale)}</Link>
          ))}
        </div>
      </div>
    </main>
  )
}
