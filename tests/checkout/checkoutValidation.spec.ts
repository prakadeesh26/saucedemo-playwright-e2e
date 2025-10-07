import { test, expect } from '@playwright/test';

test.describe('Checkout validation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    await page.locator('.inventory_item').first().locator('button').click();
    await page.click('.shopping_cart_link');
    await page.click('[data-test="checkout"]');
    await expect(page).toHaveURL(/.*checkout-step-one.html/);
  });

  test('error when first name missing', async ({ page }) => {
    await page.fill('[data-test="firstName"]', '');
    await page.fill('[data-test="lastName"]', 'Doe');
    await page.fill('[data-test="postalCode"]', '2000');
    await page.click('[data-test="continue"]');
    const err = page.locator('[data-test="error"]');
    await expect(err).toBeVisible();
    await expect(err).toContainText(/First Name is required|Error/);
  });

  test('error when postal code missing', async ({ page }) => {
    await page.fill('[data-test="firstName"]', 'John');
    await page.fill('[data-test="lastName"]', 'Doe');
    await page.fill('[data-test="postalCode"]', '');
    await page.click('[data-test="continue"]');
    const err = page.locator('[data-test="error"]');
    await expect(err).toBeVisible();
    await expect(err).toContainText(/Postal Code is required|Error/);
  });
});
