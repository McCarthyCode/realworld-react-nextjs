import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ErrorMessages } from "./ErrorMessages";

const meta: Meta<typeof ErrorMessages> = {
  title: "UI/ErrorMessages",
  component: ErrorMessages,
};

export default meta;
type Story = StoryObj<typeof ErrorMessages>;

export const SingleError: Story = {
  args: { errors: ["email is invalid"] },
};

export const MultipleErrors: Story = {
  args: {
    errors: ["email is invalid", "password is too short", "username has already been taken"],
  },
};

export const Empty: Story = {
  args: { errors: [] },
  name: "Empty (renders nothing)",
};
