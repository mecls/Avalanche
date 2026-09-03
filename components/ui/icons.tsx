/**
 * Thin line icons for the vertical and raise-type grids.
 *
 * Inline SVG rather than an icon package: fourteen 24px glyphs is not worth a
 * dependency, and `currentColor` means they follow the `[data-band]` token
 * flip for free. Uniform 24 viewBox, 1.25 stroke, round caps.
 */
import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function Svg({ children, ...rest }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...rest}
    >
      {children}
    </svg>
  );
}

export const ICONS = {
  // --- raise types ---
  funds: (p: IconProps) => (
    <Svg {...p}>
      <ellipse cx="12" cy="6.5" rx="7.5" ry="3" />
      <path d="M4.5 6.5v5c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3v-5" />
      <path d="M4.5 11.5v5c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3v-5" />
    </Svg>
  ),
  preseed: (p: IconProps) => (
    <Svg {...p}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M15 9l-2 5-4 1 2-5z" />
    </Svg>
  ),
  growth: (p: IconProps) => (
    <Svg {...p}>
      <path d="M4 17l5-5 3 3 6-7" />
      <path d="M14 8h4v4" />
      <circle cx="4" cy="17" r="0.6" fill="currentColor" stroke="none" />
    </Svg>
  ),
  credit: (p: IconProps) => (
    <Svg {...p}>
      <path d="M6 3.5h8l4 4v13H6z" />
      <path d="M14 3.5v4h4" />
      <path d="M9 14.5l2 2 3.5-4" />
    </Svg>
  ),

  calendar: (p: IconProps) => (
    <Svg {...p}>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
      <path d="M3.5 9.5h17M8 3.5v3M16 3.5v3" />
      <path d="M7.5 13h2M11 13h2M14.5 13h2M7.5 16.5h2M11 16.5h2" />
    </Svg>
  ),

  // --- verticals ---
  consumer: (p: IconProps) => (
    <Svg {...p}>
      <path d="M3.5 7.5h17v11h-17z" />
      <path d="M3.5 11h17" />
      <path d="M7 15h3" />
    </Svg>
  ),
  construction: (p: IconProps) => (
    <Svg {...p}>
      <path d="M4 20h16" />
      <path d="M6 20V9l6-4 6 4v11" />
      <path d="M10 20v-5h4v5" />
    </Svg>
  ),
  media: (p: IconProps) => (
    <Svg {...p}>
      <rect x="3.5" y="5" width="17" height="14" rx="2" />
      <path d="M10.5 9.5l4.5 2.5-4.5 2.5z" />
    </Svg>
  ),
  environment: (p: IconProps) => (
    <Svg {...p}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6L17 7M7 17l-1.4 1.4" />
    </Svg>
  ),
  finance: (p: IconProps) => (
    <Svg {...p}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7v10" />
      <path d="M14.5 9.5c0-1.1-1.1-1.8-2.5-1.8s-2.5.7-2.5 1.8 1.1 1.6 2.5 1.9 2.5.8 2.5 1.9-1.1 1.8-2.5 1.8-2.5-.7-2.5-1.8" />
    </Svg>
  ),
  health: (p: IconProps) => (
    <Svg {...p}>
      <path d="M9.5 3.5h5v6h6v5h-6v6h-5v-6h-6v-5h6z" />
    </Svg>
  ),
  mining: (p: IconProps) => (
    <Svg {...p}>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="3.5" />
      <path d="M12 3.5v3M12 17.5v3M3.5 12h3M17.5 12h3" />
    </Svg>
  ),
  realestate: (p: IconProps) => (
    <Svg {...p}>
      <path d="M4 20V6.5l7-3 7 3V20" />
      <path d="M2.5 20h19" />
      <path d="M8 11h2M14 11h2M8 15h2M14 15h2" />
    </Svg>
  ),
  technology: (p: IconProps) => (
    <Svg {...p}>
      <rect x="7.5" y="7.5" width="9" height="9" rx="1.5" />
      <path d="M10.5 3.5v4M13.5 3.5v4M10.5 16.5v4M13.5 16.5v4M3.5 10.5h4M3.5 13.5h4M16.5 10.5h4M16.5 13.5h4" />
    </Svg>
  ),
  transport: (p: IconProps) => (
    <Svg {...p}>
      <path d="M2.5 13.5l19-6.5-4.5 8.5-3.5.8-2.2 4.2-1.6-4.4z" />
    </Svg>
  ),
} as const;

export type IconName = keyof typeof ICONS;

export function Icon({ name, className }: { name: IconName; className?: string }) {
  const Glyph = ICONS[name];
  return <Glyph className={className} />;
}
