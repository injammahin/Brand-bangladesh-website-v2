import { notFound } from 'next/navigation'
import { pageMeta } from '@/lib/meta'
import { ISSUES, getIssue, issueKey } from '@/content/issues'
import { IssueView } from '@/components/views/IssueView'

type P = { params: { locale: string; issue: string } }

export const dynamicParams = false
export const generateStaticParams = () => ISSUES.map((i) => ({ issue: issueKey(i) }))

export function generateMetadata({ params }: P) {
  const i = getIssue(params.issue)
  if (!i) return {}
  return pageMeta(params.locale, `publication/${params.issue}`,
    { en: `Issue ${i.number}: ${i.title.en}`, bn: `সংখ্যা ${i.number}: ${i.title.bn}` }, i.editorsNote, i.cover)
}

export default function Page({ params }: P) {
  if (!getIssue(params.issue)) notFound()
  return <IssueView id={params.issue} locale={params.locale} />
}
