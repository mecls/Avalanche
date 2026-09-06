import { PageHeader } from "@/components/site/page-header";
import { ArrowGlyph, CtaButton } from "@/components/ui/button";
import { Plate } from "@/components/ui/diagram";
import {
  EngagementDiagram,
  FundraisingDiagram,
  MeetingDiagram,
  PendingPlate,
  PipelineDiagram,
  PreMarketingDiagram,
  SecondariesDiagram,
} from "@/components/ui/solutions-media";
import type { SolutionView } from "@/content/solutions";

/**
 * /solutions: a page heading, then two numbered rows of media card / rail /
 * text.
 *
 * Built to measured geometry. The numbers that look arbitrary are not:
 *
 *  - The media card is `flex:1 0 0` with `aspect-ratio: 1.05098/1`, which is
 *    what makes a row 612.75px tall at a 1440px viewport. The card drives the
 *    ROW height, and `items-center` then centres the text against it — so the
 *    layout does not move when a block's body runs to a different number of
 *    lines. That is the property to preserve when editing copy.
 *  - 644 + 36 + 40 + 36 + 644 = 1400, the shell's content box at 1440.
 *  - The rail's progress fill is 580px inside a ~552.75px track ON PURPOSE.
 *    A sweep is one `translateY(-100%)` of the fill, clipped by the track, so
 *    nothing animates height and nothing relayouts per frame.
 *
 * The rail is DELETED below 1200px rather than stacked or moved: the number
 * survives in the rail-less layout only as position, and a horizontal spine
 * beside a stacked card would be inventing a layout the reference does not
 * have.
 *
 * The spine visibly breaks for 20px between rows — each rail is exactly as
 * tall as its own row, and the container's gap sits between them. That gap is
 * correct, not a bug.
 *
 * The page label, block label and rail number are ONE typographic run at three
 * call sites — the `page-label` utility, not the site's `eyebrow`. It was a
 * local const in this file until /customers took the same run for its own page
 * header on 4 Sep 2026; the spec and the reasoning are in globals.css now, so
 * the two headers cannot drift. Ink rather than accent even though the rail
 * beneath these numbers is the accent's own gradient: this page already
 * carries more of the colour than any other.
 */

/**
 * Which diagram a block gets, BY BLOCK ID rather than by index.
 *
 * It was a positional array while there was one view with two blocks. There
 * are now two views of five, so position says nothing — block 02 means
 * investor sourcing on one view and pricing on the other. Keying on the id
 * means a block either has artwork that is genuinely about it, or it renders
 * the pending plate.
 *
 * Both diagrams carry specific meaning (which route matched; which segment was
 * selected), so they must not be reused to fill a card they do not describe.
 * Add an entry here when new artwork exists, and drop that block's `pending`
 * flag in content/solutions.ts at the same time.
 */
const MEDIA: Record<string, () => React.ReactElement> = {
  // --- Fundraising: complete as of 4 Sep 2026 ---
  /** Three raise inputs converging into one positioned package. */
  "pre-marketing": PreMarketingDiagram,
  /** The stage x sector grid with a matched subset IS investor sourcing. */
  fundraising: FundraisingDiagram,
  /** A multi-touch sequence branching on an engagement signal. */
  engagement: EngagementDiagram,
  /** Four stages, top-aligned, so the columns are the funnel. */
  pipeline: PipelineDiagram,
  /** One counterparty against the mandate parameters that align. */
  meetings: MeetingDiagram,

  // --- Secondaries: one of five, the rest awaiting both art and copy ---
  /** Holders routed to counterparties IS the counterparty search. */
  counterparties: SecondariesDiagram,
};

export function SolutionsSteps({ view }: { view: SolutionView }) {
  const blocks = view.blocks;

  return (
    <section data-band="light">
      <PageHeader
        eyebrow={view.eyebrow}
        title={view.title}
        lede={view.lede}
        cta={view.cta}
      />

      {/* An <ol> because the rail numbers them and a screen reader should hear
          the same count. It is an ordered LIST, not a sequence of steps — see
          the note in content/solutions.ts for why the labels are named stages
          rather than "Step 1" and "Step 2". */}
      <ol className="shell flex list-none flex-col items-center justify-center gap-5 overflow-clip pt-5 pb-[100px] max-[1199px]:gap-[60px] max-[809px]:gap-[54px] max-[809px]:pb-[60px]">
        {blocks.map((block, i) => {
          const Media = MEDIA[block.id];
          const last = i === blocks.length - 1;

          return (
            <li
              key={block.n}
              id={block.id}
              className="step-row flex w-full scroll-mt-32 flex-row items-center justify-center gap-9 overflow-clip max-[1199px]:flex-col"
            >
              <Plate>
                {Media ? <Media /> : <PendingPlate label={block.label} />}
              </Plate>

              {/* Rail. `self-stretch` rather than a height: the row is sized
                  by the card, so a percentage height here would resolve
                  against nothing. `aria-hidden` because the number it shows
                  duplicates the list's own ordinal. */}
              <div
                aria-hidden
                className="flex w-10 shrink-0 flex-col items-center justify-center gap-5 self-stretch overflow-hidden max-[1199px]:hidden"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[36px] border-2 border-line">
                  <p className="page-label">{block.n}</p>
                </div>

                {/* The fill is ABSOLUTE, and that is load-bearing rather than
                    stylistic. In flow it is 580px of content inside a
                    `flex: 1 1 0%` track, and a flex-grow item still hands its
                    content height to the column's intrinsic size — so the
                    rail measured 40 + 20 + 580 = 640px, became the tallest
                    thing in the row, and drove the row height instead of the
                    card. `min-height: 0` does not fix that; only taking the
                    fill out of flow does. The card must size the row. */}
                <div className="relative w-[3px] flex-1 overflow-hidden rounded-[10px] bg-line">
                  <div
                    className="rail-fill absolute inset-x-0 top-0 h-[580px] rounded-[10px]"
                    style={{
                      backgroundImage:
                        "linear-gradient(var(--color-accent-light) 66.8813%, var(--color-accent-deep) 100%)",
                    }}
                  />
                </div>
              </div>

              <div className="step-text flex max-w-[1160px] flex-1 flex-col items-start justify-start gap-6 max-[1199px]:w-full max-[1199px]:max-w-none max-[1199px]:flex-none">
                <p className="page-label">{block.label}</p>

                <h2 className="display display-52 text-[52px]">{block.title}</h2>

                <div className="max-w-[680px]">
                  <p className="text-[16px] leading-6 text-fg-muted">
                    {block.body}
                  </p>
                </div>

                {/* Visible, on the page, not just a source comment. A block
                    whose copy is a placeholder has to LOOK unfinished to
                    anyone reviewing the site, or it ships. Drop the `pending`
                    flag in content/solutions.ts and this goes with it. */}
                {block.pending && (
                  <p className="border-l-2 border-line pl-3 text-[13px] leading-5 text-fg-faint">
                    Placeholder — awaiting approved copy.
                  </p>
                )}

                {last && (
                  <CtaButton href="/get-in-touch" className="group">
                    {view.cta}
                    <ArrowGlyph />
                  </CtaButton>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
