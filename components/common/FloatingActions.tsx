"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUp, Facebook, Instagram, Link2, Music2, Phone } from "lucide-react";

import { cn } from "@/lib/utils";
import { profileUrl } from "@/data/site-content";

const socials = [
  { label: "Facebook", href: "#", icon: Facebook, bg: "bg-[#c6866a]" },
  { label: "Instagram", href: "#", icon: Instagram, bg: "bg-[#c6866a]" },
  { label: "TikTok", href: "#", icon: Music2, bg: "bg-[#c6866a]" },
  { label: "ZnanyLekarz", href: profileUrl, icon: Link2, bg: "bg-black" },
];

function CircleButton({
  label,
  href,
  className,
  children,
}: {
  label: string;
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      className={cn(
        "inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/40 text-white shadow-soft transition-transform duration-300 hover:-translate-y-0.5 lg:h-14 lg:w-14",
        className,
      )}
    >
      {children}
    </a>
  );
}

function ScrollTopButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      aria-label="Przewiń do góry"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={cn(
        "inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/40 text-white shadow-soft transition-transform duration-300 hover:-translate-y-0.5 lg:h-14 lg:w-14",
        className,
      )}
    >
      <ArrowUp className="h-5 w-5 lg:h-6 lg:w-6" />
    </button>
  );
}

export function FloatingActions() {
  const [showSocials, setShowSocials] = useState(false);
  const [hideNearBottom, setHideNearBottom] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollBottom = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      setShowSocials(window.scrollY > 120);
      setHideNearBottom(documentHeight - scrollBottom < 520);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.div
        initial={false}
        animate={{
          opacity: showSocials && !hideNearBottom ? 1 : 0,
          y: showSocials && !hideNearBottom ? 0 : 18,
          x: showSocials && !hideNearBottom ? 0 : -10,
        }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none fixed bottom-3 left-2.5 z-30 sm:left-5 lg:bottom-4"
        style={{ bottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
      >
        <div
          className={cn(
            "flex flex-col gap-2 lg:gap-2.5",
            showSocials && !hideNearBottom ? "pointer-events-auto" : "pointer-events-none",
          )}
        >
          {socials.map((item) => {
            const Icon = item.icon;
            return (
              <CircleButton key={item.label} href={item.href} label={item.label} className={item.bg}>
                <Icon className="h-5 w-5 lg:h-6 lg:w-6" />
              </CircleButton>
            );
          })}
        </div>
      </motion.div>

      <motion.div
        initial={false}
        animate={{ opacity: showSocials ? 1 : 0, y: showSocials ? 0 : 16 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none fixed bottom-3 right-2.5 z-30 lg:hidden"
        style={{ bottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
      >
        <div className={cn("flex flex-col gap-2", showSocials ? "pointer-events-auto" : "pointer-events-none")}>
          <motion.div
            initial={false}
            animate={{ opacity: showSocials ? 1 : 0, y: showSocials ? 0 : 10 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className={cn(showSocials ? "pointer-events-auto" : "pointer-events-none")}
          >
            <ScrollTopButton className="border-white/45 bg-[#2f4350]" />
          </motion.div>

          <CircleButton label="Telefon" href="#kontakt" className="h-12 w-12 border-white/45 bg-[#6f8879]">
            <Phone className="h-5 w-5" />
          </CircleButton>
        </div>
      </motion.div>

      <motion.div
        initial={false}
        animate={{
          opacity: showSocials ? 1 : 0,
          y: showSocials ? 0 : 14,
          x: showSocials ? 0 : 8,
        }}
        transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none fixed bottom-4 right-5 z-30 hidden lg:block"
      >
        <div className={cn("flex flex-col gap-2.5", showSocials ? "pointer-events-auto" : "pointer-events-none")}>
          <CircleButton label="Kontakt" href="#kontakt" className="border-white/40 bg-[#6f8879]">
            <Phone className="h-6 w-6" />
          </CircleButton>
          <ScrollTopButton className="border-white/40 bg-[#2f4350]" />
        </div>
      </motion.div>
    </>
  );
}

