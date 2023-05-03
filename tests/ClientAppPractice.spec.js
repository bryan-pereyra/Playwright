const { test, expect } = require('@playwright/test');

test.only('Client App Practice', async ({ page }) => {
    const products = page.locator(".card-body");
    const productName = 'adidas original';

    await page.goto("https://rahulshettyacademy.com/client/");

    await page.locator("#userEmail").fill("play.wright@mailinator.com");
    await page.locator("#userPassword").type("Mypass@123");
    await page.locator("#login").click();

    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3500);

    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);

    /* Dynamically find a product (For loop) */
    const count = await products.count();
    for (let i = 0; i < count; i++) {
        if (await products.nth(i).locator("b").textContent() === productName) {
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }

    /* Add Assertions */
    await page.locator("[routerlink*='cart']").click();
    await page.locator("div li").first().waitFor();
    const bool = await page.locator("h3:has-text('adidas original')").isVisible();
    expect(bool).toBeTruthy();

    /* Handling Auto Suggestive dropdown options */
    await page.locator("text=Checkout").click();
    await page.locator("[placeholder*='Country']").type("Me", { delay: 100 });
    const dropdown = page.locator(".ta-results")
    await dropdown.waitFor();
    const countries = await dropdown.locator("button").count();

    for (let i = 0; i < countries; i++) {
        const text = await dropdown.locator("button").nth(i).textContent();
        if (text === " Mexico") {
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }

    await page.pause();
});