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
 * Five of these six are GENERATIVE OUTPUTS - one-shot, non-deterministic, and
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
 *    matched to - plain light-grey studio backdrop, greyscale, head and
 *    shoulders.
 *  - `bernardo-almeida`, `lev-valestkiy`, `bruno-erckmam` and `lucas-barrozo`
 *    are GENERATIVE RE-SHOOTS produced outside this repo (ChatGPT, 7 Sep 2026,
 *    1254x1254) from the original photographs, which were five different
 *    shoots - a beach, a sponsor wall, an office, a curtain - and never read
 *    as a set. The originals are in the git history of this directory.
 *  - `arsenio-renato` is the SIXTH and it arrived differently: supplied
 *    directly on 9 Sep 2026 as `ChatGPT Image Sep 8, 2026, 03_22_31 PM.png`
 *    (1254x1254), so it is generative like the four above but has no original
 *    photograph behind it in this repo and no CMS record naming it. It landed
 *    already matching the set on the three things that took the others four
 *    passes - backdrop, dress and angle - and needed only the crop distance,
 *    below.
 *  - `sara-ribeiro` and `erik-gallegos` are the SEVENTH and EIGHTH, supplied
 *    the same way on 9 Sep 2026 (`ChatGPT Image Sep 9, 2026, 11_13_00 AM.png`
 *    and `11_12_07 AM.png`, both 1254x1254). They shipped for a few hours as
 *    `account-executive-01` and `-02`, because the photographs and a job title
 *    arrived without names and guessing one for a pictured person is the thing
 *    content/team.ts exists to prevent; the names came separately and the
 *    slugs were renamed to match. **THE NAME-TO-FACE MAPPING IS BY ORDER** -
 *    the two names arrived in the order the two photographs did, and nothing
 *    else ties either name to either face. It is the same kind of assumption
 *    the first five carry and is flagged in docs/COPY-REVIEW.md for the same
 *    reason.
 *
 *    They are the ONLY two entries here whose measured numbers were enough on
 *    their own: both landed inside the set on head scale as well as on
 *    backdrop, dress and angle, so neither takes a `zoom`.
 *
 * **BERNARDO AND BRUNO HAVE EACH BEEN THROUGH THREE GENERATIVE FRAMES**, all
 * on 7 Sep 2026, and the sequence is the useful part rather than the count:
 *
 *  1. Matched the BACKDROP but not the DRESS. Bernardo came back in a white
 *     shirt with a chain and sunglasses, Bruno in a dark open-collar shirt at
 *     a three-quarter turn - four studio portraits that still read as four
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
 * **FOUR OF THE EIGHT NOW ZOOM, AND ALL FOUR ZOOM THE SAME WAY** - see the
 * note below. There is no entry that zooms out; `zoom` only ever crops in,
 * because the failure it fixes is always the same one, a master shot wider
 * than the head-and-shoulders standard the set is built on. Arsenio is the
 * fourth and the tightest at 0.72: at `zoom: 1` his head filled about a third
 * of the card against the others' half, which the contact sheet showed at once
 * and no single frame would have.
 *
 * So: **match the dress, the angle AND the crop distance.** The backdrop alone
 * does not make a set, and neither does the wardrobe. Two things no crop can
 * fix, both live in Bruno's fourth frame and both are worth a look before
 * launch: he is the only one not looking at the lens, and a corner of the
 * notebook sits in the bottom of the card.
 *
 * Note also that likeness is not stable across passes - Bruno wore glasses in
 * his second frame and does not in his third or fourth - which is the whole
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
 * crops IN. Hers is a wider shot than the generated ones - her head fills
 * about 32% of the frame against their ~40% - so at the same crop she read as
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
 * **Nothing is upscaled**, and that is `withoutEnlargement` doing it rather
 * than the numbers happening to work out. See the note on MAX_WIDTH: three of
 * the six reach the 832px target and three stop at whatever their master
 * holds.
 *
 * The card moved four times in one day: ~272px, then ~196px when the grid took
 * six columns to hold a sixth portrait in one row, then ~416px when that
 * became two rows of three, then ~344px when the grid was capped, and finally
 * ~306px when two account executives took the team to eight and the grid went
 * to four columns. At 196px every crop had margin to spare; at 416px only half
 * cleared 2x; 306px wants 612px and 832 clears it. **Re-check this constant
 * whenever the team grid changes, and re-check Tatjana first - hers is the
 * shortest master in the set and the first to fall behind** (512px against a
 * 612px ideal, so 0.84x).
 */
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const SRC_DIR = path.join(process.cwd(), "docs", "assets", "team");
const OUT_DIR = path.join(process.cwd(), "public", "team");

