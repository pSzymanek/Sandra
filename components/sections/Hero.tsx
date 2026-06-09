"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { MediaCard } from "@/components/common/media-card";
import { Button } from "@/components/ui/button";
import { heroData, profileUrl } from "@/data/site-content";

function EyebrowText({ className }: { className?: string }) {
  const [profession, location] = heroData.eyebrow.split("|").map((item) => item.trim());

  return (
    <span className={className}>
      <span>{profession}</span>
      {location ? (
        <>
          <span className="px-2 text-accent">|</span>
          <span>{location}</span>
        </>
      ) : null}
    </span>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pb-8 pt-0 md:py-16 lg:min-h-[calc(100vh-6rem)] lg:py-14">
      <div className="lg:hidden">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="flex min-h-[calc(100svh-6rem)] flex-col justify-center bg-background px-5 py-[clamp(1rem,4svh,2.5rem)]"
        >
          <div className="mx-auto w-full max-w-sm overflow-hidden rounded-[1.65rem] border border-border/60 bg-background/88 shadow-panel">
            <div className="relative h-[clamp(13.75rem,36svh,21rem)] bg-secondary/65">
              <Image
                src={heroData.image}
                alt="Portret Sandry Anczarskiej, psycholog i psychoterapeutki w Mysłowicach"
                fill
                priority
                className="object-cover object-center"
              />
            </div>

            <div className="p-[clamp(1rem,3svh,1.35rem)] pt-3">
              <h1 className="font-display text-[clamp(2.35rem,9vw,3rem)] font-normal leading-[0.9] text-balance text-foreground">
                {heroData.title}
              </h1>
              <p className="mt-2 text-[clamp(0.56rem,1.9vw,0.68rem)] font-semibold uppercase tracking-[0.22em] text-primary/90">
                <EyebrowText />
              </p>
              <p className="mt-3 max-w-md text-[clamp(0.9rem,3.2vw,1.02rem)] leading-relaxed text-foreground/82">
                {heroData.description}
              </p>
              <blockquote className="mt-4 border-l-2 border-accent/55 pl-4 text-[clamp(0.78rem,2.65vw,0.92rem)] leading-relaxed text-foreground/72">
                <p>&bdquo;{heroData.quote}&rdquo;</p>
                <footer className="mt-1 text-[0.72rem] font-medium uppercase tracking-[0.18em] text-primary/80">
                  {heroData.quoteAuthor}
                </footer>
              </blockquote>
            </div>
          </div>

          <div className="mx-auto mt-[clamp(0.85rem,2.4svh,1.35rem)] flex w-full max-w-sm flex-col gap-[clamp(0.65rem,1.8svh,0.95rem)]">
            <Button
              asChild
              variant="terracotta"
              size="lg"
              className="h-[clamp(3.25rem,7svh,4rem)] w-full rounded-2xl px-3 text-[clamp(1.08rem,4vw,1.25rem)] font-normal font-display"
            >
              <Link href={profileUrl} target="_blank" rel="noreferrer">
                {heroData.primaryCta}
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-[clamp(3.25rem,7svh,4rem)] w-full rounded-2xl border-[#6f8879] bg-[#6f8879] px-3 text-[clamp(1.06rem,3.8vw,1.22rem)] font-normal font-display text-white shadow-soft hover:bg-[#647d6d]"
            >
              <Link href="#oferta">{heroData.secondaryCta}</Link>
            </Button>
          </div>

          <motion.a
            href="#oferta"
            aria-label="Przejdź do sekcji oferta"
            className="mx-auto mt-[clamp(0.8rem,2.2svh,1.4rem)] flex h-[clamp(2.25rem,5.6svh,2.75rem)] w-[clamp(2.25rem,5.6svh,2.75rem)] shrink-0 items-center justify-center rounded-full border border-[#6f8879]/25 bg-background/82 text-[#6f8879] shadow-soft backdrop-blur-md"
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 1.9, repeat: Infinity, repeatDelay: 1.2, ease: "easeInOut" }}
          >
            <ChevronDown className="h-4 w-4" />
          </motion.a>
        </motion.div>
      </div>

      <div className="container hidden items-center gap-10 lg:grid lg:grid-cols-[1.02fr_1fr] lg:gap-12 xl:gap-14">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-[40rem]"
        >
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-primary/90">
            <EyebrowText />
          </p>
          <h1 className="font-display text-[4.35rem] font-normal leading-[0.94] tracking-[-0.01em] text-balance text-foreground xl:text-[5rem]">
            {heroData.title}
          </h1>
          <p className="mt-6 max-w-[33rem] text-lg text-muted-foreground">{heroData.description}</p>
          <blockquote className="mt-7 max-w-[35rem] border-l-2 border-accent/60 pl-5 text-lg leading-relaxed text-foreground/72">
            <p>&bdquo;{heroData.quote}&rdquo;</p>
            <footer className="mt-2 text-sm font-medium uppercase tracking-[0.18em] text-primary/85">
              {heroData.quoteAuthor}
            </footer>
          </blockquote>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="terracotta" size="lg">
              <Link href={profileUrl} target="_blank" rel="noreferrer">
                {heroData.primaryCta}
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-[#6f8879] bg-[#6f8879] text-white shadow-soft hover:bg-[#647d6d]"
            >
              <Link href="#oferta">{heroData.secondaryCta}</Link>
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
          <MediaCard
            src={heroData.image}
            alt="Portret Sandry Anczarskiej, psycholog i psychoterapeutki w Mysłowicach"
            priority
            className="mx-auto aspect-square w-full max-w-[33rem]"
          />
        </motion.div>
      </div>

      <motion.div
        className="pointer-events-none absolute inset-x-0 bottom-6 z-10 hidden justify-center lg:flex"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.a
          href="#oferta"
          aria-label="Przejdź do sekcji oferta"
          className="pointer-events-auto inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#6f8879]/25 bg-background/78 text-[#6f8879] shadow-soft backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#6f8879] hover:text-white"
          animate={{ y: [0, 16, 0] }}
          transition={{ duration: 1.9, repeat: Infinity, repeatDelay: 1.2, ease: "easeInOut" }}
        >
          <ChevronDown className="h-6 w-6" />
        </motion.a>
      </motion.div>
    </section>
  );
}

