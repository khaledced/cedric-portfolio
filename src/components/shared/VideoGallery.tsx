import { Play, VideoOff } from 'lucide-react'
import { Reveal } from '@/components/shared/Reveal'
import { cn } from '@/lib/cn'
import { isYoutubeShort, youtubeId, youtubeThumbnail } from '@/lib/url'

export interface ProjectVideo {
  /** Petit titre affiché sous l'aperçu (quelques mots) */
  title: string
  /** Lien YouTube de la vidéo (youtube.com/watch?v=…, youtu.be/…, youtube.com/shorts/…) */
  url: string
  /** Vidéo à la une : affichée en premier et utilisée comme aperçu du projet */
  featured?: boolean
}

interface VideoGalleryProps {
  videos: ProjectVideo[]
}

/** Met la vidéo à la une en premier, sans changer l'ordre des autres */
function sortVideos(videos: ProjectVideo[]): ProjectVideo[] {
  return [...videos.filter((v) => v.featured), ...videos.filter((v) => !v.featured)]
}

/**
 * Suite de vidéos : petites miniatures façon photos imprimées (marge blanche, ombre douce,
 * légère inclinaison), comme les images des projets, avec un petit titre dessous.
 * Seule la miniature est chargée ; le clic ouvre la vidéo sur YouTube (aucun lecteur intégré au site).
 */
export function VideoGallery({ videos }: VideoGalleryProps) {
  const sorted = sortVideos(videos)

  return (
    <ul className="grid grid-cols-2 gap-x-7 gap-y-8 min-[480px]:grid-cols-3 sm:grid-cols-4 sm:gap-x-6 md:grid-cols-5 lg:grid-cols-7">
      {sorted.map((video, i) => (
        <li key={`${video.url}-${i}`} className="relative hover:z-10">
          <Reveal delay={(i % 7) * 0.04}>
            <VideoCard video={video} index={i} />
          </Reveal>
        </li>
      ))}
    </ul>
  )
}

/** Inclinaisons alternées, pour l'effet « photos posées sur la page » (redressées au survol) */
const tilts = ['rotate-[-2deg]', 'rotate-[1.5deg]', 'rotate-[-1deg]', 'rotate-[2deg]', 'rotate-[-1.5deg]', 'rotate-[1deg]']

function VideoCard({ video, index }: { video: ProjectVideo; index: number }) {
  const id = youtubeId(video.url)
  const print = cn(
    'relative block aspect-[4/5] rounded-md bg-white p-1 shadow-[0_14px_30px_-16px_rgb(14_26_51/0.45),0_2px_5px_-2px_rgb(14_26_51/0.12)] ring-1 ring-black/5 transition-[rotate,translate] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:p-1.5 dark:bg-[#1c1f27] dark:ring-white/10',
    tilts[index % tilts.length],
  )
  const title = (
    <span className="mt-3 block text-sm leading-snug font-medium text-fg transition-colors group-hover:text-accent-strong">
      {video.title}
    </span>
  )

  if (!id) {
    return (
      <div>
        <div className={print}>
          <span className="bg-grid flex size-full items-center justify-center rounded-[3px] text-subtle">
            <VideoOff aria-hidden="true" className="size-4" strokeWidth={1.5} />
          </span>
        </div>
        {title}
      </div>
    )
  }

  return (
    <a href={video.url} target="_blank" rel="noopener noreferrer" className="group block rounded-md focus-visible:outline-offset-4">
      <span className={cn(print, 'group-hover:-translate-y-1 group-hover:rotate-0')}>
        <span className="relative block size-full overflow-hidden rounded-[3px] bg-card">
          <img
            src={youtubeThumbnail(id, isYoutubeShort(video.url) ? 'portrait' : 'landscape')}
            alt=""
            loading="lazy"
            decoding="async"
            // Miniature absente (vidéo ancienne ou non traitée) : image de secours
            onError={(e) => {
              const fallback = youtubeThumbnail(id, 'small')
              if (e.currentTarget.src !== fallback) e.currentTarget.src = fallback
            }}
            className="size-full object-cover"
          />
          <span
            aria-hidden="true"
            className="absolute bottom-1.5 left-1.5 grid size-7 place-items-center rounded-full bg-primary text-on-primary shadow-md transition-transform duration-300 group-hover:scale-110"
          >
            <Play className="ml-px size-3 fill-current" />
          </span>
        </span>
      </span>
      {title}
      <span className="sr-only">(regarder sur YouTube, nouvel onglet)</span>
    </a>
  )
}
