import { pageMeta } from '@/lib/meta'
import { PressView } from '@/components/views/ResourcesView'

type P = { params: { locale: string } }

export const generateMetadata = ({ params }: P) =>
  pageMeta(params.locale, 'publication/press',
    { en: 'Press Room & Media Kit', bn: 'প্রেস রুম ও মিডিয়া কিট' },
    { en: 'Approved logos, photography, press contacts and usage guidelines.', bn: 'অনুমোদিত লোগো, আলোকচিত্র, প্রেস যোগাযোগ ও ব্যবহার নির্দেশিকা।' })

export default function Page({ params }: P) {
  return <PressView locale={params.locale} />
}
