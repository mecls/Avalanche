import Image from "next/image";
import { CaseStudyCard } from "@/components/ui/case-study-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { CtaButton } from "@/components/ui/button";
import { featuredCaseStudy } from "@/content/case-studies";
import { testimonial } from "@/content/copy";

/** Homepage: the single Neurable study and its testimonial, then a click
 *  through to the rest. */
export function FeaturedCaseStudy() {
  return (
    <section className="section-y border-t border-line-soft">
      <div className="shell">
        <SectionHeading
          eyebrow="Selected case study"
          title="A closed $35M Series A"
          accent="$35M Series A"
          lede="Every mandate is different. This one shows what mandate-fit targeting, investor readiness, and pipeline execution produce when they run end to end."
        />

        <div className="mt-14">
          <CaseStudyCard study={featuredCaseStudy} featured />
        </div>

        {/* Testimonial: portrait left, quote right. `items-center` rather than
            stretch — the photo is square and the quote is short, so stretching
            would leave one column visibly taller than the other. */}
        <figure className="mt-6 grid items-center gap-8 overflow-hidden rounded-lg border border-line bg-card p-6 sm:p-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] lg:gap-12 lg:p-10">
          <div className="relative aspect-[4/3] overflow-hidden rounded-md lg:aspect-[5/4]">
            <Image
              src={testimonial.photo}
              alt={`${testimonial.name}, ${testimonial.company}`}
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
          </div>

          <div>
            <blockquote className="text-[clamp(1.125rem,1.9vw,1.5rem)] leading-snug text-balance">
              &ldquo;{testimonial.quote}&rdquo;
            </blockquote>

            <figcaption className="mt-8">
              <p className="font-medium">{testimonial.name}</p>
              <p className="mt-1 text-sm text-fg-muted">{testimonial.role}</p>
              <p className="display mt-6 text-2xl text-fg-muted">
                {testimonial.company}
              </p>
            </figcaption>
          </div>
        </figure>

        <div className="mt-10">
          <CtaButton href="/customers" variant="ghost">
            See more customer stories
          </CtaButton>
        </div>
      </div>
    </section>
  );
}
