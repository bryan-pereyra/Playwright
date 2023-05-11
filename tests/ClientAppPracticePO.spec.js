const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pageobjects/LoginPage');

test('Page Object Client App Practice', async ({ page }) => {
    const userName = "play.wright@mailinator.com";
    const password = "Mypass@123";
    const products = page.locator(".card-body");
    const productName = 'adidas original';

    // PO Implementation
    const loginPage = new LoginPage(page);

    loginPage.goTo();
    loginPage.validLogin(userName, password);

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

    /* Store values and add assertions*/
    await expect(page.locator(".user__name [type='text']").first()).toHaveText(userName);
    await page.locator(".action__submit").click();
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);

    /* Dynamically find an element (Table) */
    await page.locator("[routerlink*='myorders']").first().click();
    await page.locator("tbody").waitFor();

    const rows = page.locator("tbody tr");
    for (let i = 0; i < await rows.count(); i++) {
        const orderIdRow = await rows.nth(i).locator("th").textContent();
        if (orderId.includes(orderIdRow)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();
});