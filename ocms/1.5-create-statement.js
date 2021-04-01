const jwt = require('jsonwebtoken');
const {
  axios,
  main,
  input,
  confirm,
  output,
  section,
  next,
  getAuthToken,
} = require('./utils');

module.exports.main = main(module, async (args) => {
  ///////////////////////////////////
  await section('1.5. Statement Admin: Creates software statement');
  ///////////////////////////////////

  const {
    authToken = await getAuthToken(),
    softwareId = await input('softwareId', 'sco'),
    softwareVersion = await input('softwareVersion', 'v1_demo'),
    tenantId = await input('tenantId', 'CIR7nQwtS0rA6t0S6ejd'),
    autoApprove = await confirm('autoApprove'),
    usingGlobalTemplate = await confirm('usingGlobalTemplate'),
  } = args;

  const statementRes = await axios({
    method: 'POST',
    url: `https://ocms.retailsvc.com/v1/tenants/${tenantId}/software-statements`,
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    data: {
      softwareId,
      softwareVersion,
      expiresIn: '2 days',
      autoApprove,
      usingGlobalTemplate,
      claims: {
        iso_cc: 'SE',
      },
    },
  });

  await output('Created software statement', statementRes);

  const statement = statementRes.softwareStatement;

  const parsedStatement = jwt.decode(statement);

  await output('Parsed software statement', parsedStatement);

  await next('./2-register-oauth-client', {
    authToken,
    softwareId,
    softwareVersion,
    tenantId,
    statement,
    autoApprove,
    usingGlobalTemplate,
  });
});
