import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Spinner } from "./Spinner";

const meta: Meta<typeof Spinner> = {
  title: "UI/Spinner",
  component: Spinner,
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Default: Story = {
  args: { label: "Loading…" },
};

export const Small: Story = {
  args: { size: "sm", label: "Loading tags" },
};

export const Large: Story = {
  args: { size: "lg", label: "Loading article" },
};
