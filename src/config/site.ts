/**
 * CONFIGURATION CENTRALE DU SITE
 * ------------------------------
 * C'est le seul fichier à modifier pour changer ton email, tes réseaux sociaux
 * ou ton statut de disponibilité. Tout le site lit ces valeurs.
 *
 * Règle : un champ laissé vide ('') n'est jamais affiché.
 * Aucun lien n'est donc inventé ou affiché « cassé ».
 */

export const siteConfig = {
  name: 'Cédric Sawadogo',
  tagline: 'Ingénieur informatique… mais pas que.',

  /**
   * Phrases du titre de l'accueil qui s'écrivent tour à tour après « Ingénieur Informatique… »
   * (effet machine à écrire). La première est celle affichée au chargement.
   */
  heroRoles: ['mais pas que.', 'Digital Manager', 'Graphic Designer', 'Content Creator'],
  description:
    'Technologie, digital et créativité : je conçois des solutions, accompagne les transformations et donne vie aux idées.',

  /** URL publique du site, à renseigner après le premier déploiement Vercel (ex. https://xxx.vercel.app) */
  url: '',

  /**
   * Photo du Hero et de la page À propos (format 4:5), dans public/images/.
   * Générée avec : npm run image -- image/identite.PNG public/images/cedric-sawadogo --crop 380,60,904,1130 --widths 600,904
   * Mettre src: '' pour afficher le cadre provisoire.
   */
  photo: {
    src: '/images/cedric-sawadogo-904.webp',
    srcSet: '/images/cedric-sawadogo-600.webp 600w, /images/cedric-sawadogo-904.webp 904w',
    width: 904,
    height: 1130,
    alt: 'Cédric Sawadogo prenant la parole, micro en main, lors d’un événement',
  },

  /** Indicateur de disponibilité affiché dans le Hero. À CONFIRMER par Cédric. */
  availability: {
    show: true,
    available: true,
    label: 'Disponible pour de nouvelles missions',
  },

  /** Coordonnées */
  contact: {
    email: 'cedricl.saw@gmail.com',
    /** Localisation affichée (optionnelle), ex. 'Ouagadougou, Burkina Faso' */
    location: 'Ouagadougou, Burkina Faso',
    /** Coordonnées GPS affichées dans le Hero au-dessus de la localisation (N = nord, O = ouest) */
    coordinates: '12.37° N · 1.52° O',
  },

  /**
   * Réseaux sociaux — URLs complètes, sans paramètres de suivi (?utm_…, ?_t=…).
   * WhatsApp : format https://wa.me/226XXXXXXXX (indicatif + numéro, sans +, ni espaces).
   */
  socials: {
    linkedin: 'https://www.linkedin.com/in/cédric-sawadogo-b24084218',
    github: 'https://github.com/khaledced',
    facebook: 'https://www.facebook.com/profile.php?id=100073336573249',
    instagram: 'https://www.instagram.com/cedricsw_',
    tiktok: 'https://www.tiktok.com/@cedricsw',
    whatsapp: 'https://wa.me/22675851691',
  },
} as const

export type SocialKey = keyof typeof siteConfig.socials
