import { pageMeta } from '@/lib/meta'
import { NumbersView } from '@/components/views/NumbersView'

type P = { params: { locale: string } }

export const generateMetadata = ({ params }: P) =>
  pageMeta(params.locale, 'numbers',
    { en: 'Numbers & Stories', bn: 'সংখ্যা ও গল্প' },
    { en: 'National indicators with official sources, paired with the human stories behind them.', bn: 'সরকারি সূত্রসহ জাতীয় সূচক, সঙ্গে তার পেছনের মানুষের গল্প।' })

export default function Page({ params }: P) {
  return <NumbersView locale={params.locale} />
}
