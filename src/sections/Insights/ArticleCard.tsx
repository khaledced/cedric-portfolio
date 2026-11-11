import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router'
import { Visual } from '@/components/shared/Visual'
import { formatDate } from '@/lib/format'
import { cn } from '@/lib/cn'
import type { Article } from '@/types/content'

interface ArticleCardProps {
  article: Article
  /** Variante large pour l'article mis en avant */
  featured?: boolean
}

/** Carte article : couverture, catégorie, date, temps de lecture, titre et résumé. */
export function ArticleCard({ article, featured = false }: ArticleCardProps) {
  return (
    <article className={cn('group relative grid h-full gap-6', featured && 'lg:grid-cols-2 lg:items-center lg:gap-12')}>
      <Visual
        image={article.cover ? { src: article.cover, alt: article.coverAlt ?? '' } : undefined}
        className="aspect-[16/9] transition-colors duration-300 group-hover:border-brand-400/40 [&_img]:transition-transform [&_img]:duration-700 group-hover:[&_img]:scale-[1.03]"
      />
      <div>
        <p className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-xs text-subtle">
          <span className="text-brand-400">{article.category}</span>
          <span aria-hidden="true">·</span>
          <time dateTime={article.date}>{formatDate(article.date)}</time>
          <span aria-hidden="true">·</span>
          <span>{article.readingTime} min</span>
          {article.draft && (
            <span className="rounded-md border border-dashed border-amber-400/40 px-1.5 py-0.5 text-[10px] tracking-wider text-amber-300/80 uppercase">
              Brouillon
            </span>
          )}
        </p>
        <h3
          className={cn(
            'mt-3 flex items-start justify-between gap-4 font-medium tracking-tight text-balance',
            featured ? 'font-display text-2xl sm:text-3xl' : 'text-xl',
          )}
        >
          <Link to={`/insights/${article.slug}`} className="after:absolute after:inset-0 after:content-['']">
            {article.title}
          </Link>
          <ArrowUpRight
            aria-hidden="true"
            className="mt-1 size-4 shrink-0 text-subtle transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand-400"
          />
        </h3>
        <p className={cn('mt-3 leading-relaxed text-muted', featured ? 'text-base' : 'text-sm')}>{article.description}</p>
      </div>
    </article>
  )
}
