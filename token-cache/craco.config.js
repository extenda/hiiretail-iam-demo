const CracoAlias = require('craco-alias');

module.exports = {
  babel: {
    plugins: [
      'babel-plugin-styled-components',
      '@babel/plugin-proposal-nullish-coalescing-operator',
    ],
  },
  presets: ['@babel/preset-react'],
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'options',
        baseUrl: './',
        aliases: {
          '@app': './src',
          // you can alias packages too
        },
      },
    },
  ],
};
