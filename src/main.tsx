import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'

// Polices auto-hébergées : aucune requête vers Google Fonts, meilleure performance et confidentialité.
import '@fontsource-variable/geist'
import '@fontsource-variable/archivo'
import '@fontsource-variable/jetbrains-mono'
import '@/styles/global.css'

import App from '@/App'

const container = document.getElementById('root')!
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

/*
  Le HTML pré-rendu indique pour quelle adresse il a été généré (data-path, « * » pour la 404).
  On ne le réutilise que s'il correspond à l'adresse affichée : sinon (hébergeur qui servirait
  la page d'accueil pour une adresse inconnue, par exemple), on reconstruit proprement.
*/
const prerenderedPath = container.dataset.path
const path = window.location.pathname.replace(/(.)\/$/, '$1')
const canHydrate = container.hasChildNodes() && (prerenderedPath === '*' || prerenderedPath === path)

// Les balises <title>/<meta> pré-rendues sont retirées : React les recrée lui-même (pas de doublons)
document.head.querySelectorAll('[data-prerender]').forEach((el) => el.remove())

if (canHydrate) {
  // Page pré-rendue : React « réhydrate » le HTML existant au lieu de tout reconstruire
  hydrateRoot(container, app)
} else {
  // Développement (npm run dev) ou HTML ne correspondant pas à l'adresse : rendu classique
  container.replaceChildren()
  createRoot(container).render(app)
}
