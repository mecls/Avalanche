import { CtaButton } from "@/components/ui/button";
import { hero } from "@/content/copy";
import { LogoMarquee } from "@/components/ui/logo-marquee";

/**
 * Full-bleed background video behind the headline.
 *
 * Server component — no JS. The poster sits on the wrapper as a background
 * image and the video paints over it, so hiding the video under
 * `prefers-reduced-motion` (see globals.css) leaves the still frame in place
 * with no script and no flash.
 *
 * `muted` and `playsInline` are both load-bearing: iOS Safari refuses to
 * autoplay without them. `poster` also covers the gap before first frame.
 *
 * Height is `min-h-svh`, not `vh`: on mobile the collapsing URL bar changes
 * `vh` mid-scroll and the hero would visibly resize under the reader.
 */
export function Hero() {
  return (
    <section className="relative isolate -mt-[var(--header-h)] flex min-h-svh flex-col justify-end overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-ground bg-cover bg-center"
        style={{ backgroundImage: "url(/video/hero-poster.webp)" }}
      >
        <video
          className="hero-video h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/video/hero-poster.webp"
          tabIndex={-1}
        >
          {/* `media` filters the source list before selection, so under
              reduced motion nothing is fetched at all — not fetched and then
              hidden. The poster behind is already doing the work. */}
          <source
            src="/video/hero.webm"
            type="video/webm"
            media="(prefers-reduced-motion: no-preference)"
          />
          <source
            src="/video/hero.mp4"
            type="video/mp4"
            media="(prefers-reduced-motion: no-preference)"
          />
        </video>
      </div>

      {/* Scrim. Not a uniform wash — it tracks the footage, and these numbers
          are specific to THIS clip. Re-derive them if you swap the source.

          Mean luma per band of the desktop crop, converted from the clip's
          limited-range Y' to 8-bit sRGB:

            0-11%    header     120   <- the fixed header sits in this
            11-25%   sky        142
            25-40%   sun        159
            40-65%   water      142
            65-80%   headline    98
            80-100%  strip       87

          Those are means, and the mean is not what binds. The sun's specular
          path on the water is blown to (253,254,251) and drifts under the text
          as the camera moves, so every run is measured against the brightest
          COLUMN it crosses. That is why the text band sits at 0.60 rather than
          the 0.42 the means would suggest, and why every run here is white
          (see the block below).

          Two anchors are deliberate and neither is a percentage:

          - the second stop uses --header-h, so the dark band tracks the header
            itself. At a fixed 11% it rides up above the announcement strip on
            a short laptop window and leaves the nav links on bare sky.
          - the lower stops are anchored to the BOTTOM. The text block is
            bottom-pinned (`justify-end`), so its distance from the foot is
            fixed while its percentage position slides with the viewport; a
            percentage trough drifts up under the eyebrow on a short window and
            drops it below AA. 730px is where the eyebrow starts — remeasure it
            if the type sizes in this block change. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "linear-gradient(to bottom," +
            "rgba(8,8,8,0.93) 0," +
            "rgba(8,8,8,0.80) var(--header-h)," +
            "rgba(8,8,8,0.60) max(calc(var(--header-h) + 40px), calc(100% - 730px))," +
            "rgba(8,8,8,0.62) calc(100% - 110px)," +
            "rgba(8,8,8,0.70) 100%)",
        }}
      />

      <div className="shell relative pt-40 pb-20 sm:pt-48 sm:pb-24">
        {/* EVERY text run in this hero is `fg`, and none of them is `fg-muted`
            or `fg-faint` as it would be anywhere else on the site. That is one
            rule, not five exceptions, and it is worth understanding before
            "restoring" any of them.

            The muted and faint tokens are calibrated against the flat grounds
            in globals.css, where the background is one known colour. Here the
            background is a photograph, so contrast has to be measured against
            the brightest column each run crosses, not the mean under it — and
            this clip has the sun's specular reflection on the water blown to
            (253,254,251), which drifts directly beneath the text. Measured
            that way #a3a3ae lands at 1.8-3.7:1 depending on the run, and on
            mobile, where the crop lands squarely on the sun path, the stat
            label hits 2.3:1.

            Holding those at AA with the scrim instead would need roughly 0.78
            alpha across the whole text band, which flattens the shot into a
            grey wash. White clears every run at 5.6:1 or better with the scrim
            at 0.60. Hierarchy is carried by size, weight and measure — colour
            hierarchy does not survive on a photograph. */}
        <div className="max-w-4xl">
          <p className="eyebrow rise text-fg">{hero.eyebrow}</p>

          <h1 className="display rise mt-6 text-[clamp(2.75rem,7vw,5.25rem)] text-balance [animation-delay:80ms]">
            {hero.title}
          </h1>

          <p className="rise mt-7 max-w-xl text-[1.1875rem] leading-relaxed text-fg [animation-delay:160ms]">
            {hero.lede}
          </p>
        </div>

        {/* The CTA row spans the full shell rather than the headline's
            measure, so the stat can sit against the right edge. `items-center`
            centres the stat block against the button, which is the alignment
            the reference uses. Below `sm` they stack and the stat goes left. */}
        <div className="rise mt-9 flex flex-wrap items-center justify-between gap-x-10 gap-y-8 [animation-delay:240ms]">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <CtaButton href="#get-in-touch">{hero.cta}</CtaButton>
            <p className="text-sm text-fg">{hero.ctaNote}</p>
          </div>

          <div className="text-left sm:text-right">
            <p className="display text-[clamp(2.25rem,4.4vw,3.5rem)] whitespace-nowrap">
              {hero.stat.value}
            </p>
            <p className="mt-2 max-w-[18rem] text-[0.9375rem] leading-snug text-fg">
              {hero.stat.label}
            </p>
          </div>
        </div>
      </div>

      {/* Client strip at the foot of the hero. No background of its own — the
          video is the background, which is the whole point.

          It sits INSIDE `shell`, so its rule and its logos start and end on the
          same margins as the headline and the CTA row above. It used to break
          out to the full viewport width; aligning it to the text is what the
          reference does, and full-bleed read as a separate band bolted on
          rather than as the foot of this one. The marquee's edge mask is a
          percentage, so it still has room to work in the narrower box. */}
      <div className="rise shell [animation-delay:400ms]">
        <div className="border-t border-line py-7">
          <LogoMarquee />
        </div>
      </div>
    </section>
  );
}
