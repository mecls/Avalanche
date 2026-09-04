/**
 * The two diagrams inside the /solutions media cards.
 *
 * These REPLACED public/solutions/{secondaries,fundraising}.webp, a pair of
 * 1760px raster plates — now deleted, recoverable from commit d797028^. Three
 * things were wrong with them, and all three were structural rather than
 * matters of taste:
 *
 *  1. They carried a saturated BLUE accent (#2d6a9f-ish) that appears nowhere
 *     else on this site. The palette has exactly one accent.
 *  2. They were light plates on a dark card, so they read as a screenshot
 *     pasted on rather than as part of the composition.
 *  3. They were fixed-resolution art displayed at ~550px, so their labels
 *     rendered soft and undersized. Vector text does not.
 *
 * Drawn in SVG against the site's own tokens, so they follow the band like
 * everything else: on the `data-band="dark"` plate `fg` is white, `accent` is
 * the obsidian sheen (#b9c1c9) and `line` is a white hairline. Nothing here is
 * hardcoded — the accent was gold until 4 Sep 2026 and not one value in this
 * file changed when it went cool, which is the point of naming by role.
 *
 * STILL ILLUSTRATIVE. Both are schematics — anonymous positions, generic
 * sector names, no real counterparties. The one count that appears ("8
 * matched") is exactly the number of highlighted dots drawn beside it, so the
 * picture cannot contradict its own caption. See docs/COPY-REVIEW.md.
 */

/**
 * Shared canvas.
 *
 * The height is set so the drawn content ENDS at ~499 in both diagrams — the
 * legend baseline — leaving an even margin top and bottom. Get this wrong and
 * the artwork centres on the box rather than on its own content, which reads
 * as the whole card being bottom-heavy. Both diagrams share the bound so they
 * sit at the same height on the page.
 */
function Frame({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 620 508"
      className="h-auto max-h-[86%] w-[84%] overflow-visible max-[1199px]:w-[68%] max-[809px]:w-[94%]"
      fill="none"
      aria-hidden
    >
      {children}
    </svg>
  );
}

/*
 * Why the width changes per breakpoint, when the card already scales.
 *
 * SVG type scales with the frame, so a single width means the labels render
 * at a different SIZE on every viewport. The card is 644 wide on desktop, 960
 * on tablet and ~460 on a phone — at a flat 84% that is a 0.87 / 1.30 / 0.62
 * scale, so a 17px label ships at 15px, 22px and 10.5px. The percentages
 * above pull those back to roughly 15 / 18 / 12, which is the range the rest
 * of the site sets small type in.
 *
 * The phone value is the one that matters: 84% put the axis labels at ~8px,
 * which is not type, it is texture.
 */

/** Section label, top-left of each diagram. */
function Caption({ x, y, anchor = "start", muted = true, children }: {
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
      className={`font-sans text-[13px] font-medium tracking-[0.12em] uppercase ${
        muted ? "fill-fg-muted" : "fill-fg"
      }`}
    >
      {children}
    </text>
  );
}

/* ---------------------------------------------------------------- 01 */

/** Left column reads as held positions, right column as counterparties. */
const HOLDERS = ["Position 01", "Position 02", "Position 03", "Position 04"];
const BUYERS = ["Buyer 01", "Buyer 02", "Buyer 03", "Buyer 04"];

/** Index of the pair that is matched, on each side. */
const MATCH = { left: 2, right: 1 };

const ROW_Y = [64, 160, 256, 352];
const ROW_H = 76;
const rowCentre = (i: number) => ROW_Y[i]! + ROW_H / 2;

/** One entry in either column. */
function Entry({
  x,
  y,
  label,
  active,
}: {
  x: number;
  y: number;
  label: string;
  active: boolean;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={248}
        height={ROW_H}
        rx={8}
        className={active ? "fill-accent/[0.07] stroke-accent" : "stroke-line"}
        strokeWidth={1}
      />
      <circle
        cx={x + 26}
        cy={y + ROW_H / 2}
        r={5}
        className={active ? "fill-accent" : "fill-fg-muted/50"}
      />
      <text
        x={x + 48}
        y={y + ROW_H / 2 + 5}
        className={`font-sans text-[17px] ${active ? "fill-fg" : "fill-fg-muted"}`}
      >
        {label}
      </text>
    </g>
  );
}

/**
 * 01 — Secondaries. A held position routed straight to one counterparty, with
 * the unmatched routes it bypasses drawn faintly behind it.
 *
 * The accent curve is the only BRIGHT thing in the frame, which is what makes
 * the single match legible at a glance rather than needing the caption. It was
 * the only saturated thing when the accent was gold; a cool accent has no hue
 * to spend, so the separation is carried by luminance instead — 3.6:1 over a
 * 50%-opacity fg-muted ghost. Dimming the accent breaks the diagram.
 */
