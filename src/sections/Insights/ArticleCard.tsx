import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router'
import { LogoMark } from '@/components/shared/Logo'
import { Visual } from '@/components/shared/Visual'
import { cn } from '@/lib/cn'
import type { Article } from '@/types/content'

interface ArticleCardProps {
  article: Article
  /** Variante large pour l'article mis en avant */
  featured?: boolean
}

/** Carte article : visuel, catégorie, titre et résumé (sans date ni temps de lecture). */
export function ArticleCard({ article, featured = false }: ArticleCardProps) {
  return (
    <article className={cn('group relative grid h-full gap-6', featured && 'lg:grid-cols-2 lg:items-center lg:gap-12')}>
      {!article.cover && article.hasPdf ? (
        <PdfSheet />
      ) : (
        <Visual
          image={article.cover ? { src: article.cover, alt: article.coverAlt ?? '' } : undefined}
          className="aspect-[16/9] transition-colors duration-300 group-hover:border-accent/40 [&_img]:transition-transform [&_img]:duration-700 group-hover:[&_img]:scale-[1.03]"
        />
      )}
      <div>
        <p className="flex flex-wrap items-center gap-x-3 gap-y-2 label-mono text-xs text-subtle">
          <span className="text-accent">{article.category}</span>
          {article.draft && (
            <span className="rounded-md border border-dashed border-warn/40 px-1.5 py-0.5 text-[10px] tracking-wider text-warn uppercase">
              Brouillon
            </span>
          )}
        </p>
        <h3
          className={cn(
            'mt-3 flex items-start justify-between gap-4 font-display leading-tight font-extrabold tracking-[-0.03em] text-balance',
            featured ? 'text-3xl sm:text-4xl' : 'text-2xl',
          )}
        >
          <Link to={`/insights/${article.slug}`} className="after:absolute after:inset-0 after:content-['']">
            {article.title}
          </Link>
          <ArrowUpRight
            aria-hidden="true"
            className="mt-1 size-4 shrink-0 text-subtle transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
          />
        </h3>
        <p className={cn('mt-3 leading-relaxed text-muted', featured ? 'text-base' : 'text-sm')}>{article.description}</p>
      </div>
    </article>
  )
}

/**
 * Visuel par défaut d'un article PDF sans image : une feuille stylisée (logo, lignes de texte),
 * légèrement inclinée, qui se redresse au survol. Aucune image à fournir.
 */
function PdfSheet() {
  return (
    <div
      aria-hidden="true"
      className="bg-grid grid aspect-[16/9] place-items-center overflow-hidden rounded-2xl border border-line bg-card transition-colors duration-300 group-hover:border-accent/40"
    >
      <div className="relative flex aspect-[1/1.414] w-[32%] rotate-[-3deg] flex-col rounded-sm bg-white p-[7%] shadow-[0_18px_40px_-18px_rgb(14_26_51/0.45)] ring-1 ring-black/5 transition-transform duration-500 group-hover:rotate-0 dark:bg-[#1c1f27] dark:ring-white/10">
        <div className="flex items-center justify-between border-b-2 border-accent pb-[6%]">
          <LogoMark decorative className="size-[22%] min-w-4" />
          <span className="label-mono text-[clamp(6px,0.9vw,9px)] text-accent">PDF</span>
        </div>
        <div className="mt-[10%] space-y-[6%]">
          <div className="h-[5px] w-4/5 rounded-full bg-fg/70" />
          <div className="h-[5px] w-3/5 rounded-full bg-fg/70" />
        </div>
        <div className="mt-[12%] space-y-[5%]">
          {[100, 94, 98, 88, 96, 70].map((w, i) => (
            <div key={i} className="h-[3px] rounded-full bg-fg/15" style={{ width: `${w}%` }} />
          ))}
        </div>
      </div>
    </div>
  )
}
