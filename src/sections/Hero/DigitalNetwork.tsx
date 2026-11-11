import { useEffect, useRef } from 'react'

/**
 * ANIMATION « DIGITALISATION » — arrière-plan du Hero.
 *
 * Un réseau de points (cercles et petits carrés arrondis, clin d'œil au logo) qui dérivent
 * lentement et se relient quand ils sont proches ; des impulsions lumineuses circulent le long
 * des liens comme des flux de données. Métaphore : des éléments isolés qui se connectent.
 *
 * Performance et accessibilité :
 * - dessinée dans un <canvas> (aucun fichier vidéo à télécharger) ;
 * - démarre après l'affichage de la page, en pause hors écran ou onglet masqué ;
 * - nombre de points adapté à la taille de l'écran, résolution plafonnée à 2× ;
 * - image fixe si le visiteur a choisi de réduire les animations ;
 * - couleurs lues dans le thème actif (--net-rgb, --net-pulse-rgb), mises à jour au changement de thème.
 */

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  square: boolean
}

interface Pulse {
  from: number
  to: number
  progress: number
  speed: number
}

const LINK_DISTANCE = 150
const LINK_LEVELS = 4
const MAX_PULSES = 7
/** 30 images/seconde : le mouvement est lent, inutile de solliciter le processeur à 60 i/s */
const FRAME_INTERVAL = 1000 / 30

