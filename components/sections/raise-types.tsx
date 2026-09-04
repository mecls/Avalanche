import { SectionHeading } from "@/components/ui/section-heading";
import { BracketGrid, BracketCell } from "@/components/ui/bracket-grid";
import { Icon, type IconName } from "@/components/ui/icons";
import { raiseTypes } from "@/content/copy";

/** Homepage: what we raise, above the featured case study. */
export function RaiseTypes() {

  return (
    <section data-band="light" className="section-y border-t border-line-soft">
      <div className="shell">
        <SectionHeading
          eyebrow={raiseTypes.eyebrow}
          title={raiseTypes.title}
          accent={raiseTypes.accent}
          lede={raiseTypes.lede}
          align="center"
        />

        <BracketGrid className="mt-14 sm:mt-16 lg:[&>div:first-child]:grid-cols-6">
          {raiseTypes.items.map((item, i) => (
            <BracketCell
              key={item.name}
              index={i}
              minH="min-h-[15rem]"
              // Bespoke shape rather than an even split: 3+3 on the first row,
              // 2+2+2 on the second, both summing to the 6-column track. At
              // the 2-column breakpoint the fifth cell spans the full width.
              className={`${i < 2 ? "lg:col-span-3" : "lg:col-span-2"} ${
                i === raiseTypes.items.length - 1 ? "sm:col-span-2" : ""
              }`}
            >
              <Icon name={item.icon as IconName} className="h-6 w-6 text-accent" />
              <div className="mt-auto pt-12">
                <h3 className="text-base font-medium">{item.name}</h3>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-fg-muted">
                  {item.body}
                </p>
              </div>
            </BracketCell>
          ))}
        </BracketGrid>
      </div>
    </section>
  );
}
