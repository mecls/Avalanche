/**
 * Hero background video pipeline.
 *
 * The source is a 17.8MB 1080p master with an audio track and a stray data
 * stream. None of that ships: the hero video is muted by definition, sits
 * behind a scrim, and is decorative. `-an -dn -sn` drops audio, data, and
 * subtitle streams; the scale down to 720p is invisible under the scrim and
 * roughly quarters the bitrate.
 *
 *   node scripts/optimize-hero-video.mjs [path/to/source.mp4]
 */
import { execFileSync } from "node:child_process";
import { mkdirSync, statSync, rmSync } from "node:fs";
import { homedir } from "node:os";
import path from "node:path";
import sharp from "sharp";

const SRC = process.argv[2] ?? path.join(homedir(), "Downloads", "Fundraisr.mp4");
const OUT = path.join(process.cwd(), "public", "video");
mkdirSync(OUT, { recursive: true });

const ff = (args) => execFileSync("ffmpeg", ["-y", "-hide_banner", "-loglevel", "error", ...args]);
const mb = (f) => (statSync(f).size / 1e6).toFixed(2) + "MB";

/**
 * The master runs 15.4s but hard-cuts at 9.59s from the moody desk footage
 * into a bright, blown-out window shot — measured with signalstats, mean luma
 * jumps 60 -> 152 and stays there. On a black page that reads as a strobe
 * every time the loop wraps, so the tail is cut. It also removes ~40% of the
 * bytes for free.
 */
const TRIM = "9.5";
const common = ["-i", SRC, "-t", TRIM, "-map", "0:v:0", "-an", "-dn", "-sn",
                "-map_metadata", "-1", "-vf", "scale=1280:-2"];

const mp4 = path.join(OUT, "hero.mp4");
ff([...common, "-c:v", "libx264", "-crf", "26", "-preset", "slow",
    "-pix_fmt", "yuv420p", "-movflags", "+faststart", "-write_tmcd", "0", mp4]);
console.log("hero.mp4  ", mb(mp4));

const webm = path.join(OUT, "hero.webm");
ff([...common, "-c:v", "libvpx-vp9", "-crf", "32", "-b:v", "0", "-row-mt", "1", webm]);
console.log("hero.webm ", mb(webm));

// Poster: the frame the eye lands on. Doubles as the reduced-motion still.
// Homebrew's ffmpeg ships without a webp encoder, so go out via PNG and let
// sharp (already a devDependency, used by optimize-logos.mjs) do the encode.
const tmp = path.join(OUT, ".poster.png");
const poster = path.join(OUT, "hero-poster.webp");
ff(["-ss", "1", "-i", SRC, "-frames:v", "1", "-vf", "scale=1280:-2", tmp]);
await sharp(tmp).webp({ quality: 78 }).toFile(poster);
rmSync(tmp);
console.log("poster    ", mb(poster));
