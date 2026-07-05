import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

import { FollowButton } from "./FollowButton";

const meta: Meta<typeof FollowButton> = {
  title: "UI/FollowButton",
  component: FollowButton,
  args: { onClick: fn(), username: "jake" },
};

export default meta;
type Story = StoryObj<typeof FollowButton>;

export const NotFollowing: Story = {
  args: { following: false },
};

export const Following: Story = {
  args: { following: true },
};

export const Loading: Story = {
  args: { following: false, disabled: true },
  name: "Loading/disabled",
};
