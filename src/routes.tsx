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
const AboutPage = lazy(() => import('@/pages/AboutPage'))
const ServicesPage = lazy(() => import('@/pages/ServicesPage'))
const ProjectsPage = lazy(() => import('@/pages/ProjectsPage'))
const ProjectDetailPage = lazy(() => import('@/pages/ProjectDetailPage'))
const InsightsPage = lazy(() => import('@/pages/InsightsPage'))
const ArticlePage = lazy(() => import('@/pages/ArticlePage'))
const ContactPage = lazy(() => import('@/pages/ContactPage'))

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
