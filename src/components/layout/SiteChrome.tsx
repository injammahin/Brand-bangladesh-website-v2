'use client'
/**
 * Site-wide client chrome: syncs <html lang>, initialises motion, renders cursor,
 * header, footer and the cookie-consent banner (BRD 7.5).
 */
import { ReactNode, useEffect, useState } from 'react'
import { Header } from './Header'
import { Footer } from './Footer'
import { t } from '@/lib/i18n'

const COOKIE = {
  body: {
    en: 'We use essential cookies to run this site and, with your permission, anonymous analytics to improve it.',
    bn: 'সাইটটি চালাতে আমরা প্রয়োজনীয় কুকি ব্যবহার করি এবং আপনার অনুমতি নিয়ে সাইট উন্নত করতে বেনামি বিশ্লেষণ ব্যবহার করি।',
  },
  accept: { en: 'Accept', bn: 'গ্রহণ করুন' },
  decline: { en: 'Essential only', bn: 'শুধু প্রয়োজনীয়' },
  policy: { en: 'Privacy policy', bn: 'গোপনীয়তা নীতি' },
}

function CookieBanner({ locale }: { locale: string }) {
  const [show, setShow] = useState(false)
  // Ask once the visitor starts scrolling (or after 10s) so the first view stays clear
  useEffect(() => {
    let needed = false
    try { needed = !localStorage.getItem('bb-consent') } catch { needed = false }
    if (!needed) return
    const open = () => { setShow(true); cleanup() }
    const onScroll = () => { if (window.scrollY > 120) open() }
    const timer = setTimeout(open, 10000)
    window.addEventListener('scroll', onScroll, { passive: true })
    const cleanup = () => { clearTimeout(timer); window.removeEventListener('scroll', onScroll) }
    return cleanup
  }, [])
  const choose = (v: string) => {
    try { localStorage.setItem('bb-consent', v) } catch { /* storage blocked */ }
    setShow(false)
  }
  if (!show) return null
  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:max-w-sm z-modal bg-ink text-cream rounded-lg p-5 shadow-2xl"
    >
      <p className="font-inter text-xs text-cream/70 leading-relaxed mb-4">
        {t(COOKIE.body, locale)}{' '}
        <a href={`/${locale}/legal/privacy`} className="underline text-cream">{t(COOKIE.policy, locale)}</a>
      </p>
      <div className="flex gap-2">
        <button onClick={() => choose('all')} className="font-inter text-xs uppercase tracking-label px-4 py-2 bg-cream text-ink rounded-full hover:bg-gold transition-colors">
          {t(COOKIE.accept, locale)}
        </button>
        <button onClick={() => choose('essential')} className="font-inter text-xs uppercase tracking-label px-4 py-2 border border-cream/30 rounded-full hover:border-cream transition-colors">
          {t(COOKIE.decline, locale)}
        </button>
      </div>
    </div>
  )
}

export function SiteChrome({ locale, children }: { locale: string; children: ReactNode }) {
  useEffect(() => {
    document.documentElement.lang = locale
    document.documentElement.classList.toggle('locale-bn', locale === 'bn')
  }, [locale])

  return (
    <>
      <Header locale={locale} />
      {children}
      <Footer locale={locale} />
      <CookieBanner locale={locale} />
    </>
  )
}
