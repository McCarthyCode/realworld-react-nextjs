import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { AuthorByline } from "./AuthorByline";

const meta: Meta<typeof AuthorByline> = {
  title: "UI/AuthorByline",
  component: AuthorByline,
  args: {
    author: {
      username: "jake",
      bio: "I work at statefarm",
      image: "https://api.realworld.io/images/smiley-cyrus.jpg",
      following: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof AuthorByline>;

export const WithDate: Story = {
  args: { date: "2016-02-18T03:22:56.637Z" },
};

export const AuthorOnly: Story = {
  name: "Without a date",
};
