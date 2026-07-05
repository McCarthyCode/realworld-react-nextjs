import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

import { TagList } from "./TagList";

const meta: Meta<typeof TagList> = {
  title: "UI/TagList",
  component: TagList,
};

export default meta;
type Story = StoryObj<typeof TagList>;

export const Static: Story = {
  args: { tags: ["dragons", "training", "reactjs"] },
};

export const Interactive: Story = {
  args: { tags: ["dragons", "training", "reactjs"], onTagClick: fn() },
};

export const WithActiveTag: Story = {
  args: { tags: ["dragons", "training", "reactjs"], onTagClick: fn(), activeTag: "training" },
};

export const Empty: Story = {
  args: { tags: [] },
  name: "Empty (renders nothing)",
};
