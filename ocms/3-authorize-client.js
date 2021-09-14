const {
  axios,
  main,
  input,
  output,
  section,
  next,
  getAuthToken,
  confirm,
} = require('./utils');

module.exports.main = main(module, async (args) => {
  ///////////////////////////////////
  await section('3. Client Admin: Authorizes OAuth client');
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
    clientSecret = await input('clientSecret'),
    usingGlobalTemplate = await confirm('usingGlobalTemplate'),
  } = args;

  // Requires `iam.client.update` permission (exists in `iam.client-admin` role)
  await axios({
    method: 'PUT',
    url: `https://ocms.retailsvc.com/v1/tenants/${tenantId}/clients/${clientId}/authorize`,
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  await output('Client status', 'Authorized');

  await next('./4-get-jwt', {
    authToken,
    softwareId,
    softwareVersion,
    statement,
    tenantId,
    clientId,
    clientSecret,
    usingGlobalTemplate,
  });
});
