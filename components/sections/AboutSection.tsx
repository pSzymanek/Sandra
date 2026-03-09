"use client";

import { PlaceholderImage } from "@/components/common/placeholder-image";
import { Reveal } from "@/components/common/reveal";
import { Badge } from "@/components/ui/badge";
import { aboutData } from "@/data/mock";

export function AboutSection() {
  return (
    <section id="o-mnie" className="py-20 md:py-28">
      <div className="container grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <Reveal className="group lg:order-2">
          <PlaceholderImage
            src={aboutData.image}
            alt="Placeholder o mnie"
            className="aspect-[3/4] min-h-[25rem] w-full"
          />
        </Reveal>

        <Reveal delay={0.08} className="lg:order-1">
          <Badge variant="outline">[O mnie]</Badge>
          <h2 className="mt-4 font-display text-4xl md:text-5xl">{aboutData.name}</h2>
          <p className="mt-3 text-sm font-medium uppercase tracking-[0.2em] text-primary/90">{aboutData.role}</p>
          <div className="mt-6 space-y-4 text-base text-muted-foreground md:text-lg">
            {aboutData.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
