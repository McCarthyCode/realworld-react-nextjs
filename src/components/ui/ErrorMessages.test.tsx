import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ErrorMessages } from "./ErrorMessages";

describe("ErrorMessages", () => {
  it("renders nothing when there are no errors", () => {
    const { container } = render(<ErrorMessages errors={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders each error as a list item", () => {
    render(<ErrorMessages errors={["email is invalid", "password is too short"]} />);
    expect(screen.getByText("email is invalid")).toBeInTheDocument();
    expect(screen.getByText("password is too short")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });
});
