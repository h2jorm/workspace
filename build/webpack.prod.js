const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const baseConfig = require('./webpack.base');
const styleLoader = require('./styleLoader');
const config = require('./config');

module.exports = merge(baseConfig, {
  entry: {
    vendor: config.vendor,
    bundle: config.bundle,
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name]-[chunkhash:8].js',
    publicPath: '/',
  },
  module: {
    rules: [
      styleLoader('prod', 'sass'),
      styleLoader('prod', 'css'),
    ],
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
    }),
    new ExtractTextPlugin({
      filename: '[name]-[contenthash:8].css',
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunk: (module) => {
        return module.context && module.context.indexOf('node_modules') !== -1;
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunk: Infinity,
    }),
  ],
});
