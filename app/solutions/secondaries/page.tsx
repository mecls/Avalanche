import type { Metadata } from "next";
import { CtaBand } from "@/components/site/cta-band";
import { DirectAccess } from "@/components/sections/direct-access";
import { SolutionsSteps } from "@/components/sections/solutions-steps";
import { secondariesView } from "@/content/solutions";

export const metadata: Metadata = {
  title: "Secondaries",
  // REWRITTEN 9 Sep 2026 with the page. It read "Secondary liquidity for GPs,
  // LPs, and shareholders seeking an exit ahead of the end of a fund's life",
  // which described the DRAFT lede's version of this service - fund positions
  // sold before the end of a fund's life. The supplied copy describes pre-IPO
  // secondaries in operating companies instead, which is a different trade.
  // A description is invisible on its own page, which is how it outlives it.
  description:
    "Pre-IPO secondary transactions: buy-side access to verified positions in late-stage private companies, and sell-side advisory for shareholders and founders seeking liquidity ahead of a listing.",
};

/**
 * The Secondaries view. Two numbered blocks, then the direct-access logo band,
 * then the closing band - the same shape as ../fundraising/page.tsx, which
 * mounts `RaiseTypes` in the slot `DirectAccess` takes here.
 *
 * **ITS COPY IS REAL AS OF 9 Sep 2026 and this route is no longer the
 * placeholder half of /solutions.** The heading, the lede and both blocks were
 * supplied; the three generic stage blocks that used to follow them were
 * removed rather than filled in. Nothing on either route carries `pending` now
 * - see content/solutions.ts for what that means for the flag.
 *
 * The logo band is the one thing here that still needs an answer rather than a
 * review: it names companies we claim live secondary access in, which is a
 * stronger claim than any logo strip elsewhere on the site. docs/COPY-REVIEW.md
 * carries it.
 */
export default function SolutionsSecondariesPage() {
  return (
    <>
      <SolutionsSteps view={secondariesView} />
      <DirectAccess />
      <CtaBand />
    </>
  );
}
