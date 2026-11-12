import { readFile } from 'node:fs/promises'
import type { Plugin } from 'vite'
import { parse } from 'yaml'

/**
 * Plugin Vite : donne accès à l'EN-TÊTE d'un article (titre, description, catégorie…)
 * sans charger son texte complet.
 *
 * `import meta from './article.mdx?meta'` renvoie l'en-tête sous forme d'objet.
 * Les listes d'articles (cartes, accueil) restent ainsi très légères, quel que soit
 * le nombre ou la longueur des articles : le texte n'est chargé qu'à la demande.
 *
 * En production, l'en-tête d'un brouillon (draft: true) est vidé, comme son contenu
 * (voir vite-plugin-drafts.ts).
 */
const PREFIX = '\0article-meta:'
const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---/

export function articleMeta(): Plugin {
  let isBuild = false
  return {
    name: 'article-meta',
    enforce: 'pre',
    configResolved(config) {
      isBuild = config.command === 'build'
    },
    async resolveId(source, importer) {
      if (!source.endsWith('.mdx?meta')) return null
      const resolved = await this.resolve(source.slice(0, -'?meta'.length), importer, { skipSelf: true })
      return resolved ? PREFIX + resolved.id : null
    },
    async load(id) {
      if (!id.startsWith(PREFIX)) return null
      const file = id.slice(PREFIX.length)
      this.addWatchFile(file)
      const source = await readFile(file, 'utf8')
      const data = (parse(source.match(FRONTMATTER)?.[1] ?? '') ?? {}) as Record<string, unknown>
      const meta = isBuild && data.draft === true
        ? { title: '', description: '', date: '1970-01-01', category: 'Technologie & innovation', draft: true }
        : data
      return `export default ${JSON.stringify(meta)}`
    },
  }
}
