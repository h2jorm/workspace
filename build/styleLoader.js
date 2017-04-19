const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function(type) {
  const {NODE_ENV} = process.env;
  const styleLoader = 'style-loader';
  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: true,
      minimize: NODE_ENV === 'production',
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
  let sass = [styleLoader, cssLoader, sassLoader];
  let css = [styleLoader, cssLoader];
  if (NODE_ENV === 'production') {
    sass = ExtractTextPlugin.extract({
      use: [cssLoader, postcssLoader, sassLoader],
    });
    css = ExtractTextPlugin.extract({
      use: [cssLoader, postcssLoader],
    });
  }
  switch (type) {
    case 'sass':
    return {
      test: /\.(sass|scss)$/,
      loader: sass,
    };
    case 'css':
    return {
      test: /\.css$/,
      loader: css,
    };
  }
};
