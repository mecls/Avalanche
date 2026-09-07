/**
 * The scaffolding every diagram on the site is drawn on: the SVG canvas, the
 * corner caption, and the dark plate the canvas sits in.
 *
 * These three lived inside the two /solutions files until the manifesto
 * diagrams took the same construction (then /manifesto, now the middle of
 * /about). They are here rather than duplicated because each one carries an
 * invariant that only works if it is literally shared:
 *
 *  - `Frame` fixes the viewBox and the 560px cap. Every diagram must share the
 *    bound or they render at different scales beside each other.
 *  - `Caption` fixes the corner-label run at one rung and one tracking.
 *  - `Plate` carries `data-band="dark"`, which is what makes art written
 *    against `fg` / `line` / `accent` come out light-on-dark inside a white
 *    section. A diagram outside a `data-band="dark"` subtree renders as dark
 *    ink on white — correct by the token rules, and not what the art expects.
 *
 * The rules for authoring a diagram against these — the legend's fixed
 * columns, the derived-count invariant, rungs rather than literals — are in
 * the header of components/ui/solutions-media.tsx.
 */

/**
 * Shared canvas.
 *
 * The height is set so the drawn content ENDS at ~499 in every diagram — the
 * legend baseline — leaving an even margin top and bottom. Get this wrong and
 * the artwork centres on the box rather than on its own content, which reads
 * as the whole card being bottom-heavy. All six share the bound so they sit at
 * the same height down the page, which matters now that five stack in a
 * column: one odd frame reads as a broken row rather than as a different
 * picture.
 */
export function Frame({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 620 508"
      className="h-auto max-h-[86%] w-[94%] max-w-[560px] overflow-visible"
      fill="none"
      aria-hidden
    >
      {children}
    </svg>
  );
}

/*
 * Why `max-w-[560px]`, and why the width is no longer per-breakpoint.
 *
 * SVG type scales with the frame, so the rendered size of every label is
 * (frame width / 620) x its user-unit size. The card is fluid — 644px on a
 * wide desktop, 524px at 1200, 960px when it goes full-width on a tablet, and
 * 350px on a 390px phone — so a percentage width made that ratio swing by
 * 2.2x and the labels with it.
 *
 * This was three rules (84% / 68% at 1199 / 94% at 809) chosen to compensate
 * per band. They were derived from card widths that are no longer true and
 * they overshot: on a 1000px viewport the tablet card is 960px, and 68% of
 * that is a 1.05x scale — the diagram rendered LARGER than its design size.
 *
 * One rule with a cap is both simpler and steadier. 94% keeps a margin inside
 * the card; the 560px cap stops the tablet blow-up. From 600px to 1600px the
 * scale now sits between 0.795 and 0.903. Below 600px the card is smaller than
 * the cap and no width rule can help, so the rungs in globals.css raise the
 * user-unit sizes instead. The derivation, with measurements, is there.
 */

/** Section label, top-left of each diagram. */
export function Caption({
  x,
  y,
  anchor = "start",
  muted = true,
  children,
}: {
  x: number;
  y: number;
  anchor?: "start" | "middle" | "end";
  muted?: boolean;
  children: React.ReactNode;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      className={`font-sans dgm-sm font-medium tracking-[0.12em] uppercase ${
        muted ? "fill-fg-muted" : "fill-fg"
      }`}
    >
      {children}
    </text>
  );
}

/**
 * The dark textured plate every card sits on.
 *
 * `data-band="dark"` re-points the tokens for the card's subtree, which is
 * what lets its contents be written against `fg` / `line` / `accent` and come
 * out light-on-dark inside an otherwise white section. The grain is the hero's
 * tile, doing the same job: the radial below it is a long ramp over a wide
 * box, which is the case that bands on an 8-bit display.
 *
 * `max-w-[720px]` applies ONLY on the stacked layout, and only there is it
 * safe: below 1199px the card is `w-full flex-none`, so capping it cannot
 * affect the desktop row where `flex-1` plus the aspect ratio drives the row
 * height. Without it a full-width card on a tablet was 1150x1094px — a plate
 * taller than the viewport with a 560px diagram floating in the middle of it,
 * 51% of the width empty. That was always slightly absurd; it only became
 * visible when the diagram stopped growing to fill it. At 720px the card is
 * 720x685 and the diagram fills 78% of it.
 */
/**
 * The default sizing: `flex:1 0 0` on the media rows, where the card's aspect
 * ratio gives the ROW its height and `items-center` centres the text against
 * it, so copy length cannot move the layout.
 */
const PLATE_SIZING =
  "aspect-[1.05098/1] flex-1 max-[1199px]:w-full max-[1199px]:max-w-[720px] max-[1199px]:flex-none";

/**
 * `className` REPLACES the sizing and only the sizing — the surface (wash,
 * grain, `data-band="dark"`, radius) is shared and not overridable, so two
 * plates on one page cannot end up different materials. `Figure` uses it to
 * flatten the aspect for its grids.
 */
export function Plate({
  children,
  className = PLATE_SIZING,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      data-band="dark"
      className={`relative flex items-center justify-center overflow-clip rounded-lg ${className}`}
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

/**
 * A plate with its claim and source beneath it.
 *
 * The five market diagrams carry figures, and a figure on this site has to say
 * where it came from — so the attribution travels with the picture rather than
 * living in a footnote somewhere else on the page.
 *
 * **The claim and source are HTML, not `<text>` in the viewBox.** SVG text is
 * scaled by the frame, so at three-across it would render around 10px with no
 * way for a reader to enlarge it; as HTML it is selectable, searchable,
 * translatable and scales with the reader's own type size. It is also the only
 * part of these diagrams a screen reader can reach — `Frame` is `aria-hidden`,
 * which is correct for the picture and would not be for its source.
 *
 * `size` overrides the plate's aspect for the grids: the default 1.05098/1 is
 * near-square, which is right for one plate beside a column of text and too
 * tall for three in a row.
 */
export function Figure({
  claim,
  source,
  size,
  children,
}: {
  claim: string;
  source: string;
  size?: string;
  children: React.ReactNode;
}) {
  return (
    <figure className="flex flex-col">
      <Plate className={size}>{children}</Plate>
      <figcaption className="mt-5">
        <p className="text-[15px] leading-6 text-fg">{claim}</p>
        <p className="mt-2 text-[13px] leading-5 text-fg-faint">{source}</p>
      </figcaption>
    </figure>
  );
}
