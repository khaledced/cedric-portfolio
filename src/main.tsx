import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Polices auto-hébergées : aucune requête vers Google Fonts, meilleure performance et confidentialité.
import '@fontsource-variable/inter'
import '@fontsource-variable/space-grotesk'
import '@fontsource-variable/jetbrains-mono'
import '@/styles/global.css'

import App from '@/App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
