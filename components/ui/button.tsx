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
 * `ghost` is the header button and is NOT a bordered outline: the reference
 * uses an almost-invisible 1% white fill plus a 6px backdrop blur, so it
 * reads as glass over the hero footage and as nothing at all over a flat
 * band. It has no border precisely because the blur is doing the separating.
 *
 * Geometry measured from the reference: 4px radius, 14/20 padding, 47.2px
 * tall, 16px/19.2px Inter 500. A rectangle, not a pill, and no trailing glyph.
 */
export function CtaButton({
  href,
  children,
  size = "md",
  variant = "solid",
  className = "",
  ...rest
}: Props) {
  const sizing =
    size === "sm"
      ? "px-4 py-2.5 text-sm"
      : "h-[47.2px] px-5 py-3.5 text-base leading-[19.2px]";
  const look =
    variant === "solid"
      ? "bg-fg text-ground tracking-[-0.01em] hover:bg-fg/88"
      : "bg-white/[0.01] text-fg tracking-[-0.05em] backdrop-blur-[6px] hover:bg-white/[0.08]";

  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-3 rounded-[4px] font-medium transition-colors duration-200 ${sizing} ${look} ${className}`}
      {...rest}
    >
      {children}
    </Link>
  );
}
