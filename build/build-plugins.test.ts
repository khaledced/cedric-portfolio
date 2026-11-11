import { describe, expect, it } from 'vitest'
import remarkReadingTime from './remark-reading-time.ts'
import { stripDrafts } from './vite-plugin-drafts.ts'

describe('remarkReadingTime', () => {
  const run = (wordCount: number) => {
    const yaml = { type: 'yaml', value: 'title: "Test"' }
    const tree = {
      type: 'root',
      children: [yaml, { type: 'paragraph', children: [{ type: 'text', value: 'mot '.repeat(wordCount) }] }],
    }
    remarkReadingTime()(tree)
    return yaml.value
  }

  it('ajoute le temps de lecture à l’en-tête (220 mots/minute)', () => {
    expect(run(660)).toContain('readingTime: 3')
  })

  it('affiche au moins 1 minute pour un texte très court', () => {
    expect(run(10)).toContain('readingTime: 1')
  })
})

describe('stripDrafts', () => {
  const plugin = stripDrafts()
  const transform = (code: string, id = '/src/content/articles/a.mdx') =>
    (plugin.transform as (code: string, id: string) => string | null)(code, id)

  it('vide complètement le contenu d’un brouillon', () => {
    const out = transform('---\ntitle: "Secret"\ndraft: true\n---\n\nTexte confidentiel')
    expect(out).not.toBeNull()
    expect(out).not.toContain('Secret')
    expect(out).not.toContain('Texte confidentiel')
    expect(out).toContain('draft: true')
  })

  it('laisse intact un article publié', () => {
    expect(transform('---\ntitle: "Publié"\n---\n\nTexte')).toBeNull()
    expect(transform('---\ntitle: "Publié"\ndraft: false\n---\n\nTexte')).toBeNull()
  })

  it('ignore les fichiers qui ne sont pas des articles', () => {
    expect(transform('draft: true', '/src/app.tsx')).toBeNull()
  })

  it('ne s’applique qu’au build de production', () => {
    expect(plugin.apply).toBe('build')
  })
})
