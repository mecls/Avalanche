import Image from "next/image";
import { clientLogos } from "@/content/client-logos";

/**
 * A roster of marks as a static ruled grid, the /customers counterpart to the
 * scrolling strip in `logo-band.tsx`. Every mark is visible at once and holds
 * still, which is what makes it readable as a roster rather than as motion.
 *
 * Rules are drawn per cell (`border-r border-b`) against a `border-t border-l`
 * container rather than with a `gap-px` container background. A list that does
 * not divide evenly into its column count would render the shortfall in the
 * last row as a floating grey block under a gap-px grid; this way the row
 * simply ends.
 *
 * The marks are pre-processed to white-on-transparent — the client roster by
 * scripts/logos-to-alpha.mjs, the /solutions/secondaries band by
 * scripts/secondary-logos.mjs. `logo-mark` is what lets them survive a light
 * band: globals.css inverts them there rather than shipping a second set. Both
 * of the places this renders ARE light bands, so that rule is doing real work
 * here, not standing by.
 *
 * **`cols` IS A PROP BECAUSE THE TWO ROSTERS DIVIDE DIFFERENTLY.** The client
 * list is long and runs five across; the nine secondaries marks run three
 * across at every width, which is the only count that divides them evenly and
 * the reason they are not simply handed the default. Pass whole class strings,
 * not a number — Tailwind scans source text, so an interpolated `grid-cols-${n}`
 * would not be emitted.
 */
export function LogoGrid({
  logos = clientLogos,
  cols = "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5",
  markClassName = "h-7 w-24",
  sizes = "96px",
}: {
  logos?: readonly string[];
  cols?: string;
  markClassName?: string;
  sizes?: string;
} = {}) {
  return (
    <div className={`grid border-t border-l border-line ${cols}`}>
      {logos.map((src) => (
        <div
          key={src}
          className="flex aspect-[2/1] items-center justify-center border-r border-b border-line p-5"
        >
          <div className={`relative ${markClassName}`}>
            <Image
              src={src}
              alt=""
              fill
              sizes={sizes}
              // Brighter than the marquee's 65%. There a mark only has to
              // register in passing; here the grid is a roster and every one
              // of them has to be readable standing still.
              className="logo-mark object-contain opacity-80 transition-opacity duration-300 hover:opacity-100"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
