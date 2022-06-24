const axios = require('axios');
const qs = require('qs');
const fs = require('fs')
const data = qs.stringify({
  'grant_type': 'client_credentials',
  'audience': 'https://hiiretail.com'
});

const clientId = 'aWQ6IHRva2VuLWNhY2hlLWRlbW8Kc2Z3OiB0ZXN0QDEuMEBDSVI3blF3dFMwckE2dDBTNmVqZAp0aWQ6IENJUjduUXd0UzByQTZ0MFM2ZWpkCg'

const secret = 'cf8d42ad035d4a6391593d5174ce978ad5cce4ae0717d39fef3f41fb068c3eeb'

const base64 = Buffer.from(`${clientId}:${secret}`).toString('base64')

const config = {
  method: 'post',
  url: 'https://auth.retailsvc.com/oauth2/token',
  headers: {
    'Authorization': `Basic ${base64}`,
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  data: data
};

axios(config)
  .then(function (response) {
    console.log(response.data);
    fs.writeFileSync('token.txt', response.data.access_token)
  })
  .catch(function (error) {
    console.log(error);
  });

