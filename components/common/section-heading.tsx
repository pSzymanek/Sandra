import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn(align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-2xl", className)}>
      {eyebrow ? (
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-primary/85">{eyebrow}</p>
      ) : null}
      <h2 className="font-display text-4xl leading-tight text-foreground md:text-5xl">{title}</h2>
      {description ? <p className="mt-5 text-base text-muted-foreground md:text-lg">{description}</p> : null}
    </div>
  );
}