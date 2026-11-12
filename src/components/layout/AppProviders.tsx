import type { ReactNode } from 'react'

/**
 * Fournisseurs communs à tout le site (navigateur et pré-rendu).
 *
 * Volontairement vide : la bibliothèque d'animation (motion) n'est plus chargée pour tout
 * le site. Les apparitions, le menu mobile et l'aperçu des projets sont en CSS ; seule la
 * page Projets (filtre animé) charge motion, à la demande.
 */
export function AppProviders({ children }: { children: ReactNode }) {
  return <>{children}</>
}
