"use client";

import Link from "next/link";
import { Menu } from "lucide-react";

import { navItems } from "@/data/site-content";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/50 bg-background/88 backdrop-blur-xl">
      <div className="container flex h-24 items-center justify-between lg:h-24 lg:gap-8">
        <Link href="/#top" className="pr-3 font-display text-foreground lg:pr-0">
          <span className="block leading-none">
            <span className="block whitespace-nowrap text-[1.68rem] sm:text-[1.9rem] md:text-[2.05rem] lg:text-[2.15rem]">
              Sandra Anczarska
            </span>
            <span className="mt-1 block text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-primary/80 sm:text-[0.78rem] lg:text-[0.8rem]">
              Psychoterapia
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-2 xl:gap-3 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2.5 text-[0.95rem] font-medium text-foreground/80 transition-colors hover:bg-secondary/70 hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Button asChild variant="terracotta">
            <Link href="/rezerwacja">
              Umów wizytę
            </Link>
          </Button>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <button
              aria-label="Otwórz menu"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/70 bg-background lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </SheetTrigger>
          <SheetContent className="rounded-l-3xl border-white/50 bg-transparent bg-gradient-to-b from-white/66 via-white/52 to-white/36 shadow-[0_24px_64px_-28px_rgba(15,23,42,0.35)] backdrop-blur-2xl backdrop-saturate-150 supports-[backdrop-filter]:from-white/60 supports-[backdrop-filter]:via-white/46 supports-[backdrop-filter]:to-white/30">
            <SheetHeader>
              <SheetTitle className="text-foreground">
                <span className="block">Psychoterapia</span>
                <span className="block whitespace-nowrap">Sandra Anczarska</span>
              </SheetTitle>
              <SheetDescription className="text-foreground/55">Nawigacja mobilna</SheetDescription>
            </SheetHeader>
            <nav className="mt-10 flex flex-col gap-6">
              {navItems.map((item) => (
                <SheetClose asChild key={item.href}>
                  <Link
                    href={item.href}
                    className="-mx-4 rounded-2xl px-4 py-2 text-[2rem] font-display leading-none text-foreground transition-colors hover:bg-white/35"
                  >
                    {item.label}
                  </Link>
                </SheetClose>
              ))}
            </nav>
            <SheetClose asChild>
              <Button asChild variant="terracotta" className="mt-10 h-14 w-full rounded-2xl text-xl font-display font-normal">
                <Link href="/rezerwacja">
                  Umów wizytę
                </Link>
              </Button>
            </SheetClose>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}


