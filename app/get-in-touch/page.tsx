import type { Metadata } from "next";
import { ContactForm } from "@/components/sections/contact-form";
import { Faqs } from "@/components/sections/faqs";
import { CtaBand } from "@/components/site/cta-band";
import { contact } from "@/content/contact";
import { site } from "@/content/copy";

export const metadata: Metadata = {
  title: "Get in touch",
  description:
    "Share your raise and we'll explore if there's a fit. Nine questions on target amount, structure, timeline and budget.",
};

/**
 * /get-in-touch — the destination behind every CTA on the site.
 *
 * IT REPLACES AN ANCHOR. Until 5 September 2026 `#get-in-touch` was the id on
 * the closing band, and every CTA scrolled to it; the band's own button then
 * sent people to an external scheduler. The CTAs now come here instead. The
 * band stays on every other page — it is the closing furniture, not the
 * conversion mechanism — and its id is kept so an old `/#get-in-touch` link
 * still lands somewhere sensible.
 *
 * IT ENDS THE WAY EVERY OTHER ROUTE ENDS — FAQ, then the closing band, then
 * the footer. It shipped without the band, on the reasoning that the band's
 * job is to send people here and it would therefore be a button pointing at
 * the page you are already on. That was overruled (6 Sep 2026): the ending is
 * furniture and the site should not have one page that stops differently.
 * The band takes a `ctaHref` now, and this page passes `#questionnaire`, so
 * its button scrolls back up to the form instead of reloading the route. That
 * is also why the opening section carries an id it otherwise would not need.
 *
 * The FAQ stays where it is, above the band, which is both the homepage's
 * order and what a contact page wants — the questions people ask before
 * filling in a form are the ones already answered on the homepage.
 *
 * The header is NOT `components/site/page-header.tsx`. That component is one
 * composition — label, H1, lede, and a CTA bottom-right on an `items-end` row
 * — and this page has a form in the right column and no header CTA at all.
 * The type utilities are the same ones by hand so the two still read as one
 * family; if the 72px/720px header spec ever moves, move this with it.
 */
export default function GetInTouchPage() {
  return (
    <>
      {/* A STILL, not a video, and the section is DARK because of it — it
          carries no `data-band`, so it inherits the root tokens.

          It shipped as a background video on 6 Sep 2026 and became a still
          the same day, by request. What is left is the same three-layer
          stack the hero and the closing band use, minus the <video>: image
          (0), scrim (1), grain (2), content (10). `scripts/optimize-bg-video.mjs`
          still holds the measurements the video needed, because a source
          this one cannot loop on a straight cut and the next person to reach
          for a video here will need them.

          `-mt-[var(--header-h)]` pulls the section under the transparent nav
          so the image is full-bleed, exactly as the hero does; the header
          height is added back to the content's top padding.

          `min-h-dvh` rather than the hero's exact `h-dvh`, and the difference
          matters here. The hero's composition depends on an exact height — its
          content box is `calc(100% - 100px)` reserving the logo band, and a
          min-height would push that band off the fold. This section has no
          such reservation and its card GROWS: the six-option question is
          taller than the one-field one, and on a short laptop that can exceed
          the viewport. An exact height would clip it. `justify-center` then
          centres the content, and the asymmetric padding (header height plus
          100 above, 100 below) biases it down by about half the nav so it
          reads centred BELOW the chrome rather than behind it.

          The image is the LAST FRAME of the source clip: the camera has
          pulled fully back onto the lift's viewing platform against the Carmo
          ruins, and the blown sun flare from the first half of the clip has
          gone — which is what makes white type over the left of it work. */}
      <section
        id="questionnaire"
        className="relative isolate -mt-[var(--header-h)] flex min-h-dvh flex-col justify-center overflow-clip bg-ground"
      >
        <div
          aria-hidden
          className="absolute inset-0 z-0 bg-ground bg-cover bg-center"
          style={{ backgroundImage: "url(/video/contact-bg.webp)" }}
        />

        {/* TWO scrims, switched at the same breakpoint as the layout, and
            that pairing is the point.

            From `lg` up the type sits in the left column and the right half
            carries an opaque card, so the gradient runs left-weighted and lets
            the footage come up on the right — the closing band's approach.

            BELOW `lg` THE LAYOUT STACKS AND THE TYPE SPANS THE FULL WIDTH, so
            its right end lands in the light end of that same gradient — 4.23:1
            on a 390px phone and 2.93:1 on a 768px tablet against a 4.5 floor,
            measured while this was still a video. So the stacked layout gets a
            vertical scrim instead, dark across the whole width.

            The horizontal stops hold the dark to 72% rather than 66%, which
            is about the STILL rather than the video it replaced: the last
            frame of that clip puts open sky exactly where the text sits, and
            the tightest case is a 1024px laptop, where the two-column grid is
            live but each column is only 460px so the run reaches 47% of the
            width. At the old stops that measured 4.84:1 — passing, but too
            thin to leave alone.

            Both are measured, not assumed. Re-measure if the footage, the
            gradient or the breakpoint changes — the method is in the README. */}
        <div
          aria-hidden
          className="absolute inset-0 z-[1] lg:hidden"
          style={{
            backgroundImage:
              "linear-gradient(rgba(21,21,21,0.82) 0%, rgba(21,21,21,0.70) 100%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 z-[1] hidden lg:block"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(21,21,21,0.87) 0%, rgba(21,21,21,0.83) 34%, rgba(21,21,21,0.68) 72%, rgba(21,21,21,0.58) 100%)",
          }}
        />

        {/* One long gradient over a wide box bands on an 8-bit display; the
            grain dithers it. Same tile as the hero and the closing band. */}
        <div
          aria-hidden
          className="absolute inset-0 z-[2]"
          style={{
            backgroundImage: "url(/grain.png)",
            backgroundSize: "256px auto",
            backgroundRepeat: "repeat",
          }}
        />

        <div className="shell relative z-10 grid items-center gap-12 pt-[calc(100px+var(--header-h))] pb-[100px] max-[809px]:pt-[calc(60px+var(--header-h))] max-[809px]:pb-[60px] lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col items-start gap-4">
            {/* Monochrome, NOT `text-accent`, and that follows the hero's rule
                rather than breaking the page-label one: contrast over moving
                footage has to be measured against the brightest column each
                run crosses, and the accent is the one place the palette puts
                small type in colour. The other three page labels sit on flat
                bands and keep the accent. */}
            <p className="page-label text-white">{contact.eyebrow}</p>

            <h1 className="display display-72 text-[72px] text-white">
              {contact.title}
            </h1>

            <p className="max-w-[520px] text-[16px] leading-6 text-white">
              {contact.lede}
            </p>

            {/* TODO(miguel): an email address and a phone number go here when
                they exist — see content/contact.ts. Nothing is invented in the
                meantime, so this offers the one public channel the repo has. */}
            <div className="mt-6 w-full max-w-[520px] border-t border-white/20 pt-6">
              <p className="text-sm text-white/70">{contact.asideLabel}</p>
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-[16px] leading-6 text-white underline underline-offset-4 transition-colors hover:text-white/70"
              >
                LinkedIn
              </a>
            </div>
          </div>

          <ContactForm />
        </div>
      </section>

      <Faqs />
      <CtaBand ctaHref="#questionnaire" />
    </>
  );
}
