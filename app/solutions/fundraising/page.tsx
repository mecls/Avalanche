import type { Metadata } from "next";
import { CtaBand } from "@/components/site/cta-band";
import { SolutionsSteps } from "@/components/sections/solutions-steps";
import { fundraisingView } from "@/content/solutions";

export const metadata: Metadata = {
  title: "Fundraising",
  description:
    "Primary capital raises run end to end: deal packaging, investor sourcing across 1.2 million profiles, personalised outreach, pipeline management, and meeting intelligence.",
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
 */
export default function SolutionsFundraisingPage() {
  return (
    <>
      <SolutionsSteps view={fundraisingView} />
      <CtaBand />
    </>
  );
}
