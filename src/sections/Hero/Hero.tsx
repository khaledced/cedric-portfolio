import type { CSSProperties } from 'react'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { AvailabilityBadge } from '@/components/ui/AvailabilityBadge'
import { RiseText } from '@/components/ui/RiseText'
import { TypeRotator } from '@/components/ui/TypeRotator'
import { siteConfig } from '@/config/site'
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
          style={{ animationDelay: `${1.2 + i * 0.25}s` }}
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

          {/*
            Titre en trois lignes. Tailles en « cqi » (% de la largeur de la colonne, via @container) :
            chaque ligne s'adapte à la place disponible et ne passe jamais à la ligne.
            Largeurs réelles mesurées en Geist : « Cédric Sawadogo, » ≈ 8,6 em ; « ingénieur informatique… » ≈ 11,2 em (marge de 3 %).
          */}
          <h1 id="hero-title" className="@container mt-7 font-display font-semibold tracking-[-0.04em]">
            {/* Version lue par les lecteurs d'écran et les moteurs de recherche */}
            <span className="sr-only">
              {siteConfig.name}, ingénieur informatique… {siteConfig.heroRoles[0]} {siteConfig.heroRoles.slice(1).join(', ')}.
            </span>

            <RiseText text={`${siteConfig.name},`} className="block text-[11.2cqi] leading-[1.08] whitespace-nowrap" />

            <span
              aria-hidden="true"
              className="animate-enter mt-[0.15em] block text-[8.6cqi] leading-[1.15] whitespace-nowrap"
              style={enter(0.6)}
            >
              ingénieur informatique
              <Ellipsis />
            </span>

            <span className="animate-enter block" style={enter(0.85)}>
              <TypeRotator
                phrases={siteConfig.heroRoles}
                className="text-[8.6cqi] leading-[1.15] whitespace-nowrap text-accent"
              />
            </span>
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
