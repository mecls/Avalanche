import Link from "next/link";
import type { ComponentProps } from "react";

type Props = {
  href: string;
  children: React.ReactNode;
  /** `sm` is the nav button; `md` the in-page CTA. */
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
 * Measured off fundraisr.ai: 6px radius, 8/16 padding, 16px, weight 400. A
 * rectangle, not a pill, and no trailing glyph.
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
    size === "sm" ? "px-4 py-2 text-[0.8125rem]" : "px-4 py-2 text-base";
  const look =
    variant === "solid"
      ? "bg-fg text-ground hover:bg-fg/88"
      : "border border-line text-fg hover:border-fg/35 hover:bg-fg/[0.06]";

  return (
    <Link
      href={href}
      className={`inline-flex items-center rounded-md transition-colors duration-200 ${sizing} ${look} ${className}`}
      {...rest}
    >
      {children}
    </Link>
  );
}
