import { ProcessStep } from "@/components/ProcessStep";
import { process } from "@/lib/content";
import { kicker, sectionY } from "@/lib/ui";

export function ProcessSection() {
  return (
    <section id="kaip" className={`${sectionY} bg-white`}>
      <div className="container-site">
        <div className="mb-12 max-w-prose-hero">
          <p className={kicker}>{process.kicker}</p>
          <h2 className="mt-4 text-h2">{process.title}</h2>
        </div>
        <ol className="border-b border-line">
          {process.steps.map((step) => (
            <ProcessStep key={step.number} {...step} />
          ))}
        </ol>
      </div>
    </section>
  );
}
