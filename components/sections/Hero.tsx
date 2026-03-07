"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import { PlaceholderImage } from "@/components/common/placeholder-image";
import { Button } from "@/components/ui/button";
import { heroData } from "@/data/mock";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden py-8 md:py-16 lg:min-h-[calc(100vh-6rem)] lg:py-14">
      <div className="container lg:hidden">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="relative min-h-[39rem] overflow-hidden rounded-[2rem] border border-border/70 bg-secondary/65 shadow-panel"
        >
          <Image src={heroData.image} alt="Placeholder hero image" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background/25" />

          <div className="absolute inset-x-5 top-5 rounded-[1.4rem] border border-border/60 bg-background/72 p-5 backdrop-blur-sm">
            <p className="mb-4 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-primary/90">{heroData.eyebrow}</p>
            <h1 className="font-display text-[2.95rem] font-normal leading-[0.9] text-balance text-foreground">{heroData.title}</h1>
            <p className="mt-4 max-w-md text-[1.02rem] leading-relaxed text-foreground/82">{heroData.description}</p>
          </div>

          <div className="absolute inset-x-5 bottom-5 flex flex-col gap-3">
            <Button variant="terracotta" size="lg" className="h-14 w-full rounded-2xl text-[1.38rem] font-normal font-display">
              {heroData.primaryCta}
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-14 w-full rounded-2xl border-background/65 bg-background/70 text-[1.32rem] font-normal font-display backdrop-blur-sm"
            >
              {heroData.secondaryCta}
            </Button>
          </div>
        </motion.div>
      </div>

      <div className="container hidden items-center gap-10 lg:grid lg:grid-cols-[1.02fr_1fr] lg:gap-12 xl:gap-14">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-[40rem]"
        >
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-primary/90">{heroData.eyebrow}</p>
          <h1 className="font-display text-[4.35rem] font-normal leading-[0.94] tracking-[-0.01em] text-balance text-foreground xl:text-[5rem]">
            {heroData.title}
          </h1>
          <p className="mt-6 max-w-[33rem] text-lg text-muted-foreground">{heroData.description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button variant="terracotta" size="lg">
              {heroData.primaryCta}
            </Button>
            <Button variant="outline" size="lg">
              {heroData.secondaryCta}
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.95, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="group relative"
        >
          <div className="absolute -left-6 -top-6 h-40 w-40 rounded-full bg-primary/16 blur-2xl" />
          <div className="absolute -bottom-6 -right-6 h-44 w-44 rounded-full bg-accent/18 blur-2xl" />
          <PlaceholderImage
            src={heroData.image}
            alt="Placeholder hero image"
            priority
            className="aspect-[4/5] min-h-[28rem] w-full xl:min-h-[30rem]"
          />
        </motion.div>
      </div>
    </section>
  );
}
