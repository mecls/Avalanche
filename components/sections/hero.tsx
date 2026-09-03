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

      {/* Scrim. Not a uniform wash — it tracks the footage, which is a golden
          hour aerial and so runs BRIGHT at the top and dark at the foot. That
          is the opposite way round from the shot this hero used to carry, so
          if you swap the source again, re-measure before reusing these stops.

          Mean luma per band of the desktop crop, converted from the clip's
          limited-range Y' to 8-bit sRGB:

            0-25%    sky        193   <- the header sits in this
            25-40%   skyline     92
            40-65%   city/water  78
            65-80%   headline    65
            80-100%  strip       48

          The stops are what each band needs to keep its text at AA, and the
          binding constraint is nowhere near the headline — it is the two small
          `fg-faint` runs. #8b8b96 needs a background at or below 38 for 4.5:1,
          which over a 193 sky is 0.84 alpha, hence the very heavy top. The
          second stop is anchored to --header-h rather than to a percentage so
          the dark band tracks the header itself: at 11% it would ride up above
          the announcement strip on a short laptop window and leave the nav
          links on bare sky.

          The lower stops are anchored to the BOTTOM, not to percentages. The
          text block is bottom-pinned (`justify-end`), so its distance from the
          foot is fixed while its percentage position slides with the viewport
          — on a short window a percentage trough drifts up under the eyebrow
          and drops it below AA. 620px is where the eyebrow starts.

          Between the header and that trough it opens to 0.42, because that
          band is only sky and carries nothing. This is the part that lets the
          shot read as a shot rather than as texture. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "linear-gradient(to bottom," +
            "rgba(8,8,8,0.90) 0," +
            "rgba(8,8,8,0.80) var(--header-h)," +
            "rgba(8,8,8,0.60) max(calc(var(--header-h) + 40px), calc(100% - 620px))," +
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
        <div className="max-w-3xl">
          <p className="eyebrow rise text-fg">{hero.eyebrow}</p>

          <h1 className="display rise mt-6 text-[clamp(2.5rem,6.5vw,4.5rem)] text-balance [animation-delay:80ms]">
            {hero.title}
          </h1>

          <p className="rise mt-7 max-w-xl text-[1.0625rem] leading-relaxed text-fg [animation-delay:160ms]">
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
            <p className="text-[0.8125rem] text-fg">{hero.ctaNote}</p>
          </div>

          <div className="text-left sm:text-right">
            <p className="display text-[clamp(2rem,4vw,3rem)] whitespace-nowrap">
              {hero.stat.value}
            </p>
            <p className="mt-1.5 max-w-[17rem] text-sm leading-snug text-fg">
              {hero.stat.label}
            </p>
          </div>
        </div>
      </div>

      {/* Client strip at the foot of the hero. No background of its own — the
          video is the background, which is the whole point. It breaks out of
          `shell` so the marquee runs the full width and its edge mask has room
          to work. */}
      <div className="rise relative w-full border-t border-line py-7 [animation-delay:400ms]">
        <LogoMarquee />
      </div>
    </section>
  );
}
