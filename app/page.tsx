import { Hero } from "@/components/sections/hero";
import { WhoWeServe } from "@/components/sections/who-we-serve";
import { TrackRecord } from "@/components/sections/track-record";
import { WhoWeWorkWith } from "@/components/sections/who-we-work-with";
import { FeaturedCaseStudy } from "@/components/sections/featured-case-study";
import { Industries } from "@/components/sections/industries";
import { Faqs } from "@/components/sections/faqs";
import { CtaBand } from "@/components/site/cta-band";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrackRecord />
      <WhoWeServe />
      <WhoWeWorkWith />
      <FeaturedCaseStudy />
      <Industries />
      <Faqs />
      <CtaBand />
    </>
  );
}
