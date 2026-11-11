import { useId, useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import { AlertCircle, CheckCircle2, Info, Loader2, Send } from 'lucide-react'
import {
  ContactSendError,
  isContactConfigured,
  LIMITS,
  sendContact,
  validateContact,
  type ContactErrors,
  type ContactValues,
} from '@/lib/contact'
import { cn } from '@/lib/cn'

type Status = 'idle' | 'submitting' | 'success' | 'error'
type FieldName = keyof ContactErrors

interface ContactFormProps {
  /** Objet prérempli (ex. depuis un lien « Discuter de ce besoin ») */
  initialSubject?: string
}

const emptyValues = (subject = ''): ContactValues => ({ name: '', email: '', subject, message: '', botcheck: '' })

export function ContactForm({ initialSubject = '' }: ContactFormProps) {
  const id = useId()
  const formRef = useRef<HTMLFormElement>(null)
  const [values, setValues] = useState<ContactValues>(() => emptyValues(initialSubject))
  const [errors, setErrors] = useState<ContactErrors>({})
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({})
  const [submitted, setSubmitted] = useState(false)
  const [status, setStatus] = useState<Status>('idle')
  const [sendError, setSendError] = useState('')

  const fieldId = (name: string) => `${id}-${name}`
  const visibleError = (name: FieldName) => (touched[name] || submitted ? errors[name] : undefined)

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const next = { ...values, [e.target.name]: e.target.value }
    setValues(next)
    // Après une première tentative, les erreurs se mettent à jour en direct
    if (submitted || touched[e.target.name as FieldName]) setErrors(validateContact(next))
  }

  const onBlur = (name: FieldName) => {
    setTouched((t) => ({ ...t, [name]: true }))
    setErrors(validateContact(values))
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    const found = validateContact(values)
    setErrors(found)

    const firstInvalid = (Object.keys(found) as FieldName[])[0]
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus()
      return
    }

    setStatus('submitting')
    setSendError('')
    try {
      await sendContact(values)
      setStatus('success')
    } catch (err) {
      setSendError(err instanceof ContactSendError ? err.message : 'Une erreur inattendue est survenue.')
      setStatus('error')
    }
  }

  const reset = () => {
    setValues(emptyValues())
    setErrors({})
    setTouched({})
    setSubmitted(false)
    setStatus('idle')
  }

  if (status === 'success') {
    return (
      <div role="status" className="rounded-3xl border border-line bg-ink-900/60 p-8 sm:p-10">
        <CheckCircle2 aria-hidden="true" className="size-8 text-emerald-400" />
        <h2 className="mt-6 font-display text-2xl font-medium tracking-tight">Message envoyé</h2>
        <p className="mt-3 leading-relaxed text-muted">
          Merci {values.name.trim()}, votre message a bien été transmis. Une réponse vous sera adressée à{' '}
          <span className="text-fg">{values.email.trim()}</span>.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-8 inline-flex h-11 items-center rounded-xl border border-line px-5 text-sm transition-colors hover:bg-ink-800"
        >
          Envoyer un autre message
        </button>
      </div>
    )
  }

  const inputClass = (name: FieldName) =>
    cn(
      'w-full rounded-xl border bg-ink-950 px-4 text-fg transition-colors placeholder:text-subtle focus:outline-none',
      visibleError(name) ? 'border-red-400/70 focus:border-red-400' : 'border-line hover:border-ink-800 focus:border-brand-400',
    )

  const renderError = (name: FieldName) => {
    const message = visibleError(name)
    return message ? (
      <p id={`${fieldId(name)}-error`} className="mt-2 flex items-center gap-1.5 text-sm text-red-300">
        <AlertCircle aria-hidden="true" className="size-4 shrink-0" />
        {message}
      </p>
    ) : null
  }

  const describedBy = (name: FieldName) => (visibleError(name) ? `${fieldId(name)}-error` : undefined)
  const submitting = status === 'submitting'

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      aria-busy={submitting}
      className="rounded-3xl border border-line bg-ink-900/60 p-6 sm:p-10"
    >
      {!isContactConfigured && (
        <div className="mb-8 flex gap-3 rounded-xl border border-dashed border-amber-400/40 p-4 text-sm leading-relaxed text-amber-100/90">
          <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-amber-300" />
          <p>
            <strong className="font-medium">Formulaire en cours de configuration.</strong> Le service d’envoi n’est
            pas encore connecté : en attendant, utilisez les coordonnées indiquées sur cette page.
          </p>
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor={fieldId('name')} className="mb-2 block text-sm font-medium">
            Nom
          </label>
          <input
            id={fieldId('name')}
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={onChange}
            onBlur={() => onBlur('name')}
            maxLength={LIMITS.name.max}
            aria-invalid={Boolean(visibleError('name'))}
            aria-describedby={describedBy('name')}
            className={cn(inputClass('name'), 'h-12')}
          />
          {renderError('name')}
        </div>

        <div>
          <label htmlFor={fieldId('email')} className="mb-2 block text-sm font-medium">
            Adresse email
          </label>
          <input
            id={fieldId('email')}
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            value={values.email}
            onChange={onChange}
            onBlur={() => onBlur('email')}
            placeholder="nom@exemple.com"
            aria-invalid={Boolean(visibleError('email'))}
            aria-describedby={describedBy('email')}
            className={cn(inputClass('email'), 'h-12')}
          />
          {renderError('email')}
        </div>
      </div>

      <div className="mt-6">
        <label htmlFor={fieldId('subject')} className="mb-2 block text-sm font-medium">
          Objet
        </label>
        <input
          id={fieldId('subject')}
          name="subject"
          type="text"
          value={values.subject}
          onChange={onChange}
          onBlur={() => onBlur('subject')}
          maxLength={LIMITS.subject.max}
          aria-invalid={Boolean(visibleError('subject'))}
          aria-describedby={describedBy('subject')}
          className={cn(inputClass('subject'), 'h-12')}
        />
        {renderError('subject')}
      </div>

      <div className="mt-6">
        <div className="mb-2 flex items-baseline justify-between gap-4">
          <label htmlFor={fieldId('message')} className="block text-sm font-medium">
            Message
          </label>
          <span className="font-mono text-xs text-subtle" aria-hidden="true">
            {values.message.trim().length} / {LIMITS.message.max}
          </span>
        </div>
        <textarea
          id={fieldId('message')}
          name="message"
          rows={6}
          value={values.message}
          onChange={onChange}
          onBlur={() => onBlur('message')}
          maxLength={LIMITS.message.max}
          placeholder="Présentez votre projet, votre besoin ou votre question…"
          aria-invalid={Boolean(visibleError('message'))}
          aria-describedby={describedBy('message')}
          className={cn(inputClass('message'), 'resize-y py-3 leading-relaxed')}
        />
        {renderError('message')}
      </div>

      {/* Piège anti-spam : invisible pour les humains, rempli par certains robots */}
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
        checked={values.botcheck === 'on'}
        onChange={(e) => setValues((v) => ({ ...v, botcheck: e.target.checked ? 'on' : '' }))}
      />

      {status === 'error' && (
        <div role="alert" className="mt-6 flex gap-3 rounded-xl border border-red-400/40 bg-red-400/5 p-4 text-sm text-red-200">
          <AlertCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
          <p>
            {sendError} Vous pouvez aussi utiliser les coordonnées indiquées sur cette page.
          </p>
        </div>
      )}

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-relaxed text-subtle">
          Vos informations servent uniquement à répondre à votre message.
        </p>
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-brand-500 px-6 text-sm font-medium text-white transition-colors hover:bg-brand-700 disabled:cursor-wait disabled:opacity-70"
        >
          {submitting ? (
            <>
              <Loader2 aria-hidden="true" className="size-4 animate-spin" />
              Envoi en cours…
            </>
          ) : (
            <>
              Envoyer le message
              <Send aria-hidden="true" className="size-4" />
            </>
          )}
        </button>
      </div>
    </form>
  )
}
