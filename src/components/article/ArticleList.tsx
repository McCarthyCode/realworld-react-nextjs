"use client";

import { useRouter } from "next/navigation";

import { ArticlePreview } from "@/components/article/ArticlePreview";
import { ErrorMessages } from "@/components/ui/ErrorMessages";
import { Pagination } from "@/components/ui/Pagination";
import { Spinner } from "@/components/ui/Spinner";
import { useAuth } from "@/hooks/useAuth";
import { useArticles, type ArticleSource } from "@/hooks/useArticles";
import { useFavoriteArticle } from "@/hooks/useFavoriteArticle";
import type { Article } from "@/types";

export interface ArticleListProps {
  source: ArticleSource;
  /** Required for "tag", "author", and "favorited" sources. */
  value?: string;
  page: number;
  onPageChange: (page: number) => void;
  limit?: number;
  emptyMessage?: string;
}

/**
 * Fetches and renders a paginated article list for any of the app's list
 * views (global feed, personal feed, tag filter, author's articles,
 * favorited articles), wiring up favorite-toggling for each item.
 */
export function ArticleList({
  source,
  value,
  page,
  onPageChange,
  limit = 10,
  emptyMessage = "No articles are here... yet.",
}: ArticleListProps) {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { toggle, isPending } = useFavoriteArticle();
  const { data, isLoading, isError, error } = useArticles({
    source,
    value,
    page,
    limit,
    enabled: source !== "feed" || isAuthenticated,
  });

  const handleFavoriteClick = (article: Article) => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    toggle(article);
  };

  if (isLoading) {
    return <Spinner label="Loading articles" />;
  }

  if (isError) {
    return (
      <ErrorMessages
        errors={[error instanceof Error ? error.message : "Failed to load articles."]}
      />
    );
  }

  if (!data || data.articles.length === 0) {
    return <p className="py-8 text-center text-gray-400">{emptyMessage}</p>;
  }

  return (
    <div>
      {data.articles.map((article) => (
        <ArticlePreview
          key={article.slug}
          article={article}
          onFavoriteClick={() => handleFavoriteClick(article)}
          isFavoriteLoading={isPending}
        />
      ))}
      <div className="mt-6 flex justify-center">
        <Pagination total={data.articlesCount} limit={limit} currentPage={page} onPageChange={onPageChange} />
      </div>
    </div>
  );
}
