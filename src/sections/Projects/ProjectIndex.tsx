import { useState, type PointerEvent } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { AnimatePresence, m, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import { Link } from 'react-router'
import { Visual } from '@/components/shared/Visual'
import { PlaceholderBadge } from '@/components/ui/PlaceholderBadge'
import { getProjectCover, projectCategories, type Project } from '@/data/projects'

interface ProjectIndexProps {
  projects: Project[]
}

/**
 * Liste numérotée des projets (accueil), volontairement légère.
 * - Ordinateur : au survol, la ligne se teinte légèrement et un petit aperçu suit le curseur.
 * - Mobile : une miniature discrète à gauche de chaque ligne, sans grande image.
 */
export function ProjectIndex({ projects }: ProjectIndexProps) {
  const [active, setActive] = useState<number | null>(null)
  const reduceMotion = useReducedMotion()

  // Position de l'aperçu : suit le curseur avec un léger retard (ressort), immédiat si animations réduites
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const spring = reduceMotion ? { stiffness: 2000, damping: 100 } : { stiffness: 300, damping: 32, mass: 0.5 }
  const springX = useSpring(x, spring)
  const springY = useSpring(y, spring)

  function handlePointerMove(e: PointerEvent) {
    if (e.pointerType !== 'mouse') return
    x.set(e.clientX)
    y.set(e.clientY)
  }

  function handlePointerEnter(e: PointerEvent, index: number) {
    if (e.pointerType !== 'mouse') return
    // Première apparition : l'aperçu part directement de la position du curseur
    if (active === null) {
      springX.jump(e.clientX)
      springY.jump(e.clientY)
    }
    x.set(e.clientX)
    y.set(e.clientY)
    setActive(index)
  }

  return (
    <div onPointerLeave={() => setActive(null)} onPointerMove={handlePointerMove}>
      <ul className="border-t border-line">
        {projects.map((project, i) => {
          const cover = getProjectCover(project)
          return (
            <li key={project.slug}>
              <Link
                to={`/projets/${project.slug}`}
                onPointerEnter={(e) => handlePointerEnter(e, i)}
                onFocus={() => setActive(null)}
                className="group grid grid-cols-[4.5rem_minmax(0,1fr)_auto] items-center gap-x-4 border-b border-line py-4 transition-colors duration-300 hover:bg-accent/[0.04] focus-visible:bg-accent/[0.06] md:grid-cols-[3rem_minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)_4.5rem] md:rounded-xl md:px-3 md:py-5"
              >
                {/* Mobile : petite miniature ; ordinateur : numéro */}
                <Visual image={cover} sizes="72px" className="aspect-[4/3] rounded-lg! md:hidden" />
                <span className="hidden label-mono text-xs text-subtle md:block">{String(i + 1).padStart(2, '0')}</span>

                <span className="min-w-0">
                  <span className="block font-display text-lg leading-snug font-bold tracking-[-0.02em] text-balance transition-[color,translate] duration-300 group-hover:text-accent-strong md:text-2xl md:group-hover:translate-x-1">
                    {project.name}
                  </span>
                  <span className="mt-1 flex flex-wrap items-center gap-2 label-mono text-[11px] text-subtle md:hidden">
                    {projectCategories[project.category]}
                    <PlaceholderBadge show={Boolean(project.placeholder)} />
                  </span>
                  {project.placeholder && <PlaceholderBadge show className="mt-2 hidden md:inline-flex" />}
                </span>

                <span className="hidden label-mono text-xs text-muted md:block">{projectCategories[project.category]}</span>

                <span className="hidden min-w-0 truncate font-mono text-xs text-subtle md:block">
                  {project.tools.slice(0, 3).join(' · ')}
                </span>

                <span className="flex items-center justify-end gap-1.5 label-mono text-xs text-subtle">
                  <span className="hidden md:inline">{project.year}</span>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-4 transition-[color,translate] duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                  />
                </span>
              </Link>
            </li>
          )
        })}
      </ul>

      {/* Petit aperçu qui suit le curseur (ordinateur, souris uniquement) */}
      <m.div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-30 hidden w-56 md:block"
        style={{ x: springX, y: springY }}
      >
        <AnimatePresence>
          {active !== null && (
            <m.div
              key="preview"
              className="relative mt-5 ml-5 aspect-[4/3] overflow-hidden rounded-xl border border-line bg-card shadow-[0_16px_40px_-20px_rgb(14_26_51/0.35)]"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Toutes les images sont empilées : passer d'un projet à l'autre est instantané */}
              {projects.map((project, i) => {
                const cover = getProjectCover(project)
                return (
                  <div
                    key={project.slug}
                    className="absolute inset-0 transition-opacity duration-300"
                    style={{ opacity: i === active ? 1 : 0 }}
                  >
                    {cover ? (
                      <img
                        src={cover.src}
                        srcSet={cover.srcSet}
                        sizes="14rem"
                        alt=""
                        decoding="async"
                        className="size-full object-cover"
                      />
                    ) : (
                      <div className="bg-grid size-full" />
                    )}
                  </div>
                )
              })}
            </m.div>
          )}
        </AnimatePresence>
      </m.div>
    </div>
  )
}
