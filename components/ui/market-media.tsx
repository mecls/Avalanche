import { Caption, Frame } from "@/components/ui/diagram";
import { bothSides, mandate } from "@/content/market-data";

/**
 * The two /about diagrams that describe the firm's own position: the mandate
 * segment, and both sides of the table.
 *
 * **NEITHER OF THESE CARRIES A FIGURE**, so the site's no-figures rule
 * survives intact. Three market charts briefly sat here — the listed/private
 * crossover, the holding period, and family-office growth — and they were the
 * only statistics that have ever shipped on this site. They were removed the
 * same day (`git show` this file's history), which means the reasoning in the
 * header of content/manifesto.ts still holds without an exception attached to
 * it. If figures ever come back, they come back WITH sources and from content,
 * not typed into a path here.
 *
 * What these two draw is the firm's own segment definition, not a market
 * measurement — a commercial claim about scope, which needs a different kind
 * of sign-off from a sourced number.
 *
 * Their claim lines are NOT drawn in the SVG. They render as HTML beneath the
 * plate, where they are selectable, searchable and scale with the reader's own
 * type size — none of which is true of `<text>` in a viewBox.
 *
 * Authoring rules (frame bound, caption baseline, legend columns, `dgm-*`
 * rungs, tokens only) are in the header of solutions-media.tsx. These follow
 * them rather than restating them.
 */

/* -------------------------------------------------------------------------
   The mandate segment.

   Two tracks, one threshold. The box is drawn from the LAST in-mandate stage's
   x position rather than a chosen width, so adding a stage to
   `mandate.rows[].stages` moves the boundary with it instead of leaving the
   frame lying about where the mandate ends.

   Both rows share one x scale even though they name different things, because
   the claim is that they are the SAME threshold seen from either side —
   drawing them on two scales would quietly deny that.
   ------------------------------------------------------------------------- */

const T = { x0: 40, x1: 596, rowY: [150, 268] };

export function ThresholdDiagram() {
  const { rows, inside, outside, threshold } = mandate;
  const steps = rows[0]!.stages.length + 1;
  const x = (i: number) => T.x0 + (i * (T.x1 - T.x0)) / (steps - 1);
  // The boundary sits between the last in-mandate stage and the first outside.
  const cut = (x(rows[0]!.stages.length - 1) + x(rows[0]!.stages.length)) / 2;

  return (
    <Frame>
      <Caption x={0} y={20}>
        {inside}
      </Caption>
      <Caption x={620} y={20} anchor="end">
        {outside}
      </Caption>

      <rect
        x={8}
        y={92}
        width={cut - 8}
        height={244}
        rx={6}
        className="fill-accent/[0.07] stroke-accent"
        strokeWidth={1}
      />
      <line
        x1={cut}
        y1={92}
        x2={cut}
        y2={368}
        className="stroke-accent/70"
        strokeWidth={1}
        strokeDasharray="5 5"
      />
      <text
        x={cut + 14}
        y={392}
        className="fill-fg-muted font-sans dgm-sm tracking-[0.1em] uppercase"
      >
        {threshold}
      </text>

      {rows.map((row, r) => {
        const y = T.rowY[r]!;
        return (
          <g key={row.label}>
            <text
              x={8}
              y={y - 38}
              className="fill-fg-faint font-sans dgm-sm tracking-[0.12em] uppercase"
            >
              {row.label}
            </text>
            <line
              x1={T.x0}
              y1={y}
              x2={T.x1}
              y2={y}
              className="stroke-line"
              strokeWidth={1}
            />
            {[...row.stages, row.beyond].map((stage, i) => {
              const outsideMandate = i >= row.stages.length;
              return (
                <g key={stage}>
                  <circle
                    cx={x(i)}
                    cy={y}
                    r={outsideMandate ? 5 : 6}
                    className={
                      outsideMandate ? "fill-fg-muted/50" : "fill-accent"
                    }
                  />
                  <text
                    x={x(i)}
                    y={y + 30}
                    textAnchor="middle"
                    className={`font-sans dgm-md ${
                      outsideMandate ? "fill-fg-muted" : "fill-fg"
                    }`}
                  >
                    {stage}
                  </text>
                </g>
              );
            })}
          </g>
        );
      })}

      <g>
        <circle cx={5} cy={490} r={5} className="fill-accent" />
        <text x={22} y={495} className="fill-fg-muted font-sans dgm-md">
          In mandate
        </text>
        <circle cx={320} cy={490} r={5} className="fill-fg-muted/50" />
        <text x={337} y={495} className="fill-fg-muted font-sans dgm-md">
          Beyond it
        </text>
      </g>
    </Frame>
  );
}

