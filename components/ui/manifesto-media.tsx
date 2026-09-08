import { Caption, Frame } from "@/components/ui/diagram";

/**
 * The two manifesto diagrams — the divergence and the three access layers.
 * They render in the middle of /about; the file keeps its name because the
 * content object it draws is still `manifesto`.
 *
 * Drawn in the same system as the six on /solutions — same 620x508 `Frame`,
 * same two corner `Caption`s, same legend columns fixed at x=5/22 and
 * x=320/337, same `dgm-*` rungs, tokens only. The authoring rules and the
 * reasoning behind each of them are in the header of solutions-media.tsx;
 * this file follows them rather than restating them.
 *
 * TWO DIFFERENCES FROM THE SIX, BOTH DELIBERATE.
 *
 * 1. NEITHER CARRIES A FIGURE. The /solutions diagrams derive a count from the
 *    array drawn beside them ("8 matched", "3 of 4 aligned") so a pill cannot
 *    drift from its own picture. These make claims that have no count in them,
 *    so their pills are one-word readouts like PreMarketing's "Positioned".
 *    The invariant still holds in the form that applies: in `DivergenceDiagram`
 *    the shaded gap is built from the same array that draws both lines, so the
 *    wash cannot disagree with the lines it sits between.
 *
 * 2. THE ACCENT MARKS WHAT IS *NOT* BEING REACHED. On /solutions it says which
 *    route matched, which segment was selected. Here it marks the region the
 *    page is about — the gap between the two lines, and the outer layer of the
 *    network. That is the subject of the picture rather than a success state.
 *    Both pills say so in words ("Access gap", "Addressable") precisely so the
 *    inversion reads as intended. Do not "correct" it to mark the inner layers
 *    instead; that would draw the opposite claim.
 */

/* -------------------------------------------------------------------------
   01 — The divergence.

   ONE ARRAY DRIVES ALL THREE MARKS. The accent line, the ghost line and the
   wash between them are all built from `SERIES` in the same render, so the
   shaded region is by construction the area between the two lines. There is
   no second set of coordinates that could fall out of step with the first.

   The values are a SHAPE, not data. They are unlabelled on purpose: no axis
   ticks, no units, no numbers anywhere on the frame. The claim the picture
   makes is "these two move apart", which is a direction rather than a
   quantity — see the header of content/manifesto.ts for why this page carries
   no figures at all.
   ------------------------------------------------------------------------- */

/** Both series start together and separate. 0 is the plot floor, 1 the ceiling. */
const SERIES = [
  { capital: 0.34, access: 0.34 },
  { capital: 0.5, access: 0.3 },
  { capital: 0.66, access: 0.25 },
  { capital: 0.82, access: 0.19 },
  { capital: 0.97, access: 0.12 },
];

/** Plot box. The floor sits well above the baseline rule at 408. */
const PLOT = { x0: 8, x1: 600, top: 70, bottom: 390 };

const px = (i: number) =>
  PLOT.x0 + (i * (PLOT.x1 - PLOT.x0)) / (SERIES.length - 1);
const py = (v: number) => PLOT.bottom - v * (PLOT.bottom - PLOT.top);

/** The index the pill straddles — far enough right that the gap is obviously
 *  open, far enough left that a 112-unit pill stays inside the frame. */
const PILL_AT = 3;

