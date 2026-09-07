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
 * **IT IS IMAGE-BACKED**, and it is the second block on /about — a city
 * skyline at dusk, behind the same image/scrim/grain stack the hero and the
 * closing band use. It replaced a frame from a bridge clip, which had the
 * problem of being the same subject as the hero; a different subject keeps the
 * page from showing one photograph twice.
 *
 * The still is built by `scripts/optimize-bg-video.mjs about`. **Read that
 * preset's header before touching this band**: the source is a 269x148
 * thumbnail, supplied and chosen with the trade-off stated, and the scrim
 * below is doing as much work hiding the upscale as it is carrying contrast.
 * A licensed full-resolution original would improve this more than any change
 * here, and is a one-line swap in the preset.
 *
 * `data-band="dark"` rather than leaving it unbanded like `CtaBand` does: the
 * lattice below takes `border-line` for its hairlines and the band is what
 * points that token at the translucent-white value. It also paints `ground`
 * underneath, which is the fallback if the image ever 404s.
 */
export function Thesis() {
  return (
    <section
      id="thesis"
      data-band="dark"
      className="relative isolate overflow-clip py-28 sm:py-32"
    >
      {/* The same three-layer stack the hero and the closing band use — image,
          scrim, grain — and it needs all three for the same reasons. The grain
          is not decoration: one long gradient across a wide box bands in an
          8-bit encode, and dithering it is what lets a scrim stay as light as
          it can. `bg-ground` under the image is the fallback if it 404s.

          THIS SCRIM IS NEARLY FLAT AND MUCH DARKER THAN THE CLOSING BAND'S,
          and the reason is what sits on it. `CtaBand` can ramp 0.92 down to
          0.45 because its type is in a single left column and the right half
          is deliberately open. Here the lattice spans the full shell, so every
          column carries 13px text and every column needs the floor.

          **RE-MEASURE IT WHENEVER THE STILL CHANGES.** It has been derived
          twice against two different photographs and the numbers moved a long
          way. Against the bridge frame, 0.86 -> 0.55 put the middle column at
          4.27:1 and 0.90/0.84/0.80 fixed it. The city still that replaced it
          is far brighter — its window highlights reach a relative luminance of
          0.99, against the bridge's 0.73 — and those same values scraped
          4.50:1, exactly the 13px floor and no margin at all. 0.92/0.90/0.88
          puts the three columns at 7.7, 6.7 and 6.5:1.

          The scrim is also what covers for the upscale: this source is a
          269x148 thumbnail. Lightening it undoes both jobs at once. */}
      <div
        aria-hidden
        className="absolute inset-0 z-0 bg-ground bg-cover bg-center"
        style={{ backgroundImage: "url(/video/about-bg.webp)" }}
      />
      <div
        aria-hidden
        className="absolute inset-0 z-[1]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(21,21,21,0.92) 0%, rgba(21,21,21,0.90) 50%, rgba(21,21,21,0.88) 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 z-[2]"
        style={{
          backgroundImage: "url(/grain.png)",
          backgroundSize: "256px auto",
          backgroundRepeat: "repeat",
        }}
      />

      <div className="shell relative z-10">
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
