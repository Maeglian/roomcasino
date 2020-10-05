const path = require('path');

function addStyleResource(rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, './src/styles/variables.scss'),
      ],
    });
}

module.exports = {
  runtimeCompiler: true,

  chainWebpack: (config) => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal'];
    types.forEach((type) => addStyleResource(config.module.rule('scss').oneOf(type)));
  },

  publicPath: process.env.NODE_ENV === 'production'
    ? '/roomcasino/'
    : '/',
};
