/**
 * Thème clair / sombre.
 * Le thème clair (couleurs du logo) est celui par défaut ; le choix du visiteur est mémorisé.
 * Un petit script dans index.html applique le thème mémorisé AVANT l'affichage de la page
 * (sinon elle s'afficherait un instant en clair avant de basculer en sombre).
 */
export type Theme = 'light' | 'dark'

export const THEME_STORAGE_KEY = 'theme'

/** Couleur de la barre du navigateur mobile, selon le thème */
const THEME_COLORS: Record<Theme, string> = { light: '#ffffff', dark: '#080808' }

export function getTheme(): Theme {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
}

export function setTheme(theme: Theme): void {
  const root = document.documentElement
  if (theme === 'dark') root.dataset.theme = 'dark'
  else delete root.dataset.theme
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLORS[theme])
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  } catch {
    // Stockage indisponible (navigation privée stricte) : le choix vaut pour cette visite seulement
  }
}
