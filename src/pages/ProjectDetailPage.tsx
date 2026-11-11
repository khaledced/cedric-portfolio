import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { Link, useParams } from 'react-router'
import { CtaBand } from '@/components/shared/CtaBand'
import { Reveal } from '@/components/shared/Reveal'
import { Seo } from '@/components/shared/Seo'
import { PlaceholderBadge } from '@/components/ui/PlaceholderBadge'
import { getProject, projectCategories, projects } from '@/data/projects'
import { Visual } from '@/components/shared/Visual'
import NotFoundPage from './NotFoundPage'

/** Étude de cas d'un projet : contexte, problème, solution, rôle, outils, visuels. */
export default function ProjectDetailPage() {
  const { slug = '' } = useParams()
  const project = getProject(slug)

  if (!project) return <NotFoundPage />

  const index = projects.indexOf(project)
  const next = projects[(index + 1) % projects.length]

  const story = [
    { label: 'Contexte', text: project.context },
    { label: 'Problème', text: project.problem },
    { label: 'Solution', text: project.solution },
  ]

  return (
    <>
      <Seo title={project.name} description={project.summary} />

      <article>
        <header className="container-page pt-32 md:pt-40">
          <Link
            to="/projets"
            className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
          >
            <ArrowLeft aria-hidden="true" className="size-4 transition-transform group-hover:-translate-x-0.5" />
            Tous les projets
          </Link>

          <Reveal className="mt-10 max-w-4xl">
            <p className="flex flex-wrap items-center gap-3 font-mono text-xs text-subtle">
              <Link
                to={`/projets?categorie=${project.category}`}
                className="text-accent transition-colors hover:text-accent-strong"
              >
                {projectCategories[project.category]}
              </Link>
              <span aria-hidden="true">·</span>
              <span>{project.year}</span>
              <PlaceholderBadge show={project.placeholder} />
            </p>
            <h1 className="mt-5 font-display text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
              {project.name}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{project.summary}</p>
          </Reveal>
        </header>

        <Reveal delay={0.1} className="container-page mt-14">
          <Visual image={project.cover} priority className="aspect-[16/9]" />
        </Reveal>

        <div className="container-page grid gap-14 py-16 md:py-24 lg:grid-cols-12 lg:gap-16">
          {/* Fiche du projet */}
          <aside className="lg:col-span-4">
            <dl className="divide-y divide-line border-y border-line lg:sticky lg:top-28">
              <div className="py-5">
                <dt className="font-mono text-xs tracking-wider text-subtle uppercase">Mon rôle</dt>
                <dd className="mt-2 text-sm leading-relaxed text-muted">{project.role}</dd>
              </div>
              <div className="py-5">
                <dt className="font-mono text-xs tracking-wider text-subtle uppercase">Outils</dt>
                <dd className="mt-3">
                  <ul className="flex flex-wrap gap-1.5">
                    {project.tools.map((tool) => (
                      <li key={tool} className="rounded-md border border-line px-2 py-1 font-mono text-xs text-muted">
                        {tool}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
              {project.url && (
                <div className="py-5">
                  <dt className="font-mono text-xs tracking-wider text-subtle uppercase">Lien</dt>
                  <dd className="mt-2">
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-accent-strong transition-colors hover:text-fg"
                    >
                      Voir le projet en ligne
                      <ArrowUpRight aria-hidden="true" className="size-4" />
                      <span className="sr-only">(nouvel onglet)</span>
                    </a>
                  </dd>
                </div>
              )}
            </dl>
          </aside>

          {/* Récit du projet */}
          <div className="space-y-14 lg:col-span-8">
            {story.map((block) => (
              <Reveal key={block.label}>
                <section>
                  <h2 className="flex items-center gap-2 font-mono text-xs text-accent">
                    <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
                    {block.label}
                  </h2>
                  <p className="mt-4 text-lg leading-relaxed text-muted">{block.text}</p>
                </section>
              </Reveal>
            ))}

            {project.results && project.results.length > 0 && (
              <Reveal>
                <section>
                  <h2 className="flex items-center gap-2 font-mono text-xs text-accent">
                    <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
                    Résultats
                  </h2>
                  <ul className="mt-4 space-y-3">
                    {project.results.map((r) => (
                      <li key={r} className="flex gap-3 text-lg leading-relaxed text-muted">
                        <span aria-hidden="true" className="mt-3 size-1.5 shrink-0 rounded-full bg-accent" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </section>
              </Reveal>
            )}
          </div>
        </div>

        {project.gallery && project.gallery.length > 0 && (
          <section aria-label="Galerie" className="container-page grid gap-6 pb-24 md:grid-cols-2">
            {project.gallery.map((img, i) => (
              <Reveal key={img.src} delay={(i % 2) * 0.08}>
                <Visual image={img} className="aspect-[4/3]" />
              </Reveal>
            ))}
          </section>
        )}
      </article>

      {projects.length > 1 && (
        <nav aria-label="Projet suivant" className="border-t border-line">
          <Link
            to={`/projets/${next.slug}`}
            className="group container-page flex items-center justify-between gap-6 py-12 md:py-16"
          >
            <span>
              <span className="font-mono text-xs text-subtle">Projet suivant</span>
              <span className="mt-2 block font-display text-2xl font-semibold tracking-tight transition-colors group-hover:text-accent-strong sm:text-3xl">
                {next.name}
              </span>
            </span>
            <ArrowRight
              aria-hidden="true"
              className="size-6 shrink-0 text-subtle transition-all group-hover:translate-x-1 group-hover:text-accent"
            />
          </Link>
        </nav>
      )}

      <CtaBand title="Vous avez un projet similaire ?" text="Parlons de votre contexte et de vos objectifs." hideProjectsLink />
    </>
  )
}
