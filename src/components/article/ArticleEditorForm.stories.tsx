import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

import { ArticleEditorForm } from "./ArticleEditorForm";

const meta: Meta<typeof ArticleEditorForm> = {
  title: "Article/ArticleEditorForm",
  component: ArticleEditorForm,
  args: { onSubmit: fn() },
};

export default meta;
type Story = StoryObj<typeof ArticleEditorForm>;

export const NewArticle: Story = {
  name: "Empty (create)",
};

export const EditingExistingArticle: Story = {
  args: {
    initialValues: {
      title: "How to train your dragon",
      description: "Ever wonder how?",
      body: "It takes a Jacobian",
      tagList: ["dragons", "training"],
    },
  },
};

export const WithErrors: Story = {
  args: { errors: ["title can't be blank", "body is too short"] },
};

export const Submitting: Story = {
  args: { isSubmitting: true },
};
