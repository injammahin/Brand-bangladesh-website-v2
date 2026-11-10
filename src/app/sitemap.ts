import { MetadataRoute } from 'next'
import divisions from '../../data/divisions.json'
import { PILLARS } from '@/content/pillars'
import { ARTICLES } from '@/content/articles'
import { ISSUES, issueKey } from '@/content/issues'
import { CAMPAIGNS, LEGAL } from '@/content/site'
import { districtSlug } from '@/content/regions'

const BASE = 'https://brandbangladesh.gov.bd'

/** Bilingual sitemap — every URL lists its en/bn pair (hreflang alternates, BRD 7.4) */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths: { p: string; freq: 'weekly' | 'monthly' | 'yearly'; pr: number }[] = [
    { p: '', freq: 'weekly', pr: 1 },
    ...['story', 'pillars', 'regions', 'numbers', 'publication', 'community', 'about', 'contact', 'faq', 'publication/reports', 'publication/press']
      .map((p) => ({ p, freq: 'weekly' as const, pr: 0.8 })),
    ...PILLARS.map((p) => ({ p: `pillars/${p.slug}`, freq: 'monthly' as const, pr: 0.8 })),
    ...divisions.map((d) => ({ p: `divisions/${d.slug}`, freq: 'monthly' as const, pr: 0.8 })),
    ...divisions.flatMap((d) => d.districts.map((n) => ({ p: `divisions/${d.slug}/${districtSlug(n)}`, freq: 'monthly' as const, pr: 0.4 }))),
    ...ISSUES.map((i) => ({ p: `publication/${issueKey(i)}`, freq: 'yearly' as const, pr: 0.7 })),
    ...ARTICLES.map((a) => ({ p: `articles/${a.slug}`, freq: 'yearly' as const, pr: 0.7 })),
    ...CAMPAIGNS.map((c) => ({ p: `community/campaigns/${c.slug}`, freq: 'monthly' as const, pr: 0.5 })),
    ...Object.keys(LEGAL).map((k) => ({ p: `legal/${k}`, freq: 'yearly' as const, pr: 0.2 })),
  ]

  return paths.flatMap(({ p, freq, pr }) => {
    const suffix = p ? `/${p}` : ''
    const alternates = { languages: { en: `${BASE}/en${suffix}`, bn: `${BASE}/bn${suffix}` } }
    return (['en', 'bn'] as const).map((l) => ({
      url: `${BASE}/${l}${suffix}`,
      lastModified: new Date(),
      changeFrequency: freq,
      priority: pr,
      alternates,
    }))
  })
}
