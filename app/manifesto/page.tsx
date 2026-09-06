import type { Metadata } from "next";
import { CtaBand } from "@/components/site/cta-band";
import { PageHeader } from "@/components/site/page-header";
import { CtaButton } from "@/components/ui/button";
import { Plate } from "@/components/ui/diagram";
import {
  AccessLayersDiagram,
  DivergenceDiagram,
} from "@/components/ui/manifesto-media";
import { SectionHeading } from "@/components/ui/section-heading";
import { manifesto } from "@/content/manifesto";

export const metadata: Metadata = {
  title: "Manifesto",
  description:
    "Capital is not scarce. Access is. What Avalanche Capital believes about private markets, and why the space between capital and access is the whole of the work.",
};

/**
 * /manifesto — the firm's positions on the market it works in.
 *
 * FOUR SECTIONS AND NOT ONE MORE. It was condensed from a much longer thesis
 * document: five tenets, four data charts, a competitor matrix, an eight-row
 * requirement table and a protocol architecture. Most of that is either sales
 * material that belongs on /solutions — which already has five blocks and six
 * diagrams — or data that could not be sourced. What survived is the argument
 * itself: the claim, the picture that shows it, the positions that follow, and
 * where the gap actually sits.
 *
 * NO FIGURES ANYWHERE, deliberately. The reasoning is in the header of
 * content/manifesto.ts and it is the single most important thing to know
 * before adding to this page.
 *
 * The header section MUST stay `data-band="light"` and the FIRST child of
 * `main`. Two rules in globals.css key off
 * `main > :first-child[data-band="light"]` — one flips the nav's type to ink,
 * the other paints `main` with `--color-paper`. They break together, and the
 * failure mode is the whole nav rendering white on white.
 *
 * The two media rows are the /solutions row with the rail taken out: the
 * `Plate` is `flex:1 0 0` on a fixed aspect ratio, so it sizes the row and
 * `items-center` centres the text against it. Copy length cannot move the
 * layout. Text comes FIRST in the document in both, so a phone always reads
 * the claim before the picture; the second row sets `flex-row-reverse` to put
 * its plate on the left on a wide screen, which `flex-col` overrides below
 * 1200px.
 */
export default function ManifestoPage() {
  const { divergence, beliefs, layers } = manifesto;

  return (
    <>
      <section data-band="light">
        <PageHeader
          eyebrow={manifesto.eyebrow}
          title={manifesto.titleLines.map((line) => (
            // Authored break — see content/manifesto.ts. Block spans rather
            // than a <br> so each line stays its own run.
            <span key={line} className="block">
              {line}
            </span>
          ))}
          lede={manifesto.lede}
          cta={manifesto.cta}
        />
      </section>

      <section data-band="light" className="section-y border-t border-line">
        <div className="shell">
          <div className="flex w-full flex-row items-center justify-center gap-9 max-[1199px]:flex-col">
            <div className="flex flex-1 flex-col items-start gap-6 max-[1199px]:w-full max-[1199px]:flex-none">
              <SectionHeading
                eyebrow={divergence.eyebrow}
                title={divergence.title}
              />

              <div className="flex max-w-[680px] flex-col gap-5">
                {divergence.body.map((p) => (
                  <p key={p} className="text-[16px] leading-6 text-fg-muted">
                    {p}
                  </p>
                ))}
                <p className="text-[16px] leading-6 text-fg">
                  {divergence.note}
                </p>
              </div>
            </div>

            <Plate>
              <DivergenceDiagram />
            </Plate>
          </div>
        </div>
      </section>

      {/* `data-band="dark"` rather than a bare section, and that is load-bearing
          on this page. The header is light, so the `:has()` rule in globals.css
          paints `main` with `--color-paper` — a section that does not paint
          ITSELF therefore sits on white while still inheriting the root's dark
          text tokens, i.e. white type on a white ground. Only a band paints
          itself. /customers hits the same trap and answers it with
          `bg-ground-deep`; this says what it means. */}
      <section data-band="dark" className="section-y">
        <div className="shell">
          <SectionHeading eyebrow={beliefs.eyebrow} title={beliefs.title} />

          {/* The same ruled <dl> WhoWeServe uses on the homepage: ordinal and
              statement left, argument right, hairline between. A <dl> may only
              contain <dt>/<dd> (optionally wrapped in a <div>), so the index
              lives inside the <dt> rather than beside it. */}
          <dl className="mt-16 divide-y divide-line border-y border-line">
            {beliefs.items.map((b, i) => (
              <div
                key={b.title}
                className="grid gap-4 py-9 md:grid-cols-[1fr_1.4fr] md:items-baseline md:gap-10"
              >
                <dt className="flex items-baseline gap-5">
                  <span className="eyebrow shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="display text-2xl md:text-[1.75rem]">
                    {b.title}
                  </span>
                </dt>
                <dd className="text-sm leading-relaxed text-fg-muted">
                  {b.body}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section data-band="light" className="section-y">
        <div className="shell">
          <div className="flex w-full flex-row-reverse items-center justify-center gap-9 max-[1199px]:flex-col">
            <div className="flex flex-1 flex-col items-start gap-6 max-[1199px]:w-full max-[1199px]:flex-none">
              <SectionHeading eyebrow={layers.eyebrow} title={layers.title} />

              <dl className="w-full max-w-[680px] divide-y divide-line border-y border-line">
                {layers.items.map((l) => (
                  <div key={l.n} className="py-6">
                    <dt className="flex items-baseline gap-4">
                      <span className="page-label shrink-0 text-fg-faint">
                        {l.n}
                      </span>
                      <span className="text-[16px] leading-6 font-medium">
                        {l.title}
                      </span>
                    </dt>
                    <dd className="mt-2 pl-[42px] text-sm leading-relaxed text-fg-muted">
                      {l.body}
                    </dd>
                  </div>
                ))}
              </dl>

              <p className="max-w-[680px] text-[16px] leading-6 text-fg">
                {layers.note}
              </p>

              {/* Solid rather than ghost: the ghost variant is a 1%-white fill
                  with no border — legible over the hero footage and over a dark
                  band, all but invisible on a white one. */}
              <CtaButton href="/solutions/fundraising">{layers.cta}</CtaButton>
            </div>

            <Plate>
              <AccessLayersDiagram />
            </Plate>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
