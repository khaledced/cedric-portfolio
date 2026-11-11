import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router'
import { PlaceholderBadge } from '@/components/ui/PlaceholderBadge'
import { projectCategories, type Project } from '@/data/projects'
import { ProjectVisual } from './ProjectVisual'

/** Carte projet : visuel, catégorie, année, titre, résumé et outils. */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group relative flex h-full flex-col">
      <ProjectVisual
        image={project.cover}
        className="aspect-[16/10] transition-colors duration-300 group-hover:border-brand-400/40 [&_img]:transition-transform [&_img]:duration-700 group-hover:[&_img]:scale-[1.03]"
      />
      <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-xs text-subtle">
        <span className="text-brand-400">{projectCategories[project.category]}</span>
        <span aria-hidden="true">·</span>
        <span>{project.year}</span>
        <PlaceholderBadge show={project.placeholder} />
      </div>
      <h3 className="mt-3 flex items-start justify-between gap-4 text-xl font-medium tracking-tight">
        {/* Le lien couvre toute la carte (pseudo-élément) tout en gardant un intitulé clair */}
        <Link to={`/projets/${project.slug}`} className="after:absolute after:inset-0 after:content-['']">
          {project.name}
        </Link>
        <ArrowUpRight
          aria-hidden="true"
          className="mt-1 size-4 shrink-0 text-subtle transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand-400"
        />
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{project.summary}</p>
      <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Outils utilisés">
        {project.tools.slice(0, 4).map((tool) => (
          <li key={tool} className="rounded-md border border-line px-2 py-0.5 font-mono text-[11px] text-subtle">
            {tool}
          </li>
        ))}
      </ul>
    </article>
  )
}
