import { useQuery } from "@tanstack/react-query";

import { listArticles, listFeedArticles } from "@/lib/api/articles";
import { queryKeys } from "@/lib/query-keys";
import type { ArticlesFilter } from "@/types";

export type ArticleSource = "global" | "feed" | "tag" | "author" | "favorited";

export interface UseArticlesOptions {
  source: ArticleSource;
  /** Required when `source` is "tag", "author", or "favorited". */
  value?: string;
  page: number;
  limit?: number;
  /** Only fetch when true. Useful for feed which requires auth. */
  enabled?: boolean;
}

function buildFilter(options: UseArticlesOptions): ArticlesFilter {
  const limit = options.limit ?? 10;
  const offset = (options.page - 1) * limit;
  const filter: ArticlesFilter = { limit, offset };

  if (options.source === "tag") filter.tag = options.value;
  if (options.source === "author") filter.author = options.value;
  if (options.source === "favorited") filter.favorited = options.value;

  return filter;
}

/**
 * Fetches a page of articles for any of the list views used across the app
 * (global feed, personal feed, tag filter, author's articles, favorited
 * articles). Encapsulates pagination math and query-key generation.
 */
export function useArticles(options: UseArticlesOptions) {
  const filter = buildFilter(options);
  const isFeed = options.source === "feed";

  return useQuery({
    queryKey: isFeed ? queryKeys.feed(filter) : queryKeys.articles(filter),
    queryFn: () => (isFeed ? listFeedArticles(filter) : listArticles(filter)),
    enabled: options.enabled ?? true,
    placeholderData: (previousData) => previousData,
  });
}
