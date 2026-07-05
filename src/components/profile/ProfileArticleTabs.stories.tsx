import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ProfileArticleTabs } from "./ProfileArticleTabs";

const meta: Meta<typeof ProfileArticleTabs> = {
  title: "Profile/ProfileArticleTabs",
  component: ProfileArticleTabs,
  args: { username: "jake" },
};

export default meta;
type Story = StoryObj<typeof ProfileArticleTabs>;

export const MyArticlesActive: Story = {
  args: { activeTab: "articles" },
};

export const FavoritedArticlesActive: Story = {
  args: { activeTab: "favorites" },
};
