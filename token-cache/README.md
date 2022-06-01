# Token Cache demo app

This project was bootstrapped with [@hiiretail/cra-template](https://github.com/extenda/hiiretail-react-template)

This demo app shows the usage of Token Cache API to cache tokens.

The functionality:
- Pincode login
- Simple login with testrunner tenant & hardcoded user name & password
- Tokens introspection

The flow:
- User opens the app
- Tries to login with operatorId & pin (user have to comeup with values)
- If There is no cache in Token Cache, user will be forwarded to full login with email & pass
- User enters presses login
- User gots redirected to Home page with that should user tokens.
- If user presses logout, and tries to login with the same operatorId/pin user should be logged in immediatelly, and be redirected to Home.

## Start the demo

To run this demo, you need to:
1. `yarn install`  - keep in mind that you have to be authenticated into Nexus npm repo
2. Get a new OCMS token to be able to talk to token cache API

 cliendId - `aWQ6IHRva2VuLWNhY2hlLWRlbW8Kc2Z3OiB0ZXN0QDEuMEBDSVI3blF3dFMwckE2dDBTNmVqZAp0aWQ6IENJUjduUXd0UzByQTZ0MFM2ZWpkCg`
 
 clientSecret - `cf8d42ad035d4a6391593d5174ce978ad5cce4ae0717d39fef3f41fb068c3eeb`

 [Instructions, how to fetch a OCMS Token](https://developer.hiiretail.com/docs/ocms/public/concepts/oauth2-authentication)

3. Set the token to src/setupProxy.js file to `Authorization` header.

4. `yarn start`
