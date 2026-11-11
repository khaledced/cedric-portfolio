import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router'

/**
 * Fait défiler jusqu'à l'élément ciblé par l'ancre de l'URL (ex. /services#branding).
 * - Ancre sur la même page (sommaire) : défilement doux.
 * - Arrivée depuis une autre page : saut direct, sans animation.
 * - Défilement doux désactivé si l'utilisateur préfère réduire les animations.
 * La marge sous le header fixe est gérée en CSS (scroll-margin-top).
 */
export function useHashScroll() {
  const { pathname, hash } = useLocation()
  const previousPathname = useRef(pathname)

  useEffect(() => {
    const samePage = previousPathname.current === pathname
    previousPathname.current = pathname
    if (!hash) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const behavior: ScrollBehavior = samePage && !reduceMotion ? 'smooth' : 'auto'
    const id = decodeURIComponent(hash.slice(1))

    // La page peut être chargée à la demande : on attend que l'élément existe (1 s max)
    let tries = 0
    const timer = window.setInterval(() => {
      const el = document.getElementById(id)
      if (el || ++tries > 20) {
        window.clearInterval(timer)
        el?.scrollIntoView({ behavior, block: 'start' })
      }
    }, 50)
    return () => window.clearInterval(timer)
  }, [pathname, hash])
}
