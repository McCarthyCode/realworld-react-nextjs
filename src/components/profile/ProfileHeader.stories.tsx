import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

import { ProfileHeader } from "./ProfileHeader";

const profile = {
  username: "jake",
  bio: "I work at statefarm",
  image: "https://api.realworld.io/images/smiley-cyrus.jpg",
  following: false,
};

const meta: Meta<typeof ProfileHeader> = {
  title: "Profile/ProfileHeader",
  component: ProfileHeader,
  args: { profile, onFollowClick: fn() },
};

export default meta;
type Story = StoryObj<typeof ProfileHeader>;

export const OtherUser: Story = {
  args: { isOwnProfile: false },
};

export const Following: Story = {
  args: { isOwnProfile: false, profile: { ...profile, following: true } },
};

export const FollowLoading: Story = {
  args: { isOwnProfile: false, isFollowLoading: true },
};

export const OwnProfile: Story = {
  args: { isOwnProfile: true },
  name: "Own profile (no follow button)",
};

export const NoBio: Story = {
  args: { isOwnProfile: false, profile: { ...profile, bio: null } },
};
