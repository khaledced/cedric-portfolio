import type { ReactNode } from 'react'
import { m } from 'motion/react'

interface RevealProps {
  children: ReactNode
  delay?: number
  className?: string
}

/**
 * Fait apparaître son contenu en douceur lorsqu'il entre à l'écran (une seule fois).
 * Si l'utilisateur a activé « réduire les animations », seul le fondu est conservé
 * (géré globalement par <MotionConfig reducedMotion="user"> dans App.tsx).
 */
export function Reveal({ children, delay = 0, className }: RevealProps) {
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </m.div>
  )
}
