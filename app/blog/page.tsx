import type { Metadata } from "next";

import { ArticleCard } from "@/components/common/ArticleCard";
import { FloatingActions } from "@/components/common/FloatingActions";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { getArticles } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "O emocjach, przeżyciach i drodze do lepszego kontaktu ze sobą.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog | Sandra Anczarska",
    description: "O emocjach, przeżyciach i drodze do lepszego kontaktu ze sobą.",
    url: "/blog",
    images: ["/images/sandra-anczarska.jpg"],
  },
};

export default async function BlogPage() {
  const articles = await getArticles();

  return (
    <div className="relative overflow-hidden">
      <Header />
      <FloatingActions />
      <main>
        <section className="border-b border-border/60 bg-background/80 py-16 md:py-24">
          <div className="container max-w-4xl text-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-primary/85">Blog</p>
            <h1 className="font-display text-5xl leading-tight text-foreground md:text-7xl">Blog</h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              O emocjach, przeżyciach i drodze do lepszego kontaktu ze sobą.
            </p>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container grid gap-7 md:grid-cols-2">
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}


