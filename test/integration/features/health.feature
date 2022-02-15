@health
Feature: API proxy health
    As API administrator
    I want to monitor Apigee proxy and backend service health
    So I can alert when it is down
    
    @get-ping
    Scenario: Verify the API proxy is responding
        Given I set query parameters to
        |parameter    |value|
        |client_id    |`clientId`|
        |response_type|code|
        |redirect_uri |https%3A%2F%2Fdeveloper.kurtkanaskie.net%2Foauth_redirect|
        When I GET /authorize
        Then response code should be 302
        And response header location should exist
