import { pageMeta } from '@/lib/meta'
import { FaqView } from '@/components/views/InfoViews'
type P = { params: { locale: string } }
export const generateMetadata = ({ params }: P) => pageMeta(params.locale, 'faq',
  { en: 'FAQ', bn: 'সাধারণ জিজ্ঞাসা' }, { en: 'Answers to common questions about Brand Bangladesh.', bn: 'ব্র্যান্ড বাংলাদেশ সম্পর্কে সাধারণ প্রশ্নের উত্তর।' })
export default function Page({ params }: P) { return <FaqView locale={params.locale} /> }
