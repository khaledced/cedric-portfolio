import { cn } from '@/lib/cn'

/**
 * Signale visuellement un contenu provisoire, à remplacer par une information réelle.
 * Ne s'affiche que si `show` est vrai (par défaut, sans l'attribut).
 *
 * ⚠ Passer un booléen explicite : show={Boolean(item.placeholder)}.
 * Avec show={item.placeholder}, un contenu réel (sans champ placeholder → undefined)
 * afficherait quand même le badge, car undefined déclenche la valeur par défaut (true).
 */
export function PlaceholderBadge({ show = true, className }: { show?: boolean; className?: string }) {
  if (!show) return null
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md border border-dashed border-warn/40 px-1.5 py-0.5 label-mono text-[10px] text-warn',
        className,
      )}
    >
      Provisoire
    </span>
  )
}
