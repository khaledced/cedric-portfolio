import { siteConfig } from '@/config/site'
import { cn } from '@/lib/cn'

/** Indicateur de disponibilité, piloté par src/config/site.ts */
export function AvailabilityBadge({ className }: { className?: string }) {
  const { show, available, label } = siteConfig.availability
  if (!show) return null

  return (
    <p
      className={cn(
        'inline-flex items-center gap-2.5 rounded-full border border-line bg-card/60 px-3.5 py-1.5 font-mono text-xs text-muted',
        className,
      )}
    >
      <span className="relative flex size-2" aria-hidden="true">
        {available && (
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-60 motion-reduce:hidden" />
        )}
        <span
          className={cn('relative inline-flex size-2 rounded-full', available ? 'bg-success' : 'bg-subtle')}
        />
      </span>
      {label}
    </p>
  )
}
