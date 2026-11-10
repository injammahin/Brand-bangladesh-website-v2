import { pageMeta } from '@/lib/meta'
import { AboutView } from '@/components/views/InfoViews'
type P = { params: { locale: string } }
export const generateMetadata = ({ params }: P) => pageMeta(params.locale, 'about',
  { en: 'About the initiative', bn: 'উদ্যোগ সম্পর্কে' },
  { en: 'Mission, governance, team and partners behind Brand Bangladesh.', bn: 'ব্র্যান্ড বাংলাদেশের লক্ষ্য, পরিচালনা, দল ও অংশীদার।' })
export default function Page({ params }: P) { return <AboutView locale={params.locale} /> }
