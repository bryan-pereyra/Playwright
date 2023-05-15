const base = require('@playwright/test');

exports.customTest = base.test.extend({

    testDataForPlaceOrder: {
        userName: "play.wright@mailinator.com",
        password: "Mypass@123",
        productName: "adidas original"
    }
});