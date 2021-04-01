const base64url = require('base64url');
const {
  axios,
  main,
  confirm,
  input,
  output,
  section,
  next,
  getAuthToken,
} = require('./utils');

module.exports.main = main(module, async (args) => {
  ///////////////////////////////////
  await section('2. Client: Registers as an OAuth client');
  ///////////////////////////////////

  const {
    authToken = await getAuthToken(),
    softwareId = await input('softwareId', 'sco'),
    softwareVersion = await input('softwareVersion', 'v1_demo'),
    tenantId = await input('tenantId', 'CIR7nQwtS0rA6t0S6ejd'),
    statement = (await input('statement')) || null,
    autoApprove = statement !== null ? await confirm('autoApprove') : null,
    usingGlobalTemplate = await confirm('usingGlobalTemplate'),
  } = args;

  const client = await axios({
    method: 'POST',
    url: 'https://ocms.retailsvc.com/v1/registration',
    data: {
      softwareId,
      softwareVersion,
      ...(statement && { softwareStatement: statement }),
      usingGlobalTemplate,
      tenantId,
      claims: {
        iso_cc: 'SE',
        workstation_id: '0001',
        business_unit_id: 12345,
      },
    },
  });

  await output('Created client', client);

  if (!client.clientId) {
    throw new Error('No client id in register response');
  }

  const decodedClientId = base64url.decode(client.clientId);
  await output(`Decoded client id\n${decodedClientId}`);

  if (autoApprove) {
    console.log('Client was auto approved by software statement');

    return await next('./4-get-jwt', {
      authToken,
      softwareId,
      softwareVersion,
      tenantId,
      statement,
      clientId: client.clientId,
      clientSecret: client.clientSecret,
      usingGlobalTemplate,
    });
  }

  return await next('./3-authorize-client', {
    authToken,
    softwareId,
    softwareVersion,
    tenantId,
    statement,
    clientId: client.clientId,
    clientSecret: client.clientSecret,
    usingGlobalTemplate,
  });
});
