import { useEffect, useRef, useState, type PointerEvent } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router'
import { Visual } from '@/components/shared/Visual'
import { PlaceholderBadge } from '@/components/ui/PlaceholderBadge'
import { getProjectCover, projectCategories, type Project } from '@/data/projects'
import { cn } from '@/lib/cn'

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
  // L'aperçu (et ses images) n'est créé qu'au premier survol
  const [hovered, setHovered] = useState(false)

  /*
    Position de l'aperçu : il suit le curseur avec un léger retard (lissage à chaque image),
    immédiatement si le visiteur a choisi de réduire les animations. Calcul sans React ni
    bibliothèque : seule la propriété transform est modifiée, à 60 images par seconde.
  */
  const previewRef = useRef<HTMLDivElement>(null)
  const target = useRef({ x: 0, y: 0 })
  const current = useRef({ x: 0, y: 0 })
  const frame = useRef(0)

  const place = () => {
    const el = previewRef.current
    if (el) el.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0)`
  }

  const animate = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const c = current.current
    const t = target.current
    c.x += reduce ? t.x - c.x : (t.x - c.x) * 0.22
    c.y += reduce ? t.y - c.y : (t.y - c.y) * 0.22
    place()
    frame.current = Math.abs(t.x - c.x) + Math.abs(t.y - c.y) > 0.5 ? requestAnimationFrame(animate) : 0
  }

  useEffect(() => () => cancelAnimationFrame(frame.current), [])

  function follow(e: PointerEvent) {
    target.current = { x: e.clientX, y: e.clientY }
    if (!frame.current) frame.current = requestAnimationFrame(animate)
  }

  function handlePointerMove(e: PointerEvent) {
    if (e.pointerType === 'mouse') follow(e)
  }

  function handlePointerEnter(e: PointerEvent, index: number) {
    if (e.pointerType !== 'mouse') return
    // Première apparition : l'aperçu part directement de la position du curseur
    if (active === null) {
      current.current = { x: e.clientX, y: e.clientY }
      place()
    }
    follow(e)
    setHovered(true)
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
                <Visual
                  image={cover}
                  frame="print"
                  sizes="72px"
                  className={`aspect-[4/3] transition-transform duration-500 group-hover:rotate-0 md:hidden ${i % 2 === 0 ? 'rotate-[-2deg]' : 'rotate-[2deg]'}`}
                />
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

      {/* Petit aperçu façon photo imprimée, qui suit le curseur (ordinateur, souris uniquement) */}
      <div
        ref={previewRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-30 hidden w-56 md:block"
      >
        {hovered && (
          <div
            className={cn(
              'relative mt-5 ml-5 aspect-[4/3] rounded-md bg-white shadow-[0_22px_45px_-22px_rgb(14_26_51/0.5),0_2px_6px_-2px_rgb(14_26_51/0.15)] ring-1 ring-black/5 transition-[opacity,scale,rotate] duration-250 ease-[cubic-bezier(0.16,1,0.3,1)] dark:bg-[#1c1f27] dark:ring-white/10',
              active !== null ? 'scale-100 -rotate-3 opacity-100' : 'scale-[0.92] rotate-0 opacity-0',
            )}
          >
            {/* Toutes les images sont empilées : passer d'un projet à l'autre est instantané */}
            {projects.map((project, i) => {
              const cover = getProjectCover(project)
              return (
                <div
                  key={project.slug}
                  className="absolute inset-2 overflow-hidden rounded-[3px] transition-opacity duration-300"
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
          </div>
        )}
      </div>
    </div>
  )
}
