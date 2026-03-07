"use client";

import Link from "next/link";
import { Menu } from "lucide-react";

import { navItems } from "@/data/mock";
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
        <Link
          href="#top"
          className="pr-3 font-display text-foreground lg:pr-0"
        >
          <span className="block text-[1.62rem] leading-[1.02] sm:text-[1.78rem] md:text-[1.95rem] lg:hidden">
            <span className="block">Psychoterapia</span>
            <span className="block">Sandra Anczarska</span>
          </span>
          <span className="hidden whitespace-nowrap text-[2.05rem] leading-none lg:inline">
            Psychoterapia Sandra Anczarska
          </span>
        </Link>

        <nav className="hidden items-center gap-6 xl:gap-8 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-foreground/80 hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Button variant="terracotta">[Widget znany lekarz]</Button>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <button
              aria-label="Otworz menu"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/70 bg-background lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </SheetTrigger>
          <SheetContent className="rounded-l-3xl border-white/50 bg-transparent bg-gradient-to-b from-white/66 via-white/52 to-white/36 shadow-[0_24px_64px_-28px_rgba(15,23,42,0.35)] backdrop-blur-2xl backdrop-saturate-150 supports-[backdrop-filter]:from-white/60 supports-[backdrop-filter]:via-white/46 supports-[backdrop-filter]:to-white/30">
            <SheetHeader>
              <SheetTitle className="text-foreground">Psychoterapia Sandra Anczarska</SheetTitle>
              <SheetDescription className="text-foreground/55">[Nawigacja mobilna]</SheetDescription>
            </SheetHeader>
            <nav className="mt-10 flex flex-col gap-6">
              {navItems.map((item) => (
                <SheetClose asChild key={item.href}>
                  <Link href={item.href} className="text-[2rem] font-display leading-none text-foreground">
                    {item.label}
                  </Link>
                </SheetClose>
              ))}
            </nav>
            <SheetClose asChild>
              <Button variant="terracotta" className="mt-10 h-14 w-full rounded-2xl text-xl font-display font-normal">
                [Widget znany lekarz]
              </Button>
            </SheetClose>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
