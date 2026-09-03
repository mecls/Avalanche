import type { Metadata } from "next";
import { CtaBand } from "@/components/site/cta-band";
import { SolutionsSteps } from "@/components/sections/solutions-steps";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "What Avalanche Capital does: secondary liquidity for GPs, LPs, and shareholders, and primary capital raises run end to end.",
};

/**
 * The step timeline carries its own vertical rhythm (100/48 above, 20/100
 * below), so it is deliberately NOT wrapped in `section-y` the way the other
 * pages' sections are.
 *
 * It also has to stay the FIRST child of `main`: the header reads
 * `main > :first-child[data-band="light"]` to know it is sitting over a white
 * band and switch its own type to ink, and globals.css paints `main` to match.
 */
export default function SolutionsPage() {
  return (
    <>
      <SolutionsSteps />
      <CtaBand />
    </>
  );
}
