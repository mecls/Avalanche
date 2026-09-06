import Link from "next/link";
import type { ComponentProps } from "react";

type Props = {
  href: string;
  children: React.ReactNode;
  /** `sm` is the nav button; `md` the in-page CTA. Both are 47.2px tall in
   *  the reference — `sm` exists now only for tighter in-card CTAs. */
  size?: "sm" | "md";
  variant?: "solid" | "ghost";
  className?: string;
} & Omit<ComponentProps<typeof Link>, "href" | "className">;

/**
 * Every CTA on the site routes through here.
 *
 * `solid` is foreground-on-ground inverted — white on black in a dark band,
 * black on white in a light one — because both tokens are re-pointed by
 * `[data-band]`. That is the whole reason the buttons need no variant prop.
 *
 * `ghost` is the header button. It is a 1% white fill plus a 6px backdrop
 * blur — glass — and it NOW CARRIES A BORDER, which the reference's does not.
 *
 * Without one it reads as glass over the hero footage and as nothing at all
 * over a flat band: the blur has nothing to separate against, so on every page
 * but the homepage the site's most-repeated CTA was bare text. The border is
 * `border-fg/70`, so it inverts with the band exactly as `solid`'s fill does —
 * white over the hero video and over a dark first section, ink over a light
 * one — from the same markup and with no `tone` prop. `box-border` is
 * Tailwind's default, so it costs no height against the fixed 47.2px.
 *
 * Geometry measured from the reference: 4px radius, 14/20 padding, 47.2px
 * tall, 16px/19.2px Satoshi 500. A rectangle, not a pill, and no trailing glyph.
 */
export function CtaButton({
  href,
  children,
  size = "md",
  variant = "solid",
  className = "",
  ...rest
}: Props) {
  return (
    <Link href={href} className={ctaClass(size, variant, className)} {...rest}>
      {children}
    </Link>
  );
}

/**
 * The button look, in one place, because there are now two elements wearing it.
 *
 * Everything on the site that navigates is a `CtaButton`, i.e. a `Link`. The
 * questionnaire on /get-in-touch needs a real `<button type="submit">` — an
 * anchor with `href="#"` and a click handler would break middle-click, break
 * Enter-to-submit, and put a bogus destination in the DOM. Both call this so
 * the two cannot drift apart.
 */
function ctaClass(
  size: "sm" | "md",
  variant: "solid" | "ghost",
  className: string,
) {
  const sizing =
    size === "sm"
      ? "px-4 py-2.5 text-sm"
      : "h-[47.2px] px-5 py-3.5 text-base leading-[19.2px]";
  const look =
    variant === "solid"
      ? "bg-fg text-ground tracking-[-0.01em] hover:bg-fg/88"
      : "border border-fg/70 bg-white/[0.01] text-fg tracking-[-0.05em] backdrop-blur-[6px] hover:border-fg hover:bg-white/[0.08]";

  return `inline-flex items-center justify-center gap-3 rounded-[4px] font-medium transition-colors duration-200 disabled:pointer-events-none disabled:opacity-40 ${sizing} ${look} ${className}`;
}

/** A `CtaButton` that submits a form instead of navigating. Same geometry. */
export function CtaSubmit({
  children,
  size = "md",
  variant = "solid",
  className = "",
  ...rest
}: {
  children: React.ReactNode;
  size?: "sm" | "md";
  variant?: "solid" | "ghost";
  className?: string;
} & Omit<ComponentProps<"button">, "className">) {
  return (
    <button className={ctaClass(size, variant, className)} {...rest}>
      {children}
    </button>
  );
}

/**
 * Trailing arrow for a page-header CTA. Slides right on hover, which is why
 * the button it sits in needs `className="group"` — without that the
 * transition never fires and it reads as a static glyph.
 *
 * NOT in components/ui/icons.tsx: that file is a uniform set of 24-viewBox,
 * 1.25-stroke grid glyphs, and this is a 16-viewBox, 1.5-stroke run that only
 * ever appears inside a CtaButton. It lives here so the two import together.
 *
 * Deliberately NOT folded into CtaButton as a prop. Most CTAs on the site
 * carry no glyph — the reference's button is a bare rectangle — and the two
 * page headers that do use it are the exception, not the default.
 */
export function ArrowGlyph() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      className="h-3.5 w-3.5 shrink-0 transition-transform duration-200 group-hover:translate-x-1"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M2 8h12M9 3l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
