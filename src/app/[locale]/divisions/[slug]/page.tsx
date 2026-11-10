import { notFound } from 'next/navigation'
import divisionsData from '../../../../../data/divisions.json'
import { REGIONS } from '@/content/regions'
import { pageMeta } from '@/lib/meta'
import { DivisionPageClient } from './DivisionPageClient'

interface Props {
  params: { slug: string; locale: string }
}

export const dynamicParams = false

export async function generateStaticParams() {
  return divisionsData.map((div) => ({ slug: div.slug }))
}

export async function generateMetadata({ params }: Props) {
  const d = divisionsData.find((x) => x.slug === params.slug)
  if (!d) return {}
  return pageMeta(
    params.locale,
    `divisions/${d.slug}`,
    { en: `${d.name.en} Division`, bn: `${d.name.bn} বিভাগ` },
    REGIONS[d.slug].intro,
    REGIONS[d.slug].photo,
  )
}

export default function DivisionPage({ params }: Props) {
  const division = divisionsData.find((d) => d.slug === params.slug)
  if (!division) notFound()

  const i = divisionsData.findIndex((d) => d.slug === params.slug)
  const prev = divisionsData[i - 1] ?? null
  const next = divisionsData[i + 1] ?? null

  return (
    <DivisionPageClient
      division={division}
      locale={params.locale}
      prev={prev ? { slug: prev.slug, name: prev.name, accent: prev.accent } : null}
      next={next ? { slug: next.slug, name: next.name, accent: next.accent } : null}
    />
  )
}
