import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/section-heading";
import { CaseStudyGrid } from "@/components/sections/case-study-grid";
import { LogoBand } from "@/components/sections/logo-band";
import { CtaBand } from "@/components/site/cta-band";
import { customers } from "@/content/copy";

export const metadata: Metadata = {
  title: "Customers",
  description:
    "Placement agents, boutique investment banks, emerging fund managers, and founding teams raising from HNWIs, family offices, and institutional investors.",
};

export default function CustomersPage() {
  return (
    <>
      <section className="section-y">
        <div className="shell">
          <SectionHeading
            eyebrow={customers.eyebrow}
            title={customers.title}
            accent={customers.accent}
            lede={customers.lede}
          />
        </div>
      </section>

      <LogoBand heading="Trusted by" />

      <section className="section-y border-t border-line-soft">
        <div className="shell">
          <SectionHeading
            eyebrow="Customer case studies"
            title={customers.gridTitle}
            accent="billion-dollar deal books."
            lede={customers.gridLede}
          />
          <div className="mt-14">
            <CaseStudyGrid />
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
