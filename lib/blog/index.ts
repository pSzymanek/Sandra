import { localArticles } from "./localProvider";
import { getWordPressArticleBySlug, getWordPressArticles } from "./wordpressProvider";
import type { BlogArticle } from "./types";

function sortArticles(articles: BlogArticle[]) {
  return [...articles].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export async function getArticles(): Promise<BlogArticle[]> {
  if (process.env.BLOG_PROVIDER === "wordpress") {
    const wordpressArticles = await getWordPressArticles();
    if (wordpressArticles.length > 0) return sortArticles(wordpressArticles);
  }

  return sortArticles(localArticles);
}

export async function getArticleBySlug(slug: string): Promise<BlogArticle | null> {
  if (process.env.BLOG_PROVIDER === "wordpress") {
    const wordpressArticle = await getWordPressArticleBySlug(slug);
    if (wordpressArticle) return wordpressArticle;
  }

  return localArticles.find((article) => article.slug === slug) ?? null;
}

export function formatArticleDate(date: string) {
  return new Intl.DateTimeFormat("pl-PL", { day: "numeric", month: "long", year: "numeric" }).format(
    new Date(`${date}T12:00:00+02:00`),
  );
}

