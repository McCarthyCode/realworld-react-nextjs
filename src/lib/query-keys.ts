import type { ArticlesFilter } from "@/types";

/**
 * Centralized query key factory so cache invalidation stays consistent
 * across the app (e.g. invalidating "all article lists" after a mutation).
 */
export const queryKeys = {
  currentUser: ["currentUser"] as const,
  profile: (username: string) => ["profile", username] as const,
  articles: (filter: ArticlesFilter) => ["articles", filter] as const,
  feed: (filter: ArticlesFilter) => ["feed", filter] as const,
  article: (slug: string) => ["article", slug] as const,
  comments: (slug: string) => ["comments", slug] as const,
  tags: ["tags"] as const,
};
