import type { CSSProperties } from 'react'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { AvailabilityBadge } from '@/components/ui/AvailabilityBadge'
import { DigitalNetwork } from './DigitalNetwork'
import { HeroPortrait } from './HeroPortrait'

/*
  Animations d'entrée du Hero en CSS pur (classe .animate-enter, voir global.css) :
  elles démarrent dès l'affichage du HTML pré-rendu, sans attendre le JavaScript.
  Le titre principal apparaît ainsi le plus tôt possible.
*/
const enter = (delay: number): CSSProperties => ({ animationDelay: `${delay}s` })

/** Les trois points de suspension apparaissent l'un après l'autre (élément signature). */
function Ellipsis() {
  return (
    <span className="text-accent" aria-hidden="true">
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
      <DigitalNetwork />

      <div className="container-page relative grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <div className="animate-enter" style={enter(0.05)}>
            <AvailabilityBadge />
          </div>

          <h1
            id="hero-title"
            className="animate-enter mt-7 font-display text-[2.6rem] leading-[1.02] font-medium tracking-[-0.035em] text-balance sm:text-6xl lg:text-7xl xl:text-[5.25rem]"
            style={enter(0.12)}
          >
            Cédric Sawadogo, ingénieur informatique
            <Ellipsis />
            <span className="sr-only">…</span>{' '}
            <span className="text-subtle">mais pas que.</span>
          </h1>

          <p
            className="animate-enter mt-7 max-w-xl text-lg leading-relaxed text-muted sm:text-xl"
            style={enter(0.2)}
          >
            Technologie, digital et créativité : je conçois des solutions, accompagne les transformations
            et donne vie aux idées.
          </p>

          <div className="animate-enter mt-10 flex flex-col gap-3 sm:flex-row" style={enter(0.28)}>
            <ButtonLink to="/a-propos" arrow>
              Découvrir mon parcours
            </ButtonLink>
            <ButtonLink to="/projets" variant="secondary">
              Explorer mes projets
            </ButtonLink>
          </div>
        </div>

        <div className="animate-enter lg:col-span-5" style={enter(0.3)}>
          <HeroPortrait />
        </div>
      </div>
    </section>
  )
}
