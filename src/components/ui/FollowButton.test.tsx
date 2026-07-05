import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { FollowButton } from "./FollowButton";

describe("FollowButton", () => {
  it("shows 'Follow <username>' when not following", () => {
    render(<FollowButton username="jake" following={false} onClick={vi.fn()} />);
    expect(screen.getByRole("button", { name: "Follow jake" })).toBeInTheDocument();
  });

  it("shows 'Unfollow <username>' when following", () => {
    render(<FollowButton username="jake" following onClick={vi.fn()} />);
    expect(screen.getByRole("button", { name: "Unfollow jake" })).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const onClick = vi.fn();
    render(<FollowButton username="jake" following={false} onClick={onClick} />);

    await userEvent.click(screen.getByRole("button"));

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
