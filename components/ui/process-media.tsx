import Image from "next/image";

/**
 * The three graphics that sit inside the /process media cards.
 *
 * ILLUSTRATIVE, NOT DATA. Every bar width, marker position and state below is
 * composition — it depicts the shape of the work described beside it and
 * nothing more. Nothing here is a figure, a result, or a claim about a real
 * mandate, which is why none of it carries a number. The one count that does
 * appear (`fundraising.webp`, "14 matched") is inside an existing Avalanche
 * asset already shipped on /solutions, not introduced here. See
 * docs/COPY-REVIEW.md.
 *
 * The reference gives each of its three cards a different treatment — a white
 * panel, a positioned image, and a 90% overlay. That variation is the point,
 * so all three are kept; which step gets which is assigned by what the step
 * actually needs. A chart wants a light ground, so the panel goes to the step
 * with a chart in it.
 *
 * Each of these renders the OVERLAY only. The dark plate underneath is the
 * card itself and belongs to the section.
 */

/**
 * The plate is `data-band="dark"` inside a light section, so tokens in here
 * resolve to their dark values — `fg` is white, `line` is a white hairline.
 * The panel below flips a second time, back to light, which is the case the
 * nested-band rules in globals.css exist for.
 */

/* ---------------------------------------------------------------- 01 */

/** A tick, for a material that clears the benchmark set. */
function Check() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 12 12"
      className="h-3 w-3 text-fg-muted"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2.5 6.5L5 9l4.5-5.5" />
    </svg>
  );
}

/**
 * `fill` is the bar's own length and `bench` the position of the comparable-set
 * marker above it. A material reads as short when its fill stops before the
 * marker, which is the whole content of the picture — hence no labels.
 */
const MATERIALS = [
  { name: "Investor deck", fill: 88, bench: 74, short: false },
  { name: "Data room", fill: 52, bench: 78, short: true },
  { name: "Financial model", fill: 81, bench: 70, short: false },
  { name: "Cap table", fill: 94, bench: 66, short: false },
  { name: "Diligence pack", fill: 44, bench: 72, short: true },
] as const;

/** Step 01 — the white panel treatment. 76% x 84.25% of the card, radius 6. */
export function ReadinessBoard() {
  return (
    <div
      data-band="light"
      aria-hidden
      className="flex h-[84.25%] w-[76%] flex-col gap-6 rounded-[6px] p-6 sm:p-7"
    >
      <div className="flex items-baseline justify-between gap-4">
        <p className="text-[13px] font-medium tracking-[0.06em] text-fg uppercase">
          Readiness review
        </p>
        <p className="shrink-0 text-[12px] text-fg-muted">
          vs. comparable raises
        </p>
      </div>

      <div className="flex flex-1 flex-col justify-center gap-5">
        {MATERIALS.map((m) => (
          <div key={m.name} className="flex flex-col gap-2.5">
            <div className="flex items-center justify-between gap-3">
              <p className="text-[13px] font-medium text-fg">{m.name}</p>
              {m.short ? (
                <p className="text-[11px] font-medium tracking-[0.06em] text-gold uppercase">
                  Below set
                </p>
              ) : (
                <Check />
              )}
            </div>

            <div className="relative h-1 rounded-full bg-line">
              <div
                className={`h-1 rounded-full ${m.short ? "bg-gold" : "bg-fg"}`}
                style={{ width: `${m.fill}%` }}
              />
              {/* The benchmark marker: a hairline standing clear of the bar on
                  both sides so it reads as a threshold rather than as a
                  segment of the bar it crosses. */}
              <span
                className="absolute -top-1 h-3 w-px bg-fg-muted"
                style={{ left: `${m.bench}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2.5 border-t border-line pt-4">
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
        <p className="text-[12px] text-fg-muted">
          Two items short of the comparable set
        </p>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- 02 */

/**
 * Step 02 — the positioned-image treatment, using the investor-segmentation
 * diagram already shipped on /solutions: a grid of investors by stage and
 * sector with the mandate-matched subset highlighted, which is precisely what
 * the step beside it describes.
 *
 * The reference oversizes its row-2 image and lets the card's overflow crop
 * it. This one is CONTAINED instead: the reference's asset is a texture that
 * survives cropping, and this one is a labelled diagram that does not. The
 * asset carries its own rounded light plate, so it reads as the panel.
 */
export function InvestorGrid() {
  return (
    <div className="relative h-[88%] w-[88%]">
      <Image
        src="/solutions/fundraising.webp"
        alt="A grid of investors by stage and sector, with the subset matching the mandate's criteria highlighted"
        fill
        sizes="(max-width: 809px) 90vw, (max-width: 1199px) 85vw, 570px"
        className="object-contain"
      />
    </div>
  );
}

/* ---------------------------------------------------------------- 03 */

/** Bar length is stage width, not a rate. The point of the picture is that
 *  the last row is a different KIND of thing, not that it is small. */
const STAGES = [
  { name: "Outreach", width: "100%", closed: false },
  { name: "First meetings", width: "68%", closed: false },
  { name: "Diligence", width: "44%", closed: false },
  { name: "Term sheet", width: "26%", closed: true },
] as const;

/** Step 03 — the 90% x 90% overlay treatment, on the dark plate. */
export function ConversionPanel() {
  return (
    <div
      aria-hidden
      className="flex h-[90%] w-[90%] flex-col justify-center gap-7 rounded-[6px] border border-line bg-white/[0.03] p-6 backdrop-blur-[2px] sm:p-8"
    >
      <div className="flex items-baseline justify-between gap-4">
        <p className="text-[13px] font-medium tracking-[0.06em] text-fg uppercase">
          Conversion
        </p>
        <p className="shrink-0 text-[12px] text-fg-muted">Per mandate</p>
      </div>

      <div className="flex flex-col gap-3.5">
        {STAGES.map((s) => (
          <div key={s.name} className="flex items-center gap-4">
            <p className="w-[92px] shrink-0 text-[13px] text-fg-muted sm:w-[110px]">
              {s.name}
            </p>
            <div className="min-w-0 flex-1">
              <div
                className="h-8 rounded-[3px]"
                style={{
                  width: s.width,
                  background: s.closed
                    ? "linear-gradient(90deg, var(--color-gold-light), var(--color-gold-deep))"
                    : "rgba(255,255,255,0.10)",
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2.5 border-t border-line pt-5">
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
        <p className="text-[12px] text-fg-muted">
          The milestone is a signed term sheet, not a meeting
        </p>
      </div>
    </div>
  );
}
