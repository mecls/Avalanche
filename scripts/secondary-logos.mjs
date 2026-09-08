/**
 * The "Direct access" marks at the foot of /solutions/secondaries.
 *
 *   node scripts/secondary-logos.mjs
 *
 * Reads the supplied originals from `docs/assets/secondary-logos/` and writes
 * white-on-transparent WebP to `public/logos/secondaries/`, sized for the
 * ruled grid the section draws them in.
 *
 * **WHY THIS IS NOT `logos-to-alpha.mjs`.** That script normalises the client
 * and case marks, which arrived as FLATTENED rasters with a background baked
 * in - its whole job is working out whether that background is light or dark
 * and using luminance as alpha. It skips any file that already has an alpha
 * channel, which is right there and wrong here: most of these nine arrived as
 * BLACK ON TRANSPARENT, so the shape is already in the alpha channel and the
 * pixels underneath are the wrong colour for a dark plate. Run that script
 * over them and it would skip every one, leaving black marks invisible on the
 * section's dark band.
 *
 * So this one branches on what it is given:
 *
 *  - **Alpha carries the shape** (SVG, or a PNG/WebP with real transparency):
 *    keep the alpha exactly and repaint the RGB white. Colour is discarded on
 *    purpose - these sit in a monochrome grid beside the client roster, which
 *    has been white-on-transparent since the palette went dark.
 *  - **Opaque source**: fall back to the other script's reading - median
 *    border luminance decides which way round the mark is, then luminance
 *    becomes alpha through the same FLOOR/CEIL remap, which is what stops a
 *    near-black background showing as a faint rectangular halo.
 *
 * THE THRESHOLD BETWEEN THE TWO IS 2% OF PIXELS. A JPEG-ish source with a
 * couple of stray semi-transparent pixels must not be read as an alpha mark,
 * and a real cut-out always has far more edge than that.
 *
 * SVGs are rasterised at density 384 rather than scaled up from a default
 * 72dpi render - sharp rasterises first and resizes second, so the density is
 * what sets the real resolution.
 *
 * **The masters are committed.** They came from a shared Drive folder that
 * will not survive a tidy-up, they are small (23KB for all nine), and three of
 * them arrived with hash filenames carrying no company name - so the file in
 * this repo is the only record of which supplied asset became which mark.
 * See the note in content/secondary-logos.ts about those three.
 */
import { mkdirSync, readdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const SRC_DIR = path.join(process.cwd(), "docs", "assets", "secondary-logos");
const OUT_DIR = path.join(process.cwd(), "public", "logos", "secondaries");

/** Long edge of the written mark. The grid draws it at 96px wide, so this
 *  clears 2x DPR with room and still keeps every file a few KB. */
const BOX = 320;
/** Below this share of soft pixels the source is treated as opaque. */
const ALPHA_SHARE = 0.02;
/** Same remap as logos-to-alpha.mjs, and for the same reason. */
const FLOOR = 26;
const CEIL = 225;

const lum = (r, g, b) => 0.2126 * r + 0.7152 * g + 0.0722 * b;
const slug = (file) =>
  path
    .basename(file, path.extname(file))
    .replace(/^logo-/, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();

mkdirSync(OUT_DIR, { recursive: true });

const files = readdirSync(SRC_DIR).filter((f) => /\.(png|jpe?g|webp|svg)$/i.test(f));
const written = [];

for (const file of files.sort()) {
  const { data, info } = await sharp(path.join(SRC_DIR, file), { density: 384 })
    .resize(BOX, BOX, { fit: "inside", withoutEnlargement: false })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height } = info;
  const n = width * height;
  const alpha = new Uint8Array(n);

  let soft = 0;
  for (let p = 0; p < n; p++) if (data[p * 4 + 3] < 250) soft++;

  if (soft / n > ALPHA_SHARE) {
    for (let p = 0; p < n; p++) alpha[p] = data[p * 4 + 3];
  } else {
    const at = (x, y) => {
      const o = (y * width + x) * 4;
      return lum(data[o], data[o + 1], data[o + 2]);
    };
    const border = [];
    for (let x = 0; x < width; x++) border.push(at(x, 0), at(x, height - 1));
    for (let y = 0; y < height; y++) border.push(at(0, y), at(width - 1, y));
    border.sort((a, b) => a - b);
    const backgroundIsLight = border[border.length >> 1] > 127;

    for (let p = 0; p < n; p++) {
      const o = p * 4;
      const l = lum(data[o], data[o + 1], data[o + 2]);
      const mark = backgroundIsLight ? 255 - l : l;
      alpha[p] = Math.max(
        0,
        Math.min(255, Math.round(((mark - FLOOR) / (CEIL - FLOOR)) * 255)),
      );
    }
  }

  const out = Buffer.alloc(n * 4, 255);
  for (let p = 0; p < n; p++) out[p * 4 + 3] = alpha[p];

  const name = `${slug(file)}.webp`;
  const res = await sharp(out, { raw: { width, height, channels: 4 } })
    .trim({ threshold: 1 })
    .webp({ quality: 90, alphaQuality: 100 })
    .toFile(path.join(OUT_DIR, name));

  written.push(`/logos/secondaries/${name}`);
  console.log(
    `${file.padEnd(38)} -> ${name.padEnd(28)} ${res.width}x${res.height}, ` +
      `${(res.size / 1024).toFixed(1)}KB, ${soft / n > ALPHA_SHARE ? "alpha" : "luma"}`,
  );
}

writeFileSync(
  path.join(process.cwd(), "content", "secondary-logos.ts"),
  `/**\n` +
    ` * GENERATED by scripts/secondary-logos.mjs - do not edit by hand.\n` +
    ` *\n` +
    ` * The marks in the "Direct access" band at the foot of\n` +
    ` * /solutions/secondaries. White-on-transparent, so they carry \`logo-mark\`\n` +
    ` * at the call site and survive a light band the way the client roster does.\n` +
    ` *\n` +
    ` * **THREE OF THESE ARE NAMED FOR THE FILE THEY ARRIVED AS, not for a\n` +
    ` * company.** \`4un8cuhsizzbjhizk1guxg\`, \`6x5fvvef17kxyxztakoerz\` and\n` +
    ` * \`gtck8vd6paoisp1w85sma\` were supplied with hash filenames and no\n` +
    ` * captions, and a mark is a claim about who we have access to - so they are\n` +
    ` * NOT guessed at. Rename the master in docs/assets/secondary-logos/ and\n` +
    ` * re-run the script once the companies are confirmed. Nothing renders a\n` +
    ` * name: the grid sets \`alt=""\`, so an unnamed file states nothing it\n` +
    ` * cannot support.\n` +
    ` */\n\n` +
    `export const secondaryLogos: readonly string[] = ${JSON.stringify(written.sort(), null, 2)};\n`,
);
console.log(`\ncontent/secondary-logos.ts written (${written.length} marks)`);
