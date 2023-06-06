Feature: Ecommerce validations

    @Regression
    Scenario: Placing order
        Given a login  to E-commerce app with "play.wright@mailinator.com" and "Mypass@123"
        When add "adidas original" to Cart
        Then verify "adidas original" is displayed in the Cart
        When enter valid details and place the order
        Then verify order is present in the Order History