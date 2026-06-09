import type { BlogArticle } from "./types";

type WordPressRendered = { rendered?: string };
type WordPressPost = {
  id: number;
  slug: string;
  date: string;
  title?: WordPressRendered;
  excerpt?: WordPressRendered;
  content?: WordPressRendered;
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url?: string;
      alt_text?: string;
      media_details?: { width?: number; height?: number };
    }>;
    "wp:term"?: Array<Array<{ name?: string }>>;
  };
};

function stripHtml(value = "") {
  return value.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

function getWordPressBaseUrl() {
  return process.env.WORDPRESS_API_URL?.replace(/\/$/, "") ?? "";
}

function mapPost(post: WordPressPost): BlogArticle {
  const image = post._embedded?.["wp:featuredmedia"]?.[0];
  const category = post._embedded?.["wp:term"]?.flat()?.find((term) => term.name)?.name ?? "Blog";
  const title = stripHtml(post.title?.rendered);
  const excerpt = stripHtml(post.excerpt?.rendered);
  const plainContent = stripHtml(post.content?.rendered);

  return {
    id: String(post.id),
    slug: post.slug,
    title,
    excerpt,
    category,
    publishedAt: post.date.slice(0, 10),
    readingTime: "około 5 minut",
    featuredImage: image?.source_url
      ? {
          src: image.source_url,
          alt: image.alt_text || title,
          width: image.media_details?.width,
          height: image.media_details?.height,
        }
      : undefined,
    seoTitle: title,
    seoDescription: excerpt,
    content: plainContent
      .split(/\n{2,}/)
      .map((text) => text.trim())
      .filter(Boolean)
      .map((text) => ({ type: "paragraph" as const, text })),
  };
}

export async function getWordPressArticles(): Promise<BlogArticle[]> {
  const baseUrl = getWordPressBaseUrl();
  if (!baseUrl) return [];

  const response = await fetch(`${baseUrl}/posts?_embed=1&per_page=20`, { next: { revalidate: 300 } });
  if (!response.ok) return [];

  const posts = (await response.json()) as WordPressPost[];
  return posts.map(mapPost);
}

export async function getWordPressArticleBySlug(slug: string): Promise<BlogArticle | null> {
  const baseUrl = getWordPressBaseUrl();
  if (!baseUrl) return null;

  const response = await fetch(`${baseUrl}/posts?_embed=1&slug=${encodeURIComponent(slug)}`, {
    next: { revalidate: 300 },
  });
  if (!response.ok) return null;

  const posts = (await response.json()) as WordPressPost[];
  return posts[0] ? mapPost(posts[0]) : null;
}

