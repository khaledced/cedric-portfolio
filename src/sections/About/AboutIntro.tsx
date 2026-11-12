import { Reveal } from '@/components/shared/Reveal'
import { PlaceholderBadge } from '@/components/ui/PlaceholderBadge'
import { siteConfig } from '@/config/site'
import { story } from '@/data/about'
import { HeroPortrait } from '@/sections/Hero/HeroPortrait'

/**
 * Ouverture de la page : le prénom en très grand, comme une affiche,
 * puis le portrait à gauche et la présentation à droite.
 */
export function AboutIntro() {
  const firstName = siteConfig.name.split(' ')[0]

  return (
    <section aria-labelledby="about-title" className="container-page pt-32 pb-20 md:pt-44 md:pb-28">
      <Reveal>
        <p className="flex items-center gap-2 label-mono text-xs text-accent">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
          À propos
        </p>
        <h1
          id="about-title"
          className="mt-4 font-display text-[clamp(3.25rem,15vw,11.5rem)] leading-[0.9] font-black tracking-[-0.05em] uppercase"
        >
          {firstName}
          <span className="sr-only"> {siteConfig.name.split(' ').slice(1).join(' ')}</span>
        </h1>
      </Reveal>

      <div className="mt-12 grid gap-12 md:mt-16 lg:grid-cols-12 lg:gap-16">
        <Reveal delay={0.1} className="lg:col-span-5">
          <HeroPortrait photo={siteConfig.aboutPhoto} />
        </Reveal>

        <Reveal delay={0.15} className="lg:col-span-7">
          {siteConfig.contact.location && (
            <p className="label-mono text-xs text-subtle">{siteConfig.contact.location}</p>
          )}
          <p className="mt-4 font-display text-2xl leading-snug font-bold tracking-tight text-balance sm:text-3xl">
            {story.title}
          </p>
          <PlaceholderBadge show={Boolean(story.placeholder)} className="mt-4" />
          <div className="mt-6 max-w-2xl space-y-5 text-lg leading-relaxed text-muted">
            {story.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
