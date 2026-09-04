/**
 * The bordered grid with corner brackets, shared by three sections
 * (track record, raise types, verticals). Only the cell CONTENT differs —
 * the frame, the hairlines, the index numbers and the brackets are the same,
 * so they live here rather than in three copies.
 *
 * `cols` is the column count at `lg`. Pick one that divides evenly into the
 * row shapes you want: 6 gives 3+3 and 2+2+2, 4 gives rows of four.
 */
type GridProps = {
  children: React.ReactNode;
  className?: string;
};

export function BracketGrid({ children, className = "" }: GridProps) {
  return (
    <div className={`relative ${className}`}>
      <div className="grid grid-cols-1 border-t border-l border-line sm:grid-cols-2">
        {children}
      </div>

      {/* Decorative frame, drawn outside the grid's own rules so it reads as a
          bracket rather than a thicker border.

          Set in the ACCENT rather than the old fg/45, which is what gives the
          three bracketed sections (track record, raise types, verticals) their
          note of colour. Safe to saturate because it is `aria-hidden` and
          carries nothing — it is a frame, not a mark of state. */}
      <span
        aria-hidden
        className="pointer-events-none absolute -top-1.5 -left-1.5 h-9 w-9 border-t border-l border-accent"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -right-1.5 -bottom-1.5 h-9 w-9 border-r border-b border-accent"
      />
    </div>
  );
}

export function BracketCell({
  index,
  children,
  className = "",
  minH = "min-h-[13rem]",
}: {
  index: number;
  children: React.ReactNode;
  className?: string;
  minH?: string;
}) {
  return (
    <div
      className={`relative flex flex-col justify-between border-r border-b border-line p-7 sm:p-8 ${minH} ${className}`}
    >
      <span className="absolute top-6 right-6 text-sm text-fg-faint tabular-nums">
        {String(index + 1).padStart(2, "0")}
      </span>
      {children}
    </div>
  );
}

/**
 * Column spans for a trailing row that would otherwise be ragged.
 *
 * Five cells in a four-column grid leaves two empty cells and a corner bracket
 * floating in space. This widens the last row's cells to fill it, giving the
 * final one whatever is left over so the total always lands exactly on `cols`.
 */
export function trailingSpans(total: number, cols: number): number[] {
  const spans = new Array(total).fill(1);
  const remainder = total % cols;
  if (remainder === 0) return spans;

  const base = Math.floor(cols / remainder);
  for (let i = 0; i < remainder; i++) {
    spans[total - remainder + i] = base;
  }
  // hand the rounding leftover to the final cell
  spans[total - 1] += cols - base * remainder;
  return spans;
}
