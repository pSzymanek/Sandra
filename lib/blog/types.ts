export type ArticleContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "quote"; text: string; author?: string }
  | { type: "heading"; text: string };

export interface BlogArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: ArticleContentBlock[];
  category: string;
  publishedAt: string;
  readingTime: string;
  featuredImage?: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
  };
  seoTitle: string;
  seoDescription: string;
}

