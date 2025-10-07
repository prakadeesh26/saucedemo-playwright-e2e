import { test, expect } from '@playwright/test';

test.describe('Cart functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    await expect(page).toHaveURL(/.*inventory.html/);
  });

  test('add multiple items and verify cart contents', async ({ page }) => {
    const items = page.locator('.inventory_item');
    await items.nth(0).locator('button').click();
    await items.nth(1).locator('button').click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('2');

    await page.click('.shopping_cart_link');
    await expect(page).toHaveURL(/.*cart.html/);
    await expect(page.locator('.cart_item')).toHaveCount(2);

    // remove one item and verify
    await page.locator('.cart_item').first().locator('button').click();
    await expect(page.locator('.cart_item')).toHaveCount(1);
    // badge updates to 1 or disappears
    const badge = page.locator('.shopping_cart_badge');
    if (await badge.count() === 1) {
      await expect(badge).toHaveText('1');
    } else {
      await expect(badge).toHaveCount(0);
    }
  });
});
