const jwt = require('jsonwebtoken');
const {
  axios,
  main,
  confirm,
  input,
  section,
  getAuthToken,
  deleteAuthToken,
} = require('./utils');

module.exports.main = main(module, async (args) => {
  ///////////////////////////////////
  await section('5. Cleanup');
  ///////////////////////////////////

  const {
    authToken = await getAuthToken(),
    softwareId = await input('softwareId', 'sco'),
    softwareVersion = await input('softwareVersion', 'v1_demo'),
    tenantId = await input('tenantId', 'CIR7nQwtS0rA6t0S6ejd'),
    statement = (await input('statement')) || null,
    clientId = await input(
      'clientId',
      'YnVzaW5lc3NfdW5pdF9pZDogMTIzNDUKaXNvX2NjOiBTRQpzZnc6IHNjb0B2MV9kZW1vCnRpZDogQ0lSN25Rd3RTMHJBNnQwUzZlamQKd29ya3N0YXRpb25faWQ6ICIwMDAxIgo',
    ),
    usingGlobalTemplate = await confirm('usingGlobalTemplate'),
  } = args;

  try {
    // revoke client
    // Requires `iam.clients.update` permission (exists in `iam.clients-admin` role)

    await axios({
      method: 'PUT',
      url: `https://ocms.retailsvc.com/v1/tenants/${tenantId}/clients/${clientId}/revoke`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    console.log('Client revoked');

    // delete client
    // Requires `iam.clients.delete` permission (exists in `iam.client-admin` role)

    await axios({
      method: 'DELETE',
      url: `https://ocms.retailsvc.com/v1/tenants/${tenantId}/clients/${clientId}`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    console.log('Client deleted');
  } catch (e) {
    console.log('Skipping client cleanup');
  }

  if (statement) {
    const id = jwt.decode(statement).jti;
    await axios({
      method: 'DELETE',
      url: `https://ocms.retailsvc.com/v1/tenants/${tenantId}/software-statements/${id}`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    console.log('Software statement deleted');
  }

  const requestTenantId = usingGlobalTemplate ? '_' : tenantId;

  // delete template
  await axios({
    method: 'DELETE',
    url: `https://ocms.retailsvc.com/v1/tenants/${requestTenantId}/templates/${softwareId}/${softwareVersion}`,
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  console.log('Template deleted');

  if (await confirm('Delete auth token?')) {
    await deleteAuthToken();

    console.log('Auth token deleted');
  }

  console.log('Cleanup complete');
});
