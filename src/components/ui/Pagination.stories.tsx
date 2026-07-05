import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

import { Pagination } from "./Pagination";

const meta: Meta<typeof Pagination> = {
  title: "UI/Pagination",
  component: Pagination,
  args: { onPageChange: fn() },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  args: { total: 45, limit: 10, currentPage: 1 },
};

export const MiddlePageActive: Story = {
  args: { total: 45, limit: 10, currentPage: 3 },
};

export const SinglePage: Story = {
  args: { total: 5, limit: 10, currentPage: 1 },
  name: "Single page (renders nothing)",
};
