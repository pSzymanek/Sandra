"use client";

import { motion } from "framer-motion";

import { PlaceholderImage } from "@/components/common/placeholder-image";
import { Button } from "@/components/ui/button";
import { heroData } from "@/data/mock";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden py-16 md:py-20 lg:min-h-[calc(100vh-5rem)] lg:py-24">
      <div className="container grid items-center gap-10 lg:grid-cols-[1.04fr_1fr] lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-xl"
        >
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-primary/90">{heroData.eyebrow}</p>
          <h1 className="font-display text-5xl leading-[0.95] text-balance md:text-6xl lg:text-7xl">{heroData.title}</h1>
          <p className="mt-7 max-w-lg text-base text-muted-foreground md:text-lg">{heroData.description}</p>
          <div className="mt-10 flex flex-wrap gap-3">
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
            className="aspect-[4/5] min-h-[26rem] w-full"
          />
        </motion.div>
      </div>
    </section>
  );
}
