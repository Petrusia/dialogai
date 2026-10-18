import type { Icon } from "@phosphor-icons/react";
import { FaqItem } from "@/components/FaqItem";
import { InfoCard } from "@/components/InfoCard";
import { Mark } from "@/components/Mark";
import { Armchair, Clock, UserCircle, UsersThree } from "@/components/marks";
import { faq } from "@/lib/content";
import { sectionY } from "@/lib/ui";

const factIcons: Record<string, Icon> = {
  Trukmė: Clock,
  "Dalyvių skaičius": UsersThree,
  Fasilitatoriai: UserCircle,
  Erdvė: Armchair,
};

export function FaqSection() {
  return (
    <section id="duk" className={sectionY}>
      <div className="container-site grid gap-5 sm2:grid-cols-2 lg2:grid-cols-3">
        <InfoCard kicker={faq.practical.kicker} title={faq.practical.title}>
          {faq.practical.items.map((item) => (
            <div key={item.label} className="mt-4 flex gap-3 text-muted">
              {factIcons[item.label] ? <Mark icon={factIcons[item.label]} size={22} className="mt-0.5 text-forest" /> : null}
              <p>
                <b className="text-ink">{item.label}</b>
                <br />
                {item.text}
              </p>
            </div>
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
