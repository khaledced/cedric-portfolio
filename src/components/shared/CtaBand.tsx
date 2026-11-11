import { Reveal } from '@/components/shared/Reveal'
import { ButtonLink } from '@/components/ui/ButtonLink'

interface CtaBandProps {
  title: string
  text?: string
  /** Masquer le bouton « Voir mes projets » (inutile sur les pages Projets) */
  hideProjectsLink?: boolean
}

/** Bandeau d'appel à l'action en fin de page. */
export function CtaBand({ title, text, hideProjectsLink = false }: CtaBandProps) {
  return (
    <section className="band border-t border-line">
      <Reveal className="container-page flex flex-col gap-8 py-20 md:flex-row md:items-end md:justify-between md:py-24">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl leading-tight font-medium tracking-tight text-balance sm:text-4xl">
            {title}
          </h2>
          {text && <p className="mt-4 text-muted">{text}</p>}
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink to="/contact" arrow>
            Me contacter
          </ButtonLink>
          {!hideProjectsLink && (
            <ButtonLink to="/projets" variant="secondary">
              Voir mes projets
            </ButtonLink>
          )}
        </div>
      </Reveal>
    </section>
  )
}
