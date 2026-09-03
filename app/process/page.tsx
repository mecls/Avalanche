import type { Metadata } from "next";
import { CtaBand } from "@/components/site/cta-band";
import { ProcessSteps } from "@/components/sections/process-steps";

export const metadata: Metadata = {
  title: "Process",
  description:
    "How Avalanche Capital runs a raise — deal readiness, investor segmentation, and conversion, executed end to end.",
};

/**
 * The step timeline carries its own vertical rhythm (100/48 above, 20/100
 * below), so it is deliberately NOT wrapped in `section-y` the way the other
 * pages' sections are.
 *
 * It also has to stay the FIRST child of `main`: the header reads
 * `main > :first-child[data-band="light"]` to know it is sitting over a white
 * band and switch its own type to ink.
 */
export default function ProcessPage() {
  return (
    <>
      <ProcessSteps />
      <CtaBand />
    </>
  );
}
