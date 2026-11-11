import { lazy } from 'react'
import { domAnimation, LazyMotion, MotionConfig } from 'motion/react'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { RootLayout } from '@/components/layout/RootLayout'
import ErrorPage from '@/pages/ErrorPage'
import HomePage from '@/pages/HomePage'
import NotFoundPage from '@/pages/NotFoundPage'

/*
  Les pages secondaires sont chargées à la demande (« code splitting ») :
  le visiteur ne télécharge que le code de la page qu'il consulte.
  L'accueil reste chargé directement pour un premier affichage le plus rapide possible.
*/
const AboutPage = lazy(() => import('@/pages/AboutPage'))
const ServicesPage = lazy(() => import('@/pages/ServicesPage'))
const ProjectsPage = lazy(() => import('@/pages/ProjectsPage'))
const ProjectDetailPage = lazy(() => import('@/pages/ProjectDetailPage'))
const InsightsPage = lazy(() => import('@/pages/InsightsPage'))
const ArticlePage = lazy(() => import('@/pages/ArticlePage'))
const ContactPage = lazy(() => import('@/pages/ContactPage'))

const router = createBrowserRouter([
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
])

export default function App() {
  return (
    /*
      LazyMotion + `m` : on ne charge que les fonctions d'animation utilisées (~15 ko au lieu de ~35 ko).
      reducedMotion="user" : si le visiteur a activé « réduire les animations » sur son appareil,
      les déplacements sont supprimés et seuls les fondus sont conservés.
    */
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <RouterProvider router={router} />
      </MotionConfig>
    </LazyMotion>
  )
}
