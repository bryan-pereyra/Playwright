const { test, expect } = require('@playwright/test');
const { customTest } = require("../utils/test-base")
const { POManager } = require('../pageobjects/POManager');
// JSON -> String -> JS Object
const testData = JSON.parse(JSON.stringify(require("../utils/clientAppPOTestData.json")));

for (const data of testData) {
    test(`Page Object Client App Practice: ${data.productName}`, async ({ page }) => {

        // PO Implementation
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        const dashboardPage = poManager.getDashboardPage();
        const cartPage = poManager.getCartPage();
        const ordersReviewPage = poManager.getOrdersReviewPage();
        const ordersHistoryPage = poManager.getOrdersHistoryPage();

        await loginPage.goTo();
        await loginPage.validLogin(data.userName, data.password);

        await dashboardPage.searchProductAndAddToCart(data.productName);
        await dashboardPage.navigateToCart();

        await cartPage.VerifyProductIsDisplayed(data.productName);
        await cartPage.Checkout();

        await ordersReviewPage.searchCountryAndSelect("mex", "Mexico");
        const orderId = await ordersReviewPage.SubmitAndGetOrderId();
        console.log(orderId);
        await dashboardPage.navigateToOrders();
        await ordersHistoryPage.searchOrderAndSelect(orderId);
        expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
    });
};

customTest('Page Object Client App Practice', async ({ page, testDataForPlaceOrder }) => {

    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    const dashboardPage = poManager.getDashboardPage();
    const cartPage = poManager.getCartPage();

    await loginPage.goTo();
    await loginPage.validLogin(testDataForPlaceOrder.userName, testDataForPlaceOrder.password);

    await dashboardPage.searchProductAndAddToCart(testDataForPlaceOrder.productName);
    await dashboardPage.navigateToCart();

    await cartPage.VerifyProductIsDisplayed(testDataForPlaceOrder.productName);
    await cartPage.Checkout();
});