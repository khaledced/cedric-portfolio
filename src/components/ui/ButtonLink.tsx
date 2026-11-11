import type { ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'
import { cn } from '@/lib/cn'

type Variant = 'primary' | 'secondary'
type Size = 'md' | 'sm'

interface ButtonLinkProps {
  to: string
  children: ReactNode
  variant?: Variant
  /** md : 48 px de haut (par défaut) — sm : 40 px (header) */
  size?: Size
  /** Affiche une flèche qui glisse au survol */
  arrow?: boolean
  className?: string
}

const variants: Record<Variant, string> = {
  primary: 'bg-brand-500 text-white hover:bg-brand-700',
  secondary: 'border border-line text-fg hover:border-brand-400/60 hover:bg-ink-900',
}

/*
  La hauteur passe par `size` et non par className : deux classes de hauteur sur un même
  élément (ex. h-12 et h-10) entrent en conflit, et c'est l'ordre du CSS qui décide, pas l'ordre écrit.
*/
const sizes: Record<Size, string> = {
  md: 'h-12 px-5',
  sm: 'h-10 px-4',
}

/** Bouton d'action qui navigue vers une page du site. */
export function ButtonLink({ to, children, variant = 'primary', size = 'md', arrow = false, className }: ButtonLinkProps) {
  return (
    <Link
      to={to}
      className={cn(
        'group inline-flex items-center justify-center gap-2 rounded-xl text-sm font-medium transition-colors duration-200',
        sizes[size],
        variants[variant],
        className,
      )}
    >
      {children}
      {arrow && (
        <ArrowRight
          aria-hidden="true"
          className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
        />
      )}
    </Link>
  )
}
