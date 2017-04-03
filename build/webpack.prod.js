const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const baseConfig = require('./webpack.base');
const styleLoader = require('./styleLoader');

module.exports = merge(baseConfig, {
  entry: {
    vendor: [
      'whatwg-fetch',
      'moment',
    ],
    bundle: [
      './src/index.js',
    ]
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name]-[chunkhash:8].js',
  },
  module: {
    rules: [
      styleLoader('prod'),
    ],
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
    }),
    new ExtractTextPlugin({
      filename: '[name]-[contenthash:8].css',
    }),
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
