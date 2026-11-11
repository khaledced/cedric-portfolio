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
}

/** Visuel (projet, article…), avec un cadre neutre tant qu'aucune image n'est fournie. */
export function Visual({ image, className, priority = false, sizes = '(min-width: 768px) 50vw, 100vw' }: VisualProps) {
  return (
    <div className={cn('relative overflow-hidden rounded-2xl border border-line bg-card', className)}>
      {image ? (
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
      )}
    </div>
  )
}
