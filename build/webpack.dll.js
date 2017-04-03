const webpack = require('webpack');
const path = require('path');

const vendor = [
  'whatwg-fetch',
  'moment',
];

module.exports = {
  entry: { vendor },
  output: {
    path: path.resolve('tmp'),
    filename: '[name].js',
    library: '[name]_library',
  },
  devtool: 'source-map',
  plugins: [
    new webpack.DllPlugin({
      path: path.resolve('tmp/manifest.dll.json'),
      context: path.resolve('..'),
      library: '[name]_library',
    }),
  ],
};
