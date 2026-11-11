/**
 * Formulaire de contact : validation et envoi.
 *
 * Envoi via Web3Forms (https://web3forms.com) : service gratuit, sans serveur à gérer.
 * La clé d'accès est lue dans la variable d'environnement VITE_WEB3FORMS_ACCESS_KEY.
 * Si elle est absente, le formulaire l'indique clairement : aucun envoi n'est simulé.
 */

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

const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY?.trim() ?? ''

/** true si un service d'envoi est configuré */
export const isContactConfigured = ACCESS_KEY.length > 0

export class ContactSendError extends Error {}

/** Envoie le message. Lève une ContactSendError avec un message lisible en cas d'échec. */
export async function sendContact(values: ContactValues): Promise<void> {
  if (!isContactConfigured) {
    throw new ContactSendError('Le service d’envoi n’est pas encore configuré.')
  }

  let response: Response
  try {
    response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: ACCESS_KEY,
        name: values.name.trim(),
        email: values.email.trim(),
        subject: `[Portfolio] ${values.subject.trim()}`,
        message: values.message.trim(),
        from_name: 'Portfolio — formulaire de contact',
        botcheck: values.botcheck,
      }),
      signal: AbortSignal.timeout(15000),
    })
  } catch {
    throw new ContactSendError('Impossible de joindre le service d’envoi. Vérifiez votre connexion et réessayez.')
  }

  const data = (await response.json().catch(() => null)) as { success?: boolean } | null
  if (!response.ok || !data?.success) {
    throw new ContactSendError('L’envoi a échoué. Réessayez dans quelques instants.')
  }
}
