import { apiFetch } from "@/lib/http";
import type {
  Article,
  ArticlesFilter,
  CreateArticleInput,
  UpdateArticleInput,
} from "@/types";

interface ArticleResponse {
  article: Article;
}

interface ArticlesResponse {
  articles: Article[];
  articlesCount: number;
}

function buildQuery(filter: ArticlesFilter): string {
  const params = new URLSearchParams();
  if (filter.tag) params.set("tag", filter.tag);
  if (filter.author) params.set("author", filter.author);
  if (filter.favorited) params.set("favorited", filter.favorited);
  params.set("limit", String(filter.limit ?? 20));
  params.set("offset", String(filter.offset ?? 0));
  return params.toString();
}

export function listArticles(
  filter: ArticlesFilter = {},
): Promise<ArticlesResponse> {
  return apiFetch<ArticlesResponse>(`/articles?${buildQuery(filter)}`);
}

export function listFeedArticles(
  filter: ArticlesFilter = {},
): Promise<ArticlesResponse> {
  return apiFetch<ArticlesResponse>(`/articles/feed?${buildQuery(filter)}`);
}

export function getArticle(slug: string): Promise<Article> {
  return apiFetch<ArticleResponse>(`/articles/${encodeURIComponent(slug)}`, {
    authenticated: true,
  }).then((res) => res.article);
}

export function createArticle(input: CreateArticleInput): Promise<Article> {
  return apiFetch<ArticleResponse>("/articles", {
    method: "POST",
    body: { article: input },
  }).then((res) => res.article);
}

export function updateArticle(
  slug: string,
  input: UpdateArticleInput,
): Promise<Article> {
  return apiFetch<ArticleResponse>(`/articles/${encodeURIComponent(slug)}`, {
    method: "PUT",
    body: { article: input },
  }).then((res) => res.article);
}

export function deleteArticle(slug: string): Promise<void> {
  return apiFetch<void>(`/articles/${encodeURIComponent(slug)}`, {
    method: "DELETE",
  });
}

export function favoriteArticle(slug: string): Promise<Article> {
  return apiFetch<ArticleResponse>(
    `/articles/${encodeURIComponent(slug)}/favorite`,
    { method: "POST" },
  ).then((res) => res.article);
}

export function unfavoriteArticle(slug: string): Promise<Article> {
  return apiFetch<ArticleResponse>(
    `/articles/${encodeURIComponent(slug)}/favorite`,
    { method: "DELETE" },
  ).then((res) => res.article);
}
