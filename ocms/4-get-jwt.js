const jwt = require('jsonwebtoken');
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
  await section('4. Client: Gets access token');
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

  const tokenInfo = await axios({
    method: 'POST',
    url: 'https://auth.retailsvc.com/oauth2/token',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${Buffer.from(
        `${clientId}:${clientSecret}`,
      ).toString('base64')}`,
    },
    // audience must be present. If not, you will not be able to validate token in OPA
    data: `grant_type=client_credentials&audience=https://hiiretail.com`,
  });

  await output('Token info', tokenInfo);

  const parsedJwt = jwt.decode(tokenInfo.access_token);

  await output('Parsed JWT', parsedJwt);

  await next('./5-cleanup', {
    authToken,
    softwareId,
    softwareVersion,
    tenantId,
    statement,
    clientId,
    clientSecret,
    usingGlobalTemplate,
  });
});
