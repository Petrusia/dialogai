import { FaqItem } from "@/components/FaqItem";
import { InfoCard } from "@/components/InfoCard";
import { faq } from "@/lib/content";
import { sectionY } from "@/lib/ui";

export function FaqSection() {
  return (
    <section id="duk" className={sectionY}>
      <div className="container-site grid gap-5 sm2:grid-cols-2 lg2:grid-cols-3">
        <InfoCard kicker={faq.practical.kicker} title={faq.practical.title}>
          {faq.practical.items.map((item) => (
            <p key={item.label} className="mt-4 text-muted">
              <b className="text-ink">{item.label}</b>
              <br />
              {item.text}
            </p>
          ))}
        </InfoCard>
        <InfoCard kicker={faq.team.kicker} title={faq.team.title} tone="dark">
          {faq.team.paragraphs.map((paragraph) => (
            <p key={paragraph} className="mt-4 text-white/80">
              {paragraph}
            </p>
          ))}
        </InfoCard>
        <InfoCard kicker={faq.questions.kicker} title={faq.questions.title} className="sm2:col-span-2 lg2:col-span-1">
          {faq.questions.items.map((item) => (
            <FaqItem key={item.question} question={item.question} answer={item.answer} open={item.open} />
          ))}
        </InfoCard>
      </div>
    </section>
  );
}
