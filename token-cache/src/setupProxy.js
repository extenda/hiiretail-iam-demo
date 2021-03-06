// eslint-disable-next-line @typescript-eslint/no-var-requires
const {createProxyMiddleware} = require('http-proxy-middleware');
const fs = require('fs')

const token = fs.readFileSync('token.txt', 'utf-8')


module.exports = function (app) {
  app.use(
    createProxyMiddleware('/token-cache-api', {
      target: 'https://token-cache-api.retailsvc.com',
      pathRewrite: {'^/token-cache-api': '/api'},
      changeOrigin: true,
      protocol: 'http:',
      secure: false,
      port: 444,
      logLevel: 'debug',
      headers: {
        Connection: 'keep-alive',
        Authorization: `Bearer ${token}`,
      },
    }),
  );
};