export function DivergenceDiagram() {
  const capital = SERIES.map((d, i) => `${px(i)},${py(d.capital)}`).join(" ");
  const access = SERIES.map((d, i) => `${px(i)},${py(d.access)}`).join(" ");

  // Capital forward, access back — the closed area BETWEEN the two lines.
  const gap = [
    ...SERIES.map((d, i) => `${px(i)},${py(d.capital)}`),
    ...SERIES.map((d, i) => `${px(i)},${py(d.access)}`).reverse(),
  ].join(" ");

  const last = SERIES.length - 1;
  // The divider sits where the gap is already unambiguous but the lines have
  // not yet reached their terminals, so the callout has room to its right.
  const cut = px(3);

  return (
    <Frame>
      <Caption x={0} y={20}>
        Capital supply
      </Caption>
      <Caption x={620} y={20} anchor="end">
        Distribution
      </Caption>

      <polygon points={gap} className="fill-accent/[0.07]" />

      <polyline
        points={access}
        className="stroke-fg-muted/50"
        strokeWidth={2}
        strokeDasharray="6 6"
        strokeLinecap="round"
      />
      <polyline
        points={capital}
        className="stroke-accent"
        strokeWidth={2}
        strokeLinecap="round"
      />

      <circle
        cx={px(last)}
        cy={py(SERIES[last]!.capital)}
        r={6}
        className="fill-accent"
      />
      <circle
        cx={px(last)}
        cy={py(SERIES[last]!.access)}
        r={5}
        className="fill-fg-muted/50"
      />

      {/* The callout replaced a pill straddling the capital line. A pill names
          the gap; this measures it — the dashed rule spans the two series at
          one x, so the label sits on the distance it is describing rather than
          floating above one of the lines. */}
      <line
        x1={cut}
        y1={py(SERIES[3]!.capital)}
        x2={cut}
        y2={py(SERIES[3]!.access)}
        className="stroke-accent/60"
        strokeWidth={1}
        strokeDasharray="4 4"
      />
      <text
        x={cut + 14}
        y={py(SERIES[3]!.capital) + 52}
        className="fill-accent font-sans dgm-sm font-medium tracking-[0.1em] uppercase"
      >
        The access gap
      </text>
      <text
        x={cut + 14}
        y={py(SERIES[3]!.capital) + 76}
        className="fill-fg-muted font-sans dgm-sm tracking-[0.08em] uppercase"
      >
        Widening, not closing
      </text>

      {/* Three ticks rather than two. The third is what turns the picture from
          a description of the past into the claim the page actually makes. */}
      <line
        x1={0}
        y1={408}
        x2={620}
        y2={408}
        className="stroke-line-soft"
        strokeWidth={1}
      />
      <text x={0} y={432} className="fill-fg-muted font-sans dgm-md">
        Ten years ago
      </text>
      <text
        x={310}
        y={432}
        textAnchor="middle"
        className="fill-fg-muted font-sans dgm-md"
      >
        Today
      </text>
      <text
        x={620}
        y={432}
        textAnchor="end"
        className="fill-fg-muted font-sans dgm-md"
      >
        2030 and beyond
      </text>

      <g>
        <circle cx={5} cy={490} r={5} className="fill-accent" />
        <text x={22} y={495} className="fill-fg-muted font-sans dgm-md">
          Capital available
        </text>
        <circle cx={320} cy={490} r={5} className="fill-fg-muted/50" />
        <text x={337} y={495} className="fill-fg-muted font-sans dgm-md">
          Routes to it
        </text>
      </g>
    </Frame>
  );
}

/* -------------------------------------------------------------------------
   02 — The three layers.

   NESTING IS THE CLAIM, so the three are concentric rather than stacked: each
   layer contains the one before it, and the outer band is the part of the
   universe the first two cannot reach.

   The accent is knocked out rather than painted. The outer rect carries the
   wash across its whole area and the inner two are filled with `ground`, so
   what remains visible is exactly the outer BAND — the addressable layer,
   and nothing else. Same trick the pills use to sit on top of a line.

   Rectilinear rather than circular because every other diagram in the system
   is, and because a rounded rect gives each label a straight run to sit on.
   Concentric circles would have put three labels on three different chords.
   ------------------------------------------------------------------------- */

/**
 * Concentric CIRCLES, not the nested rounded rects this drew until 7 Sep 2026.
 *
 * The rects had the same nesting and read as a stack of cards; circles read as
 * reach, which is the claim. Each ring is labelled inside its own band, so the
 * three bands are the three layers and the gap between the outer two is the
 * thing being pointed at.
 *
 * **THE RADII ARE SET BY THE TYPE, NOT THE OTHER WAY ROUND.** Each band has to
 * hold a two-line label without either line touching the arcs either side of
 * it, and at this frame's rungs a label is about 40 units tall. A first pass
 * at r 175/122/72 gave the middle band 50 units to hold that, and its second
 * line sat on the ring below. The reference this was drawn from carries text
 * at about 5% of its outer radius; the rungs here put it nearer 10%, which is
 * the whole reason the rings had to grow rather than the labels shrink.
 *
 * **THE INNER TWO SHRANK RATHER THAN THE OUTER ONE GROWING** (8 Sep 2026),
 * because the outer radius has nowhere to go: 200 already spans 45 to 445
 * against the "Exposure gap" label at 20-37 and the legend at 479-498, so
 * growing it runs into one or the other. 136/76 left the two label groups
 * with 5 and 10 units of air — measured off the real bounding boxes, not
 * estimated — which is what "the text is touching the circumference" looks
 * like. 126/62 opens the outer band from 64 to 74 units and the middle one
 * from 60 to 64, and the labels moved up into it: 12-16 units of clearance
 * on each side of both groups now.
 *
 * The bound: `cy` 245 with `r` 200 spans 45 to 445, clear of the captions at
 * 20 and the legend baseline at 490.
 */
const RINGS = [
  {
    n: "Layer three",
    label: "The addressable universe",
    r: 200,
    labelY: 386,
    outer: true,
  },
  {
    n: "Layer two",
    label: "Extended network",
    r: 126,
    labelY: 316,
    outer: false,
  },
  { n: "Layer one", label: "Your network", r: 62, labelY: 239, outer: false },
];

const CX = 310;
const CY = 245;

