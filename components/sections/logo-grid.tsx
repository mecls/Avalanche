import Image from "next/image";
import { clientLogos } from "@/content/client-logos";

/**
 * The client roster as a static ruled grid, the /customers counterpart to the
 * scrolling strip in `logo-band.tsx`. Every mark is visible at once and holds
 * still, which is what makes it readable as a roster rather than as motion.
 *
 * Rules are drawn per cell (`border-r border-b`) against a `border-t border-l`
 * container rather than with a `gap-px` container background. The list does
 * not divide evenly into five, and a gap-px grid renders the shortfall in the
 * last row as a floating grey block; this way the row simply ends.
 *
 * The marks are pre-processed to white-on-transparent by
 * scripts/logos-to-alpha.mjs. `logo-mark` is what lets them survive a light
 * band — globals.css inverts them there rather than shipping a second set.
 */
export function LogoGrid() {
  return (
    <div className="grid grid-cols-2 border-t border-l border-line sm:grid-cols-3 lg:grid-cols-5">
      {clientLogos.map((src) => (
        <div
          key={src}
          className="flex aspect-[2/1] items-center justify-center border-r border-b border-line p-5"
        >
          <div className="relative h-7 w-24">
            <Image
              src={src}
              alt=""
              fill
              sizes="96px"
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
