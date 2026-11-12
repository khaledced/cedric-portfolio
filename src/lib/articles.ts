import { lazy, type LazyExoticComponent } from 'react'
import type { MDXContent } from 'mdx/types'
import {
  articleCategories,
  type Article,
  type ArticleCategory,
  type ArticleCategorySlug,
  type ArticleFrontmatter,
} from '@/types/content'

/**
 * Chargement automatique des articles.
 * Vite découvre tous les fichiers de src/content/articles/*.mdx au moment du build :
 * publier un article = ajouter un fichier .mdx, sans toucher au reste du code.
 *
 * Pour rester léger, seul l'EN-TÊTE de chaque article est chargé avec les listes
 * (plugin build/vite-plugin-article-meta.ts) ; le texte complet n'est chargé qu'à la demande
 * (aperçu « ?source » et génération du PDF avec le gabarit du site).
 */

const metas = import.meta.glob<ArticleFrontmatter>('/src/content/articles/*.mdx', {
  eager: true,
  query: '?meta',
  import: 'default',
})
const contents = import.meta.glob<{ default: MDXContent }>('/src/content/articles/*.mdx')

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

type ArticleEntry = Article & { Content: LazyExoticComponent<MDXContent>; pdfUrl?: string }

const allArticles: ArticleEntry[] = Object.entries(metas)
  .map(([path, meta]) => {
    const slug = path.split('/').pop()!.replace(/\.mdx(\?meta)?$/, '')
    const pdfUrl = pdfFiles[`/src/content/articles/pdf/${slug}.pdf`]
    const load = contents[`/src/content/articles/${slug}.mdx`]
    return { ...meta, slug, pdfUrl, hasPdf: Boolean(pdfUrl), Content: lazy(load) }
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
