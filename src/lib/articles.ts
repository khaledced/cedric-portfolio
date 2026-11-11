import type { ComponentType } from 'react'
import type { Article } from '@/types/content'

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
  default: ComponentType
  frontmatter: Omit<Article, 'slug'>
}

const modules = import.meta.glob<MdxModule>('/src/content/articles/*.mdx', { eager: true })

type ArticleEntry = Article & { Content: ComponentType }

const allArticles: ArticleEntry[] = Object.entries(modules)
  .map(([path, mod]) => ({
    ...mod.frontmatter,
    slug: path.split('/').pop()!.replace(/\.mdx$/, ''),
    Content: mod.default,
  }))
  // Les brouillons ne sont visibles qu'en développement, jamais en production
  .filter((a) => !a.draft || import.meta.env.DEV)
  .sort((a, b) => b.date.localeCompare(a.date))

export function getArticles(): Article[] {
  return allArticles.map(({ Content: _content, ...meta }) => meta)
}

export function getArticle(slug: string): ArticleEntry | undefined {
  return allArticles.find((a) => a.slug === slug)
}
