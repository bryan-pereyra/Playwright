const { test, expect } = require('@playwright/test');

test('Search for an Item', async ({ page }) => {
    const searchBar = page.locator('#twotabsearchtextbox');
    const submitBtn = page.locator('#nav-search-submit-button');
    const firstItem = page.locator('.s-product-image-container').first();

    await page.goto('https://www.amazon.com.mx/');

    await searchBar.type('iPhone 14 Pro Max');
    await submitBtn.click();
    await firstItem.click();

    const price = await page.locator('.a-price-whole').first().textContent();
    console.log('Item price: ' + price);
    expect(parseInt(price)).toBeGreaterThan(0);
});