/**
 * `labelY` is measured, not centred, and this is why.
 *
 * A first version put each label at the midpoint of its band, which is right
 * on the vertical centre line and wrong everywhere else — **a circle curves
 * back up at its edges**, so the arc above a wide label is much lower at the
 * label's ends than at its middle. Both outer labels collided with their own
 * ring even though the centre-line clearance looked fine.
 *
 * The constraint is the CHORD. At a distance `dy` below the centre, a ring of
 * radius `r` leaves a half-width of `sqrt(r^2 - dy^2)`, and the label's own
 * half-width has to fit inside it. Solving that for these three:
 *
 * Solved against the MEASURED bounding boxes at r 200/126/62. Each row is the
 * label's own half-width, the y at which the arc below it crosses that
 * half-width, and the resulting ordinal/name baselines:
 *
 *   "The addressable universe"  83 half   arc at y=427  ->  386/408
 *   "Extended network"          59 half   arc at y=356  ->  316/338
 *   "Your network"              43 half   arc at y=290  ->  239/261
 *
 * Each also has to clear the ring INSIDE it — the arc above crosses the
 * ORDINAL's half-width at y=361, y=290 and y=199 respectively — which is what
 * sets the upper bound. Both bounds are live for the outer two groups: they
 * sit with roughly 12-16 units of air above and below, and there is no slack
 * to spend. **Re-solve if a label's wording or a radius changes** —
 * lengthening a label moves its collision point up, and the numbers above stop
 * being true.
 */

/**
 * IT IS DRAWN ONCE, AND A `focus` PROP WAS TRIED AND REMOVED (7 Sep 2026).
 *
 * When the three layers became three panels, this was drawn three times with
 * a different ring emphasised each time. It repeated one picture down three
 * screens, and the emphasis could not carry the difference: the accent has to
 * stay on the OUTER band whatever is being pointed at — that band is the
 * diagram's claim rather than its cursor — so all three read as the same
 * frame with a slightly brighter ring. The panels take three different
 * pictures now and this one sits on the layer it is actually about.
 */
export function AccessLayersDiagram() {
  const outer = RINGS[0]!;
  const mid = RINGS[1]!;

  return (
    <Frame>
      <Caption x={0} y={20}>
        Your reach
      </Caption>
      <Caption x={620} y={20} anchor="end">
        The universe
      </Caption>

      {/* Outermost first. Each inner circle is `fill-ground`, so it knocks the
          wash back out and leaves the accent showing as the outer band only —
          the layer that is NOT being reached. */}
      {RINGS.map((ring) => (
        <circle
          key={ring.n}
          cx={CX}
          cy={CY}
          r={ring.r}
          className={
            ring.outer
              ? "fill-accent/[0.07] stroke-accent"
              : "fill-ground stroke-line"
          }
          strokeWidth={1}
        />
      ))}

      {/* Each label sits centred in its own band — see `bandLabelY`. The
          ordinal takes the smaller rung and the name the middle one; `dgm-lg`
          here was what made the pair too tall for a 60-unit band. */}
      {RINGS.map((ring) => {
        const y = ring.labelY;
        return (
          <g key={`t-${ring.n}`}>
            <text
              x={CX}
              y={y}
              textAnchor="middle"
              className={`font-sans dgm-sm tracking-[0.12em] uppercase ${
                ring.outer ? "fill-accent" : "fill-fg-faint"
              }`}
            >
              {ring.n}
            </text>
            <text
              x={CX}
              y={y + 22}
              textAnchor="middle"
              className={`font-sans dgm-md ${
                ring.outer ? "fill-fg" : "fill-fg-muted"
              }`}
            >
              {ring.label}
            </text>
          </g>
        );
      })}

      {/* The gap itself, measured rather than named: the rule spans the outer
          band at the top of the figure, where the two arcs are furthest apart
          vertically and nothing else is drawn. */}
      <line
        x1={CX}
        y1={CY - outer.r}
        x2={CX}
        y2={CY - mid.r}
        className="stroke-accent/70"
        strokeWidth={1}
        strokeDasharray="4 4"
      />
      {/* ABOVE the apex, not beside the rule. Set at `CX + 14` it ran
          rightwards across the outer arc and the last glyph sat on the ring:
          at that baseline the circle has a half-width of
          sqrt(200^2 - 150^2) = 132, so the arc crosses x=442 and the label
          reached 443. Centred above the circle it has the whole frame width
          and cannot collide with anything but the corner captions, which are
          ranged to the two edges. Same chord arithmetic as the band labels
          below — see the note on `labelY`. */}
      <text
        x={CX}
        y={CY - outer.r - 12}
        textAnchor="middle"
        className="fill-accent font-sans dgm-sm font-medium tracking-[0.1em] uppercase"
      >
        Exposure gap
      </text>

      <g>
        <circle cx={5} cy={490} r={5} className="fill-accent" />
        <text x={22} y={495} className="fill-fg-muted font-sans dgm-md">
          Addressable
        </text>
        <circle cx={320} cy={490} r={5} className="fill-fg-muted/50" />
        <text x={337} y={495} className="fill-fg-muted font-sans dgm-md">
          Already reached
        </text>
      </g>
    </Frame>
  );
}
