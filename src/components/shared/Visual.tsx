import { ImageOff } from 'lucide-react'
import { cn } from '@/lib/cn'

export interface VisualImage {
  src: string
  /** Description de l'image pour l'accessibilité et le référencement */
  alt: string
}

interface VisualProps {
  image?: VisualImage
  className?: string
  /** true pour l'image principale d'une page (chargée en priorité) */
  priority?: boolean
}

/** Visuel (projet, article…), avec un cadre neutre tant qu'aucune image n'est fournie. */
export function Visual({ image, className, priority = false }: VisualProps) {
  return (
    <div className={cn('relative overflow-hidden rounded-2xl border border-line bg-ink-900', className)}>
      {image ? (
        <img
          src={image.src}
          alt={image.alt}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
          className="size-full object-cover"
        />
      ) : (
        <div className="bg-grid flex size-full flex-col items-center justify-center gap-3 text-subtle">
          <ImageOff aria-hidden="true" className="size-6" strokeWidth={1.5} />
          <span className="font-mono text-[11px] tracking-wider uppercase">Visuel à venir</span>
        </div>
      )}
    </div>
  )
}
