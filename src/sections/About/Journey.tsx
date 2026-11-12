import { Reveal } from '@/components/shared/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { education, experience } from '@/data/about'
import { Timeline } from './Timeline'

/** Parcours académique et professionnel, côte à côte sur grand écran. */
export function Journey() {
  if (education.length === 0 && experience.length === 0) return null

  return (
    <section aria-labelledby="journey-title" className="border-t border-line">
      <div className="container-page py-20 md:py-28">
        <Reveal>
          <SectionHeading id="journey-title" label="Parcours" title="Formation et expériences" />
        </Reveal>
        <div className="mt-14 grid gap-16 lg:grid-cols-2 lg:gap-20">
          {experience.length > 0 && <Timeline title="Expérience professionnelle" entries={experience} />}
          {education.length > 0 && <Timeline title="Formation" entries={education} />}
        </div>
      </div>
    </section>
  )
}
