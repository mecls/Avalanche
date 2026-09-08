import { SectionHeading } from "@/components/ui/section-heading";
import { BracketGrid, BracketCell } from "@/components/ui/bracket-grid";
import { whoWeWorkWith } from "@/content/copy";

/**
 * Homepage: the three kinds of mandate Avalanche takes on, between the
 * investor list and the case study.
 *
 * IT REPLACED `RaiseTypes` IN THIS SLOT on 8 Sep 2026 and copies its shape on
 * purpose - same centred heading, same `BracketGrid`, same hairline over a
 * light band - so the page's rhythm survived the content change. What differs
 * is the cell count and the icons; see the note on `whoWeWorkWith` in
 * content/copy.ts for why there are none.
 */
export function WhoWeWorkWith() {
  return (
    <section data-band="light" className="section-y border-t border-line-soft">
      <div className="shell">
        <SectionHeading
          eyebrow={whoWeWorkWith.eyebrow}
          title={whoWeWorkWith.title}
          accent={whoWeWorkWith.accent}
          lede={whoWeWorkWith.lede}
          align="center"
        />

        {/* THREE CELLS, SO THE TRACK IS 3 AND NOT `raiseTypes`' 6. Five cells
            needed a bespoke 3+3 / 2+2+2 split to land on a 6-column track;
            three divide into one clean row, so the only ragged case left is
            the `sm` breakpoint's own 2 columns, where the last cell spans
            both. `lg:col-span-1` has to undo that again at `lg` - a `sm:`
            utility still applies at every width above it. */}
        <BracketGrid className="mt-14 sm:mt-16 lg:[&>div:first-child]:grid-cols-3">
          {whoWeWorkWith.items.map((item, i) => (
            <BracketCell
              key={item.name}
              index={i}
              // 13rem, not `raiseTypes`' 15rem. That block spends the extra
              // two on its icon; with the glyph gone the same floor is just a
              // void over the title. `TrackRecord`, the other iconless grid,
              // already sits at 13.
              minH="min-h-[13rem]"
              className={
                i === whoWeWorkWith.items.length - 1
                  ? "sm:col-span-2 lg:col-span-1"
                  : ""
              }
            >
              {/* `mt-auto` with nothing above it pins the block to the
                  bottom of the cell, which is what keeps the three titles on
                  one line across the row however long the bodies run. It is
                  the same trick `raiseTypes` uses under its icon. */}
              <div className="mt-auto">
                <h3 className="text-base font-medium">{item.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                  {item.body}
                </p>
              </div>
            </BracketCell>
          ))}
        </BracketGrid>
      </div>
    </section>
  );
}
