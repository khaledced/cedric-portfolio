import { describe, expect, it } from 'vitest'
import { validateContact, type ContactValues } from './contact'

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
