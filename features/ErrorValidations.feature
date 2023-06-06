Feature: Login validations

    @Validation
    Scenario Outline: Invalid Login
        Given a login  to E-commerce2 app with "<username>" and "<password>"
        Then verify error message is displayed

        Examples:
            | username                   | password   |
            | play.wright@mailinator.com | Mypass@123 |
            | user@mymail.com            | P@ssw0rd   |