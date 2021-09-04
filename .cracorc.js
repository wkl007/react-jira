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
            modifyVars: { '@primary-color': '#1DA57A' },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
}