/* -------------------------------------------------------------------------
   Both sides of the table.

   Two sell-side boxes feeding one buy-side box. The arrows run in OPPOSITE
   directions on purpose and it is the only thing this diagram claims: a GP
   raised today becomes an allocator later, a founder funded today becomes
   dealflow later. Drawing both arrows the same way would make it an org chart
   instead of a cycle.
   ------------------------------------------------------------------------- */

const BOX = { w: 268, h: 108, topY: 74, botY: 300 };

export function BothSidesDiagram() {
  const { sell, buy } = bothSides;
  const xs = [16, 336];

  return (
    <Frame>
      <Caption x={0} y={20}>
        Sell side
      </Caption>
      <Caption x={620} y={20} anchor="end">
        Buy side
      </Caption>

      {sell.map((s, i) => {
        const x = xs[i]!;
        const cx = x + BOX.w / 2;
        // Left box points down into the network, right box points up out of
        // it. See the note above — the directions are the claim.
        const down = i === 0;
        return (
          <g key={s.title}>
            <rect
              x={x}
              y={BOX.topY}
              width={BOX.w}
              height={BOX.h}
              rx={6}
              className="fill-ground stroke-accent"
              strokeWidth={1}
            />
            <text
              x={x + 20}
              y={BOX.topY + 30}
              className="fill-accent font-sans dgm-sm tracking-[0.12em] uppercase"
            >
              Sell side
            </text>
            <text
              x={x + 20}
              y={BOX.topY + 62}
              className="fill-fg font-sans dgm-lg"
            >
              {s.title}
            </text>
            <text
              x={x + 20}
              y={BOX.topY + 88}
              className="fill-fg-muted font-sans dgm-md"
            >
              {s.detail}
            </text>

            <line
              x1={cx}
              y1={down ? BOX.topY + BOX.h + 6 : BOX.botY - 6}
              x2={cx}
              y2={down ? BOX.botY - 6 : BOX.topY + BOX.h + 6}
              className="stroke-accent/70"
              strokeWidth={1.5}
            />
            {/* Arrowhead drawn as two strokes rather than a marker: markers
                are excluded by the diagram rules because they do not inherit
                token colours reliably. */}
            <polyline
              points={
                down
                  ? `${cx - 6},${BOX.botY - 16} ${cx},${BOX.botY - 6} ${cx + 6},${BOX.botY - 16}`
                  : `${cx - 6},${BOX.topY + BOX.h + 16} ${cx},${BOX.topY + BOX.h + 6} ${cx + 6},${BOX.topY + BOX.h + 16}`
              }
              className="stroke-accent"
              strokeWidth={1.5}
              fill="none"
            />
            <text
              x={cx + 14}
              y={(BOX.topY + BOX.h + BOX.botY) / 2 + 4}
              className="fill-fg-muted font-sans dgm-sm tracking-[0.1em] uppercase"
            >
              {s.becomes}
            </text>
          </g>
        );
      })}

      <rect
        x={16}
        y={BOX.botY}
        width={588}
        height={116}
        rx={6}
        className="fill-accent/[0.10] stroke-accent"
        strokeWidth={1}
      />
      <text
        x={310}
        y={BOX.botY + 32}
        textAnchor="middle"
        className="fill-accent font-sans dgm-sm tracking-[0.12em] uppercase"
      >
        Buy side
      </text>
      <text
        x={310}
        y={BOX.botY + 66}
        textAnchor="middle"
        className="fill-fg font-sans dgm-lg"
      >
        {buy.title}
      </text>
      <text
        x={310}
        y={BOX.botY + 94}
        textAnchor="middle"
        className="fill-fg-muted font-sans dgm-md"
      >
        {buy.detail}
      </text>
    </Frame>
  );
}
