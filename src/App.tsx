import { createBrowserRouter, RouterProvider } from 'react-router'
import { AppProviders } from '@/components/layout/AppProviders'
import { routes } from '@/routes'

/*
  Si la page a été pré-rendue au build, React Router récupère automatiquement
  l'état du rendu serveur (window.__staticRouterHydrationData) pour démarrer sans recalcul.
*/
const router = createBrowserRouter(routes)

export default function App() {
  return (
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  )
}
