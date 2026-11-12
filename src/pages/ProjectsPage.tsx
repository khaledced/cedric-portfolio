import { useIsClient } from '@/hooks/useIsClient'
import { AnimatePresence, m } from 'motion/react'
import { useSearchParams } from 'react-router'
import { CtaBand } from '@/components/shared/CtaBand'
import { Reveal } from '@/components/shared/Reveal'
import { Seo } from '@/components/shared/Seo'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { projectCategories, projects, type ProjectCategory } from '@/data/projects'
import { cn } from '@/lib/cn'
import { ProjectCard } from '@/sections/Projects/ProjectCard'

/** Seules les catégories qui contiennent au moins un projet apparaissent dans le filtre. */
const usedCategories = (Object.keys(projectCategories) as ProjectCategory[]).filter((c) =>
  projects.some((p) => p.category === c),
)

export default function ProjectsPage() {
  // Le filtre est stocké dans l'URL (?categorie=branding) : il peut être partagé et survit au retour arrière
  const [urlParams, setParams] = useSearchParams()
  // Pendant la réhydratation, on affiche la version sans filtre (identique au HTML pré-rendu)
  const params = useIsClient() ? urlParams : new URLSearchParams()
  const raw = params.get('categorie')
  const active = raw && raw in projectCategories ? (raw as ProjectCategory) : null
  const visible = active ? projects.filter((p) => p.category === active) : projects

  const select = (category: ProjectCategory | null) => {
    setParams(category ? { categorie: category } : {}, { replace: true, preventScrollReset: true })
  }

  const filters: Array<{ value: ProjectCategory | null; label: string; count: number }> = [
    { value: null, label: 'Tous', count: projects.length },
    ...usedCategories.map((c) => ({
      value: c,
      label: projectCategories[c],
      count: projects.filter((p) => p.category === c).length,
    })),
  ]

  return (
    <>
      <Seo
        title="Projets"
        description="Réalisations de Cédric Sawadogo : développement web, identité visuelle, digitalisation, communication et réseaux."
      />

      <section aria-labelledby="projects-title" className="container-page pt-32 pb-24 md:pt-44">
        <Reveal>
          <SectionHeading as="h1" id="projects-title" label="Projets" title="Des réalisations concrètes, du besoin à la solution.">
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
              Chaque projet est présenté avec son contexte, le problème à résoudre, la solution apportée et mon rôle.
            </p>
          </SectionHeading>
        </Reveal>

        {usedCategories.length > 1 && (
          <div role="group" aria-label="Filtrer par catégorie" className="mt-12 flex flex-wrap gap-2">
            {filters.map((f) => {
              const isActive = f.value === active
              return (
                <button
                  key={f.label}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => select(f.value)}
                  className={cn(
                    'inline-flex items-center gap-2 rounded-full border px-4 py-2 label-mono text-xs transition-colors',
                    isActive
                      ? 'border-primary bg-primary text-on-primary'
                      : 'border-line text-muted hover:border-accent/50 hover:text-fg',
                  )}
                >
                  {f.label}
                  <span className={cn('label-mono text-xs', isActive ? 'text-on-primary/75' : 'text-subtle')}>{f.count}</span>
                </button>
              )
            })}
          </div>
        )}

        <p className="sr-only" aria-live="polite">
          {visible.length} projet{visible.length > 1 ? 's' : ''} affiché{visible.length > 1 ? 's' : ''}
        </p>

        <ul className="mt-10 grid gap-x-6 gap-y-6 sm:mt-12 sm:grid-cols-2 sm:gap-y-12 lg:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((project) => (
              <m.li
                key={project.slug}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectCard project={project} />
              </m.li>
            ))}
          </AnimatePresence>
        </ul>

        {visible.length === 0 && <p className="mt-12 text-muted">Aucun projet dans cette catégorie pour le moment.</p>}
      </section>

      <CtaBand title="Vous avez un projet similaire ?" text="Parlons de votre contexte et de vos objectifs." hideProjectsLink />
    </>
  )
}
