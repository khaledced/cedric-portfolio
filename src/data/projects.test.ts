import { describe, expect, it } from 'vitest'
import { MAX_FEATURED, projects } from './projects'

describe('projets à la une', () => {
  it(`ne dépassent pas ${MAX_FEATURED}`, () => {
    const featured = projects.filter((p) => p.featured)
    const list = featured.map((p, i) => `  ${i + 1}. ${p.name} (${p.slug})`).join('\n')
    expect(
      featured.length,
      `${featured.length} projets à la une pour ${MAX_FEATURED} places. Retire \`featured: true\` d'un de ces projets dans src/data/projects.ts (il restera sur la page Projets) :\n${list}`,
    ).toBeLessThanOrEqual(MAX_FEATURED)
  })
})
