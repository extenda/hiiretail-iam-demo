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
  await section('1. Template Admin: Creates Registration template');
  ///////////////////////////////////

  const {
    authToken = await getAuthToken(),
    softwareId = await input('softwareId', 'sco'),
    softwareVersion = await input('softwareVersion', 'v1_demo'),
    tenantId = await input('tenantId', 'CIR7nQwtS0rA6t0S6ejd'),
    usingGlobalTemplate = await confirm('usingGlobalTemplate'),
    role = (await input('role')) || null,
  } = args;

  const requestTenantId = usingGlobalTemplate ? '_' : tenantId;

  const template = await axios({
    method: 'POST',
    url: `https://ocms.retailsvc.com/v1/tenants/${requestTenantId}/templates`,
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    data: {
      softwareId,
      softwareVersion,
      name: 'Self checkout',
      /**
       * Be careful about size of claims:
       * client id is built from claims
       * and has 255 chars length restriction
       */
      claimsSchema: {
        type: 'object',
        $schema: 'http://json-schema.org/draft-07/schema',
        required: ['iso_cc', 'workstation_id', 'business_unit_id'],
        properties: {
          iso_cc: {
            type: 'string',
            pattern: '^[A-Z]{2}$',
          },
          workstation_id: {
            type: 'string',
          },
          business_unit_id: {
            type: 'number',
          },
        },
        additionalProperties: false,
      },
      // optional list of roles
      ...(role && { roles: [{ roleId: role }] }),
    },
  });

  await output('Created template', template);

  if (await confirm('Create software statement?', true)) {
    await next('./1.5-create-statement', {
      authToken,
      softwareId,
      softwareVersion,
      usingGlobalTemplate,
    });
  } else {
    await next('./2-register-oauth-client', {
      authToken,
      softwareId,
      softwareVersion,
      usingGlobalTemplate,
    });
  }
});
