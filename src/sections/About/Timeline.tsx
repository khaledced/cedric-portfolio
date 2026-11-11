import { Reveal } from '@/components/shared/Reveal'
import { PlaceholderBadge } from '@/components/ui/PlaceholderBadge'
import type { TimelineEntry } from '@/data/about'

interface TimelineProps {
  title: string
  entries: TimelineEntry[]
}

/**
 * Frise verticale. Chaque étape est marquée d'un anneau bleu,
 * clin d'œil au cercle central du symbole du logo.
 */
export function Timeline({ title, entries }: TimelineProps) {
  return (
    <div>
      <h3 className="label-mono text-xs text-subtle">{title}</h3>
      <ol className="mt-8 border-l border-line">
        {entries.map((e, i) => (
          <li key={`${e.title}-${i}`} className="relative pb-10 pl-8 last:pb-0">
            <span
              aria-hidden="true"
              className="absolute top-1.5 -left-[7px] size-[13px] rounded-full border-[3px] border-accent bg-page"
            />
            <Reveal delay={i * 0.06}>
              <div className="flex flex-wrap items-center gap-2">
                <p className="label-mono text-xs text-accent">{e.period}</p>
                <PlaceholderBadge show={Boolean(e.placeholder)} />
              </div>
              <p className="mt-2 text-lg font-semibold text-fg">{e.title}</p>
              <p className="mt-1 text-sm text-muted">
                {e.organization}
                {e.location && <span className="text-subtle"> · {e.location}</span>}
              </p>
              {e.description && <p className="mt-3 max-w-prose text-sm leading-relaxed text-subtle">{e.description}</p>}
            </Reveal>
          </li>
        ))}
      </ol>
    </div>
  )
}
