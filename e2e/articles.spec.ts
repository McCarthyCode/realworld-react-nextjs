import { expect, test } from "@playwright/test";

import { makeUser, registerUser } from "./helpers";

test.describe("article CRUD, favoriting, and comments", () => {
  test("an author can create, view, edit, comment on, and delete an article", async ({ page }) => {
    const author = makeUser("author");
    await registerUser(page, author);

    const title = `My Test Article ${Date.now()}`;

    // Create.
    await page.getByRole("link", { name: "New Article" }).click();
    await page.getByPlaceholder("Article Title").fill(title);
    await page.getByPlaceholder("What's this article about?").fill("A short description");
    await page.getByPlaceholder(/Write your article/).fill("Some **markdown** body content.");
    const tagInput = page.getByPlaceholder(/Enter tags/);
    await tagInput.fill("playwright");
    await tagInput.press("Enter");
    await page.getByRole("button", { name: "Publish Article" }).click();

    await page.waitForURL(/\/article\//);
    await expect(page.getByRole("heading", { name: title })).toBeVisible();
    await expect(page.getByText("playwright")).toBeVisible();

    // Comment.
    await page.getByPlaceholder("Write a comment...").fill("Great article!");
    await page.getByRole("button", { name: "Post Comment" }).click();
    await expect(page.getByText("Great article!")).toBeVisible();

    // Delete the comment.
    await page.getByRole("button", { name: "Delete comment" }).click();
    await expect(page.getByText("Great article!")).not.toBeVisible();

    // Edit.
    await page.getByRole("link", { name: "Edit Article" }).first().click();
    const updatedTitle = `${title} (edited)`;
    await page.getByPlaceholder("Article Title").fill(updatedTitle);
    await page.getByRole("button", { name: "Publish Article" }).click();
    await page.waitForURL(/\/article\//);
    await expect(page.getByRole("heading", { name: updatedTitle })).toBeVisible();

    // Delete the article.
    page.once("dialog", (dialog) => dialog.accept());
    await page.getByRole("button", { name: "Delete Article" }).first().click();
    await page.waitForURL("/");
  });

  test("another user can favorite an author's article", async ({ page }) => {
    const author = makeUser("favauthor");
    await registerUser(page, author);

    const title = `Favorite Me ${Date.now()}`;
    await page.getByRole("link", { name: "New Article" }).click();
    await page.getByPlaceholder("Article Title").fill(title);
    await page.getByPlaceholder("What's this article about?").fill("desc");
    await page.getByPlaceholder(/Write your article/).fill("body");
    await page.getByRole("button", { name: "Publish Article" }).click();
    await page.waitForURL(/\/article\//);
    const articleUrl = page.url();

    // Log out and register as a different user.
    await page.goto("/settings");
    await page.getByRole("button", { name: /click here to logout/i }).click();

    const reader = makeUser("reader");
    await registerUser(page, reader);

    await page.goto(articleUrl);
    const favoriteButton = page.getByRole("button", { name: /^Favorite/ }).first();
    await favoriteButton.click();
    await expect(
      page.getByRole("button", { name: /^Unfavorite \(1\)/ }).first(),
    ).toBeVisible();

    // Confirm it now shows up under the reader's favorited articles.
    await page.goto(`/profile/${reader.username}/favorites`);
    await expect(page.getByRole("heading", { name: title })).toBeVisible();
  });
});
