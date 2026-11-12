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
  /** Résumé façon article de recherche (5 à 8 lignes), affiché en tête et dans le PDF */
  abstract?: string
  /** Mots-clés, affichés sous le résumé */
  keywords?: string[]
  /** Références citées, numérotées automatiquement [1], [2]… */
  references?: ArticleReference[]
  /**
   * true = le PDF est généré à partir du texte de ce fichier avec `npm run pdf`
   * (gabarit avec logo et coordonnées). Sans cette ligne, le PDF déposé dans
   * src/content/articles/pdf/ n'est jamais modifié.
   */
  generatePdf?: boolean
}

export interface ArticleReference {
  /** Auteur ou organisation, ex. « Anthropic » */
  author?: string
  title: string
  /** Site, revue ou éditeur */
  publisher?: string
  /** Date de publication, texte libre (ex. « 8 octobre 2026 ») */
  date?: string
  url?: string
}

export interface Article extends ArticleFrontmatter {
  slug: string
  /** Calculé automatiquement au build */
  readingTime: number
  /** true si un PDF existe pour cet article (src/content/articles/pdf/<slug>.pdf) */
  hasPdf: boolean
}
