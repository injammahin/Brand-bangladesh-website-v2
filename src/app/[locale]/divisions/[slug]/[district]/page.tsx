import { notFound } from 'next/navigation'
import divisionsData from '../../../../../../data/divisions.json'
import { DISTRICT_BN, districtSlug } from '@/content/regions'
import { pageMeta } from '@/lib/meta'
import { DistrictView } from '@/components/views/DistrictView'

/**
 * Phase-2 ready (BRD 5.4.4): all 64 district URLs already exist under their division.
 * Content for each district plugs in later without changing routes or structure.
 */
type P = { params: { locale: string; slug: string; district: string } }

export const dynamicParams = false
export const generateStaticParams = () =>
  divisionsData.flatMap((d) => d.districts.map((name) => ({ slug: d.slug, district: districtSlug(name) })))

const find = (slug: string, district: string) => {
  const div = divisionsData.find((d) => d.slug === slug)
  const name = div?.districts.find((n) => districtSlug(n) === district)
  return div && name ? { div, name } : null
}

export function generateMetadata({ params }: P) {
  const f = find(params.slug, params.district)
  if (!f) return {}
  return pageMeta(params.locale, `divisions/${params.slug}/${params.district}`,
    { en: `${f.name} District`, bn: `${DISTRICT_BN[f.name] ?? f.name} জেলা` },
    { en: `${f.name}, ${f.div.name.en} Division, Bangladesh.`, bn: `${DISTRICT_BN[f.name] ?? f.name}, ${f.div.name.bn} বিভাগ, বাংলাদেশ।` })
}

export default function Page({ params }: P) {
  const f = find(params.slug, params.district)
  if (!f) notFound()
  return <DistrictView locale={params.locale} division={{ slug: f.div.slug, name: f.div.name, accent: f.div.accent }} name={f.name} />
}
