import { NavLink } from 'react-router'
import { cn } from '@/lib/cn'
import { navItems } from './nav-items'

/**
 * Navigation ordinateur. La page active est signalée par le point bleu,
 * motif repris du point du « i » dans le logo.
 */
export function DesktopNav() {
  return (
    <nav aria-label="Navigation principale" className="hidden md:block">
      <ul className="flex items-center gap-1">
        {navItems.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'group relative flex flex-col items-center px-3 py-2 label-mono text-xs transition-colors duration-200',
                  isActive ? 'text-fg' : 'text-muted hover:text-fg',
                )
              }
            >
              {({ isActive }) => (
                <>
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={cn(
                      'absolute -bottom-0.5 size-1 rounded-full bg-accent transition-all duration-300',
                      isActive ? 'scale-100 opacity-100' : 'scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-50',
                    )}
                  />
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
