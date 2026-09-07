import { BracketGrid, BracketCell } from "@/components/ui/bracket-grid";
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
 * **No icon in these cells, deliberately.** `RaiseTypes` and `Industries` put
 * a 24px line glyph top-left, but `components/ui/icons.tsx` is a set of
 * SECTOR marks — funds, credit, realestate, health — and there is no honest
 * mapping from those to "Global Network" or "Precision & Execution". A
 * mismatched glyph would be worse than none, and `TrackRecord`'s cells carry
 * no icon either, so an icon-less lattice cell is already house style.
 *
 * `data-band="light"` matches the other two lattice sections, which are both
 * light on the homepage. It also softens the page's opening: the header no
 * longer cuts straight from white to black, because the dark band is now the
 * metrics bento one section further down.
 */
export function Thesis() {
  return (
    <section
      id="thesis"
      data-band="light"
      className="section-y border-t border-line-soft"
    >
      <div className="shell">
        <SectionHeading
          eyebrow={thesis.eyebrow}
          title={thesis.title}
          accent={thesis.accent}
          lede={thesis.lede}
        />

        {/* Three cells on a 3-column track at `lg`, which is the shape the
            content already has — no bespoke col-spans like RaiseTypes needs
            for its 3+3 / 2+2+2. Below `lg` BracketGrid's own `sm:grid-cols-2`
            takes over and the third cell spans the full width, so there is no
            ragged half-row. */}
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
              {/* Pushed to the bottom of the cell by the parent's
                  `justify-between`, the same way RaiseTypes does it. The
                  `pt-12` is what stops a short title colliding with the index
                  in a cell that has not reached its min height. */}
              <div className="mt-auto pt-12">
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
