"use client";

import { Reveal } from "@/components/common/reveal";
import { SectionHeading } from "@/components/common/section-heading";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { faqData } from "@/data/mock";

export function FaqSection() {
  return (
    <section className="bg-secondary/35 py-20 md:py-28">
      <div className="container grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
        <Reveal>
          <SectionHeading eyebrow={faqData.eyebrow} title={faqData.title} description={faqData.description} />
        </Reveal>

        <Reveal delay={0.08}>
          <Card className="rounded-[2rem] bg-card/95 px-6 md:px-8">
            <Accordion type="single" collapsible>
              {faqData.items.map((item, index) => (
                <AccordionItem value={`item-${index}`} key={item.question + index}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}