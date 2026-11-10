'use client'
import { Page, PageHero, Section, UpNext } from '@/components/page/Blocks'
import { DivisionMap } from '@/components/sections/map/DivisionMap'
import { DivisionExplorer } from '@/components/sections/DivisionExplorer'
import { t } from '@/lib/i18n'

const S = {
  label: { en: 'Regions', bn: 'অঞ্চল' },
  title: { en: 'Eight divisions, sixty-four districts', bn: 'আট বিভাগ, চৌষট্টি জেলা' },
  intro: { en: 'Explore Bangladesh geographically — landscapes, attractions, industries, food and the people of every division.', bn: 'ভৌগোলিকভাবে বাংলাদেশ ঘুরে দেখুন — প্রতিটি বিভাগের প্রকৃতি, দর্শনীয় স্থান, শিল্প, খাবার ও মানুষ।' },
  map: { en: 'Interactive map', bn: 'ইন্টারঅ্যাকটিভ মানচিত্র' },
}

export function RegionsView({ locale }: { locale: string }) {
  return (
    <Page>
      <PageHero locale={locale} label={t(S.label, locale)} title={t(S.title, locale)} intro={t(S.intro, locale)} accent="#479E90" image="/assets/sylhet.jpg" meta={[t({ en: "8 divisions", bn: "৮ বিভাগ" }, locale), t({ en: "64 districts", bn: "৬৪ জেলা" }, locale)]} />
      <Section index={1} tone="warm" label={t(S.map, locale)}>
        <DivisionMap locale={locale} />
      </Section>
      <DivisionExplorer locale={locale} />
      <UpNext locale={locale} items={[
          { href: `/${locale}/publication`, label: t({ en: 'Publication', bn: 'প্রকাশনা' }, locale), title: t({ en: 'This month’s magazine', bn: 'এই মাসের ম্যাগাজিন' }, locale), image: '/assets/magazine-covers/cover-1.jpg', color: '#016171' },
          { href: `/${locale}/numbers`, label: t({ en: 'Numbers & Stories', bn: 'সংখ্যা ও গল্প' }, locale), title: t({ en: 'Credible numbers, real people', bn: 'বিশ্বাসযোগ্য সংখ্যা, বাস্তব মানুষ' }, locale), image: '/assets/stories/febric.jpg', color: '#EF1551' },
          { href: `/${locale}/community`, label: t({ en: 'Community', bn: 'কমিউনিটি' }, locale), title: t({ en: 'Share your story', bn: 'আপনার গল্প বলুন' }, locale), image: '/assets/stories/diaspora.jpg', color: '#A5CD2F' },
        ]} />
    </Page>
  )
}
