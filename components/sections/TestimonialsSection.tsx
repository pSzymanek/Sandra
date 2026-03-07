"use client";

import { Quote } from "lucide-react";
import { motion } from "framer-motion";

import { Reveal } from "@/components/common/reveal";
import { SectionHeading } from "@/components/common/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { testimonialsData } from "@/data/mock";

export function TestimonialsSection() {
  return (
    <section id="opinie" className="py-20 md:py-28">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow={testimonialsData.eyebrow}
            title={testimonialsData.title}
            description={testimonialsData.description}
            align="center"
          />
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {testimonialsData.items.map((item, index) => (
            <Reveal key={item.name + index} delay={index * 0.08}>
              <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.22, ease: "easeOut" }}>
                <Card className="h-full rounded-[1.7rem] bg-card/95">
                  <CardContent className="flex h-full flex-col gap-5 pt-6">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/12 text-primary">
                      <Quote className="h-4 w-4" />
                    </span>
                    <p className="text-sm leading-relaxed text-muted-foreground">{item.quote}</p>
                    <p className="mt-auto text-sm font-semibold text-foreground">{item.name}</p>
                  </CardContent>
                </Card>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}