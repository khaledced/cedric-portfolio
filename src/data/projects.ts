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
  /*
   * Textes courts, pour une lecture rapide : une phrase pour le résumé,
   * une ou deux phrases pour le contexte, le problème et la solution.
   */
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
      'Le site vitrine d’une agence créative de Ouagadougou, pensé pour transformer les visiteurs en demandes de projet.',
    context:
      'Udigit, agence créative fondée en 2021 à Ouagadougou : marketing digital, développement web et branding.',
    problem:
      'Rendre lisible une offre large et des réalisations variées, avec un chemin simple vers la prise de contact.',
    solution:
      'Un site multipage : services en quatre pôles, portfolio en trois sections et un appel « Démarrer votre projet » sur chaque page.',
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
      'Logo, déclinaisons et supports de lancement pour Digilab, agence informatique au Burkina Faso.',
    context:
      'Une jeune agence informatique qui préparait son lancement, sans identité de marque.',
    problem:
      'Créer une marque simple, mémorable et facile à décliner, qui traduise son ambition d’innovation.',
    solution:
      'Après l’écoute du client, un « D » traversé d’une flèche montante, signé « Pensé pour innover », décliné en plusieurs versions et en supports de lancement.',
    role:
      'Cadrage du besoin, identité visuelle et supports de lancement.',
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
    // Liens, lieux et événements fournis par Cédric ; WAABO : festival culturel de Ouagadougou créé en 2025 (Wikipédia). À compléter : année, besoin, réalisation, rôle et outils.
    placeholder: true,
    featured: true,
    slug: 'creations-video',
    name: 'Contenu vidéo et corporate',
    category: 'communication-digitale',
    year: '[Année]',
    summary:
      'Des vidéos et contenus publicitaires pour entreprises, particuliers et partenaires.',
    context:
      'Des établissements (Lagon Lodge, Melina Food, l’hôtel Zind Naaba, une parfumerie de Ouagadougou) et des événements : le festival culturel WAABO, le FESPACO 2025 et la Ouckty Party, autour du partage des valeurs musulmanes.',
    problem: '[Le besoin, en une phrase : faire connaître un lieu, couvrir un événement…]',
    solution: '[Ce que tu as fait, en une phrase : tournage, montage, diffusion…]',
    role: '[Ton rôle, en quelques mots]',
    tools: ['[Logiciel de montage]', '[Autre outil]'],
    // Petit titre seulement (quelques mots) ; featured: true = vidéo à la une
    videos: [
      { featured: true, title: 'Lagon Lodge', url: 'https://www.youtube.com/shorts/geLfGMCugsM' },
      { title: 'Melina Food', url: 'https://www.youtube.com/shorts/3zRoFtHRGP4' },
      { title: 'Cocktail dînatoire · Zind Naaba', url: 'https://www.youtube.com/shorts/GGuqCGFukpo' },
      { title: 'Festival WAABO', url: 'https://www.youtube.com/shorts/bksPG9XoU2U' },
      { title: 'FESPACO 2025', url: 'https://www.youtube.com/shorts/uxHSa6Qbjpo' },
      { title: 'Ouckty Party', url: 'https://www.youtube.com/shorts/qEptWKYudHo' },
      { title: 'Parfumerie · Ouagadougou', url: 'https://www.youtube.com/shorts/JEqrfK6hR9w' },
    ],
  },
  {
    // Rédigé à partir du post LinkedIn de Cédric (janvier 2026). Photos d'inauguration : © DCRP / Primature.
    featured: true,
    slug: 'datacenters-cloud-gouvernemental',
    name: 'Data centers et cloud',
    category: 'reseaux-systemes',
    year: '2026',
    summary:
      'Phase finale de l’installation de deux datacenters modulaires du Cloud gouvernemental, inaugurés à Ouagadougou.',
    context:
      'Le Burkina Faso rapatrie ses données publiques sur son territoire (chantier « zéro donnée à l’extérieur »). Deux datacenters ont été inaugurés le 23 janvier 2026.',
    problem:
      'Mettre en service des infrastructures critiques aux standards internationaux pour héberger et sécuriser les données de l’administration.',
    solution:
      'Intégré aux équipes techniques sur la phase finale, aux côtés de Cybastion, Altron et General Micro Systems : baies serveurs, alimentation électrique et configuration des équipements.',
    role: 'Membre des équipes techniques sur la phase finale du projet.',
    tools: ['Rackage', 'Alimentation électrique', 'Configuration d’équipements'],
    cover: {
      src: '/images/projects/datacenter/cover-1400.webp',
      srcSet: '/images/projects/datacenter/cover-800.webp 800w, /images/projects/datacenter/cover-1400.webp 1400w',
      alt: 'Cédric Sawadogo en gilet de sécurité sur le site du projet',
    },
    gallery: [
      {
        src: '/images/projects/datacenter/baies-1000.webp',
        alt: 'Cédric Sawadogo dans l’allée des baies serveurs du datacenter',
      },
      {
        src: '/images/projects/datacenter/equipe-1000.webp',
        alt: 'Trois membres des équipes techniques en gilet de sécurité devant un module du datacenter',
      },
      {
        src: '/images/projects/datacenter/visite-800.webp',
        alt: 'Visite officielle devant le bâtiment Burkina Digital, avec présentation sur écran',
      },
      {
        src: '/images/projects/datacenter/inauguration-800.webp',
        alt: 'Plaque d’inauguration du datacenter modulaire de l’administration publique',
      },
      {
        src: '/images/projects/datacenter/ceremonie-800.webp',
        alt: 'Cérémonie d’inauguration du 23 janvier 2026 à Ouagadougou',
      },
    ],
  },
  {
    // Rédigé à partir du post LinkedIn de Cédric (décembre 2025).
    featured: true,
    slug: 'sanialert',
    name: 'SaniAlert',
    category: 'digitalisation',
    year: '2025',
    summary:
      'Une plateforme de signalement des problèmes de salubrité urbaine, 3ᵉ prix de la Quinzaine de l’Innovation 2025.',
    context:
      'Projet conçu et défendu pendant la Quinzaine de l’Innovation d’Umanis SA, de juillet à décembre 2025, avec un coaching en pitch et en étude financière.',
    problem:
      'Les signalements d’insalubrité (dépôts d’ordures, caniveaux obstrués…) étaient dispersés et souvent informels.',
    solution:
      'Les citoyens signalent en temps réel ; les alertes, géolocalisées et centralisées, sont transmises aux services compétents, comme la Brigade Laabal.',
    role: 'Chef d’équipe du projet : coordination des talents et des ressources.',
    tools: ['Pitch', 'Étude financière', 'Gestion d’équipe'],
    results: ['3ᵉ prix de la Quinzaine de l’Innovation 2025 (6ᵉ édition, Umanis SA).'],
    cover: {
      src: '/images/projects/sanialert/cover-800.webp',
      alt: 'L’équipe SaniAlert avec le trophée et le chèque du 3ᵉ prix de la Quinzaine de l’Innovation',
    },
    gallery: [
      {
        src: '/images/projects/sanialert/prix-1000.webp',
        alt: 'Cédric Sawadogo avec le trophée et le chèque remis à SaniAlert',
      },
      {
        src: '/images/projects/sanialert/trophee-1000.webp',
        alt: 'Trophée du 3ᵉ prix et attestation de participation au nom de Cédric Sawadogo',
      },
      {
        src: '/images/projects/sanialert/signalement-800.webp',
        alt: 'Écran « Signaler une alerte » de la plateforme SaniAlert',
      },
      {
        src: '/images/projects/sanialert/statistiques-1100.webp',
        alt: 'Écran « Rapports et statistiques » de la plateforme SaniAlert',
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
