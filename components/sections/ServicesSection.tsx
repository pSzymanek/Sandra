"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { MediaCard } from "@/components/common/media-card";
import { Reveal } from "@/components/common/reveal";
import { SectionHeading } from "@/components/common/section-heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { profileUrl, servicesData } from "@/data/site-content";

export function ServicesSection() {
  return (
    <section id="oferta" className="relative overflow-hidden bg-[#6f8879] py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(48%_48%_at_6%_14%,rgba(255,255,255,0.2),transparent_70%),radial-gradient(34%_34%_at_92%_84%,rgba(232,189,151,0.22),transparent_72%)]" />
      <div className="container relative">
        <Reveal>
          <div className="flex flex-col items-center">
            <SectionHeading
              eyebrow={servicesData.eyebrow}
              title={servicesData.title}
              description={servicesData.description}
              align="center"
              className="[&_h2]:text-[#f6f2e9] [&_p]:text-[#dbe8db]"
            />
            <Button asChild variant="terracotta" size="lg" className="mt-7 border border-white/25">
              <Link href={profileUrl} target="_blank" rel="noreferrer">
                Umów wizytę
              </Link>
            </Button>
          </div>
        </Reveal>

        <div className="mt-14 grid items-stretch gap-6 lg:grid-cols-3">
          {servicesData.items.map((service, index) => (
            <Reveal key={service.title + index} delay={index * 0.08} className="h-full">
              <motion.div className="h-full" whileHover={{ y: -6 }} transition={{ duration: 0.24, ease: "easeOut" }}>
                <Card className="group flex h-full flex-col overflow-hidden bg-card/95">
                  <CardHeader className="space-y-5">
                    <MediaCard
                      src={service.image}
                      alt={`Ilustracja usługi: ${service.title}`}
                      className="aspect-[4/3] w-full rounded-2xl"
                    />
                    <CardTitle className="font-display text-3xl md:text-[2.05rem]">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex grow flex-col">
                    <p className="text-muted-foreground">{service.description}</p>
                    <p className="mt-auto pt-7 text-sm font-semibold text-foreground">{service.price}</p>
                  </CardContent>
                  <CardFooter className="mt-auto">
                    <Button asChild variant="outline" className="w-full justify-center">
                      <Link href={profileUrl} target="_blank" rel="noreferrer">
                        {service.cta}
                      </Link>
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

