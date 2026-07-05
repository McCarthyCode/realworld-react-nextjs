import { renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { createTestQueryClient, createWrapper } from "@/test/queryWrapper";

import * as articlesApi from "@/lib/api/articles";
import { queryKeys } from "@/lib/query-keys";
import type { Article } from "@/types";

import { useFavoriteArticle } from "./useFavoriteArticle";

vi.mock("@/lib/api/articles");

const baseArticle: Article = {
  slug: "test-article",
  title: "Test Article",
  description: "desc",
  tagList: [],
  createdAt: "2016-01-01T00:00:00.000Z",
  updatedAt: "2016-01-01T00:00:00.000Z",
  favorited: false,
  favoritesCount: 0,
  author: { username: "jake", bio: null, image: null, following: false },
};

describe("useFavoriteArticle", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(articlesApi.favoriteArticle).mockResolvedValue({
      ...baseArticle,
      favorited: true,
      favoritesCount: 1,
    });
    vi.mocked(articlesApi.unfavoriteArticle).mockResolvedValue({
      ...baseArticle,
      favorited: false,
      favoritesCount: 0,
    });
  });

  it("calls the favorite endpoint for an unfavorited article", async () => {
    const { result } = renderHook(() => useFavoriteArticle(), { wrapper: createWrapper() });

    result.current.toggle(baseArticle);

    await waitFor(() => expect(articlesApi.favoriteArticle).toHaveBeenCalledWith("test-article"));
    expect(articlesApi.unfavoriteArticle).not.toHaveBeenCalled();
  });

  it("calls the unfavorite endpoint for an already-favorited article", async () => {
    const favorited = { ...baseArticle, favorited: true };
    const { result } = renderHook(() => useFavoriteArticle(), { wrapper: createWrapper() });

    result.current.toggle(favorited);

    await waitFor(() =>
      expect(articlesApi.unfavoriteArticle).toHaveBeenCalledWith("test-article"),
    );
  });

  it("updates the cached article detail query after a successful toggle", async () => {
    const queryClient = createTestQueryClient();
    queryClient.setQueryData(queryKeys.article(baseArticle.slug), baseArticle);

    const { result } = renderHook(() => useFavoriteArticle(), {
      wrapper: createWrapper(queryClient),
    });

    result.current.toggle(baseArticle);

    await waitFor(() =>
      expect(queryClient.getQueryData(queryKeys.article(baseArticle.slug))).toMatchObject({
        favorited: true,
        favoritesCount: 1,
      }),
    );
  });
});
