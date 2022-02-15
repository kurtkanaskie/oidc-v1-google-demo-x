@errorHandling
Feature: Error handling
    As an API consumer
    I want consistent and meaningful error responses
    So that I can handle the errors correctly

    @foo
    Scenario: GET /foo request not found
        When I GET /foo
        Then response code should be 404
        And response header Content-Type should be application/json
        And response body should contain Resource not found

    @post-foo
    Scenario: POST /foo request not found
        When I POST to /foo
        Then response code should be 404
        And response header Content-Type should be application/json
        And response body should contain Resource not found
        
    @foobar
    Scenario: GET /foo/bar request not found
        When I GET /foo/bar
        Then response code should be 404
        And response header Content-Type should be application/json
        And response body should contain Resource not found
