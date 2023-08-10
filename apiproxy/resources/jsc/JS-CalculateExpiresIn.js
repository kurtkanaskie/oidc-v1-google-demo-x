/* globals print */
/* globals context */

var expires_in = context.getVariable( 'ext_expires_in');
var refresh_expires_in = context.getVariable( 'ext_refresh_expires_in');

// Use values from token response instead of from JWT
// var expiry = context.getVariable( 'jwt.DJ-IDToken.claim.expiry');
// var issuedat = context.getVariable( 'jwt.DJ-IDToken.claim.issuedat');
// print( "JWT expires_in ", Number(expiry - issuedat).toString());

// Only set if present - always
if( expires_in !== null ) {
    // print( "expires_in ", Number(expires_in * 1000).toString());
    context.setVariable( 'token_expires_in', Number(expires_in * 1000).toString());
} else {
    // print( "expires_in default 1800000");
    context.setVariable( 'token_expires_in', "1800000");  // 30 minutes
}
// OKTA refresh_token is opaque with no expiration provided, so set it here to max value.

// Forgerock allows configuration of expiry time: https://backstage.forgerock.com/docs/idcloud/latest/am-oauth2/oauth2-refresh-tokens.html
// -1 means they never expire

// Google refresh tokens don't expire, set to -1 for maximum expiration time
// https://developers.google.com/identity/openid-connect/openid-connect#refresh-tokens
// https://cloud.google.com/apigee/docs/api-platform/reference/policies/oauthv2-policy#refreshtokenexpiresinelement
// https://stackoverflow.com/questions/8953983/do-google-refresh-tokens-expire
// https://cloud.google.com/apigee/docs/api-platform/reference/limits#oauth

// Only set if present, otherwise set default
if( refresh_expires_in !== null ) {
    // print( "refresh_expires_in ", Number(refresh_expires_in * 1000).toString());
    context.setVariable( 'refresh_token_expires_in', Number(refresh_expires_in * 1000).toString());
} else {
    // print( "refresh_expires_in default -1");
    context.setVariable( 'refresh_token_expires_in', "-1");  // 2 years
}
