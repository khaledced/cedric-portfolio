import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router'
import { Reveal } from '@/components/shared/Reveal'
import { expertisePoles } from '@/data/expertise'

/** Bandeau des quatre pôles d'expertise, juste sous le Hero. */
export function ExpertiseStrip() {
  return (
    <section aria-labelledby="expertise-title" className="band border-y border-line">
      <h2 id="expertise-title" className="sr-only">
        Domaines d'expertise
      </h2>
      <ul className="container-page grid sm:grid-cols-2 lg:grid-cols-4">
        {expertisePoles.map((pole, i) => (
          <li
            key={pole.title}
            className="border-line max-sm:not-first:border-t sm:max-lg:nth-[n+3]:border-t sm:even:border-l lg:not-first:border-l lg:first:[&_a]:pl-0"
          >
            <Reveal delay={i * 0.06} className="h-full">
              <Link
                to="/services"
                className="group flex h-full flex-col gap-5 px-1 py-8 transition-colors duration-300 sm:px-6 lg:py-10"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, '0')}</span>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-4 text-subtle transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                  />
                </div>
                <h3 className="font-display text-xl font-extrabold tracking-tight transition-colors group-hover:text-accent-strong">
                  {pole.title}
                </h3>
                <p className="text-sm leading-relaxed text-subtle">{pole.domains.join(' · ')}</p>
              </Link>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  )
}
