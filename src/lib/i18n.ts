/**
 * Lightweight bilingual helpers (EN / BN).
 * Every user-facing string lives as { en, bn } so both languages ship together.
 */

export const locales = ['en', 'bn'] as const
export type Locale = (typeof locales)[number]
export type L = { en: string; bn: string }

export function isLocale(v: string): v is Locale {
  return (locales as readonly string[]).includes(v)
}

export function asLocale(v: string | undefined): Locale {
  return v && isLocale(v) ? v : 'en'
}

const BN_DIGITS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯']

/** Convert ASCII digits to Bangla numerals when locale is bn */
export function num(value: string | number, locale: string): string {
  const s = String(value)
  return locale === 'bn' ? s.replace(/[0-9]/g, (d) => BN_DIGITS[+d]) : s
}

/** Pick the right language from an { en, bn } pair; numbers in bn are localised */
export function t(v: L | string, locale: string): string {
  if (typeof v === 'string') return v
  return locale === 'bn' ? v.bn : v.en
}

const BN_MONTHS = ['জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন', 'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর']
const EN_MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

/** Format an ISO date (YYYY-MM-DD) for the locale, with Bangla numerals in bn */
export function date(iso: string, locale: string): string {
  const [y, m, d] = iso.split('-').map(Number)
  if (locale === 'bn') return `${num(d, 'bn')} ${BN_MONTHS[m - 1]} ${num(y, 'bn')}`
  return `${d} ${EN_MONTHS[m - 1]} ${y}`
}

export function monthName(m: number, locale: string) {
  return locale === 'bn' ? BN_MONTHS[m - 1] : EN_MONTHS[m - 1]
}

/** Swap the locale segment of a pathname — keeps the visitor on the same page */
export function switchLocalePath(pathname: string, target: Locale): string {
  const parts = pathname.split('/')
  if (parts[1] && isLocale(parts[1])) parts[1] = target
  else parts.splice(1, 0, target)
  return parts.join('/') || `/${target}`
}

/** Shared UI strings */
export const ui = {
  nav: {
    story: { en: 'The Brand Story', bn: 'ব্র্যান্ড গল্প' },
    pillars: { en: 'Brand Pillars', bn: 'ব্র্যান্ড স্তম্ভ' },
    regions: { en: 'Regions', bn: 'অঞ্চল' },
    numbers: { en: 'Numbers & Stories', bn: 'সংখ্যা ও গল্প' },
    publication: { en: 'Publication', bn: 'প্রকাশনা' },
    community: { en: 'Community', bn: 'কমিউনিটি' },
    about: { en: 'About', bn: 'পরিচিতি' },
  },
  search: { en: 'Search', bn: 'অনুসন্ধান' },
  share: { en: 'Share', bn: 'শেয়ার' },
  copied: { en: 'Link copied', bn: 'লিংক কপি হয়েছে' },
  readMore: { en: 'Read more', bn: 'আরও পড়ুন' },
  explore: { en: 'Explore', bn: 'ঘুরে দেখুন' },
  viewAll: { en: 'View all', bn: 'সব দেখুন' },
  source: { en: 'Source', bn: 'সূত্র' },
  all: { en: 'All', bn: 'সব' },
  submit: { en: 'Submit', bn: 'জমা দিন' },
  sending: { en: 'Sending…', bn: 'পাঠানো হচ্ছে…' },
  required: { en: 'This field is required', bn: 'এই ঘরটি পূরণ করা আবশ্যক' },
  invalidEmail: { en: 'Please enter a valid email address', bn: 'একটি সঠিক ইমেইল ঠিকানা লিখুন' },
  consentRequired: { en: 'Please accept the terms to continue', bn: 'চালিয়ে যেতে শর্তাবলিতে সম্মতি দিন' },
  genericError: { en: 'Something went wrong. Please try again.', bn: 'কিছু একটা সমস্যা হয়েছে। আবার চেষ্টা করুন।' },
  skipToContent: { en: 'Skip to content', bn: 'মূল বিষয়বস্তুতে যান' },
  home: { en: 'Home', bn: 'প্রথম পাতা' },
  menuOpen: { en: 'Open menu', bn: 'মেনু খুলুন' },
  menuClose: { en: 'Close menu', bn: 'মেনু বন্ধ করুন' },
  minRead: { en: 'min read', bn: 'মিনিটের পাঠ' },
}
