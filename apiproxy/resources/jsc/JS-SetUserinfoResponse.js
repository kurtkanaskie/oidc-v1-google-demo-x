/* globals context */
var userinfoResponse = context.getVariable( 'response.content');
var response = JSON.parse(userinfoResponse);

// Remove any unwanted values
/*
delete(response.id);
delete(response.sub);
delete(response.user_id);
delete(response.photos);
delete(response.profile);
delete(response.picture);
delete(response.organization_id);
delete(response.urls);
*/

/*
response.access_token = context.getVariable( 'access_token');
response.external_access_token = context.getVariable( 'accesstoken.external_access_token');
*/

// print( JSON.stringify(response) );
context.setVariable( 'response.content', JSON.stringify(response));