/**
 * Les quatre grands pôles affichés sous le Hero.
 * Ils regroupent les huit domaines d'intervention définis par Cédric.
 */
export interface ExpertisePole {
  title: string
  domains: string[]
}

export const expertisePoles: ExpertisePole[] = [
  {
    title: 'Ingénierie & systèmes',
    domains: ['Ingénierie informatique', 'Réseaux', 'Systèmes'],
  },
  {
    title: 'Transformation digitale',
    domains: ['Digitalisation', 'Accompagnement des organisations', 'IA & innovation'],
  },
  {
    title: 'Communication & création',
    domains: ['Stratégie digitale', 'Identité visuelle & branding', 'Création de contenu'],
  },
  {
    title: 'Web & transmission',
    domains: ['Développement web', 'Formation & accompagnement'],
  },
]
