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

      {/* Scrim. The footage is warm and busy, so this pins the type to AA.
          Four stops rather than three: it stays >=0.72 through the headline and
          CTA, then eases to 0.86 at the foot so the video still reads behind
          the client strip instead of it sitting on solid black. It never
          reaches 1 — at 0.86 over footage this dark the seam with the next
          section is imperceptible, and it is measured below. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgba(8,8,8,0.80)_0%,rgba(8,8,8,0.74)_42%,rgba(8,8,8,0.78)_74%,rgba(8,8,8,0.86)_100%)]"
      />

      <div className="shell relative pt-40 pb-20 sm:pt-48 sm:pb-24">
        <div className="max-w-3xl">
          <p className="eyebrow rise">{hero.eyebrow}</p>

          <h1 className="display rise mt-6 text-[clamp(2.5rem,6.5vw,4.5rem)] text-balance [animation-delay:80ms]">
            {hero.title}
          </h1>

          <p className="rise mt-7 max-w-xl text-[1.0625rem] leading-relaxed text-fg-muted [animation-delay:160ms]">
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
            <p className="text-[0.8125rem] text-fg-faint">{hero.ctaNote}</p>
          </div>

          <div className="text-left sm:text-right">
            <p className="display text-[clamp(2rem,4vw,3rem)] whitespace-nowrap">
              {hero.stat.value}
            </p>
            <p className="mt-1.5 max-w-[17rem] text-sm leading-snug text-fg-muted">
              {hero.stat.label}
            </p>
          </div>
        </div>
      </div>

      {/* Client strip at the foot of the hero. No background of its own — the
          video is the background, which is the whole point. It breaks out of
          `shell` so the marquee runs the full width and its edge mask has room
          to work. */}
      <div className="rise relative w-full border-t border-line pt-8 pb-10 [animation-delay:400ms]">
        <div className="shell">
          <p className="eyebrow text-center">Active clients</p>
        </div>
        <LogoMarquee className="mt-7" />
      </div>
    </section>
  );
}
