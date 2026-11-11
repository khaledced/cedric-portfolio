import { useState } from 'react'
import { Check, Link2 } from 'lucide-react'

interface ShareLinksProps {
  title: string
}

/**
 * Partage d'un article : LinkedIn, WhatsApp et copie du lien.
 * Ce sont de simples liens : aucun script tiers n'est chargé, aucun suivi.
 */
export function ShareLinks({ title }: ShareLinksProps) {
  const [copied, setCopied] = useState(false)
  const url = typeof window !== 'undefined' ? window.location.href : ''

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      // Presse-papiers indisponible (navigateur ancien ou contexte non sécurisé) : on ne fait rien
    }
  }

  const linkClass =
    'inline-flex h-10 items-center gap-2 rounded-full border border-line px-4 text-sm text-muted transition-colors hover:border-brand-400/50 hover:text-fg'

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-2 font-mono text-xs text-subtle">Partager</span>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
      >
        LinkedIn<span className="sr-only"> (nouvel onglet)</span>
      </a>
      <a
        href={`https://wa.me/?text=${encodeURIComponent(`${title} — ${url}`)}`}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
      >
        WhatsApp<span className="sr-only"> (nouvel onglet)</span>
      </a>
      <button type="button" onClick={copy} className={linkClass}>
        {copied ? <Check aria-hidden="true" className="size-4 text-emerald-400" /> : <Link2 aria-hidden="true" className="size-4" />}
        <span aria-live="polite">{copied ? 'Lien copié' : 'Copier le lien'}</span>
      </button>
    </div>
  )
}
