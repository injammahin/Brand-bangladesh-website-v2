import { pageMeta } from '@/lib/meta'
import { ContactView } from '@/components/views/InfoViews'
type P = { params: { locale: string } }
export const generateMetadata = ({ params }: P) => pageMeta(params.locale, 'contact',
  { en: 'Contact & Inquiries', bn: 'যোগাযোগ ও জিজ্ঞাসা' },
  { en: 'Investment, exports, tourism, media and magazine print inquiries — routed to the right team.', bn: 'বিনিয়োগ, রপ্তানি, পর্যটন, গণমাধ্যম ও ম্যাগাজিন মুদ্রণ বিষয়ক জিজ্ঞাসা — সঠিক দলের কাছে।' })
export default function Page({ params }: P) { return <ContactView locale={params.locale} /> }
