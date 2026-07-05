import type { Page } from "@playwright/test";

export interface TestUser {
  username: string;
  email: string;
  password: string;
}

/** Generates unique credentials so tests can run repeatedly against a stateful backend. */
export function makeUser(prefix: string): TestUser {
  const unique = `${prefix}${Date.now()}${Math.floor(Math.random() * 1000)}`;
  return {
    username: unique,
    email: `${unique}@example.com`,
    password: "password123",
  };
}

/** Registers a new user through the UI and waits for the redirect to the home page. */
export async function registerUser(page: Page, user: TestUser) {
  await page.goto("/register");
  await page.getByPlaceholder("Username").fill(user.username);
  await page.getByPlaceholder("Email").fill(user.email);
  await page.getByPlaceholder("Password").fill(user.password);
  await page.getByRole("button", { name: "Sign up" }).click();
  await page.waitForURL("/");
}

/** Logs in through the UI and waits for the redirect to the home page. */
export async function loginUser(page: Page, user: Pick<TestUser, "email" | "password">) {
  await page.goto("/login");
  await page.getByPlaceholder("Email").fill(user.email);
  await page.getByPlaceholder("Password").fill(user.password);
  await page.getByRole("button", { name: "Sign in" }).click();
  await page.waitForURL("/");
}
