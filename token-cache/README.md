# Token Cache demo app

This project was bootstrapped
with [@hiiretail/cra-template](https://github.com/extenda/hiiretail-react-template)

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
- If user presses logout, and tries to login with the same operatorId/pin user should be logged in
  immediatelly, and be redirected to Home.

## Start the demo

To run this demo, you need to:

1. `yarn install`  - keep in mind that you have to be authenticated into Nexus npm repo
2. Get a new OCMS token to be able to talk to token cache API

run [Helper script](./GET-OCMS.js), it should set ocms token to token.txt

3. `yarn start`
