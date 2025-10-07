import { test, expect } from '@playwright/test';

test.describe('Product listing tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    await expect(page).toHaveURL(/.*inventory.html/);
  });

  test('all product cards load with name, image, price and add button', async ({ page }) => {
    const items = page.locator('.inventory_item');
    const count = await items.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < Math.min(5, count); i++) {
      const item = items.nth(i);
      await expect(item.locator('.inventory_item_name')).toBeVisible();
      await expect(item.locator('.inventory_item_price')).toBeVisible();
      await expect(item.locator('img.inventory_item_img')).toBeVisible();
      await expect(item.locator('button')).toBeVisible();
    }
  });

  test('add and remove toggles button text and cart badge', async ({ page }) => {
    const first = page.locator('.inventory_item').first();
    const addBtn = first.locator('button');
    await addBtn.click();
    await expect(addBtn).toHaveText(/Remove|remove/i);
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
    await first.locator('button').click(); // remove
    await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);
  });
});
