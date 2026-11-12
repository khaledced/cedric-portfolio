import { Reveal } from '@/components/shared/Reveal'
import { Visual, type VisualImage } from '@/components/shared/Visual'
import { cn } from '@/lib/cn'

/*
  Disposition « collage » : photos imprimées de tailles variées, légèrement inclinées et décalées,
  décalées les unes par rapport aux autres sur grand écran. Le motif se répète tous les 5 visuels.
  - largeur : nombre de colonnes sur 12 (grand écran)
  - décalage : marge haute / chevauchement, pour casser l'alignement
  - inclinaison : angle de la photo (redressée au survol)
*/
const pattern = [
  { span: 'lg:col-span-6', offset: '', tilt: 'lg:rotate-[-1.5deg]' },
  { span: 'lg:col-span-4 lg:col-start-8', offset: 'lg:mt-16', tilt: 'lg:rotate-[2deg]' },
  { span: 'lg:col-span-4 lg:col-start-2', offset: 'lg:-mt-10', tilt: 'lg:rotate-[1.5deg]' },
  { span: 'lg:col-span-4', offset: 'lg:mt-8', tilt: 'lg:rotate-[-2deg]' },
  { span: 'lg:col-span-3', offset: 'lg:mt-20', tilt: 'lg:rotate-[1deg]' },
]

/** Sur mobile : deux colonnes, la première image en pleine largeur, inclinaisons alternées plus discrètes */
const mobileTilt = ['rotate-[-1deg]', 'rotate-[1.5deg]', 'rotate-[-1.5deg]']

export function Collage({ images }: { images: VisualImage[] }) {
  return (
    <ul className="mx-auto grid max-w-5xl grid-cols-2 gap-x-4 gap-y-6 sm:gap-x-6 lg:grid-cols-12 lg:gap-x-6 lg:gap-y-8">
      {images.map((img, i) => {
        const p = pattern[i % pattern.length]
        return (
          <li key={img.src} className={cn('relative hover:z-10', i === 0 && 'col-span-2', p.span, p.offset)}>
            <Reveal delay={(i % 3) * 0.08}>
              <Visual
                image={img}
                frame="print"
                sizes={i === 0 ? '(min-width: 1024px) 512px, 100vw' : '(min-width: 1024px) 340px, 50vw'}
                className={cn(
                  'aspect-[4/3] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:rotate-0 hover:scale-[1.02] lg:hover:rotate-0',
                  mobileTilt[i % mobileTilt.length],
                  p.tilt,
                )}
              />
            </Reveal>
          </li>
        )
      })}
    </ul>
  )
}
