import { ImageOff } from 'lucide-react'
import type { ProjectImage } from '@/data/projects'
import { cn } from '@/lib/cn'

interface ProjectVisualProps {
  image?: ProjectImage
  className?: string
  /** true pour l'image principale d'une page (chargée en priorité) */
  priority?: boolean
}

/** Visuel d'un projet, avec un cadre neutre tant qu'aucune image n'est fournie. */
export function ProjectVisual({ image, className, priority = false }: ProjectVisualProps) {
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
