import { describe, expect, it } from 'vitest'
import { buildContactRequest, validateContact, type ContactValues } from './contact'

const valid: ContactValues = {
  name: 'Awa Ouédraogo',
  email: 'awa@exemple.com',
  subject: 'Projet de site web',
  message: 'Bonjour, je souhaite échanger sur un projet de site vitrine.',
  botcheck: '',
}

describe('validateContact', () => {
  it('accepte un message complet et valide', () => {
    expect(validateContact(valid)).toEqual({})
  })

  it('signale chaque champ vide', () => {
    const errors = validateContact({ name: '', email: '', subject: '', message: '', botcheck: '' })
    expect(Object.keys(errors).sort()).toEqual(['email', 'message', 'name', 'subject'])
  })

  it('ignore les espaces autour des valeurs', () => {
    expect(validateContact({ ...valid, name: '   ' }).name).toBeDefined()
    expect(validateContact({ ...valid, email: '  awa@exemple.com  ' }).email).toBeUndefined()
  })

  it.each(['awa', 'awa@', 'awa@exemple', 'awa exemple@mail.com', '@exemple.com'])(
    'refuse l’adresse email invalide « %s »',
    (email) => {
      expect(validateContact({ ...valid, email }).email).toBeDefined()
    },
  )

  it('exige un message d’au moins 20 caractères', () => {
    expect(validateContact({ ...valid, message: 'Trop court' }).message).toMatch(/20 caractères/)
  })

  it('refuse un message trop long', () => {
    expect(validateContact({ ...valid, message: 'a'.repeat(4001) }).message).toBeDefined()
  })
})

describe('buildContactRequest', () => {
  it('envoie par défaut à l’adresse du site via FormSubmit', () => {
    const { url, body } = buildContactRequest(valid, { formsubmitTarget: 'moi@exemple.com' })
    expect(url).toBe('https://formsubmit.co/ajax/moi%40exemple.com')
    expect(body._subject).toBe('[Portfolio] Projet de site web')
    // « Répondre » dans la messagerie répond à l’expéditeur
    expect(body._replyto).toBe('awa@exemple.com')
    expect(body.message).toBe(valid.message)
    expect(body._honey).toBe('')
  })

  it('accepte l’identifiant aléatoire FormSubmit à la place de l’adresse', () => {
    expect(buildContactRequest(valid, { formsubmitTarget: 'a1b2c3' }).url).toBe('https://formsubmit.co/ajax/a1b2c3')
  })

  it('utilise Web3Forms quand une clé est fournie', () => {
    const { url, body } = buildContactRequest(valid, { web3formsKey: 'cle', formsubmitTarget: 'moi@exemple.com' })
    expect(url).toBe('https://api.web3forms.com/submit')
    expect(body.access_key).toBe('cle')
  })

  it('transmet le champ piège rempli par un robot', () => {
    const { body } = buildContactRequest({ ...valid, botcheck: 'on' }, { formsubmitTarget: 'moi@exemple.com' })
    expect(body._honey).toBe('on')
  })
})
