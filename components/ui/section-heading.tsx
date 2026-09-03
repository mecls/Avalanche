type Props = {
  eyebrow?: string;
  title: string;
  /**
   * Trailing substring of `title` that used to be rendered in a gold italic
   * accent. The Fundraisr design has no accent motif — headings are flat — so
   * this is currently accepted and ignored. Kept because the emphasis points
   * are editorial information worth not throwing away.
   */
  accent?: string;
  lede?: string;
  align?: "left" | "center";
  className?: string;
};

/** Eyebrow + display heading + optional lede. */
export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "left",
  className = "",
}: Props) {
  const centered = align === "center";

  return (
    <div
      className={`${centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"} ${className}`}
    >
      {eyebrow && <p className="eyebrow mb-5">{eyebrow}</p>}
      <h2 className="display text-[clamp(1.875rem,4vw,2.75rem)] text-balance">
        {title}
      </h2>
      {lede && (
        <p
          className={`mt-5 text-[0.9375rem] leading-relaxed text-fg-muted ${
            centered ? "mx-auto" : ""
          }`}
        >
          {lede}
        </p>
      )}
    </div>
  );
}
