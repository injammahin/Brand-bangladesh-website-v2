import type { Metadata } from 'next'
import { t, type L } from './i18n'

/** Bilingual metadata with hreflang pair, canonical, OpenGraph and Twitter cards (BRD 7.4) */
export function pageMeta(locale: string, path: string, title: L, description: L, image?: string): Metadata {
  const p = path ? `/${path.replace(/^\//, '')}` : ''
  const tt = t(title, locale)
  const d = t(description, locale)
  return {
    title: tt,
    description: d,
    alternates: {
      canonical: `/${locale}${p}`,
      languages: { en: `/en${p}`, bn: `/bn${p}`, 'x-default': `/en${p}` },
    },
    openGraph: {
      title: tt, description: d, url: `/${locale}${p}`,
      locale: locale === 'bn' ? 'bn_BD' : 'en_US',
      images: image ? [image] : ['/assets/map.jpg'],
    },
    twitter: { card: 'summary_large_image', title: tt, description: d, images: image ? [image] : ['/assets/map.jpg'] },
  }
}
