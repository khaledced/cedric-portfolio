import type { LucideIcon } from 'lucide-react'
import { CodeXml, GraduationCap, Megaphone, Network, Palette, Workflow } from 'lucide-react'

/**
 * SERVICES
 * --------
 * Les six titres viennent du brief de Cédric. Les descriptions et besoins sont des
 * propositions de texte (placeholder: true) à valider ou réécrire.
 *
 * `deliverables` (prestations) : volontairement vides de contenu inventé.
 * Les exemples en commentaire sont seulement des pistes de réflexion — ils ne s'affichent pas.
 * Ne lister que des prestations que tu proposes réellement.
 */

export interface Service {
  /** Identifiant utilisé dans l'URL : /services#slug */
  slug: string
  title: string
  icon: LucideIcon
  /** Courte description (1 à 2 phrases) */
  summary: string
  /** Les besoins / problèmes auxquels le service répond */
  needs: string[]
  /** Les prestations concrètes proposées */
  deliverables: string[]
  placeholder?: boolean
}

export const services: Service[] = [
  {
    slug: 'digitalisation',
    title: 'Digitalisation et transformation numérique',
    icon: Workflow,
    placeholder: true,
    summary:
      'Aider une organisation à passer de processus manuels à des outils numériques adaptés à sa réalité, sans complexité inutile.',
    needs: [
      'Des tâches répétitives gérées sur papier ou dans des fichiers dispersés',
      'Des outils numériques peu ou mal utilisés par les équipes',
      'Le besoin d’un regard extérieur pour prioriser les chantiers',
    ],
    // Pistes : diagnostic numérique, choix d'outils, mise en place, conduite du changement…
    deliverables: ['[Prestation à préciser]', '[Prestation à préciser]'],
  },
  {
    slug: 'communication-digitale',
    title: 'Communication digitale',
    icon: Megaphone,
    placeholder: true,
    summary:
      'Construire une présence en ligne cohérente et régulière, au service d’objectifs clairs.',
    needs: [
      'Une présence sur les réseaux sociaux irrégulière ou sans ligne directrice',
      'Des messages qui ne touchent pas la bonne audience',
      'Le manque de temps pour produire du contenu',
    ],
    // Pistes : stratégie éditoriale, gestion de réseaux sociaux, calendrier de publication…
    deliverables: ['[Prestation à préciser]', '[Prestation à préciser]'],
  },
  {
    slug: 'branding',
    title: 'Identité visuelle et branding',
    icon: Palette,
    placeholder: true,
    summary:
      'Donner à une marque, un projet ou une personne une image reconnaissable et cohérente sur tous ses supports.',
    needs: [
      'Une image qui ne reflète plus ce que vous êtes devenu',
      'Des supports visuels incohérents entre eux',
      'Le lancement d’un nouveau projet ou d’une nouvelle marque',
    ],
    // Pistes : logo, charte graphique, supports print et digitaux…
    deliverables: ['[Prestation à préciser]', '[Prestation à préciser]'],
  },
  {
    slug: 'developpement-web',
    title: 'Développement web',
    icon: CodeXml,
    placeholder: true,
    summary:
      'Concevoir des sites et applications web rapides, accessibles et faciles à faire évoluer.',
    needs: [
      'Pas encore de site, ou un site daté et difficile à mettre à jour',
      'Un besoin de visibilité et de crédibilité en ligne',
      'Un outil métier sur mesure à construire',
    ],
    // Pistes : site vitrine, portfolio, application web, maintenance…
    deliverables: ['[Prestation à préciser]', '[Prestation à préciser]'],
  },
  {
    slug: 'reseaux-systemes',
    title: 'Réseaux et systèmes informatiques',
    icon: Network,
    placeholder: true,
    summary:
      'Mettre en place et maintenir une infrastructure informatique fiable, adaptée à la taille de la structure.',
    needs: [
      'Un réseau instable ou lent',
      'Des postes et équipements mal configurés ou non sécurisés',
      'L’absence de documentation de l’infrastructure existante',
    ],
    // Pistes : installation réseau, configuration, audit, maintenance, sécurité de base…
    deliverables: ['[Prestation à préciser]', '[Prestation à préciser]'],
  },
  {
    slug: 'formation',
    title: 'Accompagnement et formation',
    icon: GraduationCap,
    placeholder: true,
    summary:
      'Transmettre les compétences nécessaires pour que les équipes gagnent en autonomie avec leurs outils.',
    needs: [
      'Des outils déployés mais peu adoptés',
      'Des équipes qui souhaitent monter en compétences sur le numérique',
      'Le besoin d’un accompagnement dans la durée',
    ],
    // Pistes : ateliers, formations sur mesure, coaching individuel…
    deliverables: ['[Prestation à préciser]', '[Prestation à préciser]'],
  },
]
