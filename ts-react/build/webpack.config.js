const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.common.js')
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = (envVars) => {
  const { env, analyze } = envVars
  const envConfig = require(`./webpack.${env}.js`)
  const config = merge(commonConfig, envConfig)

  if (env === 'prod' && analyze) {
    config.plugins.push(new BundleAnalyzerPlugin())
  }

  return config
}
