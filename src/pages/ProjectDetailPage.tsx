import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { Link, useParams } from 'react-router'
import { CtaBand } from '@/components/shared/CtaBand'
import { Reveal } from '@/components/shared/Reveal'
import { Seo } from '@/components/shared/Seo'
import { PlaceholderBadge } from '@/components/ui/PlaceholderBadge'
import { getProject, projectCategories, projects } from '@/data/projects'
import { VideoGallery } from '@/components/shared/VideoGallery'
import { Visual } from '@/components/shared/Visual'
import { Collage } from '@/components/shared/Collage'
import NotFoundPage from './NotFoundPage'

/** Étude de cas d'un projet : contexte, problème, solution, rôle, outils, visuels. */
export default function ProjectDetailPage() {
  const { slug = '' } = useParams()
  const project = getProject(slug)

  if (!project) return <NotFoundPage />

  const index = projects.indexOf(project)
  const next = projects[(index + 1) % projects.length]

  const hasVideos = Boolean(project.videos && project.videos.length > 0)
  // Visuel principal : affiché sauf pour un projet vidéo sans couverture (les vidéos le remplacent)
  const showCover = !(hasVideos && !project.cover)
  const videoSection = hasVideos && (
    <section aria-labelledby="videos-title">
      <h2 id="videos-title" className="flex items-center gap-2 label-mono text-xs text-accent">
        <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
        Vidéos
      </h2>
      <div className="mt-6">
        <VideoGallery videos={project.videos ?? []} />
      </div>
    </section>
  )

  // Seuls les blocs renseignés sont affichés
  const story = [
    { label: 'Contexte', text: project.context },
    { label: 'Problème', text: project.problem },
    { label: 'Solution', text: project.solution },
  ].filter((block): block is { label: string; text: string } => Boolean(block.text))
  const hasInfo = Boolean(project.role || project.tools.length > 0 || project.url)

  return (
    <>
      <Seo title={project.name} description={project.summary} />

      <article>
        <header className="container-page pt-32 md:pt-40">
          <Link
            to="/projets"
            className="group inline-flex items-center gap-2 label-mono text-xs text-muted transition-colors hover:text-fg"
          >
            <ArrowLeft aria-hidden="true" className="size-4 transition-transform group-hover:-translate-x-0.5" />
            Tous les projets
          </Link>

          <div className={showCover ? 'mt-10 grid items-center gap-12 lg:grid-cols-12 lg:gap-16' : 'mt-10'}>
          <Reveal className={showCover ? 'lg:col-span-7' : 'max-w-4xl'}>
            <p className="flex flex-wrap items-center gap-3 label-mono text-xs text-subtle">
              <Link
                to={`/projets?categorie=${project.category}`}
                className="text-accent transition-colors hover:text-accent-strong"
              >
                {projectCategories[project.category]}
              </Link>
              {project.year && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>{project.year}</span>
                </>
              )}
              <PlaceholderBadge show={Boolean(project.placeholder)} />
            </p>
            <h1 className="mt-5 font-display text-4xl leading-[1.05] font-extrabold tracking-tight text-balance sm:text-5xl lg:text-6xl">
              {project.name}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{project.summary}</p>
          </Reveal>

          {/* Visuel principal à côté du titre, présenté comme une photo imprimée légèrement inclinée */}
          {showCover && (
            <Reveal delay={0.1} className="lg:col-span-5">
              <Visual
                image={project.cover}
                priority
                frame="print"
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="mx-auto aspect-[4/3] w-11/12 rotate-[-1.5deg] transition-transform duration-500 hover:rotate-0 sm:w-4/5 lg:w-full lg:rotate-[2deg] lg:hover:rotate-0"
              />
            </Reveal>
          )}
          </div>
        </header>

        {/* Sans image de couverture, les vidéos du projet prennent la place du visuel principal */}
        {hasVideos && !project.cover && <div className="container-page mt-10 md:mt-12">{videoSection}</div>}

        {(story.length > 0 || hasInfo || (project.results && project.results.length > 0)) && (
        <div className="container-page py-14 md:py-20">
          {/* Récit du projet : trois blocs courts, côte à côte sur grand écran */}
          {story.length > 0 && (
          <ol className="grid gap-x-10 gap-y-8 border-t border-line pt-8 md:grid-cols-3">
            {story.map((block, i) => (
              <li key={block.label}>
                <Reveal delay={i * 0.06}>
                  <h2 className="flex items-baseline gap-2 label-mono text-xs text-accent">
                    <span className="text-subtle">{String(i + 1).padStart(2, '0')}</span>
                    {block.label}
                  </h2>
                  <p className="mt-3 text-base leading-relaxed text-muted">{block.text}</p>
                </Reveal>
              </li>
            ))}
          </ol>
          )}

          {project.results && project.results.length > 0 && (
            <Reveal className="mt-10">
              <h2 className="label-mono text-xs text-accent">Résultats</h2>
              <ul className="mt-3 space-y-2">
                {project.results.map((r) => (
                  <li key={r} className="flex gap-3 text-base leading-relaxed text-muted">
                    <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" />
                    {r}
                  </li>
                ))}
              </ul>
            </Reveal>
          )}

          {/* Fiche du projet : une seule bande d'informations */}
          {hasInfo && (
          <dl className="mt-12 grid gap-6 rounded-2xl border border-line bg-card/50 p-5 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)_auto] sm:gap-10 md:p-6">
            {project.role && (
            <div>
              <dt className="label-mono text-[11px] text-subtle">Mon rôle</dt>
              <dd className="mt-1.5 text-sm leading-relaxed text-fg">{project.role}</dd>
            </div>
            )}
            {project.tools.length > 0 && (
            <div>
              <dt className="label-mono text-[11px] text-subtle">Outils</dt>
              <dd className="mt-2">
                <ul className="flex flex-wrap gap-1.5">
                  {project.tools.map((tool) => (
                    <li key={tool} className="rounded-md border border-line px-2 py-0.5 label-mono text-[11px] text-muted">
                      {tool}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
            )}
            {project.url && (
              <div>
                <dt className="label-mono text-[11px] text-subtle">Lien</dt>
                <dd className="mt-1.5">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm whitespace-nowrap text-accent-strong transition-colors hover:text-fg"
                  >
                    Voir en ligne
                    <ArrowUpRight aria-hidden="true" className="size-4" />
                    <span className="sr-only">(nouvel onglet)</span>
                  </a>
                </dd>
              </div>
            )}
          </dl>
          )}
        </div>
        )}

        {hasVideos && project.cover && <div className="container-page pb-24">{videoSection}</div>}

        {project.gallery && project.gallery.length > 0 && (
          <section aria-label="Galerie" className="container-page pb-24">
            <Collage images={project.gallery} />
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
              <span className="label-mono text-xs text-subtle">Projet suivant</span>
              <span className="mt-2 block font-display text-2xl font-extrabold tracking-tight transition-colors group-hover:text-accent-strong sm:text-3xl">
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
