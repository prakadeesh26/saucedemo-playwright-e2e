import { test, expect } from '@playwright/test';

test.describe('Light visual checks', () => {
  test('product listing main elements present and header visible', async ({ page }) => {
    await page.goto('/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    await expect(page.locator('.app_logo')).toBeVisible();
    await expect(page.locator('.inventory_list')).toBeVisible();
    // ensure first product image has src attribute
    const img = page.locator('.inventory_item img').first();
    await expect(img).toBeVisible();
    const src = await img.getAttribute('src');
    expect(src).not.toBeNull();
  });
});
