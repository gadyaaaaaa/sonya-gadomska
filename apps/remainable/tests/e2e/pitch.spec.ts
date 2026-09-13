// Copyright (c) 2026 Sonya Gadomska. All rights reserved.
import { test, expect } from "@playwright/test";
import { pitchSlides } from "../../components/pitch/slides";

test("pitch link is reachable from the desktop and mobile menu", async ({
  page,
}) => {
  for (const width of [1440, 820, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    const link = page
      .getByRole("navigation", { name: "Main navigation" })
      .getByRole("link", { name: "Pitch Deck" });
    await expect(link).toBeVisible();
    await expect
      .poll(() =>
        page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
      )
      .toBe(true);
    await link.click();
    await expect(
      page.getByRole("heading", { name: "What can remain?", exact: true }),
    ).toBeVisible();
  }
});

test("pitch deep links, keyboard, controls and presentation mode", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/pitch/#problem");
  await expect(page.getByLabel("Go to slide")).toHaveValue("problem");
  await expect(page.locator("main section")).toHaveCount(pitchSlides.length);
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
  await expect(page).toHaveURL(/#sources$/);
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
    for (const { id } of pitchSlides) {
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
      if (
        ["cover", "alternatives", "technology", "vision", "sources"].includes(
          id,
        )
      )
        await page.screenshot({
          path: `/private/tmp/remainable-content-${width}-${id}.png`,
        });
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
  await expect(page).toHaveURL(/#sources$/);
  await expect(page.getByLabel("Go to slide")).toHaveValue("sources");
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

test("new content, optional controls, source links and old ask link", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/pitch/#ask");
  await expect(page).toHaveURL(/#roadmap$/);
  await expect(page.locator("main")).not.toContainText("Content pending");
  await expect(page.locator("main")).not.toContainText("will go here");
  await page.getByLabel("Go to slide").selectOption("technology");
  const geometry = page
    .locator("#technology")
    .getByRole("button", { name: /Geometry-first/ });
  await geometry.click();
  await expect(geometry).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByText(/Decision rule: explore geometry/)).toBeVisible();
  await page.keyboard.press("ArrowRight");
  await expect(page).toHaveURL(/#technology$/);
  await page
    .locator("#technology")
    .getByText("The small first prototype", { exact: true })
    .click();
  await expect(
    page.getByText("Backend · proposed", { exact: true }),
  ).toBeVisible();
  await page.getByLabel("Go to slide").selectOption("insight");
  const materials = page
    .locator("#insight")
    .getByRole("button", { name: /Materials/ });
  await materials.click();
  await expect(materials).toHaveAttribute("aria-pressed", "true");
  await page.getByLabel("Go to slide").selectOption("how-it-could-work");
  const decision = page
    .locator("#how-it-could-work")
    .getByRole("button", { name: /Decision/ });
  await decision.click();
  await expect(decision).toHaveAttribute("aria-pressed", "true");
  await page.getByLabel("Go to slide").selectOption("why-now");
  await page.locator("#why-now summary").click();
  await expect(
    page.locator('#why-now a[href*="vttresearch.com"]'),
  ).toBeVisible();
  await page.getByLabel("Go to slide").selectOption("sources");
  await expect(page.locator("#sources a")).toHaveCount(9);
  for (const link of await page.locator("#sources a").all()) {
    await expect(link).toHaveAttribute("href", /^https:\/\//);
    await expect(link).toHaveAttribute("rel", "noopener noreferrer");
  }
  expect(errors).toEqual([]);
});
