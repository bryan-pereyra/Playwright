const { test } = require('@playwright/test');

test.only('Client App Practice', async ({ page }) => {
    const products = page.locator(".card.body");
    const productName = 'adidas original';

    await page.goto("https://rahulshettyacademy.com/client/");

    await page.locator("#userEmail").fill("play.wright@mailinator.com");
    await page.locator("#userPassword").type("Mypass@123");
    await page.locator("#login").click();

    await page.waitForLoadState('networkidle');
 
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);

    const count = await products.count();
    for(let i = 0; i < count; i++)
    {
        if(await products.nth(i).locator("b").textContent() === productName)
        {
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }
});