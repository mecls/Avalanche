/**
 * The six diagrams inside the /solutions media cards.
 *
 * Two of them (Secondaries, Fundraising/investor-sourcing) were drawn 3 Sep
 * 2026 for the single-page version. The other four were added on 4 Sep to
 * finish the Fundraising view: PreMarketing, Engagement, Pipeline and Meeting.
 * `PendingPlate` covers the four Secondaries blocks that still have neither
 * artwork nor copy.
 *
 * These REPLACED public/solutions/{secondaries,fundraising}.webp, a pair of
 * 1760px raster plates — now deleted, recoverable from commit d797028^. Three
 * things were wrong with them, and all three were structural rather than
 * matters of taste:
 *
 *  1. They carried a hardcoded #2d6a9f-ish blue that belonged to no token and
 *     matched nothing else on the site. (The palette's accent is itself blue
 *     now — #3056EE — which does not retroactively make that art right: the
 *     objection was a one-off literal, not the hue. Drawn against the token,
 *     these followed the palette there for free.)
 *  2. They were light plates on a dark card, so they read as a screenshot
 *     pasted on rather than as part of the composition.
 *  3. They were fixed-resolution art displayed at ~550px, so their labels
 *     rendered soft and undersized. Vector text does not.
 *
 * Drawn in SVG against the site's own tokens, so they follow the band like
 * everything else: on the `data-band="dark"` plate `fg` is white, `accent` is
 * the brand blue lightened for a dark ground (#8aa4ff) and `line` is a white
 * hairline. Nothing here is hardcoded — the accent has been gold, then
 * obsidian, then this, and not one value in this file has changed for any of
 * it. That is the whole point of naming by role.
 *
 * ONE OF THE ACCENT'S FOUR HOMES — see the accent section in README. These
 * earn it on different grounds from the eyebrows: here the colour is not
 * emphasis but the diagram's only means of saying which route matched, which
 * segment was selected, which branch was taken. Take it out and the pictures
 * stop working. That is also why every unselected element is `fg-muted` at
 * 35-50% rather than a second hue — the distinction has to survive as a
 * LUMINANCE step for a colour-blind reader, not just as a colour change.
 *
 * STILL ILLUSTRATIVE. All six are schematics — anonymous positions and
 * counterparties, generic sector names, no real figures. Every count that
 * appears in a pill ("8 matched", "2 committed", "3 of 4 aligned") is DERIVED
 * from the array drawn beside it in the same render, never typed twice, so a
 * picture cannot contradict its own caption. Keep that property when editing.
 * See docs/COPY-REVIEW.md.
 *
 * KNOWN, PRE-DATING THESE FOUR: the 12px pill text renders at ~6.4px on a
 * 390px phone (a 620-unit viewBox squeezed into a ~330px card is a 0.53x
 * scale). That is below the range the rest of the site sets small type in, and
 * it affects all six equally — the two originals measure the same. The note
 * below about per-breakpoint widths was tuned for the 17px labels and does not
 * rescue the 12px runs. Fixing it means raising the floor across all six.
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

/**
 * Stand-in for a block that has no diagram yet.
 *
 * /solutions grew from two blocks to five per view on 4 Sep 2026. Fundraising
 * has since been drawn in full; this now covers the four SECONDARIES blocks
 * that are awaiting both artwork and copy.
 *
 * The choice was to leave those cards empty, to repeat a diagram we already
 * have, or to say plainly that the artwork is pending — this is the third. A
 * repeated diagram is worse than an obvious blank: each one MEANS something
 * specific, so showing the counterparty-routing picture beside a pricing block
 * would be illustrating the wrong claim.
 *
 * Deliberately quiet and deliberately not mistakable for finished art: a
 * dashed frame, a hairline cross, and a label. It carries NO accent — the
 * accent marks something real, and there is nothing real here yet.
 *
 * Delete a block's `pending` flag and give it a diagram in MEDIA to replace
 * this. When every block has one, delete this component.
 */
