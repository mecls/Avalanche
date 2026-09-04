import type { Metadata } from "next";
import { CaseStudyGrid } from "@/components/sections/case-study-grid";
import { LogoGrid } from "@/components/sections/logo-grid";
import { TrackRecord } from "@/components/sections/track-record";
import { CtaBand } from "@/components/site/cta-band";
import { CtaButton } from "@/components/ui/button";
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
 * Modelled on fundraisr.ai/customers, section for section: a full-height
 * statement hero, a short framing band, the searchable case-study tiles, the
 * figures as ruled rows, then the client roster as a ruled grid.
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
      {/* Full height less the header, so the statement holds the fold on its
          own the way the reference's does. */}
      <section
        data-band="light"
        className="flex min-h-[calc(100dvh-var(--header-h))] flex-col overflow-hidden"
      >
        <div className="shell flex flex-1 items-center py-20">
          <div className="max-w-xl">
            <p className="eyebrow">{customers.eyebrow}</p>
            <h1 className="display mt-6 text-[clamp(2.5rem,6vw,4rem)] text-balance">
              {customers.title}
            </h1>
            <p className="mt-7 text-[0.9375rem] leading-relaxed text-fg-muted">
              {customers.lede}
            </p>
            <div className="mt-10">
              <CtaButton href="#get-in-touch">Book a call</CtaButton>
            </div>
          </div>
        </div>

        {/* Venture strip across the foot of the hero, as the reference has it.
            It breaks out of `shell` so the marquee runs the full width and its
            edge mask has room to work.

            These are the ecosystem marks, NOT the client roster: full colour,
            and no `logo-mark`, since inverting them would blow them out to
            white on this band. See content/ecosystem-logos.ts.

            The strip runs unlabelled by request. `customers.ecosystemNote` is
            the caption it used to carry, kept in place should it come back. */}
        <div className="w-full border-t border-line-soft py-10">
          <LogoMarquee
            logos={ecosystemLogos}
            alphaMarks={false}
            itemClassName="h-9 w-32"
          />
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
              <h2 className="display text-[clamp(2.5rem,4.4vw,3.625rem)] text-balance">
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
