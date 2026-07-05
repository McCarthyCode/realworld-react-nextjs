import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

import { FeedTabs } from "./FeedTabs";

const meta: Meta<typeof FeedTabs> = {
  title: "Article/FeedTabs",
  component: FeedTabs,
  args: { onSelectFeed: fn(), onSelectGlobal: fn() },
};

export default meta;
type Story = StoryObj<typeof FeedTabs>;

export const LoggedOutGlobal: Story = {
  args: { activeTab: "global", showFeedTab: false },
  name: "Logged out (Global only)",
};

export const LoggedInGlobal: Story = {
  args: { activeTab: "global", showFeedTab: true },
};

export const YourFeedActive: Story = {
  args: { activeTab: "feed", showFeedTab: true },
};

export const TagActive: Story = {
  args: { activeTab: "tag", activeTag: "reactjs", showFeedTab: true },
};
