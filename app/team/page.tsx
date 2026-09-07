import type { Metadata } from "next";
import Image from "next/image";
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

          {/* Four across, photo over a centred name and role — the
              reference's layout, rebuilt here 7 Sep 2026. It was three across
              with a 64px monogram circle and the bio underneath, which is what
              the page had while there were no photographs to show.

              NO CARD. There is no border, no fill and no padding around the
              whole thing: the only frame is on the picture, and the type sits
              on the page ground. That is what makes a ragged last row work —
              five people in a four-column grid leaves three empty cells, and
              an empty CARD would show, where empty ground does not.

              The bio is not rendered any more. It is still in
              `content/team.ts`, still marked DRAFT and still tracked in
              docs/COPY-REVIEW.md — the reference puts bios behind a "Read Bio"
              overlay rather than on the card, and five paragraphs under five
              portraits fought the pictures. Kept, not rendered, like the other
              unmounted copy on this site. */}
          <ul className="mt-16 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((m) => (
              <li key={m.name} className="flex flex-col">
                {/* `aspect-[4/5]` is the contract with
                    scripts/optimize-team-photos.mjs, which crops every source
                    to exactly this. Change one and change the other, or the
                    `object-cover` starts throwing away a band of each photo.

                    The monogram FALLBACK stays: `photo` is nullable, a sixth
                    member can arrive before their picture does, and an empty
                    frame is worse than initials.

                    `alt=""` is deliberate. The name is the very next element
                    and is a heading, so alt text here would make a screen
                    reader read every name twice. */}
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[4px] border border-line bg-ground-alt">
                  {m.photo ? (
                    <Image
                      src={m.photo}
                      alt=""
                      fill
                      sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw"
                      className="object-cover"
                    />
                  ) : (
                    <span className="display absolute inset-0 flex items-center justify-center text-3xl text-fg-muted">
                      {m.name
                        .split(" ")
                        .map((w) => w[0])
                        .join("")}
                    </span>
                  )}
                </div>

                <h3 className="display mt-7 text-center text-2xl">{m.name}</h3>

                {/* `page-label` rather than `eyebrow`: this run has to stay
                    monochrome. `eyebrow` carries the accent and renders a
                    dozen times a page as a BLOCK's name — five job titles are
                    neither, and colouring them would put the loudest thing on
                    the page under every portrait. Same 14px uppercase spec,
                    no colour of its own, which is the whole reason that
                    utility does not own one. */}
                <p className="page-label mt-2.5 text-center text-fg-muted">
                  {m.role}
                </p>
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
