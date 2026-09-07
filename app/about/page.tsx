import type { Metadata } from "next";
import Image from "next/image";
import { CtaBand } from "@/components/site/cta-band";
import { PageHeader } from "@/components/site/page-header";
import { Thesis } from "@/components/sections/thesis";
import { CtaButton } from "@/components/ui/button";
import { Plate } from "@/components/ui/diagram";
import {
  AccessLayersDiagram,
  DivergenceDiagram,
} from "@/components/ui/manifesto-media";
import { SectionHeading } from "@/components/ui/section-heading";
import { about } from "@/content/about";
import { media } from "@/content/copy";
import { manifesto } from "@/content/manifesto";
import { team } from "@/content/team";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Capital is not scarce. Access is. What Avalanche Capital does, what it believes about private markets, and the team behind the mandates.",
};

/**
 * /about — About Us: what the firm is, what it believes, and who runs it.
 *
 * IT IS TWO ROUTES MERGED, by request on 7 Sep 2026. `/team` carried the
 * portraits and the press quotes; `/manifesto` carried the divergence, the
 * five beliefs and the three access layers. Both paths now 307 here (see
 * `next.config.ts`), the nav entry that said "Team" says "About Us", and the
 * footer's Overview column lost its separate Manifesto link because there is
 * no separate page left to link to.
 *
 * THE ORDER IS THE ARGUMENT. What the firm does (the thesis) -> the market
 * that makes it necessary (the divergence) -> what follows from that (five
 * beliefs) -> where the gap actually sits (three layers) -> who does the work
 * (team) -> who has said so (press). The manifesto sits in the MIDDLE
 * deliberately: a reader who came for the team scrolls through the argument
 * to reach them.
 *
 * BANDS ALTERNATE ALL THE WAY DOWN — light header, dark thesis, light
 * divergence, dark beliefs, light layers, dark team, light press, then the
 * photo-backed closing band. Two consequences worth knowing before editing.
 * No section here needs a `border-t`: /manifesto carried one because two of
 * its light sections were adjacent, and with the thesis between them they no
 * longer are. And the team grid still looks exactly as it did on /team —
 * `data-band="dark"` paints the same `#151515` that section used to inherit
 * from `<body>` by not being in a band at all.
 *
 * **The header section MUST stay `data-band="light"` and the FIRST child of
 * `main`.** Two rules in globals.css key off
 * `main > :first-child[data-band="light"]`: one flips the nav's type to ink,
 * the other paints `main` with `--color-paper`. They break together, and the
 * failure mode is the whole nav rendering white on white. Note which way this
 * merge moved — /team opened DARK and needed neither rule, so this is new
 * exposure on a page that never had it.
 *
 * **A section that does not paint ITSELF is the other half of that trap.** It
 * sits on the white `main` while still inheriting the root's dark text
 * tokens — white type on a white ground. Every dark section on this page says
 * `data-band="dark"` for that reason, not for the colour alone.
 *
 * The two media rows are the /solutions row with the rail taken out: the
 * `Plate` is `flex:1 0 0` on a fixed aspect ratio, so it sizes the row and
 * `items-center` centres the text against it. Copy length cannot move the
 * layout. Text comes FIRST in the document in both, so a phone always reads
 * the claim before the picture; the second row sets `flex-row-reverse` to put
 * its plate on the left on a wide screen, which `flex-col` overrides below
 * 1200px.
 */
