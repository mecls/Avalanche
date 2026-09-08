import { BracketGrid, BracketCell } from "@/components/ui/bracket-grid";
import { Icon, type IconName } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/section-heading";
import { thesis } from "@/content/copy";

/**
 * "Why Avalanche" — three pillars. It opens the body of /about.
 *
 * MOUNTED AGAIN AFTER A WEEK OFF. It was on the homepage until 1 Sep 2026 and
 * was kept unmounted rather than deleted because the copy is genuine — one of
 * the few blocks on this site lifted from avalanche-capital.com rather than
 * drafted. It went back on 7 Sep 2026, when /team and /manifesto merged into
 * /about and a "why this firm" block finally had somewhere it belonged.
 *
 * **IT IS ON THE LATTICE NOW, AND THAT IS THE POINT OF THIS FILE.** It shipped
 * as `rounded-lg` filled panels on a 1px-gap grid, with a blue `eyebrow`
 * ordinal top-left and a 24px title. Nothing else on the site does that. The
 * signature card idiom is `BracketGrid` — square corners, a hairline lattice
 * built from `border-t border-l` on the wrapper and `border-r border-b` per
 * cell, a 13rem floor, a faint grey TABULAR index in the top-RIGHT corner, the
 * title pushed to the bottom by `justify-between`, and two offset crop-mark
 * brackets on the frame. Three homepage sections use it (track record, raise
 * types, verticals) and /about used it nowhere, which is most of why the page
 * read as a different template. Moving to the shared component fixed the
 * ordinal's colour, its position, the title size, the cell height and the
 * corner brackets in one move — none of those is set here any more.
 *
 * **The icons are new marks, not borrowed ones.** These cells shipped without
 * a glyph because `components/ui/icons.tsx` held SECTOR marks only — funds,
 * credit, realestate — and there is no honest mapping from those to "Global
 * Network" or "Precision & Execution"; a mismatched glyph means something
 * else. Three abstractions were drawn for them instead, to the same 24/1.25
 * spec, so they sit beside the sector marks without reading as another set.
 * The empty top-left of an icon-less cell is also what made this block look
 * hollow next to `RaiseTypes`, whose glyph fills exactly that space.
 *
 * **IT IS FLAT BLACK NOW, AND IT USED TO BE IMAGE-BACKED** (8 Sep 2026, by
 * request). As the second block on /about it carried a city skyline at dusk
 * behind the same image/scrim/grain stack the hero and the closing band use.
 * All three layers went together, because each existed only to make the
 * photograph legible under the lattice: the scrim ramped to `#151515` and the
 * grain dithered the scrim. What is left is the `#151515` the ramp was
 * heading for anyway.
 *
 * **PUTTING THE PICTURE BACK MEANS PUTTING ALL THREE BACK.** The scrim was
 * derived twice against two different stills and the numbers moved a long way
 * between them — against this city frame, whose window highlights reach a
 * relative luminance of 0.99, `0.92/0.90/0.88` puts the lattice's three
 * columns at 7.7, 6.7 and 6.5:1, and the flatter ramp `CtaBand` uses does not
 * work here because the lattice spans the whole shell rather than one left
 * column. The still itself survives: `docs/assets/about-bg-source.jpeg` and
 * the `about` preset in `scripts/optimize-bg-video.mjs` still build
 * `public/video/about-bg.webp`. `git log -S about-bg.webp` has the markup.
 *
 * `data-band="dark"` IS NOW THE ONLY THING PAINTING THIS BAND, which makes it
 * more load-bearing than it was rather than less. It points `border-line` at
 * the translucent-white value the lattice below needs for its hairlines, and
 * it paints `ground` — a job it used to share with the image layer's own
 * `bg-ground` fallback.
 */
export function Thesis({ className = "" }: { className?: string } = {}) {
  return (
    <section
      id="thesis"
      data-band="dark"
      className={`py-28 sm:py-32 ${className}`}
    >
      {/* `relative isolate overflow-clip` came off with the picture and should
          not come back on its own. All three existed to stack and clip the
          image/scrim/grain layers against this section; with nothing absolute
          inside it, a stacking context here only makes the band harder to
          reason about. The inner `shell` lost its `relative z-10` for the same
          reason — there is nothing left for it to sit above. */}
      <div className="shell">
        <SectionHeading
          eyebrow={thesis.eyebrow}
          title={thesis.title}
          accent={thesis.accent}
          lede={thesis.lede}
        />

        <BracketGrid className="mt-14 sm:mt-16 lg:[&>div:first-child]:grid-cols-3">
          {thesis.pillars.map((p, i) => (
            <BracketCell
              key={p.title}
              index={i}
              minH="min-h-[15rem]"
              className={
                i === thesis.pillars.length - 1
                  ? "sm:col-span-2 lg:col-span-1"
                  : ""
              }
            >
              <Icon
                name={p.icon as IconName}
                className="h-6 w-6 text-fg-faint"
              />

              {/* Pushed to the bottom of the cell by the parent's
                  `justify-between`, the same way RaiseTypes does it. The
                  `pt-12` is what stops a short title colliding with the index
                  in a cell that has not reached its min height. */}
              <div className="mt-auto pt-10">
                <h3 className="text-base font-medium">{p.title}</h3>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-fg-muted">
                  {p.body}
                </p>
              </div>
            </BracketCell>
          ))}
        </BracketGrid>
      </div>
    </section>
  );
}
