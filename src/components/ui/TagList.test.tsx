import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { TagList } from "./TagList";

describe("TagList", () => {
  it("renders nothing for an empty tag list", () => {
    const { container } = render(<TagList tags={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders each tag as static text when not interactive", () => {
    render(<TagList tags={["react", "testing"]} />);
    expect(screen.getByText("react")).toBeInTheDocument();
    expect(screen.getByText("testing")).toBeInTheDocument();
    expect(screen.queryAllByRole("button")).toHaveLength(0);
  });

  it("renders tags as clickable buttons when onTagClick is provided", async () => {
    const onTagClick = vi.fn();
    render(<TagList tags={["react"]} onTagClick={onTagClick} />);

    await userEvent.click(screen.getByRole("button", { name: "react" }));

    expect(onTagClick).toHaveBeenCalledWith("react");
  });
});
