class LoginPage {

    constructor(page) {
        this.page = page;
        this.signInButton = page.locator("#login");
        this.userNameField = page.locator("#userEmail");
        this.passwordField = page.locator("#userPassword");
    };

    async goTo(){
        await this.page.goto("https://rahulshettyacademy.com/client/");
    }

    async validLogin(userName, password) {
        await this.userNameField.fill(userName);
        await this.passwordField.type(password);
        await this.signInButton.click();

        await this.page.waitForLoadState('networkidle');
        await this.page.waitForTimeout(3500);
    }
};

module.exports = { LoginPage };