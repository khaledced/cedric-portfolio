import { Moon, Sun } from 'lucide-react'
import { getTheme, setTheme } from '@/lib/theme'
import { cn } from '@/lib/cn'

/**
 * Bouton de bascule thème clair ↔ sombre.
 * Les icônes et le libellé sont pilotés par le CSS (variante dark:) : le bouton s'affiche
 * correctement dès le HTML pré-rendu, sans attendre le JavaScript ni provoquer d'incohérence.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const toggle = () => setTheme(getTheme() === 'dark' ? 'light' : 'dark')

  return (
    <button
      type="button"
      onClick={toggle}
      title="Changer de thème"
      className={cn(
        'inline-flex size-10 items-center justify-center rounded-xl border border-line text-fg transition-colors hover:border-accent/60 hover:bg-card',
        className,
      )}
    >
      {/* Thème clair actif → proposer le sombre */}
      <Moon aria-hidden="true" className="size-[18px] dark:hidden" />
      <span className="sr-only dark:hidden">Activer le thème sombre</span>
      {/* Thème sombre actif → proposer le clair */}
      <Sun aria-hidden="true" className="hidden size-[18px] dark:block" />
      <span className="sr-only hidden dark:inline">Activer le thème clair</span>
    </button>
  )
}
