import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router'
import { Visual } from '@/components/shared/Visual'
import { PlaceholderBadge } from '@/components/ui/PlaceholderBadge'
import { getProjectCover, projectCategories, type Project } from '@/data/projects'
import { cn } from '@/lib/cn'

interface ProjectCardProps {
  project: Project
  /** Position dans la liste : sert à alterner l'inclinaison des visuels */
  index?: number
}

/**
 * Carte projet, volontairement légère.
 * - Mobile : ligne compacte, petite miniature à gauche et texte à droite.
 * - Tablette et ordinateur : visuel au format 3:2 puis texte.
 * Le visuel est présenté comme une photo imprimée, inclinée un coup à gauche, un coup à droite.
 * Survol : la photo se redresse et le titre prend la couleur d'accent.
 * Toute la carte est cliquable.
 */
export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  return (
    <article className="group relative flex items-start gap-4 sm:flex-col sm:gap-0">
      <Visual
        image={getProjectCover(project)}
        frame="print"
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 112px"
        className={cn(
          'aspect-[4/3] w-28 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-0 sm:aspect-[3/2] sm:w-full',
          index % 2 === 0 ? 'rotate-[-1.5deg]' : 'rotate-[1.5deg]',
        )}
      />

      <div className="min-w-0 flex-1 sm:mt-5 sm:w-full">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 label-mono text-[11px] text-subtle">
          <span className="text-accent">{projectCategories[project.category]}</span>
          {project.year && (
            <>
              <span aria-hidden="true">·</span>
              <span>{project.year}</span>
            </>
          )}
          <PlaceholderBadge show={Boolean(project.placeholder)} />
        </div>

        <h3 className="mt-1.5 flex items-start justify-between gap-3 font-display text-lg leading-snug font-bold tracking-[-0.02em] sm:mt-2 sm:text-xl">
          {/* Le lien couvre toute la carte (pseudo-élément) tout en gardant un intitulé clair */}
          <Link
            to={`/projets/${project.slug}`}
            className="transition-colors duration-300 group-hover:text-accent-strong after:absolute after:inset-0 after:rounded-xl after:content-[''] focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-4 focus-visible:after:outline-accent"
          >
            {project.name}
          </Link>
          <ArrowUpRight
            aria-hidden="true"
            className="mt-1 hidden size-4 shrink-0 text-subtle transition-[color,translate] duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent sm:block"
          />
        </h3>

        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted">{project.summary}</p>
      </div>
    </article>
  )
}
