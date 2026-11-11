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
  description:
    'Technologie, digital et créativité : je conçois des solutions, accompagne les transformations et donne vie aux idées.',

  /** URL publique du site, à renseigner après le premier déploiement Vercel (ex. https://xxx.vercel.app) */
  url: '',

  /** Indicateur de disponibilité affiché dans le Hero. À CONFIRMER par Cédric. */
  availability: {
    show: true,
    available: true,
    label: 'Disponible pour de nouvelles missions',
  },

  /** Coordonnées — À COMPLÉTER */
  contact: {
    email: '',
    /** Localisation affichée (optionnelle), ex. 'Ouagadougou, Burkina Faso' */
    location: '',
  },

  /**
   * Réseaux sociaux — À COMPLÉTER avec les URLs complètes.
   * WhatsApp : utiliser le format https://wa.me/226XXXXXXXX (sans +, ni espaces).
   */
  socials: {
    linkedin: '',
    github: '',
    facebook: '',
    instagram: '',
    tiktok: '',
    whatsapp: '',
  },
} as const

export type SocialKey = keyof typeof siteConfig.socials
