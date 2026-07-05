import { expect, test } from "@playwright/test";

import { makeUser, registerUser } from "./helpers";

test.describe("profiles and following", () => {
  test("a user can follow and unfollow another user from their profile", async ({ page }) => {
    const author = makeUser("followed");
    await registerUser(page, author);
    await page.goto("/settings");
    await page.getByRole("button", { name: /click here to logout/i }).click();

    const follower = makeUser("follower");
    await registerUser(page, follower);

    await page.goto(`/profile/${author.username}`);
    await expect(page.getByRole("heading", { name: author.username })).toBeVisible();

    const followButton = page.getByRole("button", { name: `Follow ${author.username}` });
    await followButton.click();
    await expect(
      page.getByRole("button", { name: `Unfollow ${author.username}` }),
    ).toBeVisible();

    await page.reload();
    await expect(
      page.getByRole("button", { name: `Unfollow ${author.username}` }),
    ).toBeVisible();

    await page.getByRole("button", { name: `Unfollow ${author.username}` }).click();
    await expect(page.getByRole("button", { name: `Follow ${author.username}` })).toBeVisible();
  });

  test("a user cannot see a follow button on their own profile", async ({ page }) => {
    const user = makeUser("selfprofile");
    await registerUser(page, user);

    await page.goto(`/profile/${user.username}`);
    await expect(page.getByRole("heading", { name: user.username })).toBeVisible();
    await expect(page.getByRole("button", { name: /Follow/ })).toHaveCount(0);
  });
});
