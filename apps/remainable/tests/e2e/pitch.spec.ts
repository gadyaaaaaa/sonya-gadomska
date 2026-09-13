// Copyright (c) 2026 Sonya Gadomska. All rights reserved.
import { test, expect } from "@playwright/test";

test("pitch link is reachable from the desktop and mobile menu", async ({ page }) => {
  for (const width of [1440, 820, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    const link = page.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "Pitch Deck" });
    await expect(link).toBeVisible();
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await link.click();
    await expect(page.getByRole("heading", { name: "Cover", exact: true })).toBeVisible();
  }
});

test("pitch deep links, keyboard, controls and presentation mode", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/pitch/#problem");
  await expect(page.getByLabel("Go to slide")).toHaveValue("problem");
  await expect(page.locator("main section")).toHaveCount(17);
  await page.locator("#problem-title").focus();
  await page.keyboard.press("ArrowRight");
  await expect(page).toHaveURL(/#insight$/);
  await page.keyboard.press("ArrowDown");
  await expect(page).toHaveURL(/#why-now$/);
  await page.keyboard.press("ArrowLeft");
  await expect(page).toHaveURL(/#insight$/);
  await page.keyboard.press("ArrowUp");
  await expect(page).toHaveURL(/#problem$/);
  await page.keyboard.press("End");
  await expect(page).toHaveURL(/#ask$/);
  await expect(
    page.getByRole("button", { name: "Next slide", exact: true }),
  ).toBeDisabled();
  await page.keyboard.press("Home");
  await expect(page).toHaveURL(/#cover$/);
  await expect(
    page.getByRole("button", { name: "Previous slide", exact: true }),
  ).toBeDisabled();
  await page.getByRole("button", { name: "Next slide", exact: true }).click();
  await expect(page).toHaveURL(/#problem$/);
  await page.getByLabel("Go to slide").selectOption("market");
  await expect(page).toHaveURL(/#market$/);
  await page.getByRole("button", { name: "Enter presentation mode" }).click();
  await expect(page.locator(".site-header")).toBeHidden();
  await expect(page.locator(".site-footer")).toBeHidden();
  await page.keyboard.press("Escape");
  await expect(page.locator(".site-header")).toBeVisible();
  await page.reload();
  await expect(page.getByLabel("Go to slide")).toHaveValue("market");
  await page.evaluate(() => {
    window.location.hash = "solution";
  });
  await expect(page.getByLabel("Go to slide")).toHaveValue("solution");
  await page.goBack();
  await expect(page.getByLabel("Go to slide")).toHaveValue("market");
});

for (const width of [1440, 820, 390, 320]) {
  test(`pitch layout and manual scrolling at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/pitch/#not-a-slide");
    await expect(page).toHaveURL(/#cover$/);
    for (const id of ["cover", "alternatives", "ask"]) {
      await page.getByLabel("Go to slide").selectOption(id);
      await expect
        .poll(() =>
          page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth,
          ),
        )
        .toBe(true);
      const heading = await page.locator(`#${id}-title`).boundingBox();
      const nav = await page
        .getByRole("navigation", { name: "Pitch deck navigation" })
        .boundingBox();
      expect(heading!.y).toBeGreaterThanOrEqual(nav!.height);
    }
    await page.waitForTimeout(100);
    await page
      .locator("#insight")
      .evaluate((el) =>
        el.scrollIntoView({ block: "start", behavior: "instant" }),
      );
    await expect(page.getByLabel("Go to slide")).toHaveValue("insight");
    await page.screenshot({
      path: `/private/tmp/remainable-pitch-${width}.png`,
    });
  });
}

test("long jumps keep their hash with motion enabled", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/pitch/#cover");
  await page.locator("#cover-title").focus();
  await page.keyboard.press("End");
  await expect(page).toHaveURL(/#ask$/);
  await expect(page.getByLabel("Go to slide")).toHaveValue("ask");
  await page.keyboard.press("Home");
  await expect(page).toHaveURL(/#cover$/);
  await page.keyboard.press("ArrowRight");
  await expect(page).toHaveURL(/#problem$/);
  await expect
    .poll(() =>
      page
        .locator("#problem")
        .evaluate((el) => Math.round(el.getBoundingClientRect().top)),
    )
    .toBe(78);
  await expect(page.getByLabel("Go to slide")).toHaveValue("problem");
});
