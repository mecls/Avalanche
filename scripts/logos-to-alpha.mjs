/**
 * Normalise client logos for a dark ground.
 *
 * The source marks are flattened rasters with backgrounds baked in — and the
 * backgrounds are not consistent: some are white, some are black. On the old
 * cream palette a `mix-blend-multiply` hid the white ones; on #080808 that
 * blend renders them invisible, and the black-backed ones were already showing
 * as black tiles.
 *
 * So instead of fighting it in CSS, fix the pixels: read each logo, work out
 * whether its background is light or dark from the border pixels, flip it if
 * needed so the mark is always the light part, then use luminance AS the alpha
 * channel over solid white. Result: a white silhouette on transparency, which
 * sits correctly on any ground and anti-aliases cleanly. This is the same flat,
 * monochrome treatment fundraisr.ai gets from `grayscale(1)` on real SVGs.
 *
 * Idempotent — a file that already has an alpha channel is left alone.
 *
 *   node scripts/logos-to-alpha.mjs
 */
import { readdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";

const DIRS = ["public/logos/clients", "public/logos/cases"];
const lum = (r, g, b) => 0.2126 * r + 0.7152 * g + 0.0722 * b;

for (const dir of DIRS) {
  const files = (await readdir(dir)).filter((f) => f.endsWith(".webp"));
  let converted = 0;
  let skipped = 0;

  for (const file of files) {
    const path = join(dir, file);
    const meta = await sharp(path).metadata();
    if (meta.hasAlpha) {
      skipped++;
      continue;
    }

    const { data, info } = await sharp(path)
      .removeAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });
    const { width, height, channels } = info;
    const at = (x, y) => {
      const o = (y * width + x) * channels;
      return lum(data[o], data[o + 1], data[o + 2]);
    };

    // Median border luminance is a far more reliable read of "background"
    // than a single corner — several marks bleed into one corner.
    const border = [];
    for (let x = 0; x < width; x++) {
      border.push(at(x, 0), at(x, height - 1));
    }
    for (let y = 0; y < height; y++) {
      border.push(at(0, y), at(width - 1, y));
    }
    border.sort((a, b) => a - b);
    const bg = border[border.length >> 1];
    const backgroundIsLight = bg > 127;

    // Luminance becomes alpha; RGB becomes pure white.
    //
    // Raw luminance is not good enough on its own: several sources have a
    // near-black rather than pure-black background (luma 10-20), which maps to
    // 4-8% alpha and shows as a faint rectangular halo around the mark. So the
    // range is remapped with a black point and a white point — everything below
    // FLOOR goes fully transparent, everything above CEIL fully opaque, and the
    // band between keeps the anti-aliased edges intact.
    const FLOOR = 26;
    const CEIL = 225;
    const span = CEIL - FLOOR;
    const alpha = Buffer.allocUnsafe(width * height);
    for (let i = 0, p = 0; p < width * height; p++, i += channels) {
      const l = lum(data[i], data[i + 1], data[i + 2]);
      const mark = backgroundIsLight ? 255 - l : l;
      alpha[p] = Math.max(0, Math.min(255, Math.round(((mark - FLOOR) / span) * 255)));
    }

    const out = await sharp({
      create: {
        width,
        height,
        channels: 3,
        background: { r: 255, g: 255, b: 255 },
      },
    })
      .joinChannel(alpha, { raw: { width, height, channels: 1 } })
      .webp({ quality: 90, effort: 6, alphaQuality: 100 })
      .toBuffer();

    await writeFile(path, out);
    converted++;
  }
  console.log(`${dir}: ${converted} converted, ${skipped} already had alpha`);
}
