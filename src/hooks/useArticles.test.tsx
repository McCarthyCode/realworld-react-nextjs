import { renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { createWrapper } from "@/test/queryWrapper";

import * as articlesApi from "@/lib/api/articles";
import { useArticles } from "./useArticles";

vi.mock("@/lib/api/articles");

const articlesResponse = { articles: [], articlesCount: 0 };

describe("useArticles", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(articlesApi.listArticles).mockResolvedValue(articlesResponse);
    vi.mocked(articlesApi.listFeedArticles).mockResolvedValue(articlesResponse);
  });

  it("computes limit/offset from the page number", async () => {
    const { result } = renderHook(() => useArticles({ source: "global", page: 3, limit: 10 }), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(articlesApi.listArticles).toHaveBeenCalledWith({ limit: 10, offset: 20 });
  });

  it("filters by tag when source is 'tag'", async () => {
    renderHook(() => useArticles({ source: "tag", value: "reactjs", page: 1 }), {
      wrapper: createWrapper(),
    });

    await waitFor(() =>
      expect(articlesApi.listArticles).toHaveBeenCalledWith(
        expect.objectContaining({ tag: "reactjs" }),
      ),
    );
  });

  it("filters by author when source is 'author'", async () => {
    renderHook(() => useArticles({ source: "author", value: "jake", page: 1 }), {
      wrapper: createWrapper(),
    });

    await waitFor(() =>
      expect(articlesApi.listArticles).toHaveBeenCalledWith(
        expect.objectContaining({ author: "jake" }),
      ),
    );
  });

  it("uses the feed endpoint when source is 'feed'", async () => {
    renderHook(() => useArticles({ source: "feed", page: 1 }), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(articlesApi.listFeedArticles).toHaveBeenCalled());
    expect(articlesApi.listArticles).not.toHaveBeenCalled();
  });

  it("does not fetch when disabled", () => {
    renderHook(() => useArticles({ source: "feed", page: 1, enabled: false }), {
      wrapper: createWrapper(),
    });

    expect(articlesApi.listFeedArticles).not.toHaveBeenCalled();
  });
});
