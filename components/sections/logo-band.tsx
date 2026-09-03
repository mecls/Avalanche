import { LogoMarquee } from "@/components/ui/logo-marquee";
import { customers } from "@/content/copy";

/** Active clients, as a standalone band. The strip itself is shared with the
 *  hero — see components/ui/logo-marquee.tsx. */
export function LogoBand({ heading = "Active clients" }: { heading?: string }) {
  return (
    <section className="section-y overflow-hidden border-t border-line-soft">
      <div className="shell">
        <p className="eyebrow text-center">{heading}</p>
      </div>

      <LogoMarquee className="mt-12" />

      <div className="shell mt-12">
        <p className="text-center text-[0.6875rem] text-fg-faint">
          {customers.logoNote}
        </p>
      </div>
    </section>
  );
}
