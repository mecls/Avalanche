import type { Metadata } from "next";
import { CaseStudyGrid } from "@/components/sections/case-study-grid";
import { LogoGrid } from "@/components/sections/logo-grid";
import { TrackRecord } from "@/components/sections/track-record";
import { CtaBand } from "@/components/site/cta-band";
import { ArrowGlyph, CtaButton } from "@/components/ui/button";
import { LogoMarquee } from "@/components/ui/logo-marquee";
import { SectionHeading } from "@/components/ui/section-heading";
import { customers, whoWeServe } from "@/content/copy";
import { ecosystemLogos } from "@/content/ecosystem-logos";

export const metadata: Metadata = {
  title: "Customers",
  description:
    "Placement agents, boutique investment banks, emerging fund managers, and founding teams raising from HNWIs, family offices, and institutional investors.",
};

/**
 * Sections follow fundraisr.ai/customers: a page header, a short framing band,
 * the searchable case-study tiles, the figures as ruled rows, then the client
 * roster as a ruled grid.
 *
 * The HEADER no longer does. It was a full-height statement hero built from its
 * own parts, and it was the only page on the site whose opening was not made of
 * the shared ones — see the comment on the section itself. Reference fidelity
 * lost to house consistency there on purpose.
 *
 * Bands alternate light / light / dark / dark / light, as the reference does.
 * Two things had to be built before that was safe, and both will bite anyone
 * moving these sections around:
 *
 *  - the fixed header sits outside every section, so it cannot inherit a
 *    band's tokens. It measures the band under its own bottom edge instead
 *    (see components/site/nav.tsx) and is never transparent over a light one.
 *  - the client marks are white-on-transparent and are inverted on light
 *    bands by the `logo-mark` rule in globals.css. The CASE marks are not,
 *    which is the reason the tile grid stays dark: they have no such rule,
 *    and the tiles read as tiles only against a darker ground anyway.
 */
export default function CustomersPage() {
  return (
    <>
      {/* The page header is the SAME construction as /solutions — same
          `page-label` run, same 72px H1 on the same 809px step-down, same
          16/24 lede, same 720/680 measures, same `items-end` row with the CTA
          hard right. Both were separate builds until 4 Sep 2026 and had drifted
          to three different values in every row: 64px vs 80px H1 (both now 72px), a 600-weight
          grey label against a 500-weight ink one, a 15px lede against a 16px
          one, a 576px column against 720. Keep them in step — if this header
          changes, /solutions changes with it.

          This is also why the section is no longer
          `min-h-[calc(100dvh-var(--header-h))]`. That full-height statement
          came from matching fundraisr.ai/customers section for section, and it
          is what left ~950px with the whole right half empty: nothing sat
          opposite the heading, where the hero puts its stat and /solutions its
          button. The CTA moved up into that column and the fixed
          100/48 rhythm replaced the fold. */}
      <section data-band="light" className="flex flex-col overflow-hidden">
        <div className="shell flex flex-col items-center justify-center gap-2.5 overflow-clip pt-[100px] pb-12 max-[809px]:pt-[60px] max-[809px]:pb-8">
          <div className="flex w-full flex-row items-end justify-center gap-6 max-[809px]:flex-col max-[809px]:items-start max-[809px]:gap-8">
            <div className="flex flex-1 flex-col items-start justify-center gap-4 overflow-clip max-[809px]:w-full max-[809px]:flex-none">
              {/* Accented like /solutions' and like every section eyebrow. */}
              <p className="page-label text-accent">{customers.eyebrow}</p>

              <div className="max-w-[720px]">
                <h1 className="display display-72 text-[72px]">
                  {customers.title}
                </h1>
              </div>

              <div className="max-w-[680px]">
                <p className="text-[16px] leading-6 text-fg-muted">
                  {customers.lede}
                </p>
              </div>
            </div>

            <div className="flex shrink-0 items-center">
              <CtaButton href="#get-in-touch" className="group">
                Book a call
                <ArrowGlyph />
              </CtaButton>
            </div>
          </div>
        </div>

        {/* Venture strip across the foot of the header.

            INSIDE `shell`, unlike the hero's strip on the homepage. That one
            is full-bleed on purpose — it sits on its own translucent band over
            the video, where running edge to edge is the point. This one sits
            on the same flat white as the heading above it, and full-bleed left
            it as the only thing on the page not lining up with the text: the
            marks started at the viewport edge while "CUSTOMERS" and the H1
            started at the shell. Both the rule and the marks are now shell
            width, so the strip reads as part of the header rather than as a
            band under it.

            The marquee does not care. Its `overflow-hidden` clip and its
            8%/92% mask are both relative to its own box, and the scroll
            distance is set by the content rather than the container, so
            narrowing it changes neither the fade nor the speed.

            These are the ecosystem marks, NOT the client roster: full colour,
            and no `logo-mark`, since inverting them would blow them out to
            white on this band. See content/ecosystem-logos.ts.

            The strip runs unlabelled by request. `customers.ecosystemNote` is
            the caption it used to carry, kept in place should it come back. */}
        <div className="shell">
          <div className="border-t border-line-soft py-10">
            <LogoMarquee
              logos={ecosystemLogos}
              alphaMarks={false}
              itemClassName="h-9 w-32"
            />
          </div>
        </div>
      </section>

      <section data-band="light" className="section-y border-t border-line">
        <div className="shell">
          <SectionHeading
            title={customers.gridTitle}
            accent="billion-dollar deal books."
            lede={customers.gridLede}
          />
        </div>
      </section>

      <section className="section-y bg-ground-deep">
        <div className="shell">
          <CaseStudyGrid />
        </div>
      </section>

      <TrackRecord variant="rows" />

      <section data-band="light" className="section-y">
        <div className="shell">
          {/* Heading left, framing paragraph right — the reference sets the
              two against each other rather than stacking them. */}
          <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
            <div>
              <p className="eyebrow mb-5">{customers.trustedByEyebrow}</p>
              <h2 className="display text-[clamp(2.25rem,4vw,3.25rem)] text-balance">
                {customers.trustedByTitle}
              </h2>
            </div>
            <p className="text-[0.9375rem] leading-relaxed text-fg-muted lg:pt-12">
              {whoWeServe.lede}
            </p>
          </div>

          <div className="mt-14 sm:mt-16">
            <LogoGrid />
          </div>

          {/* The client disclaimer sits here, with the client marks. The strip
              in the hero is a different set and carries its own, narrower
              caption — the two claims are not interchangeable. */}
          <p className="mt-8 text-[0.6875rem] text-fg-faint">
            {customers.logoNote}
          </p>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
