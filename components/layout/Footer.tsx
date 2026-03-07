import Link from "next/link";
import { Facebook, Instagram, Linkedin } from "lucide-react";

import { footerData, navItems } from "@/data/mock";

const socialMap = {
  Instagram,
  Facebook,
  LinkedIn: Linkedin,
} as const;

export function Footer() {
  return (
    <footer className="border-t border-border/70 bg-secondary/55">
      <div className="container grid gap-10 py-14 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <p className="font-display text-3xl text-foreground md:text-4xl">Psychoterapia Sandra Anczarska</p>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">{footerData.copy}</p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">[Menu]</p>
          <div className="mt-4 flex flex-col gap-2">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm text-foreground/80 hover:text-foreground">
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">[Kontakt]</p>
          <div className="mt-4 space-y-2 text-sm text-foreground/80">
            <p>[Telefon]</p>
            <p>[Email]</p>
            <p>[Adres]</p>
          </div>
          <div className="mt-6 flex items-center gap-2">
            {footerData.socials.map((name) => {
              const Icon = socialMap[name as keyof typeof socialMap];
              if (!Icon) {
                return null;
              }

              return (
                <a
                  key={name}
                  href="#"
                  aria-label={name}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/70 bg-background/85 text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:text-foreground"
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}