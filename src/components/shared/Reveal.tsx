import { useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface RevealProps {
  children: ReactNode
  /** Décalage en secondes (plafonné, pour ne jamais faire attendre le visiteur) */
  delay?: number
  className?: string
}

/** Délai maximal appliqué, quel que soit le décalage demandé */
const MAX_DELAY = 0.18

/**
 * Fait apparaître son contenu en douceur lorsqu'il entre à l'écran (une seule fois).
 *
 * Pensé pour la rapidité :
 * - le contenu est VISIBLE par défaut dans le HTML pré-rendu : rien n'attend le JavaScript ;
 * - après le chargement, seuls les blocs situés plus bas que l'écran sont masqués, puis
 *   révélés au défilement (fondu + léger glissement, en CSS, voir .reveal dans global.css) ;
 * - aucun effet si le visiteur a choisi de réduire les animations ;
 * - aucune bibliothèque d'animation n'est nécessaire.
 */
export function Reveal({ children, delay = 0, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [state, setState] = useState<'static' | 'hidden' | 'shown'>('static')

  // Avant l'affichage : décide si le bloc doit être masqué (uniquement s'il est hors de l'écran)
  useLayoutEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return

    setState('hidden')
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState('shown')
          observer.disconnect()
        }
      },
      { rootMargin: '0px 0px -8% 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={cn(state !== 'static' && 'reveal', state === 'hidden' && 'reveal-hidden', className)}
      style={state === 'shown' && delay > 0 ? { transitionDelay: `${Math.min(delay, MAX_DELAY)}s` } : undefined}
    >
      {children}
    </div>
  )
}
