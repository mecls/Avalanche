// One-off: the logos pulled from fundraisr.ai are SVG wrappers around base64 rasters
// (two were ~2MB each). Extract the payload and re-encode as WebP sized for the band.
import { readdir, readFile, writeFile, unlink } from 'node:fs/promises'
import { join } from 'node:path'
import sharp from 'sharp'

const DIRS = ['public/logos/clients', 'public/logos/cases']
const MAX_W = 320

for (const dir of DIRS) {
  const files = (await readdir(dir)).filter((f) => f.endsWith('.svg'))
  let saved = 0
  for (const file of files) {
    const path = join(dir, file)
    const svg = await readFile(path, 'utf8')
    const m = svg.match(/data:image\/(png|jpe?g|webp|gif);base64,([A-Za-z0-9+/=\s]+)/)
    if (!m) {
      console.log(`  keep (true vector): ${file}`)
      continue
    }
    const before = Buffer.byteLength(svg)
    const raw = Buffer.from(m[2].replace(/\s/g, ''), 'base64')
    const out = await sharp(raw)
      .resize({ width: MAX_W, withoutEnlargement: true })
      .webp({ quality: 90, effort: 6 })
      .toBuffer()
    await writeFile(path.replace(/\.svg$/, '.webp'), out)
    await unlink(path)
    saved += before - out.length
  }
  console.log(`${dir}: ${files.length} files, saved ${(saved / 1e6).toFixed(1)}MB`)
}
