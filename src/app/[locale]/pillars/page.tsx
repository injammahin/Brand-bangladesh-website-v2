import { pageMeta } from '@/lib/meta'
import { PillarsIndexView } from '@/components/views/PillarsView'

type P = { params: { locale: string } }

export const generateMetadata = ({ params }: P) =>
  pageMeta(params.locale, 'pillars',
    { en: 'Brand Pillars', bn: 'ব্র্যান্ড স্তম্ভ' },
    { en: 'Tourism, Exports, Governance, Investment & Immigration, Culture & Heritage, and People.', bn: 'পর্যটন, রপ্তানি, সুশাসন, বিনিয়োগ ও অভিবাসন, সংস্কৃতি ও ঐতিহ্য এবং মানুষ।' })

export default function Page({ params }: P) {
  return <PillarsIndexView locale={params.locale} />
}
