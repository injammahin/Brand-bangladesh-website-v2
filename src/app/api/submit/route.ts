import { NextResponse } from 'next/server'
import { appendFile, mkdir } from 'fs/promises'
import path from 'path'
import { INQUIRY_CATEGORIES } from '@/content/site'

/**
 * Single intake endpoint for every public form:
 * newsletter · contact (smart routing) · story (moderation queue) · ambassador · print.
 *
 * Phase-1 stand-in for the CMS: validates, applies anti-spam (honeypot + rate limit),
 * decides routing, and appends to data/submissions.ndjson. When the CMS lands, replace
 * `persist()` with the CMS API call and email routing — the form contract stays the same.
 */

const KINDS = ['newsletter', 'contact', 'story', 'ambassador'] as const
type Kind = (typeof KINDS)[number]

const hits = new Map<string, number[]>()
function rateLimited(ip: string) {
  const now = Date.now()
  const recent = (hits.get(ip) || []).filter((t) => now - t < 60_000)
  recent.push(now)
  hits.set(ip, recent)
  return recent.length > 8 // 8 submissions / minute / IP
}

const isEmail = (v: unknown) => typeof v === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())
const str = (v: unknown, max = 5000) => (typeof v === 'string' ? v.trim().slice(0, max) : '')

async function persist(record: Record<string, unknown>) {
  const dir = path.join(process.cwd(), 'data')
  await mkdir(dir, { recursive: true })
  await appendFile(path.join(dir, 'submissions.ndjson'), JSON.stringify(record) + '\n', 'utf8')
}

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'local'
  if (rateLimited(ip)) return NextResponse.json({ ok: false, error: 'rate_limited' }, { status: 429 })

  let body: Record<string, unknown>
  try { body = await req.json() } catch { return NextResponse.json({ ok: false, error: 'bad_json' }, { status: 400 }) }

  // Honeypot: pretend success so bots learn nothing
  if (str(body.website)) return NextResponse.json({ ok: true, ref: 'BB-0' })

  const kind = body.kind as Kind
  if (!KINDS.includes(kind)) return NextResponse.json({ ok: false, error: 'bad_kind' }, { status: 400 })
  if (!isEmail(body.email)) return NextResponse.json({ ok: false, error: 'invalid_email' }, { status: 422 })

  let routedTo = 'newsletter@brandbangladesh.gov.bd'
  let status = 'received'

  if (kind === 'contact') {
    const cat = INQUIRY_CATEGORIES.find((c) => c.id === body.category) || INQUIRY_CATEGORIES[0]
    if (!str(body.name) || !str(body.message)) return NextResponse.json({ ok: false, error: 'missing_fields' }, { status: 422 })
    routedTo = cat.team
  }
  if (kind === 'story') {
    if (!str(body.name) || !str(body.title) || !str(body.story) || body.consent !== true)
      return NextResponse.json({ ok: false, error: 'missing_fields' }, { status: 422 })
    routedTo = 'moderation-queue'
    status = 'pending_moderation' // never published until a moderator approves
  }
  if (kind === 'ambassador') {
    if (!str(body.name) || body.consent !== true) return NextResponse.json({ ok: false, error: 'missing_fields' }, { status: 422 })
    routedTo = 'community@brandbangladesh.gov.bd'
  }

  const ref = `BB-${Date.now().toString(36).toUpperCase()}`
  const record: Record<string, unknown> = { ref, kind, status, routedTo, at: new Date().toISOString() }
  for (const [k, v] of Object.entries(body)) {
    if (k === 'website' || k === 'kind') continue
    record[k] = typeof v === 'string' ? str(v) : v
  }

  try { await persist(record) } catch (e) { console.error('[submit] persist failed', e) }

  return NextResponse.json({ ok: true, ref, routedTo: kind === 'story' ? undefined : routedTo })
}
