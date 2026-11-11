/**
 * PROJETS
 * -------
 * Ajouter un projet = ajouter un objet dans la liste `projects` ci-dessous.
 * Sa page est créée automatiquement à l'adresse /projets/<slug>.
 *
 * Images : les placer dans public/images/projects/<slug>/ puis indiquer leur chemin,
 * ex. cover: '/images/projects/mon-projet/cover.webp'
 * Format conseillé : WebP, 1600 px de large maximum.
 *
 * Règle : aucun projet, résultat ou lien inventé. Les projets marqués
 * `placeholder: true` sont des exemples de structure, à remplacer ou supprimer.
 */

/** Catégories = mêmes identifiants que les services (src/data/services.ts) */
export const projectCategories = {
  'digitalisation': 'Digitalisation',
  'communication-digitale': 'Communication digitale',
  'branding': 'Identité visuelle',
  'developpement-web': 'Développement web',
  'reseaux-systemes': 'Réseaux & systèmes',
  'formation': 'Formation',
} as const

export type ProjectCategory = keyof typeof projectCategories

export interface ProjectImage {
  src: string
  /** Description de l'image pour l'accessibilité et le référencement */
  alt: string
}

export interface Project {
  /** Identifiant dans l'URL : lettres minuscules, chiffres et tirets */
  slug: string
  name: string
  category: ProjectCategory
  year: string
  /** Une phrase de présentation (affichée sur la carte) */
  summary: string
  context: string
  problem: string
  solution: string
  role: string
  tools: string[]
  /** Résultats mesurés ou constatés — uniquement s'ils sont vérifiables */
  results?: string[]
  cover?: ProjectImage
  gallery?: ProjectImage[]
  /** Lien public vers le projet, s'il existe */
  url?: string
  /** Mis en avant sur la page d'accueil */
  featured?: boolean
  placeholder?: boolean
}

export const projects: Project[] = [
  {
    placeholder: true,
    featured: true,
    slug: 'exemple-site-web',
    name: '[Projet exemple — Site web]',
    category: 'developpement-web',
    year: '[Année]',
    summary: '[Une phrase qui résume le projet et son intérêt.]',
    context: '[Pour qui ? Dans quelle situation ? Quel était l’enjeu ?]',
    problem: '[Quel problème concret fallait-il résoudre ?]',
    solution: '[Qu’as-tu proposé et réalisé ? Quels choix as-tu faits et pourquoi ?]',
    role: '[Ton rôle exact : conception, développement, gestion de projet…]',
    tools: ['[Outil 1]', '[Outil 2]', '[Outil 3]'],
  },
  {
    placeholder: true,
    featured: true,
    slug: 'exemple-identite-visuelle',
    name: '[Projet exemple — Identité visuelle]',
    category: 'branding',
    year: '[Année]',
    summary: '[Une phrase qui résume le projet et son intérêt.]',
    context: '[Pour qui ? Dans quelle situation ?]',
    problem: '[Quel était le besoin ?]',
    solution: '[Qu’as-tu conçu ?]',
    role: '[Ton rôle exact.]',
    tools: ['[Outil 1]', '[Outil 2]'],
  },
  {
    placeholder: true,
    slug: 'exemple-digitalisation',
    name: '[Projet exemple — Digitalisation]',
    category: 'digitalisation',
    year: '[Année]',
    summary: '[Une phrase qui résume le projet et son intérêt.]',
    context: '[Pour qui ? Dans quelle situation ?]',
    problem: '[Quel était le besoin ?]',
    solution: '[Qu’as-tu mis en place ?]',
    role: '[Ton rôle exact.]',
    tools: ['[Outil 1]', '[Outil 2]'],
  },
]

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}
