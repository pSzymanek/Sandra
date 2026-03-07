"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { PlaceholderImage } from "@/components/common/placeholder-image";
import { Reveal } from "@/components/common/reveal";
import { SectionHeading } from "@/components/common/section-heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { servicesData } from "@/data/mock";

export function ServicesSection() {
  return (
    <section id="oferta" className="relative overflow-hidden bg-[#6f8879] py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(48%_48%_at_6%_14%,rgba(255,255,255,0.2),transparent_70%),radial-gradient(34%_34%_at_92%_84%,rgba(232,189,151,0.22),transparent_72%)]" />
      <div className="container relative">
        <Reveal>
          <SectionHeading
            eyebrow={servicesData.eyebrow}
            title={servicesData.title}
            description={servicesData.description}
            align="center"
            className="[&_h2]:text-[#f6f2e9] [&_p]:text-[#dbe8db]"
          />
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {servicesData.items.map((service, index) => (
            <Reveal key={service.title + index} delay={index * 0.08}>
              <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.24, ease: "easeOut" }}>
                <Card className="group h-full overflow-hidden bg-card/95">
                  <CardHeader className="space-y-5">
                    <PlaceholderImage
                      src={service.image}
                      alt="Placeholder usluga"
                      className="aspect-[4/3] w-full rounded-2xl"
                    />
                    <CardTitle className="font-display text-3xl md:text-[2.05rem]">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-muted-foreground">{service.description}</p>
                    <p className="text-sm font-semibold text-foreground">{service.price}</p>
                  </CardContent>
                  <CardFooter>
                    <Button asChild variant="outline" className="w-full justify-center">
                      <Link href="#">{service.cta}</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
