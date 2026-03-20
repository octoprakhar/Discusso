const { test, expect } = require("@playwright/test");

test("Check if Discusso Frontend is Up", async ({ page }) => {
  // 1. Navigate to the local Docker URL (uses baseURL from config)
  await page.goto("/");

  // 2. Expect the page to have the title "Discusso"
  // The /i makes it case-insensitive
  await expect(page).toHaveTitle(/Discusso/i);
});

test("Verify Main UI Elements Load", async ({ page }) => {
  // Go to home page
  await page.goto("/");

  // Checks if the main H1 heading is visible to the user
  const mainHeading = page.getByRole("heading", { level: 1 }).first();
  await expect(mainHeading).toBeVisible();
});
