/* oxlint-disable react/only-export-components -- Fichier de configuration des routes : les pages chargées à la demande (lazy) y sont déclarées. Sans effet sur le site ; seul le rechargement à chaud de CE fichier est complet en développement. */
import { lazy } from 'react'
import type { RouteObject } from 'react-router'
import { RootLayout } from '@/components/layout/RootLayout'
import ErrorPage from '@/pages/ErrorPage'
import HomePage from '@/pages/HomePage'
import NotFoundPage from '@/pages/NotFoundPage'

/*
  Routes du site, partagées entre le navigateur (App.tsx) et le pré-rendu (entry-server.tsx).

  Les pages secondaires sont chargées à la demande (« code splitting ») :
  le visiteur ne télécharge que le code de la page qu'il consulte.
*/
const pages = {
  about: () => import('@/pages/AboutPage'),
  services: () => import('@/pages/ServicesPage'),
  projects: () => import('@/pages/ProjectsPage'),
  project: () => import('@/pages/ProjectDetailPage'),
  insights: () => import('@/pages/InsightsPage'),
  article: () => import('@/pages/ArticlePage'),
  contact: () => import('@/pages/ContactPage'),
}

const AboutPage = lazy(pages.about)
const ServicesPage = lazy(pages.services)
const ProjectsPage = lazy(pages.projects)
const ProjectDetailPage = lazy(pages.project)
const InsightsPage = lazy(pages.insights)
const ArticlePage = lazy(pages.article)
const ContactPage = lazy(pages.contact)

/**
 * Précharge le code de toutes les pages, en arrière-plan, une fois la page affichée et le
 * navigateur au repos : la navigation devient instantanée (aucun écran vide au clic).
 * Désactivé si le visiteur a activé l'économie de données.
 */
export function prefetchPages() {
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
  if (connection?.saveData) return
  const run = () => Object.values(pages).forEach((load) => void load().catch(() => {}))
  if ('requestIdleCallback' in window) window.requestIdleCallback(run, { timeout: 4000 })
  else setTimeout(run, 2500)
}

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'a-propos', element: <AboutPage /> },
      { path: 'services', element: <ServicesPage /> },
      { path: 'projets', element: <ProjectsPage /> },
      { path: 'projets/:slug', element: <ProjectDetailPage /> },
      { path: 'insights', element: <InsightsPage /> },
      { path: 'insights/:slug', element: <ArticlePage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]
