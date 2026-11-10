import { pageMeta } from '@/lib/meta'
import { SearchView } from '@/components/views/InfoViews'
type P = { params: { locale: string } }
export function generateMetadata({ params }: P) {
  return { ...pageMeta(params.locale, 'search', { en: 'Search', bn: 'অনুসন্ধান' }, { en: 'Search Brand Bangladesh.', bn: 'ব্র্যান্ড বাংলাদেশে অনুসন্ধান।' }), robots: { index: false } }
}
export default function Page({ params }: P) { return <SearchView locale={params.locale} /> }
