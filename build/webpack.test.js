const merge = require('webpack-merge');
const devConfig = require('./webpack.dev');

module.exports = merge(devConfig, {
  devtool: 'inline-source-map',
});