export function SecondariesDiagram() {
  const L = 252;
  const R = 372;
  const my = rowCentre(MATCH.left);
  const ny = rowCentre(MATCH.right);
  const mid = { x: (L + R) / 2, y: (my + ny) / 2 };

  /** The routes that were not taken. Deliberately crossing, so the frame
   *  reads as a search space rather than as a tidy pairing. */
  const ghosts: [number, number][] = [
    [0, 2],
    [1, 3],
    [3, 0],
  ];

  return (
    <Frame>
      <Caption x={0} y={20}>
        Holders
      </Caption>
      <Caption x={620} y={20} anchor="end">
        Counterparties
      </Caption>

      {ghosts.map(([a, b]) => {
        const y1 = rowCentre(a);
        const y2 = rowCentre(b);
        return (
          <path
            key={`${a}-${b}`}
            d={`M${L},${y1} C${mid.x},${y1} ${mid.x},${y2} ${R},${y2}`}
            className="stroke-line-soft"
            strokeWidth={1}
          />
        );
      })}

      <path
        d={`M${L},${my} C${mid.x},${my} ${mid.x},${ny} ${R},${ny}`}
        className="stroke-accent"
        strokeWidth={2}
      />

      {HOLDERS.map((label, i) => (
        <Entry
          key={label}
          x={0}
          y={ROW_Y[i]!}
          label={label}
          active={i === MATCH.left}
        />
      ))}
      {BUYERS.map((label, i) => (
        <Entry
          key={label}
          x={R}
          y={ROW_Y[i]!}
          label={label}
          active={i === MATCH.right}
        />
      ))}

      {/* The pill sits on the curve's own midpoint, so it reads as a label on
          the route rather than as floating chrome. */}
      <g>
        <rect
          x={mid.x - 56}
          y={mid.y - 15}
          width={112}
          height={30}
          rx={15}
          className="fill-ground stroke-accent"
          strokeWidth={1}
        />
        <text
          x={mid.x}
          y={mid.y + 4}
          textAnchor="middle"
          className="fill-accent font-sans text-[12px] font-medium tracking-[0.08em] uppercase"
        >
          Matched
        </text>
      </g>

      <g>
        <circle cx={5} cy={490} r={5} className="fill-accent" />
        <text x={22} y={495} className="fill-fg-muted font-sans text-[15px]">
          Matched route
        </text>
        <circle cx={190} cy={490} r={5} className="fill-fg-muted/50" />
        <text x={207} y={495} className="fill-fg-muted font-sans text-[15px]">
          Unmatched
        </text>
      </g>
    </Frame>
  );
}

/* ---------------------------------------------------------------- 02 */

const STAGES = ["Series B", "Series A", "Seed", "Pre-Seed", "Angel"];
const SECTORS = ["Fintech", "SaaS", "DeepTech", "Health", "Climate", "Consumer"];

const COL_X = [116, 196, 276, 356, 436, 516];
const ROW_YY = [90, 162, 234, 306, 378];

/** The selected block: columns 1-4 x rows 1-2. Eight dots, and the pill says
 *  eight — the caption is derived from the geometry, not written beside it. */
const SEL = { c0: 1, c1: 4, r0: 1, r1: 2 };
const MATCHED_COUNT = (SEL.c1 - SEL.c0 + 1) * (SEL.r1 - SEL.r0 + 1);

/**
 * 02 — Fundraising. The investor universe segmented by stage and sector, with
 * the subset matching the mandate's criteria selected.
 *
 * This is the same idea as the asset it replaces, drawn properly: the
 * selection is the site's own accent rather than a stray blue, the axis
 * labels are real type rather
 * than resampled pixels, and the count is computed from the rectangle so the
 * two can never disagree.
 */
export function FundraisingDiagram() {
  const x0 = COL_X[SEL.c0]! - 30;
  const x1 = COL_X[SEL.c1]! + 30;
  const y0 = ROW_YY[SEL.r0]! - 26;
  const y1 = ROW_YY[SEL.r1]! + 26;

  return (
    <Frame>
      <Caption x={0} y={20}>
        Investor universe
      </Caption>
      <Caption x={620} y={20} anchor="end">
        Mandate filter
      </Caption>

      {/* Selection first, so the dots sit on top of its fill. */}
      <rect
        x={x0}
        y={y0}
        width={x1 - x0}
        height={y1 - y0}
        rx={10}
        className="fill-accent/[0.07] stroke-accent"
        strokeWidth={1}
      />

      {ROW_YY.map((cy, r) => (
        <g key={cy}>
          <text
            x={84}
            y={cy + 5}
            textAnchor="end"
            className="fill-fg-muted font-sans text-[15px]"
          >
            {STAGES[r]}
          </text>
          {COL_X.map((cx, c) => {
            const inSel =
              c >= SEL.c0 && c <= SEL.c1 && r >= SEL.r0 && r <= SEL.r1;
            return (
              <circle
                key={cx}
                cx={cx}
                cy={cy}
                r={inSel ? 6 : 5}
                className={inSel ? "fill-accent" : "fill-fg-muted/35"}
              />
            );
          })}
        </g>
      ))}

      {SECTORS.map((s, c) => (
        <text
          key={s}
          x={COL_X[c]}
          y={430}
          textAnchor="middle"
          className="fill-fg-muted font-sans text-[15px]"
        >
          {s}
        </text>
      ))}

      {/* Straddles the selection's top edge, the way a real selection readout
          does — not parked in a corner. */}
      <g>
        <rect
          x={(x0 + x1) / 2 - 62}
          y={y0 - 15}
          width={124}
          height={30}
          rx={15}
          className="fill-ground stroke-accent"
          strokeWidth={1}
        />
        <text
          x={(x0 + x1) / 2}
          y={y0 + 4}
          textAnchor="middle"
          className="fill-accent font-sans text-[12px] font-medium tracking-[0.08em] uppercase"
        >
          {MATCHED_COUNT} matched
        </text>
      </g>

      <g>
        <circle cx={5} cy={490} r={5} className="fill-accent" />
        <text x={22} y={495} className="fill-fg-muted font-sans text-[15px]">
          Meets mandate criteria
        </text>
        <circle cx={252} cy={490} r={5} className="fill-fg-muted/35" />
        <text x={269} y={495} className="fill-fg-muted font-sans text-[15px]">
          Out of scope
        </text>
      </g>
    </Frame>
  );
}
