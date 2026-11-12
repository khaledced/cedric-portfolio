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
 * Suite de vidéos, en grille régulière : la miniature YouTube et un petit titre.
 * Seule la miniature est chargée ; le clic ouvre la vidéo sur YouTube (aucun lecteur intégré au site).
 */
export function VideoGallery({ videos }: VideoGalleryProps) {
  const sorted = sortVideos(videos)

  return (
    <ul className="grid grid-cols-2 gap-x-3 gap-y-7 sm:grid-cols-3 sm:gap-x-5 lg:grid-cols-4">
      {sorted.map((video, i) => (
        <li key={`${video.url}-${i}`}>
          <Reveal delay={(i % 4) * 0.05}>
            <VideoCard video={video} index={i} />
          </Reveal>
        </li>
      ))}
    </ul>
  )
}

/**
 * Aperçu sobre : image recadrée au format 4:5 (moins haute qu'un Short complet), couleurs adoucies
 * qui reviennent au survol, petit bouton lecture en bas à gauche, numéro discret en haut à droite.
 */
function VideoCard({ video, index }: { video: ProjectVideo; index: number }) {
  const id = youtubeId(video.url)
  const number = String(index + 1).padStart(2, '0')
  const frame = 'relative block aspect-[4/5] overflow-hidden rounded-lg border border-line bg-card'
  const title = (
    <span className="mt-3 block text-sm leading-snug font-medium text-fg transition-colors group-hover:text-accent-strong sm:text-[15px]">
      {video.title}
    </span>
  )

  if (!id) {
    return (
      <div>
        <div className={cn(frame, 'bg-grid flex items-center justify-center text-subtle')}>
          <VideoOff aria-hidden="true" className="size-5" strokeWidth={1.5} />
        </div>
        {title}
      </div>
    )
  }

  return (
    <a href={video.url} target="_blank" rel="noopener noreferrer" className="group block rounded-lg focus-visible:outline-offset-4">
      <span className={frame}>
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
          className="size-full object-cover saturate-[0.35] transition-[filter,scale] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:saturate-100 motion-safe:group-hover:scale-[1.03]"
        />
        <span
          aria-hidden="true"
          className="absolute top-2.5 right-2.5 rounded-md bg-page/85 px-1.5 py-0.5 label-mono text-[10px] text-fg backdrop-blur-sm"
        >
          {number}
        </span>
        <span
          aria-hidden="true"
          className="absolute bottom-2.5 left-2.5 grid size-9 place-items-center rounded-full bg-primary text-on-primary shadow-md transition-transform duration-300 group-hover:scale-110"
        >
          <Play className="ml-0.5 size-3.5 fill-current" />
        </span>
      </span>
      {title}
      <span className="sr-only">(regarder sur YouTube, nouvel onglet)</span>
    </a>
  )
}
