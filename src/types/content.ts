/**
 * Catégories éditoriales du blog / Insights.
 * `label` : texte à écrire dans le champ `category` de l'en-tête d'un article.
 * `slug`  : identifiant utilisé dans l'adresse (/insights?categorie=ia).
 */
export const articleCategories = [
  { slug: 'technologie', label: 'Technologie & innovation' },
  { slug: 'ia', label: 'Intelligence artificielle' },
  { slug: 'business', label: 'Business & entrepreneuriat' },
  { slug: 'marketing', label: 'Marketing & communication digitale' },
  { slug: 'transformation', label: 'Transformation numérique' },
] as const

export type ArticleCategory = (typeof articleCategories)[number]['label']
export type ArticleCategorySlug = (typeof articleCategories)[number]['slug']

/** En-tête (frontmatter) attendu en haut de chaque fichier .mdx d'article */
export interface ArticleFrontmatter {
  title: string
  description: string
  /** Format AAAA-MM-JJ */
  date: string
  category: ArticleCategory
  /** Chemin d'une image dans /public, ex. /images/articles/mon-article.webp */
  cover?: string
  /** Description de l'image de couverture (accessibilité) */
  coverAlt?: string
  /** true = article non publié (visible uniquement en développement) */
  draft?: boolean
}

export interface Article extends ArticleFrontmatter {
  slug: string
  /** Calculé automatiquement au build */
  readingTime: number
}
