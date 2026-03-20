const { test, expect } = require("@playwright/test");

//Setting permissions Globally
test.use({
  permissions: ["geolocation"],
  geolocation: { latitude: 23.2599, longitude: 77.4126 },
});

test("User can navigate, select community, and create a tagged post", async ({
  page,
}) => {
  //1. Let's start with home
  await page.goto("/");

  //2. Clicking the "+" button next to the Search bar
  const plusButton = page.locator("svg").nth(2);

  await plusButton.click();

  // Instead of checking the URL instantly, we wait for either the Login page OR the Create Post page
  await page.waitForURL(
    (url) => url.href.includes("login") || url.href.includes("create-post"),
  );

  // LET'S SEE THE LOGIN CATCH
  if (page.url().includes("/login")) {
    await page.getByPlaceholder("Enter an email...").fill("test@test.com");
    await page.getByPlaceholder("Enter a password...").fill("Prakhar123$$");

    await page.getByRole("button", { name: /login now/i }).click();

    await page.waitForURL("**/");

    await plusButton.click();
  }

  // 3. Verify we reached the correct URL
  await expect(page).toHaveURL(/.*create-post/);

  // 4. Select a community
  await page.getByText("Select a Community").click();
  //Now we click the specific community from the list that opens
  await page.getByText("Wizard", { exact: true }).click();
  await page.waitForURL(
    (url) => url.href.includes("com") || url.href.includes("Wizard"),
    { timeout: 5000 },
  );

  // ensure the dropdown has actually closed/updated
  await expect(page.getByText("Wizard", { exact: true })).toBeVisible();
  //5. Fill out the Post
  await page
    .getByPlaceholder("Title")
    .fill("Why Can’t I Fully Understand Recursion?");
  await page
    .getByPlaceholder("Body")
    .fill(
      "I’ve been learning programming recently and I’m trying to understand recursion, but I still feel confused. I know that recursion means a function calls itself, but when I look at recursive code I often lose track of what is happening. I feel like I understand the definition, but I’m not sure I really understand how it actually works when the program runs.\nI tried reading tutorials and watching videos, and I practiced with simple examples like factorial and Fibonacci. I also wrote the code myself and tried stepping through it slowly. Sometimes I think I understand it, but when the example changes a little, I get confused again.\nI also tried printing values and tracing the function calls to see how the stack grows and returns. This helped a bit, but I still feel like I’m memorizing patterns instead of truly understanding the idea. I even tried rewriting some recursive problems using loops to compare them.\nWhy does recursion still feel so confusing to me? Is this normal when learning programming? How did you personally start understanding recursion better? Are there any simple exercises or ways of thinking that helped you finally “get it”?",
    );

  // Submit the post
  const postButton = page.getByRole("button", { name: /post/i });

  await Promise.all([
    postButton.click(),
    page.waitForURL("**/", { timeout: 15000 }),
  ]);

  // 7. Handling the scroll and more post

  // Wait for the initial home page to be fully loaded
  await page.waitForLoadState("networkidle");

  // Create a loop to scroll and click "More post" until our title appears
  const targetPost = page.getByText("Why Can’t I Fully Understand Recursion?");

  // Let's try searching it with a loop as : check, scroll, load, repeat
  let found = false;
  for (let i = 0; i < 10; i++) {
    //Check if it's already there
    if (await targetPost.isVisible()) {
      found = true;
      break;
    }

    // If it is not, then go to the bottom and click "Load More"
    await page.keyboard.press("End");
    const moreBtn = page.getByRole("button", { name: /load more/i });

    if (await moreBtn.isVisible()) {
      // We will click and wait for the network to finish fetching the new post
      await Promise.all([
        page.waitForLoadState("networkidle"),
        moreBtn.click(),
      ]);
    } else {
      //If no button is visible, wait a moment for any lazy-loading content
      await page.waitForTimeout(2000);
    }
  }

  //Final Assertion
  await expect(targetPost).toBeVisible({ timeout: 10000 });

  // Tag generation Logic
  //   const aiTag = page.getByText(/productivity|work-from-home/i).first();

  //   await expect(aiTag).toBeVisible({ timeout: 15000 });
});
