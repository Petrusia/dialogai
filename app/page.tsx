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

type HomePageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default function HomePage({ searchParams }: HomePageProps) {
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
      <CtaSection searchParams={searchParams} />
      <SupportSection />
    </main>
  );
}
