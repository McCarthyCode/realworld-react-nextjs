import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

import { FavoriteButton } from "./FavoriteButton";

const meta: Meta<typeof FavoriteButton> = {
  title: "UI/FavoriteButton",
  component: FavoriteButton,
  args: { onClick: fn() },
};

export default meta;
type Story = StoryObj<typeof FavoriteButton>;

export const NotFavorited: Story = {
  args: { favorited: false, favoritesCount: 5 },
};

export const Favorited: Story = {
  args: { favorited: true, favoritesCount: 6 },
};

export const Loading: Story = {
  args: { favorited: false, favoritesCount: 5, disabled: true },
  name: "Loading/disabled",
};

export const LargeSize: Story = {
  args: { favorited: false, favoritesCount: 12, size: "lg" },
};
