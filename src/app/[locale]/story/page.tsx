import { pageMeta } from '@/lib/meta'
import { StoryView } from '@/components/views/StoryView'

type P = { params: { locale: string } }

export const generateMetadata = ({ params }: P) =>
  pageMeta(params.locale, 'story',
    { en: 'The Brand Story', bn: 'ব্র্যান্ড গল্প' },
    { en: 'The land, the history, the people, the economy and the future of Bangladesh.', bn: 'বাংলাদেশের মাটি, ইতিহাস, মানুষ, অর্থনীতি ও ভবিষ্যৎ।' })

export default function Page({ params }: P) {
  return <StoryView locale={params.locale} />
}
