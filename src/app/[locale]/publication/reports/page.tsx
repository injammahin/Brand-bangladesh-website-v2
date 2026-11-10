import { pageMeta } from '@/lib/meta'
import { ReportsView } from '@/components/views/ResourcesView'

type P = { params: { locale: string } }

export const generateMetadata = ({ params }: P) =>
  pageMeta(params.locale, 'publication/reports',
    { en: 'Reports Library', bn: 'রিপোর্ট লাইব্রেরি' },
    { en: 'Official reports, brochures and press releases.', bn: 'সরকারি প্রতিবেদন, ব্রোশিওর ও প্রেস বিজ্ঞপ্তি।' })

export default function Page({ params }: P) {
  return <ReportsView locale={params.locale} />
}
