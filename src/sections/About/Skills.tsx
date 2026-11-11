import { Check } from 'lucide-react'
import { Reveal } from '@/components/shared/Reveal'
import { PlaceholderBadge } from '@/components/ui/PlaceholderBadge'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { skillGroups } from '@/data/about'

/** Compétences, regroupées en trois familles. */
export function Skills() {
  return (
    <section aria-labelledby="skills-title" className="border-t border-line">
      <div className="container-page py-20 md:py-28">
        <Reveal>
          <SectionHeading id="skills-title" label="Compétences" title="Entre technique, création et transmission" />
        </Reveal>

        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, i) => (
            <Reveal key={group.title} delay={i * 0.08}>
              <article className="flex h-full flex-col rounded-2xl border border-line bg-card/60 p-6 transition-colors duration-300 hover:border-accent/40 sm:p-8">
                <h3 className="font-display text-xl font-medium tracking-tight">{group.title}</h3>
                <ul className="mt-6 space-y-3">
                  {group.items.map((item) => (
                    <li key={item} className="flex gap-3 text-sm text-muted">
                      <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="flex-1" />
                <div className="mt-8 border-t border-line pt-5">
                  <p className="font-mono text-[11px] tracking-wider text-subtle uppercase">Outils</p>
                  {group.tools.length > 0 ? (
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {group.tools.map((tool) => (
                        <li key={tool} className="rounded-md border border-line px-2 py-1 font-mono text-xs text-muted">
                          {tool}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-3 flex items-center gap-2 text-xs text-subtle">
                      <PlaceholderBadge /> Outils et technologies à préciser
                    </p>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
