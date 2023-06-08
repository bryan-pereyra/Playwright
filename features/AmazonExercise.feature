Feature: Amazon Exercise

    Scenario Outline: Search an Item
        Given I visited Amazon.com
        When search for "<item>"
        Then I store and print its price

        Examples:
            | item              |
            | iPhone 14 Pro Max |
            | Macbook Air M1    |
            | Apple Watch       |
