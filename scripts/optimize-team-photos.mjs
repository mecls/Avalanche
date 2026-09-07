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
 * **BERNARDO AND BRUNO HAVE EACH BEEN THROUGH THREE GENERATIVE FRAMES**, all
 * on 7 Sep 2026, and the sequence is the useful part rather than the count:
 *
 *  1. Matched the BACKDROP but not the DRESS. Bernardo came back in a white
 *     shirt with a chain and sunglasses, Bruno in a dark open-collar shirt at
 *     a three-quarter turn — four studio portraits that still read as four
 *     different occasions.
 *  2. Matched the dress: both square-on in a dark jacket over a white shirt,
 *     which is what Lev and Lucas were already wearing.
 *  3. Matched the dress and missed the CROP DISTANCE. Bernardo's third is a
 *     SEATED three-quarter shot, leaning on a table with a hand to his chin;
 *     Bruno's third replaced his second cleanly and needed no re-tuning.
 *  4. Bruno again, and wider still: a STANDING three-quarter shot holding a
 *     notebook, looking off-camera.
 *
 * Passes 3 and 4 are why `zoom` is no longer Tatjana's alone. Left at
 * `zoom: 1`, Bernardo's head filled about a quarter of the card against the
 * others' third and the table edge showed along the bottom; Bruno's fourth was
 * wider again at roughly a quarter. 0.88 and 0.65 crop each of them back to
 * head-and-shoulders on the others' scale.
 *
 * **THREE OF THE FIVE NOW ZOOM, AND ALL THREE ZOOM THE SAME WAY** — see the
 * note below. There is no entry that zooms out; `zoom` only ever crops in,
 * because the failure it fixes is always the same one, a master shot wider
 * than the head-and-shoulders standard the set is built on.
 *
 * So: **match the dress, the angle AND the crop distance.** The backdrop alone
 * does not make a set, and neither does the wardrobe. Two things no crop can
 * fix, both live in Bruno's fourth frame and both are worth a look before
 * launch: he is the only one not looking at the lens, and a corner of the
 * notebook sits in the bottom of the card.
 *
 * Note also that likeness is not stable across passes — Bruno wore glasses in
 * his second frame and does not in his third or fourth — which is the whole
 * reason docs/COPY-REVIEW.md asks for each subject's sign-off on the version
 * that actually ships.
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
 * **Tatjana zooms for the SAME reason as the other two, not a different one.**
 * An earlier revision of this comment called hers "the opposite reason" and
 * that was simply wrong: every `zoom` here is below 1 and every one of them
 * crops IN. Hers is a wider shot than the generated ones — her head fills
 * about 32% of the frame against their ~40% — so at the same crop she read as
 * standing further back than everyone else. A 0.8 pulls her in to match.
 *
 * Hers is the only one that costs resolution, and it costs it rather than
 * inventing any: her master is 800x800 where the generated ones are 1254, so
 * the crop lands at 512x640 and `withoutEnlargement` leaves it there, about 6%
 * under the card's 2x DPR ideal. Bernardo's 0.88 and Bruno's 0.65 both still
 * clear 640px wide. A re-shoot of hers would close the gap properly;
 * upscaling here would only fake it.
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
// Lev and Lucas frame square-on and head-and-shoulders, so they take a plain
// 0.5 and nothing else. Measured rather than eyeballed: the centroid of the
// dark pixels in the hair band (y 15-32% of the master) sits at 0.485 and
// 0.539 of the width, which 0.5 centres to within a couple of percent.
//
// The other three all zoom, and every zoom here crops IN — there is no entry
// that zooms out. Bernardo and Bruno are on their third and fourth masters
// respectively, and between them they have carried five different sets of
// numbers: 0.51, then 0.5, then a seated frame needing all three knobs; 0.55,
// then 0.5, then a standing frame needing all three. **Re-measure every time
// a master is replaced.** Every value in this list has been wrong at least
// once because someone carried the previous one over. **Re-measure when a master is replaced; do not carry the
// old number over.** Every value here has been wrong at least once because
// someone did.
const PEOPLE = [
  // Seated and leaning, so he sits left of centre and further back than the
  // rest. Chosen against a contact sheet with Bruno beside him, not by eye
  // alone: 0.88 puts his head on the same scale as the other four.
  { slug: "bernardo-almeida", faceX: 0.43, faceY: 0.25, zoom: 0.88 },
  { slug: "lev-valestkiy", faceX: 0.5 },
  // Standing, holding a notebook, looking off-camera — the widest master in
  // the set. 0.65 is the tightest crop that still clears 640px wide, and it
  // is what puts his head on the others' scale; it also takes most of the
  // notebook out of the frame, though a corner of it stays.
  { slug: "bruno-erckmam", faceX: 0.486, faceY: 0.215, zoom: 0.65 },
  // The untouched photograph. See above.
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
