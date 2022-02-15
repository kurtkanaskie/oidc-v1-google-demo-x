/* globals context */
var expiry = context.getVariable( 'jwt.DJ-IDToken.claim.expiry');
var issuedat = context.getVariable( 'jwt.DJ-IDToken.claim.issuedat');
context.setVariable( 'token_expires_in', Number(expiry - issuedat).toString());
// OKTA refresh_token is opaque with not expiration provided, so set it here
context.setVariable( 'refresh_token_expires_in', "28800000"); // 8 hours
