/**
 * Generates public/grain.png — the hero's noise tile.
 *
 *   node scripts/make-grain.mjs
 *
 * The reference's own texture is not extractable, so this is a substitute
 * built to the same brief: 720px, seamlessly tileable, monochrome, and weak
 * enough to read as film grain rather than as dirt.
 *
 * Why it exists at all: the hero scrim is a single gradient running 0.44 to
 * 0.60 over the full height of the viewport. On a wide screen that is a very
 * long ramp across very few distinct 8-bit values, which is the textbook case
 * for visible banding. The grain dithers it. It is also what lets the scrim
 * stay this light without the footage looking digital.
 *
 * TILEABILITY is the whole trick, and it is why this is not just random
 * noise: the alpha is generated per-pixel independently, which is inherently
 * seamless — no filtering, no gradients, nothing that could disagree across
 * the seam. Do not add a blur here; a blurred field is NOT tileable and the
 * repeat would show as a visible grid.
 */
import { mkdirSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

/**
 * 256, not the reference's 720. The tile is repeated either way, and grain
 * MUST render at 1:1 — scaling it via background-size blurs it into mush —
 * so the only thing the tile size changes is the file. Per-pixel random alpha
 * is close to incompressible: 720px lands at 387KB, 256px at 30KB, and on
 * structureless noise the shorter repeat is not visible.
 *
 * Keep background-size in hero.tsx in step with this number.
 */
const SIZE = 256;

/** Peak alpha. 3-5% is the brief; 5% dithers the ramp without reading as
 *  texture on a flat band. Above ~8% it starts to look like noise on purpose. */
const INTENSITY = 0.05;

/** Quantising alpha to a few steps is what makes the PNG palette-compressible.
 *  At 4 levels the dither still works and the file is ~8x smaller than at 256. */
const LEVELS = 4;

const OUT = path.join(process.cwd(), "public");
mkdirSync(OUT, { recursive: true });

// RGBA, monochrome: the colour is a mid grey and only the ALPHA varies, so
// the tile darkens and lightens whatever is under it symmetrically rather
// than tinting it.
const px = Buffer.alloc(SIZE * SIZE * 4);
for (let i = 0; i < SIZE * SIZE; i++) {
  const v = Math.random();
  const o = i * 4;
  // Mid grey either side of the scrim's value, so grain adds and subtracts.
  const tone = v < 0.5 ? 0 : 255;
  px[o] = tone;
  px[o + 1] = tone;
  px[o + 2] = tone;
  px[o + 3] = Math.round((Math.round(Math.random() * LEVELS) / LEVELS) * INTENSITY * 255);
}

const file = path.join(OUT, "grain.png");
await sharp(px, { raw: { width: SIZE, height: SIZE, channels: 4 } })
  .png({ compressionLevel: 9, palette: true })
  .toFile(file);

const { size } = await import("node:fs").then((fs) => fs.statSync(file));
console.log(`grain.png  ${SIZE}x${SIZE}  ${(size / 1024).toFixed(0)}KB`);
