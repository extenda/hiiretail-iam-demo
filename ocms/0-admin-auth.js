const {
  main,
  section,
  next,
  getAuthToken,
  deleteAuthToken,
} = require('./utils');

module.exports.main = main(module, async () => {
  ///////////////////////////////////
  await section('0. Client Admin: Gets auth token');
  ///////////////////////////////////

  await deleteAuthToken();

  const authToken = await getAuthToken();

  await next('./1-create-registration-template', { authToken });
});
