import { CtaButton } from "@/components/ui/button";
import { ctaBand, site } from "@/content/copy";

/**
 * "Start with a consultation" — the closing block, directly above the footer,
 * and the anchor target for every CTA on the site.
 *
 * Full-bleed and image-backed, matching the reference. The background is the
 * HERO POSTER, not a second <video>: this block sits at the very bottom of a
 * long page, so a second autoplaying video would decode continuously for
 * something most readers never reach, and the still already exists and is
 * already cached from the hero's own poster.
 *
 * It carries the same three-layer stack as the hero — image, scrim, grain —
 * for the same reason: one long gradient over a wide box bands without the
 * grain to dither it.
 *
 * The scrim here is left-weighted rather than vertical, because unlike the
 * hero the text sits in a single left column and the right half of the frame
 * is free to stay open.
 */
export function CtaBand() {
  return (
    <section
      id="get-in-touch"
      className="relative isolate flex scroll-mt-28 flex-col justify-center overflow-clip py-24 sm:py-28"
    >
      <div
        aria-hidden
        className="absolute inset-0 z-0 bg-ground bg-cover bg-center"
        style={{ backgroundImage: "url(/video/hero-poster.webp)" }}
      />

      {/* Two scrims. The first is a flat floor so the block never drops below
          the page ground; the second is the left-weighted ramp that carries
          the type. Measured: white on the darkest column clears AA with room,
          and the right half stays open. */}
      <div
        aria-hidden
        className="absolute inset-0 z-[1]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(21,21,21,0.92) 0%, rgba(21,21,21,0.80) 38%, rgba(21,21,21,0.55) 72%, rgba(21,21,21,0.45) 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 z-[2]"
        style={{
          backgroundImage: "url(/grain.png)",
          backgroundSize: "256px auto",
          backgroundRepeat: "repeat",
        }}
      />

      <div className="shell relative z-10">
        {/* Eyebrow as a glyph + label, the way the reference opens the block.
            The glyph is a square chip so the row reads as one unit. */}
        <div className="flex items-center gap-3">
          <span
            aria-hidden
            className="flex h-9 w-9 shrink-0 items-center justify-center bg-white/10 backdrop-blur-[5px]"
          >
            <svg
              viewBox="0 0 16 16"
              className="h-3.5 w-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                d="M4 12L12 4M12 4H5.5M12 4v6.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <p className="text-[14px] leading-[19.6px] font-semibold tracking-[0.06em] text-white uppercase">
            {ctaBand.eyebrow}
          </p>
        </div>

        <h2 className="display mt-10 max-w-[16ch] text-[clamp(2.5rem,4.4vw,3.625rem)] text-white">
          {ctaBand.title}
        </h2>

        <p className="mt-6 max-w-[34rem] text-[18px] leading-[27px] text-white">
          {ctaBand.body}
        </p>

        {/* Button hard left, caption hard right, sharing a baseline — the
            same bottom-aligned pairing the hero uses. They stack below `sm`,
            where there is no room to read across. */}
        <div className="mt-14 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between sm:gap-10">
          <CtaButton href={site.booking} target="_blank" rel="noreferrer">
            {ctaBand.cta}
          </CtaButton>

          <p className="flex items-center gap-2.5 text-[14px] leading-[21px] text-white italic">
            <span
              aria-hidden
              className="h-2 w-2 shrink-0 rounded-full bg-live shadow-[0_0_8px_rgba(74,222,128,0.6)]"
            />
            {ctaBand.note}
          </p>
        </div>
      </div>
    </section>
  );
}
