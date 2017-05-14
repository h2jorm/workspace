const webpack = require('webpack');
const ManifestPlugin = require('webpack-manifest-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const styleLoader = require('./styleLoader');

module.exports = {
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['es2015', 'stage-2'],
              plugins: ['transform-runtime'],
            },
          },
          {
            loader: 'eslint-loader',
          },
        ],
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(jpg|jpeg|png|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 1000,
          name: 'images/[name]-[hash:8].[ext]',
        },
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
      },
      styleLoader('sass'),
      styleLoader('css'),
    ],
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new ManifestPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    new HtmlWebpackPlugin({
      template: './public/index.ejs',
      favicon: './public/favicon.ico',
      NODE_ENV: process.env.NODE_ENV,
    }),
  ],
};
