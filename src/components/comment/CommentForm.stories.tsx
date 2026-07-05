import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

import { CommentForm } from "./CommentForm";

const meta: Meta<typeof CommentForm> = {
  title: "Comment/CommentForm",
  component: CommentForm,
  args: { onSubmit: fn() },
};

export default meta;
type Story = StoryObj<typeof CommentForm>;

export const Default: Story = {
  args: { currentUserImage: "https://api.realworld.io/images/smiley-cyrus.jpg" },
};

export const NoAvatar: Story = {
  args: { currentUserImage: null },
};

export const Submitting: Story = {
  args: { currentUserImage: null, isSubmitting: true },
};
