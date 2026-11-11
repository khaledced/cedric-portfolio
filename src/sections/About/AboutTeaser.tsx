import { Reveal } from '@/components/shared/Reveal'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { PlaceholderBadge } from '@/components/ui/PlaceholderBadge'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { story, vision } from '@/data/about'

/** Aperçu « À propos » sur la page d'accueil, renvoyant vers la page complète. */
export function AboutTeaser() {
  return (
    <section aria-labelledby="about-teaser-title">
      <div className="container-page grid gap-10 py-20 md:py-28 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <SectionHeading id="about-teaser-title" label="À propos" title={story.title} />
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-7 lg:pt-10">
          <PlaceholderBadge show={story.placeholder || vision.placeholder} />
          <p className="mt-4 text-lg leading-relaxed text-muted">{story.paragraphs[0]}</p>
          <p className="mt-6 border-l-2 border-brand-400 pl-5 font-display text-xl leading-snug text-fg">
            {vision.statement}
          </p>
          <ButtonLink to="/a-propos" variant="secondary" arrow className="mt-10">
            Découvrir mon parcours
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  )
}
