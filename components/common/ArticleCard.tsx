import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatArticleDate } from "@/lib/blog";
import type { BlogArticle } from "@/lib/blog/types";

export function ArticleCard({ article }: { article: BlogArticle }) {
  return (
    <Card className="group flex h-full flex-col overflow-hidden bg-card/92 transition-all duration-300 hover:-translate-y-1 hover:shadow-soft">
      {article.featuredImage ? (
        <Link href={`/blog/${article.slug}`} className="relative block aspect-[16/10] overflow-hidden bg-secondary">
          <Image
            src={article.featuredImage.src}
            alt={article.featuredImage.alt}
            fill
            unoptimized={article.featuredImage.src.startsWith("http")}
            className="object-cover transition-transform duration-700 group-hover:scale-[1.035]"
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/16 to-transparent" />
        </Link>
      ) : null}

      <div className="flex flex-1 flex-col p-6 md:p-7">
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary/85">
          <span>{article.category}</span>
          <span className="h-1 w-1 rounded-full bg-accent" />
          <time dateTime={article.publishedAt}>{formatArticleDate(article.publishedAt)}</time>
        </div>
        <h2 className="mt-4 font-display text-3xl leading-tight text-foreground md:text-[2.1rem]">
          <Link href={`/blog/${article.slug}`} className="hover:text-primary">
            {article.title}
          </Link>
        </h2>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">{article.excerpt}</p>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-7">
          <span className="text-sm text-muted-foreground">{article.readingTime}</span>
          <Button asChild variant="outline" className="bg-background/80">
            <Link href={`/blog/${article.slug}`}>Czytaj więcej</Link>
          </Button>
        </div>
      </div>
    </Card>
  );
}

