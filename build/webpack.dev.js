const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const baseConfig = require('./webpack.base');
const styleLoader = require('./styleLoader');
const config = require('./config');

module.exports = merge(baseConfig, {
  entry: {
    bundle: config.bundle,
  },
  output: {
    path: '/',
    filename: '[name].js',
  },
  devServer: {
    hot: true,
    contentBase: path.resolve('tmp'),
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
    new webpack.DllReferencePlugin({
      context: path.resolve('..'),
      manifest: require(path.resolve('tmp/manifest.dll.json')),
    }),
  ],
});
