import { useSyncExternalStore } from 'react'

const noop = () => () => {}

/**
 * false pendant le pré-rendu ET pendant la réhydratation, puis true juste après.
 *
 * Utile pour tout ce qui dépend de paramètres d'URL (?categorie=…, ?q=…) : le HTML pré-rendu
 * a été généré sans paramètre, donc le premier rendu dans le navigateur doit être identique,
 * sinon React signale une incohérence et reconstruit toute la page.
 */
export function useIsClient(): boolean {
  return useSyncExternalStore(
    noop,
    () => true,
    () => false,
  )
}
