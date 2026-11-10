import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PageTransitionProvider } from '@/components/layout/PageTransition'
import { SiteChrome } from '@/components/layout/SiteChrome'
import { isLocale } from '@/lib/i18n'

interface Props {
  children: React.ReactNode
  params: { locale: string }
}

export const dynamicParams = false

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'bn' }]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const bn = params.locale === 'bn'
  return {
    title: { default: bn ? 'ব্র্যান্ড বাংলাদেশ' : 'Brand Bangladesh', template: bn ? '%s | ব্র্যান্ড বাংলাদেশ' : '%s | Brand Bangladesh' },
    description: bn
      ? 'বাংলাদেশের জাতীয় পরিচয় ও গল্প বলার প্ল্যাটফর্ম — মাসিক ম্যাগাজিন, ছয় ব্র্যান্ড স্তম্ভ, আট বিভাগ।'
      : 'The national identity and storytelling platform of Bangladesh — a monthly magazine, six brand pillars and eight divisions.',
    alternates: { canonical: `/${params.locale}`, languages: { en: '/en', bn: '/bn' } },
    openGraph: { locale: bn ? 'bn_BD' : 'en_US', alternateLocale: bn ? 'en_US' : 'bn_BD', siteName: 'Brand Bangladesh', type: 'website' },
    twitter: { card: 'summary_large_image' },
  }
}

export default function LocaleLayout({ children, params }: Props) {
  if (!isLocale(params.locale)) notFound()
  return (
    <PageTransitionProvider>
      <div lang={params.locale} className={params.locale === 'bn' ? 'locale-bn' : undefined}>
        <SiteChrome locale={params.locale}>{children}</SiteChrome>
      </div>
    </PageTransitionProvider>
  )
}
