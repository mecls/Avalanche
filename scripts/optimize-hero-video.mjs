/**
 * Hero background video pipeline.
 *
 *   node scripts/optimize-hero-video.mjs [path/to/source.mp4]
 *
 * The source is a 2560x1440 / 13.8Mbps aerial: a wide, backlit view of the
 * full span of the Ponte 25 de Abril with the sun high over the Tagus. It is a
 * clean master, so this script only downscales, debands and encodes — there is
 * nothing to restore and no letterbox to remove.
 *
 * Two earlier revisions of this file are worth knowing about before you change
 * anything here, because both were correct for their own source and would be
 * wrong for this one:
 *
 *  - one ran a denoise + unsharp RESTORATION chain, because the clip to hand
 *    was a 608x320 stock preview that had to be upscaled;
 *  - one carried a DEBAR crop, because that master shipped letterboxed inside
 *    a 2160-tall container.
 *
 * Neither applies now. Do not denoise a 13.8Mbps master — it destroys real
 * detail to fix artifacts that are not there. Both are in the git history if a
 * future source needs them; check any new source for bars with `cropdetect`
 * before assuming it has none.
 *
 * `-an -dn -sn` drops audio, data and subtitle streams: the hero video is
 * muted by definition and decorative.
 */
import { execFileSync } from "node:child_process";
import { mkdirSync, statSync, rmSync } from "node:fs";
import { homedir } from "node:os";
import path from "node:path";
import sharp from "sharp";

const SRC =
  process.argv[2] ??
  path.join(homedir(), "Downloads", "187867-881332123_medium.mp4");
const OUT = path.join(process.cwd(), "public", "video");
mkdirSync(OUT, { recursive: true });

const ff = (args) =>
  execFileSync("ffmpeg", ["-y", "-hide_banner", "-loglevel", "error", ...args]);
const mb = (f) => (statSync(f).size / 1e6).toFixed(2) + "MB";

/**
 * `gradfun` is not optional on this clip. Most of the frame is one enormous
 * smooth sky gradient running out of a blown highlight, which is the textbook
 * case for banding in an 8-bit encode. With it, the gradient around the sun
 * holds clean at 1.5x nearest-neighbour zoom; the 1.8x downscale does the rest
 * of the dithering.
 */
const VF = ["scale=1600:-2:flags=lanczos", "gradfun=3:16"].join(",");

/**
 * The whole 15s ships. Mean luma is flat at 118.0-118.6 end to end with no cut
 * anywhere, so the loop wraps invisibly. An earlier source had to be trimmed
 * because it hard-cut into a blown plate and strobed on every wrap — measure a
 * new source with signalstats rather than assuming.
 */
const common = [
  "-i", SRC, "-map", "0:v:0", "-an", "-dn", "-sn",
  "-map_metadata", "-1", "-vf", VF,
];

/**
 * crf 31 is high, and it is high for a specific reason: the sun's specular
 * path on the water is a field of fine glitter that changes completely every
 * frame, so it is enormously expensive and it is the single thing driving the
 * bitrate. At crf 27 this clip encodes to 4.16MB. Verified rather than
 * assumed: the water texture and the sky gradient both hold at 31, and the
 * scrim over this footage runs 0.60-0.90 alpha, which hides compression
 * artifacts far better than it hides softness.
 *
 * Light denoise was tried to tame the glitter and lost — it cost more in
 * detail than it saved in bits.
 */
const mp4 = path.join(OUT, "hero.mp4");
ff([...common, "-c:v", "libx264", "-crf", "31", "-preset", "slow",
    "-x264-params", "aq-mode=3", "-pix_fmt", "yuv420p",
    "-movflags", "+faststart", "-write_tmcd", "0", mp4]);
console.log("hero.mp4  ", mb(mp4));

/**
 * VP9 is offered FIRST in the markup, so it has to actually be the smaller
 * file or the <source> order is costing bytes rather than saving them.
 *
 * There is no portable crf here — the right value is entirely content
 * dependent, and across the sources this hero has carried it has ranged from
 * 32 to 46. VP9 does particularly badly on this one's water glitter: at crf 40
 * it is 3.54MB against the mp4's 2.18MB. 46 is where it finally wins, and the
 * water still matches h264 side by side. ALWAYS compare the two printed sizes
 * after changing the source or either encoder.
 */
const webm = path.join(OUT, "hero.webm");
ff([...common, "-c:v", "libvpx-vp9", "-crf", "46", "-b:v", "0",
    "-row-mt", "1", "-deadline", "good", "-cpu-used", "2", webm]);
console.log("hero.webm ", mb(webm));

// Poster: the frame the eye lands on, and the reduced-motion still, so it gets
// the same treatment as the video. Homebrew's ffmpeg ships without a webp
// encoder, so go out via PNG and let sharp (already a devDependency, used by
// optimize-logos.mjs) do the encode.
const tmp = path.join(OUT, ".poster.png");
const poster = path.join(OUT, "hero-poster.webp");
ff(["-ss", "1", "-i", SRC, "-frames:v", "1", "-vf", VF, tmp]);
await sharp(tmp).webp({ quality: 80 }).toFile(poster);
rmSync(tmp);
console.log("poster    ", mb(poster));
