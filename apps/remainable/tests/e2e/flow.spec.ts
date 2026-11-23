// Copyright (c) 2026 Sonya Gadomska. All rights reserved.
import { test, expect } from "@playwright/test";
test("complete fictional assessment, evidence viewer, revision and printable report", async ({
  page,
}) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Can this building be saved?" }),
  ).toBeVisible();
  await page.getByRole("link", { name: "Start an assessment" }).last().click();
  await page.getByRole("button", { name: "Use the fictional example" }).click();
  await expect(
    page.getByRole("heading", { name: "Additional evidence recommended" }),
  ).toBeVisible();
  await expect(
    page.getByText("Fictional example findings", { exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "DEMO-02", exact: true }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(
    page.getByText("Not measured — fictional example"),
  ).toBeVisible();
  await page.getByRole("button", { name: "Close evidence viewer" }).click();
  await page.getByRole("button", { name: "Upload requested photos" }).click();
  await page
    .getByRole("button", { name: "Remove Slab edge — schematic" })
    .click();
  await page.getByRole("button", { name: "Update screening" }).click();
  await expect(
    page.getByText("0 evidence item(s) added; 1 removed from the current set."),
  ).toBeVisible();
  await page.getByRole("link", { name: "Open report", exact: true }).click();
  await expect(page.getByText("EVIDENCE PACKAGE / V02")).toBeVisible();
  await expect(
    page.getByText("Application author and copyright owner: Sonya Gadomska.", {
      exact: false,
    }),
  ).toBeVisible();
  await expect(page.locator(".report-photo")).toHaveCount(2);
  const id = new URL(page.url()).searchParams.get("id");
  await page.goto(`/report/?id=${id}&version=1`);
  await expect(page.locator(".report-photo")).toHaveCount(3);
  await page.reload();
  await expect(page.locator(".report-photo")).toHaveCount(3);
});
test("real image flow remains unreviewed, survives reload and validates upload limits", async ({
  page,
}) => {
  await page.goto("/new/");
  await page.getByLabel("Upload photographs").setInputFiles({
    name: "bad.txt",
    mimeType: "text/plain",
    buffer: Buffer.from("not an image"),
  });
  await expect(page.locator(".error[role=alert]")).toContainText(
    "use JPEG, PNG or WebP",
  );
  await page.getByLabel("Upload photographs").setInputFiles({
    name: "test.png",
    mimeType: "image/png",
    buffer: Buffer.from(
      "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jRZkAAAAASUVORK5CYII=",
      "base64",
    ),
  });
  await expect(
    page.getByRole("button", {
      name: "Create a local record without AI",
      exact: true,
    }),
  ).toBeEnabled();
  await page
    .getByRole("button", {
      name: "Create a local record without AI",
      exact: true,
    })
    .click();
  await expect(page.getByText("Not assigned", { exact: true })).toBeVisible();
  await expect(
    page.getByText("No image observations generated.", { exact: false }),
  ).toBeVisible();
  await page.reload();
  await expect(
    page.getByText("Documentation only · No analysis performed"),
  ).toBeVisible();
});
test("mobile main routes have no horizontal overflow", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const route of [
    "/",
    "/new/",
    "/assessment/?sample=1",
    "/report/?sample=1",
  ]) {
    await page.goto(route);
    await expect(page.locator("h1").first()).toBeVisible();
    await expect
      .poll(() =>
        page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
      )
      .toBe(true);
  }
});

test("photo-first Muse review and optional refinement preserve historical results", async ({
  page,
}) => {
  const payloads: Record<string, unknown>[] = [];
  await page.route("**/api/muse.php", async (route) => {
    const payload = route.request().postDataJSON();
    payloads.push(payload);
    await route.fulfill({
      json: {
        result: {
          summary: payload.building.country
            ? "Refined with supplied country."
            : "Initial photo review.",
          observations: [],
          concerns: [],
          nonStructural: [],
          missing: ["Professional inspection"],
          actions: ["Consult a qualified professional."],
          limitations: ["Visible evidence only."],
        },
      },
    });
  });
  await page.goto("/new/");
  await expect(page.getByLabel("Country", { exact: true })).toHaveCount(0);
  await page.getByLabel("Upload photographs").setInputFiles({
    name: "photo.png",
    mimeType: "image/png",
    buffer: Buffer.from(
      "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jRZkAAAAASUVORK5CYII=",
      "base64",
    ),
  });
  await page
    .getByRole("button", { name: "Get first result with Muse" })
    .click();
  await expect(page.locator(".error[role=alert]")).toContainText(
    "Please agree",
  );
  expect(payloads).toHaveLength(0);
  await page.getByRole("checkbox").check();
  await page
    .getByRole("button", { name: "Get first result with Muse" })
    .click();
  await expect(
    page.getByText("Initial photo review.", { exact: true }),
  ).toBeVisible();
  await page.getByLabel("Country", { exact: true }).fill("Canada");
  await page.getByLabel("Province, region or municipality").fill("Ontario");
  await page
    .getByRole("button", { name: "Save details & refine result" })
    .click();
  await expect(
    page.getByText("Refined with supplied country.", { exact: true }),
  ).toBeVisible();
  expect(payloads).toHaveLength(2);
  const id = new URL(page.url()).searchParams.get("id");
  await page.goto(`/report/?id=${id}&version=1`);
  await expect(
    page.getByText("Initial photo review.", { exact: true }),
  ).toBeVisible();
  await expect(page.getByText("Ontario", { exact: true })).toHaveCount(0);
  await page.goto(`/report/?id=${id}&version=2`);
  await expect(page.getByText("Ontario", { exact: true })).toBeVisible();
  await page.goto(`/assessment/?id=${id}`);
  await page.route("**/api/muse.php", (route) =>
    route.fulfill({
      status: 502,
      json: { error: "Muse temporarily unavailable" },
    }),
  );
  await page.getByRole("checkbox").check();
  await page
    .getByRole("button", { name: "Save details & refine result" })
    .click();
  await expect(page.locator(".error[role=alert]")).toContainText(
    "Muse temporarily unavailable",
  );
  await expect(
    page.getByText("Refined with supplied country.", { exact: true }),
  ).toBeVisible();
});
