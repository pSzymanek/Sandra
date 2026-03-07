"use client";

import { Mail, MapPin, Phone, Send, Timer } from "lucide-react";

import { PlaceholderImage } from "@/components/common/placeholder-image";
import { Reveal } from "@/components/common/reveal";
import { SectionHeading } from "@/components/common/section-heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { contactData } from "@/data/mock";

const detailIcons = [Phone, Mail, MapPin, Timer];

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

                <PlaceholderImage
                  src="/placeholders/map-placeholder.svg"
                  alt="Placeholder mapa"
                  className="aspect-[16/9] min-h-40 w-full rounded-2xl"
                />
              </CardContent>
            </Card>
          </Reveal>

          <Reveal delay={0.06}>
            <Card className="rounded-[2rem] bg-card/95 p-7 md:p-8">
              <form className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Input placeholder="[Imie]" aria-label="Imie" />
                  <Input type="email" placeholder="[Email]" aria-label="Email" />
                </div>
                <Input placeholder="[Telefon]" aria-label="Telefon" />
                <Textarea placeholder="[Wiadomosc]" aria-label="Wiadomosc" />
                <Button type="button" variant="terracotta" className="w-full md:w-auto">
                  <Send className="mr-2 h-4 w-4" />
                  [Wyslij]
                </Button>
              </form>
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
