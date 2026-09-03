// One-off: pull the venture-firm marks that fundraisr.ai runs across the foot
// of its customers hero, and re-encode them as WebP sized for the band.
//
// These are NOT the client logos. They are dark/colour marks meant for a light
// ground, so they are deliberately left untouched by scripts/logos-to-alpha.mjs
// and must never carry the `logo-mark` class — inverting them would blow them
// out to white on a white band. See content/ecosystem-logos.ts.
import { mkdir, writeFile } from 'node:fs/promises'
import sharp from 'sharp'

const OUT = 'public/logos/ecosystem'
const MAX_W = 320

// Named after the source file, not after the firm. Three of the stems say
// which mark they are; the `top*` ones do not, and the strip renders them
// decoratively (alt=""), so nothing here asserts a name it cannot verify.
const SOURCES = [
  ['tiger-global', 'https://www.fundraisr.ai/vc/tiger-global-vc.png'],
  ['sequoia', 'https://www.fundraisr.ai/vc/Sequoia_Capital_idAnQz_1rW_0.svg'],
  ['legend-capital', 'https://www.fundraisr.ai/vc/Legend-capital.png'],
  ['top4', 'https://www.fundraisr.ai/vc/top4-vc.avif'],
  ['top5', 'https://www.fundraisr.ai/vc/top5-vc.avif'],
  ['lightspeed', 'https://www.fundraisr.ai/vc/lightspeed-vc.svg'],
  ['top7', 'https://www.fundraisr.ai/vc/top7-vc.avif'],
  ['top8', 'https://www.fundraisr.ai/vc/top8-vc.avif'],
  ['top9', 'https://www.fundraisr.ai/vc/top9-vc.avif'],
  ['dragoneer', 'https://www.fundraisr.ai/vc/dragoneer-vc.png'],
]

// `Sec-Fetch-Dest: image` is load-bearing. Without it the host answers the
// .avif paths with its SPA shell at HTTP 200, and sharp then reports an
// unsupported format for what is actually a page of HTML.
const HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
  Accept: 'image/avif,image/webp,*/*',
  Referer: 'https://www.fundraisr.ai/customers',
  'Sec-Fetch-Dest': 'image',
  'Sec-Fetch-Mode': 'no-cors',
  'Sec-Fetch-Site': 'same-origin',
}

await mkdir(OUT, { recursive: true })

for (const [name, url] of SOURCES) {
  const res = await fetch(url, { headers: HEADERS })
  const type = res.headers.get('content-type') ?? ''
  if (!res.ok || !type.startsWith('image/')) {
    console.log(`  SKIP ${name}: ${res.status} ${type}`)
    continue
  }
  let raw = Buffer.from(await res.arrayBuffer())

  // One of these is an Illustrator export carrying `xmlns:x="ns_extend;"` and
  // an <sfw> metadata block on `xmlns="ns_sfw;"`. Those are not absolute URIs,
  // so librsvg rejects the whole file. Strip the non-absolute namespaces and
  // the metadata block — nothing renders from either.
  if (type.includes('svg')) {
    raw = Buffer.from(
      raw
        .toString('utf8')
        .replace(/<metadata>[\s\S]*?<\/metadata>/gi, '')
        .replace(/\s+xmlns:[\w-]+\s*=\s*"(?!https?:)[^"]*"/g, ''),
      'utf8',
    )
  }

  try {
    // density lifts SVG rasterisation to a usable size before the resize below
    const out = await sharp(raw, { density: 300 })
      .resize({ width: MAX_W, withoutEnlargement: true })
      .webp({ quality: 92, effort: 6 })
      .toBuffer()

    await writeFile(`${OUT}/${name}.webp`, out)
    console.log(`  ${name}.webp  ${(out.length / 1024).toFixed(1)}KB`)
  } catch (err) {
    console.log(`  SKIP ${name}: ${err.message.split('\n')[0]}`)
  }
}
