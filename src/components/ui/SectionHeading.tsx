import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface SectionHeadingProps {
  /** Petite étiquette au-dessus du titre, ex. « Parcours » */
  label: string
  title: ReactNode
  id?: string
  /** Niveau de titre : h2 par défaut */
  as?: 'h1' | 'h2'
  className?: string
  children?: ReactNode
}

/** Titre de section au rythme éditorial : étiquette mono + grand titre. */
export function SectionHeading({ label, title, id, as: Tag = 'h2', className, children }: SectionHeadingProps) {
  return (
    <div className={cn('max-w-3xl', className)}>
      <p className="flex items-center gap-2 font-mono text-xs text-accent">
        <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
        {label}
      </p>
      <Tag
        id={id}
        className="mt-4 font-display text-3xl leading-tight font-medium tracking-tight text-balance sm:text-4xl lg:text-5xl"
      >
        {title}
      </Tag>
      {children}
    </div>
  )
}
