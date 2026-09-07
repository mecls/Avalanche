/**
 * Team photograph pipeline.
 *
 *   node scripts/optimize-team-photos.mjs
 *
 * Crops each master in `docs/assets/team/` to a 4:5 portrait, desaturates it
 * and writes `public/team/<slug>.webp`.
 *
 * **THE MASTERS LIVE IN THE REPO, and that is a change from how the other
 * asset scripts work.** `optimize-bg-video.mjs` reads its sources out of
 * ~/Downloads, which is fine for a 100MB video that can be re-downloaded.
 * Four of these five are GENERATIVE OUTPUTS — one-shot, non-deterministic, and
 * gone for good if that folder is ever cleaned. So they are committed:
 * `docs/assets/team/<slug>.webp`, named for the person rather than by whatever
 * the tool that made them called the file.
 *
 * PROVENANCE, because "which of these is a photograph" is a question someone
 * will ask:
 *
 *  - `tatjana-sotirovik` is the ORIGINAL PHOTOGRAPH, supplied 7 Sep 2026 as a
 *    Framer CDN export (`MNFHVuUOKaLTisNOGASHYgH6q6E.webp`, 800x800). It is
 *    the only untouched one, and it is the reference the other four were
 *    matched to — plain light-grey studio backdrop, greyscale, head and
 *    shoulders.
 *  - `bernardo-almeida`, `lev-valestkiy`, `bruno-erckmam` and `lucas-barrozo`
 *    are GENERATIVE RE-SHOOTS produced outside this repo (ChatGPT, 7 Sep 2026,
 *    1254x1254) from the original photographs, which were five different
 *    shoots — a beach, a sponsor wall, an office, a curtain — and never read
 *    as a set. The originals are in the git history of this directory.
 *
 * **BERNARDO AND BRUNO WERE RE-GENERATED A SECOND TIME**, later the same day,
 * and the reason is worth keeping: the first pass matched the BACKDROP across
 * the set but not the DRESS. Bernardo came back in a white shirt with a chain
 * and sunglasses, Bruno in a dark open-collar shirt at a three-quarter turn —
 * four studio portraits that still read as four different occasions. Both are
 * now square-on in a dark jacket over a white shirt, which is what Lev and
 * Lucas were already wearing. If a portrait is ever replaced again, match the
 * dress and the angle as well as the ground; the backdrop alone does not make
 * a set.
 *
 * The name-to-file mapping for the originals was not guessed: the filenames
 * carried no names, so it was read out of avalanche-capital.com's own page
 * payload, where each CMS record holds `{image, name, role, slug}` together.
 *
 * **4:5 PORTRAITS.** This once produced 512px square face crops for a 64px
 * avatar circle. `/team` was rebuilt to the reference's four-across portrait
 * cards, which show the whole frame. `git log` has the face crops if the
 * circle ever comes back; do not try to serve both framings from one file.
 *
 * For the four re-shoots only the HORIZONTAL is cropped: each master is
 * square, so top and bottom are kept whole and `faceX` decides which side
 * loses more of the trim.
 *
 * **Tatjana's is the exception, and `zoom` exists for her alone.** Hers is a
 * wider shot than the four generated ones — her head fills about 32% of the
 * frame against their ~40% — so at the same crop she read as standing further
 * back than everyone else, which is the one thing still breaking the row. A
 * 0.8 zoom pulls her in to match. It costs resolution rather than inventing
 * any: the crop lands at 512x640 and `withoutEnlargement` leaves it there,
 * about 6% under the card's 2x DPR ideal. A re-shoot of hers would close it
 * properly; upscaling here would only fake it.
 *
 * **EVERY OUTPUT IS GREYSCALE**, set here rather than by a CSS filter on the
 * page, so what ships is what renders and it keeps applying if a master is
 * replaced. Tatjana's original is black and white; desaturating the rest is
 * the direction that invents nothing.
 *
 * **Nothing is upscaled.** The four re-shoots crop to 640x800, which covers
 * the ~272x340 card at 2x DPR. Tatjana's crops to 640x800 from an 800x800
 * master and just makes it.
 */
import { mkdirSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const SRC_DIR = path.join(process.cwd(), "docs", "assets", "team");
const OUT_DIR = path.join(process.cwd(), "public", "team");

/** The card's aspect, width over height. Matches `aspect-[4/5]` on the page. */
const ASPECT = 4 / 5;
const MAX_WIDTH = 640;
const QUALITY = 82;
/** See the note above before turning this off. */
const GREYSCALE = true;

/** Where the head's centre sits vertically in the finished crop. Only
 *  consulted when `zoom` pulls in far enough to leave a choice. */
const HEAD_Y = 0.3;

/** `faceX` / `faceY` are the centre of the head as a fraction of the master;
 *  `zoom` is how much of the master's height to keep, 1 being all of it. */
// All four re-shoots now frame square-on and near-centred. Measured rather
// than eyeballed: the centroid of the dark pixels in the hair band (y 15-32%
// of the master) sits at 0.504 / 0.485 / 0.498 / 0.539 of the width, so 0.5
// centres all four to within a couple of percent of the crop.
//
// Bernardo carried 0.51 and Bruno 0.55 against their FIRST re-shoots — Bruno's
// was a three-quarter turn sitting right of the master's centre. Both masters
// were replaced on 7 Sep 2026 and both numbers came back to centre with them.
// **Re-measure when a master is replaced; do not carry the old number over.**
const PEOPLE = [
  { slug: "bernardo-almeida", faceX: 0.5 },
  { slug: "lev-valestkiy", faceX: 0.5 },
  { slug: "bruno-erckmam", faceX: 0.5 },
  // The untouched photograph, and the only entry that zooms. See above.
  { slug: "tatjana-sotirovik", faceX: 0.45, faceY: 0.36, zoom: 0.8 },
  { slug: "lucas-barrozo", faceX: 0.5 },
];

mkdirSync(OUT_DIR, { recursive: true });

for (const p of PEOPLE) {
  const input = path.join(SRC_DIR, `${p.slug}.webp`);
  const meta = await sharp(input).metadata();

  // Widest 4:5 the master holds at this zoom. The `min` is there so a future
  // landscape master degrades to a centre band rather than throwing out of
  // `extract`.
  const height = Math.min(Math.round(meta.height * (p.zoom ?? 1)), meta.height);
  const width = Math.min(Math.round(height * ASPECT), meta.width);
  const left = clamp(
    Math.round(p.faceX * meta.width - width / 2),
    0,
    meta.width - width,
  );
  const top = clamp(
    p.faceY === undefined
      ? Math.round((meta.height - height) / 2)
      : Math.round(p.faceY * meta.height - HEAD_Y * height),
    0,
    meta.height - height,
  );

  const out = path.join(OUT_DIR, `${p.slug}.webp`);
  const info = await sharp(input)
    .extract({ left, top, width, height })
    .resize(MAX_WIDTH, Math.round(MAX_WIDTH / ASPECT), {
      kernel: "lanczos3",
      withoutEnlargement: true,
    })
    .greyscale(GREYSCALE)
    .webp({ quality: QUALITY })
    .toFile(out);

  console.log(
    `${p.slug.padEnd(20)} ${meta.width}x${meta.height} ` +
      `crop ${width}x${height}@${left},${top} -> ${info.width}x${info.height}, ` +
      `${(info.size / 1024).toFixed(0)}KB`,
  );
}

function clamp(v, lo, hi) {
  return Math.max(lo, Math.min(v, hi));
}
