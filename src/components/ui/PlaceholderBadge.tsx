import { cn } from '@/lib/cn'

/**
 * Signale visuellement un contenu provisoire, à remplacer par une information réelle.
 * Ne s'affiche que si `show` est vrai (par défaut).
 */
export function PlaceholderBadge({ show = true, className }: { show?: boolean; className?: string }) {
  if (!show) return null
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md border border-dashed border-amber-400/40 px-1.5 py-0.5 font-mono text-[10px] tracking-wider text-amber-300/80 uppercase',
        className,
      )}
    >
      Provisoire
    </span>
  )
}
