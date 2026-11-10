import { notFound } from 'next/navigation'
import { pageMeta } from '@/lib/meta'
import { LEGAL } from '@/content/site'
import { LegalView } from '@/components/views/InfoViews'
type P = { params: { locale: string; slug: string } }
export const dynamicParams = false
export const generateStaticParams = () => Object.keys(LEGAL).map((slug) => ({ slug }))
export function generateMetadata({ params }: P) {
  const d = LEGAL[params.slug]
  return d ? pageMeta(params.locale, `legal/${params.slug}`, d.title, d.sections[0].p) : {}
}
export default function Page({ params }: P) {
  if (!LEGAL[params.slug]) notFound()
  return <LegalView slug={params.slug} locale={params.locale} />
}
