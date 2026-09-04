import { ArrowGlyph, CtaButton } from "@/components/ui/button";
import {
  FundraisingDiagram,
  SecondariesDiagram,
} from "@/components/ui/solutions-media";
import { solutions } from "@/content/copy";

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
 * The dark textured plate every card sits on.
 *
 * `data-band="dark"` re-points the tokens for the card's subtree, which is
 * what lets its contents be written against `fg` / `line` / `accent` and come
 * out light-on-dark inside an otherwise white section. The grain is the hero's
 * tile, doing the same job: the radial below it is a long ramp over a wide
 * box, which is the case that bands on an 8-bit display.
 */
function Plate({ children }: { children: React.ReactNode }) {
  return (
    <div
      data-band="dark"
      className="relative flex aspect-[1.05098/1] flex-1 items-center justify-center overflow-clip rounded-lg max-[1199px]:w-full max-[1199px]:flex-none"
    >
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(120% 90% at 50% 0%, var(--color-card) 0%, var(--color-ground) 62%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage: "url(/grain.png)",
          backgroundSize: "256px auto",
          backgroundRepeat: "repeat",
        }}
      />
      <div className="relative flex h-full w-full items-center justify-center">
        {children}
      </div>
    </div>
  );
}

/** One graphic per block, in order. */
const MEDIA = [SecondariesDiagram, FundraisingDiagram] as const;

export function SolutionsSteps() {
  const blocks = solutions.blocks;

  return (
    <section data-band="light">
      {/* Header. `items-end` bottom-aligns the CTA with the last line of the
          description — the same pairing the hero uses. It stacks below 809px,
          where a 146px button beside a 44px heading leaves the heading no
          measure to wrap in. */}
      <div className="shell flex flex-col items-center justify-center gap-2.5 overflow-clip pt-[100px] pb-12 max-[809px]:pt-[60px] max-[809px]:pb-8">
        <div className="flex w-full flex-row items-end justify-center gap-6 max-[809px]:flex-col max-[809px]:items-start max-[809px]:gap-8">
          <div className="flex flex-1 flex-col items-start justify-center gap-4 overflow-clip max-[809px]:w-full max-[809px]:flex-none">
            {/* Accented, matching the section eyebrows — this is the page's
                own name and does the same job. The BLOCK labels and rail
                numbers below stay ink: they sit right beside the accent rail
                and both diagrams, and colouring them too would put the accent
                on six runs on the one page that already carries most of it. */}
            <p className="page-label text-accent">{solutions.eyebrow}</p>

            <div className="max-w-[720px]">
              <h1 className="display display-72 text-[72px]">
                {solutions.title}
              </h1>
            </div>

            <div className="max-w-[680px]">
              <p className="text-[16px] leading-6 text-fg-muted">
                {solutions.lede}
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center">
            <CtaButton href="#get-in-touch" className="group">
              {solutions.cta}
              <ArrowGlyph />
            </CtaButton>
          </div>
        </div>
      </div>

      {/* An <ol> because the rail numbers them and a screen reader should hear
          the same count. It is an ordered LIST, not a sequence of steps — see
          the note on `solutions.blocks` in content/copy.ts for why the labels
          say "Secondaries" and "Fundraising" rather than "Step 1" and
          "Step 2". */}
      <ol className="shell flex list-none flex-col items-center justify-center gap-5 overflow-clip pt-5 pb-[100px] max-[1199px]:gap-[60px] max-[809px]:gap-[54px] max-[809px]:pb-[60px]">
        {blocks.map((block, i) => {
          const Media = MEDIA[i];
          const last = i === blocks.length - 1;

          return (
            <li
              key={block.n}
              id={block.id}
              className="step-row flex w-full scroll-mt-32 flex-row items-center justify-center gap-9 overflow-clip max-[1199px]:flex-col"
            >
              <Plate>{Media ? <Media /> : null}</Plate>

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

                {last && (
                  <CtaButton href="#get-in-touch" className="group">
                    {solutions.cta}
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
