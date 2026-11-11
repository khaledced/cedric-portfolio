import { Suspense } from 'react'
import { Link, NavLink, Outlet, ScrollRestoration } from 'react-router'
import { siteConfig } from '@/config/site'

const CURRENT_YEAR = new Date().getFullYear()

const navItems = [
  { to: '/a-propos', label: 'À propos' },
  { to: '/services', label: 'Services' },
  { to: '/projets', label: 'Projets' },
  { to: '/insights', label: 'Insights' },
  { to: '/contact', label: 'Contact' },
]

/**
 * Gabarit commun à toutes les pages.
 * Version minimale de la Phase 2 : le vrai header (logo, menu mobile, animations)
 * sera construit en Phase 3.
 */
export function RootLayout() {
  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-brand-500 focus:px-4 focus:py-2 focus:text-white"
      >
        Aller au contenu
      </a>

      <header className="border-b border-line">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <Link to="/" className="flex items-center gap-3 font-display font-medium">
            <img src="/logo/iconelogo.png" alt="" width={28} height={28} className="size-7" />
            {siteConfig.name}
          </Link>
          <nav aria-label="Navigation principale">
            <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
              {navItems.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      isActive ? 'text-fg' : 'text-muted transition-colors hover:text-fg'
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <main id="contenu" className="flex-1">
        <Suspense fallback={<div className="min-h-[50vh]" aria-busy="true" />}>
          <Outlet />
        </Suspense>
      </main>

      <footer className="border-t border-line">
        <p className="mx-auto max-w-6xl px-4 py-8 text-sm text-subtle sm:px-6">
          © {CURRENT_YEAR} {siteConfig.name}
        </p>
      </footer>

      <ScrollRestoration />
    </div>
  )
}
