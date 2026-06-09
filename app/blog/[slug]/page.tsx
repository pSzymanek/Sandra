import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { FloatingActions } from "@/components/common/FloatingActions";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { getArticleBySlug, getArticles, formatArticleDate } from "@/lib/blog";

interface ArticlePageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug);
  if (!article) return {};

  return {
    title: article.seoTitle,
    description: article.seoDescription,
    alternates: { canonical: `/blog/${article.slug}` },
    openGraph: {
      type: "article",
      title: article.seoTitle,
      description: article.seoDescription,
      url: `/blog/${article.slug}`,
      publishedTime: article.publishedAt,
      images: article.featuredImage ? [{ url: article.featuredImage.src, alt: article.featuredImage.alt }] : undefined,
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const article = await getArticleBySlug(params.slug);
  if (!article) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    author: { "@type": "Person", name: "Sandra Anczarska" },
    image: article.featuredImage?.src,
  };

  return (
    <div className="relative overflow-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <Header />
      <FloatingActions />
      <main>
        <article>
          <header className="border-b border-border/60 bg-background/80 py-12 md:py-20">
            <div className="container max-w-4xl">
              <Link href="/blog" className="text-sm font-medium text-primary hover:text-foreground">
                Wróć do bloga
              </Link>
              <div className="mt-8 flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary/85">
                <span>{article.category}</span>
                <span className="h-1 w-1 rounded-full bg-accent" />
                <time dateTime={article.publishedAt}>{formatArticleDate(article.publishedAt)}</time>
                <span className="h-1 w-1 rounded-full bg-accent" />
                <span>{article.readingTime}</span>
              </div>
              <h1 className="mt-5 font-display text-4xl leading-tight text-foreground md:text-6xl">{article.title}</h1>
              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">{article.excerpt}</p>
            </div>
          </header>

          {article.featuredImage ? (
            <div className="container max-w-5xl py-10 md:py-14">
              <div className="relative aspect-[16/9] overflow-hidden rounded-[2rem] border border-border/70 bg-secondary shadow-panel">
                <Image
                  src={article.featuredImage.src}
                  alt={article.featuredImage.alt}
                  fill
                  priority
                  unoptimized={article.featuredImage.src.startsWith("http")}
                  className="object-cover"
                  sizes="(min-width: 1024px) 960px, 100vw"
                />
              </div>
            </div>
          ) : null}

          <div className="container max-w-[820px] pb-20 md:pb-28">
            <div className="space-y-7 text-lg leading-[1.85] text-foreground/82 md:text-xl">
              {article.content.map((block, index) => {
                if (block.type === "heading") {
                  return (
                    <h2 key={index} className="pt-4 font-display text-3xl leading-tight text-foreground md:text-4xl">
                      {block.text}
                    </h2>
                  );
                }

                if (block.type === "quote") {
                  return (
                    <blockquote
                      key={index}
                      className="rounded-[1.75rem] border border-border/70 bg-card/88 p-6 text-foreground shadow-panel md:p-8"
                    >
                      <p className="font-display text-2xl leading-snug md:text-3xl">&bdquo;{block.text}&rdquo;</p>
                      {block.author ? (
                        <footer className="mt-4 text-sm font-semibold uppercase tracking-[0.18em] text-primary/85">
                          {block.author}
                        </footer>
                      ) : null}
                    </blockquote>
                  );
                }

                return <p key={index}>{block.text}</p>;
              })}
            </div>

            <section className="mt-14 rounded-[2rem] border border-border/70 bg-card/90 p-7 shadow-panel md:p-10">
              <h2 className="font-display text-3xl leading-tight md:text-4xl">Nie musisz przechodzić przez to samotnie</h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
                Jeśli czujesz, że potrzebujesz wsparcia, możesz umówić konsultację i porozmawiać o tym, co dzieje się w Twoim życiu.
              </p>
              <Button asChild variant="terracotta" className="mt-7">
                <Link href="/rezerwacja">Umów wizytę</Link>
              </Button>
            </section>

            <aside className="mt-8 rounded-[1.5rem] border border-primary/20 bg-primary/8 p-5 text-sm leading-relaxed text-foreground/72">
              Treści na stronie mają charakter edukacyjny i nie zastępują konsultacji ze specjalistą. Jeśli jesteś w bezpośrednim zagrożeniu życia lub zdrowia, zadzwoń pod numer 116 123.
            </aside>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}


