const dateFormatter = new Intl.DateTimeFormat('fr-FR', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  // Les dates « AAAA-MM-JJ » sont interprétées en UTC : on reste en UTC pour éviter un décalage d'un jour
  timeZone: 'UTC',
})

/** « 2026-11-11 » → « 11 novembre 2026 » */
export function formatDate(isoDate: string): string {
  const date = new Date(isoDate)
  return Number.isNaN(date.getTime()) ? isoDate : dateFormatter.format(date)
}

/** Supprime accents et majuscules, pour une recherche tolérante (« reseau » trouve « Réseau ») */
export function normalize(text: string): string {
  return text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
}
