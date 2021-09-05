const CracoLessPlugin = require('craco-less')
const resolve = (dir) => require('path').join(__dirname, dir)

module.exports = {
  reactScriptsVersion: 'react-scripts',
  style: {},
  webpack: {
    alias: {
      '@': resolve('src'),
    },
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
