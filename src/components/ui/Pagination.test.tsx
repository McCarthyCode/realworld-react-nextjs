import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Pagination } from "./Pagination";

describe("Pagination", () => {
  it("renders nothing when there is only one page", () => {
    const { container } = render(
      <Pagination total={5} limit={10} currentPage={1} onPageChange={vi.fn()} />,
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("renders a button per page", () => {
    render(<Pagination total={25} limit={10} currentPage={1} onPageChange={vi.fn()} />);
    expect(screen.getAllByRole("button")).toHaveLength(3);
  });

  it("marks the current page as active", () => {
    render(<Pagination total={25} limit={10} currentPage={2} onPageChange={vi.fn()} />);
    expect(screen.getByRole("button", { name: "2" })).toHaveAttribute("aria-current", "page");
  });

  it("calls onPageChange with the clicked page", async () => {
    const onPageChange = vi.fn();
    render(<Pagination total={25} limit={10} currentPage={1} onPageChange={onPageChange} />);

    await userEvent.click(screen.getByRole("button", { name: "3" }));

    expect(onPageChange).toHaveBeenCalledWith(3);
  });
});
