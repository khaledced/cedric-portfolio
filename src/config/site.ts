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

  /**
   * Photo professionnelle du Hero, placée dans public/images/ (ex. '/images/cedric.webp').
   * Laisser vide pour afficher le cadre provisoire.
   */
  photo: '',

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
    location: '',
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
