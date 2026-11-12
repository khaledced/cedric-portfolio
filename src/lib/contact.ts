/**
 * Formulaire de contact : validation et envoi vers l'adresse email du site.
 *
 * Service d'envoi (gratuit, sans serveur à gérer) :
 * - par défaut, FormSubmit (https://formsubmit.co) : les messages arrivent directement à
 *   siteConfig.contact.email, sans compte ni clé. Au tout premier message, FormSubmit envoie
 *   à cette adresse un email d'activation : il suffit de cliquer une fois sur le lien.
 *   Après activation, FormSubmit fournit un identifiant aléatoire : le renseigner dans
 *   VITE_FORMSUBMIT_ID (fichier .env / Vercel) évite d'afficher l'adresse dans le code du site.
 * - si VITE_WEB3FORMS_ACCESS_KEY est renseignée, Web3Forms (https://web3forms.com) est utilisé à la place.
 */
import { siteConfig } from '@/config/site'

export interface ContactValues {
  name: string
  email: string
  subject: string
  message: string
  /** Champ piège invisible : rempli uniquement par les robots */
  botcheck: string
}

export type ContactErrors = Partial<Record<Exclude<keyof ContactValues, 'botcheck'>, string>>

export const LIMITS = {
  name: { min: 2, max: 80 },
  subject: { min: 3, max: 120 },
  message: { min: 20, max: 4000 },
} as const

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function validateContact(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {}
  const name = values.name.trim()
  const email = values.email.trim()
  const subject = values.subject.trim()
  const message = values.message.trim()

  if (!name) errors.name = 'Indiquez votre nom.'
  else if (name.length < LIMITS.name.min) errors.name = 'Votre nom semble trop court.'
  else if (name.length > LIMITS.name.max) errors.name = `${LIMITS.name.max} caractères maximum.`

  if (!email) errors.email = 'Indiquez votre adresse email.'
  else if (!EMAIL_PATTERN.test(email)) errors.email = 'Cette adresse email ne semble pas valide.'

  if (!subject) errors.subject = 'Indiquez l’objet de votre message.'
  else if (subject.length < LIMITS.subject.min) errors.subject = 'L’objet est trop court.'
  else if (subject.length > LIMITS.subject.max) errors.subject = `${LIMITS.subject.max} caractères maximum.`

  if (!message) errors.message = 'Écrivez votre message.'
  else if (message.length < LIMITS.message.min)
    errors.message = `Votre message doit contenir au moins ${LIMITS.message.min} caractères.`
  else if (message.length > LIMITS.message.max) errors.message = `${LIMITS.message.max} caractères maximum.`

  return errors
}

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY?.trim() ?? ''
/** Destinataire FormSubmit : identifiant aléatoire après activation, sinon l'adresse email du site */
const FORMSUBMIT_TARGET = import.meta.env.VITE_FORMSUBMIT_ID?.trim() || siteConfig.contact.email

/** true si un service d'envoi est configuré */
export const isContactConfigured = WEB3FORMS_KEY.length > 0 || FORMSUBMIT_TARGET.length > 0

export class ContactSendError extends Error {}

interface ContactRequest {
  url: string
  body: Record<string, string>
}

/** Prépare la requête d'envoi (séparée de l'envoi lui-même pour pouvoir la tester) */
export function buildContactRequest(
  values: ContactValues,
  config: { web3formsKey?: string; formsubmitTarget?: string } = {
    web3formsKey: WEB3FORMS_KEY,
    formsubmitTarget: FORMSUBMIT_TARGET,
  },
): ContactRequest {
  const name = values.name.trim()
  const email = values.email.trim()
  const subject = `[Portfolio] ${values.subject.trim()}`
  const message = values.message.trim()

  if (config.web3formsKey) {
    return {
      url: 'https://api.web3forms.com/submit',
      body: {
        access_key: config.web3formsKey,
        name,
        email,
        subject,
        message,
        from_name: 'Portfolio — formulaire de contact',
        botcheck: values.botcheck,
      },
    }
  }

  return {
    url: `https://formsubmit.co/ajax/${encodeURIComponent(config.formsubmitTarget ?? '')}`,
    body: {
      name,
      email,
      message,
      _subject: subject,
      // « Répondre » dans la messagerie répond directement à l'expéditeur
      _replyto: email,
      _template: 'table',
      _captcha: 'false',
      // Champ piège : si un robot le remplit, FormSubmit ignore le message
      _honey: values.botcheck,
    },
  }
}

/** Envoie le message. Lève une ContactSendError avec un message lisible en cas d'échec. */
export async function sendContact(values: ContactValues): Promise<void> {
  if (!isContactConfigured) {
    throw new ContactSendError('Le service d’envoi n’est pas encore configuré.')
  }

  const { url, body } = buildContactRequest(values)
  let response: Response
  try {
    response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(15000),
    })
  } catch {
    throw new ContactSendError('Impossible de joindre le service d’envoi. Vérifiez votre connexion et réessayez.')
  }

  const data = (await response.json().catch(() => null)) as { success?: boolean | string; message?: string } | null
  // FormSubmit répond success: "true" / "false" (texte), Web3Forms success: true / false
  const ok = data?.success === true || data?.success === 'true'
  if (!response.ok || !ok) {
    // Formulaire pas encore activé : FormSubmit attend le clic sur le lien envoyé par email
    if (data?.message && /activat/i.test(data.message)) {
      throw new ContactSendError(
        'Le formulaire est en cours d’activation. Votre message n’a pas pu être transmis pour le moment.',
      )
    }
    throw new ContactSendError('L’envoi a échoué. Réessayez dans quelques instants.')
  }
}
