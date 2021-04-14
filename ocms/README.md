## OCMS Code samples

### OpenAPI

This service uses OpenAPI to document API. [The link](https://ocms.retailsvc.com/swagger/)

### Notice

Some examples use JWT token, to perform authorization.

They read token from `iam-token.jwt` file, make sure, that you have it.
Token can be fetched from `https://testrunner.hiiretail.com`.
Also, it is required to have `iam.templates.create` and `iam.clients.update`
permissions in your account.

### Run

Every file represents step in a workflow, that we invision for this service.

Make sure, to install required packages by running -
```sh
npm ci
```

To run full workflow - 

```sh
node 0-admin-auth.js
```

Also, you can start from a specific step, just run it directly. 
For example, if you already passed 2 step (register client), 
you can start from 3 step (authorize a client)

```sh
node 3-authorize-client.js
```