/** The card's aspect, width over height. Matches `aspect-[4/5]` on the page. */
const ASPECT = 4 / 5;
/**
 * RAISED FROM 640 TO 832 ON 9 Sep 2026, and it is the card at 2x DPR with
 * room. The /about grid went from six columns to two rows of three the same
 * day, so the card grew from ~196px to ~416px and then settled at ~344px once
 * the grid was capped at 1080px. The old 640px crops covered 196px three times
 * over and 344px only 1.86 times, which is under retina; 832 clears 688 with
 * margin for the next time that card moves.
 *
 * It does NOT reach every portrait, and `withoutEnlargement` is what makes
 * that safe rather than a silent upscale. What each master can actually give
 * at its own crop: Lev and Lucas 1003px, Bernardo 883, Arsenio 722, Bruno 652,
 * Tatjana 512. So three of the six land on 832 and three stay where their
 * masters end - Tatjana's is the one to re-shoot if this matters, at 1.23x.
 */
const MAX_WIDTH = 832;
const QUALITY = 82;
/** See the note above before turning this off. */
const GREYSCALE = true;

/**
 * TONAL GRADE. Every output is levelled so all five share one range.
 *
 * They did not. Measured on the shipped crops, the backdrop alone spanned 39
 * levels - 172 for Bernardo against 211 for Bruno, with Lev, Tatjana and
 * Lucas strung between - because five generative passes and one real
 * photograph each came back with their own exposure. Side by side in a row
 * that reads as five different papers, which is the last thing left making
 * the set look assembled rather than shot.
 *
 * **THE WHITE POINT IS MEASURED FROM THE BACKDROP, NOT FROM THE IMAGE.** A
 * first pass mapped each crop's 2nd and 98th percentile onto a shared range
 * and barely moved the number - 39 levels of spread became 34 - because those
 * endpoints are set by the SUBJECT: a jacket's blacks and a specular highlight
 * on a forehead, which differ per person and say nothing about the paper
 * behind them. Matching the ends of five different histograms does not match
 * the one region the eye actually compares across a row.
 *
 * So the white point comes from a backdrop sample: the top quarter of the
 * frame, left and right thirds only. Every master in this set is a centred
 * head-and-shoulders on a plain sweep, so that region is backdrop for all five
 * and contains no face. Its MEDIAN (not mean - a stray dark hair strand
 * shifts a mean) is mapped to BACKDROP_TARGET, and the 2nd percentile of the
 * whole crop is mapped to BLACK_POINT so the shadow end still lands together.
 *
 * If a future portrait is not a centred head-and-shoulders - a seated or
 * standing frame like Bernardo's or Bruno's before they were zoomed in - check
 * that the sample region is still backdrop before trusting the result.
 */
const BLACK_POINT = 10;
const BACKDROP_TARGET = 186;
const LOW_PCT = 0.02;

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
// The other three all zoom, and every zoom here crops IN - there is no entry
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
  // Standing, holding a notebook, looking off-camera - the widest master in
  // the set. 0.65 is the tightest crop that still clears 640px wide, and it
  // is what puts his head on the others' scale; it also takes most of the
  // notebook out of the frame, though a corner of it stays.
  { slug: "bruno-erckmam", faceX: 0.486, faceY: 0.215, zoom: 0.65 },
  // The untouched photograph. See above.
  { slug: "tatjana-sotirovik", faceX: 0.45, faceY: 0.36, zoom: 0.8 },
  { slug: "lucas-barrozo", faceX: 0.5 },
  // Landed matching the set on backdrop, dress and angle, and needed only the
  // crop distance - the one thing the note above says a contact sheet is for.
  // `faceX` is the measured hair-band centroid (0.454, so slightly left of
  // centre); `faceY` is the midpoint of hair-top to chin (0.373); 0.72 is what
  // puts his head on the others' scale, checked in a row with all six.
  { slug: "arsenio-renato", faceX: 0.454, faceY: 0.373, zoom: 0.72 },
  // The two that needed nothing but `faceX`. Both measured on the hair-band
  // centroid, both checked in a contact sheet of all eight: their heads
  // already sit on the others' scale, so there is no `zoom` to add and adding
  // one would push them past everybody.
  { slug: "sara-ribeiro", faceX: 0.543 },
  { slug: "erik-gallegos", faceX: 0.507 },
];

mkdirSync(OUT_DIR, { recursive: true });

