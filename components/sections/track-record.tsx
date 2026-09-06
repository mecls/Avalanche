"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import { CtaButton } from "@/components/ui/button";
import { BracketGrid, BracketCell } from "@/components/ui/bracket-grid";
import { trackRecord } from "@/content/copy";

const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void) {
  const mq = window.matchMedia(REDUCED_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

/** Reduced motion is external state, so it is read as external state rather
 *  than mirrored into a setState inside an effect. Server snapshot is `false`,
 *  which matches the pre-hydration markup. */
function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_QUERY).matches,
    () => false,
  );
}

/**
 * Counts 0 → `to` once, the first time the band scrolls into view.
 *
 * These are financial claims, so the displayed figure must never be left
 * mid-count: the animation snaps to `to` on cleanup, and small values skip
 * the count entirely (a 0 → 2 tick reads as broken, not impressive).
 */
function useCountUp(to: number, run: boolean, ms = 1600) {
  const animates = to >= 10;
  const reduced = usePrefersReducedMotion();
  const [n, setN] = useState(animates ? 0 : to);

  useEffect(() => {
    if (!run || !animates || reduced) return;

    let raf = 0;
    let done = false;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / ms, 1);
      // ease-out cubic, so it decelerates into the final figure
      setN(to * (1 - Math.pow(1 - t, 3)));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        done = true;
        setN(to);
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      // rAF is throttled in background tabs and can be torn down mid-flight;
      // never leave a partial number standing in for a real figure.
      if (!done) setN(to);
    };
  }, [to, run, ms, animates, reduced]);

  // Under reduced motion the true figure is shown outright — never counted.
  return reduced ? to : n;
}

function Stat({
  prefix,
  to,
  suffix,
  decimals,
  label,
  index,
  run,
  className = "",
}: {
  prefix: string;
  to: number;
  suffix: string;
  decimals: number;
  label: string;
  index: number;
  run: boolean;
  className?: string;
}) {
  const n = useCountUp(to, run);

  return (
    <BracketCell index={index} minH="min-h-[12rem] lg:min-h-[13rem]" className={className}>
      <p className="numeral text-[clamp(3rem,4.1vw,4rem)]">
        {prefix}
        {n.toFixed(decimals)}
        {suffix}
      </p>

      <p className="mt-auto max-w-[16rem] pt-6 text-[0.9375rem] leading-snug text-fg-muted">
        {label}
      </p>
    </BracketCell>
  );
}

/**
 * One statistic as a full-width row: label on the left, figure hard right,
 * baselines aligned, hairline above. This is the /customers treatment.
 *
 * Below `sm` the two stack — a 5rem figure and a wrapping label cannot share
 * a 390px line — and the figure leads, because that is the part worth seeing
 * first once they are no longer read across.
 */
function StatRow({
  prefix,
  to,
  suffix,
  decimals,
  label,
  run,
}: {
  prefix: string;
  to: number;
  suffix: string;
  decimals: number;
  label: string;
  run: boolean;
}) {
  const n = useCountUp(to, run);

  return (
    <div className="flex flex-col-reverse gap-3 border-t border-line py-10 sm:grid sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-8 sm:py-12">
      <p className="max-w-md text-sm leading-snug text-fg-muted">{label}</p>
      <p className="numeral text-[clamp(3rem,6.3vw,4.5rem)] sm:text-right">
        {prefix}
        {n.toFixed(decimals)}
        {suffix}
      </p>
    </div>
  );
}

/**
 * `grid` is the homepage's bracketed two-over-three block. `rows` is the
 * /customers list — heading hard right, then one hairline-separated row per
 * figure, and no CTA (the page already ends on one).
 */
export function TrackRecord({
  variant = "grid",
}: {
  variant?: "grid" | "rows";
} = {}) {
  const ref = useRef<HTMLElement>(null);
  const [run, setRun] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRun(true);
          io.disconnect();
        }
      },
      // threshold 0 + a bottom inset, NOT a fractional threshold. A fraction
      // is a proportion of the SECTION, so a section taller than 4x the
      // viewport could never satisfy 0.25 and the figures would sit at zero
      // forever — worse than a partial count. This fires when the section's
      // top crosses 85% of the viewport, whatever its height.
      { threshold: 0, rootMargin: "0px 0px -15% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  if (variant === "rows") {
    return (
      <section ref={ref} className="section-y bg-ground-deep">
        <div className="shell">
          {/* No eyebrow here, unlike the `grid` variant. One was added on
              4 Sep 2026 purely to give this block something to carry the
              accent, then removed with it — the reference's rows treatment
              opens on the heading, and a layout change made to host a colour
              has no reason to outlive the colour. */}
          <h2 className="display text-[clamp(2.25rem,4vw,3.25rem)] text-balance sm:text-right">
            {trackRecord.title}
          </h2>

          <div className="mt-14 border-b border-line sm:mt-16">
            {trackRecord.stats.map((s) => (
              <StatRow key={s.label} {...s} run={run} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className="section-y">
      <div className="shell">
        <SectionHeading
          eyebrow={trackRecord.eyebrow}
          title={trackRecord.title}
          accent={trackRecord.accent}
          lede={trackRecord.lede}
          align="center"
        />

        {/* Two cells over three. A 6-column track divides into both rows —
            3+3 above, 2+2+2 below — so one grid does the whole thing. At the
            2-column breakpoint five cells would leave a ragged half-row, so
            the last one spans the full width there. */}
        <BracketGrid className="mt-8 sm:mt-10 lg:[&>div:first-child]:grid-cols-6">
          {trackRecord.stats.map((s, i) => (
            <Stat
              key={s.label}
              {...s}
              index={i}
              run={run}
              className={`${i < 2 ? "lg:col-span-3" : "lg:col-span-2"} ${
                i === trackRecord.stats.length - 1 ? "sm:col-span-2" : ""
              }`}
            />
          ))}
        </BracketGrid>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-3">
          <CtaButton href="/get-in-touch">{trackRecord.cta}</CtaButton>
          <p className="flex items-center gap-2.5 text-[0.8125rem] text-fg-faint">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-live" />
            {trackRecord.ctaNote}
          </p>
        </div>
      </div>
    </section>
  );
}
