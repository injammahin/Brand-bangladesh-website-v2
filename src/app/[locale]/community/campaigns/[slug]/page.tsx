import { notFound } from 'next/navigation'
import { pageMeta } from '@/lib/meta'
import { CAMPAIGNS } from '@/content/site'
import { CampaignView } from '@/components/views/CommunityView'

type P = { params: { locale: string; slug: string } }

export const dynamicParams = false
export const generateStaticParams = () => CAMPAIGNS.map((c) => ({ slug: c.slug }))

export function generateMetadata({ params }: P) {
  const c = CAMPAIGNS.find((x) => x.slug === params.slug)
  if (!c) return {}
  return pageMeta(params.locale, `community/campaigns/${c.slug}`, c.title, c.body, c.image)
}

export default function Page({ params }: P) {
  if (!CAMPAIGNS.find((x) => x.slug === params.slug)) notFound()
  return <CampaignView slug={params.slug} locale={params.locale} />
}
