/**
 * The Avalanche logo — the three-slash mark plus the "Avalanche" wordmark, as
 * one lockup. Supplied as an SVG on 7 September 2026 and kept verbatim at
 * `docs/assets/avalanche-logo.svg`; this is that file with three changes, each
 * of which it needed to work here.
 *
 * **The wordmark is `currentColor`, not the `#fff` it arrived as.** The nav is
 * transparent over whatever band opens the page, and on `/customers` and
 * `/solutions/*` that band is white — a hardcoded white wordmark is invisible
 * there. Taking the colour from `currentColor` means the same markup renders
 * white over the hero and ink on a light band, driven by the `[data-band]`
 * tokens that already re-point `text-fg`. It is the same problem the client
 * logos solve with the `logo-mark` filter, solved better: **do not reach for
 * that class here.** `logo-mark` inverts the whole element, which would turn
 * the mark's blue orange.
 *
 * **The mark keeps its blue and never inverts**, on either band. It is the
 * brand asset, not an accent use — the four-places rule in AGENTS.md is about
 * `--color-accent`, and this gradient is not it. Measured on white the light
 * end is thin (about 1.9:1), which is why the WORDMARK beside it carries the
 * identity and the mark is `aria-hidden` decoration.
 *
 * **The 692x823 PNG behind the mark is now 48x24.** The supplied file filled
 * the mark with a `<pattern>` over an embedded raster — 204KB of base64 for
 * what is a smooth blue gradient, inline on every page. The pattern stretches
 * that image to the mark's 59.8x31.5 bounding box regardless of its size, and
 * a smooth gradient survives the downsample: composited at 5x the rendered
 * size, 48x24 is within 1/255 per channel of the original at the median and 4
 * at the very worst pixel. 204KB -> 7KB, no visible difference at 10x.
 *
 * A vector `<linearGradient>` was tried first and rejected: the source is a
 * mesh, not a ramp, and neither a 5-stop linear fit nor a full bilinear one
 * gets below a median error of 9 per channel — plainly visible at any size
 * above the nav's. Re-derive from the kept original rather than re-fitting.
 *
 * A `viewBox` was also added. The supplied file has width/height and no
 * viewBox, so it cannot be resized at all — setting `width` on it moves the
 * frame and leaves the artwork the same size.
 */
export function Logo({
  patternId,
  className = "",
}: {
  /**
   * Id for this instance's gradient pattern. REQUIRED, and it must be unique
   * on the page: the lockup renders twice (nav and footer), each carries its
   * own `<defs>`, and two elements sharing an id is invalid HTML. There is
   * deliberately no default — a third call site should have to think about it
   * rather than silently collide with one of these two.
   */
  patternId: string;
  className?: string;
}) {
  return (
    <svg
      // width/height are the intrinsic ratio, not the rendered size. Every
      // call site sets height with a utility and leaves width `auto`, which
      // resolves off these.
      width="188"
      height="32"
      viewBox="0 0 188 32"
      fill="none"
      aria-hidden
      focusable="false"
      className={className}
    >
      <path fill="currentColor" d={WORDMARK} />
      <path
        fill={`url(#${patternId})`}
        fillRule="evenodd"
        clipRule="evenodd"
        d={MARK}
      />
      <defs>
        {/* `patternContentUnits="objectBoundingBox"` with a 1x1 image and
            `preserveAspectRatio="none"` stretches the texture across the
            mark's bounding box — the supplied file did the same thing with a
            `<use>` and a hand-computed `scale()`, which this replaces. The
            stretch is non-uniform (a portrait source into a landscape box) and
            that is intentional; it is what the original renders. */}
        <pattern
          id={patternId}
          width="1"
          height="1"
          patternContentUnits="objectBoundingBox"
        >
          <image
            href={MARK_TEXTURE}
            width="1"
            height="1"
            preserveAspectRatio="none"
          />
        </pattern>
      </defs>
    </svg>
  );
}

/** "Avalanche", set as outlines. NOT Satoshi — it is the drawn wordmark from
 *  the supplied file, and it does not say "Capital". */
