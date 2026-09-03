import type { Metadata } from "next";
import Image from "next/image";
import type { ReactNode } from "react";
import { CtaBand } from "@/components/site/cta-band";
import { fundraising, secondaries } from "@/content/copy";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "How Avalanche Capital runs secondary liquidity processes and primary raises — end to end, for GPs, LPs, funds, and operating companies.",
};

/**
 * The per-solution diagram. Square source art (1760×1760, transparent
 * corners) on its own light ground, framed in the dark `bg-card` box so it
 * reads the same way the reference's screenshots sit inside a dark frame.
 * `aspect-square` matches the source exactly — `object-cover` on a
 * non-square box would risk cropping the labels near its edges.
 */
function SolutionImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="flex aspect-square items-center justify-center overflow-hidden rounded-lg border border-line bg-card p-6">
      <Image
        src={src}
        alt={alt}
        width={1760}
        height={1760}
        className="h-full w-full object-contain"
      />
    </div>
  );
}

/** The circled entry number that heads each rail. */
function Badge({ n }: { n: string }) {
  return (
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line text-xs tracking-[0.14em] text-fg tabular-nums">
      {n}
    </span>
  );
}

/**
 * The right-hand column of an entry: a rail (badge on top, hairline running
 * down from it) beside a text block centred on the image's height.
 *
 * The rail's line takes `flex-1`, so it stretches to the bottom of whatever
 * the grid row is — the image's height on desktop. Below `lg` the layout
 * stacks, the rail would only be as tall as the text, and it costs a phone
 * 4.5rem of width, so it is hidden and the badge sits above the text instead.
 */
function Entry({ n, children }: { n: string; children: ReactNode }) {
  return (
    <div className="flex gap-8">
      <div className="hidden shrink-0 flex-col items-center lg:flex">
        <Badge n={n} />
        <span aria-hidden="true" className="mt-3 w-px flex-1 bg-line" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-center lg:py-8">
        <div className="mb-6 lg:hidden">
          <Badge n={n} />
        </div>
        {children}
      </div>
    </div>
  );
}

/**
 * One page, both solutions in one continuous list — image left, numbered
 * copy right, Secondaries then Fundraising. Each entry is one grid row whose
 * height the square image sets, which is what lets the text centre on it.
 * Deliberately just eyebrow + heading + lede per entry: the fundraising
 * steps and offerings from the old /process page are not shown here.
 */
export default function SolutionsPage() {
  return (
    <>
      <section className="section-y">
        <div className="shell space-y-24">
          <div
            id="secondaries"
            className="grid scroll-mt-28 gap-8 lg:grid-cols-[1fr_1.15fr] lg:gap-x-16"
          >
            <SolutionImage
              src="/solutions/secondaries.webp"
              alt="A held position matched directly to a buyer, bypassing the other unmatched holders and buyers around it"
            />
            <Entry n="01">
              <p className="eyebrow">{secondaries.eyebrow}</p>
              <h2 className="display mt-4 text-[clamp(2.5rem,4.4vw,3.625rem)]">
                {secondaries.title}
              </h2>
              <p className="mt-5 max-w-xl text-[0.9375rem] leading-relaxed text-fg-muted">
                {secondaries.lede}
              </p>
            </Entry>
          </div>

          <div
            id="fundraising"
            className="grid scroll-mt-28 gap-8 lg:grid-cols-[1fr_1.15fr] lg:gap-x-16"
          >
            <SolutionImage
              src="/solutions/fundraising.webp"
              alt="A grid of investors by stage and sector, with 14 matched to the raise's criteria highlighted"
            />
            <Entry n="02">
              <p className="eyebrow">{fundraising.eyebrow}</p>
              <h2 className="display mt-4 text-[clamp(2.5rem,4.4vw,3.625rem)]">
                {fundraising.title}
              </h2>
              <p className="mt-5 max-w-xl text-[0.9375rem] leading-relaxed text-fg-muted">
                {fundraising.lede}
              </p>
            </Entry>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
