import { expect, test } from "@playwright/test";

import { loginUser, makeUser, registerUser } from "./helpers";

test.describe("authentication", () => {
  test("a visitor can register a new account", async ({ page }) => {
    const user = makeUser("reguser");

    await registerUser(page, user);

    await expect(page.getByRole("link", { name: user.username })).toBeVisible();
  });

  test("shows validation errors for an invalid registration", async ({ page }) => {
    await page.goto("/register");
    await page.getByPlaceholder("Username").fill("someone");
    await page.getByPlaceholder("Email").fill("not-an-email");
    await page.getByPlaceholder("Password").fill("short");
    await page.getByRole("button", { name: "Sign up" }).click();

    await expect(page.getByText(/must be a valid email/i)).toBeVisible();
    await expect(page.getByText(/must be at least 8 characters/i)).toBeVisible();
  });

  test("a registered user can log in and out", async ({ page }) => {
    const user = makeUser("loginuser");
    await registerUser(page, user);

    // Log out.
    await page.goto("/settings");
    await page.getByRole("button", { name: /click here to logout/i }).click();
    await expect(page.getByRole("link", { name: "Sign in" })).toBeVisible();

    // Log back in.
    await loginUser(page, user);
    await expect(page.getByRole("link", { name: user.username })).toBeVisible();
  });

  test("shows an error for invalid login credentials", async ({ page }) => {
    await page.goto("/login");
    await page.getByPlaceholder("Email").fill("nobody@example.com");
    await page.getByPlaceholder("Password").fill("wrongpassword");
    await page.getByRole("button", { name: "Sign in" }).click();

    await expect(page.getByText(/user not found/i)).toBeVisible();
  });

  test("unauthenticated visitors are redirected away from protected pages", async ({ page }) => {
    await page.goto("/settings");
    await page.waitForURL("/login");
  });
});
