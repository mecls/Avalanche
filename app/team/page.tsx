import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/section-heading";
import { CtaBand } from "@/components/site/cta-band";
import { media } from "@/content/copy";
import { team } from "@/content/team";

export const metadata: Metadata = {
  title: "Team",
  description:
    "The team behind Avalanche Capital — operators and investors advising funds, founders, and operating companies.",
};

export default function TeamPage() {
  return (
    <>
      <section className="section-y">
        <div className="shell">
          <SectionHeading
            eyebrow="Team"
            title="Both sides of the table"
            accent="the table"
            lede="Our team has operated as investors and as operators — which means we understand what capital allocators need to see, and how to position an opportunity that gets funded."
          />

          {/* Individually bordered cards rather than a gap-px sheet: the team
              count is odd, and a ragged last row leaves empty cells showing
              the sheet's own background. */}
          <ul className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((m) => (
              <li
                key={m.name}
                className="flex flex-col rounded-lg border border-line bg-card p-8 transition-colors duration-300 hover:border-fg/20"
              >
                {/* TODO(miguel): supply headshots; monogram stands in for now.
                    Monochrome — these are placeholders for photographs, and
                    accenting five of them made the stand-in the loudest thing
                    on the page. */}
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-line bg-ground-alt">
                  <span className="display text-xl text-fg-muted">
                    {m.name
                      .split(" ")
                      .map((w) => w[0])
                      .join("")}
                  </span>
                </div>
                <h3 className="display mt-6 text-2xl">{m.name}</h3>
                <p className="mt-1.5 text-sm text-fg-muted">{m.role}</p>
                {m.bio && (
                  <p className="mt-4 text-sm leading-relaxed text-fg-muted">
                    {m.bio}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section data-band="light" className="section-y">
        <div className="shell">
          <SectionHeading eyebrow="Media" title="In the press" accent="the press" />
          <ul className="mt-14 grid gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-3">
            {media.map((m) => (
              <li key={m.outlet} className="flex flex-col bg-card p-8">
                <blockquote className="display text-xl leading-snug text-balance">
                  &ldquo;{m.quote}&rdquo;
                </blockquote>
                <p className="eyebrow mt-auto pt-8">{m.outlet}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
