import { SectionHeading } from "@/components/ui/section-heading";
import { BracketGrid, BracketCell, trailingSpans } from "@/components/ui/bracket-grid";
import { Icon, type IconName } from "@/components/ui/icons";
import { industries } from "@/content/copy";

const COLS = 4;
const SPAN = ["", "lg:col-span-1", "lg:col-span-2", "lg:col-span-3", "lg:col-span-4"];

/** Homepage: the verticals grid, below the featured case study. */
export function Industries() {
  const spans = trailingSpans(industries.items.length, COLS);

  return (
    <section data-band="light" className="section-y">
      <div className="shell">
        <SectionHeading
          eyebrow={industries.eyebrow}
          title={industries.title}
          accent={industries.accent}
          lede={industries.lede}
          align="center"
        />

        <BracketGrid className="mt-14 sm:mt-16 lg:[&>div:first-child]:grid-cols-4">
          {industries.items.map((item, i) => (
            <BracketCell key={item.name} index={i} className={SPAN[spans[i]]}>
              <Icon name={item.icon as IconName} className="h-6 w-6 text-fg-faint" />
              <h3 className="mt-auto pt-12 text-[0.9375rem] font-medium">
                {item.name}
              </h3>
            </BracketCell>
          ))}
        </BracketGrid>
      </div>
    </section>
  );
}
