const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function(env, type) {
  const styleLoader = 'style-loader';
  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: true,
      minimize: env === 'prod',
    },
  };
  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      plugins() {
        return [
          autoprefixer({
            browsers: ['last 2 versions'],
          }),
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
  const sassRet = {
    dev: [styleLoader, cssLoader, sassLoader],
    prod: ExtractTextPlugin.extract({
      use: [cssLoader, postcssLoader, sassLoader],
    }),
  };
  const cssRet = {
    dev: [styleLoader, cssLoader],
    prod: ExtractTextPlugin.extract({
      use: [cssLoader, postcssLoader],
    }),
  };
  switch (type) {
    case 'sass':
    return {
      test: /\.(sass|scss)$/,
      loader: sassRet[env],
    };
    case 'css':
    return {
      test: /\.css$/,
      loader: cssRet[env],
    };
  }
};
