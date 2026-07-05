import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Avatar } from "./Avatar";

const meta: Meta<typeof Avatar> = {
  title: "UI/Avatar",
  component: Avatar,
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const WithImage: Story = {
  args: { src: "https://api.realworld.io/images/smiley-cyrus.jpg", alt: "jake" },
};

export const FallbackImage: Story = {
  args: { src: null, alt: "jake" },
  name: "No image (fallback)",
};

export const CustomSize: Story = {
  args: { src: null, alt: "jake", size: 100 },
};
