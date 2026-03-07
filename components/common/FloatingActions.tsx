"use client";

import { motion } from "framer-motion";
import { Facebook, Instagram, Link2, Music2, Phone } from "lucide-react";

import { cn } from "@/lib/utils";

const socials = [
  { label: "Facebook", href: "#", icon: Facebook, bg: "bg-[#c6866a]" },
  { label: "Instagram", href: "#", icon: Instagram, bg: "bg-[#c6866a]" },
  { label: "TikTok", href: "#", icon: Music2, bg: "bg-[#c6866a]" },
  { label: "Link", href: "#", icon: Link2, bg: "bg-black" },
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
        "inline-flex h-14 w-14 items-center justify-center rounded-full border border-white/40 text-white shadow-soft transition-transform duration-300 hover:-translate-y-0.5",
        className,
      )}
    >
      {children}
    </a>
  );
}

export function FloatingActions() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none fixed bottom-4 left-3 z-30 sm:left-5"
        style={{ bottom: "max(1rem, env(safe-area-inset-bottom))" }}
      >
        <div className="pointer-events-auto flex flex-col gap-2.5">
          {socials.map((item) => {
            const Icon = item.icon;
            return (
              <CircleButton key={item.label} href={item.href} label={item.label} className={item.bg}>
                <Icon className="h-6 w-6" />
              </CircleButton>
            );
          })}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none fixed bottom-4 right-3 z-30 md:hidden"
        style={{ bottom: "max(1rem, env(safe-area-inset-bottom))" }}
      >
        <div className="pointer-events-auto">
          <CircleButton label="Telefon" href="#" className="h-16 w-16 border-white/45 bg-[#6f8879]">
            <Phone className="h-7 w-7" />
          </CircleButton>
        </div>
      </motion.div>
    </>
  );
}
