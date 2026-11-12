/** Affiche une adresse lisible : « linkedin.com/in/nom » plutôt que l'URL complète */
export function prettyUrl(url: string): string {
  try {
    const { hostname, pathname } = new URL(url)
    // Accents décodés (« cédric » plutôt que « c%C3%A9dric »)
    let path = decodeURIComponent(pathname).replace(/\/$/, '')
    // Chemins techniques sans intérêt pour le lecteur (ex. facebook.com/profile.php?id=…)
    if (/\.php$/.test(path)) path = ''
    return `${hostname.replace(/^www\./, '')}${path}`
  } catch {
    return url
  }
}

/**
 * Extrait l'identifiant d'une vidéo YouTube depuis son lien
 * (youtube.com/watch?v=…, youtu.be/…, youtube.com/shorts/…, /embed/…, /live/…).
 * Renvoie undefined si le lien n'est pas une vidéo YouTube.
 */
export function youtubeId(url: string): string | undefined {
  try {
    const { hostname, pathname, searchParams } = new URL(url)
    const host = hostname.replace(/^(www|m|music)\./, '')
    let id: string | null | undefined
    if (host === 'youtu.be') id = pathname.split('/')[1]
    else if (host === 'youtube.com' || host === 'youtube-nocookie.com') {
      const [, kind, value] = pathname.split('/')
      id = kind === 'watch' ? searchParams.get('v') : ['shorts', 'embed', 'live'].includes(kind) ? value : undefined
    }
    return id && /^[\w-]{11}$/.test(id) ? id : undefined
  } catch {
    return undefined
  }
}

/** true si le lien pointe vers un YouTube Short (vidéo verticale) */
export function isYoutubeShort(url: string): boolean {
  try {
    return new URL(url).pathname.startsWith('/shorts/')
  } catch {
    return false
  }
}

/**
 * Miniature d'une vidéo YouTube, hébergée par YouTube (rien n'est stocké sur le site).
 * - 'landscape' : image 16:9 (1280 × 720)
 * - 'portrait'  : image verticale 9:16 (1080 × 1920), disponible pour les Shorts
 * - 'small'     : image 4:3 de secours (480 × 360), toujours disponible
 */
export function youtubeThumbnail(id: string, format: 'landscape' | 'portrait' | 'small' = 'landscape'): string {
  const name = { landscape: 'maxresdefault', portrait: 'oardefault', small: 'hqdefault' }[format]
  return `https://i.ytimg.com/vi/${id}/${name}.jpg`
}
