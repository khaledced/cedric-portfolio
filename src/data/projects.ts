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
 * Vidéos : ne pas les mettre dans le site. Les publier sur YouTube et coller le lien
 * dans `videos` : seule la miniature est affichée, le clic ouvre la vidéo sur YouTube.
 *
 * Règle : aucun projet, résultat ou lien inventé. Les projets marqués
 * `placeholder: true` sont des exemples de structure, à remplacer ou supprimer.
 */

import type { ProjectVideo } from '@/components/shared/VideoGallery'
import type { VisualImage } from '@/components/shared/Visual'
import { youtubeId, youtubeThumbnail } from '@/lib/url'

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
  /** Suite de vidéos hébergées sur YouTube (aperçu sur le site, lecture sur YouTube) */
  videos?: ProjectVideo[]
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
    // Rédigé à partir du dossier de présentation du logo (19 planches) et des précisions de Cédric.
    featured: true,
    slug: 'identite-visuelle-digilab',
    name: 'Identité visuelle de Digilab',
    category: 'branding',
    year: '2026',
    summary:
      'De l’écoute du client à une marque prête pour son lancement : logo, déclinaisons et supports de communication pour Digilab, agence informatique au Burkina Faso.',
    context:
      'Digilab est une agence informatique qui préparait son lancement au Burkina Faso. Elle avait besoin d’une identité de marque et de supports de communication pour annoncer son arrivée.',
    problem:
      'Créer une marque à partir de zéro pour une jeune agence : traduire son ambition d’innovation dans une identité simple, mémorable et facile à décliner, puis la rendre visible dès le lancement.',
    solution:
      'Le projet a commencé par une réunion d’écoute du client, pour comprendre son activité, ses ambitions et ses attentes ; la suite du projet a été proposée sur cette base. Plusieurs pistes de logo ont été explorées avant d’aboutir au symbole final : un « D » traversé d’une flèche montante, accompagné de la signature « Pensé pour innover ». Le logo a été construit sur une grille, puis décliné en versions horizontale et verticale, sur fond clair et sur fond bleu, avec un motif graphique tiré du symbole. Des supports de communication ont ensuite été réalisés pour le lancement de l’agence.',
    role:
      'Écoute et cadrage du besoin avec le client, conception de l’identité visuelle (logo, déclinaisons, motif) et création des supports de communication du lancement.',
    tools: ['Adobe Illustrator', 'Adobe Photoshop', 'Canva'],
    cover: {
      src: '/images/projects/digilab/cover-1600.webp',
      srcSet: '/images/projects/digilab/cover-960.webp 960w, /images/projects/digilab/cover-1600.webp 1600w',
      alt: 'Logo Digilab en blanc sur un fond dégradé bleu',
    },
    gallery: [
      {
        src: '/images/projects/digilab/exploration-1000.webp',
        alt: 'Piste de logo explorée : un « D » dans un carré, à côté du mot Digilab',
      },
      {
        src: '/images/projects/digilab/construction-horizontale-1000.webp',
        alt: 'Grille de construction du logo Digilab en version horizontale',
      },
      {
        src: '/images/projects/digilab/logo-signature-1000.webp',
        alt: 'Logo Digilab en version verticale avec la signature « Pensé pour innover »',
      },
      {
        src: '/images/projects/digilab/construction-verticale-1000.webp',
        alt: 'Grille de construction du logo Digilab en version verticale',
      },
      {
        src: '/images/projects/digilab/motif-1000.webp',
        alt: 'Motif graphique répétant le symbole Digilab en bleu',
      },
      {
        src: '/images/projects/digilab/declinaison-1000.webp',
        alt: 'Déclinaisons du logo Digilab : symbole bleu sur fond clair et logo blanc sur fond bleu',
      },
    ],
  },
  {
    // Liens et lieux fournis par Cédric. À compléter : année, besoin, réalisation, rôle et outils.
    placeholder: true,
    featured: true,
    slug: 'creations-video',
    name: 'Vidéos publicitaires pour l’hôtellerie et la restauration',
    category: 'communication-digitale',
    year: '[Année]',
    summary:
      'Des vidéos courtes au format vertical pour trois établissements de Ouagadougou et de ses environs : un espace détente, un restaurant et un hôtel.',
    context:
      'Trois établissements du Burkina Faso : l’espace détente Lagon Lodge à Loumbila, le restaurant Melina Food et l’hôtel Zind Naaba, tous deux à Ouaga 2000. Les vidéos sont publiées au format Shorts sur YouTube.',
    problem: '[Quel était le besoin de chaque client : faire connaître le lieu, attirer de nouveaux clients, couvrir un événement… ?]',
    solution: '[Comment as-tu réalisé ces vidéos : préparation, tournage, montage, diffusion ?]',
    role: '[Ton rôle exact : écriture, tournage, montage…]',
    tools: ['[Logiciel de montage]', '[Autre outil]'],
    videos: [
      {
        featured: true,
        title: 'Lagon Lodge',
        description: 'Espace détente · Loumbila',
        url: 'https://www.youtube.com/shorts/geLfGMCugsM',
      },
      {
        title: 'Melina Food',
        description: 'Vidéo publicitaire pour le restaurant · Ouaga 2000',
        url: 'https://www.youtube.com/shorts/3zRoFtHRGP4',
      },
      {
        title: 'Cocktail dînatoire à l’hôtel Zind Naaba',
        description: 'Hôtel Zind Naaba · Ouaga 2000',
        url: 'https://www.youtube.com/shorts/GGuqCGFukpo',
      },
    ],
  },
]

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

/**
 * Visuel d'aperçu du projet (cartes) : son image de couverture, sinon la miniature
 * de sa vidéo à la une (ou de sa première vidéo), hébergée par YouTube.
 */
export function getProjectCover(project: Project): ProjectImage | undefined {
  if (project.cover) return project.cover
  const video = project.videos?.find((v) => v.featured) ?? project.videos?.[0]
  const id = video && youtubeId(video.url)
  if (!video || !id) return undefined
  return { src: youtubeThumbnail(id, 'landscape'), alt: `Aperçu de la vidéo « ${video.title} »` }
}
