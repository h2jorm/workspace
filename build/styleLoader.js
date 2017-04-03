const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function(type) {
  const styleLoader = 'style-loader';
  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: true,
      minimize: type === 'prod',
    },
  };
  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      plugins() {
        return [
          autoprefixer({
            browsers: ['last 2 versions']
          })
        ];
      },
    },
  };
  const sassLoader = {
    loader: 'sass-loader',
    options: {
      sourceMap: true,
    },
  };
  const loader = {
    dev: [styleLoader, cssLoader, sassLoader],
    prod: ExtractTextPlugin.extract({ use: [cssLoader, postcssLoader, sassLoader] }),
  };
  return {
    test: /\.(sass|scss)$/,
    loader: loader[type],
  };
};
