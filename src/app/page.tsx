import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

/** "/" → /en or /bn based on the visitor's browser language (BRD 5.1) */
export default function RootPage() {
  const accept = headers().get('accept-language') || ''
  redirect(/^bn\b/i.test(accept.trim()) ? '/bn' : '/en')
}