/** Public path -> tiny inline data URI, written to content/team-blur.ts below. */
const blurs = {};

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

  // The graded pipeline up to (but not including) the encode, so the full
  // image and its blur placeholder are levelled identically.
  const base = () =>
    sharp(input)
      .extract({ left, top, width, height })
      .resize(MAX_WIDTH, Math.round(MAX_WIDTH / ASPECT), {
        kernel: "lanczos3",
        withoutEnlargement: true,
      })
      .greyscale(GREYSCALE);

  // Measure this crop's shadow end and its backdrop, then map both onto the
  // shared ones.
  const { data: pixels, info: raw } = await base()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const lo = lowPercentile(pixels, LOW_PCT);
  const hi = backdropLevel(pixels, raw.width, raw.height, raw.channels);
  const gain = (BACKDROP_TARGET - BLACK_POINT) / Math.max(hi - lo, 1);
  const offset = BLACK_POINT - gain * lo;

  const out = path.join(OUT_DIR, `${p.slug}.webp`);
  const info = await base()
    .linear(gain, offset)
    .webp({ quality: QUALITY })
    .toFile(out);

  // The blur placeholder, generated from the SAME crop so it cannot drift
  // from the image it stands in for. 12px wide is enough for a colour field
  // at this size and keeps each one around 300 bytes of base64.
  const blur = await sharp(input)
    .extract({ left, top, width, height })
    .resize(12, 15, { fit: "fill" })
    .greyscale(GREYSCALE)
    .linear(gain, offset)
    .webp({ quality: 40 })
    .toBuffer();
  blurs[`/team/${p.slug}.webp`] = `data:image/webp;base64,${blur.toString("base64")}`;

  console.log(
    `${p.slug.padEnd(20)} ${meta.width}x${meta.height} ` +
      `crop ${width}x${height}@${left},${top} -> ${info.width}x${info.height}, ` +
      `${(info.size / 1024).toFixed(0)}KB, blur ${blur.length}B, ` +
      `levels ${lo}/${hi} -> ${BLACK_POINT}/${BACKDROP_TARGET}`,
  );
}

/**
 * Written, not hand-authored, so a replaced portrait cannot keep the previous
 * one's placeholder. See the note on `blurs` above.
 */
writeFileSync(
  path.join(process.cwd(), "content", "team-blur.ts"),
  `/**\n` +
    ` * GENERATED by scripts/optimize-team-photos.mjs - do not edit by hand.\n` +
    ` *\n` +
    ` * One 12x15 WebP per portrait, inlined as a data URI and handed to\n` +
    ` * next/image as \`blurDataURL\`. Without it the portraits are lazy with no\n` +
    ` * placeholder, so scrolling the team section before they decode shows five\n` +
    ` * empty bordered frames on the dark band - which reads as a broken slab\n` +
    ` * rather than as loading, because the frame's own \`bg-ground-alt\` is the\n` +
    ` * same #151515 as the band behind it.\n` +
    ` *\n` +
    ` * Keyed on the PUBLIC PATH rather than a slug, because that is what\n` +
    ` * content/team.ts stores and it is the thing that has to match.\n` +
    ` */\n\n` +
    `export const teamBlur: Record<string, string> = ${JSON.stringify(blurs, null, 2)};\n`,
);
console.log(`\ncontent/team-blur.ts written (${Object.keys(blurs).length} entries)`);

function clamp(v, lo, hi) {
  return Math.max(lo, Math.min(v, hi));
}

/** The value below which `low` of the pixels fall. One pass over a 256-bin
 *  histogram - these are 640x800 greyscale buffers. */
function lowPercentile(buf, low) {
  const hist = new Uint32Array(256);
  for (let i = 0; i < buf.length; i++) hist[buf[i]]++;
  let seen = 0;
  for (let v = 0; v < 256; v++) {
    seen += hist[v];
    if (seen >= buf.length * low) return v;
  }
  return 255;
}

/**
 * The backdrop's level: the median of the top quarter's outer thirds. See the
 * note by BACKDROP_TARGET for why this region and why the median.
 */
function backdropLevel(buf, w, h, channels) {
  const hist = new Uint32Array(256);
  let n = 0;
  const yMax = Math.round(h * 0.25);
  const xL = Math.round(w / 3);
  const xR = Math.round((w * 2) / 3);
  for (let y = 0; y < yMax; y++) {
    for (let x = 0; x < w; x++) {
      if (x >= xL && x < xR) continue;
      hist[buf[(y * w + x) * channels]]++;
      n++;
    }
  }
  let seen = 0;
  for (let v = 0; v < 256; v++) {
    seen += hist[v];
    if (seen >= n / 2) return v;
  }
  return 255;
}
