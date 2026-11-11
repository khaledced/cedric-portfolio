/** Liens de navigation principaux — utilisés par le header, le menu mobile et le footer */
export const navItems = [
  { to: '/a-propos', label: 'À propos' },
  { to: '/services', label: 'Services' },
  { to: '/projets', label: 'Projets' },
  { to: '/insights', label: 'Insights' },
] as const

export const contactItem = { to: '/contact', label: 'Contact' } as const
