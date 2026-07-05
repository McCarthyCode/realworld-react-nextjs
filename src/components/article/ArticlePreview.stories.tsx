import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

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
  favoritesCount: 29,
  author: {
    username: "jake",
    bio: null,
    image: "https://api.realworld.io/images/smiley-cyrus.jpg",
    following: false,
  },
};

const meta: Meta<typeof ArticlePreview> = {
  title: "Article/ArticlePreview",
  component: ArticlePreview,
  args: { article },
};

export default meta;
type Story = StoryObj<typeof ArticlePreview>;

export const LoggedOut: Story = {
  name: "Logged out (no favorite button)",
};

export const LoggedIn: Story = {
  args: { onFavoriteClick: fn() },
};

export const Favorited: Story = {
  args: {
    article: { ...article, favorited: true, favoritesCount: 30 },
    onFavoriteClick: fn(),
  },
};

export const FavoriteLoading: Story = {
  args: { onFavoriteClick: fn(), isFavoriteLoading: true },
  name: "Favorite toggle in flight",
};

export const NoTags: Story = {
  args: { article: { ...article, tagList: [] } },
};
