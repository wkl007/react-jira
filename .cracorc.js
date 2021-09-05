const CracoLessPlugin = require('craco-less')

module.exports = {
  reactScriptsVersion: 'react-scripts',
  style: {},
  webpack: {
    alias: {},
    plugins: {},
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': 'rgb(0, 82, 204)',
              '@font-size-base': '16px',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
}
