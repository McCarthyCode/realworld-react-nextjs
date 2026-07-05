import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

import type { Article } from "@/types";

import { ArticleMeta } from "./ArticleMeta";

const article: Article = {
  slug: "how-to-train-your-dragon",
  title: "How to train your dragon",
  description: "Ever wonder how?",
  body: "It takes a Jacobian",
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

const meta: Meta<typeof ArticleMeta> = {
  title: "Article/ArticleMeta",
  component: ArticleMeta,
  args: {
    article,
    onFavoriteClick: fn(),
    onFollowClick: fn(),
    onDeleteClick: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof ArticleMeta>;

export const OtherAuthor: Story = {
  args: { isOwnArticle: false },
  name: "Viewing someone else's article",
};

export const OtherAuthorFavoritedAndFollowed: Story = {
  args: {
    isOwnArticle: false,
    article: { ...article, favorited: true, author: { ...article.author, following: true } },
  },
};

export const OwnArticle: Story = {
  args: { isOwnArticle: true },
  name: "Viewing your own article (Edit/Delete)",
};

export const DeleteInFlight: Story = {
  args: { isOwnArticle: true, isDeleteLoading: true },
};
