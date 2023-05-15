const { test, expect } = require('@playwright/test');
const { POManager } = require('../pageobjects/POManager');
// JSON -> String -> JS Object
const testData = JSON.parse(JSON.stringify(require("../utils/clientAppPOTestData.json")));

test('Page Object Client App Practice', async ({ page }) => {

    // PO Implementation
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    const dashboardPage = poManager.getDashboardPage();
    const cartPage = poManager.getCartPage();
    const ordersReviewPage = poManager.getOrdersReviewPage();
    const ordersHistoryPage = poManager.getOrdersHistoryPage();

    await loginPage.goTo();
    await loginPage.validLogin(testData.userName, testData.password);

    await dashboardPage.searchProductAndAddToCart(testData.productName);
    await dashboardPage.navigateToCart();

    await cartPage.VerifyProductIsDisplayed(testData.productName);
    await cartPage.Checkout();

    await ordersReviewPage.searchCountryAndSelect("mex", "Mexico");
    const orderId = await ordersReviewPage.SubmitAndGetOrderId();
    console.log(orderId);
    await dashboardPage.navigateToOrders();
    await ordersHistoryPage.searchOrderAndSelect(orderId);
    expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
});