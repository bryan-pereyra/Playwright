Feature: Ecommerce validations

    Scenario: Placing order
        Given a login  to E-commerce2 app with "play.wright@mailinator.com" and "Mypass@123"
        Then verify error message is displayed