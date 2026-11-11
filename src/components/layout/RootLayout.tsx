import { Suspense, useCallback, useState } from 'react'
import { Outlet, ScrollRestoration } from 'react-router'
import { useHashScroll } from '@/hooks/useHashScroll'
import { Footer } from './Footer'
import { Header } from './Header'

/** Gabarit commun à toutes les pages : header fixe, contenu, footer. */
export function RootLayout() {
  const [menuOpen, setMenuOpen] = useState(false)
  useHashScroll()
  const closeMenu = useCallback(() => setMenuOpen(false), [])
  const toggleMenu = useCallback(() => setMenuOpen((o) => !o), [])

  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-on-primary"
      >
        Aller au contenu
      </a>

      <Header menuOpen={menuOpen} onToggleMenu={toggleMenu} onCloseMenu={closeMenu} />

      {/* Quand le menu mobile est ouvert, le reste de la page devient inerte (ni clic, ni focus clavier) */}
      <main id="contenu" className="flex-1" inert={menuOpen}>
        <Suspense fallback={<div className="min-h-dvh" aria-busy="true" />}>
          <Outlet />
        </Suspense>
      </main>

      <div inert={menuOpen}>
        <Footer />
      </div>

      {/*
        Mémorise la position de défilement de chaque entrée de l'historique (bouton retour).
        Au chargement complet d'une page, React Router utilise toujours la clé « default » :
        on la remplace par l'adresse de la page, pour qu'un rechargement garde la position
        mais qu'une autre adresse ouverte dans le même onglet s'affiche bien en haut.
      */}
      <ScrollRestoration getKey={(location) => (location.key === 'default' ? location.pathname : location.key)} />
    </div>
  )
}
