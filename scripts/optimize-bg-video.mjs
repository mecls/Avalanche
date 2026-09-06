/**
 * Background video pipeline. Two backgrounds use it.
 *
 *   node scripts/optimize-bg-video.mjs <preset> [path/to/source.mp4]
 *
 * It was `optimize-hero-video.mjs` and served one clip. /get-in-touch took a
 * second on 6 Sep 2026, so the per-clip decisions moved into PRESETS below and
 * the shared machinery stayed here. Almost nothing about an encode is portable
 * between sources — crf least of all — so read the preset you are touching
 * rather than copying the other one.
 *
 * Two earlier revisions of the hero pipeline are worth knowing about, because
 * both were right for their own source and would be wrong for either of these:
 *
 *  - one ran a denoise + unsharp RESTORATION chain, because the clip to hand
 *    was a 608x320 stock preview that had to be upscaled;
 *  - one carried a DEBAR crop, because that master shipped letterboxed inside
 *    a 2160-tall container.
 *
 * Do not denoise a 10Mbps+ master: it destroys real detail to fix artifacts
 * that are not there. Both chains are in the git history. **Check any new
 * source for bars with `cropdetect` and for cuts with `select='gt(scene,0.3)'`
 * before assuming it has neither.**
 *
 * `-an -dn -sn` drops audio, data and subtitle streams: both clips are muted
 * by definition and decorative.
 */
import { execFileSync } from "node:child_process";
import { mkdirSync, statSync, rmSync } from "node:fs";
import { homedir } from "node:os";
import path from "node:path";
import sharp from "sharp";

/**
 * `gradfun` is not optional on either clip. Both carry a large smooth sky
 * running out of a blown highlight, which is the textbook case for banding in
 * an 8-bit encode; the 1.6x downscale does the rest of the dithering.
 */
const VF = "scale=1600:-2:flags=lanczos,gradfun=3:16";

const PRESETS = {
  /**
   * The homepage hero: a wide, backlit view of the full span of the Ponte 25
   * de Abril, 2560x1440 / 13.8Mbps. Clean master, no bars, no cuts.
   *
   * THE WHOLE 15s SHIPS AND IT LOOPS ON A STRAIGHT CUT. Mean luma is flat at
   * 118.0-118.6 end to end and the camera barely travels, so the wrap is
   * invisible without help.
   *
   * crf 31 is high for a reason: the sun's specular path on the water is a
   * field of fine glitter that changes completely every frame, and it alone
   * drives the bitrate. At crf 27 this clip is 4.16MB. The water texture and
   * the sky gradient both hold at 31, and the scrim over it runs 0.44-0.60,
   * which hides compression artifacts far better than it hides softness.
   * Light denoise was tried to tame the glitter and lost — it cost more in
   * detail than it saved in bits.
   */
  hero: {
    file: "hero",
    src: path.join(homedir(), "Downloads", "187867-881332123_medium.mp4"),
    crf: 31,
    vp9: 46,
    posterAt: 1,
  },

  /**
   * /get-in-touch: a STILL, not a video, and the video it replaced is worth
   * knowing about before anyone reaches for one again.
   *
   * The source is a slow aerial of the Santa Justa lift, 2560x1440 / 10.4Mbps
   * / 40.7s — no bars, no cuts. It shipped as a background video on 6 Sep
   * 2026 and was replaced by this still the same day, by request.
   *
   * THAT VIDEO HAD TO BE PING-PONGED AND THE MEASUREMENTS ARE WHY. Unlike the
   * hero, this camera travels continuously and never returns: boundary-frame
   * SSIM for every candidate window from 10s to 18s, started every 4s across
   * the clip, lands between 0.16 and 0.26. No cut point in this source loops.
   * Concatenating the clip with its own reverse (minus the duplicated join
   * frame) took that seam to 0.983. If a video ever goes back here, it needs
   * the same treatment — a straight `loop` will visibly jump.
   *
   * The still is THE LAST FRAME of the source, taken with an end-relative
   * seek. By then the camera has pulled fully back to frame the lift's
   * viewing platform against the Carmo ruins, and the blown sun flare that
   * dominates the first half of the clip has gone entirely — which matters,
   * because the page sets white type over the left of this frame.
   *
   * 2000px rather than the video's 1600: a single still has none of a video's
   * per-frame budget, and at 1600 it upscales visibly on a wide monitor. At
   * q80 it lands near 200KB against the 3.6MB of mp4 + webm it replaces.
   */
  contact: {
    file: "contact-bg",
    src: path.join(homedir(), "Downloads", "187422-880363257_medium.mp4"),
    stillOnly: true,
    stillWidth: 2000,
    /** End-relative: the LAST frame, not a timestamp that would drift if the
     *  source were ever re-cut. */
    stillFromEnd: 0.08,
    quality: 80,
  },
};

