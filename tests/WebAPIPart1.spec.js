const { test, expect, request } = require('@playwright/test');
const loginPayLoad = { userEmail: "play.wright@mailinator.com", userPassword: "Mypass@123" };

test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        { data: loginPayLoad })
    expect(loginResponse.ok()).toBeTruthy();
    const loginResponseJson = loginResponse.json();
    const token = loginResponseJson.token;
    console.log(token);
});

test.beforeEach(() => {

});

