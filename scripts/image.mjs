/**
 * Optimise une image pour le site : recadrage optionnel, redimensionnement, conversion WebP.
 * Les métadonnées (position GPS, appareil…) sont supprimées.
 *
 * Usage :
 *   npm run image -- <source> <destination-sans-extension> [--crop x,y,largeur,hauteur] [--widths 600,1000]
 *
 * Exemple :
 *   npm run image -- image/photo.jpg public/images/projects/mon-projet/cover --widths 800,1600
 *   → public/images/projects/mon-projet/cover-800.webp et cover-1600.webp
 */
import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const [input, outputBase, ...rest] = process.argv.slice(2)
if (!input || !outputBase) {
  console.error('Usage : npm run image -- <source> <destination-sans-extension> [--crop x,y,l,h] [--widths 600,1000]')
  process.exit(1)
}

const option = (name) => {
  const i = rest.indexOf(`--${name}`)
  return i >= 0 ? rest[i + 1] : undefined
}
const crop = option('crop')?.split(',').map(Number)
const widths = (option('widths') ?? '1200').split(',').map(Number)

await mkdir(path.dirname(outputBase), { recursive: true })

for (const width of widths) {
  // .rotate() applique l'orientation EXIF (photos de téléphone) avant le recadrage
  let pipeline = sharp(input).rotate()
  if (crop) {
    const [left, top, w, h] = crop
    pipeline = pipeline.extract({ left, top, width: w, height: h })
  }
  const file = `${outputBase}-${width}.webp`
  const info = await pipeline
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 82, effort: 6 })
    .toFile(file)
  console.log(`  ✓ ${file} — ${info.width}×${info.height}, ${Math.round(info.size / 1024)} Ko`)
}
