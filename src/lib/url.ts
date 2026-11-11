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
