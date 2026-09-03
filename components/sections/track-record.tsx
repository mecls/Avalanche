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
    <BracketCell index={index} minH="min-h-[15rem] lg:min-h-[17rem]" className={className}>
      <p className="display text-[clamp(2.5rem,4.6vw,3.5rem)] tabular-nums">
        {prefix}
        {n.toFixed(decimals)}
        {suffix}
      </p>

      <p className="mt-auto max-w-[15rem] pt-10 text-sm leading-snug text-fg-muted">
        {label}
      </p>
    </BracketCell>
  );
}

export function TrackRecord() {
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
        <BracketGrid className="mt-14 sm:mt-16 lg:[&>div:first-child]:grid-cols-6">
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

        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-5 gap-y-3">
          <CtaButton href="#get-in-touch">{trackRecord.cta}</CtaButton>
          <p className="flex items-center gap-2.5 text-[0.8125rem] text-fg-faint">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-live" />
            {trackRecord.ctaNote}
          </p>
        </div>
      </div>
    </section>
  );
}
