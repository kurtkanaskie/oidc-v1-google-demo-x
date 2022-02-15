# OIDC Google Demo

This proxy demonstrates an Open ID Connect (OIDC) implementation for Authorization Code grant using Google GCP Project as the external Identity Provider (IdP).

It provides the following endpoints
* GET /authorize
* POST /token (code and refresh)
* POST /revoke
* GET /userinfo

The callback endpoint is used for the integration with GCP.

See the [sequence diagram](oidc-v1-google-demo-wsd.png) for details on the interaction between Apigee and GCP.

The solution demonstrates a full CI/CD lifecycle, apart from actually getting an access_token and using it in integration tests.

To test the functionality, use the Open API Specification (OAS) in your portal (Drupal 8 or Integrated portal) to authorize the user, then access the /userinfo endpoint.
Use the client_id and client_secret from the Apps that are created via CI/CD.

## Disclaimer

This example is not an official Google product, nor is it part of an official Google product.

## License

This material is copyright 2019, Google LLC. and is licensed under the Apache 2.0 license.
See the [LICENSE](LICENSE) file.

This code is open source.

## Configuration Overview

* A GCP Project with OAuth APIs enabled.
* Dev Portal (integrated or Drupal 8) to host the OAS.
* Apps with a callback, for each of the portals.

### GCP Project
* Create a GCP Project and enable OAuth.
* Add others to the project if desired (e.g. yourname+something@google.com)
* Create a service account.
* Download the keys.

### Apigee
* Create your Integrated Portal and set the App callback URL.
* Copy kvms.json-dist to kvms.json and set values from your downloaded keys.
* Build and deploy the proxy and associated artifacts, including the OAS.
* Publish the OAS to the Integrated Portal.

### Maven
Use maven to build and install the proxy, API product, App developer, App, download the App keys, and run integration tests.
Maven will also deploy the OAS to your Drupal 8 and Integrated portal.

#### All at once
* mvn -P test install -Ddeployment.suffix= -Dapigee.config.options=update -Dapigee.config.dir=target/resources/edge -Dapigee.config.exportDir=target/test/integration -Dapigee.smartdocs.config.options=update

#### Just update the Drupal 8 API Specs
* mvn -P test process-resources apigee-smartdocs:apidoc -Dapigee.smartdocs.config.options=update -Ddeployment.suffix=

#### Just update the Integrated Portal API Specs
Via process-resources after replacements or when in target
* mvn -P test process-resources apigee-config:specs -Dapigee.config.options=update -Ddeployment.suffix= -Dskip.clean=true -Dapigee.config.dir=target/resources/edge
* mvn -P test -Dapigee.config.options=update apigee-config:specs -Dapigee.config.dir=target/resources/specs -Dapigee.config.dir=target/resources/edge

Via the source without replacements
* mvn -P test -Dapigee.config.options=update apigee-config:specs -Dapigee.config.dir=resources/edge

### Discrete Commands
mvn -P "$ENV" jshint:lint
mvn -P "$ENV" frontend:install-node-and-npm@install-node-and-npm
mvn -P "$ENV" frontend:npm@npm-install
mvn -P "$ENV" frontend:npm@apigeelint
mvn -P "$ENV" frontend:npm@unit
mvn -P "$ENV" resources:copy-resources@copy-resources
mvn -P "$ENV" replacer:replace@replace
mvn -P "$ENV" apigee-enterprise:configure
mvn -P "$ENV" apigee-config:targetservers
mvn -P "$ENV" apigee-config:resourcefiles
mvn -P "$ENV" apigee-config:apiproducts
mvn -P "$ENV" apigee-config:developers
mvn -P "$ENV" apigee-config:apps
mvn -P "$ENV" apigee-config:exportAppKeys
mvn -P "$ENV" frontend:npm@integration

### Re-run integration tests
```
mvn -P $ENV resources:copy-resources@copy-resources replacer:replace@replace apigee-config:resourcefiles apigee-config:exportAppKeys frontend:npm@integration
```

# TODO
* Step by step setup of GCP Project and Integrated Portal.
* Proxy design
  * Verify client_id when via formparams (demo app) and via Authorization Basic (portals OAS)
  * Verify redirect_url on GET /authorize
  * GET /.well-known/openid-configuration
  * Anti forgery with client
* CI/CD
  * Publish spec to portal
  * Deploy to prod using separate keys from GCP Project
