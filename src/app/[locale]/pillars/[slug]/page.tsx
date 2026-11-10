import { notFound } from 'next/navigation'
import { pageMeta } from '@/lib/meta'
import { PILLARS, getPillar } from '@/content/pillars'
import { PillarView } from '@/components/views/PillarsView'

type P = { params: { locale: string; slug: string } }

export const dynamicParams = false
export const generateStaticParams = () => PILLARS.map((p) => ({ slug: p.slug }))

export function generateMetadata({ params }: P) {
  const p = getPillar(params.slug)
  if (!p) return {}
  return pageMeta(params.locale, `pillars/${p.slug}`, p.name, p.hook, p.image)
}

export default function Page({ params }: P) {
  if (!getPillar(params.slug)) notFound()
  return <PillarView slug={params.slug} locale={params.locale} />
}
