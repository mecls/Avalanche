import type { Metadata } from "next";
import { CtaBand } from "@/components/site/cta-band";
import { SolutionsSteps } from "@/components/sections/solutions-steps";
import { RaiseTypes } from "@/components/sections/raise-types";
import { fundraisingView } from "@/content/solutions";

export const metadata: Metadata = {
  title: "Fundraising",
  // REWRITTEN TWICE ON 9 Sep 2026, both times because the page moved under it.
  // It read "deal packaging, investor sourcing across 1.2 million profiles,
  // personalised outreach, pipeline management, and meeting intelligence" — a
  // feature list for a platform, from the same fundraisr source as the old
  // header, citing a database figure this page no longer makes. The first
  // rewrite kept the last three of those; blocks 04 and 05 were then removed,
  // so it now names the three steps the page actually has. A description is
  // the one piece of copy invisible on its own page, which is exactly how it
  // outlives it — keep it in step with `fundraisingView` in
  // content/solutions.ts.
  description:
    "Our validated approach to raising capital, tailored to our segment of the market: deal readiness, investor introductions across the US, Europe and the Middle East, and hands-on support through to a signed commitment.",
};

/**
 * One of the two /solutions views. Its twin is ../secondaries/page.tsx and the
 * two are deliberately identical but for the content object they pass — see
 * content/solutions.ts for why this is two routes rather than one page with a
 * tab.
 *
 * `SolutionsSteps` must stay the FIRST child of `main`: the header reads
 * `main > :first-child[data-band="light"]` to know it is over a white band and
 * switch its type to ink, and globals.css paints `main` to match. It also
 * carries its own vertical rhythm (100/48 above, 20/100 below), which is why
 * it is not wrapped in `section-y`.
 *
 * `RaiseTypes` IS ON THIS ROUTE AND NOT ON ITS TWIN. It sat on the homepage
 * until 8 Sep 2026 and moved here by request: it lists the raise shapes we
 * run, which is a fundraising argument rather than a statement about who the
 * firm is for. ../secondaries/page.tsx deliberately does not mount it — none
 * of those five entries is a secondary — which makes this the one place the
 * two routes are no longer identical but for their content object. It already
 * carries its own `border-t` and light band, so it needs nothing here.
 */
export default function SolutionsFundraisingPage() {
  return (
    <>
      <SolutionsSteps view={fundraisingView} />
      <RaiseTypes />
      <CtaBand />
    </>
  );
}
