import type { Plugin } from 'vite'

/**
 * Plugin Vite : exclut le contenu des brouillons de la version de production.
 *
 * Sans lui, un article marqué `draft: true` serait masqué à l'affichage
 * mais son texte resterait lisible dans les fichiers JavaScript publiés.
 * Au build, on remplace donc chaque brouillon par un en-tête vide.
 * En développement (`npm run dev`), les brouillons restent visibles normalement.
 */
const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---/

export function stripDrafts(): Plugin {
  return {
    name: 'strip-drafts',
    apply: 'build',
    enforce: 'pre',
    transform(code, id) {
      if (!id.endsWith('.mdx')) return null
      const frontmatter = code.match(FRONTMATTER)?.[1] ?? ''
      if (!/^draft:\s*true\s*$/m.test(frontmatter)) return null

      return [
        '---',
        'title: ""',
        'description: ""',
        'date: "1970-01-01"',
        'category: "Technologie & innovation"',
        'draft: true',
        '---',
        '',
      ].join('\n')
    },
  }
}
