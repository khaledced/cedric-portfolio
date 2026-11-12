import { cn } from '@/lib/cn'

interface FigureProps {
  /** Chemin de l'image dans /public, ex. /images/articles/mon-article/schema.webp */
  src: string
  /** Description de l'image (accessibilité et référencement) */
  alt: string
  /** Légende, affichée sous l'image après « Figure N — » (numérotation automatique) */
  caption?: string
  /** Source ou crédit de l'image, ex. « Anthropic » ou « Réalisation de l'auteur » */
  source?: string
  /** Largeur : 'full' (par défaut, toute la colonne), 'medium' (75 %) ou 'small' (50 %) */
  size?: 'full' | 'medium' | 'small'
}

/**
 * Figure d'article, façon publication de recherche : image sobre, centrée,
 * numérotée automatiquement (Figure 1, Figure 2…) avec légende et source.
 *
 * Utilisation dans un article .mdx (aucun import nécessaire) :
 *   <Figure src="/images/articles/mon-article/schema.webp" alt="…" caption="…" source="…" />
 */
export function Figure({ src, alt, caption, source, size = 'full' }: FigureProps) {
  return (
    <figure
      className={cn(
        'article-figure mx-auto break-inside-avoid',
        size === 'medium' && 'max-w-[75%]',
        size === 'small' && 'max-w-[50%]',
      )}
    >
      <img src={src} alt={alt} loading="lazy" decoding="async" />
      <figcaption>
        {caption}
        {/* Point final ajouté si la légende n'en a pas, avant la source */}
        {caption && !/[.!?…]$/.test(caption.trim()) && '.'}
        {source &&<span className="article-figure-source"> Source : {source}.</span>}
      </figcaption>
    </figure>
  )
}
