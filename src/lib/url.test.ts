import { describe, expect, it } from 'vitest'
import { prettyUrl } from './url'

describe('prettyUrl', () => {
  it('affiche les accents en clair', () => {
    expect(prettyUrl('https://www.linkedin.com/in/cédric-sawadogo-b24084218')).toBe(
      'linkedin.com/in/cédric-sawadogo-b24084218',
    )
  })

  it('masque les chemins techniques comme profile.php', () => {
    expect(prettyUrl('https://www.facebook.com/profile.php?id=100073336573249')).toBe('facebook.com')
  })

  it('retire www, la barre finale et les paramètres', () => {
    expect(prettyUrl('https://www.instagram.com/cedricsw_/?utm_source=qr')).toBe('instagram.com/cedricsw_')
    expect(prettyUrl('https://www.tiktok.com/@cedricsw')).toBe('tiktok.com/@cedricsw')
  })
})
