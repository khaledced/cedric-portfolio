/** Catégories éditoriales du blog / Insights */
export type ArticleCategory =
  | 'Technologie & innovation'
  | 'Intelligence artificielle'
  | 'Business & entrepreneuriat'
  | 'Marketing & communication digitale'
  | 'Transformation numérique'

/** En-tête (frontmatter) attendu en haut de chaque fichier .mdx d'article */
export interface ArticleFrontmatter {
  title: string
  description: string
  /** Format AAAA-MM-JJ */
  date: string
  category: ArticleCategory
  /** Chemin d'une image dans /public, ex. /images/articles/mon-article.jpg */
  cover?: string
  /** true = article non publié (n'apparaît pas sur le site) */
  draft?: boolean
}

export interface Article extends ArticleFrontmatter {
  slug: string
  readingTime: number
}
