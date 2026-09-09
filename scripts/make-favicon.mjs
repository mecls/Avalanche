/**
 * The browser-tab icon, built from the same mark the nav draws.
 *
 *   node scripts/make-favicon.mjs
 *
 * Reads `app/icon.svg` and writes `app/favicon.ico` (16/32/48) and
 * `app/apple-icon.png` (180). Next's App Router picks all three up by
 * filename and emits the links; nothing imports them.
 *
 * **WHY THIS EXISTS AT ALL.** The favicon still carried the mark's OLD BLUE
 * GRADIENT long after the lockup went flat on 7 Sep 2026 - so the tab and the
 * nav were showing two different logos, which is exactly the drift the inline
 * `Logo` component was written to prevent. `app/icon.svg` now holds the `MARK`
 * path from components/ui/logo.tsx verbatim and this script rasterises it, so
 * there is one source for the shape and one command to re-cut every size.
 *
 * **THE ICO IS PACKED BY HAND because sharp cannot write one.** An ICO is a
 * 6-byte header, one 16-byte directory entry per size, then the images - and
 * PNG data can be embedded directly rather than as a DIB, which every browser
 * since IE11 reads. That is a few lines here against a dependency whose only
 * job would be this file.
 *
 * Three sizes because they are the three that get used: 16 in a tab, 32 in a
 * bookmark bar and on a HiDPI tab, 48 in Windows' shortcut list.
 */
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const SRC = path.join(process.cwd(), "app", "icon.svg");
const ICO_SIZES = [16, 32, 48];
const APPLE_SIZE = 180;

const svg = readFileSync(SRC);
const render = (size) =>
  sharp(svg, { density: 384 }).resize(size, size).png({ compressionLevel: 9 }).toBuffer();

/** ICONDIR + ICONDIRENTRY[] + PNG payloads. */
function packIco(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // 1 = icon
  header.writeUInt16LE(images.length, 4);

  const dir = Buffer.alloc(16 * images.length);
  let offset = header.length + dir.length;

  images.forEach(({ size, buf }, i) => {
    const o = i * 16;
    // 0 means 256 in this field; none of our sizes need it, but the rule is
    // why the byte is written rather than assumed.
    dir.writeUInt8(size >= 256 ? 0 : size, o);
    dir.writeUInt8(size >= 256 ? 0 : size, o + 1);
    dir.writeUInt8(0, o + 2); // palette entries
    dir.writeUInt8(0, o + 3); // reserved
    dir.writeUInt16LE(1, o + 4); // colour planes
    dir.writeUInt16LE(32, o + 6); // bits per pixel
    dir.writeUInt32LE(buf.length, o + 8);
    dir.writeUInt32LE(offset, o + 12);
    offset += buf.length;
  });

  return Buffer.concat([header, dir, ...images.map((i) => i.buf)]);
}

const images = [];
for (const size of ICO_SIZES) images.push({ size, buf: await render(size) });

const ico = packIco(images);
writeFileSync(path.join(process.cwd(), "app", "favicon.ico"), ico);
console.log(
  `app/favicon.ico       ${ICO_SIZES.join("/")}  ${(ico.length / 1024).toFixed(1)}KB`,
);

const apple = await render(APPLE_SIZE);
writeFileSync(path.join(process.cwd(), "app", "apple-icon.png"), apple);
console.log(
  `app/apple-icon.png    ${APPLE_SIZE}       ${(apple.length / 1024).toFixed(1)}KB`,
);
