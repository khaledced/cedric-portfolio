import { m, type Variants } from 'motion/react'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { AvailabilityBadge } from '@/components/ui/AvailabilityBadge'
import { HeroPortrait } from './HeroPortrait'

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

/** Les trois points de suspension apparaissent l'un après l'autre (élément signature). */
function Ellipsis() {
  return (
    <span className="text-brand-400" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="opacity-0 [animation:dot-in_0.4s_ease-out_forwards]"
          style={{ animationDelay: `${0.9 + i * 0.25}s` }}
        >
          .
        </span>
      ))}
    </span>
  )
}

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden pt-28 pb-16 md:pt-40 md:pb-24">
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0" />

      <div className="container-page relative grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <m.div variants={container} initial="hidden" animate="show" className="lg:col-span-7">
          <m.div variants={item}>
            <AvailabilityBadge />
          </m.div>

          <m.h1
            id="hero-title"
            variants={item}
            className="mt-7 font-display text-[2.6rem] leading-[1.02] font-medium tracking-[-0.035em] text-balance sm:text-6xl lg:text-7xl xl:text-[5.25rem]"
          >
            Cédric Sawadogo, ingénieur informatique
            <Ellipsis />
            <span className="sr-only">…</span>{' '}
            <span className="text-subtle">mais pas que.</span>
          </m.h1>

          <m.p variants={item} className="mt-7 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
            Technologie, digital et créativité : je conçois des solutions, accompagne les transformations
            et donne vie aux idées.
          </m.p>

          <m.div variants={item} className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink to="/a-propos" arrow>
              Découvrir mon parcours
            </ButtonLink>
            <ButtonLink to="/projets" variant="secondary">
              Explorer mes projets
            </ButtonLink>
          </m.div>
        </m.div>

        <m.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5"
        >
          <HeroPortrait />
        </m.div>
      </div>
    </section>
  )
}
