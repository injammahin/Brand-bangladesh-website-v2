'use client'
/**
 * Form primitives in the site's editorial style: hairline borders, Inter, micro-labels.
 * Every field has a visible label and an associated error message (WCAG).
 */
import { ReactNode, useId } from 'react'

const inputCls =
  'w-full font-inter text-sm bg-transparent border border-ink/20 rounded px-3 py-2.5 focus:border-teal outline-none transition-colors aria-[invalid=true]:border-red'

interface BaseProps {
  label: string
  name: string
  required?: boolean
  error?: string
  hint?: string
}

function Wrap({ id, label, required, error, hint, children }: BaseProps & { id: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="block micro-label text-ink/60 mb-2">
        {label}{required && <span className="text-red" aria-hidden="true"> *</span>}
      </label>
      {children}
      {hint && !error && <p id={`${id}-hint`} className="font-inter text-xs text-ink/40 mt-1.5">{hint}</p>}
      {error && <p id={`${id}-err`} className="font-inter text-xs text-red mt-1.5" role="alert">{error}</p>}
    </div>
  )
}

export function TextField(props: BaseProps & { type?: string; defaultValue?: string; placeholder?: string; autoComplete?: string }) {
  const id = useId()
  return (
    <Wrap id={id} {...props}>
      <input
        id={id}
        name={props.name}
        type={props.type ?? 'text'}
        defaultValue={props.defaultValue}
        placeholder={props.placeholder}
        autoComplete={props.autoComplete}
        required={props.required}
        aria-invalid={!!props.error}
        aria-describedby={props.error ? `${id}-err` : props.hint ? `${id}-hint` : undefined}
        className={inputCls}
      />
    </Wrap>
  )
}

export function TextArea(props: BaseProps & { rows?: number; defaultValue?: string; maxLength?: number }) {
  const id = useId()
  return (
    <Wrap id={id} {...props}>
      <textarea
        id={id}
        name={props.name}
        rows={props.rows ?? 5}
        defaultValue={props.defaultValue}
        maxLength={props.maxLength}
        required={props.required}
        aria-invalid={!!props.error}
        aria-describedby={props.error ? `${id}-err` : props.hint ? `${id}-hint` : undefined}
        className={`${inputCls} resize-y`}
      />
    </Wrap>
  )
}

export function Select(props: BaseProps & { options: { value: string; label: string }[]; defaultValue?: string; onChange?: (v: string) => void }) {
  const id = useId()
  return (
    <Wrap id={id} {...props}>
      <select
        id={id}
        name={props.name}
        defaultValue={props.defaultValue}
        required={props.required}
        onChange={(e) => props.onChange?.(e.target.value)}
        aria-invalid={!!props.error}
        className={`${inputCls} appearance-none bg-[length:12px] bg-no-repeat bg-[right_12px_center]`}
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12'%3E%3Cpath d='M2 4l4 4 4-4' fill='none' stroke='%23101414' stroke-width='1.2'/%3E%3C/svg%3E\")" }}
      >
        {props.options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </Wrap>
  )
}

export function Checkbox({ name, label, error, required }: { name: string; label: ReactNode; error?: string; required?: boolean }) {
  const id = useId()
  return (
    <div>
      <div className="flex items-start gap-3">
        <input id={id} name={name} type="checkbox" required={required} aria-invalid={!!error} className="mt-1 w-4 h-4 accent-teal shrink-0" />
        <label htmlFor={id} className="font-inter text-xs text-ink/60 leading-relaxed">{label}</label>
      </div>
      {error && <p className="font-inter text-xs text-red mt-1.5 ml-7" role="alert">{error}</p>}
    </div>
  )
}

/** Hidden honeypot — bots fill it, people never see it */
export function Honeypot() {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
      <label>Website<input type="text" name="website" tabIndex={-1} autoComplete="off" /></label>
    </div>
  )
}

export function SubmitButton({ children, busy }: { children: ReactNode; busy?: boolean }) {
  return (
    <button
      type="submit"
      disabled={busy}
      className="inline-flex items-center gap-2 font-inter text-xs uppercase tracking-label px-6 py-3 bg-ink text-cream rounded-full hover:bg-ink/80 disabled:opacity-50 transition-colors"
      data-cursor="link"
    >
      {children}
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
        <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  )
}

export function FormSuccess({ title, body }: { title: string; body: string }) {
  return (
    <div role="status" className="border border-teal/30 bg-teal/5 rounded-lg p-6">
      <div className="w-8 h-px bg-teal mb-4" />
      <p className="font-cormorant text-2xl text-ink mb-2">{title}</p>
      <p className="font-inter text-sm text-ink/60 leading-relaxed">{body}</p>
    </div>
  )
}
