// eslint-disable-next-line @typescript-eslint/no-var-requires
const {createProxyMiddleware} = require('http-proxy-middleware');

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
        Authorization: 'Bearer ' + 'eyJhbGciOiJSUzI1NiIsImtpZCI6InB1YmxpYzplMTNiZDg5Zi1kNjIzLTRmY2ItOTVjNS04NmQ5NDAxODBlZjYiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOlsiaHR0cHM6Ly9oaWlyZXRhaWwuY29tIl0sImNsaWVudF9pZCI6ImFXUTZJSFJ2YTJWdUxXTmhZMmhsTFdSbGJXOEtjMlozT2lCMFpYTjBRREV1TUVCRFNWSTNibEYzZEZNd2NrRTJkREJUTm1WcVpBcDBhV1E2SUVOSlVqZHVVWGQwVXpCeVFUWjBNRk0yWldwa0NnIiwiZXhwIjoxNjU0MjQ3NDcwLCJleHQiOnt9LCJpYXQiOjE2NTQyNDM4NzAsImlzcyI6Imh0dHBzOi8vYXV0aC5yZXRhaWxzdmMuY29tLyIsImp0aSI6IjljMjM1M2VjLWQzY2UtNDcyNS04OTRiLTNkOWVlZmVjMTdiOCIsIm5iZiI6MTY1NDI0Mzg3MCwic2NwIjpbXSwic3ViIjoiYVdRNklIUnZhMlZ1TFdOaFkyaGxMV1JsYlc4S2MyWjNPaUIwWlhOMFFERXVNRUJEU1ZJM2JsRjNkRk13Y2tFMmREQlRObVZxWkFwMGFXUTZJRU5KVWpkdVVYZDBVekJ5UVRaME1GTTJaV3BrQ2cifQ.ezaYPRugcSoHyUSmQ8FKwzjHTiERawXaX6KsCZUYswgnabWV0L8gfLfQuPw4LgrZZ2iBobMTT9rSDogvqAtqlcOrfQe78Jdhz98D8AqPzEIKf1kYSbsbo9yTUg-eexEZlgI4DG-AzGagBSawl4SL68iqtrRATV3hTDUqHaQxwpGfoChT5mEjvOIIv2lijPxdbaGopWSjumqy9JTzIbDrRT1fV7A7t-A3i2so-hKLOUJF3v98yKyHttWKZQwdMhljQkBRi9mQ02VTE9r-zCqxrFB5rd4KBEg1d-yzQGxKIGKp3DMC47BM2nsv4oFGYKzGXVHmA2e-supODg5QvhlWtYi26LdaOUkfWAuOPIvCgGegeeiKUfBpw8GWCCiEI17SNtj0n8k7KH8C8MsKh5HIylcGcReTE13mguHdrK6vbCnAQZDhebbe_X0aMgRgEw8wciNjz6CwtXkynhzb5ws0Z_Et5_9vWTEou8OtB9ZGTeidcC86tT-L-wz-cTOCw8OE86Zin8_5C-uu41nD7jRNKMj8tZq8O20BWmyBu3sOHDDjOoobp89nLftwiAILLv8gutbRd1V-xI5-RIibvjJ4IFfOH7dxmmmQYEvRXVSqHy65_Wg-92UKz3_NmVS9HOeaJaGGTjYE5t7kPvJZBiRLkdNocnKcpAIQ1qnDolgz3r0',
      },
    }),
  );
};
