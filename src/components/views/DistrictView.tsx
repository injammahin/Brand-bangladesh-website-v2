'use client'
import { Page, PageHero, PillLink } from '@/components/page/Blocks'
import { DISTRICT_BN } from '@/content/regions'
import { t, type L } from '@/lib/i18n'

const S = {
  label: { en: 'District', bn: 'জেলা' },
  soon: { en: 'A full district profile — places, food, people and stories — arrives in Phase 2. Meanwhile, explore the division.', bn: 'জেলার পূর্ণাঙ্গ পরিচিতি — স্থান, খাবার, মানুষ ও গল্প — আসছে দ্বিতীয় ধাপে। ততক্ষণ বিভাগটি ঘুরে দেখুন।' },
  back: { en: 'Explore the division', bn: 'বিভাগটি ঘুরে দেখুন' },
  share: { en: 'Share a story from here', bn: 'এখানকার একটি গল্প বলুন' },
  regions: { en: 'Regions', bn: 'অঞ্চল' },
}

export function DistrictView({ locale, division, name }: { locale: string; division: { slug: string; name: L; accent: string }; name: string }) {
  const b = `/${locale}`
  const title = locale === 'bn' ? DISTRICT_BN[name] ?? name : name
  return (
    <Page>
      <PageHero
        locale={locale}
        crumbs={[{ label: t(S.regions, locale), href: `${b}/regions` }, { label: t(division.name, locale), href: `${b}/divisions/${division.slug}` }, { label: title }]}
        label={`${t(S.label, locale)} · ${t(division.name, locale)}`}
        title={title}
        intro={t(S.soon, locale)}
        accent={division.accent}
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <PillLink href={`${b}/divisions/${division.slug}`} dark>{t(S.back, locale)}</PillLink>
          <PillLink href={`${b}/community#share`}>{t(S.share, locale)}</PillLink>
        </div>
      </PageHero>
      <div className="h-24" />
    </Page>
  )
}
