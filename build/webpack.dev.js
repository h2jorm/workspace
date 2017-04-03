const webpack = require('webpack');
const merge = require('webpack-merge');

const baseConfig = require('./webpack.base');
const styleLoader = require('./styleLoader');

module.exports = merge(baseConfig, {
  entry: {
    bundle: './src/index.js',
  },
  output: {
    path: '/',
    filename: '[name].js',
  },
  devServer: {
    hot: true,
    contentBase: './public',
    clientLogLevel: 'error',
    noInfo: true,
    proxy: { /* proxy */ },
  },
  module: {
    rules: [
      styleLoader('dev'),
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
});
