import type { ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'
import { cn } from '@/lib/cn'

type Variant = 'primary' | 'secondary'

interface ButtonLinkProps {
  to: string
  children: ReactNode
  variant?: Variant
  /** Affiche une flèche qui glisse au survol */
  arrow?: boolean
  className?: string
}

const variants: Record<Variant, string> = {
  primary: 'bg-brand-500 text-white hover:bg-brand-700',
  secondary: 'border border-line text-fg hover:border-brand-400/60 hover:bg-ink-900',
}

/** Bouton d'action qui navigue vers une page du site. */
export function ButtonLink({ to, children, variant = 'primary', arrow = false, className }: ButtonLinkProps) {
  return (
    <Link
      to={to}
      className={cn(
        'group inline-flex h-12 items-center justify-center gap-2 rounded-xl px-5 text-sm font-medium transition-colors duration-200',
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
