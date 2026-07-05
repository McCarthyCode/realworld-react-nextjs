import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { FavoriteButton } from "./FavoriteButton";

describe("FavoriteButton", () => {
  it("shows 'Favorite' and the count when not favorited", () => {
    render(<FavoriteButton favorited={false} favoritesCount={3} onClick={vi.fn()} />);
    expect(screen.getByRole("button", { name: /favorite \(3\)/i })).toBeInTheDocument();
  });

  it("shows 'Unfavorite' when already favorited", () => {
    render(<FavoriteButton favorited favoritesCount={4} onClick={vi.fn()} />);
    expect(screen.getByRole("button", { name: /unfavorite \(4\)/i })).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const onClick = vi.fn();
    render(<FavoriteButton favorited={false} favoritesCount={0} onClick={onClick} />);

    await userEvent.click(screen.getByRole("button"));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("is disabled and does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<FavoriteButton favorited={false} favoritesCount={0} onClick={onClick} disabled />);

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();

    await userEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });
});
