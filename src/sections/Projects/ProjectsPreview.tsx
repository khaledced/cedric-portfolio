import { Reveal } from '@/components/shared/Reveal'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { projects } from '@/data/projects'
import { ProjectCard } from './ProjectCard'

/** Projets mis en avant (featured: true) sur la page d'accueil. */
export function ProjectsPreview() {
  const featured = projects.filter((p) => p.featured).slice(0, 3)
  if (featured.length === 0) return null

  return (
    <section aria-labelledby="projects-preview-title" className="border-t border-line">
      <div className="container-page py-20 md:py-28">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <SectionHeading id="projects-preview-title" label="Projets" title="Réalisations à la une" />
          </Reveal>
          <Reveal delay={0.1}>
            <ButtonLink to="/projets" variant="secondary" arrow>
              Tous les projets
            </ButtonLink>
          </Reveal>
        </div>

        <ul className="mt-14 grid gap-x-8 gap-y-14 md:grid-cols-2">
          {featured.map((project, i) => (
            <li key={project.slug}>
              <Reveal delay={i * 0.08} className="h-full">
                <ProjectCard project={project} />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
