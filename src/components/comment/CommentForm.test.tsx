import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { CommentForm } from "./CommentForm";

describe("CommentForm", () => {
  it("disables the submit button until text is entered", async () => {
    render(<CommentForm currentUserImage={null} onSubmit={vi.fn()} />);

    const submitButton = screen.getByRole("button", { name: "Post Comment" });
    expect(submitButton).toBeDisabled();

    await userEvent.type(screen.getByPlaceholderText("Write a comment..."), "Nice post!");
    expect(submitButton).toBeEnabled();
  });

  it("calls onSubmit with the trimmed comment body and clears the field", async () => {
    const onSubmit = vi.fn();
    render(<CommentForm currentUserImage={null} onSubmit={onSubmit} />);

    const textarea = screen.getByPlaceholderText("Write a comment...");
    await userEvent.type(textarea, "  Nice post!  ");
    await userEvent.click(screen.getByRole("button", { name: "Post Comment" }));

    expect(onSubmit).toHaveBeenCalledWith("Nice post!");
    expect(textarea).toHaveValue("");
  });

  it("does not submit whitespace-only input", async () => {
    const onSubmit = vi.fn();
    render(<CommentForm currentUserImage={null} onSubmit={onSubmit} />);

    await userEvent.type(screen.getByPlaceholderText("Write a comment..."), "   ");
    expect(screen.getByRole("button", { name: "Post Comment" })).toBeDisabled();
  });
});
