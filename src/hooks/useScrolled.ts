import { useSyncExternalStore } from 'react'

/**
 * Renvoie true lorsque la page a défilé au-delà de `threshold` pixels.
 * useSyncExternalStore évite les rendus inutiles : le composant ne se met à jour
 * que lorsque la valeur true/false change, pas à chaque pixel défilé.
 */
export function useScrolled(threshold = 0): boolean {
  return useSyncExternalStore(
    (onChange) => {
      window.addEventListener('scroll', onChange, { passive: true })
      return () => window.removeEventListener('scroll', onChange)
    },
    () => window.scrollY > threshold,
    () => false,
  )
}
