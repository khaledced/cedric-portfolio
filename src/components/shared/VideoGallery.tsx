import { ArrowUpRight, Play, VideoOff } from 'lucide-react'
import { Reveal } from '@/components/shared/Reveal'
import { cn } from '@/lib/cn'
import { isYoutubeShort, youtubeId, youtubeThumbnail } from '@/lib/url'

export interface ProjectVideo {
  /** Titre affiché sous l'aperçu */
  title: string
  /** Lien YouTube de la vidéo (youtube.com/watch?v=…, youtu.be/…, youtube.com/shorts/…) */
  url: string
  /** Courte description (optionnel) */
  description?: string
  /** Vidéo à la une : affichée en premier, en plus grand, et utilisée comme aperçu du projet */
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
 * Suite de vidéos : seule la miniature YouTube est chargée,
 * le clic ouvre la vidéo sur YouTube. Aucun lecteur n'est intégré au site.
 * Les Shorts (vidéos verticales) s'affichent en format vertical.
 */
export function VideoGallery({ videos }: VideoGalleryProps) {
  const sorted = sortVideos(videos)
  const vertical = sorted.every((v) => isYoutubeShort(v.url))
  const hasFeatured = sorted.some((v) => v.featured)

  return (
    <ul
      className={cn(
        'grid gap-x-4 gap-y-8 sm:gap-x-6',
        vertical
          ? cn(
              'max-w-4xl grid-cols-2 sm:grid-cols-3 sm:items-end',
              hasFeatured && 'lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)_minmax(0,1fr)]',
            )
          : 'sm:grid-cols-2 lg:grid-cols-3',
      )}
    >
      {sorted.map((video, i) => (
        <li
          key={`${video.url}-${i}`}
          className={cn(vertical && video.featured && 'col-span-2 mx-auto w-2/3 sm:col-span-1 sm:mx-0 sm:w-auto')}
        >
          <Reveal delay={(i % 3) * 0.06}>
            <VideoCard video={video} />
          </Reveal>
        </li>
      ))}
    </ul>
  )
}

function VideoCard({ video }: { video: ProjectVideo }) {
  const id = youtubeId(video.url)
  const vertical = isYoutubeShort(video.url)
  const frame = cn(
    'relative block overflow-hidden rounded-2xl border border-line bg-card',
    vertical ? 'aspect-[9/16]' : 'aspect-video',
  )

  const caption = (
    <span className="mt-4 block">
      <span
        className={cn(
          'flex items-start justify-between gap-3 font-display leading-snug font-bold tracking-tight transition-colors group-hover:text-accent-strong',
          video.featured ? 'text-lg sm:text-xl' : 'text-base sm:text-lg',
        )}
      >
        {video.title}
        {id && (
          <ArrowUpRight
            aria-hidden="true"
            className="mt-1 size-4 shrink-0 text-subtle transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
          />
        )}
      </span>
      {video.description && <span className="mt-1.5 block text-sm leading-relaxed text-muted">{video.description}</span>}
    </span>
  )

  if (!id) {
    return (
      <div>
        <div className={cn(frame, 'bg-grid flex flex-col items-center justify-center gap-3 text-subtle')}>
          <VideoOff aria-hidden="true" className="size-6" strokeWidth={1.5} />
          <span className="label-mono text-[11px]">Vidéo à venir</span>
        </div>
        {caption}
      </div>
    )
  }

  return (
    <a
      href={video.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-2xl focus-visible:outline-offset-4"
    >
      <span className={frame}>
        <img
          src={youtubeThumbnail(id, vertical ? 'portrait' : 'small')}
          alt=""
          loading="lazy"
          decoding="async"
          // Miniature verticale absente (vidéo ancienne ou non traitée) : image de secours
          onError={(e) => {
            const fallback = youtubeThumbnail(id, 'small')
            if (e.currentTarget.src !== fallback) e.currentTarget.src = fallback
          }}
          className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-black/10 transition-colors group-hover:bg-black/15"
        />
        <span
          aria-hidden="true"
          className={cn(
            'absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-black shadow-lg transition-transform duration-300 group-hover:scale-110',
            video.featured ? 'size-16' : 'size-12 sm:size-14',
          )}
        >
          <Play className={cn('ml-0.5 fill-current', video.featured ? 'size-7' : 'size-5 sm:size-6')} />
        </span>
        {video.featured && (
          <span className="absolute top-3 left-3 rounded-full bg-accent px-2.5 py-1 label-mono text-[10px] text-white shadow">
            À la une
          </span>
        )}
        <span className="absolute bottom-3 left-3 rounded-md bg-black/70 px-2 py-1 label-mono text-[10px] text-white">
          {vertical ? 'YouTube Shorts' : 'YouTube'}
        </span>
      </span>
      {caption}
      <span className="sr-only">(regarder sur YouTube, nouvel onglet)</span>
    </a>
  )
}
