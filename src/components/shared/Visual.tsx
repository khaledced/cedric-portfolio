import { ImageOff } from 'lucide-react'
import { cn } from '@/lib/cn'

export interface VisualImage {
  src: string
  /** Description de l'image pour l'accessibilité et le référencement */
  alt: string
  /**
   * Versions de tailles différentes (optionnel), ex. '/img-800.webp 800w, /img-1600.webp 1600w' :
   * le navigateur choisit la plus adaptée à l'écran (générées avec npm run image).
   */
  srcSet?: string
}

interface VisualProps {
  image?: VisualImage
  className?: string
  /** true pour l'image principale d'une page (chargée en priorité) */
  priority?: boolean
  /** Largeur d'affichage de l'image, pour le choix dans srcSet (par défaut : demi-écran sur ordinateur) */
  sizes?: string
  /**
   * - 'card' (par défaut) : cadre arrondi avec une fine bordure
   * - 'print' : façon photo imprimée, avec une marge blanche et une ombre douce (à incliner via className)
   */
  frame?: 'card' | 'print'
}

/** Visuel (projet, article…), avec un cadre neutre tant qu'aucune image n'est fournie. */
export function Visual({
  image,
  className,
  priority = false,
  sizes = '(min-width: 768px) 50vw, 100vw',
  frame = 'card',
}: VisualProps) {
  const content = image ? (
    <img
      src={image.src}
      srcSet={image.srcSet}
      sizes={image.srcSet ? sizes : undefined}
      alt={image.alt}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
      className="size-full object-cover"
    />
  ) : (
    <div className="bg-grid flex size-full flex-col items-center justify-center gap-3 text-subtle">
      <ImageOff aria-hidden="true" className="size-6" strokeWidth={1.5} />
      <span className="label-mono text-[11px]">Visuel à venir</span>
    </div>
  )

  if (frame === 'print') {
    return (
      <div
        className={cn(
          'relative rounded-md bg-white p-[3%] shadow-[0_22px_45px_-22px_rgb(14_26_51/0.45),0_2px_6px_-2px_rgb(14_26_51/0.12)] ring-1 ring-black/5 dark:bg-[#1c1f27] dark:ring-white/10',
          className,
        )}
      >
        <div className="size-full overflow-hidden rounded-[3px] bg-card">{content}</div>
      </div>
    )
  }

  return (
    <div className={cn('relative overflow-hidden rounded-2xl border border-line bg-card', className)}>{content}</div>
  )
}
