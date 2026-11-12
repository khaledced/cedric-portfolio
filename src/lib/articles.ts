import type { MDXContent } from 'mdx/types'
import {
  articleCategories,
  type Article,
  type ArticleCategory,
  type ArticleCategorySlug,
} from '@/types/content'

/**
 * Chargement automatique des articles.
 * Vite découvre tous les fichiers de src/content/articles/*.mdx au moment du build :
 * publier un article = ajouter un fichier .mdx, sans toucher au reste du code.
 * Le temps de lecture est calculé au build (voir build/remark-reading-time.ts).
 *
 * Ce module n'est importé que par les pages Insights (elles-mêmes chargées à la demande),
 * donc les articles ne pèsent pas sur le chargement de l'accueil.
 */

type MdxModule = {
  default: MDXContent
  frontmatter: Omit<Article, 'slug'>
}

const modules = import.meta.glob<MdxModule>('/src/content/articles/*.mdx', { eager: true })

/*
  Version PDF des articles (générée avec `npm run pdf`, voir scripts/article-pdf.mjs).
  Un fichier src/content/articles/pdf/<slug>.pdf est détecté automatiquement :
  le bouton « Télécharger le PDF » n'apparaît que si le fichier existe.
*/
const pdfFiles = import.meta.glob<string>('/src/content/articles/pdf/*.pdf', {
  eager: true,
  query: '?url',
  import: 'default',
})

type ArticleEntry = Article & { Content: MDXContent; pdfUrl?: string }

const allArticles: ArticleEntry[] = Object.entries(modules)
  .map(([path, mod]) => ({
    ...mod.frontmatter,
    slug: path.split('/').pop()!.replace(/\.mdx$/, ''),
    Content: mod.default,
  }))
  .map((a) => {
    const pdfUrl = pdfFiles[`/src/content/articles/pdf/${a.slug}.pdf`]
    return { ...a, pdfUrl, hasPdf: Boolean(pdfUrl) }
  })
  // Les brouillons ne sont visibles qu'en développement, jamais en production
  .filter((a) => !a.draft || import.meta.env.DEV)
  .sort((a, b) => b.date.localeCompare(a.date))

export function getArticles(): Article[] {
  return allArticles.map(({ Content: _content, pdfUrl: _pdf, ...meta }) => meta)
}

export function getArticle(slug: string): ArticleEntry | undefined {
  return allArticles.find((a) => a.slug === slug)
}

/** Identifiant d'URL d'une catégorie à partir de son libellé */
export function categorySlug(label: ArticleCategory): ArticleCategorySlug | undefined {
  return articleCategories.find((c) => c.label === label)?.slug
}

/** Autres articles à suggérer : même catégorie d'abord, puis les plus récents */
export function getRelatedArticles(article: Article, count = 2): Article[] {
  const others = getArticles().filter((a) => a.slug !== article.slug)
  return [
    ...others.filter((a) => a.category === article.category),
    ...others.filter((a) => a.category !== article.category),
  ].slice(0, count)
}
