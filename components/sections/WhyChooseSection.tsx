"use client";

import { PhoneCall } from "lucide-react";

import { PlaceholderImage } from "@/components/common/placeholder-image";
import { Reveal } from "@/components/common/reveal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { whyChooseData } from "@/data/mock";

export function WhyChooseSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="container grid items-center gap-8 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
        <Reveal className="group">
          <PlaceholderImage
            src={whyChooseData.image}
            alt="Placeholder dlaczego warto"
            className="aspect-[4/5] min-h-[25rem] w-full"
          />
        </Reveal>

        <Reveal delay={0.08}>
          <Card className="rounded-[2rem] bg-card/85 p-7 md:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary/90">{whyChooseData.eyebrow}</p>
            <h2 className="mt-4 font-display text-4xl leading-tight md:text-5xl">{whyChooseData.title}</h2>
            <p className="mt-5 text-muted-foreground">{whyChooseData.description}</p>

            <ul className="mt-7 space-y-3">
              {whyChooseData.benefits.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-foreground/88 md:text-base">
                  <span className="mt-1.5 h-2.5 w-2.5 rounded-full bg-primary/70" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <Button variant="terracotta">{whyChooseData.cta}</Button>
              <div className="flex items-center gap-3 rounded-2xl border border-border/70 bg-background/70 px-4 py-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground">
                  <PhoneCall className="h-4 w-4" />
                </span>
                <p className="text-sm font-medium text-foreground/90">{whyChooseData.phone}</p>
              </div>
            </div>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}