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
      <div className="container flex h-20 items-center justify-between lg:h-24 lg:gap-8">
        <Link
          href="#top"
          className="max-w-[13rem] font-display text-[2rem] leading-[0.9] text-foreground sm:max-w-[15rem] sm:text-[2.3rem] md:text-[2.55rem] lg:max-w-none lg:whitespace-nowrap lg:text-[2.05rem] lg:leading-none"
        >
          <span className="sm:hidden">Sandra Anczarska</span>
          <span className="hidden sm:inline">Psychoterapia Sandra Anczarska</span>
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
          <Button variant="terracotta">[Umow wizyte]</Button>
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
          <SheetContent className="border-border/70 bg-background/96">
            <SheetHeader>
              <SheetTitle>Psychoterapia Sandra Anczarska</SheetTitle>
              <SheetDescription>[Nawigacja mobilna]</SheetDescription>
            </SheetHeader>
            <nav className="mt-10 flex flex-col gap-6">
              {navItems.map((item) => (
                <SheetClose asChild key={item.href}>
                  <Link href={item.href} className="text-lg font-medium text-foreground/85">
                    {item.label}
                  </Link>
                </SheetClose>
              ))}
            </nav>
            <SheetClose asChild>
              <Button variant="terracotta" className="mt-10 w-full">
                [Umow wizyte]
              </Button>
            </SheetClose>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
