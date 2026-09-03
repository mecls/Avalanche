import Image from "next/image";
import { clientLogos } from "@/content/client-logos";

type Props = {
  className?: string;
  /** Defaults to the client roster. Pass `ecosystemLogos` for the venture
   *  strip on /customers. */
  logos?: readonly string[];
  /**
   * Whether these are the white-on-transparent marks from
   * scripts/logos-to-alpha.mjs. Those carry `logo-mark`, which globals.css
   * inverts on a light band, and they run held back because they only have to
   * register in passing. Full-colour marks must NOT be inverted — they would
   * blow out to white on a white band — so they opt out and run at full
   * strength, which is how their own artwork is already balanced.
   */
  alphaMarks?: boolean;
  /** Box each mark sits in. Wordmarks need more room than the client marks. */
  itemClassName?: string;
};

/**
 * The continuously scrolling logo strip. Two copies of the list scroll as one
 * loop; under reduced motion the animation is dropped and it reads as a plain
 * row.
 *
 * Carries no background, padding or heading of its own — the caller owns
 * those, because it is used both inside the hero and as its own band.
 */
export function LogoMarquee({
  className = "",
  logos = clientLogos,
  alphaMarks = true,
  itemClassName = "h-8 w-24",
}: Props) {
  const strip = [...logos, ...logos];

  return (
    <div
      className={`relative flex select-none overflow-hidden ${className}`}
      // Fade the strip out at both edges.
      //
      // `overflow-hidden` is load-bearing, not tidiness: the scrolling row is
      // several times wider than this box, and a mask-image defaults to
      // mask-repeat: repeat. Without clipping, the gradient TILES across the
      // overflow and the strip reads as a few logos with holes between them
      // rather than a continuous run. It went unnoticed while this box was the
      // full viewport width, because the first tile covered all of it.
      style={{
        maskImage:
          "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
        WebkitMaskImage:
          "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
      }}
    >
      <div className="flex shrink-0 items-center gap-14 pr-14 [animation:marquee_70s_linear_infinite] motion-reduce:[animation:none]">
        {strip.map((src, i) => (
          <div
            key={`${src}-${i}`}
            className={`relative shrink-0 ${itemClassName}`}
          >
            <Image
              src={src}
              alt=""
              fill
              sizes="160px"
              className={`object-contain transition-opacity duration-300 hover:opacity-100 ${
                alphaMarks ? "logo-mark opacity-65" : ""
              }`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