export default function AboutPage() {
  const { divergence, beliefs, layers } = manifesto;

  return (
    <>
      <section data-band="light">
        <PageHeader
          eyebrow={about.eyebrow}
          title={about.titleLines.map((line) => (
            // Authored break — see content/about.ts. Block spans rather than
            // a <br> so each line stays its own run.
            <span key={line} className="block">
              {line}
            </span>
          ))}
          lede={about.lede}
          cta={about.cta}
        />
      </section>

      <Thesis />

      {/* `id="manifesto"` is what the old route redirects to — /manifesto 307s
          to /about#manifesto, so a reader following an existing link lands on
          the manifesto rather than at the top of a page twice as long as the
          one they asked for. The anchor is on the divergence because that is
          where the manifesto starts; the thesis above it is the other half of
          the merge. `scroll-mt` is breathing room only — the nav is absolute
          and scrolls away, so nothing overlaps the target. */}
      <section
        id="manifesto"
        data-band="light"
        className="section-y scroll-mt-24"
      >
        <div className="shell">
          <div className="flex w-full flex-row items-center justify-center gap-9 max-[1199px]:flex-col">
            <div className="flex flex-1 flex-col items-start gap-6 max-[1199px]:w-full max-[1199px]:flex-none">
              <SectionHeading
                eyebrow={divergence.eyebrow}
                title={divergence.title}
              />

              <div className="flex max-w-[680px] flex-col gap-5">
                {divergence.body.map((p) => (
                  <p key={p} className="text-[16px] leading-6 text-fg-muted">
                    {p}
                  </p>
                ))}
                <p className="text-[16px] leading-6 text-fg">
                  {divergence.note}
                </p>
              </div>
            </div>

            <Plate>
              <DivergenceDiagram />
            </Plate>
          </div>
        </div>
      </section>

      <section data-band="dark" className="section-y">
        <div className="shell">
          <SectionHeading eyebrow={beliefs.eyebrow} title={beliefs.title} />

          {/* The same ruled <dl> WhoWeServe uses on the homepage: ordinal and
              statement left, argument right, hairline between. A <dl> may only
              contain <dt>/<dd> (optionally wrapped in a <div>), so the index
              lives inside the <dt> rather than beside it. */}
          <dl className="mt-16 divide-y divide-line border-y border-line">
            {beliefs.items.map((b, i) => (
              <div
                key={b.title}
                className="grid gap-4 py-9 md:grid-cols-[1fr_1.4fr] md:items-baseline md:gap-10"
              >
                <dt className="flex items-baseline gap-5">
                  <span className="eyebrow shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="display text-2xl md:text-[1.75rem]">
                    {b.title}
                  </span>
                </dt>
                <dd className="text-sm leading-relaxed text-fg-muted">
                  {b.body}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section data-band="light" className="section-y">
        <div className="shell">
          <div className="flex w-full flex-row-reverse items-center justify-center gap-9 max-[1199px]:flex-col">
            <div className="flex flex-1 flex-col items-start gap-6 max-[1199px]:w-full max-[1199px]:flex-none">
              <SectionHeading eyebrow={layers.eyebrow} title={layers.title} />

              <dl className="w-full max-w-[680px] divide-y divide-line border-y border-line">
                {layers.items.map((l) => (
                  <div key={l.n} className="py-6">
                    <dt className="flex items-baseline gap-4">
                      <span className="page-label shrink-0 text-fg-faint">
                        {l.n}
                      </span>
                      <span className="text-[16px] leading-6 font-medium">
                        {l.title}
                      </span>
                    </dt>
                    <dd className="mt-2 pl-[42px] text-sm leading-relaxed text-fg-muted">
                      {l.body}
                    </dd>
                  </div>
                ))}
              </dl>

              <p className="max-w-[680px] text-[16px] leading-6 text-fg">
                {layers.note}
              </p>

              {/* Solid rather than ghost: the ghost variant is a 1%-white fill
                  with no border — legible over the hero footage and over a dark
                  band, all but invisible on a white one. */}
              <CtaButton href="/solutions/fundraising">{layers.cta}</CtaButton>
            </div>

            <Plate>
              <AccessLayersDiagram />
            </Plate>
          </div>
        </div>
      </section>

      <section data-band="dark" className="section-y">
        <div className="shell">
          <SectionHeading
            eyebrow={about.team.eyebrow}
            title={about.team.title}
          />

          {/* Four across, photo over a centred name and role — the
              reference's layout, rebuilt 7 Sep 2026. It was three across with
              a 64px monogram circle and the bio underneath, which is what the
              page had while there were no photographs to show.

              NO CARD. There is no border, no fill and no padding around the
              whole thing: the only frame is on the picture, and the type sits
              on the band. That is what makes a ragged last row work — five
              people in a four-column grid leaves three empty cells, and an
              empty CARD would show, where empty ground does not.

              The bio is not rendered. It is still in `content/team.ts`, still
              marked DRAFT and still tracked in docs/COPY-REVIEW.md — the
              reference puts bios behind a "Read Bio" overlay rather than on
              the card, and five paragraphs under five portraits fought the
              pictures. Kept, not rendered, like the other unmounted copy on
              this site. */}
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
          <SectionHeading
            eyebrow="Media"
            title="In the press"
            accent="the press"
          />
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
