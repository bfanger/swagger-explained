import { test, expect } from "@playwright/test";

test("petstore", async ({ page }) => {
  const response = await page.goto("http://localhost:5173/", {
    waitUntil: "networkidle",
  });
  await test.step("load a spec from a url", async () => {
    expect(response?.status()).toBe(200);
    const swaggerVersion2 = page
      .getByRole("heading", { name: "Version 2.0" })
      .first();
    await expect(swaggerVersion2).not.toBeVisible();

    await page
      .locator('input[name="url"]')
      .fill("https://petstore.swagger.io/v2/swagger.json");
    await page.getByRole("button", { name: "Explain" }).click();
    await expect(swaggerVersion2).toBeVisible();
  });
  await test.step("navigate to topic by clicking ", async () => {
    const licenseObject = page.getByRole("heading", {
      name: "License Object",
      exact: true,
    });
    await expect(licenseObject).not.toBeInViewport();
    await page
      .locator('a[href="#license-object"]', { hasText: "Apache 2.0" })
      .click();

    await expect(licenseObject).toBeInViewport();
  });
});
