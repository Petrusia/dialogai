import { ArticlesPreview } from "@/components/ArticlesPreview";
import { CtaSection } from "@/components/CtaSection";
import { FaqSection } from "@/components/FaqSection";
import { Hero } from "@/components/Hero";
import { Highlights } from "@/components/Highlights";
import { MethodSection } from "@/components/MethodSection";
import { ProcessSection } from "@/components/ProcessSection";
import { SpacesSection } from "@/components/SpacesSection";
import { SupportSection } from "@/components/SupportSection";
import { WhySection } from "@/components/WhySection";

export default function HomePage() {
  return (
    <main id="top">
      <Hero />
      <Highlights />
      <WhySection />
      <MethodSection />
      <SpacesSection />
      <ProcessSection />
      <FaqSection />
      <ArticlesPreview />
      <CtaSection />
      <SupportSection />
    </main>
  );
}
