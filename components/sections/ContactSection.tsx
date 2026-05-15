"use client";

import { CalendarCheck, MapPin, Monitor, UserRound } from "lucide-react";

import { MediaCard } from "@/components/common/media-card";
import { Reveal } from "@/components/common/reveal";
import { SectionHeading } from "@/components/common/section-heading";
import { ZnanyLekarzWidget } from "@/components/common/ZnanyLekarzWidget";
import { Card, CardContent } from "@/components/ui/card";
import { contactData } from "@/data/site-content";

const detailIcons = [CalendarCheck, MapPin, Monitor, UserRound];

export function ContactSection() {
  return (
    <section id="kontakt" className="py-20 md:py-28">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow={contactData.eyebrow}
            title={contactData.title}
            description={contactData.description}
            align="center"
          />
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_1.15fr]">
          <Reveal>
            <Card className="h-full rounded-[2rem] bg-card/95">
              <CardContent className="space-y-5 p-7 md:p-8">
                {contactData.details.map((item, index) => {
                  const Icon = detailIcons[index];
                  return (
                    <div key={item.label + index} className="flex items-start gap-4 rounded-2xl border border-border/60 bg-background/72 p-4">
                      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/12 text-primary">
                        <Icon className="h-4 w-4" />
                      </span>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary/85">{item.label}</p>
                        <p className="mt-1 text-sm text-foreground/85">{item.value}</p>
                      </div>
                    </div>
                  );
                })}

                <MediaCard
                  src="/images/address-photo.jpg"
                  alt="Budynek przy ul. Wojska Polskiego 3 w Mysłowicach"
                  className="aspect-[16/9] min-h-40 w-full rounded-2xl"
                />
              </CardContent>
            </Card>
          </Reveal>

          <Reveal delay={0.06}>
            <Card className="h-full rounded-[2rem] bg-card/95 p-7 md:p-10">
              <div className="flex h-full min-h-[24rem] flex-col">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary/90">Rezerwacja</p>
                <h3 className="mt-4 font-display text-4xl leading-tight md:text-5xl">{contactData.bookingTitle}</h3>
                <p className="mt-5 max-w-xl text-muted-foreground">{contactData.bookingDescription}</p>

                <div className="mt-8 max-w-xl">
                  <ZnanyLekarzWidget className="inline-flex min-h-12 w-full items-center justify-center rounded-2xl bg-accent px-6 py-3 text-center text-base font-semibold text-white shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:brightness-95 md:w-auto" />
                </div>
              </div>
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

