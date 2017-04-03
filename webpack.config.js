const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const ManifestPlugin = require('webpack-manifest-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const IS_PROD = process.env.NODE_ENV === 'production';

let filename = '[name].js';
let outputPath = '/';
let devtool = "source-map";
let sassLoaders = [
  {
    loader: 'style-loader'
  },
  {
    loader: 'css-loader',
    options: {
      sourceMap: true,
      minimize: IS_PROD ? true : false,
    },
  },
  'postcss-loader',
  {
    loader: 'sass-loader',
    options: {
      sourceMap: true,
    },
  },
];

const devServer = {
  hot: true,
  contentBase: './public',
  clientLogLevel: 'error',
  noInfo: true,
  proxy: { /* proxy */ },
};

const plugins = [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  new ManifestPlugin(),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  }),
  new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  new webpack.LoaderOptionsPlugin({
    options: {
      postcss: [
        autoprefixer({
          browsers: ['last 2 versions'],
        }),
      ],
    },
  }),
  new HtmlWebpackPlugin({
    template: './public/index.ejs',
    favicon: './public/favicon.svg',
  })
];

if (IS_PROD) {
  filename = '[name]-[hash:8].js';
  devtool = undefined;
  outputPath = path.join(__dirname, 'dist');
  sassLoaders.shift();
  sassLoaders = ExtractTextPlugin.extract({ use: sassLoaders });
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      mangle: true
    }),
    new ExtractTextPlugin({
      filename: '[name]-[contenthash:8].css',
    })
  );
}

module.exports = {
  entry: {
    vendor: [
      'whatwg-fetch',
    ],
    bundle: [
      './src/index.js',
    ]
  },
  devtool,
  output: {
    path: outputPath,
    filename,
  },
  devServer,
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'html-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(sass|scss)$/,
        loader: sassLoaders,
      },
      {
        test: /\.(jpg|jpeg|png|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 1000,
          name: 'images/[name]-[hash:8].[ext]'
        },
      },
      {
        test: /\.svg$/,
        loader: ['svg-sprite-loader'],
      },
    ],
  },
  plugins,
};
