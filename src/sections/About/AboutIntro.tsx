import { Reveal } from '@/components/shared/Reveal'
import { PlaceholderBadge } from '@/components/ui/PlaceholderBadge'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { story } from '@/data/about'
import { HeroPortrait } from '@/sections/Hero/HeroPortrait'

/** Ouverture de la page : présentation narrative + portrait. */
export function AboutIntro() {
  return (
    <section aria-labelledby="about-title" className="container-page pt-32 pb-20 md:pt-44 md:pb-28">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-7">
          <SectionHeading as="h1" id="about-title" label="À propos" title={story.title} />
          <PlaceholderBadge show={story.placeholder} className="mt-6" />
          <div className="mt-8 max-w-2xl space-y-5 text-lg leading-relaxed text-muted">
            {story.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.15} className="lg:col-span-5">
          <HeroPortrait />
        </Reveal>
      </div>
    </section>
  )
}
