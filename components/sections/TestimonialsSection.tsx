"use client";

import Link from "next/link";
import { ExternalLink, Star } from "lucide-react";

import { Reveal } from "@/components/common/reveal";
import { SectionHeading } from "@/components/common/section-heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { googleReviewsUrl, testimonialsData } from "@/data/mock";

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

        <Reveal delay={0.08}>
          <Card className="mx-auto mt-14 max-w-3xl overflow-hidden rounded-[2rem] bg-card/95 shadow-panel">
            <CardContent className="relative p-7 text-center md:p-10">
              <div className="pointer-events-none absolute -left-20 -top-20 h-52 w-52 rounded-full bg-primary/12 blur-2xl" />
              <div className="pointer-events-none absolute -bottom-24 right-0 h-56 w-56 rounded-full bg-accent/14 blur-2xl" />

              <div className="relative mx-auto flex max-w-xl flex-col items-center">
                <div className="flex items-center gap-1 text-[#f4b400]" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className="h-5 w-5 fill-current" />
                  ))}
                </div>

                <p className="mt-5 font-display text-3xl leading-tight text-foreground md:text-4xl">Opinie Google</p>

                <Button asChild variant="outline" size="lg" className="mt-7">
                  <Link href={googleReviewsUrl} target="_blank" rel="noreferrer">
                    Zobacz opinie w Google
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}
