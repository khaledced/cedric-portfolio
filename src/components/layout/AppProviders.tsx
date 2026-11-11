import type { ReactNode } from 'react'
import { LazyMotion, MotionConfig } from 'motion/react'

/** Chargement différé des fonctions d'animation (voir src/lib/motion-features.ts) */
const loadMotionFeatures = () => import('@/lib/motion-features').then((m) => m.default)

/**
 * Fournisseurs communs à tout le site (navigateur et pré-rendu).
 * LazyMotion + `m` : les fonctions d'animation sont téléchargées à part, sans bloquer l'affichage.
 * reducedMotion="user" : si le visiteur a activé « réduire les animations »,
 * les déplacements sont supprimés et seuls les fondus sont conservés.
 */
export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={loadMotionFeatures} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  )
}
