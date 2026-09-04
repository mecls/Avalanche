import type { Metadata } from "next";
import { CtaBand } from "@/components/site/cta-band";
import { SolutionsSteps } from "@/components/sections/solutions-steps";
import { secondariesView } from "@/content/solutions";

export const metadata: Metadata = {
  title: "Secondaries",
  description:
    "Secondary liquidity for GPs, LPs, and shareholders seeking an exit ahead of the end of a fund's life.",
};

/**
 * The Secondaries view. Identical to ../fundraising/page.tsx but for the
 * content object — see the notes there and in content/solutions.ts.
 *
 * ITS BLOCK COPY IS PLACEHOLDER and says so on the page. The heading and lede
 * are real (if DRAFT) Avalanche strings, so the route is not empty and the
 * toggle lands somewhere sensible, but the five blocks are awaiting approved
 * copy. Do not promote them to final without it.
 */
export default function SolutionsSecondariesPage() {
  return (
    <>
      <SolutionsSteps view={secondariesView} active="secondaries" />
      <CtaBand />
    </>
  );
}