const name = process.argv[2];
const preset = PRESETS[name];
if (!preset) {
  console.error(
    `Usage: node scripts/optimize-bg-video.mjs <${Object.keys(PRESETS).join("|")}> [source.mp4]`,
  );
  process.exit(1);
}
const SRC = process.argv[3] ?? preset.src;
const OUT = path.join(process.cwd(), "public", "video");
mkdirSync(OUT, { recursive: true });

const ff = (args) =>
  execFileSync("ffmpeg", ["-y", "-hide_banner", "-loglevel", "error", ...args]);
const mb = (f) => (statSync(f).size / 1e6).toFixed(2) + "MB";

/**
 * A still-only preset stops here. Homebrew's ffmpeg ships without a webp
 * encoder, so go out via PNG and let sharp (already a devDependency, used by
 * optimize-logos.mjs) do the encode.
 */
if (preset.stillOnly) {
  const tmp = path.join(OUT, ".still.png");
  const still = path.join(OUT, `${preset.file}.webp`);
  ff([
    "-sseof", String(-preset.stillFromEnd), "-i", SRC, "-update", "1", "-frames:v", "1",
    "-vf", `scale=${preset.stillWidth}:-2:flags=lanczos,gradfun=3:16`, tmp,
  ]);
  await sharp(tmp).webp({ quality: preset.quality }).toFile(still);
  rmSync(tmp);
  console.log(`${preset.file}.webp`, mb(still));
  process.exit(0);
}

/** Input-side trim, so ffmpeg seeks rather than decoding to the mark. */
const seek = preset.trim
  ? ["-ss", String(preset.trim.start), "-t", String(preset.trim.duration)]
  : [];

/**
 * Ping-pong needs filter_complex; a plain clip only needs -vf. Kept apart so
 * the hero's command line stays exactly what it was.
 */
const shape = preset.pingPong
  ? [
      "-filter_complex",
      `[0:v]${VF},split[a][b];[b]reverse,trim=start_frame=1,setpts=PTS-STARTPTS[r];[a][r]concat=n=2:v=1[o]`,
      "-map", "[o]",
    ]
  : ["-map", "0:v:0", "-vf", VF];

const common = [...seek, "-i", SRC, ...shape, "-an", "-dn", "-sn", "-map_metadata", "-1"];

const mp4 = path.join(OUT, `${preset.file}.mp4`);
ff([...common, "-c:v", "libx264", "-crf", String(preset.crf), "-preset", "slow",
    "-x264-params", "aq-mode=3", "-pix_fmt", "yuv420p",
    "-movflags", "+faststart", "-write_tmcd", "0", mp4]);
console.log(`${preset.file}.mp4  `, mb(mp4));

/**
 * VP9 IS OFFERED FIRST IN THE MARKUP, so it has to actually be the smaller
 * file or the <source> order is costing bytes rather than saving them. There
 * is no portable crf. ALWAYS COMPARE THE TWO PRINTED SIZES after changing a
 * source or either encoder.
 */
const webm = path.join(OUT, `${preset.file}.webm`);
ff([...common, "-c:v", "libvpx-vp9", "-crf", String(preset.vp9), "-b:v", "0",
    "-row-mt", "1", "-deadline", "good", "-cpu-used", "2", webm]);
console.log(`${preset.file}.webm `, mb(webm));

// Poster: the frame the eye lands on, and the reduced-motion still.
const tmp = path.join(OUT, ".poster.png");
const poster = path.join(OUT, `${preset.file}-poster.webp`);
ff(["-ss", String(preset.posterAt), "-i", SRC, "-frames:v", "1", "-vf", VF, tmp]);
await sharp(tmp).webp({ quality: 80 }).toFile(poster);
rmSync(tmp);
console.log(`${preset.file}-poster`, mb(poster));
