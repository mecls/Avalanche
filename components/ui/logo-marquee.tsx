import Image from "next/image";
import { clientLogos } from "@/content/client-logos";

/**
 * The continuously scrolling client strip. Two copies of the list scroll as one
 * loop; under reduced motion the animation is dropped and it reads as a plain
 * row.
 *
 * Shared by the standalone Active-clients section and the strip at the foot of
 * the hero, which is why it carries no background, padding or heading of its
 * own — the caller owns those.
 *
 * The assets are pre-normalised to white-on-transparent by
 * scripts/logos-to-alpha.mjs, so no blend mode is needed and the marks sit
 * correctly on any ground, video included.
 */
export function LogoMarquee({ className = "" }: { className?: string }) {
  const strip = [...clientLogos, ...clientLogos];

  return (
    <div
      className={`relative flex select-none ${className}`}
      // fade the strip out at both edges
      style={{
        maskImage:
          "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
        WebkitMaskImage:
          "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
      }}
    >
      <div className="flex shrink-0 items-center gap-14 pr-14 [animation:marquee_70s_linear_infinite] motion-reduce:[animation:none]">
        {strip.map((src, i) => (
          <div key={`${src}-${i}`} className="relative h-8 w-24 shrink-0">
            <Image
              src={src}
              alt=""
              fill
              sizes="96px"
              className="object-contain opacity-65 transition-opacity duration-300 hover:opacity-100"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
