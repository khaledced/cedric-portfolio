import { describe, expect, it } from 'vitest'
import { formatDate, normalize } from './format'

describe('formatDate', () => {
  it('affiche la date en français', () => {
    expect(formatDate('2026-11-11')).toBe('11 novembre 2026')
  })

  it('ne décale pas la date d’un jour (fuseau horaire)', () => {
    expect(formatDate('2026-01-01')).toBe('1 janvier 2026')
  })

  it('renvoie la valeur d’origine si la date est invalide', () => {
    expect(formatDate('[Année]')).toBe('[Année]')
  })
})

describe('normalize', () => {
  it('supprime accents et majuscules pour la recherche', () => {
    expect(normalize('Réseaux & Systèmes')).toBe('reseaux & systemes')
    expect(normalize('Modèle')).toBe(normalize('modele'))
  })
})
