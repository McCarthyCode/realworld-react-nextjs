import { describe, expect, it } from "vitest";

import { flattenApiErrors, formatDate } from "@/lib/format";

describe("formatDate", () => {
  it("formats an ISO date string as a long-form date", () => {
    expect(formatDate("2016-02-18T03:22:56.637Z")).toBe("February 18, 2016");
  });
});

describe("flattenApiErrors", () => {
  it("flattens a field->messages map into display strings", () => {
    expect(flattenApiErrors({ email: ["is invalid"], password: ["is too short"] })).toEqual([
      "email is invalid",
      "password is too short",
    ]);
  });

  it("joins multiple messages for the same field", () => {
    expect(flattenApiErrors({ body: ["can't be empty", "is too short"] })).toEqual([
      "body can't be empty, is too short",
    ]);
  });

  it("returns an empty array for null/undefined input", () => {
    expect(flattenApiErrors(null)).toEqual([]);
    expect(flattenApiErrors(undefined)).toEqual([]);
  });
});