const WORDMARK =
  "M84 23.815a70.863 70.863 0 0 0-.711-1.986 57.504 57.504 0 0 1-.711-2.01h-7.16a74.268 74.268 0 0 1-.711 2.034l-.687 1.962h-3.212a286.14 286.14 0 0 1 1.814-5.027 261.896 261.896 0 0 1 1.668-4.364 168.13 168.13 0 0 1 1.643-3.923c.54-1.243 1.095-2.469 1.667-3.678h2.918a120.314 120.314 0 0 1 3.286 7.601 166.43 166.43 0 0 1 1.691 4.364 192.91 192.91 0 0 1 1.84 5.027H84zm-5.002-13.707c-.376.867-.81 1.921-1.3 3.163a223.657 223.657 0 0 0-1.496 4.046h5.59a165.514 165.514 0 0 0-1.52-4.07 97.352 97.352 0 0 0-1.274-3.139zM92.19 23.815a87.661 87.661 0 0 1-2.526-5.787 77.197 77.197 0 0 1-2.33-7.037h3.164c.18.72.384 1.496.613 2.33.245.817.498 1.642.76 2.476.278.817.556 1.618.834 2.403.294.768.564 1.463.809 2.084.245-.621.507-1.316.785-2.084a82.9 82.9 0 0 0 .809-2.403c.278-.834.54-1.66.784-2.477.246-.833.458-1.61.638-2.329h3.065a72.384 72.384 0 0 1-2.354 7.037c-.85 2.174-1.684 4.103-2.501 5.787h-2.55zm14.132-2.084c.916 0 1.61-.05 2.085-.147v-3.286a6.618 6.618 0 0 0-1.741-.22c-.327 0-.662.024-1.006.073a3.24 3.24 0 0 0-.907.27c-.262.13-.474.318-.637.564-.164.228-.246.523-.246.882 0 .703.221 1.194.662 1.471.442.262 1.038.393 1.79.393zm-.245-11.059c.981 0 1.806.123 2.477.368.67.245 1.201.589 1.593 1.03.409.441.695.98.859 1.618.179.621.269 1.308.269 2.06v7.773c-.457.098-1.152.212-2.084.343-.915.147-1.953.22-3.114.22a9.393 9.393 0 0 1-2.109-.22c-.637-.147-1.185-.384-1.642-.711a3.51 3.51 0 0 1-1.055-1.275c-.245-.523-.368-1.169-.368-1.937 0-.736.139-1.357.417-1.864a3.524 3.524 0 0 1 1.177-1.226 4.737 4.737 0 0 1 1.692-.686 9.244 9.244 0 0 1 2.035-.221c.327 0 .67.024 1.03.074.36.032.744.098 1.153.196v-.49c0-.344-.041-.67-.123-.982a1.876 1.876 0 0 0-.441-.809 1.856 1.856 0 0 0-.81-.564c-.327-.13-.743-.196-1.25-.196a11.2 11.2 0 0 0-1.888.147 8.318 8.318 0 0 0-1.398.344l-.368-2.403c.376-.131.924-.262 1.643-.393.719-.13 1.488-.196 2.305-.196zm13.294 13.388c-.882-.016-1.618-.114-2.206-.294-.573-.18-1.03-.433-1.374-.76a2.925 2.925 0 0 1-.735-1.25 6.872 6.872 0 0 1-.196-1.717V5.278l2.967-.49v14.687c0 .36.024.662.073.907.066.245.172.458.319.638.147.163.343.294.588.392.262.082.589.147.981.196l-.417 2.452zm7.329-2.33c.915 0 1.61-.048 2.084-.146v-3.286a6.64 6.64 0 0 0-1.741-.22c-.327 0-.662.024-1.005.073a3.26 3.26 0 0 0-.908.27 1.63 1.63 0 0 0-.637.564c-.164.228-.245.523-.245.882 0 .703.22 1.194.662 1.471.441.262 1.038.393 1.79.393zm-.245-11.058c.98 0 1.806.123 2.476.368.67.245 1.202.589 1.594 1.03.409.441.695.98.858 1.618.18.621.27 1.308.27 2.06v7.773a32.4 32.4 0 0 1-2.084.343c-.916.147-1.954.22-3.114.22a9.38 9.38 0 0 1-2.109-.22c-.638-.147-1.185-.384-1.643-.711a3.507 3.507 0 0 1-1.054-1.275c-.246-.523-.368-1.169-.368-1.937 0-.736.139-1.357.417-1.864a3.515 3.515 0 0 1 1.177-1.226 4.722 4.722 0 0 1 1.692-.686 9.238 9.238 0 0 1 2.035-.221c.327 0 .67.024 1.03.074a8.13 8.13 0 0 1 1.152.196v-.49c0-.344-.041-.67-.123-.982a1.855 1.855 0 0 0-.441-.809 1.852 1.852 0 0 0-.809-.564c-.327-.13-.744-.196-1.251-.196-.686 0-1.316.05-1.888.147a8.242 8.242 0 0 0-1.397.344l-.368-2.403c.376-.131.923-.262 1.643-.393a12.95 12.95 0 0 1 2.305-.196zm8.831.736c.572-.164 1.316-.319 2.231-.466a19.25 19.25 0 0 1 3.041-.22c1.046 0 1.921.146 2.624.44.703.278 1.258.679 1.667 1.202.425.507.719 1.128.883 1.864.179.719.269 1.512.269 2.378v7.209h-2.967v-6.743c0-.687-.049-1.267-.147-1.741-.081-.49-.228-.883-.441-1.177a1.602 1.602 0 0 0-.834-.662c-.343-.147-.768-.22-1.275-.22a9.9 9.9 0 0 0-1.177.073c-.408.049-.711.09-.907.122v10.348h-2.967V11.408zm13.632 6.007c0-.948.147-1.83.442-2.648a6.402 6.402 0 0 1 1.25-2.158 5.913 5.913 0 0 1 2.011-1.422c.784-.343 1.667-.515 2.648-.515 1.21 0 2.354.22 3.433.662l-.638 2.428a6.642 6.642 0 0 0-1.177-.368 6.098 6.098 0 0 0-1.373-.147c-1.16 0-2.043.368-2.648 1.103-.605.72-.907 1.741-.907 3.065 0 1.275.286 2.289.858 3.04.572.736 1.537 1.104 2.893 1.104.507 0 1.006-.049 1.496-.147a7.05 7.05 0 0 0 1.275-.368l.417 2.452c-.327.164-.826.31-1.496.442-.654.13-1.332.196-2.035.196-1.095 0-2.051-.164-2.869-.49-.801-.344-1.471-.81-2.01-1.398a6.02 6.02 0 0 1-1.177-2.134 8.95 8.95 0 0 1-.393-2.697zm12.277 6.4V5.278l2.967-.49v6.35a8.02 8.02 0 0 1 1.128-.294 7.113 7.113 0 0 1 1.299-.123c1.03 0 1.88.147 2.55.442.687.277 1.235.678 1.643 1.201.409.507.695 1.12.859 1.84.179.718.269 1.52.269 2.402v7.209h-2.967v-6.743c0-.687-.049-1.267-.147-1.741-.082-.49-.229-.883-.441-1.177a1.612 1.612 0 0 0-.809-.662c-.344-.147-.769-.22-1.275-.22-.393 0-.793.04-1.202.122a8.202 8.202 0 0 0-.907.22v10.2h-2.967zm13.56-6.35c0-1.129.164-2.118.491-2.968.343-.85.793-1.553 1.348-2.108a5.318 5.318 0 0 1 1.913-1.275 5.778 5.778 0 0 1 2.207-.442c1.765 0 3.138.548 4.119 1.643.997 1.095 1.496 2.73 1.496 4.904 0 .163-.008.351-.025.564 0 .196-.008.376-.024.54h-8.46c.082 1.03.442 1.83 1.079 2.402.654.556 1.594.834 2.82.834.719 0 1.373-.065 1.962-.196.604-.13 1.078-.27 1.422-.417l.392 2.428a5.456 5.456 0 0 1-.686.27 8.973 8.973 0 0 1-.981.22c-.36.082-.752.147-1.177.196-.425.05-.858.074-1.3.074-1.128 0-2.109-.164-2.942-.49-.834-.344-1.52-.81-2.06-1.398a5.86 5.86 0 0 1-1.201-2.11 8.713 8.713 0 0 1-.393-2.672zm8.607-1.325c0-.409-.057-.793-.172-1.152a2.555 2.555 0 0 0-.515-.957 2.067 2.067 0 0 0-.809-.637c-.31-.164-.686-.245-1.128-.245-.458 0-.858.09-1.201.27a2.717 2.717 0 0 0-.883.662 3.202 3.202 0 0 0-.539.956c-.131.36-.221.727-.27 1.103h5.517z";

