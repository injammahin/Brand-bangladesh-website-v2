import { pageMeta } from '@/lib/meta'
import { RegionsView } from '@/components/views/RegionsView'

type P = { params: { locale: string } }

export const generateMetadata = ({ params }: P) =>
  pageMeta(params.locale, 'regions',
    { en: 'Regions', bn: 'অঞ্চল' },
    { en: 'An interactive map of the eight divisions of Bangladesh.', bn: 'বাংলাদেশের আট বিভাগের ইন্টারঅ্যাকটিভ মানচিত্র।' })

export default function Page({ params }: P) {
  return <RegionsView locale={params.locale} />
}
