const { test, expect, request } = require('@playwright/test');
const { APIUtils } = require('./utils/APIUtils');
const loginPayLoad = { userEmail: "play.wright@mailinator.com", userPassword: "Mypass@123" };
const orderPayload = { orders: [{ country: "Mexico", productOrderedId: "6262e990e26b7e1a10e89bfa" }] };
let response;

test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayLoad);
    response = await apiUtils.createOrder(orderPayload);
});

test('Place Order', async ({ page }) => {
    // Passing token
    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);

    await page.goto("https://rahulshettyacademy.com/client/");

    /* Dynamically find an element (Table) */
    await page.locator("[routerlink*='myorders']").first().click();
    await page.locator("tbody").waitFor();

    const rows = page.locator("tbody tr");
    for (let i = 0; i < await rows.count(); i++) {
        const orderIdRow = await rows.nth(i).locator("th").textContent();
        if (response.orderId.includes(orderIdRow)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(response.orderId.includes(orderIdDetails)).toBeTruthy();
});