export function PendingPlate({ label }: { label?: string }) {
  return (
    <Frame>
      <rect
        x={1}
        y={1}
        width={618}
        height={506}
        rx={12}
        className="stroke-line-soft"
        strokeWidth={2}
        strokeDasharray="10 10"
      />
      <g className="stroke-line" strokeWidth={1}>
        <path d="M310 214v80M270 254h80" strokeLinecap="round" />
      </g>
      <text
        x={310}
        y={330}
        textAnchor="middle"
        className="fill-fg-muted font-sans text-[15px] tracking-[0.12em] uppercase"
      >
        Artwork pending
      </text>
      {label ? (
        <text
          x={310}
          y={358}
          textAnchor="middle"
          className="fill-fg-faint font-sans text-[14px]"
        >
          {label}
        </text>
      ) : null}
    </Frame>
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
 * The accent curve is the only saturated thing in the frame, which is what
 * makes the single match legible at a glance rather than needing the caption.
 * It is also 2.7:1 brighter than a 50%-opacity fg-muted ghost, and that second
 * margin is the one that matters: hue alone would drop this diagram for a
 * colour-blind reader. Darkening the accent toward the brand value collapses
 * it — see the note in globals.css.
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
 * selection is the site's own accent token rather than a literal, the axis
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

/* ------------------------------------------------- 03 / 04 / 05 / 01 */

/**
 * The four diagrams added 4 Sep 2026 to finish the Fundraising view.
 *
 * Same rules as the two above, and they are worth restating because these are
 * the ones most likely to be copied from next:
 *
 *  - Tokens only. No hex anywhere. `accent` is the ONE saturated thing in each
 *    frame and it always marks the same idea: the thing that matched, aligned
 *    or completed. Everything unselected is `fg-muted` at 35-50% — a real
 *    luminance step below the accent, not just a different hue, because hue
 *    alone drops the distinction for a colour-blind reader.
 *  - Every count that appears in a pill is DERIVED from the array drawn beside
 *    it, never typed twice, so the caption cannot contradict the picture.
 *  - Content ends at ~400 with the legend baseline at 495, matching the two
 *    above so all six sit at the same height across the two views.
 *  - Still schematic. "Investor 07", a 7/5/3/2 funnel and four generic mandate
 *    parameters are the shape of the work, not figures. Nothing here is a
 *    claim, and nothing should become one — see docs/COPY-REVIEW.md.
 */

/** A labelled node box, used by the sequence diagram. */
function Node({
  x,
  y,
  w = 130,
  h = 70,
  label,
  active = false,
}: {
  x: number;
  y: number;
  w?: number;
  h?: number;
  label: string;
  active?: boolean;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={8}
        className={active ? "fill-accent/[0.07] stroke-accent" : "stroke-line"}
        strokeWidth={1}
      />
      <text
        x={x + w / 2}
        y={y + h / 2 + 6}
        textAnchor="middle"
        className={`font-sans text-[16px] ${active ? "fill-fg" : "fill-fg-muted"}`}
      >
        {label}
      </text>
    </g>
  );
}

/**
 * 01 — Pre-marketing. Three inputs of a raise converging into one positioned
 * package.
 *
 * The convergence IS the claim: the block says materials are positioned
 * against the target profile, so three separate inputs resolving into a single
 * outlined package is the picture of that. The package is drawn as document
 * bars rather than as another box so it reads as materials, not as a fourth
 * node.
 */
const INPUTS = ["Structure", "Thesis", "Target profile"];

export function PreMarketingDiagram() {
  const rowH = 64;
  const rowY = [130, 223, 316];
  const centre = (i: number) => rowY[i]! + rowH / 2;
  const pkg = { x: 360, y: 110, w: 260, h: 290 };
  const join = { x: pkg.x, y: pkg.y + pkg.h / 2 };

  /** Document bars inside the package. The last is short, so the block reads
   *  as a document rather than as a filled rectangle. */
  const bars = [0, 1, 2, 3, 4];

  return (
    <Frame>
      <Caption x={0} y={20}>
        Raise inputs
      </Caption>
      <Caption x={620} y={20} anchor="end">
        Positioned package
      </Caption>

      {/* Curves first, so the boxes sit on top of their ends. */}
      {rowY.map((_, i) => (
        <path
          key={i}
          d={`M220,${centre(i)} C290,${centre(i)} 290,${join.y} ${join.x},${join.y}`}
          className="stroke-accent"
          strokeWidth={i === 1 ? 2 : 1}
        />
      ))}

      {INPUTS.map((label, i) => (
        <g key={label}>
          <rect
            x={0}
            y={rowY[i]}
            width={220}
            height={rowH}
            rx={8}
            className="stroke-line"
            strokeWidth={1}
          />
          <circle
            cx={26}
            cy={centre(i)}
            r={5}
            className="fill-fg-muted/50"
          />
          <text
            x={48}
            y={centre(i) + 6}
            className="fill-fg-muted font-sans text-[17px]"
          >
            {label}
          </text>
        </g>
      ))}

      <rect
        x={pkg.x}
        y={pkg.y}
        width={pkg.w}
        height={pkg.h}
        rx={10}
        className="fill-accent/[0.07] stroke-accent"
        strokeWidth={1}
      />
      {bars.map((b) => (
        <rect
          key={b}
          x={pkg.x + 28}
          y={pkg.y + 64 + b * 44}
          width={b === bars.length - 1 ? 104 : 204}
          height={12}
          rx={6}
          className={b === 0 ? "fill-accent" : "fill-fg-muted/35"}
        />
      ))}

      {/* Straddles the package's top edge, the way the selection readout does
          in 02 — a label on the thing, not floating chrome. */}
      <g>
        <rect
          x={pkg.x + pkg.w / 2 - 56}
          y={pkg.y - 15}
          width={112}
          height={30}
          rx={15}
          className="fill-ground stroke-accent"
          strokeWidth={1}
        />
        <text
          x={pkg.x + pkg.w / 2}
          y={pkg.y + 4}
          textAnchor="middle"
          className="fill-accent font-sans text-[12px] font-medium tracking-[0.08em] uppercase"
        >
          Positioned
        </text>
      </g>

      <g>
        <circle cx={5} cy={490} r={5} className="fill-accent" />
        <text x={22} y={495} className="fill-fg-muted font-sans text-[15px]">
          Positioned material
        </text>
        <circle cx={222} cy={490} r={5} className="fill-fg-muted/50" />
        <text x={239} y={495} className="fill-fg-muted font-sans text-[15px]">
          Raise input
        </text>
      </g>
    </Frame>
  );
}

/**
 * 03 — Personalised engagement. A multi-touch sequence that branches on an
 * engagement signal.
 *
 * The branch is the point of the block: the copy says follow-ups are sequenced
 * BY signal, so the diagram has to show two outcomes from one sequence rather
 * than a straight line of touches. The accent takes the engaged path; the
 * unengaged one is a ghost, so which branch was taken is legible without the
 * labels.
 */
const TOUCHES = ["Email", "LinkedIn", "Email"];

export function EngagementDiagram() {
  const nodeW = 130;
  const nodeH = 70;
  const trackY = 200;
  const trackMid = trackY + nodeH / 2;
  const xs = [0, 150, 300];
  const outX = 480;
  const outW = 140;
  const engagedY = 70;
  const pausedY = 330;

  return (
    <Frame>
      <Caption x={0} y={20}>
        Outreach sequence
      </Caption>
      <Caption x={620} y={20} anchor="end">
        On signal
      </Caption>

      {/* Connectors between touches, then the two branches. */}
      {xs.slice(0, -1).map((x) => (
        <path
          key={x}
          d={`M${x + nodeW},${trackMid} H${x + nodeW + 20}`}
          className="stroke-line"
          strokeWidth={1}
        />
      ))}

      <path
        d={`M430,${trackMid} C455,${trackMid} 455,${pausedY + nodeH / 2} ${outX},${pausedY + nodeH / 2}`}
        className="stroke-line-soft"
        strokeWidth={1}
      />
      <path
        d={`M430,${trackMid} C455,${trackMid} 455,${engagedY + nodeH / 2} ${outX},${engagedY + nodeH / 2}`}
        className="stroke-accent"
        strokeWidth={2}
      />

      {TOUCHES.map((label, i) => (
        <g key={`${label}-${i}`}>
          <text
            x={xs[i]! + nodeW / 2}
            y={trackY - 16}
            textAnchor="middle"
            className="fill-fg-faint font-sans text-[13px] tracking-[0.12em] uppercase"
          >
            {`0${i + 1}`}
          </text>
          <Node x={xs[i]!} y={trackY} label={label} />
        </g>
      ))}

      <Node x={outX} y={engagedY} w={outW} label="Follow-up" active />
      <Node x={outX} y={pausedY} w={outW} label="Paused" />

      {/* Straddles the engaged outcome, so the pill labels the branch that was
          taken rather than the diagram as a whole. */}
      <g>
        <rect
          x={outX + outW / 2 - 52}
          y={engagedY - 15}
          width={104}
          height={30}
          rx={15}
          className="fill-ground stroke-accent"
          strokeWidth={1}
        />
        <text
          x={outX + outW / 2}
          y={engagedY + 4}
          textAnchor="middle"
          className="fill-accent font-sans text-[12px] font-medium tracking-[0.08em] uppercase"
        >
          Replied
        </text>
      </g>

      <g>
        <circle cx={5} cy={490} r={5} className="fill-accent" />
        <text x={22} y={495} className="fill-fg-muted font-sans text-[15px]">
          Signal detected
        </text>
        <circle cx={190} cy={490} r={5} className="fill-fg-muted/50" />
        <text x={207} y={495} className="fill-fg-muted font-sans text-[15px]">
          Awaiting signal
        </text>
      </g>
    </Frame>
  );
}

/**
 * 04 — Pipeline. Four stages, top-aligned, so the funnel is the shape of the
 * columns rather than something drawn.
 *
 * The counts are the cards: `STAGES` holds the number of cards per column and
 * the pill reads the last one, so the readout cannot drift from the picture —
 * the same rule as the "8 matched" pill in 02. Only the committed column is
 * accented, because the block is about reaching a signed commitment and that
 * is the one state worth marking.
 */
const PIPELINE_STAGES = [
  { label: "Contacted", count: 7 },
  { label: "Engaged", count: 5 },
  { label: "Diligence", count: 3 },
  { label: "Committed", count: 2 },
];

export function PipelineDiagram() {
  const colX = [0, 160, 320, 480];
  const colW = 140;
  const cardH = 34;
  const gap = 10;
  const top = 90;
  const lastIndex = PIPELINE_STAGES.length - 1;
  const committed = PIPELINE_STAGES[lastIndex]!.count;

  return (
    <Frame>
      <Caption x={0} y={20}>
        Pipeline
      </Caption>
      <Caption x={620} y={20} anchor="end">
        All mandates
      </Caption>

      {/* The committed column gets an enclosing rect, and it is not decoration:
          the pill has to straddle SOMETHING with padding above the first card,
          exactly as the selection rect gives it room in 02. Straddling the
          column directly put the readout on top of its own first card. */}
      <rect
        x={colX[lastIndex]! - 12}
        y={top - 12}
        width={colW + 24}
        height={
          PIPELINE_STAGES[lastIndex]!.count * (cardH + gap) - gap + 24
        }
        rx={10}
        className="fill-accent/[0.07] stroke-accent"
        strokeWidth={1}
      />

      {PIPELINE_STAGES.map((stage, c) => {
        const isLast = c === lastIndex;
        return (
          <g key={stage.label}>
            {Array.from({ length: stage.count }, (_, r) => (
              <rect
                key={r}
                x={colX[c]}
                y={top + r * (cardH + gap)}
                width={colW}
                height={cardH}
                rx={6}
                className={
                  isLast
                    ? "fill-accent/[0.07] stroke-accent"
                    : "fill-fg-muted/[0.06] stroke-line"
                }
                strokeWidth={1}
              />
            ))}
            <text
              x={colX[c]! + colW / 2}
              y={420}
              textAnchor="middle"
              className="fill-fg-muted font-sans text-[15px]"
            >
              {stage.label}
            </text>
          </g>
        );
      })}

      {/* Straddles the committed column, and its number is that column's own
          card count. */}
      <g>
        <rect
          x={colX[lastIndex]! + colW / 2 - 62}
          y={top - 27}
          width={124}
          height={30}
          rx={15}
          className="fill-ground stroke-accent"
          strokeWidth={1}
        />
        <text
          x={colX[lastIndex]! + colW / 2}
          y={top - 8}
          textAnchor="middle"
          className="fill-accent font-sans text-[12px] font-medium tracking-[0.08em] uppercase"
        >
          {committed} committed
        </text>
      </g>

      <g>
        <circle cx={5} cy={490} r={5} className="fill-accent" />
        <text x={22} y={495} className="fill-fg-muted font-sans text-[15px]">
          Committed
        </text>
        <circle cx={160} cy={490} r={5} className="fill-fg-muted/50" />
        <text x={177} y={495} className="fill-fg-muted font-sans text-[15px]">
          In progress
        </text>
      </g>
    </Frame>
  );
}

/**
 * 05 — Meeting intelligence. One anonymous counterparty on the left, the
 * mandate parameters that align on the right.
 *
 * "3 of 4" is COUNTED from `PARAMS`, and the enclosing rect is drawn from the
 * same array — so the pill, the box and the dots cannot disagree. The aligned
 * entries are a contiguous run because the rect has to enclose them; if a
 * future edit makes them non-contiguous, the rect stops being honest and the
 * shape has to change with it.
 */
const PARAMS = [
  { label: "Cheque size", aligned: true },
  { label: "Stage", aligned: true },
  { label: "Sector focus", aligned: true },
  { label: "Geography", aligned: false },
];

export function MeetingDiagram() {
  const rowH = 64;
  const rowGap = 12;
  const top = 90;
  const rowY = (i: number) => top + i * (rowH + rowGap);
  const colX = 340;
  const colW = 280;
  const alignedCount = PARAMS.filter((p) => p.aligned).length;
  const boxTop = rowY(0) - 10;
  const boxBottom = rowY(alignedCount - 1) + rowH + 10;
  const card = { x: 0, y: top, w: 280, h: rowY(PARAMS.length - 1) + rowH - top };

  return (
    <Frame>
      <Caption x={0} y={20}>
        Next meeting
      </Caption>
      <Caption x={620} y={20} anchor="end">
        Mandate parameters
      </Caption>

      {/* The counterparty. Anonymous on purpose — an initialled disc and a
          generic descriptor, so nothing reads as a real investor. */}
      <rect
        x={card.x}
        y={card.y}
        width={card.w}
        height={card.h}
        rx={10}
        className="stroke-line"
        strokeWidth={1}
      />
      <circle cx={72} cy={168} r={34} className="fill-fg-muted/[0.10]" />
      <text
        x={72}
        y={176}
        textAnchor="middle"
        className="fill-fg-muted font-sans text-[20px]"
      >
        07
      </text>
      <text x={130} y={162} className="fill-fg font-sans text-[19px]">
        Investor 07
      </text>
      <text x={130} y={188} className="fill-fg-muted font-sans text-[15px]">
        Growth fund
      </text>
      <path
        d={`M28,240 H252`}
        className="stroke-line-soft"
        strokeWidth={1}
      />
      <text x={28} y={278} className="fill-fg-muted font-sans text-[15px]">
        Last contact
      </text>
      <text x={252} y={278} textAnchor="end" className="fill-fg font-sans text-[15px]">
        6 days ago
      </text>
      <text x={28} y={318} className="fill-fg-muted font-sans text-[15px]">
        Stage
      </text>
      <text x={252} y={318} textAnchor="end" className="fill-fg font-sans text-[15px]">
        Diligence
      </text>

      {/* The aligned run, drawn before the rows so the dots sit on its fill. */}
      <rect
        x={colX - 12}
        y={boxTop}
        width={colW + 24}
        height={boxBottom - boxTop}
        rx={10}
        className="fill-accent/[0.07] stroke-accent"
        strokeWidth={1}
      />

      {PARAMS.map((p, i) => (
        <g key={p.label}>
          <circle
            cx={colX + 18}
            cy={rowY(i) + rowH / 2}
            r={p.aligned ? 6 : 5}
            className={p.aligned ? "fill-accent" : "fill-fg-muted/35"}
          />
          <text
            x={colX + 44}
            y={rowY(i) + rowH / 2 + 6}
            className={`font-sans text-[17px] ${p.aligned ? "fill-fg" : "fill-fg-muted"}`}
          >
            {p.label}
          </text>
        </g>
      ))}

      <g>
        <rect
          x={colX + colW / 2 - 66}
          y={boxTop - 15}
          width={132}
          height={30}
          rx={15}
          className="fill-ground stroke-accent"
          strokeWidth={1}
        />
        <text
          x={colX + colW / 2}
          y={boxTop + 4}
          textAnchor="middle"
          className="fill-accent font-sans text-[12px] font-medium tracking-[0.08em] uppercase"
        >
          {alignedCount} of {PARAMS.length} aligned
        </text>
      </g>

      <g>
        <circle cx={5} cy={490} r={5} className="fill-accent" />
        <text x={22} y={495} className="fill-fg-muted font-sans text-[15px]">
          Aligned
        </text>
        <circle cx={130} cy={490} r={5} className="fill-fg-muted/35" />
        <text x={147} y={495} className="fill-fg-muted font-sans text-[15px]">
          Not a factor
        </text>
      </g>
    </Frame>
  );
}
