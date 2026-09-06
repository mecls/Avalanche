import { Caption, Frame } from "@/components/ui/diagram";

/**
 * The two diagrams on /manifesto.
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
  const pillCx = px(PILL_AT);
  const pillTop = py(SERIES[PILL_AT]!.capital) - 15;

  return (
    <Frame>
      {/* SHORT ON PURPOSE. The two captions share one baseline and SVG does
          not reflow, so the pair has to fit 620 units at the LARGEST rung —
          `dgm-sm` is 21 units below 479px, roughly 15.5 units a character
          with the tracking. 22 + 22 characters was 682 and they overlapped on
          a phone. The shipped six top out at 18. Keep the sum under ~36. */}
      <Caption x={0} y={20}>
        Capital supply
      </Caption>
      <Caption x={620} y={20} anchor="end">
        Distribution
      </Caption>

      {/* The wash first, so both lines sit on top of their own boundary. */}
      <polygon points={gap} className="fill-accent/[0.07]" />

      {/* The route that is narrowing.

          `fg-muted/50` is the system's ghost value and is kept EXACTLY, even
          though this line carries more weight than a ghost dot does. Measured
          on the plate: 2.8:1 against the ground and 2.7:1 against the accent
          line. The first of those is under the 3:1 floor for a meaningful
          graphic — but it is the same value the six /solutions diagrams ship
          for their ghost dots, the frame is `aria-hidden` and the copy beside
          it states both claims in words, so this is a property of the system
          rather than of this diagram.

          DO NOT FIX IT HERE ALONE. Raising the alpha lifts the ground contrast
          and collapses the accent separation in the same move — /70 measures
          3.9:1 against the ground but only 1.8:1 against the accent, which is
          the failure the README's accent section is written about. If the
          ghost value changes it changes for all eight diagrams at once.
          
          What this line has that a ghost dot does not: a dash pattern and an
          opposite direction. Both survive a luminance failure. */}
      <polyline
        points={access}
        className="stroke-fg-muted/50"
        strokeWidth={2}
        strokeDasharray="7 6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <polyline
        points={capital}
        className="stroke-accent"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
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

      {/* Time. A rule and two ends, because the horizontal axis carries no
          quantity — only a direction. */}
      <path d="M0,408 H620" className="stroke-line-soft" strokeWidth={1} />
      <text x={0} y={436} className="fill-fg-muted font-sans dgm-md">
        A decade ago
      </text>
      <text
        x={620}
        y={436}
        textAnchor="end"
        className="fill-fg-muted font-sans dgm-md"
      >
        Today
      </text>

      {/* Straddles the accent line at the point the gap is plainly open. */}
      <g>
        <rect
          x={pillCx - 56}
          y={pillTop}
          width={112}
          height={30}
          rx={15}
          className="fill-ground stroke-accent"
          strokeWidth={1}
        />
        <text
          x={pillCx}
          y={pillTop + 19}
          textAnchor="middle"
          className="fill-accent font-sans dgm-xs font-medium tracking-[0.08em] uppercase"
        >
          Access gap
        </text>
      </g>

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

const LAYERS = [
  {
    n: "03",
    label: "The addressable universe",
    /** The rect, and the row that labels it. Rows cascade inward with the
     *  rects so each sits in its own band. */
    rect: { x: 0, y: 56, w: 620, h: 352, r: 16 },
    row: { x: 16, y: 86 },
    outer: true,
  },
  {
    n: "02",
    label: "The extended network",
    rect: { x: 76, y: 116, w: 468, h: 232, r: 14 },
    row: { x: 94, y: 146 },
    outer: false,
  },
  {
    n: "01",
    label: "Your own network",
    rect: { x: 150, y: 176, w: 320, h: 112, r: 12 },
    row: { x: 168, y: 232 },
    outer: false,
  },
];

export function AccessLayersDiagram() {
  const outer = LAYERS[0]!.rect;

  return (
    <Frame>
      <Caption x={0} y={20}>
        Your reach
      </Caption>
      <Caption x={620} y={20} anchor="end">
        The universe
      </Caption>

      {/* Outermost first. Each inner rect is `fill-ground`, so it knocks the
          wash back out and leaves the accent showing as the outer band only. */}
      {LAYERS.map((l) => (
        <rect
          key={`r-${l.n}`}
          x={l.rect.x}
          y={l.rect.y}
          width={l.rect.w}
          height={l.rect.h}
          rx={l.rect.r}
          className={
            l.outer
              ? "fill-accent/[0.07] stroke-accent"
              : "fill-ground stroke-line"
          }
          strokeWidth={1}
        />
      ))}

      {LAYERS.map((l) => (
        <g key={`l-${l.n}`}>
          <circle
            cx={l.row.x}
            cy={l.row.y}
            r={l.outer ? 6 : 5}
            className={l.outer ? "fill-accent" : "fill-fg-muted/50"}
          />
          <text
            x={l.row.x + 16}
            y={l.row.y + 6}
            className="fill-fg-faint font-sans dgm-sm tracking-[0.12em] uppercase"
          >
            {l.n}
          </text>
          <text
            x={l.row.x + 52}
            y={l.row.y + 6}
            className={`font-sans dgm-lg ${
              l.outer ? "fill-fg" : "fill-fg-muted"
            }`}
          >
            {l.label}
          </text>
        </g>
      ))}

      <g>
        <rect
          x={outer.x + outer.w / 2 - 62}
          y={outer.y - 15}
          width={124}
          height={30}
          rx={15}
          className="fill-ground stroke-accent"
          strokeWidth={1}
        />
        <text
          x={outer.x + outer.w / 2}
          y={outer.y + 4}
          textAnchor="middle"
          className="fill-accent font-sans dgm-xs font-medium tracking-[0.08em] uppercase"
        >
          Addressable
        </text>
      </g>

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
