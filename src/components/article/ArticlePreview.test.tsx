import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import type { Article } from "@/types";

import { ArticlePreview } from "./ArticlePreview";

const article: Article = {
  slug: "how-to-train-your-dragon",
  title: "How to train your dragon",
  description: "Ever wonder how?",
  tagList: ["dragons", "training"],
  createdAt: "2016-02-18T03:22:56.637Z",
  updatedAt: "2016-02-18T03:22:56.637Z",
  favorited: false,
  favoritesCount: 2,
  author: { username: "jake", bio: null, image: null, following: false },
};

describe("ArticlePreview", () => {
  it("renders the article title, description, and tags", () => {
    render(<ArticlePreview article={article} />);

    expect(screen.getByRole("heading", { name: article.title })).toBeInTheDocument();
    expect(screen.getByText(article.description)).toBeInTheDocument();
    expect(screen.getByText("dragons")).toBeInTheDocument();
    expect(screen.getByText("training")).toBeInTheDocument();
  });

  it("links to the article detail page and author profile", () => {
    render(<ArticlePreview article={article} />);

    expect(screen.getByRole("link", { name: /how to train your dragon/i })).toHaveAttribute(
      "href",
      "/article/how-to-train-your-dragon",
    );
    expect(screen.getAllByRole("link", { name: "jake" })[0]).toHaveAttribute(
      "href",
      "/profile/jake",
    );
  });

  it("does not render a favorite button when onFavoriteClick is omitted", () => {
    render(<ArticlePreview article={article} />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("renders a favorite button and forwards clicks when provided", async () => {
    const onFavoriteClick = vi.fn();
    render(<ArticlePreview article={article} onFavoriteClick={onFavoriteClick} />);

    const button = screen.getByRole("button", { name: /favorite \(2\)/i });
    await userEvent.click(button);

    expect(onFavoriteClick).toHaveBeenCalledTimes(1);
  });
});
