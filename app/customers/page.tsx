import type { Metadata } from "next";
import { CaseStudyGrid } from "@/components/sections/case-study-grid";
import { LogoGrid } from "@/components/sections/logo-grid";
import { TrackRecord } from "@/components/sections/track-record";
import { CtaBand } from "@/components/site/cta-band";
import { PageHeader } from "@/components/site/page-header";
import { customers } from "@/content/copy";

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
 * the shared ones - see the comment on the section itself. Reference fidelity
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
      {/* The page header is the shared construction - see
          components/site/page-header.tsx, which carries the drift history
          that is the reason it is a component.

          This section is no longer
          `min-h-[calc(100dvh-var(--header-h))]`. That full-height statement
          came from matching fundraisr.ai/customers section for section, and
          it is what left ~950px with the whole right half empty: nothing sat
          opposite the heading, where the hero puts its stat and /solutions
          its button. The CTA moved up into that column and the fixed
          100/48 rhythm replaced the fold. */}
      {/* `pb-16` ON TOP OF THE HEADER'S OWN `pb-12`, i.e. 112px under the
          lede and the button before the dark grid begins (9 Sep 2026, by
          request). The header's 48px was tuned when the venture strip sat
          below it and supplied ~116px of its own - a border, `py-10` and a
          36px row of marks. With the strip gone that 48px put the tile grid
          almost against the button.

          **IT IS ON THE SECTION, NOT IN `PageHeader`.** That component is
          shared by /customers, /about and both /solutions routes, and the
          other three did not lose anything below their headers; raising its
          `pb` would move all four to fix one. This is exactly the case the
          component's split exists for - it renders the inner `shell` div and
          leaves the `<section>` to the caller. 112px also sits close to the
          100px above the eyebrow, so the header reads as evenly set rather
          than bottom-heavy. */}
      <section data-band="light" className="pb-16">
        <PageHeader
          eyebrow={customers.eyebrow}
          title={customers.title}
          lede={customers.lede}
          cta={customers.cta}
        />

        {/* THE VENTURE STRIP WAS REMOVED HERE (9 Sep 2026, by request) - a
            shell-width `LogoMarquee` of the ecosystem marks under a
            `border-t`, at the foot of the header. `content/ecosystem-logos.ts`
            and `public/logos/ecosystem/` are kept, and so is
            `scripts/fetch-ecosystem-logos.mjs` that built them; nothing on the
            site renders them now. `customers.ecosystemNote` was already its
            unrendered caption.

            THE SECTION LOST `flex flex-col overflow-hidden` WITH IT, and that
            is not tidying for its own sake: those three were on this section
            and no other page header's, because the strip was a second child
            that had to be laid out under the header and clipped. One child is
            left, so they say nothing. `data-band="light"` STAYS and is the
            load-bearing half - two rules in globals.css key off
            `main > :first-child[data-band="light"]`, one flipping the nav's
            type to ink and one painting `main`, and they fail together with
            the whole nav rendering white on white.

            What the reader gets instead is the header's own `pb-12` and then
            the dark tile grid. The light-to-dark cut is the separation now;
            the rule the strip carried went with it. */}
      </section>

      {/* THE GRID'S HEADING SECTION WAS REMOVED HERE (9 Sep 2026, by request).
          It was a `SectionHeading` alone in its own light band - "From first
          mandate to billion-dollar deal books." over a line about working
          across venture, private credit, real estate and private equity. Both
          strings are kept, unrendered, as `customers.gridTitle` / `gridLede`.

          Two things it took with it. The light header now runs straight into
          the dark tile grid with no band between them, which is the same cut
          /about makes under its own header and wants no softening. And the
          GRID SECTION IS NOW UNHEADED: `CaseStudyGrid` renders a search box, a
          category select and the tiles, and nothing names the block - so the
          page's outline goes from the H1 to the "Trusted by" H2 with the
          largest section on the page carrying no heading of its own. That is
          the state that was asked for; if a screen-reader label is ever wanted
          without the display heading coming back, an `aria-label` on the
          section is the cheap way to it. */}
      <section className="section-y bg-ground-deep">
        <div className="shell">
          <CaseStudyGrid />
        </div>
      </section>

      <TrackRecord variant="rows" />

      <section data-band="light" className="section-y">
        <div className="shell">
          {/* Heading left, framing paragraph right - the reference sets the
              two against each other rather than stacking them. */}
          <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
            <div>
              <p className="eyebrow mb-5">{customers.trustedByEyebrow}</p>
              <h2 className="display text-[clamp(2.25rem,4vw,3.25rem)] text-balance">
                {customers.trustedByTitle}
              </h2>
            </div>
            {/* `customers.trustedByBody`, NOT `whoWeServe.lede` - it was the
                latter until 8 Sep 2026, when that key was rewritten to
                describe investor types. This paragraph sits over a grid of
                CLIENT marks and has to keep naming who hires Avalanche; see
                the note on the key. */}
            <p className="text-[0.9375rem] leading-relaxed text-fg-muted lg:pt-12">
              {customers.trustedByBody}
            </p>
          </div>

          <div className="mt-14 sm:mt-16">
            <LogoGrid />
          </div>

          {/* The client disclaimer sits here, with the client marks. The strip
              in the hero is a different set and carries its own, narrower
              caption - the two claims are not interchangeable. */}
          <p className="mt-8 text-[0.6875rem] text-fg-faint">
            {customers.logoNote}
          </p>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
