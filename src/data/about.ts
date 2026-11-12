/**
 * CONTENU DE LA PAGE « À PROPOS »
 * --------------------------------
 * Tout le texte de la page vient de ce fichier.
 *
 * `placeholder: true` = contenu provisoire : un badge « Provisoire » s'affiche sur le site.
 * Quand tu remplaces un contenu par une information réelle, supprime simplement cette ligne.
 *
 * Règle : aucune information ne doit être inventée. Tout ce qui est marqué provisoire
 * doit être remplacé ou supprimé avant de partager le site.
 */

export interface Placeholderable {
  placeholder?: boolean
}

export interface TimelineEntry extends Placeholderable {
  /** Ex. « 2019 — 2022 » ou « Depuis 2023 » */
  period: string
  title: string
  organization: string
  location?: string
  description?: string
}

export interface SkillGroup {
  title: string
  /** Domaines tels que définis par Cédric */
  items: string[]
  /** Outils, technologies, logiciels maîtrisés — à compléter */
  tools: string[]
}

export interface Certification extends Placeholderable {
  name: string
  issuer: string
  year: string
  /** Lien de vérification (Credly, Coursera…), optionnel */
  url?: string
}

export interface KeyFigure {
  /** Ex. « 5+ » — n'ajouter QUE des chiffres vérifiables */
  value: string
  label: string
}

/* ------------------------------------------------------------------ */
/* Présentation et vision                                             */
/* ------------------------------------------------------------------ */

export const story: Placeholderable & { title: string; paragraphs: string[] } = {
  /** Texte validé par Cédric */
  title: 'Ingénieur de formation, polyvalent par choix.',
  paragraphs: [
    "Je m'appelle Cédric Sawadogo. Mon socle, c'est l'ingénierie informatique : comprendre les systèmes, les réseaux et la manière dont la technologie peut résoudre des problèmes concrets.",
    "Mais je n'ai jamais voulu m'arrêter à la technique. Au fil de mon parcours, je me suis intéressé à ce qui se passe autour : la communication, l'image, la stratégie digitale et l'accompagnement des personnes qui doivent s'approprier ces outils.",
  ],
}

export const vision: Placeholderable & {
  statement: string
  principles: Array<{ title: string; text: string }>
} = {
  statement:
    'La technologie n’a de valeur que si elle est comprise, adoptée et utile à ceux qui s’en servent.',
  /** Principes (titre + texte court). Liste vide = bloc masqué. */
  principles: [],
}

/* ------------------------------------------------------------------ */
/* Parcours                                                           */
/* ------------------------------------------------------------------ */

/*
  Liste vide = section « Parcours » masquée. Exemple d'entrée :
  { period: '2019 — 2024', title: 'Diplôme d’ingénieur en informatique', organization: 'École', description: '…' }
*/
export const education: TimelineEntry[] = []

export const experience: TimelineEntry[] = []

/* ------------------------------------------------------------------ */
/* Compétences (domaines repris tels que définis par Cédric)          */
/* ------------------------------------------------------------------ */

export const skillGroups: SkillGroup[] = [
  {
    title: 'Compétences techniques',
    items: [
      'Ingénierie informatique',
      'Réseaux et systèmes',
      'Développement web',
      'Intelligence artificielle et innovation',
    ],
    tools: [],
  },
  {
    title: 'Compétences créatives et digitales',
    items: [
      'Communication digitale et stratégie numérique',
      'Identité visuelle, branding et design graphique',
      'Création de contenu',
    ],
    tools: [],
  },
  {
    title: 'Accompagnement',
    items: [
      'Digitalisation des organisations',
      'Formation et accompagnement',
      'Pitch de projet',
      'Prise de parole en public',
      'Maîtrise de cérémonie',
    ],
    tools: [],
  },
]

/* ------------------------------------------------------------------ */
/* Certifications et formations complémentaires                       */
/* ------------------------------------------------------------------ */

/* Liste vide = section masquée. Exemple : { name: 'CCNA', issuer: 'Cisco', year: '2024', url: '…' } */
export const certifications: Certification[] = []

/* ------------------------------------------------------------------ */
/* Chiffres clés — la section reste masquée tant que la liste est vide */
/* ------------------------------------------------------------------ */

export const keyFigures: KeyFigure[] = []
