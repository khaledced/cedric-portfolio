import { describe, expect, it } from 'vitest'
import { isYoutubeShort, prettyUrl, youtubeId } from './url'

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

describe('youtubeId', () => {
  it('reconnaît les différents formats de lien YouTube', () => {
    expect(youtubeId('https://www.youtube.com/watch?v=abcDEF12345&t=30s')).toBe('abcDEF12345')
    expect(youtubeId('https://youtu.be/abcDEF12345?si=xyz')).toBe('abcDEF12345')
    expect(youtubeId('https://youtube.com/shorts/abc-EF_2345')).toBe('abc-EF_2345')
    expect(youtubeId('https://m.youtube.com/watch?v=abcDEF12345')).toBe('abcDEF12345')
  })

  it('refuse les liens qui ne sont pas des vidéos YouTube', () => {
    expect(youtubeId('https://vimeo.com/123456')).toBeUndefined()
    expect(youtubeId('https://www.youtube.com/@cedricsw')).toBeUndefined()
    expect(youtubeId('pas une url')).toBeUndefined()
  })
})

describe('isYoutubeShort', () => {
  it('reconnaît les Shorts', () => {
    expect(isYoutubeShort('https://www.youtube.com/shorts/3zRoFtHRGP4')).toBe(true)
    expect(isYoutubeShort('https://youtu.be/3zRoFtHRGP4')).toBe(false)
  })
})
