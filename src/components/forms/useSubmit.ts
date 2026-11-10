'use client'
import { useState } from 'react'

export type SubmitState = 'idle' | 'sending' | 'done' | 'error'

/** Posts a form to /api/submit. `kind` decides moderation/routing on the server. */
export function useSubmit(kind: string) {
  const [state, setState] = useState<SubmitState>('idle')
  const [result, setResult] = useState<{ ref?: string; routedTo?: string; error?: string }>({})

  const submit = async (fields: Record<string, unknown>) => {
    setState('sending')
    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ kind, ...fields }),
      })
      const json = await res.json()
      if (!res.ok || !json.ok) throw new Error(json.error || 'error')
      setResult(json)
      setState('done')
      return true
    } catch (e) {
      setResult({ error: e instanceof Error ? e.message : 'error' })
      setState('error')
      return false
    }
  }

  return { state, result, submit, reset: () => setState('idle') }
}

export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())

/** Read all named fields of a form into a plain object */
export function formToObject(form: HTMLFormElement) {
  const data: Record<string, string | boolean> = {}
  new FormData(form).forEach((v, k) => { if (typeof v === 'string') data[k] = v })
  form.querySelectorAll<HTMLInputElement>('input[type=checkbox][name]').forEach((c) => { data[c.name] = c.checked })
  return data
}
