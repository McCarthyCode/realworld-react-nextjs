import { useMutation, useQueryClient } from "@tanstack/react-query";

import { favoriteArticle, unfavoriteArticle } from "@/lib/api/articles";
import { queryKeys } from "@/lib/query-keys";
import type { Article } from "@/types";

interface ArticlesListCache {
  articles: Article[];
  articlesCount: number;
}

/**
 * Toggles the favorited state of an article and keeps every cached view of
 * that article (list pages, feed, article detail) in sync via a targeted
 * cache update rather than a full refetch.
 */
export function useFavoriteArticle() {
  const queryClient = useQueryClient();

  const updateCaches = (updated: Article) => {
    queryClient.setQueryData<Article>(queryKeys.article(updated.slug), updated);

    queryClient.setQueriesData<ArticlesListCache>(
      { predicate: (query) => ["articles", "feed"].includes(query.queryKey[0] as string) },
      (cache) => {
        if (!cache) return cache;
        return {
          ...cache,
          articles: cache.articles.map((article) =>
            article.slug === updated.slug ? updated : article,
          ),
        };
      },
    );
  };

  const favorite = useMutation({
    mutationFn: (article: Article) => favoriteArticle(article.slug),
    onSuccess: updateCaches,
  });

  const unfavorite = useMutation({
    mutationFn: (article: Article) => unfavoriteArticle(article.slug),
    onSuccess: updateCaches,
  });

  const toggle = (article: Article) =>
    article.favorited ? unfavorite.mutate(article) : favorite.mutate(article);

  return {
    toggle,
    isPending: favorite.isPending || unfavorite.isPending,
  };
}
