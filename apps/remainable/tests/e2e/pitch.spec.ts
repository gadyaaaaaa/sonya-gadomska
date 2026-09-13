// Copyright (c) 2026 Sonya Gadomska. All rights reserved.
import { test, expect } from "@playwright/test";
import { pitchSlides, pitchHashAliases } from "../../components/pitch/slides";

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
  await expect(page).toHaveURL(/#solution$/);
  await page.keyboard.press("ArrowDown");
  await expect(page).toHaveURL(/#why-now$/);
  await page.keyboard.press("ArrowLeft");
  await expect(page).toHaveURL(/#solution$/);
  await page.keyboard.press("ArrowUp");
  await expect(page).toHaveURL(/#problem$/);
  await page.keyboard.press("End");
  await expect(page).toHaveURL(/#roadmap$/);
  await expect(
    page.getByRole("button", { name: "Next slide", exact: true }),
  ).toBeDisabled();
  await page.keyboard.press("Home");
  await expect(page).toHaveURL(/#cover$/);
  await expect(
    page.getByRole("button", { name: "Previous slide", exact: true }),
  ).toBeDisabled();
  await page.getByRole("button", { name: "Next slide", exact: true }).click();
  await expect(page).toHaveURL(/#insight$/);
  await page.getByLabel("Go to slide").selectOption("who-it-is-for");
  await expect(page).toHaveURL(/#who-it-is-for$/);
  await page.getByRole("button", { name: "Enter presentation mode" }).click();
  await expect(page.locator(".site-header")).toBeHidden();
  await expect(page.locator(".site-footer")).toBeHidden();
  await page.keyboard.press("Escape");
  await expect(page.locator(".site-header")).toBeVisible();
  await page.reload();
  await expect(page.getByLabel("Go to slide")).toHaveValue("who-it-is-for");
  await page.evaluate(() => {
    window.location.hash = "solution";
  });
  await expect(page.getByLabel("Go to slide")).toHaveValue("solution");
  await page.goBack();
  await expect(page.getByLabel("Go to slide")).toHaveValue("who-it-is-for");
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
        ["cover", "alternatives", "technology", "insight", "roadmap"].includes(
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
  await expect(page).toHaveURL(/#roadmap$/);
  await expect(page.getByLabel("Go to slide")).toHaveValue("roadmap");
  await page.keyboard.press("Home");
  await expect(page).toHaveURL(/#cover$/);
  await page.keyboard.press("ArrowRight");
  await expect(page).toHaveURL(/#insight$/);
  await expect
    .poll(() =>
      page
        .locator("#insight")
        .evaluate((el) => Math.round(el.getBoundingClientRect().top)),
    )
    .toBe(78);
  await expect(page.getByLabel("Go to slide")).toHaveValue("insight");
});

test("short pitch, retained controls and separately expandable research", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/pitch/#ask");
  await expect(page).toHaveURL(/#roadmap$/);
  await expect(page.locator("main section")).toHaveCount(10);
  await expect(page.getByLabel("Go to slide").locator("option")).toHaveCount(
    10,
  );
  await expect(page.locator("main")).not.toContainText(
    /working draft|Content pending|early-stage|Backend|database|Business Model/i,
  );
  await page.getByLabel("Go to slide").selectOption("insight");
  const materials = page
    .locator("#insight")
    .getByRole("button", { name: /MATERIALS/ });
  await materials.click();
  await expect(materials).toHaveAttribute("aria-pressed", "true");
  await page.keyboard.press("ArrowRight");
  await expect(page).toHaveURL(/#insight$/);
  await page.getByLabel("Go to slide").selectOption("solution");
  const engineer = page
    .locator("#solution")
    .getByRole("button", { name: /ENGINEER/ });
  await engineer.click();
  await expect(engineer).toHaveAttribute("aria-pressed", "true");
  await page.getByLabel("Go to slide").selectOption("why-now");
  await page.locator("#why-now summary").click();
  await expect(
    page.locator('#why-now a[href*="vttresearch.com"]'),
  ).toBeVisible();
  await page.getByLabel("Go to slide").selectOption("roadmap");
  await expect(page.locator("#sources")).not.toHaveAttribute("open", "");
  await page.locator("#sources summary").click();
  await expect(page.locator("#sources a")).toHaveCount(9);
  await expect(page.locator("#sources p")).toHaveCount(9);
  for (const width of [1440, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    await expect
      .poll(() =>
        page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
      )
      .toBe(true);
  }
  for (const link of await page.locator("#sources a").all()) {
    await expect(link).toHaveAttribute("href", /^https:\/\//);
    await expect(link).toHaveAttribute("rel", "noopener noreferrer");
  }
  expect(errors).toEqual([]);
});

test("shared links to merged slides and research remain usable", async ({
  page,
}) => {
  for (const [from, to] of Object.entries(pitchHashAliases)) {
    await page.goto(`/pitch/#${from}`);
    await expect(page).toHaveURL(new RegExp(`#${to}$`));
    await expect(page.getByLabel("Go to slide")).toHaveValue(to);
    if (from === "sources")
      await expect(page.locator("#sources")).toHaveAttribute("open", "");
  }
});

test("documentary photography loads at large scale with attribution", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/pitch/");
    await expect(page.locator("main section figure img")).toHaveCount(6);
    for (const id of ["cover", "insight", "why-now", "why-us"]) {
      await page.getByLabel("Go to slide").selectOption(id);
      const photo = page.locator(`#${id} figure img`);
      await photo.scrollIntoViewIfNeeded();
      await expect.poll(() => photo.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0)).toBe(true);
      await expect(photo).toHaveAttribute("alt", /[A-Za-z].{30,}/);
      const box = await photo.boundingBox();
      expect(box!.width).toBeGreaterThan(width * (id === "why-us" ? .35 : .4));
      if (id !== "why-us") await expect(page.locator(`#${id} figcaption a`)).toHaveCount(1);
      await page.screenshot({ path: `/private/tmp/pitch-photo-${width}-${id}.png` });
    }
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
});
