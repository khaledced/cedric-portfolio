import { useEffect, useState } from 'react'
import { cn } from '@/lib/cn'

interface TypeRotatorProps {
  /** Phrases affichées tour à tour ; la première est visible dès le chargement */
  phrases: readonly string[]
  className?: string
  /** Délai avant le premier effacement (laisse le temps à l'animation d'entrée) */
  startDelay?: number
}

const TYPE_SPEED = 75 // ms par lettre tapée (± variation pour un rendu naturel)
const DELETE_SPEED = 35 // ms par lettre effacée
const HOLD = 2200 // temps d'affichage d'une phrase complète
const GAP = 350 // pause entre deux phrases

/**
 * Effet machine à écrire : la phrase s'efface lettre par lettre, la suivante s'écrit, en boucle.
 *
 * - Pré-rendu et premier affichage : la première phrase, complète (identique côté serveur et
 *   navigateur, donc pas d'incohérence à la réhydratation ; visible même sans JavaScript).
 * - Si le visiteur a choisi de réduire les animations : la première phrase reste fixe.
 * - Texte décoratif : le titre complet est fourni aux lecteurs d'écran séparément (sr-only).
 */
export function TypeRotator({ phrases, className, startDelay = 2600 }: TypeRotatorProps) {
  const [text, setText] = useState(phrases[0] ?? '')

  useEffect(() => {
    if (phrases.length < 2) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let index = 0
    let length = phrases[0].length
    let deleting = false
    let timer: number

    const tick = () => {
      const current = phrases[index]
      if (!deleting) {
        if (length < current.length) {
          length++
          setText(current.slice(0, length))
          timer = window.setTimeout(tick, TYPE_SPEED + Math.random() * 50)
        } else {
          deleting = true
          timer = window.setTimeout(tick, HOLD)
        }
      } else if (length > 0) {
        length--
        setText(current.slice(0, length))
        timer = window.setTimeout(tick, DELETE_SPEED)
      } else {
        deleting = false
        index = (index + 1) % phrases.length
        timer = window.setTimeout(tick, GAP)
      }
    }

    // La première phrase est déjà affichée : on attend, puis on commence à l'effacer
    deleting = true
    timer = window.setTimeout(tick, startDelay)
    return () => window.clearTimeout(timer)
  }, [phrases, startDelay])

  return (
    <span className={cn('inline-flex items-baseline', className)} aria-hidden="true">
      {text}
      <span className="ml-[0.06em] inline-block h-[0.82em] w-[0.06em] translate-y-[0.08em] self-center bg-current [animation:caret-blink_1s_infinite] motion-reduce:hidden" />
    </span>
  )
}