/** The three slashes. Filled by the pattern above, never by a token. */
const MARK =
  "M12.551 0h13.15l12.7 31.516h-13L12.551 0zM33.92 0h13.15l12.7 31.516h-13L33.92 0zM19.126 16.132H6.276L0 31.516h13.149l5.977-15.384z";

/** The blue gradient, 48x24, downsampled from the supplied 692x823 original.
 *  See the note above before touching the size. */
const MARK_TEXTURE =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAYCAIAAAAzn+mLAAADtklEQVR42pWWW67kNgxEq2jPIOvMBrO3fI/q5IOU7L43DwQNCBQtt46KZUn+/Y8/gYS1SEiSxUoSsrJCVpJkdWZl9Zh+1vnFigAQEpJAHUiSmJ9PZz9+DaOD+7ef94IscrEeIDIoGyvZKIcvnHglazUfCaAIZiqDJTQZDuiGeLjQ/fPnlbCKQBYrtcnI1qzn2pmj1tD0s0ewdda0VwYfin2DUGO2Qj/uSlRFQoorWuHKdHuW69p81wvrQzPegvG0Iy9rBokp2G4P2zT3j/tKhiMhcEWztmqySqY7Ol27oNdTStphh2yS+fDjGqsmC0LDveSzdN+XY6eouNcQs4qKpmSQcK0GquEePpLkgl7/dc1cA/qWamT/ItgpqxSC4P5RWlZwrNix0jQmZkUJHTduZXMMUGVYW6Q8cSWB69gfVnJ1yRnBssYfa7Ur7+uSUaJIsfIJ195aETMrKxB1HT+k6jUX7E+S2t4KqTYju4KhcljJse26r5KRJUtGthyVtdyxy7YV46jM2L8LWhzh40qahiQxwHHSgK5QOUGSClx5KFcDRa5B6Rhkbc0ia1fTdrBkYz+V3QWdlSdFNSUJ+1tQPB9OKhzXJxRjr8pdlkqKLLlGp0Sq2S2szdqBXVbiSDEWlupgmZju2g0Hq1KwaKCBrtRi+NqMhuS2VZJqlKiSot7kXXKUxm3WyDXPLZkmVIItixLRYVLcmTggyhVTLY/B7XTKocIAaTaAsoTSQUlRDl+Jpthw6bcOqEzkyxG2HKIRL8Ku1gzHhhTCBqcMnl0Dh8U9x41FO1pjoA8+FKs2OxqJ2JmRLXI5kcuDIkqKhg+5l4Zigap3xqhBQbm9T5UjlV8HTj+1ZSQPaCRbVQqqFyIeFcm4LTaWC4sI5m+CygoSCqJUzIDcme37OWTOEXgQv7fjNEv7v+sAaVdrqwj23jsw2Bjb6bj6+MAF8r1WXwzmLvCQcQ7g53w2QrvdfPoMmvX4suG69O7dwsTCbSMQGAoCrnvlodGRSh+ywcdt65FwH9unym8hpyodvygjV79tsOBjqjvrA+KLTm9KfeHbGesjc0DfgdrAElJ9Dmzdz/z3r/UNYq/7QOh7KU83+++zp88z4Xj1DOG5Znwuey6VSPda/wNCfKj4wO26v/nemilS5EjImU//EaehsdlA/wnx3PL+hfIk8xIvW7wvNNlx5H4lUvTy0D+L8RUinxD6hpUn8LFaZov0pnwjdpLoXr++0ugfvKz8DcQXji/Jd+aZfsM9NFtRR38BygEZeAU8cFkAAAAASUVORK5CYII=";
