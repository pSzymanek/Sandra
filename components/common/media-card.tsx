import Image from "next/image";

import { cn } from "@/lib/utils";

interface MediaCardProps {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
}

export function MediaCard({ src, alt, className, imageClassName, priority = false }: MediaCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[2rem] border border-border/70 bg-secondary/70 shadow-panel",
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        className={cn(
          "object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]",
          imageClassName,
        )}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/12" />
    </div>
  );
}

