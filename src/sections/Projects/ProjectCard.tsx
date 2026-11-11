import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router'
import { Visual } from '@/components/shared/Visual'
import { PlaceholderBadge } from '@/components/ui/PlaceholderBadge'
import { projectCategories, type Project } from '@/data/projects'
import { cn } from '@/lib/cn'

interface ProjectCardProps {
  project: Project
  /** Version réduite (aperçu de l'accueil) : image plus basse, résumé sur 2 lignes, sans les outils */
  compact?: boolean
}

/**
 * Carte projet : visuel, catégorie, année, titre, résumé et outils.
 * Toute la carte est cliquable. Au survol (ou au focus clavier), le visuel s'agrandit légèrement
 * et une indication « Voir le projet » apparaît.
 */
export function ProjectCard({ project, compact = false }: ProjectCardProps) {
  return (
    <article className="group relative flex h-full flex-col">
      <div
        className={cn(
          'relative rounded-2xl transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
          'group-hover:shadow-[0_24px_60px_-20px_rgb(42_75_155/0.45)] group-focus-within:shadow-[0_24px_60px_-20px_rgb(42_75_155/0.45)]',
          'motion-safe:group-hover:-translate-y-1 motion-safe:group-hover:scale-[1.04] motion-safe:group-focus-within:scale-[1.04]',
        )}
      >
        <Visual
          image={project.cover}
          sizes={compact ? '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw' : undefined}
          className={cn(
            'transition-colors duration-300 group-hover:border-accent/40',
            compact ? 'aspect-[4/3]' : 'aspect-[16/10]',
          )}
        />
        {/* Indication de clic, visible au survol / focus */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-end justify-start rounded-2xl bg-gradient-to-t from-[rgb(14_26_51/0.55)] via-transparent to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100"
        >
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 label-mono text-[11px] text-[#0e1a33]">
            Voir le projet
            <ArrowUpRight className="size-3.5" />
          </span>
        </div>
      </div>

      <div className={cn('flex flex-wrap items-center gap-x-3 gap-y-2 label-mono text-xs text-subtle', compact ? 'mt-4' : 'mt-5')}>
        <span className="text-accent">{projectCategories[project.category]}</span>
        <span aria-hidden="true">·</span>
        <span>{project.year}</span>
        <PlaceholderBadge show={Boolean(project.placeholder)} />
      </div>
      <h3
        className={cn(
          'mt-2 flex items-start justify-between gap-4 font-display leading-tight font-extrabold tracking-[-0.03em]',
          compact ? 'text-xl' : 'mt-3 text-2xl',
        )}
      >
        {/* Le lien couvre toute la carte (pseudo-élément) tout en gardant un intitulé clair */}
        <Link
          to={`/projets/${project.slug}`}
          className="after:absolute after:inset-0 after:rounded-2xl after:content-[''] focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-4 focus-visible:after:outline-accent"
        >
          {project.name}
        </Link>
        <ArrowUpRight
          aria-hidden="true"
          className="mt-1 size-4 shrink-0 text-subtle transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
        />
      </h3>
      <p className={cn('mt-2 text-sm leading-relaxed text-muted', compact && 'line-clamp-2')}>{project.summary}</p>
      {!compact && (
        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Outils utilisés">
          {project.tools.slice(0, 4).map((tool) => (
            <li key={tool} className="rounded-md border border-line px-2 py-0.5 label-mono text-[11px] text-subtle">
              {tool}
            </li>
          ))}
        </ul>
      )}
    </article>
  )
}
