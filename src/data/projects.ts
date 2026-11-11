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

import type { VisualImage } from '@/components/shared/Visual'

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

/** Image d'un projet (même format que les autres visuels du site) */
export type ProjectImage = VisualImage

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
    // Synthèse rédigée à partir du contenu public du site (udigit.vercel.app) ; rôle et année confirmés par Cédric.
    featured: true,
    slug: 'site-agence-udigit',
    name: 'Site web de l’agence Udigit',
    category: 'developpement-web',
    year: '2025',
    summary:
      'Le site vitrine d’une agence créative burkinabè : présenter ses expertises et ses réalisations, et transformer les visiteurs en demandes de projet.',
    context:
      'Udigit est une agence créative basée à Ouagadougou (Burkina Faso), fondée en 2021. Elle intervient en marketing digital et gestion des réseaux sociaux, en développement web et maintenance informatique, et en branding et communication visuelle. Son site devait porter son positionnement : « des designs ambassadeurs de votre marque ».',
    problem:
      'Présenter clairement une offre large, qui va du design graphique à la maintenance informatique ; montrer des réalisations de natures très différentes (identités visuelles, contenus vidéo, sites web) ; et offrir aux visiteurs un chemin simple vers la prise de contact.',
    solution:
      'Un site multipage — accueil, services, à propos, projets, blog, contact et pages légales. Les quatre pôles de services sont détaillés avec leurs prestations et un processus en quatre étapes (découverte, conception, développement, lancement). Le portfolio est organisé en trois sections : conceptions graphiques, créations de contenus et sites web. Des appels à l’action « Démarrer votre projet » jalonnent les pages, et les réseaux sociaux de l’agence sont mis en avant.',
    role: 'Conception et développement du site.',
    tools: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion'],
    cover: {
      src: '/images/projects/udigit/cover-1355.webp',
      srcSet: '/images/projects/udigit/cover-800.webp 800w, /images/projects/udigit/cover-1355.webp 1355w',
      alt: 'Page d’accueil du site Udigit, avec le titre « Nous créons des designs ambassadeurs de votre marque »',
    },
    url: 'https://udigit.vercel.app/',
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
