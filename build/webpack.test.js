const merge = require('webpack-merge');
const devConfig = require('./webpack.dev');

const config = merge(devConfig, {
  devtool: 'inline-source-map',
});

config.module.rules.unshift({
  test: /(?!\.spec)\.js$/,
  exclude: /node_modules/,
  loader: 'istanbul-instrumenter-loader',
});

module.exports = config;