export function DigitalNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let width = 0
    let height = 0
    let nodes: Node[] = []
    const pulses: Pulse[] = []
    let colors = { net: '42 75 155', pulse: '42 75 155' }
    let frame = 0
    let running = false
    let onScreen = true
    let last = performance.now()

    const readColors = () => {
      const style = getComputedStyle(document.documentElement)
      colors = {
        net: style.getPropertyValue('--net-rgb').trim() || colors.net,
        pulse: style.getPropertyValue('--net-pulse-rgb').trim() || colors.pulse,
      }
    }

    const createNodes = () => {
      // Environ un point pour 16 000 px², entre 22 et 64 points
      const count = Math.max(22, Math.min(64, Math.round((width * height) / 16000)))
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.018,
        vy: (Math.random() - 0.5) * 0.018,
        size: 1.4 + Math.random() * 1.8,
        square: Math.random() < 0.3,
      }))
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = rect.width
      height = rect.height
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      createNodes()
      if (!running) draw()
    }

    const spawnPulse = () => {
      if (pulses.length >= MAX_PULSES || nodes.length < 2) return
      const from = Math.floor(Math.random() * nodes.length)
      // Cherche un voisin relié pour que l'impulsion suive un lien visible
      for (let tries = 0; tries < 12; tries++) {
        const to = Math.floor(Math.random() * nodes.length)
        if (to === from) continue
        const dx = nodes[to].x - nodes[from].x
        const dy = nodes[to].y - nodes[from].y
        if (dx * dx + dy * dy < LINK_DISTANCE * LINK_DISTANCE) {
          pulses.push({ from, to, progress: 0, speed: 0.0006 + Math.random() * 0.0006 })
          return
        }
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)

      /*
        Liens : plus les points sont proches, plus le trait est visible.
        Optimisation : les liens sont regroupés en LINK_LEVELS niveaux d'opacité et chaque niveau
        est tracé en un seul appel (quelques appels par image au lieu de plusieurs centaines).
      */
      ctx.lineWidth = 1
      const levels: Path2D[] = Array.from({ length: LINK_LEVELS }, () => new Path2D())
      const maxSq = LINK_DISTANCE * LINK_DISTANCE
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const distSq = dx * dx + dy * dy
          if (distSq < maxSq) {
            const closeness = 1 - Math.sqrt(distSq) / LINK_DISTANCE // 0 (loin) → 1 (proche)
            const level = Math.min(LINK_LEVELS - 1, Math.floor(closeness * LINK_LEVELS))
            levels[level].moveTo(nodes[i].x, nodes[i].y)
            levels[level].lineTo(nodes[j].x, nodes[j].y)
          }
        }
      }
      levels.forEach((path, level) => {
        ctx.strokeStyle = `rgb(${colors.net} / ${(((level + 1) / LINK_LEVELS) * 0.28).toFixed(3)})`
        ctx.stroke(path)
      })

      // Points : cercles et petits carrés arrondis
      ctx.fillStyle = `rgb(${colors.net} / 0.6)`
      for (const n of nodes) {
        ctx.beginPath()
        if (n.square) ctx.roundRect(n.x - n.size, n.y - n.size, n.size * 2, n.size * 2, n.size * 0.6)
        else ctx.arc(n.x, n.y, n.size, 0, Math.PI * 2)
        ctx.fill()
      }

      // Impulsions de données le long des liens
      for (const p of pulses) {
        const a = nodes[p.from]
        const b = nodes[p.to]
        const x = a.x + (b.x - a.x) * p.progress
        const y = a.y + (b.y - a.y) * p.progress
        const glow = ctx.createRadialGradient(x, y, 0, x, y, 9)
        glow.addColorStop(0, `rgb(${colors.pulse} / 0.85)`)
        glow.addColorStop(1, `rgb(${colors.pulse} / 0)`)
        ctx.fillStyle = glow
        ctx.beginPath()
        ctx.arc(x, y, 9, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const step = (now: number) => {
      // Limite à ~30 images/seconde
      if (now - last < FRAME_INTERVAL - 1) {
        frame = requestAnimationFrame(step)
        return
      }
      const dt = Math.min(now - last, 66) // évite un saut après une pause
      last = now

      for (const n of nodes) {
        n.x += n.vx * dt
        n.y += n.vy * dt
        // Rebond doux sur les bords
        if (n.x < 0 || n.x > width) n.vx *= -1
        if (n.y < 0 || n.y > height) n.vy *= -1
      }

      for (let i = pulses.length - 1; i >= 0; i--) {
        pulses[i].progress += pulses[i].speed * dt
        if (pulses[i].progress >= 1) pulses.splice(i, 1)
      }
      if (Math.random() < 0.025) spawnPulse()

      draw()
      frame = requestAnimationFrame(step)
    }

    const start = () => {
      if (running || reduceMotion || !onScreen || document.hidden) return
      running = true
      last = performance.now()
      frame = requestAnimationFrame(step)
    }
    const stop = () => {
      running = false
      cancelAnimationFrame(frame)
    }

    readColors()
    resize()

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(canvas)

    const visibilityObserver = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting
      if (onScreen) start()
      else stop()
    })
    visibilityObserver.observe(canvas)

    const onVisibilityChange = () => (document.hidden ? stop() : start())
    document.addEventListener('visibilitychange', onVisibilityChange)

    // Changement de thème : nouvelles couleurs
    const themeObserver = new MutationObserver(() => {
      readColors()
      if (!running) draw()
    })
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

    // Démarrage quand le navigateur est disponible : la page et le titre s'affichent d'abord
    const begin = () => {
      canvas.dataset.ready = 'true'
      start()
    }
    const idleId =
      'requestIdleCallback' in window ? window.requestIdleCallback(begin, { timeout: 2500 }) : undefined
    const startTimer = idleId === undefined ? window.setTimeout(begin, 1200) : undefined

    return () => {
      if (idleId !== undefined) window.cancelIdleCallback(idleId)
      if (startTimer !== undefined) window.clearTimeout(startTimer)
      stop()
      resizeObserver.disconnect()
      visibilityObserver.disconnect()
      themeObserver.disconnect()
      document.removeEventListener('visibilitychange', onVisibilityChange)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 size-full opacity-0 transition-opacity duration-1000 [mask-image:radial-gradient(ellipse_75%_85%_at_65%_45%,black_25%,transparent_80%)] data-[ready=true]:opacity-100"
    />
  )
}
