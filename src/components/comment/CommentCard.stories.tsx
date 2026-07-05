import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

import type { Comment } from "@/types";

import { CommentCard } from "./CommentCard";

const comment: Comment = {
  id: 1,
  createdAt: "2016-02-18T03:22:56.637Z",
  updatedAt: "2016-02-18T03:22:56.637Z",
  body: "His name was my name too.",
  author: {
    username: "jacob",
    bio: null,
    image: "https://api.realworld.io/images/smiley-cyrus.jpg",
    following: false,
  },
};

const meta: Meta<typeof CommentCard> = {
  title: "Comment/CommentCard",
  component: CommentCard,
  args: { comment },
};

export default meta;
type Story = StoryObj<typeof CommentCard>;

export const ReadOnly: Story = {
  name: "Someone else's comment (no delete button)",
};

export const OwnComment: Story = {
  args: { onDelete: fn() },
};

export const Deleting: Story = {
  args: { onDelete: fn(), isDeleting: true },
};
