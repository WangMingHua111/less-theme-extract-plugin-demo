const LessThemeExtractPlugin = require('less-theme-extract-plugin')
const { LessThemeExtractPluginGenerator } = LessThemeExtractPlugin
const themes = require('./themes')

const rootOptions = {
  chainWebpack: config => {
    new LessThemeExtractPluginGenerator(rootOptions, themes).chainWebpack(config)
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: { ...themes.default },
      }
    }
  },
  runtimeCompiler: true,
  publicPath: './'
}
module.exports = rootOptions