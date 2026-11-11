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

export const story = {
  /** Proposition de texte à valider ou réécrire par Cédric */
  placeholder: true,
  title: 'Ingénieur de formation, polyvalent par choix.',
  paragraphs: [
    "Je m'appelle Cédric Sawadogo. Mon socle, c'est l'ingénierie informatique : comprendre les systèmes, les réseaux et la manière dont la technologie peut résoudre des problèmes concrets.",
    "Mais je n'ai jamais voulu m'arrêter à la technique. Au fil de mon parcours, je me suis intéressé à ce qui se passe autour : la communication, l'image, la stratégie digitale et l'accompagnement des personnes qui doivent s'approprier ces outils.",
    "[À compléter : ton histoire en quelques phrases — ce qui t'a amené ici, ce qui te motive, ce que tu cherches à construire.]",
  ],
}

export const vision = {
  placeholder: true,
  statement:
    'La technologie n’a de valeur que si elle est comprise, adoptée et utile à ceux qui s’en servent.',
  principles: [
    {
      title: 'Comprendre avant de construire',
      text: '[À compléter : comment tu abordes un nouveau projet ou une nouvelle organisation.]',
    },
    {
      title: 'Relier la technique et l’humain',
      text: '[À compléter : ta manière de faire le lien entre solutions techniques, communication et usages.]',
    },
    {
      title: 'Transmettre',
      text: '[À compléter : ta vision de la formation et de l’accompagnement.]',
    },
  ],
}

/* ------------------------------------------------------------------ */
/* Parcours                                                           */
/* ------------------------------------------------------------------ */

export const education: TimelineEntry[] = [
  {
    placeholder: true,
    period: '[Années]',
    title: '[Diplôme — ex. Diplôme d’ingénieur en informatique]',
    organization: '[École / Université]',
    description: '[Spécialité, mention ou projet marquant, en une phrase.]',
  },
  {
    placeholder: true,
    period: '[Années]',
    title: '[Diplôme précédent]',
    organization: '[Établissement]',
  },
]

export const experience: TimelineEntry[] = [
  {
    placeholder: true,
    period: '[Période]',
    title: '[Poste]',
    organization: '[Structure]',
    description: '[Missions principales et réalisations concrètes, en une ou deux phrases.]',
  },
  {
    placeholder: true,
    period: '[Période]',
    title: '[Poste]',
    organization: '[Structure]',
    description: '[Missions principales.]',
  },
]

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
    items: ['Digitalisation des organisations', 'Formation et accompagnement'],
    tools: [],
  },
]

/* ------------------------------------------------------------------ */
/* Certifications et formations complémentaires                       */
/* ------------------------------------------------------------------ */

export const certifications: Certification[] = [
  { placeholder: true, name: '[Nom de la certification]', issuer: '[Organisme]', year: '[Année]' },
  { placeholder: true, name: '[Nom de la formation]', issuer: '[Organisme]', year: '[Année]' },
]

/* ------------------------------------------------------------------ */
/* Chiffres clés — la section reste masquée tant que la liste est vide */
/* ------------------------------------------------------------------ */

export const keyFigures: KeyFigure[] = []
